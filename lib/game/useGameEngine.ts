// /lib/game/useGameEngine.ts
import { useDialogue } from "@/lib/dialogue/useDialogue";
import { useOptions } from "@/lib/dialogue/useOptions";
import { useCallback, useEffect, useState } from "react";
import Storage from "expo-storage";
import { getCurrentLanguage } from "../settings/LanguageController";
import { getCurrentAct } from "../helpers/getCurrentAct";
import {
  getInitialSceneForAct,
  getScenesForAct,
} from "../helpers/scenarioLoader";
import { playSound } from "../helpers/soundController";
import { Language } from "../translations/translations";
import { ActId } from "../helpers/scenarioLoader";
import { schedulePushNotification } from "../notifications/NotificationUtils";
import { useRestoreGame } from "../helpers/useRestoreGame";

export const useGameEngine = () => {
  const { dialogue, addMessage, clearMessages } = useDialogue();
  const { options, updateOptions } = useOptions();
  const [waitingVisible, setWaitingVisible] = useState(false);
  const [notifyScreenName, setNotifyScreenName] = useState("defaultScreen");
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentScene, setCurrentScene] = useState<string | null>(null);
  const [currentAct, setCurrentActState] = useState<ActId | null>(null);
  const [specialSceneVisible, setSpecialSceneVisible] = useState(false);
  const [specialScene, setSpecialScene] = useState<any>(null);

  useEffect(() => {
    const setupAudioMode = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        interruptionModeIOS: 0,
        shouldDuckAndroid: true,
        interruptionModeAndroid: 0,
        playThroughEarpieceAndroid: false,
      });
    };

    setupAudioMode();
  }, []);

  useEffect(() => {
    const restoreAct = async () => {
      const storedAct = (await Storage.getItem({ key: "currentAct" })) as ActId;
      const fallbackAct = "startgame";
      const actToUse = storedAct || fallbackAct;

      console.log("Ustawiam AKT z Storage:", actToUse);

      setCurrentActState(actToUse);
    };

    restoreAct();
  }, []);

  const handleSceneChange = useCallback(
    async (sceneName: string) => {
      console.log(`⚙️ handleSceneChange(${sceneName}) @ ${Date.now()}`);

      if (!currentAct) {
        console.warn(
          "⛔ currentAct nieustawiony jeszcze – przerwanie handleSceneChange"
        );
        return;
      }

      if (sceneName !== currentScene) {
        setCurrentScene(sceneName);
        await Storage.setItem({ key: "currentScene", value: sceneName });
      }

      // 2. Pobierz scenariusz
      const lang = await getCurrentLanguage();
      const plec = await Storage.getItem({ key: "plec" });

      // 🔄 Sprawdź scenariusz dla AKTUALNEGO aktu
      let scenes = getScenesForAct(
        currentAct,
        lang as Language,
        plec as "pan" | "pani" | null
      );
      let scene = scenes[sceneName];

      // ⛔ Jeżeli scena nie istnieje, sprawdź czy może to nextAct i trzeba zmienić akt
      if (!scene) {
        console.warn(
          "❌ Nie znaleziono sceny:",
          sceneName,
          "w akcie",
          currentAct
        );
        return;
      }

      // 3. Wyczyść stare opcje
      updateOptions([]);

      // 4. Dodaj tekst sceny
      const tekst =
        typeof scene.tekst === "function" ? await scene.tekst() : scene.tekst;
      addMessage("NPC", tekst, scene.npcKey);
      console.log("Dodaję wiadomość do dialogu", tekst);

      // 5. Dodaj opcje jeśli są
      if (scene.options) {
        updateOptions(
          scene.options.map((option) => ({
            tekst: option.tekst,
            akcja: async () => {
              // Wykonaj dodatkową akcję (np. zapis do Storage)
              if (option.akcja) {
                await option.akcja();
              }

              // Potem przejdź do kolejnej sceny
              handleSceneChange(option.next);
            },
          }))
        );
      }

      if (scene.notifyTime && scene.notifyScreenName) {
        const targetScene = scene.autoNextScene;
        const notifyKey = "waitingEndTimestamp";

        const storedTimestamp = await Storage.getItem({ key: notifyKey });
        const now = Date.now();

        let endTime = storedTimestamp ? parseInt(storedTimestamp) : null;

        // Jeśli brak - pierwszy raz wchodzimy do sceny, więc zapisujemy
        if (!endTime) {
          endTime = now + scene.notifyTime * 1000;

          await Storage.setItem({
            key: notifyKey,
            value: String(endTime),
          });

          await Storage.setItem({
            key: "autoNextScene",
            value: targetScene || "",
          });

          // Tylko wtedy planuj powiadomienie
          if (
            scene.notification &&
            scene.notificationTitle &&
            scene.notificationDesc
          ) {
            schedulePushNotification(
              scene.notificationTitle,
              scene.notificationDesc,
              scene.notifyTime
            );
          }
        }

        const remaining = Math.max(0, Math.floor((endTime - now) / 1000));

        if (remaining <= 0 && targetScene) {
          console.log("⏰ Czas oczekiwania już minął, przechodzę dalej...");
          return handleSceneChange(targetScene);
        }

        setWaitingVisible(true);
        setNotifyScreenName(scene.notifyScreenName);
        setTimeLeft(remaining);

        const interval = setInterval(async () => {
          const nowTick = Date.now();
          const diff = Math.max(0, Math.floor((endTime! - nowTick) / 1000));
          setTimeLeft(diff);

          if (diff <= 0) {
            clearInterval(interval);
            setWaitingVisible(false);

            // Czyszczenie zawartości storage po przejściu do nastepnej sceny.
            await Storage.removeItem({ key: "waitingEndTimestamp" });
            await Storage.removeItem({ key: "autoNextScene" });

            if (targetScene) handleSceneChange(targetScene);
          }
        }, 1000);

        return; // Zatrzymaj dalszą obsługę sceny
      }

      // 6. Obsłuż dźwięk (jeśli masz soundController)
      if (scene.sound) {
        await playSound(scene.sound, scene.soundPlayLoop ?? false);
      }

      // 7. Obsłuż ekran specjalny (jeśli jest)
      if (scene.specialScreen) {
        setSpecialScene({
          ...scene.specialScreen,
          npcKey: scene.npcKey,
          title: scene.title,
          subtitle: scene.subtitle,
          background: scene.specialScreen?.background || null,
          nextScene: scene.autoNextScene,
        });
        setSpecialSceneVisible(true);

        return;
      }

      // 8. Obsłuż nextAct
      if (scene.nextAct) {
        console.log("🌀 Przechodzę do nowego aktu:", scene.nextAct);

        const nextAct = scene.nextAct as ActId;
        setCurrentActState(nextAct);
        await Storage.setItem({ key: "currentAct", value: nextAct });

        // Wyczyść pozostałości z poprzedniego aktu
        await Storage.removeItem({ key: "waitingEndTimestamp" });
        await Storage.removeItem({ key: "autoNextScene" });

        updateOptions([]);
        clearMessages();

        const firstScene = getInitialSceneForAct(nextAct);
        if (firstScene) {
          return handleSceneChange(firstScene);
        } else {
          console.warn("❌ Nie znaleziono initialScene dla aktu:", nextAct);
        }
        return;
      }

      // 9. Obsłuż autoNext
      if (scene.autoNextScene && scene.autoNextDelay) {
        setTimeout(() => {
          handleSceneChange(scene.autoNextScene!);
        }, scene.autoNextDelay);
      }
    },
    [currentAct]
  );

  useRestoreGame(handleSceneChange);

  return {
    dialogue,
    options,
    currentScene,
    handleSceneChange,
    specialScene,
    specialSceneVisible,
    waitingVisible,
    setSpecialScene,
    setSpecialSceneVisible,
    notifyScreenName,
    timeLeft,
  };
};
