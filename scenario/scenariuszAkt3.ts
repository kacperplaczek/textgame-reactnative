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
    notifyTime: 10,
    notifyScreenName: "powrot_na_statek",
    autoNextScene: "akt3_start",
  },

  // ? DO KOPIOWANIA
  akt3_: {
    npcKey: "flightControlCenter",
    tekst: () => "",
    options: [
      { tekst: "", next: "" },
      { tekst: "", next: "" },
    ],
  },

  akt3_start: {
    npcKey: "flightControlCenter",
    tekst: () => "Co myślisz o tym, co się stało na planecie?",
    options: [
      { tekst: "Nie mogę przestać myśleć o...", next: "akt3_twojeemocje_1" },
      {
        tekst: plec
          ? translations[`akt3odptestowa_${plec}`]
          : translations.akt3odptestowa,
        next: "akt3_twojeemocje_1",
      },
    ],
  },

  akt3_twojeemocje_1: {
    npcKey: "flightControlCenter",
    tekst: () => "Twoje emocje są zrozumiałe. Musisz jednak zachować spokój.",
    options: [
      { tekst: "Po tym? Trudno o spokój.", next: "akt3_scena2" },
      { tekst: "Masz rację. Muszę się skupić.", next: "akt3_scena2" },
    ],
  },

  akt3_scena2: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Widzę, że jesteś pod wpływem silnego stresu. Moim zadaniem jest zapewnić pomoc i ochronę. Przywołuje ECHO.",
    options: [
      { tekst: "Kto to ECHO?", next: "akt3_scena2_echo_1" },
      { tekst: "Nie ma takiej potrzeby.", next: "akt3_scena3_echo_1" },
    ],
  },

  // ? KIM JEST ECHO

  akt3_scena2_echo_1: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "To zaawansowane AI zajmujące się ludzką naturą. Uwierz mi, potrafi pomóc.",
    autoNextDelay: 3000,
    autoNextScene: "akt3_scena2_echo_2",
  },

  akt3_scena2_echo_2: {
    npcKey: "echo",
    tekst: () => "Witaj. Jestem ECHO. Jak mogę Ci służyć?",
    options: [
      { tekst: "Czy to w ogóle ma sens?", next: "akt3_scena4" },
      { tekst: "Nie wiem czy mogę kontynuować!", next: "akt3_scena4" },
    ],
  },

  // ? NIE MA TAKIEJ POTRZEBY

  akt3_scena3_echo_1: {
    npcKey: "flightControlCenter",
    tekst: () => "Nie Ty o tym decydujesz. Siadaj i skup się.",
    autoNextDelay: 3000,
    autoNextScene: "akt3_scena2_echo_2",
  },

  akt3_scena3_echo_2: {
    npcKey: "echo",
    tekst: () => "Witaj. Jestem ECHO. Jak mogę Ci służyć?",
    options: [
      { tekst: "Czy to w ogóle ma sens?", next: "akt3_scena4" },
      { tekst: "Nie wiem czy mogę kontynuować!", next: "akt3_scena4" },
    ],
  },

  // ? Ciąg dalszy (1)

  akt3_scena4: {
    npcKey: "echo",
    tekst: () =>
      "Twoje pytanie jest istotne ale w tej chwili istotniejsze jest Twoje przetrwanie. Skieruj swoje myśli w tę stronę.",
    options: [
      { tekst: "Czyli gdzie dokładnie?", next: "akt3_pytanie_miejsca" },
      { tekst: "Chce tylko wrócić do domu.", next: "akt3_pytanie_miejsca" },
    ],
  },

  akt3_pytanie_miejsca: {
    npcKey: "flightControlCenter",
    tekst: () => "Uwaga! Wykryto nowy obiekt na kursie kolizyjnym!",
    options: [
      { tekst: "Co to za obiekt?", next: "akt3_identyfikacja_obiektu" },
      { tekst: "Spróbujmy go uniknąć!", next: "akt3_unik_obiektu" },
    ],
  },

  akt3_identyfikacja_obiektu: {
    npcKey: "flightControlCenter",
    tekst: () => "To statek podobny do naszego. Spróbuję nawiązać kontakt.",
    autoNextScene: "akt3_kontakt_dowodca",
    autoNextDelay: 3000,
  },

  akt3_unik_obiektu: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Wiesz co na to protokół. To statek podobny do naszego. Spróbuję nawiązać kontakt.",
    autoNextScene: "akt3_kontakt_dowodca",
    autoNextDelay: 3000,
  },

  akt3_kontakt_dowodca: {
    npcKey: "dowodca",
    tekst: () => "Tu dowódca statku Explorator. Kim jesteście?",
    options: [
      { tekst: "Ekspedycją naukową.", next: "akt3_czarna_dziura" },
      { tekst: "Co tu robisz?", next: "akt3_czarna_dziura" },
    ],
  },

  akt3_czarna_dziura: {
    npcKey: "dowodca",
    tekst: () =>
      "Tkwimy tutaj! Nie zbliżajcie się! Utknęliśmy w polu grawitacyjnym czarnej dziury!",
    options: [
      { tekst: "Długo tutaj jesteś?", next: "akt3_deathscreen_czarna_dziura" },
      { tekst: "Manewr unikowy! TERAZ!", next: "akt3_unik_czarnej_dziury" },
    ],
  },

  akt3_unik_czarnej_dziury: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "W ostatniej chwili udało uniknąć się tego pola grawitacyjnego! Nie powiem, było gorąco!",
    options: [
      {
        tekst: "Jak długo tutaj jesteś?",
        next: "akt3_deathscreen_czarna_dziura",
      },
      { tekst: "Masz zapasy?", next: "akt3_zapasy" },
    ],
  },

  akt3_deathscreen_czarna_dziura: {
    npcKey: "dowodca",
    deathScreen: "wpadlesWCzarnaDziure",
    tekst: () => "Wasz statek przekroczył horyzont zdarzeń... To koniec...",
  },
});
