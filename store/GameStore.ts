// /stores/gameStore.ts
import { create } from "zustand";
import Storage from "expo-storage";
import { DeviceEventEmitter } from "react-native";
import {
  getInitialSceneForAct,
  getScenesForAct,
  ActId,
} from "@/services/scenarioLoader";
import { getCurrentLanguage } from "@/models/LanguageController";
import { Language } from "@/i18n/translations";

interface GameState {
  currentScene: string | null;
  currentAct: ActId | null;
  specialScene: any;
  specialSceneVisible: boolean;
  deathScreenVisible: boolean;
  currentDeathScreen: string | null;
  lastCheckpoint: string | null;
  actDataReloadKey: number;
  notifyScreenName: string | null;
  waitingVisible: boolean;

  setCurrentScene: (scene: string | null) => void;
  setCurrentAct: (act: ActId | null) => void;
  setSpecialScene: (scene: any) => void;
  setSpecialSceneVisible: (visible: boolean) => void;
  setDeathScreenVisible: (visible: boolean) => void;
  setCurrentDeathScreen: (screen: string | null) => void;
  setLastCheckpoint: (checkpoint: string | null) => void;
  setActDataReloadKey: (key: number) => void;
  setNotifyScreenName: (name: string | null) => void;
  setWaitingVisible: (visible: boolean) => void;
  setActSwitcherRefresh: (cb: (() => void) | null) => void;
  initializeAct: () => Promise<void>;
  handleSceneChange: (sceneName: string) => Promise<void>;
  onRetryFromDeath: () => Promise<void>;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentScene: null,
  currentAct: null,
  specialScene: null,
  specialSceneVisible: false,
  deathScreenVisible: false,
  currentDeathScreen: null,
  lastCheckpoint: null,
  actDataReloadKey: Date.now(),
  notifyScreenName: null,
  actSwitcherRefresh: null,
  waitingVisible: false,

  setCurrentScene: (scene) => set({ currentScene: scene }),
  setCurrentAct: (act) => set({ currentAct: act }),
  setSpecialScene: (scene) => set({ specialScene: scene }),
  setSpecialSceneVisible: (visible) => set({ specialSceneVisible: visible }),
  setDeathScreenVisible: (visible) => set({ deathScreenVisible: visible }),
  setCurrentDeathScreen: (screen) => set({ currentDeathScreen: screen }),
  setLastCheckpoint: (checkpoint) => set({ lastCheckpoint: checkpoint }),
  setActDataReloadKey: (key) => set({ actDataReloadKey: key }),
  setNotifyScreenName: (name) => set({ notifyScreenName: name }),
  setWaitingVisible: (visible) => set({ waitingVisible: visible }),
  setActSwitcherRefresh: (cb) => set({ actSwitcherRefresh: cb }),

  initializeAct: async () => {
    const storedAct = (await Storage.getItem({ key: "currentAct" })) as ActId;
    const fallbackAct = "startgame";
    const actToUse = storedAct || fallbackAct;
    console.log("Ustawiam AKT z Storage:", actToUse);
    set({ currentAct: actToUse });
  },

  handleSceneChange: async (sceneName: string) => {
    const { currentAct } = get();
    if (!currentAct) return;

    set({ currentScene: sceneName });
    await Storage.setItem({ key: "currentScene", value: sceneName });

    const lang = await getCurrentLanguage();
    const plec = await Storage.getItem({ key: "plec" });
    const scenes = getScenesForAct(
      currentAct,
      lang as Language,
      plec as "pan" | "pani" | null
    );
    const scene = scenes[sceneName];

    if (!scene) return;

    if (scene.checkpoint) set({ lastCheckpoint: sceneName });

    if (scene.deathScreen) {
      set({ currentDeathScreen: scene.deathScreen, deathScreenVisible: true });
      return;
    }

    if (scene.specialScreen) {
      set({
        specialScene: {
          ...scene.specialScreen,
          npcKey: scene.npcKey,
          title: scene.title,
          subtitle: scene.subtitle,
        },
        specialSceneVisible: true,
      });
      return;
    }

    if (scene.nextAct) {
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
      set({ currentAct: nextAct });
      await Storage.setItem({ key: "currentAct", value: nextAct });
      set({ actDataReloadKey: Date.now() });

      const firstScene = getInitialSceneForAct(nextAct);
      if (firstScene) await get().handleSceneChange(firstScene);
    }
  },

  onRetryFromDeath: async () => {
    const { lastCheckpoint, currentAct } = get();
    set({ deathScreenVisible: false, currentDeathScreen: null });
    await Storage.removeItem({ key: "notifiedScene" });

    const sceneToRestore = lastCheckpoint || getInitialSceneForAct(currentAct!);
    if (sceneToRestore) await get().handleSceneChange(sceneToRestore);
  },
}));
