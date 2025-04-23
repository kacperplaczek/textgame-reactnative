import { useEffect } from "react";
import Storage from "expo-storage";
import { getCurrentAct } from "@/lib/helpers/getCurrentAct";
import {
  getInitialSceneForAct,
  getScenesForAct,
} from "@/lib/helpers/scenarioLoader";
import { Language } from "@/lib/translations/translations";
import { getCurrentLanguage } from "@/lib/settings/LanguageController";
import { ActId } from "@/lib/helpers/scenarioLoader";

export const useRestoreGame = (onRestore: (scene: string) => void) => {
  useEffect(() => {
    const restore = async () => {
      const lang = await getCurrentLanguage();
      const plec = await Storage.getItem({ key: "plec" });
      const act = (await getCurrentAct()) as ActId;
      const scenes = getScenesForAct(
        act,
        lang as Language,
        plec as "pan" | "pani" | null
      );

      const storedScene = await Storage.getItem({ key: "currentScene" });

      // Obsługa oczekiwania: waitingEndTimestamp
      const waitingEndRaw = await Storage.getItem({
        key: "waitingEndTimestamp",
      });
      const autoNextScene = await Storage.getItem({ key: "autoNextScene" });

      if (waitingEndRaw && autoNextScene) {
        const waitingEnd = parseInt(waitingEndRaw);
        const now = Date.now();

        if (now >= waitingEnd) {
          // Czas już minął, przechodzimy do next scene
          console.log(
            "⏰ Czas oczekiwania minął, przechodzę dalej:",
            autoNextScene
          );
          onRestore(autoNextScene);
          return;
        }
      }

      // Jeśli mamy scenę w cache, to ją odtwarzamy, jeśli nie to startową
      const sceneToLoad =
        storedScene && scenes[storedScene]
          ? storedScene
          : getInitialSceneForAct(act);
      console.log("📦 Przywracam scenę:", sceneToLoad);
      onRestore(sceneToLoad);
    };

    restore();
  }, [onRestore]);
};
