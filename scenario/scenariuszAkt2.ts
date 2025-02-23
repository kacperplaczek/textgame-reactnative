import { SceneType } from "@/scenario/types";
import Storage from "expo-storage";

const savePlayerChoices = async (key: string, value: string) => {
  await Storage.setItem({ key, value });
};

const getPlayerChoice = async (key: string): Promise<string | null> => {
  return await Storage.getItem({ key });
};

export const getScenes = (
  translations: any,
  plec: "pan" | "pani" | null
): Record<string, SceneType> => ({
  rozpoczecie_akt2: {
    npcKey: "flightControlCenter",
    tekst: () => translations.rozpoczecieAkt2,
    options: [
      {
        tekst: translations.akt2Odp1,
        next: "akt2_scen2",
      },
      {
        tekst: translations.akt2Odp2,
        next: "akt2_scen2",
      },
    ],
  },

  akt2_scen2: {
    npcKey: "flightControlCenter",
    tekst: async () => {
      // 🔄 Pobranie danych o statku i wyposażeniu
      const shipClass =
        (await Storage.getItem({ key: "shipClass" })) || "Venturi";
      const equipment =
        (await Storage.getItem({ key: "shipEquipment" })) ||
        "dodatkowy prowiant";

      // 📌 Wstawienie zmiennych do tekstu
      return translations.akt2Scen2
        .replace("{{statek}}", shipClass)
        .replace("{{wyposazenie}}", equipment);
    },
    options: [
      {
        tekst: translations.akt2Odp3,
        next: "akt2_scen3",
      },
      {
        tekst: translations.akt2Odp4,
        next: "akt2_scen4",
      },
    ],
  },

  akt2_scen3: {
    npcKey: "flightControlCenter",
    tekst: () => translations.akt2Scen3,
    options: [
      {
        tekst: translations.akt2Odp5,
        next: "akt2_scen2",
      },
      {
        tekst: translations.akt2Odp6,
        next: "akt2_scen2",
      },
    ],
  },

  akt2_scen4: {
    npcKey: "flightControlCenter",
    tekst: () => translations.akt2Scen4,
    options: [
      {
        tekst: translations.akt2Odp5,
        next: "akt2_scen2",
      },
      {
        tekst: translations.akt2Odp6,
        next: "akt2_scen2",
      },
    ],
  },
});
