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
    tekst: () => translations.AIPL_akt3_rozpoczecie_aktu,
    notifyTime: 10,
    notifyScreenName: "powrot_na_statek",
    autoNextScene: "akt3_checkpoint",
  },

  // ? DO KOPIOWANIA
  akt3_checkpoint: {
    tekst: () => "",
    autoNextScene: "akt3_start",
    autoNextDelay: 100,
    checkpoint: true,
  },

  akt3_start: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_start,
    options: [
      {
        tekst: translations.AIPL_akt3_start_option1,
        next: "akt3_twojeemocje_1",
      },
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
    tekst: () => translations.AIPL_akt3_twoje_emocje1,
    options: [
      {
        tekst: translations.AIPL_akt3_twoje_emocje1_option1,
        next: "akt3_scena2",
      },
      {
        tekst: translations.AIPL_akt3_twoje_emocje1_option2,
        next: "akt3_scena2",
      },
    ],
  },

  akt3_scena2: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_scena2,
    options: [
      {
        tekst: translations.AIPL_akt3_scena2_option1,
        next: "akt3_scena2_echo_1",
      },
      {
        tekst: translations.AIPL_akt3_scena2_option2,
        next: "akt3_scena3_echo_1",
      },
    ],
  },

  // ? KIM JEST ECHO

  akt3_scena2_echo_1: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_scena2_echo_1,
    autoNextDelay: 3000,
    autoNextScene: "akt3_scena2_echo_2",
  },

  akt3_scena2_echo_2: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_scena2_echo_2,
    options: [
      {
        tekst: translations.AIPL_akt3_scena2_echo_2_option1,
        next: "akt3_scena4",
      },
      {
        tekst: translations.AIPL_akt3_scena2_echo_2_option2,
        next: "akt3_scena4",
      },
    ],
  },

  // ? NIE MA TAKIEJ POTRZEBY

  akt3_scena3_echo_1: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_scena3_echo_1,
    autoNextDelay: 3000,
    autoNextScene: "akt3_scena2_echo_2",
  },

  akt3_scena3_echo_2: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_scena3_echo_2,
    options: [
      {
        tekst: translations.AIPL_akt3_scena3_echo_2_option1,
        next: "akt3_scena4",
      },
      {
        tekst: translations.AIPL_akt3_scena3_echo_2_option2,
        next: "akt3_scena4",
      },
    ],
  },

  // ? Ciąg dalszy (1)

  akt3_scena4: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_scena4,
    options: [
      {
        tekst: translations.AIPL_akt3_scena4_option1,
        next: "akt3_pytanie_miejsca",
      },
      {
        tekst: translations.AIPL_akt3_scena4_option2,
        next: "akt3_pytanie_miejsca",
      },
    ],
  },

  akt3_pytanie_miejsca: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_pytanie_miejsca,
    options: [
      {
        tekst: translations.AIPL_akt3_pytanie_miejsca_option1,
        next: "akt3_identyfikacja_obiektu",
      },
      {
        tekst: translations.AIPL_akt3_pytanie_miejsca_option2,
        next: "akt3_unik_obiektu",
      },
    ],
  },

  akt3_identyfikacja_obiektu: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_identyfikacja_obiektu,
    autoNextScene: "akt3_kontakt_dowodca",
    autoNextDelay: 3000,
  },

  akt3_unik_obiektu: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_unik_obiektu,
    autoNextScene: "akt3_kontakt_dowodca",
    autoNextDelay: 3000,
  },

  akt3_kontakt_dowodca: {
    npcKey: "dowodca",
    tekst: () => translations.AIPL_akt3_kontakt_dowodca,
    options: [
      {
        tekst: translations.AIPL_akt3_kontakt_dowodca_option1,
        next: "akt3_czarna_dziura",
      },
      {
        tekst: translations.AIPL_akt3_kontakt_dowodca_option2,
        next: "akt3_czarna_dziura",
      },
    ],
  },

  akt3_czarna_dziura: {
    npcKey: "dowodca",
    tekst: () => translations.AIPL_akt3_czarna_dziura,
    options: [
      {
        tekst: translations.AIPL_akt3_czarna_dziura_option1,
        next: "akt3_deathscreen_czarna_dziura",
      },
      {
        tekst: translations.AIPL_akt3_czarna_dziura_option2,
        next: "akt3_unik_czarnej_dziury",
      },
    ],
  },

  akt3_unik_czarnej_dziury: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_unik_czarnej_dziury,
    options: [
      {
        tekst: translations.AIPL_akt3_unik_czarnej_dziury_option1,
        next: "akt3_deathscreen_czarna_dziura",
      },
      {
        tekst: translations.AIPL_akt3_unik_czarnej_dziury_option2,
        next: "akt3_zapasy",
      },
    ],
  },

  akt3_deathscreen_czarna_dziura: {
    npcKey: "dowodca",
    deathScreen: "wpadlesWCzarnaDziure",
    tekst: () => translations.AIPL_akt3_deathscreen_czarna_dziura,
  },

  akt3_zapasy: {
    npcKey: "dowodca",
    tekst: () => translations.AIPL_akt3_zapasy,
    options: [
      {
        tekst: translations.AIPL_akt3_zapasy_option1,
        next: "akt3_decyzja_ucieczka",
      },
      {
        tekst: translations.AIPL_akt3_zapasy_option2,
        next: "akt3_decyzja_ucieczka",
      },
    ],
  },

  akt3_decyzja_ucieczka: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_decyzja_ucieczka,
    options: [
      {
        tekst: translations.AIPL_akt3_decyzja_ucieczka_option1,
        next: "akt3_deathscreen_czarna_dziura",
      },
      {
        tekst: translations.AIPL_akt3_decyzja_ucieczka_option2,
        next: "akt3_ucieczka_udana",
      },
    ],
  },

  akt3_ucieczka_udana: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_ucieczka_udana,
    options: [
      {
        tekst: translations.AIPL_akt3_ucieczka_udana_option1,
        next: "akt3_echo_kapitan",
      },
      {
        tekst: translations.AIPL_akt3_ucieczka_udana_option2,
        next: "akt3_echo_kapitan",
      },
    ],
  },

  akt3_echo_kapitan: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_echo_kapitan,
    options: [
      {
        tekst: translations.AIPL_akt3_echo_kapitan_option1,
        next: "akt3_misja_kontynuacja",
      },
      {
        tekst: translations.AIPL_akt3_echo_kapitan_option2,
        next: "akt3_misja_kontynuacja",
      },
    ],
  },

  akt3_misja_kontynuacja: {
    npcKey: "echo",
    tekst: plec
      ? translations[`akt3_scen1213123_${plec}`]
      : translations.akt3_scen1213123,
    autoNextScene: "akt3_hibernacja",
    autoNextDelay: 3000,
  },

  akt3_hibernacja: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_hibernacja,
    options: [
      {
        tekst: translations.AIPL_akt3_hibernacja_option1,
        next: "akt3_hibernacja_start",
      },
      {
        tekst: translations.AIPL_akt3_hibernacja_option2,
        next: "akt3_hibernacja_start",
      },
    ],
  },

  akt3_hibernacja_start: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_hibernacja_start,
    notifyTime: 100,
    notifyScreenName: "hibernacja_w_toku",
    autoNextScene: "akt3_pobudka",
    autoNextDelay: 3000,
  },

  akt3_pobudka: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_pobudka,
    options: [
      {
        tekst: translations.AIPL_akt3_pobudka_option1,
        next: "akt3_skanowanie",
      },
      { tekst: translations.AIPL_akt3_pobudka_option2, next: "akt3_dokowanie" },
    ],
  },
  akt3_skanowanie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_skanowanie,
    options: [
      {
        tekst: translations.AIPL_akt3_skanowanie_option1,
        next: "akt3_zblizenie",
      },
      {
        tekst: translations.AIPL_akt3_skanowanie_option2,
        next: "akt3_zblizenie",
      },
    ],
  },

  akt3_zblizenie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_zblizenie,
    autoNextScene: "akt3_dokowanie",
    autoNextDelay: 3000,
  },

  akt3_dokowanie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_dokowanie,
    autoNextScene: "akt3_dokowanie_klik",
    autoNextDelay: 3000,
  },

  akt3_dokowanie_klik: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_dokowanie_klik,
    checkpoint: true,
    options: [
      {
        tekst: translations.AIPL_akt3_dokowanie_klik_option1,
        next: "akt3_wejscie_na_poklad",
      },
    ],
  },

  akt3_wejscie_na_poklad: {
    npcKey: "flightControlCenter",
    tekst: plec
      ? translations[`akt3_scen121314_${plec}`]
      : translations.akt3_scen121314,
    options: [
      { tekst: "Wchodzimy!", next: "akt3_wejscie_procedura" },
      { tekst: "Zabieramy się stąd!", next: "akt3_nie_mozna_uciec" },
    ],
  },

  akt3_nie_mozna_uciec: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_nie_mozna_uciec,
    autoNextScene: "akt3_wejscie_procedura",
    autoNextDelay: 3000,
  },

  akt3_wejscie_procedura: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_wejscie_procedura,
    autoNextScene: "akt3_sluzowanie",
    autoNextDelay: 3000,
  },

  akt3_sluzowanie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_sluzowanie,
    autoNextScene: "akt3_odczucie_ciszy",
    autoNextDelay: 3000,
  },

  akt3_odczucie_ciszy: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_odczucie_ciszy,
    options: [
      {
        tekst: translations.AIPL_akt3_odczucie_ciszy_option1,
        next: "akt3_skanowanie_pokladu",
      },
      {
        tekst: translations.AIPL_akt3_odczucie_ciszy_option2,
        next: "akt3_skanowanie_pokladu",
      },
    ],
  },

  akt3_skanowanie_pokladu: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_skanowanie_pokladu,
    autoNextScene: "akt3_dec_podroz",
    autoNextDelay: 3000,
  },

  akt3_dec_podroz: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_dec_podroz,
    options: [
      {
        tekst: translations.AIPL_akt3_dec_podroz_option1,
        next: "akt3_kantyna",
      },
      { tekst: translations.AIPL_akt3_dec_podroz_option2, next: "akt3_mostek" },
    ],
  },

  akt3_kantyna: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_kantyna,
    autoNextScene: "akt3_puste_sciany",
    autoNextDelay: 3000,
  },

  akt3_puste_sciany: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_puste_sciany,
    autoNextScene: "akt3_mostek",
    autoNextDelay: 3000,
  },

  akt3_mostek: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_mostek,
    autoNextScene: "akt3_dzienniki_pokladowe",
    autoNextDelay: 3000,
  },

  akt3_dzienniki_pokladowe: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_dzienniki_pokladowe,
    options: [
      {
        tekst: translations.AIPL_akt3_dzienniki_pokladowe_option1,
        next: "akt3_skanowanie_sygnalu",
      },
      {
        tekst: translations.AIPL_akt3_dzienniki_pokladowe_option2,
        next: "akt3_skanowanie_sygnalu",
      },
    ],
  },

  akt3_skanowanie_sygnalu: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_skanowanie_sygnalu,
    options: [
      {
        tekst: translations.AIPL_akt3_skanowanie_sygnalu_option1,
        next: "akt3_zlokalizowanie",
      },
      {
        tekst: translations.AIPL_akt3_skanowanie_sygnalu_option2,
        next: "akt3_zlokalizowanie",
      },
    ],
  },

  akt3_zlokalizowanie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_zlokalizowanie,
    options: [
      {
        tekst: translations.AIPL_akt3_zlokalizowanie_option1,
        next: "akt3_rozwidlenie",
      },
      {
        tekst: translations.AIPL_akt3_zlokalizowanie_option2,
        next: "akt3_rozwidlenie",
      },
    ],
  },

  akt3_rozwidlenie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_rozwidlenie,
    autoNextScene: "akt3_droga_wybor",
    autoNextDelay: 3000,
  },

  akt3_droga_wybor: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_droga_wybor,
    options: [
      {
        tekst: translations.AIPL_akt3_droga_wybor_option1,
        next: "akt3_ryzyko_wlewo1",
      },
      {
        tekst: translations.AIPL_akt3_droga_wybor_option2,
        next: "akt3_ryzyko_wprawo",
      },
    ],
  },

  akt3_ryzyko_wprawo: {
    npcKey: "flightControlCenter",
    tekst: plec
      ? translations[`akt3_scen121315_${plec}`]
      : translations.akt3_scen121315,
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wprawo2",
  },

  akt3_ryzyko_wprawo2: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_ryzyko_wprawo2,
    options: [
      {
        tekst: translations.AIPL_akt3_ryzyko_wprawo2_option1,
        next: "akt3_ryzyko_wprawo2_smierc",
      },
      {
        tekst: translations.AIPL_akt3_ryzyko_wprawo2_option2,
        next: "akt3_ryzyko_wprawo3",
      },
    ],
  },

  // ? W PRAWO ŚMIERĆ

  akt3_ryzyko_wprawo2_smierc: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_ryzyko_wprawo2_smierc,
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wprawo2_smierc_deathscreen",
  },

  akt3_ryzyko_wprawo2_smierc_deathscreen: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_ryzyko_wprawo2_smierc_deathscreen,
    deathScreen: "zimnoZabija",
  },

  akt3_ryzyko_wprawo3: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_ryzyko_wprawo3,
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wprawo4",
  },

  akt3_ryzyko_wprawo4: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_ryzyko_wprawo4,
    options: [
      {
        tekst: translations.AIPL_akt3_ryzyko_wprawo4_option1,
        next: "akt3_ryzyko_wprawo5",
      },
      {
        tekst: translations.AIPL_akt3_ryzyko_wprawo4_option2,
        next: "akt3_ryzyko_wprawo5",
      },
    ],
  },

  akt3_ryzyko_wprawo5: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_ryzyko_wprawo5,
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wprawo6",
  },

  akt3_ryzyko_wprawo6: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_ryzyko_wprawo6,
    options: [
      {
        tekst: translations.AIPL_akt3_ryzyko_wprawo6_option1,
        next: "akt3_ryzyko_wprawo7_smierc",
      },
      {
        tekst: translations.AIPL_akt3_ryzyko_wprawo6_option2,
        next: "akt3_ryzyko_wprawo8",
      },
    ],
  },

  akt3_ryzyko_wprawo7_smierc: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_ryzyko_wprawo7_smierc,
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wprawo7_smierc_Death",
  },

  akt3_ryzyko_wprawo7_smierc_Death: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_ryzyko_wprawo7_smierc_Death,
    deathScreen: "zimnoZabija",
  },

  akt3_ryzyko_wprawo8: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_ryzyko_wprawo8,
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wprawo9",
  },

  akt3_ryzyko_wprawo9: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_ryzyko_wprawo9,
    options: [
      {
        tekst: translations.AIPL_akt3_ryzyko_wprawo9_option1,
        next: "akt3_ryzyko_wprawo10",
      },
      {
        tekst: translations.AIPL_akt3_ryzyko_wprawo9_option2,
        next: "akt3_ryzyko_wprawo10",
      },
    ],
  },

  akt3_ryzyko_wprawo10: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_ryzyko_wprawo10,
    autoNextDelay: 3000,
    autoNextScene: "akt3_scena0001",
  },

  akt3_ryzyko_wlewo1: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_ryzyko_wlewo1,
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wlewo2",
  },

  akt3_ryzyko_wlewo2: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_ryzyko_wlewo2,
    options: [
      {
        tekst: translations.AIPL_akt3_ryzyko_wlewo2_option1,
        next: "akt3_ryzyko_wlewo5_smierc",
      },
      {
        tekst: translations.AIPL_akt3_ryzyko_wlewo2_option2,
        next: "akt3_ryzyko_wlewo3",
      },
    ],
  },

  akt3_ryzyko_wlewo2_smierc: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_ryzyko_wlewo2_smierc,
    options: [
      {
        tekst: translations.AIPL_akt3_ryzyko_wlewo2_option1,
        next: "akt3_ryzyko_wlewo3",
      },
      {
        tekst: translations.AIPL_akt3_ryzyko_wlewo2_option2,
        next: "akt3_ryzyko_wlewo3",
      },
    ],
  },

  akt3_ryzyko_wlewo2_smierc_death: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_ryzyko_wlewo2_smierc_death,
    deathScreen: "zatrucieGazem",
  },

  akt3_ryzyko_wlewo3: {
    npcKey: "flightControlCenter",
    tekst: plec
      ? translations[`akt3_scen121316_${plec}`]
      : translations.akt3_scen121316,
    options: [
      {
        tekst: translations.AIPL_akt3_ryzyko_wlewo3_option1,
        next: "akt3_ryzyko_wlewo4",
      },
      {
        tekst: translations.AIPL_akt3_ryzyko_wlewo3_option2,
        next: "akt3_ryzyko_wlewo4",
      },
    ],
  },

  akt3_ryzyko_wlewo4: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_ryzyko_wlewo4,
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wlewo5",
  },

  akt3_ryzyko_wlewo5: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_ryzyko_wlewo5,
    options: [
      {
        tekst: translations.AIPL_akt3_ryzyko_wlewo5_option1,
        next: "akt3_ryzyko_wlewo5_smierc",
      },
      {
        tekst: translations.AIPL_akt3_ryzyko_wlewo5_option2,
        next: "akt3_ryzyko_wlewo4",
      },
    ],
  },

  akt3_ryzyko_wlewo5_smierc: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_ryzyko_wlewo5_smierc,
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wlewo5_smierc_death",
  },

  akt3_ryzyko_wlewo5_smierc_death: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_ryzyko_wlewo5_smierc_death,
    deathScreen: "zatrucieGazem",
  },

  akt3_ryzyko_wlewo6: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_ryzyko_wlewo6,
    autoNextDelay: 3000,
    autoNextScene: "akt3_scena0001",
  },

  akt3_scena0001: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_scena0001,
    options: [
      {
        tekst: translations.AIPL_akt3_scena0001_option1,
        next: "akt3_centralna_komora",
      },
      {
        tekst: translations.AIPL_akt3_scena0001_option2,
        next: "akt3_centralna_komora",
      },
    ],
  },

  akt3_centralna_komora: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_centralna_komora,
    autoNextScene: "akt3_spotkanie_harunkal",
    autoNextDelay: 3000,
  },

  akt3_spotkanie_harunkal: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_spotkanie_harunkal,
    autoNextScene: "akt3_zrodlo_sygnalu",
    autoNextDelay: 3000,
  },

  akt3_zrodlo_sygnalu: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_zrodlo_sygnalu,
    autoNextScene: "akt3_wiezien_mocy",
    autoNextDelay: 3000,
  },

  akt3_wiezien_mocy: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Jestem więźniem tego miejsca. Nie kontroluję się... To, co tu jest, nie może być uwolnione.",
    options: [
      {
        tekst: plec
          ? translations[`akt3_scen121317_${plec}`]
          : translations.akt3_scen121317,
        next: "akt3_sygnal_ostrzezenie",
      },
      {
        tekst: plec
          ? translations[`akt3_scen121318_${plec}`]
          : translations.akt3_scen121318,
        next: "akt3_sygnal_ostrzezenie",
      },
    ],
  },

  akt3_sygnal_ostrzezenie: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_sygnal_ostrzezenie,
    autoNextScene: "akt3_statek_reaguje",
    autoNextDelay: 3000,
  },

  akt3_statek_reaguje: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_statek_reaguje,
    autoNextScene: "akt3_energia_nieznana",
    autoNextDelay: 3000,
  },

  akt3_energia_nieznana: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_energia_nieznana,
    options: [
      {
        tekst: translations.AIPL_akt3_energia_nieznana_option1,
        next: "akt3_wymiary",
      },
      {
        tekst: translations.AIPL_akt3_energia_nieznana_option2,
        next: "akt3_wymiary",
      },
    ],
  },

  akt3_wymiary: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_wymiary,
    autoNextScene: "akt3_statek_anomalie",
    autoNextDelay: 3000,
  },

  akt3_statek_anomalie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_statek_anomalie,
    autoNextScene: "akt3_misja_wymiary",
    autoNextDelay: 3000,
  },

  akt3_misja_wymiary: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_misja_wymiary,
    autoNextScene: "akt3_anomalie_zagrozenie",
    autoNextDelay: 3000,
  },

  akt3_anomalie_zagrozenie: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_anomalie_zagrozenie,
    options: [
      {
        tekst: translations.AIPL_akt3_anomalie_zagrozenie_option1,
        next: "akt3_bazy",
      },
      {
        tekst: translations.AIPL_akt3_anomalie_zagrozenie_option2,
        next: "akt3_bazy",
      },
    ],
  },

  akt3_bazy: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_bazy,
    autoNextScene: "akt3_znajoma_baza",
    autoNextDelay: 3000,
  },

  akt3_znajoma_baza: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_znajoma_baza,
    autoNextScene: "akt3_ksiezyc_wyjasnienie",
    autoNextDelay: 3000,
  },

  akt3_ksiezyc_wyjasnienie: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_ksiezyc_wyjasnienie,
    autoNextScene: "akt3_statek_tajemnica",
    autoNextDelay: 3000,
  },

  akt3_statek_tajemnica: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_statek_tajemnica,
    options: [
      {
        tekst: translations.AIPL_akt3_statek_tajemnica_option1,
        next: "akt3_wiecej_info",
      },
      {
        tekst: translations.AIPL_akt3_statek_tajemnica_option2,
        next: "akt3_wiecej_info",
      },
    ],
  },

  akt3_wiecej_info: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_wiecej_info,
    autoNextScene: "akt3_ksiezyc_zagrozenie",
    autoNextDelay: 3000,
  },

  akt3_ksiezyc_zagrozenie: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_ksiezyc_zagrozenie,
    options: [
      {
        tekst: translations.AIPL_akt3_ksiezyc_zagrozenie_option1,
        next: "akt3_kontrola_statkow",
      },
      {
        tekst: translations.AIPL_akt3_ksiezyc_zagrozenie_option2,
        next: "akt3_kontrola_statkow",
      },
    ],
  },

  akt3_kontrola_statkow: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_kontrola_statkow,
    autoNextScene: "akt3_statek_rozpad",
    autoNextDelay: 3000,
  },

  akt3_statek_rozpad: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_statek_rozpad,
    autoNextScene: "akt3_harunkal_cykl",
    autoNextDelay: 3000,
  },

  akt3_harunkal_cykl: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_harunkal_cykl,
    options: [
      {
        tekst: translations.AIPL_akt3_harunkal_cykl_option1,
        next: "akt3_pomoc_harunkal",
      },
      {
        tekst: translations.AIPL_akt3_harunkal_cykl_option2,
        next: "akt3_odmowa_harunkal",
      },
    ],
  },

  akt3_pomoc_harunkal: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_pomoc_harunkal,
    autoNextScene: "akt3_decyzja_harunkal",
    autoNextDelay: 3000,
  },

  akt3_odmowa_harunkal: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_odmowa_harunkal,
    autoNextScene: "akt3_decyzja_harunkal",
    autoNextDelay: 3000,
  },

  akt3_decyzja_harunkal: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_decyzja_harunkal,
    autoNextScene: "akt3_statek_awaria",
    autoNextDelay: 3000,
  },

  akt3_statek_awaria: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_statek_awaria,
    autoNextScene: "akt3_echo_ryzyko",
    autoNextDelay: 3000,
  },

  akt3_echo_ryzyko: {
    npcKey: "echo",
    tekst: () => translations.AIPL_akt3_echo_ryzyko,
    options: [
      {
        tekst: translations.AIPL_akt3_echo_ryzyko_option1,
        next: "akt3_pomoc_statek",
      },
      {
        tekst: translations.AIPL_akt3_echo_ryzyko_option2,
        next: "akt3_deathscreen_explosion",
      },
    ],
  },

  akt3_deathscreen_explosion: {
    npcKey: "flightControlCenter",
    deathScreen: "explosionDeathScreen",
    tekst: () => translations.AIPL_akt3_deathscreen_explosion,
  },

  akt3_pomoc_statek: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_pomoc_statek,
    autoNextScene: "akt3_gotowosc_ucieczka",
    autoNextDelay: 3000,
  },

  akt3_gotowosc_ucieczka: {
    npcKey: "kosmita_harunkal",
    tekst: plec
      ? translations[`akt3_scen121319_${plec}`]
      : translations.akt3_scen121319,
    options: [
      {
        tekst: translations.AIPL_akt3_gotowosc_ucieczka_option1,
        next: "akt3_sekcja_techniczna",
      },
      {
        tekst: translations.AIPL_akt3_gotowosc_ucieczka_option2,
        next: "akt3_sekcja_techniczna",
      },
    ],
  },

  akt3_sekcja_techniczna: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_sekcja_techniczna,
    autoNextScene: "akt3_przestroga_harunkal",
    autoNextDelay: 3000,
  },

  akt3_przestroga_harunkal: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_przestroga_harunkal,
    options: [
      {
        tekst: translations.AIPL_akt3_przestroga_harunkal_option1,
        next: "akt3_sekcja_techniczna_ryzyko",
      },
      {
        tekst: translations.AIPL_akt3_przestroga_harunkal_option2,
        next: "akt3_sekcja_techniczna_ryzyko",
      },
    ],
  },

  akt3_sekcja_techniczna_ryzyko: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_sekcja_techniczna_ryzyko,
    autoNextScene: "akt3_obecnosc_statek",
    autoNextDelay: 3000,
  },

  akt3_obecnosc_statek: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_obecnosc_statek,
    options: [
      {
        tekst: translations.AIPL_akt3_obecnosc_statek_option1,
        next: "akt3_systemy_obronne",
      },
      {
        tekst: translations.AIPL_akt3_obecnosc_statek_option2,
        next: "akt3_systemy_obronne",
      },
    ],
  },

  akt3_systemy_obronne: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_systemy_obronne,
    autoNextScene: "akt3_harunkal_zaklocenie",
    autoNextDelay: 3000,
  },

  akt3_harunkal_zaklocenie: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_harunkal_zaklocenie,
    autoNextScene: "akt3_zaklocenie_ryzyko",
    autoNextDelay: 3000,
  },

  akt3_zaklocenie_ryzyko: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_zaklocenie_ryzyko,
    options: [
      {
        tekst: translations.AIPL_akt3_zaklocenie_ryzyko_option1,
        next: "akt3_zaklocenie_podjete",
      },
      {
        tekst: translations.AIPL_akt3_zaklocenie_ryzyko_option2,
        next: "akt3_zaklocenie_spoznione",
      },
    ],
  },

  akt3_zaklocenie_podjete: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_zaklocenie_podjete,
    autoNextScene: "akt3_statek_destabilizacja",
    autoNextDelay: 3000,
  },

  akt3_zaklocenie_spoznione: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_zaklocenie_spoznione,
    autoNextScene: "akt3_statek_destabilizacja",
    autoNextDelay: 3000,
  },

  akt3_statek_destabilizacja: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_statek_destabilizacja,
    autoNextScene: "akt3_harunkal_traci_panowanie",
    autoNextDelay: 3000,
  },

  akt3_harunkal_traci_panowanie: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_harunkal_traci_panowanie,
    options: [
      {
        tekst: translations.AIPL_akt3_harunkal_traci_panowanie_option1,
        next: "akt3_sektor_zawalenie",
      },
      {
        tekst: translations.AIPL_akt3_harunkal_traci_panowanie_option2,
        next: "akt3_sektor_zawalenie",
      },
    ],
  },

  akt3_sektor_zawalenie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_sektor_zawalenie,
    autoNextScene: "akt3_tunel_decyzja",
    autoNextDelay: 3000,
  },

  akt3_tunel_decyzja: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_tunel_decyzja,
    options: [
      {
        tekst: translations.AIPL_akt3_tunel_decyzja_option1,
        next: "akt3_tunel_przejscie",
      },
      {
        tekst: translations.AIPL_akt3_tunel_decyzja_option2,
        next: "akt3_tunel_przejscie",
      },
    ],
  },

  akt3_tunel_przejscie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_tunel_przejscie,
    autoNextScene: "akt3_tunel_wybor",
    autoNextDelay: 3000,
  },

  akt3_tunel_wybor: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_tunel_wybor,
    options: [
      {
        tekst: translations.AIPL_akt3_tunel_wybor_option1,
        next: "akt3_tunel_wyjscie",
      },
      {
        tekst: translations.AIPL_akt3_tunel_wybor_option2,
        next: "akt3_tunel_wyjscie",
      },
    ],
  },

  akt3_tunel_wyjscie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_tunel_wyjscie,
    autoNextScene: "akt3_sekcja_zewnetrzna",
    autoNextDelay: 3000,
  },

  akt3_sekcja_zewnetrzna: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_sekcja_zewnetrzna,
    autoNextScene: "akt3_mostek_plan",
    autoNextDelay: 3000,
  },

  akt3_mostek_plan: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_mostek_plan,
    options: [
      {
        tekst: translations.AIPL_akt3_mostek_plan_option1,
        next: "akt3_systemy_obronne2",
      },
      {
        tekst: translations.AIPL_akt3_mostek_plan_option2,
        next: "akt3_systemy_obronne2",
      },
    ],
  },

  akt3_systemy_obronne2: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_systemy_obronne2,
    autoNextScene: "akt3_harunkal_eksplozja",
    checkpoint: true,
    autoNextDelay: 3000,
  },

  akt3_harunkal_eksplozja: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_harunkal_eksplozja,
    options: [
      {
        tekst: translations.AIPL_akt3_harunkal_eksplozja_option1,
        next: "akt3_wysadzanie",
      },
      {
        tekst: translations.AIPL_akt3_harunkal_eksplozja_option2,
        next: "akt3_obrona_smierc",
      },
    ],
  },

  akt3_obrona_smierc: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_obrona_smierc,
    autoNextScene: "akt3_smierc_systemy",
    autoNextDelay: 3000,
  },

  akt3_smierc_systemy: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_smierc_systemy,
    deathScreen: "explosionDeathScreen",
  },

  akt3_wysadzanie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_wysadzanie,
    autoNextScene: "akt3_eksplozja_inicjacja",
    autoNextDelay: 3000,
  },

  akt3_eksplozja_inicjacja: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_eksplozja_inicjacja,
    autoNextScene: "akt_eksplozja_oczekiwanie",
    autoNextDelay: 3000,
  },

  akt_eksplozja_oczekiwanie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt_eksplozja_oczekiwanie,
    notifyTime: 5,
    notifyScreenName: "boom",
    autoNextScene: "akt3_dotarcie_mostek",
    autoNextDelay: 3000,
  },

  akt3_dotarcie_mostek: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_dotarcie_mostek,
    autoNextScene: "akt3_otwieranie_wyjscia",
    autoNextDelay: 3000,
  },

  akt3_otwieranie_wyjscia: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_otwieranie_wyjscia,
    autoNextScene: "akt3_powrot_na_statek",
    autoNextDelay: 3000,
  },

  akt3_powrot_na_statek: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_powrot_na_statek,
    autoNextScene: "akt3_statek_stabilny",
    autoNextDelay: 3000,
  },

  akt3_statek_stabilny: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_statek_stabilny,
    notifyTime: 300,
    notifyScreenName: "kosmita_oczekiwanie",
    autoNextScene: "akt3_decyzja_misji",
  },

  akt3_decyzja_misji: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_decyzja_misji,
    options: [
      {
        tekst: translations.AIPL_akt3_decyzja_misji_option1,
        next: "akt3_korporacja_nagroda",
      },
      {
        tekst: translations.AIPL_akt3_decyzja_misji_option2,
        next: "akt3_korporacja_nagroda",
      },
    ],
  },

  akt3_korporacja_nagroda: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_korporacja_nagroda,
    autoNextScene: "akt3_harunkal_przestroga",
    autoNextDelay: 3000,
  },

  akt3_harunkal_przestroga: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_harunkal_przestroga,
    options: [
      {
        tekst: translations.AIPL_akt3_harunkal_przestroga_option1,
        next: "akt3_cykl_zagrozenie",
      },
      {
        tekst: translations.AIPL_akt3_harunkal_przestroga_option2,
        next: "akt3_cykl_zagrozenie",
      },
    ],
  },

  akt3_cykl_zagrozenie: {
    npcKey: "kosmita_harunkal",
    tekst: () => translations.AIPL_akt3_cykl_zagrozenie,
    autoNextScene: "akt3_korporacja_oferta",
    autoNextDelay: 3000,
  },

  akt3_korporacja_oferta: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_korporacja_oferta,
    autoNextScene: "akt3_korporacja_ostateczna_decyzja",
    autoNextDelay: 3000,
  },

  akt3_korporacja_ostateczna_decyzja: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_korporacja_ostateczna_decyzja,
    options: [
      {
        tekst: translations.AIPL_akt3_korporacja_ostateczna_decyzja_option1,
        next: "akt3_korporacja_wybor",
      },
      {
        tekst: translations.AIPL_akt3_korporacja_ostateczna_decyzja_option2,
        next: "akt3_korporacja_wybor",
      },
    ],
  },

  akt3_korporacja_wybor: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt3_korporacja_wybor,
  },
});
