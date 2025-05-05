import { create } from "zustand";

type GameState = {
  act: string | null;
  scene: string | null;
  checkpoint: string | null;
  setAct: (act: string) => void;
  setScene: (scene: string) => void;
  setCheckpoint: (checkpoint: string) => void;
};

export const useGameStore = create<GameState>((set) => ({
  act: null,
  scene: null,
  checkpoint: null,
  setAct: (act) => set({ act }),
  setScene: (scene) => set({ scene }),
  setCheckpoint: (checkpoint) => set({ checkpoint }),
}));
