import { SceneType } from "@/scenario/types";
import Storage from "expo-storage";

const savePlayerChoices = async (key: string, value: string) => {
  await Storage.setItem({ key, value });
};

export const getScenes = (
  translations: any,
  plec: "pan" | "pani" | null
): Record<string, SceneType> => ({
  // 🔥 SCENA 1: Początek komunikacji
  rozpoczecie_akt2: {
    npcKey: "flightControlCenter",
    tekst: () => translations.rozpoczecieAkt2,
    options: [
      { tekst: translations.akt2Odp1, next: "akt2_scen2" },
      { tekst: translations.akt2Odp2, next: "akt2_scen2" },
    ],
  },

  // 🔥 SCENA 2: Potwierdzenie statku i wyposażenia
  akt2_scen2: {
    npcKey: "flightControlCenter",
    tekst: async () => {
      const shipClass =
        (await Storage.getItem({ key: "shipClass" })) || "Venturi";
      const equipment =
        (await Storage.getItem({ key: "shipEquipment" })) ||
        "dodatkowy prowiant";

      return translations.akt2Scen2
        .replace("{{statek}}", shipClass)
        .replace("{{wyposazenie}}", equipment);
    },
    options: [
      { tekst: translations.akt2Odp3, next: "akt2_scen3" },
      { tekst: translations.akt2Odp4, next: "akt2_scen4" },
    ],
  },

  // 🔥 SCENA 3: Ile osób liczy załoga?
  akt2_scen3: {
    npcKey: "flightControlCenter",
    tekst: () => translations.akt2Scen3,
    options: [
      { tekst: "Lecę tylko Ja", next: "akt2_scen5" },
      { tekst: "Nie wiem. Gdzie moi ludzie?", next: "akt2_scen6" },
    ],
  },

  // 🔥 SCENA 4: Nie można zmienić konfiguracji
  akt2_scen4: {
    npcKey: "flightControlCenter",
    tekst: () => translations.akt2Scen4,
    checkpoint: true,
    options: [
      { tekst: "Lecę tylko Ja", next: "akt2_scen5" },
      { tekst: "Nie wiem. Gdzie moi ludzie?", next: "akt2_scen6" },
    ],
  },

  // 🔥 SCENA 5: Normalna procedura startowa
  akt2_scen5: {
    npcKey: "flightControlCenter",
    tekst: () => translations.akt2Scen5,
    options: [
      { tekst: "Ustaw ciąg minimalny", next: "akt2_scen7" },
      { tekst: "Nie ma na co czekać. Ustaw maks!", next: "akt2_scen8" },
    ],
  },

  // 🔥 SCENA 6: Informacja o utraconej załodze
  akt2_scen6: {
    npcKey: "flightControlCenter",
    tekst: () => translations.akt2Scen6,
    options: [
      { tekst: "Ustaw ciąg minimalny", next: "akt2_scen7" },
      { tekst: "Nie ma na co czekać. Ustaw maks!", next: "akt2_scen8" },
    ],
  },

  // 🔥 SCENA 7: Ciąg minimalny – dobra ścieżka
  akt2_scen7: {
    npcKey: "flightControlCenter",
    tekst: () => "Potwierdzam ciąg minimalny! Teraz sprawdź systemy zasilania.",
    options: [
      { tekst: "Zasilanie działa poprawnie", next: "akt2_start_dobry" },
      { tekst: "Nie mam na to czasu. Co dalej", next: "akt2_start_zly" },
    ],
  },

  // 🔥 SCENA 8: Ciąg maksymalny – zła ścieżka
  akt2_scen8: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Jak chcesz. Potwierdzam ciąg maksymalny! Teraz sprawdź systemy zasilania.",
    options: [
      { tekst: "Zasilanie działa poprawnie", next: "akt2_start_zly" },
      { tekst: "Nie mam na to czasu. Co dalej", next: "akt2_start_zly" },
    ],
  },

  // ✅ DOBRA ŚCIEŻKA – Poprawne ustawienia przed startem
  akt2_start_dobry: {
    npcKey: "flightControlCenter",
    tekst: () => "Wszystko wygląda w porządku! Możesz startować.",
    options: [
      { tekst: "STARTUJEMY!", next: "next_act" },
      { tekst: "Wróć do procedury", next: "akt2_scen2" },
    ],
  },

  // ❌ ZŁA ŚCIEŻKA – Błędne ustawienia przed startem
  akt2_start_zly: {
    npcKey: "flightControlCenter",
    tekst: () => "BŁĄD: Niepoprawne ustawienia startu! Awaria silnika!",
    deathScreen: "explosionDeathScreen",
  },

  // 🔥 PRZEJŚCIE DO KOLEJNEGO AKTU
  next_act: {
    npcKey: "flightControlCenter",
    tekst: () => "Start przebiegł pomyślnie. Możesz kontynuować misję!",
    autoNextScene: "rozpoczecie_akt2",
    autoNextDelay: 3000,
  },
});
