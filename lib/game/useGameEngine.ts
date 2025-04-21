// /lib/game/useGameEngine.ts
import { useDialogue } from "@/lib/dialogue/useDialogue";
import { useOptions } from "@/lib/dialogue/useOptions";
import { useEffect, useState } from "react";
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

export const useGameEngine = () => {
  const { dialogue, addMessage } = useDialogue();
  const { options, updateOptions } = useOptions();

  const [currentScene, setCurrentScene] = useState<string | null>(null);
  const [currentAct, setCurrentActState] = useState<ActId>("startgame");
  const [waitingVisible, setWaitingVisible] = useState(false);
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

  const handleSceneChange = async (sceneName: string) => {
    console.log(`⚙️ handleSceneChange(${sceneName}) @ ${Date.now()}`);

    // 1. Ustaw scenę
    setCurrentScene(sceneName);
    await Storage.setItem({ key: "currentScene", value: sceneName });

    // 2. Pobierz scenariusz
    const lang = await getCurrentLanguage();
    const plec = await Storage.getItem({ key: "plec" });
    console.log("Płeć gracza:", plec);
    const scenes = getScenesForAct(
      currentAct,
      lang as Language,
      plec as "pan" | "pani" | null
    );
    const scene = scenes[sceneName];

    if (!scene) {
      console.warn("❌ Nie znaleziono sceny:", sceneName);
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
        autoNextDelay: scene.autoNextScene ? 5000 : undefined,
        nextScene: scene.autoNextScene,
      });
      setSpecialSceneVisible(true);

      return;
    }

    // 8. Obsłuż autoNext
    if (scene.autoNextScene && scene.autoNextDelay) {
      setTimeout(() => {
        handleSceneChange(scene.autoNextScene!);
      }, scene.autoNextDelay);
    }
  };

  const initializeScene = async () => {
    const lang = await getCurrentLanguage();
    const plec = await Storage.getItem({ key: "plec" });
    const act = (await getCurrentAct()) as ActId;
    setCurrentActState(act);

    const storedScene = await Storage.getItem({ key: "currentScene" });
    const scenes = getScenesForAct(
      act,
      lang as Language,
      plec as "pan" | "pani" | null
    );

    const initialScene = getInitialSceneForAct(act);
    const sceneToLoad =
      storedScene && scenes[storedScene] ? storedScene : initialScene;

    handleSceneChange(sceneToLoad);
  };

  useEffect(() => {
    console.log("🔄 useGameEngine -> INIT");
    initializeScene();
  }, []);

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
  };
};
