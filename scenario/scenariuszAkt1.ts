import { actsConfig } from "@/lib/settings/acts.config";
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
  dzwoni_officer: {
    npcKey: "officer",
    tekst: () => translations.AIPL_dzwoni_officer_text,
    specialScreen: {
      image: "@/assets/images/bg_ufo.png",
      background: "@/assets/images/bg_ufo.png",
    },
    sound: "callphone",
    soundPlayLoop: true,
    autoNextScene: "pytanie_powitalne",
  },

  pytanie_powitalne: {
    npcKey: "officer",
    tekst: () => translations.welcome,
    options: [
      {
        tekst: translations.pan,
        next: "pytanie_o_powody",
        akcja: async () => await Storage.setItem({ key: "plec", value: "pan" }),
      },
      {
        tekst: translations.pani,
        next: "pytanie_o_powody",
        akcja: async () =>
          await Storage.setItem({ key: "plec", value: "pani" }),
      },
    ],
  },
  pytanie_o_powody: {
    npcKey: "officer",
    tekst: () => translations.pytanieOPowody00001,
    options: [
      {
        tekst: translations.pytaniePowitalneOpcja1,
        next: "przejscie_do_misji_powody",
      },
      {
        tekst: translations.pytaniePowitalneOpcja2,
        next: "przejscie_do_misji_nie_interes",
      },
    ],
  },

  przejscie_do_misji_powody: {
    npcKey: "officer",
    tekst: () => translations.przejscieDoMisjiPowody00001,
    options: [
      { tekst: translations.przejscieDoMisjiOpcja1, next: "pierwsza_misja" },
      {
        tekst: translations.przejscieDoMisjiOpcja2,
        next: "klamstwo_trzecia_misja",
      },
    ],
  },
  przejscie_do_misji_nie_interes: {
    npcKey: "officer",
    tekst: () => translations.przejscie_do_misji_nie_interes,
    options: [
      { tekst: translations.przejscieDoMisjiOpcja1, next: "pierwsza_misja" },
      {
        tekst: translations.przejscieDoMisjiOpcja2,
        next: "klamstwo_trzecia_misja",
      },
    ],
  },
  pierwsza_misja: {
    npcKey: "officer",
    tekst: () => translations.pierwsza_misja,
    options: [
      { tekst: translations.pierwszaMisjaOpcja1, next: "zalogowy" },
      { tekst: translations.pierwszaMisjaOpcja2, next: "pojedynczy" },
    ],
  },
  klamstwo_trzecia_misja: {
    npcKey: "officer",
    tekst: () => translations.klamstwo_trzecia_misja,
    options: [
      { tekst: translations.pierwszaMisjaOpcja1, next: "zalogowy" },
      { tekst: translations.pierwszaMisjaOpcja2, next: "pojedynczy" },
    ],
  },
  zalogowy: {
    npcKey: "officer",
    tekst: () => translations.zalogowy,
    options: [
      {
        tekst: translations.wyborStatkuOpcja1,
        next: "wybor_zaopatrzenia",
        akcja: async () =>
          await Storage.setItem({ key: "wybranyStatek", value: "Selenari" }),
      },
      {
        tekst: translations.wyborStatkuOpcja2,
        next: "wybor_zaopatrzenia",
        akcja: async () =>
          await Storage.setItem({ key: "wybranyStatek", value: "Venturi" }),
      },
    ],
  },

  pojedynczy: {
    npcKey: "officer",
    tekst: () => translations.preferujesz,
    options: [
      { tekst: translations.wyborStatkuOpcja1, next: "wybor_zaopatrzenia" },
      { tekst: translations.wyborStatkuOpcja2, next: "wybor_zaopatrzenia" },
    ],
  },
  wybor_zaopatrzenia: {
    npcKey: "officer",
    tekst: () => translations.wybor_zaopatrzenia,
    options: [
      {
        tekst: translations.wyborZaopatrzeniaOpcja1,
        next: "pytanie_o_zdrowie",
        akcja: async () =>
          await Storage.setItem({
            key: "wybraneZaopatrzenie",
            value: "Dodatkowy prowiant",
          }),
      },
      {
        tekst: translations.wyborZaopatrzeniaOpcja2,
        next: "pytanie_o_zdrowie",
        akcja: async () =>
          await Storage.setItem({
            key: "wybraneZaopatrzenie",
            value: "Broń i dron zwiadowczy",
          }),
      },
    ],
  },

  pytanie_o_zdrowie: {
    npcKey: "officer",
    tekst: () =>
      plec
        ? translations[`pytanie_o_zdrowie_${plec}`]
        : translations.pytanie_o_zdrowie,
    options: [
      {
        tekst: translations.pytanieOZdrowieOpcja1,
        next: "potwierdzenie_formularza",
      },
      {
        tekst: translations.pytanieOZdrowieOpcja2,
        next: "potwierdzenie_formularza",
      },
    ],
  },
  potwierdzenie_formularza: {
    npcKey: "officer",
    tekst: () => translations.potwierdzenie_formularza,
    options: [
      {
        tekst: translations.potwierdzenieFormularzaOpcja1,
        next: "oczekiwanie_na_rozpatrzenie",
      },
      {
        tekst: translations.potwierdzenieFormularzaOpcja2,
        next: "dzwoni_officer",
      },
    ],
  },
  oczekiwanie_na_rozpatrzenie: {
    npcKey: "officer",
    tekst: () => translations.oczekiwanieStart,
    notifyTime: 600, // 10 minut
    notification: true,
    notificationTitle: translations.scen1notification1title,
    notificationDesc: translations.scen1notification1desc,
    notifyScreenName: "rekrutacja_oficer",
    autoNextScene: "rozpatrzenie_wynik",
  },
  rozpatrzenie_wynik: {
    npcKey: "officer",
    tekst: () => translations.rozpatrzenie_wynik,
    options: [
      { tekst: translations.rozpatrzenieOpcja1, next: "end_of_act" },
      { tekst: translations.rozpatrzenieOpcja2, next: "dzwoni_officer" },
    ],
  },

  rozpocznij_od_nowa: {
    // npcKey: "officer",
    tekst: () => "",
    autoNextScene: "dzwoni_officer",
    clearHistory: true,
  },

  end_of_act: {
    npcKey: "officer",
    tekst: () => translations.endActCompleted,
    endAct: "actEndScreen",
    nextAct: actsConfig["akt-1"].id,
  },
});
