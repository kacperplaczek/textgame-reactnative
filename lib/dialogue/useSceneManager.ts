import { useEffect, useState } from "react";
import Storage from "expo-storage";
import { getCurrentAct, setCurrentAct } from "../helpers/getCurrentAct";
import {
  getInitialSceneForAct,
  getScenesForAct,
} from "../helpers/scenarioLoader";
import { Language } from "../translations/translations";
import { ActId } from "../helpers/scenarioLoader";
import { getCurrentLanguage } from "../settings/LanguageController";

type UseSceneManagerResult = {
  currentScene: string | null;
  currentAct: ActId;
  initializeScene: () => Promise<void>;
};

export const useSceneManager = (): UseSceneManagerResult => {
  const [currentScene, setCurrentScene] = useState<string | null>(null);
  const [currentAct, setCurrentActState] = useState<ActId>("startgame");

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

    if (storedScene && scenes[storedScene]) {
      setCurrentScene(storedScene);
    } else {
      setCurrentScene(initialScene);
      await Storage.setItem({ key: "currentScene", value: initialScene });
    }
  };

  useEffect(() => {
    initializeScene();
  }, []);

  return {
    currentScene,
    currentAct,
    initializeScene,
  };
};
