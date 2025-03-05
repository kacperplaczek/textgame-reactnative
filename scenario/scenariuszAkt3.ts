import { SceneType } from "@/scenario/types";
import Storage from "expo-storage";

export const savePlayerChoices = async (key: string, value: string) => {
  await Storage.setItem({ key, value });
};

export const getPlayerEquipment = async () => {
  const equipment = await Storage.getItem({ key: "wybraneZaopatrzenie" });
  return equipment;
};

export const getScenes = (
  translations: any,
  plec: "pan" | "pani" | null
): Record<string, SceneType> => ({
  // 🔥 SCENA 1: Początek komunikacji
  rozpoczecie_aktu: {
    npcKey: "flightControlCenter",
    tekst: () => "Oczekiwanie...",
    notifyTime: 60,
    notifyScreenName: "powrot_na_statek",
    autoNextScene: "test",
  },
});
