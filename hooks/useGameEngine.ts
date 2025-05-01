// /lib/game/useGameEngine.ts
import { useCallback, useEffect, useState } from "react";
import Storage from "expo-storage";
import { getCurrentLanguage } from "@/models/LanguageController";
import { DeviceEventEmitter } from "react-native";
import {
  getInitialSceneForAct,
  getScenesForAct,
  ActId,
} from "@/services/scenarioLoader";
import { Language } from "@/i18n/translations";
import { schedulePushNotification } from "@/services/schedulePushNotification";
import { useRestoreGame } from "@/hooks/useRestoreGame";
import { saveToHistory } from "@/services/saveToHistory";
import { useDialogue } from "@/viewmodels/useDialogueViewModel";
import { useOptions } from "@/services/useOptions";
import { useWaitingScreen } from "@/context/WaitingScreenContext";
import { useDarknessUI } from "@/context/DarknessUIContext";

export const useGameEngine = () => {
  const { dialogue, addMessage, clearMessages } = useDialogue();
  const { options, updateOptions } = useOptions();
  const [waitingVisible, setWaitingVisible] = useState(false);
  const [notifyScreenName, setNotifyScreenName] = useState<string | null>(null);
  const [currentScene, setCurrentScene] = useState<string | null>(null);
  const [currentAct, setCurrentActState] = useState<ActId | null>(null);
  const [specialSceneVisible, setSpecialSceneVisible] = useState(false);
  const { startWaiting, stopWaiting, setTimeLeft } = useWaitingScreen();
  const [specialScene, setSpecialScene] = useState<any>(null);
  const [currentDeathScreen, setCurrentDeathScreen] = useState<string | null>(
    null
  );
  const [deathScreenVisible, setDeathScreenVisible] = useState(false);
  const [lastCheckpoint, setLastCheckpoint] = useState<string | null>(null);
  const [actDataReloadKey, setActDataReloadKey] = useState(Date.now());
  const [actSwitcherRefresh, setActSwitcherRefresh] = useState<
    (() => void) | null
  >(null);
  const { enableDark, disableDark } = useDarknessUI();

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

  useEffect(() => {
    const checkWaitingFromStorage = async () => {
      const endTimestampStr = await Storage.getItem({
        key: "waitingEndTimestamp",
      });
      const nextScene = await Storage.getItem({ key: "autoNextScene" });
      const screenName = await Storage.getItem({ key: "waitingScreenName" });

      if (!endTimestampStr || !nextScene || !screenName) return;

      const endTimestamp = parseInt(endTimestampStr, 10);
      const now = Date.now();

      if (now >= endTimestamp) {
        console.log("⌛ Waiting screen time is over, going to next scene");
        await Storage.removeItem({ key: "waitingEndTimestamp" });
        await Storage.removeItem({ key: "autoNextScene" });
        await Storage.removeItem({ key: "waitingScreenName" });

        return handleSceneChange(nextScene);
      }

      const remaining = Math.floor((endTimestamp - now) / 1000);
      startWaiting(screenName, remaining);
    };

    checkWaitingFromStorage();
  }, []);

  const onRetryFromDeath = async () => {
    setDeathScreenVisible(false);
    setCurrentDeathScreen(null);

    await Storage.removeItem({ key: "notifiedScene" });
    console.log("Usunięto zapisane dane notifiedScene.");

    const sceneToRestore = lastCheckpoint || getInitialSceneForAct(currentAct!);
    console.log("↩️ Wracam do checkpointu:", sceneToRestore);
    await handleSceneChange(sceneToRestore);
  };

  const clearNotificationSentKeys = async () => {
    const allKeys = await Storage.getAllKeys();
    const notificationKeys = allKeys.filter((key) =>
      key.startsWith("notificationSent:")
    );

    for (const key of notificationKeys) {
      await Storage.removeItem({ key });
      console.log(`🗑️ Usunięto klucz: ${key}`);
    }
  };

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

      // Włącz ciemne UI
      if (scene.enableDarknessUI) {
        console.log("Tryb ciemny został włączony");
        await enableDark();
      }

      // Wyłącz ciemne UI
      if (scene.disableDarknessUI) {
        console.log("Tryb ciemny został wyłączony");
        await disableDark();
      }

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

      const msg = { autor: "NPC", tekst, npcKey: scene.npcKey };
      addMessage("NPC", tekst, scene.npcKey);

      await saveToHistory(currentAct, msg);

      console.log("Dodaję wiadomość do dialogu", tekst);

      if (scene.options) {
        // 5. Dodaj opcje jeśli są
        updateOptions(
          scene.options.map((option) => ({
            tekst: option.tekst,
            akcja: async () => {
              // Wykonaj dodatkową akcję (np. zapis do Storage)
              if (option.akcja) {
                await option.akcja();
                await Storage.removeItem({ key: "waitingEndTimestamp" });
                await Storage.removeItem({ key: "autoNextScene" });
                await Storage.removeItem({ key: "notifiedScene" });
                await Storage.removeItem({ key: "notificationSentKey" });

                await clearNotificationSentKeys();
                console.log(
                  "Usunięto Storage dla waitingEndTimestamp, autoNextScene oraz notifiedScene"
                );
              }

              // Zapisywanie odpowiedzi gracza do historii.
              await saveToHistory(currentAct, {
                autor: "GRACZ",
                tekst: option.tekst,
              });

              // Potem przejdź do kolejnej sceny
              handleSceneChange(option.next);
            },
          }))
        );
      }

      if (scene.checkpoint) {
        console.log("Zapisuję checkpoint:", sceneName);
        setLastCheckpoint(sceneName);
      }

      if (scene.deathScreen) {
        console.log("💀 Death screen triggered:", scene.deathScreen);
        setCurrentDeathScreen(scene.deathScreen);
        setDeathScreenVisible(true);
        return; // ⛔ Stop dalsze przetwarzanie
      }

      if (scene.notifyTime && scene.notifyScreenName) {
        const targetScene = scene.autoNextScene;
        const notifyKey = "waitingEndTimestamp";
        const notifiedSceneKey = "notifiedScene";
        const notificationSentKey = `notificationSent:${sceneName}`;

        const storedTimestamp = await Storage.getItem({ key: notifyKey });
        const storedNotifiedScene = await Storage.getItem({
          key: notifiedSceneKey,
        });
        const notificationAlreadySent = await Storage.getItem({
          key: notificationSentKey,
        });
        const now = Date.now();

        let endTime;

        if (!storedTimestamp || storedNotifiedScene !== sceneName) {
          endTime = now + scene.notifyTime * 1000;
          await Storage.setItem({ key: notifyKey, value: String(endTime) });
          await Storage.setItem({
            key: "autoNextScene",
            value: targetScene || "",
          });
          await Storage.setItem({ key: notifiedSceneKey, value: sceneName });
          console.log(
            `🆕 Nowy endTime dla '${sceneName}': ${new Date(
              endTime
            ).toISOString()}`
          );
        } else {
          endTime = parseInt(storedTimestamp, 10);
          console.log(
            `⏳ Istniejący endTime dla '${sceneName}': ${new Date(
              endTime
            ).toISOString()}`
          );
        }

        const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
        console.log(`⏰ Pozostały czas dla '${sceneName}': ${remaining}s`);

        if (
          scene.notification &&
          scene.notificationTitle &&
          scene.notificationDesc &&
          !notificationAlreadySent &&
          remaining > 0
        ) {
          console.log(
            `📢 Planuję powiadomienie za ${remaining}s: ${scene.notificationTitle}`
          );
          await schedulePushNotification(
            scene.notificationTitle,
            scene.notificationDesc,
            remaining
          );
          await Storage.setItem({ key: notificationSentKey, value: "true" });
        } else if (notificationAlreadySent) {
          console.log(`🚫 Powiadomienie dla '${sceneName}' już ustawione`);
        }

        if (remaining <= 0 && targetScene) {
          console.log(`✅ Czas minął, przechodzę do '${targetScene}'`);
          await Storage.removeItem({ key: notifyKey });
          await Storage.removeItem({ key: "autoNextScene" });
          await Storage.removeItem({ key: notifiedSceneKey });
          await Storage.removeItem({ key: notificationSentKey });
          return handleSceneChange(targetScene);
        }

        startWaiting(scene.notifyScreenName || "defaultScreen", remaining);

        const interval = setInterval(async () => {
          const nowTick = Date.now();
          const diff = Math.max(0, Math.floor((endTime - nowTick) / 1000));
          setTimeLeft(diff);

          if (diff <= 0) {
            clearInterval(interval);
            stopWaiting();

            console.log(
              `✅ Oczekiwanie w '${sceneName}' zakończone, czyszczę dane`
            );
            await Storage.removeItem({ key: notifyKey });
            await Storage.removeItem({ key: "autoNextScene" });
            await Storage.removeItem({ key: notifiedSceneKey });
            await Storage.removeItem({ key: notificationSentKey });

            if (targetScene) handleSceneChange(targetScene);
          }
        }, 1000);

        return; // Stop dalszej obsługi sceny
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

        // ✅ Dodaj obecny akt do completedActs
        const completed = await Storage.getItem({ key: "completedActs" });
        let completedActs = completed ? JSON.parse(completed) : [];

        if (!completedActs.includes(currentAct)) {
          completedActs.push(currentAct);
          await Storage.setItem({
            key: "completedActs",
            value: JSON.stringify(completedActs),
          });

          DeviceEventEmitter.emit("completedActsUpdated");
        }

        const nextAct = scene.nextAct as ActId;
        setCurrentActState(nextAct);
        await Storage.setItem({ key: "currentAct", value: nextAct });

        // Wyczyść pozostałości z poprzedniego aktu
        await Storage.removeItem({ key: "waitingEndTimestamp" });
        await Storage.removeItem({ key: "autoNextScene" });
        await Storage.removeItem({ key: "notifiedScene" });

        updateOptions([]);
        clearMessages();

        const firstScene = getInitialSceneForAct(nextAct);
        if (firstScene) {
          return handleSceneChange(firstScene);
        } else {
          console.warn("❌ Nie znaleziono initialScene dla aktu:", nextAct);
        }

        setActDataReloadKey(Date.now());

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
    deathScreenVisible,
    currentDeathScreen,
    onRetryFromDeath,
    actDataReloadKey,
    setActSwitcherRefresh,
  };
};
