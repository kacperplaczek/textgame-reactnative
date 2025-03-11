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
      const shipClass = await Storage.getItem({ key: "wybranyStatek" });
      const equipment = await Storage.getItem({ key: "wybraneZaopatrzenie" });

      return translations[`akt2Scen2_${plec || "pan"}`]
        .replace("{{statek}}", shipClass)
        .replace("{{wyposazenie}}", equipment);
    },
    options: [
      { tekst: translations.akt2Odp3, next: "akt2_scen3" },
      { tekst: translations.akt2Odp4, next: "akt2_scen4_update" },
    ],
  },

  // 🔥 SCENA 3: Ile osób liczy załoga?
  akt2_scen3: {
    npcKey: "flightControlCenter",
    tekst: () => translations.akt2Scen3,
    options: [
      { tekst: translations.akt2Odp7, next: "akt2_scen5" },
      { tekst: translations.akt2Odp8, next: "akt2_scen6" },
    ],
  },

  // 🔥 SCENA 4: Nie można zmienić konfiguracji
  akt2_scen4_update: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2Scen4_update,
    options: [
      { tekst: translations.AIPL_akt2Scen4_update_option1, next: "akt2_scen5" },
      { tekst: translations.AIPL_akt2Scen4_update_option2, next: "akt2_scen6" },
    ],
  },

  // 🔥 SCENA 5: Wszystko się zgadza...
  akt2_scen5: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2Scen5,
    options: [
      { tekst: translations.AIPL_akt2Scen5_option1, next: "akt2_scen7" },
      { tekst: translations.AIPL_akt2Scen5_option2, next: "akt2_scen8" },
    ],
  },

  // 🔥 SCENA 6: Informacja o utraconej załodze
  akt2_scen6: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2Scen6,
    options: [
      { tekst: translations.AIPL_akt2Scen6_option1, next: "akt2_scen7" },
      { tekst: translations.AIPL_akt2Scen6_option2, next: "akt2_scen8" },
    ],
  },

  // 🔥 SCENA 7: Ciąg minimalny – dobra ścieżka
  akt2_scen7: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2Scen7,
    options: [
      { tekst: translations.AIPL_akt2Scen7_option1, next: "akt2_start_dobry" },
      { tekst: translations.AIPL_akt2Scen7_option2, next: "akt2_start_zly" },
    ],
  },

  // 🔥 SCENA 8: Ciąg maksymalny – zła ścieżka
  akt2_scen8: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2Scen8,
    options: [
      { tekst: translations.AIPL_akt2Scen8_option1, next: "akt2_start_zly" },
      { tekst: translations.AIPL_akt2Scen8_option2, next: "akt2_start_zly" },
    ],
  },

  // ✅ DOBRA ŚCIEŻKA – Poprawne ustawienia przed startem
  akt2_start_dobry: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_start_dobry,
    options: [
      {
        tekst: translations.AIPL_akt2_start_dobry_option1,
        next: "akt2_po_starcie",
      },
      { tekst: translations.AIPL_akt2_start_dobry_option2, next: "akt2_scen2" },
    ],
  },

  // ❌ ZŁA ŚCIEŻKA – Błędne ustawienia przed startem
  akt2_start_zly: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_start_zly,
    deathScreen: "explosionDeathScreen",
  },

  // 🔥 NOWA SCENA PO STARCIU: Decyzja – hibernacja czy eksploracja?
  akt2_po_starcie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_po_starcie,
    options: [
      {
        tekst: translations.AIPL_akt2_po_starcie_option1,
        next: "akt2_hibernacja",
      },
      {
        tekst: translations.AIPL_akt2_po_starcie_option2,
        next: "akt2_zwiedzanie",
      },
    ],
  },

  // 🔥 HIBERNACJA – NOTIFY TIME (2 godziny)
  akt2_hibernacja: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_hibernacja,
    notifyTime: 100, // ! 7200 sekudn
    notifyScreenName: "hibernacja_w_toku",
    autoNextScene: "akt2_pobudka",
  },

  // 🔥 SCENA PO HIBERNACJI – WYBUDZENIE
  akt2_pobudka: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_pobudka,
    autoNextScene: "akt2_sygnal",
    autoNextDelay: 3000,
  },

  // 🔥 ZWIEDZANIE STATKU – WYBÓR OBSZARU
  akt2_zwiedzanie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_zwiedzanie,
    options: [
      {
        tekst: translations.AIPL_akt2_zwiedzanie_option1,
        next: "akt2_dowodzenie",
      },
      {
        tekst: translations.AIPL_akt2_zwiedzanie_option2,
        next: "akt2_magazyn",
      },
      { tekst: translations.AIPL_akt2_zwiedzanie_option3, next: "akt2_zaloga" },
    ],
  },

  // 🔥 ZWIEDZANIE – DOWODZENIE
  akt2_dowodzenie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_dowodzenie,
    options: [
      {
        tekst: translations.AIPL_akt2_dowodzenie_option1,
        next: "akt2_zwiedzanie",
      },
      {
        tekst: translations.AIPL_akt2_dowodzenie_option2,
        next: "akt2_hibernacja",
      },
    ],
  },

  // 🔥 ZWIEDZANIE – MAGAZYN
  akt2_magazyn: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_magazyn,
    options: [
      {
        tekst: translations.AIPL_akt2_magazyn_option1,
        next: "akt2_zwiedzanie",
      },
      {
        tekst: translations.AIPL_akt2_magazyn_option2,
        next: "akt2_hibernacja",
      },
    ],
  },

  // 🔥 ZWIEDZANIE – CZĘŚĆ ZAŁOGOWA
  akt2_zaloga: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_zaloga,
    options: [
      { tekst: translations.AIPL_akt2_zaloga_option1, next: "akt2_zwiedzanie" },
      { tekst: translations.AIPL_akt2_zaloga_option2, next: "akt2_krysztal" },
    ],
  },

  // 🔥 SPRAWDZENIE KRYSZTAŁU
  akt2_krysztal: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_krysztal,
    options: [
      {
        tekst: translations.AIPL_akt2_krysztal_option1,
        next: "akt2_zwiedzanie",
      },
      {
        tekst: translations.AIPL_akt2_krysztal_option2,
        next: "akt2_krysztal_analiza",
      },
    ],
  },

  // 🔥 ANALIZA KRYSZTAŁU – NOTIFY TIME (5 minut)
  akt2_krysztal_analiza: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_krysztal_analiza,
    notifyTime: 100, // 5 minut
    notifyScreenName: "analiza_krysztalu",
    autoNextScene: "akt2_krysztal_wynik",
  },

  // 🔥 WYNIK ANALIZY KRYSZTAŁU
  akt2_krysztal_wynik: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_krysztal_wynik,
    options: [
      {
        tekst: translations.AIPL_akt2_krysztal_wynik_option1,
        next: "akt2_hibernacja",
      },
      {
        tekst: translations.AIPL_akt2_krysztal_wynik_option2,
        next: "akt2_krysztal_ostrzezenie",
      },
    ],
  },

  // 🔥 OSTRZEŻENIE – NIEBEZPIECZNY KRYSZTAŁ
  akt2_krysztal_ostrzezenie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_krysztal_ostrzezenie,
    options: [
      {
        tekst: translations.AIPL_akt2_krysztal_ostrzezenie_option1,
        next: "akt2_hibernacja",
      },
      {
        tekst: translations.AIPL_akt2_krysztal_ostrzezenie_option2,
        next: "akt2_krysztal_zagrozenie",
      },
    ],
  },

  // 🔥 PRZYJĘCIE KRYSZTAŁU – POTENCJALNE ZAGROŻENIE
  akt2_krysztal_zagrozenie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_krysztal_zagrozenie,
    autoNextScene: "akt2_krysztal_wez",
    autoNextDelay: 3000,
  },

  // 🔥 KONTYNUACJA DIALOGU (G) – IGNOROWANIE OSTRZEŻENIA
  akt2_krysztal_wez: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_krysztal_wez,
    options: [
      {
        tekst: translations.AIPL_akt2_krysztal_wez_option1,
        next: "akt2_krysztal_brak_rejestracji",
      },
    ],
  },

  // 🔥 DIALOG (I) – BRAK REJESTRACJI
  akt2_krysztal_brak_rejestracji: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_krysztal_brak_rejestracji,
    options: [
      {
        tekst: translations.AIPL_akt2_krysztal_brak_rejestracji_option1,
        next: "akt2_krysztal_nagla_zmiana",
      },
      {
        tekst: translations.AIPL_akt2_krysztal_brak_rejestracji_option2,
        next: "akt2_krysztal_nagla_zmiana",
      },
    ],
  },

  // 🔥 DIALOG (J) – NAGŁA ZMIANA
  akt2_krysztal_nagla_zmiana: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_krysztal_nagla_zmiana,
    options: [
      {
        tekst: translations.AIPL_akt2_krysztal_nagla_zmiana_option1,
        next: "akt2_niewidzialnosc",
      },
      {
        tekst: translations.AIPL_akt2_krysztal_nagla_zmiana_option2,
        next: "akt2_niewidzialnosc",
      },
    ],
  },

  // 🔥 DIALOG (K) – NIC NIE WIDZISZ
  akt2_niewidzialnosc: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_niewidzialnosc,
    enableDarknessUI: true, // ? Włączanie trybu ciemności...
    options: [
      {
        tekst: translations.AIPL_akt2_niewidzialnosc_option1,
        next: "akt2_wymiar_niemożliwy",
      },
    ],
  },

  // 🔥 DIALOG (L) – WYMIAR NIEMOŻLIWY
  akt2_wymiar_niemożliwy: {
    npcKey: "flightControlCenter",
    tekst: plec
      ? translations[`akt3_scen000001_${plec}`]
      : translations.akt3_scen000001,
    options: [
      { tekst: "Masz jakiś pomysł?", next: "akt2_plan_powrotu" },
      { tekst: "[Panika] Jak teraz wrócimy?", next: "akt2_plan_powrotu" },
    ],
  },

  // 🔥 DIALOG (Ł) – PLAN POWROTU
  akt2_plan_powrotu: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_plan_powrotu,
    options: [
      {
        tekst: translations.AIPL_akt2_plan_powrotu_option1,
        next: "akt2_szukaj_krysztalu",
      },
      {
        tekst: translations.AIPL_akt2_plan_powrotu_option2,
        next: "akt2_szukaj_krysztalu",
      },
    ],
  },

  // 🔥 DIALOG (M) – SZUKANIE KRYSZTAŁU
  akt2_szukaj_krysztalu: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_szukaj_krysztalu,
    options: [
      {
        tekst: translations.AIPL_akt2_szukaj_krysztalu_option1,
        next: "akt2_wrocenie_krysztalu",
      },
      {
        tekst: translations.AIPL_akt2_szukaj_krysztalu_option2,
        next: "akt2_wrocenie_krysztalu",
      },
    ],
  },

  // 🔥 DIALOG (N) – PRÓBA POWROTU
  akt2_wrocenie_krysztalu: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_wrocenie_krysztalu,
    options: [
      {
        tekst: translations.AIPL_akt2_wrocenie_krysztalu_option1,
        next: "akt2_krysztal_powrot",
      },
      {
        tekst: translations.AIPL_akt2_wrocenie_krysztalu_option2,
        next: "death_explosion",
      },
    ],
  },

  // 🔥 DIALOG (O) – POTRZĄŚNIĘCIE KRYSZTAŁEM
  akt2_krysztal_powrot: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_krysztal_powrot,
    options: [
      {
        tekst: translations.AIPL_akt2_krysztal_powrot_option1,
        next: "akt2_gdzie_jestesmy",
      },
    ],
  },

  // 🔥 DIALOG (U) – GDZIE JESTEŚMY?
  akt2_gdzie_jestesmy: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_gdzie_jestesmy,
    options: [
      {
        tekst: translations.AIPL_akt2_gdzie_jestesmy_option1,
        next: "death_explosion",
      },
      {
        tekst: translations.AIPL_akt2_gdzie_jestesmy_option2,
        next: "akt2_powrot_do_normy",
      },
    ],
    disableDarknessUI: true, // ? Wyłączenie ciemności UI
  },

  // 🔥 DIALOG (P) – POWRÓT DO NORMALNOŚCI
  akt2_powrot_do_normy: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_powrot_do_normy,
    options: [
      {
        tekst: translations.AIPL_akt2_powrot_do_normy_option1,
        next: "akt2_hibernacja",
      },
      {
        tekst: translations.AIPL_akt2_powrot_do_normy_option2,
        next: "akt2_hibernacja",
      },
    ],
  },
  akt2_6h_hibernacja: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_6h_hibernacja,
    notifyTime: 100, //! 21600 sekund
    notifyScreenName: "hibernacja_w_toku",
    autoNextScene: "akt2_sygnal",
  },

  // 🔥 ODBIÓR SYGNAŁU PO HIBERNACJI
  akt2_sygnal: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_sygnal,
    options: [
      {
        tekst: translations.AIPL_akt2_sygnal_option1,
        next: "akt2_sygnal_ignoruj",
      },
      {
        tekst: translations.AIPL_akt2_sygnal_option2,
        next: "akt2_sygnal_lokalizacja",
      },
    ],
  },

  // 🔥 IGNOROWANIE SYGNAŁU
  akt2_sygnal_ignoruj: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_sygnal_ignoruj,
    options: [
      {
        tekst: translations.AIPL_akt2_sygnal_ignoruj_option1,
        next: "akt2_protokol",
      },
      {
        tekst: translations.AIPL_akt2_sygnal_ignoruj_option2,
        next: "akt2_szyfrowanie",
      },
    ],
  },

  // 🔥 OKREŚLENIE LOKALIZACJI
  akt2_sygnal_lokalizacja: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_sygnal_lokalizacja,
    options: [
      {
        tekst: translations.AIPL_akt2_sygnal_lokalizacja_option1,
        next: "akt2_protokol",
      },
      {
        tekst: translations.AIPL_akt2_sygnal_lokalizacja_option2,
        next: "akt2_szyfrowanie",
      },
    ],
  },

  // 🔥 SPRAWDZENIE PROTOKOŁU
  akt2_protokol: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_protokol,
    options: [
      {
        tekst: translations.AIPL_akt2_protokol_option1,
        next: "akt2_ladowanie",
      },
      { tekst: translations.AIPL_akt2_protokol_option2, next: "akt2_dron" },
    ],
  },

  // 🔥 PRÓBA SZYFROWANIA
  akt2_szyfrowanie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_szyfrowanie,
    options: [
      {
        tekst: translations.AIPL_akt2_szyfrowanie_option1,
        next: "akt2_ladowanie",
      },
      { tekst: translations.AIPL_akt2_szyfrowanie_option2, next: "akt2_dron" },
    ],
  },

  // 🔥 SPRAWDZENIE DRONA
  akt2_dron: {
    npcKey: "flightControlCenter",
    tekst: async () => {
      const equipment = await Storage.getItem({ key: "wybraneZaopatrzenie" });

      console.log("📌 Sprawdzam wybrane wyposażenie:", equipment); // 🔍 Debugowanie, co zwraca getPlayerEquipment

      if (equipment?.trim() === "Broń i dron zwiadowczy") {
        return translations.AIPL_akt2_dron_equipped;
      } else {
        return translations.AIPL_akt2_dron_not_equipped;
      }
    },
    options: [
      { tekst: translations.AIPL_akt2_dron_option1, next: "akt2_skafander" },
      {
        tekst: translations.AIPL_akt2_dron_option2,
        next: "akt2_skafander_bron",
      },
    ],
  },

  // 🔥 PROCEDURA LĄDOWANIA
  akt2_ladowanie: {
    npcKey: "flightControlCenter",
    tekst: plec
      ? translations[`akt3_scen000002_${plec}`]
      : translations.akt3_scen000002,
    options: [
      {
        tekst: translations.AIPL_akt2_ladowanie_option1,
        next: "akt2_skafander",
      },
      {
        tekst: translations.AIPL_akt2_ladowanie_option2,
        next: "akt2_skafander_bron",
      },
    ],
  },

  // 🔥 SPRAWDZENIE BRONI
  akt2_skafander_bron: {
    npcKey: "flightControlCenter",
    tekst: async () => {
      const equipment = await getPlayerEquipment();

      if (equipment === "Broń i dron zwiadowczy") {
        return plec
          ? translations[`AIPL_akt2_skafander_bron_equipped_${plec}`]
          : translations.AIPL_akt2_skafander_bron_equipped;
      } else {
        return plec
          ? translations[`AIPL_akt2_skafander_bron_not_equipped_${plec}`]
          : translations.AIPL_akt2_skafander_bron_not_equipped;
      }
    },
    options: [
      {
        tekst: translations.AIPL_akt2_skafander_bron_option1,
        next: "akt2_powierzchnia",
      },
      {
        tekst: translations.AIPL_akt2_skafander_bron_option2,
        next: "akt2_pytanie",
      },
    ],
  },

  // 🔥 SPRAWDZENIE SKAFANDRA
  akt2_skafander: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_skafander,
    options: [
      {
        tekst: translations.AIPL_akt2_skafander_option1,
        next: "akt2_powierzchnia",
      },
      { tekst: translations.AIPL_akt2_skafander_option2, next: "akt2_pytanie" },
    ],
  },

  akt2_pytanie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_pytanie,
    options: [
      {
        tekst: translations.AIPL_akt2_pytanie_option1,
        next: "akt2_podajInfo_oplanecie",
      },
      {
        tekst: translations.AIPL_akt2_pytanie_option2,
        next: "akt2_cosnoweo_osygnale",
      },
    ],
  },

  akt2_podajInfo_oplanecie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_podajInfo_oplanecie,
    options: [
      {
        tekst: translations.AIPL_akt2_podajInfo_oplanecie_option1,
        next: "akt2_powierzchnia",
      },
      {
        tekst: translations.AIPL_akt2_podajInfo_oplanecie_option2,
        next: "akt2_pytanie",
      },
    ],
  },

  akt2_cosnoweo_osygnale: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_cosnoweo_osygnale,
    options: [
      {
        tekst: translations.AIPL_akt2_cosnoweo_osygnale_option1,
        next: "akt2_powierzchnia",
      },
      {
        tekst: translations.AIPL_akt2_cosnoweo_osygnale_option2,
        next: "akt2_pytanie",
      },
    ],
  },

  akt2_powierzchnia: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_powierzchnia,
    options: [
      {
        tekst: translations.AIPL_akt2_powierzchnia_option1,
        next: "akt2_transmisja_z_rozbitkiem",
      },
      {
        tekst: translations.AIPL_akt2_powierzchnia_option2,
        next: "akt2_odrzucenie_1_transmisji_z_robitkiem",
      },
    ],
  },

  akt2_odrzucenie_1_transmisji_z_robitkiem: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_odrzucenie_1_transmisji_z_robitkiem,
    options: [
      {
        tekst:
          translations.AIPL_akt2_odrzucenie_1_transmisji_z_robitkiem_option1,
        next: "akt2_transmisja_z_rozbitkiem",
      },
      {
        tekst:
          translations.AIPL_akt2_odrzucenie_1_transmisji_z_robitkiem_option2,
        next: "akt2_odrzucenie_1_transmisji_z_robitkiem",
      },
    ],
  },

  akt2_transmisja_z_rozbitkiem: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_transmisja_z_rozbitkiem,
    specialScreen: {
      title: translations.AIPL_akt2_transmisja_z_rozbitkiem_title,
      subtitle: translations.AIPL_akt2_transmisja_z_rozbitkiem_subtitle,
      image: "@/assets/images/bg_ufo.png",
      background: "@/assets/images/bg_ufo.png",
    },
    sound: "callphone",
    soundPlayLoop: true,
    autoNextScene: "akt2_rozbitek_powitanie",
  },

  // KONTYNUACJA DLA COŚ MI TO MÓWI...
  akt2_rozbitek_cosmitomowi: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_rozbitek_cosmitomowi,
    options: [
      {
        tekst: translations.AIPL_akt2_rozbitek_cosmitomowi_option1,
        next: "akt2_rozbitek_brzmiracjonalnie",
      },
      {
        tekst: translations.AIPL_akt2_rozbitek_cosmitomowi_option2,
        next: "akt2_rozbitek_cossciemniasz",
      },
    ],
  },

  // ? Start ścieżki przełęczy
  akt2_przelecze_start: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_przelecze_start,
    autoNextDelay: 3000,
    autoNextScene: "akt2_przelecze_cd1",
  },

  akt2_przelecze_cd1: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_przelecze_cd1,
    options: [
      {
        tekst: translations.AIPL_akt2_przelecze_cd1_option1,
        next: "akt2_przelecze_wszystkoJest",
      },
      {
        tekst: translations.AIPL_akt2_przelecze_cd1_option2,
        next: "akt2_przelecze_musimycie_znalezc",
      },
    ],
  },

  // ? START SEKCJI Z RATOWANIEM CZŁOWIEKA
  akt2_badanie_czlowieka_start: {
    npcKey: "flightControlCenter",
    tekst: plec
      ? translations[`AIPL_akt2_scen000011_${plec}`]
      : translations.AIPL_akt2_scen000011,
    autoNextDelay: 3000,
    autoNextScene: "akt2_ratowanie_cd1",
  },

  // TODO: Dodać obsługę "wspinaczki czekanami"
  akt2_przelecze_koniec_waitTime: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_przelecze_koniec_waitTime,
    notifyTime: 10, // TODO: zmienić na 1800
    notifyScreenName: "wspinaczka_w_toku",
    autoNextScene: "akt2_jasknie_dotarlesNaSzczytKanionu",
  },

  akt2_jaskinie_smierc: {
    npcKey: "rozbitek",
    tekst: () => "Spadasz w otchłań",
    deathScreen: "spadlesWOtchlan",
  },

  akt2_jaskinie_koniec_waitTime: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_jaskinie_koniec_waitTime,
    notifyTime: 1800, // testowo 10 sekund
    notifyScreenName: "przeprawa_w_toku",
    autoNextScene: "akt2_jasknie_dotarlesNaSzczytKanionu",
  },

  // Informacje o pobycie rozbitka
  akt2_rozbitek_informacjeopobycie: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_rozbitek_informacjeopobycie,
    options: [
      {
        tekst: translations.AIPL_akt2_rozbitek_informacjeopobycie_option1,
        next: "akt2_rozbitek_cosmitomowi",
      },
      {
        tekst: translations.AIPL_akt2_rozbitek_informacjeopobycie_option2,
        next: "akt2_rozbitek_cobylodalej",
      },
    ],
  },

  akt2_rozbitek_powitanie: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_rozbitek_powitanie,
    options: [
      {
        tekst: translations.AIPL_akt2_rozbitek_powitanie_option1,
        next: "akt2_rozbitek_maniery",
      },
      {
        tekst: translations.AIPL_akt2_rozbitek_powitanie_option2,
        next: "akt2_rozbitek_maniery",
      },
    ],
  },

  akt2_rozbitek_maniery: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_rozbitek_maniery,
    options: [
      {
        tekst: translations.AIPL_akt2_rozbitek_maniery_option1,
        next: "akt2_rozbitek_informacjeopobycie",
      },
      {
        tekst: translations.AIPL_akt2_rozbitek_maniery_option2,
        next: "akt2_rozbitek_informacjeopobycie",
      },
    ],
  },

  akt2_rozbitek_cobylodalej: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_rozbitek_cobylodalej,
    options: [
      {
        tekst: translations.AIPL_akt2_rozbitek_cobylodalej_option1,
        next: "akt2_ustawCheckPoint1",
      },
      {
        tekst: translations.AIPL_akt2_rozbitek_cobylodalej_option2,
        next: "akt2_ustawCheckPoint2",
      },
    ],
  },

  akt2_ustawCheckPoint2: {
    autoNextScene: "akt2_rozbitek_cossciemniasz",
    checkpoint: true,
    autoNextDelay: 100,
  },

  // DLA "COŚ ŚCIEMNIASZ"
  akt2_rozbitek_cossciemniasz: {
    npcKey: "rozbitek",
    tekst: plec
      ? translations[`akt3_scen000003_${plec}`]
      : translations.akt3_scen000003,
    options: [
      {
        tekst: translations.AIPL_akt2_rozbitek_cossciemniasz_option1,
        next: "akt2_rozbitek_dialogkontynuacja",
      },
      {
        tekst: translations.AIPL_akt2_rozbitek_cossciemniasz_option2,
        next: "akt2_rozbitek_dialogkontynuacja",
      },
    ],
  },

  akt2_ustawCheckPoint1: {
    autoNextScene: "akt2_rozbitek_brzmiracjonalnie",
    checkpoint: true,
    autoNextDelay: 100,
  },

  // DLA "BRZMI RACJONALNIE"
  akt2_rozbitek_brzmiracjonalnie: {
    npcKey: "rozbitek",
    tekst: plec
      ? translations[`akt2_scen000004_${plec}`]
      : translations.akt2_scen000004,
    options: [
      {
        tekst: translations.AIPL_akt2_rozbitek_brzmiracjonalnie_option1,
        next: "akt2_rozbitek_dialogkontynuacja",
      },
      {
        tekst: translations.AIPL_akt2_rozbitek_brzmiracjonalnie_option2,
        next: "akt2_rozbitek_dialogkontynuacja",
      },
    ],
  },

  akt2_rozbitek_dialogkontynuacja: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_rozbitek_dialogkontynuacja,
    options: [
      {
        tekst: translations.AIPL_akt2_rozbitek_dialogkontynuacja_option1,
        next: "akt2_rozbitek_polnoc",
      },
      {
        tekst: translations.AIPL_akt2_rozbitek_dialogkontynuacja_option2,
        next: "akt2_rozbitek_poludnie",
      },
    ],
  },

  akt2_rozbitek_polnoc: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_rozbitek_polnoc,
    options: [
      {
        tekst: translations.AIPL_akt2_rozbitek_polnoc_option1,
        next: "akt2_przelecze_start",
      },
      {
        tekst: translations.AIPL_akt2_rozbitek_polnoc_option2,
        next: "akt2_jasknie_start",
      },
    ],
  },

  akt2_przelecze_wszystkoJest: {
    npcKey: "rozbitek",
    tekst: plec
      ? translations[`akt2_scen000009_${plec}`]
      : translations.akt2_scen000009,
    options: [
      {
        tekst: translations.AIPL_akt2_przelecze_wszystkoJest_option1,
        next: "akt2_przelecze_mam_pomysl",
      },
      {
        tekst: translations.AIPL_akt2_przelecze_wszystkoJest_option2,
        next: "akt2_odrzucenie_1_transmisji_z_robitkiem",
      },
    ],
  },

  akt2_przelecze_musimycie_znalezc: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_przelecze_musimycie_znalezc,
    options: [
      {
        tekst: translations.AIPL_akt2_przelecze_musimycie_znalezc_option1,
        next: "akt2_przelecze_mam_pomysl",
      },
      {
        tekst: translations.AIPL_akt2_przelecze_musimycie_znalezc_option2,
        next: "akt2_przelecze_narazieotym_niemysle",
      },
    ],
  },

  akt2_przelecze_mam_pomysl: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_przelecze_mam_pomysl,
    options: [
      {
        tekst: translations.AIPL_akt2_przelecze_mam_pomysl_option1,
        next: "akt2_przelecze_cd3",
      },
      {
        tekst: translations.AIPL_akt2_przelecze_mam_pomysl_option2,
        next: "akt2_przelecze_cd3",
      },
    ],
  },

  akt2_przelecze_cd3: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_przelecze_cd3,
    autoNextDelay: 3000,
    autoNextScene: "akt2_przelecze_cd4",
  },

  akt2_przelecze_cd4: {
    npcKey: "rozbitek",
    tekst: plec
      ? translations[`akt2_scen000006_${plec}`]
      : translations.akt2_scen000006,
    options: [
      {
        tekst: translations.AIPL_akt2_przelecze_cd4_option1,
        next: "akt2_przelecze_koniec_waitTime",
      },
      {
        tekst: translations.AIPL_akt2_przelecze_cd4_option2,
        next: "akt2_przelecze_smierc",
      },
    ],
  },

  akt2_przelecze_smierc: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_przelecze_smierc,
    deathScreen: "spadlesWOtchlan",
  },

  akt2_jasknie_start: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_jasknie_start,
    autoNextDelay: 3000,
    autoNextScene: "akt2_jasknie_cd1",
  },

  akt2_jasknie_cd1: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_jasknie_cd1,
    options: [
      {
        tekst: translations.AIPL_akt2_jasknie_cd1_option1,
        next: "akt2_jasknie_wszystkojestniemartwsie",
      },
      {
        tekst: translations.AIPL_akt2_jasknie_cd1_option2,
        next: "akt2_jasknie_musimycieznalezc",
      },
    ],
  },

  akt2_jasknie_musimycieznalezc: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_jasknie_musimycieznalezc,
    options: [
      {
        tekst: translations.AIPL_akt2_jasknie_musimycieznalezc_option1,
        next: "akt2_przelecze_cd3",
      },
      {
        tekst: translations.AIPL_akt2_jasknie_musimycieznalezc_option2,
        next: "akt2_przelecze_smierc",
      },
    ],
  },

  akt2_jasknie_wszystkojestniemartwsie: {
    npcKey: "rozbitek",
    tekst: plec
      ? translations[`akt2_scen000007_${plec}`]
      : translations.akt2_scen000007,
    options: [
      {
        tekst: translations.AIPL_akt2_jasknie_wszystkojestniemartwsie_option1,
        next: "akt2_jasknie_mampewienpomysl",
      },
      {
        tekst: translations.AIPL_akt2_jasknie_wszystkojestniemartwsie_option2,
        next: "akt2_jasknie_niemysleotym",
      },
    ],
  },

  akt2_jasknie_mampewienpomysl: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_jasknie_mampewienpomysl,
    options: [
      {
        tekst: translations.AIPL_akt2_jasknie_mampewienpomysl_option1,
        next: "akt2_jasknie_cd4",
      },
      {
        tekst: translations.AIPL_akt2_jasknie_mampewienpomysl_option2,
        next: "akt2_jasknie_cd4",
      },
    ],
  },

  akt2_jasknie_cd4: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_jasknie_cd4,
    autoNextDelay: 3000,
    autoNextScene: "akt2_jasknie_cd5",
  },

  akt2_jasknie_cd5: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_jasknie_cd5,
    options: [
      {
        tekst: translations.AIPL_akt2_jasknie_cd5_option1,
        next: "akt2_jaskinie_smierc",
      },
      {
        tekst: translations.AIPL_akt2_jasknie_cd5_option2,
        next: "akt2_jaskinie_koniec_waitTime",
      },
    ],
  },

  akt2_jasknie_dotarlesNaSzczytKanionu: {
    npcKey: "flightControlCenter",
    tekst: plec
      ? translations[`akt2_scen000010_${plec}`]
      : translations.akt2_scen000010,
    options: [
      {
        tekst: translations.AIPL_akt2_jasknie_dotarlesNaSzczytKanionu_option1,
        next: "akt2_jasknie_jestessamotnymodkrywca",
      },
      {
        tekst: translations.AIPL_akt2_jasknie_dotarlesNaSzczytKanionu_option2,
        next: "akt2_jasknie_jestessamotnymodkrywca",
      },
    ],
  },

  akt2_jasknie_jestessamotnymodkrywca: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_jasknie_jestessamotnymodkrywca,
    options: [
      {
        tekst: translations.AIPL_akt2_jasknie_jestessamotnymodkrywca_option1,
        next: "akt2_wszystkie_procedury",
      },
      {
        tekst: translations.AIPL_akt2_jasknie_jestessamotnymodkrywca_option2,
        next: "akt2_wszystkie_procedury",
      },
    ],
  },

  akt2_wszystkie_procedury: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_wszystkie_procedury,
    options: [
      {
        tekst: translations.AIPL_akt2_wszystkie_procedury_option1,
        next: "akt2_nadalekiej_planecie",
      },
      {
        tekst: translations.AIPL_akt2_wszystkie_procedury_option2,
        next: "akt2_nadalekiej_planecie",
      },
    ],
  },

  akt2_nadalekiej_planecie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_nadalekiej_planecie,
    options: [
      {
        tekst: translations.AIPL_akt2_nadalekiej_planecie_option1,
        next: "akt2_przeszloscczest_rzuca",
      },
      {
        tekst: translations.AIPL_akt2_nadalekiej_planecie_option2,
        next: "akt2_przeszloscczest_rzuca",
      },
    ],
  },

  akt2_przeszloscczest_rzuca: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_przeszloscczest_rzuca,
    options: [
      {
        tekst: translations.AIPL_akt2_przeszloscczest_rzuca_option1,
        next: "akt2_misje_takie_jak_twoja",
      },
      {
        tekst: translations.AIPL_akt2_przeszloscczest_rzuca_option2,
        next: "akt2_misje_takie_jak_twoja",
      },
    ],
  },

  akt2_misje_takie_jak_twoja: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_misje_takie_jak_twoja,
    options: [
      {
        tekst: translations.AIPL_akt2_misje_takie_jak_twoja_option1,
        next: "akt2_nie_moznaignorowac",
      },
      {
        tekst: translations.AIPL_akt2_misje_takie_jak_twoja_option2,
        next: "akt2_nie_moznaignorowac",
      },
    ],
  },

  akt2_nie_moznaignorowac: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_nie_moznaignorowac,
    options: [
      {
        tekst: translations.AIPL_akt2_nie_moznaignorowac_option1,
        next: "akt2_wyobrazenie_o_eksploracji",
      },
      {
        tekst: translations.AIPL_akt2_nie_moznaignorowac_option2,
        next: "akt2_wyobrazenie_o_eksploracji",
      },
    ],
  },

  akt2_wyobrazenie_o_eksploracji: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_wyobrazenie_o_eksploracji,
    options: [
      {
        tekst: translations.AIPL_akt2_wyobrazenie_o_eksploracji_option1,
        next: "akt2_pewne_nieodkryte_kwestie",
      },
      {
        tekst: translations.AIPL_akt2_wyobrazenie_o_eksploracji_option2,
        next: "akt2_pewne_nieodkryte_kwestie",
      },
    ],
  },

  akt2_pewne_nieodkryte_kwestie: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_pewne_nieodkryte_kwestie,
    options: [
      {
        tekst: translations.AIPL_akt2_pewne_nieodkryte_kwestie_option1,
        next: "akt2_interesujaceAleMowiacOzmianach",
      },
      {
        tekst: translations.AIPL_akt2_pewne_nieodkryte_kwestie_option2,
        next: "akt2_interesujaceAleMowiacOzmianach",
      },
    ],
  },

  akt2_interesujaceAleMowiacOzmianach: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_interesujaceAleMowiacOzmianach,
    options: [
      {
        tekst: translations.AIPL_akt2_interesujaceAleMowiacOzmianach_option1,
        next: "akt2_niepozwolesiezmylic",
      },
      {
        tekst: translations.AIPL_akt2_interesujaceAleMowiacOzmianach_option2,
        next: "akt2_niepozwolesiezmylic",
      },
    ],
  },

  akt2_niepozwolesiezmylic: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_niepozwolesiezmylic,
    options: [
      {
        tekst: translations.AIPL_akt2_niepozwolesiezmylic_option1,
        next: "akt2_schroenienie_start",
      },
      {
        tekst: translations.AIPL_akt2_niepozwolesiezmylic_option2,
        next: "akt2_spadaszwotchlan_2",
      },
    ],
  },

  akt2_spadaszwotchlan_2: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_spadaszwotchlan_2,
    deathScreen: "spadlesWOtchlan",
  },

  akt2_schroenienie_start: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_schroenienie_start,
    options: [
      {
        tekst: translations.AIPL_akt2_schroenienie_start_option1,
        next: "akt2_schroenienie_grota_start",
      },
      {
        tekst: translations.AIPL_akt2_schroenienie_start_option2,
        next: "akt2_spadaszwotchlan_2",
      },
    ],
  },

  akt2_schroenienie_grota_start: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_schroenienie_grota_start,
    options: [
      {
        tekst: translations.AIPL_akt2_schroenienie_grota_start_option1,
        next: "akt2_badanie_czlowieka_start",
      },
      {
        tekst: translations.AIPL_akt2_schroenienie_grota_start_option2,
        next: "akt2_badaniesygnalu_start",
      },
    ],
  },

  akt2_ratowanie_cd1: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_ratowanie_cd1,
    options: [
      {
        tekst: translations.AIPL_akt2_ratowanie_cd1_option1,
        next: "akt2_badaniesygnalu_start",
      },
      {
        tekst: translations.AIPL_akt2_ratowanie_cd1_option2,
        next: "akt2_badanie_ruszamy_po_rozbitka",
      },
    ],
  },

  akt2_badanie_ruszamy_po_rozbitka: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_badanie_ruszamy_po_rozbitka,
    autoNextDelay: 3000,
    autoNextScene: "akt2_ratowanie_jestesmoimaniolem",
  },

  akt2_ratowanie_jestesmoimaniolem: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_ratowanie_jestesmoimaniolem,
    options: [
      {
        tekst: translations.AIPL_akt2_ratowanie_jestesmoimaniolem_option1,
        next: "akt2_towarzystwo_mozebycwskazane",
      },
      {
        tekst: translations.AIPL_akt2_ratowanie_jestesmoimaniolem_option2,
        next: "akt2_towarzystwo_mozebycwskazane",
      },
    ],
  },

  akt2_towarzystwo_mozebycwskazane: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_towarzystwo_mozebycwskazane,
    autoNextDelay: 3000,
    autoNextScene: "akt2_ratowanie_jestesnamiejscu1",
  },

  akt2_ratowanie_jestesnamiejscu1: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_ratowanie_jestesnamiejscu1,
    options: [
      {
        tekst: translations.AIPL_akt2_ratowanie_jestesnamiejscu1_option1,
        next: "akt2_end_of_act",
      },
      {
        tekst: translations.AIPL_akt2_ratowanie_jestesnamiejscu1_option2,
        next: "akt2_ratowanie_wejdzdobudynku",
      },
    ],
  },

  akt2_ratowanie_wejdzdobudynku: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_ratowanie_wejdzdobudynku,
    options: [
      {
        tekst: translations.AIPL_akt2_ratowanie_wejdzdobudynku_option1,
        next: "akt2_end_of_act",
      },
      {
        tekst: translations.AIPL_akt2_ratowanie_wejdzdobudynku_option2,
        next: "akt2_ratowanie_znalazlemkrysztal",
      },
    ],
  },

  akt2_ratowanie_znalazlemkrysztal: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_ratowanie_znalazlemkrysztal,
    options: [
      {
        tekst: translations.AIPL_akt2_ratowanie_znalazlemkrysztal_option1,
        next: "akt2_end_of_act",
      },
      {
        tekst: translations.AIPL_akt2_ratowanie_znalazlemkrysztal_option2,
        next: "akt2_ratowanie_poczekajazubierzeskafander",
      },
    ],
  },

  akt2_ratowanie_poczekajazubierzeskafander: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_ratowanie_poczekajazubierzeskafander,
    options: [
      {
        tekst:
          translations.AIPL_akt2_ratowanie_poczekajazubierzeskafander_option1,
        next: "akt2_end_of_act",
      },
      {
        tekst:
          translations.AIPL_akt2_ratowanie_poczekajazubierzeskafander_option2,
        next: "akt2_end_of_act",
      },
    ],
  },

  akt2_badaniesygnalu_start: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_badaniesygnalu_start,
    autoNextDelay: 3000,
    autoNextScene: "akt2_badaniesygnalu_niewierzezostawiaszmnie",
  },

  akt2_badaniesygnalu_niewierzezostawiaszmnie: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_badaniesygnalu_niewierzezostawiaszmnie,
    options: [
      {
        tekst:
          translations.AIPL_akt2_badaniesygnalu_niewierzezostawiaszmnie_option1,
        next: "akt2_badanie_czlowieka_start",
      },
      {
        tekst:
          translations.AIPL_akt2_badaniesygnalu_niewierzezostawiaszmnie_option2,
        next: "akt2_badaniesygnalu_wspanialeruszaj",
      },
    ],
  },

  akt2_badaniesygnalu_wspanialeruszaj: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_badaniesygnalu_wspanialeruszaj,
    autoNextDelay: 3000,
    autoNextScene: "akt2_badaniesygnalu_wkurzonyrozbitek",
  },

  akt2_badaniesygnalu_wkurzonyrozbitek: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_badaniesygnalu_wkurzonyrozbitek,
    options: [
      {
        tekst: translations.AIPL_akt2_badaniesygnalu_wkurzonyrozbitek_option1,
        next: "akt2_badaniesygnalu_zostanwSchronieniu",
      },
      {
        tekst: translations.AIPL_akt2_badaniesygnalu_wkurzonyrozbitek_option2,
        next: "akt2_ruiny_start",
      },
    ],
  },

  akt2_badaniesygnalu_zostanwSchronieniu: {
    npcKey: "rozbitek",
    tekst: () => translations.AIPL_akt2_badaniesygnalu_zostanwSchronieniu,
    deathScreen: "stormDeathScreen",
  },

  akt2_ruiny_start: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_ruiny_start,
    options: [
      {
        tekst: translations.AIPL_akt2_ruiny_start_option1,
        next: "akt2_ruiny_zbadajruiny",
      },
      {
        tekst: translations.AIPL_akt2_ruiny_start_option2,
        next: "akt2_ruiny_mampewneobawy",
      },
    ],
  },

  akt2_ruiny_zbadajruiny: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_ruiny_zbadajruiny,
    options: [
      {
        tekst: translations.AIPL_akt2_ruiny_zbadajruiny_option1,
        next: "akt2_ruiny_zbadajkrysztal",
      },
      {
        tekst: translations.AIPL_akt2_ruiny_zbadajruiny_option2,
        next: "akt2_ruiny_zostawkrysztal",
      },
    ],
  },

  akt2_ruiny_mampewneobawy: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_ruiny_mampewneobawy,
    options: [
      {
        tekst: translations.AIPL_akt2_ruiny_mampewneobawy_option1,
        next: "akt2_ruiny_zbadajkrysztal",
      },
      {
        tekst: translations.AIPL_akt2_ruiny_mampewneobawy_option2,
        next: "akt2_ruiny_zostawkrysztal",
      },
    ],
  },

  akt2_ruiny_zbadajkrysztal: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_ruiny_zbadajkrysztal,
    notifyTime: 300,
    notifyScreenName: "krysztal_analiza",
    autoNextScene: "akt2_ruiny_analiza_krysztalu",
  },

  akt2_ruiny_zostawkrysztal: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_ruiny_zostawkrysztal,
    notifyTime: 300,
    notifyScreenName: "krysztal_analiza",
    autoNextScene: "akt2_ruiny_analiza_krysztalu",
  },

  akt2_ruiny_analiza_krysztalu: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_ruiny_analiza_krysztalu,
    options: [
      {
        tekst: translations.AIPL_akt2_ruiny_analiza_krysztalu_option1,
        next: "akt2_ruiny_maszkrysztal",
      },
      {
        tekst: translations.AIPL_akt2_ruiny_analiza_krysztalu_option2,
        next: "akt2_ruiny_zostawkrysztal",
      },
    ],
  },

  akt2_ruiny_maszkrysztal: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_ruiny_maszkrysztal,
    options: [
      {
        tekst: translations.AIPL_akt2_ruiny_maszkrysztal_option1,
        next: "akt2_end_of_act",
      },
      {
        tekst: translations.AIPL_akt2_ruiny_maszkrysztal_option2,
        next: "akt2_badaniesygnalu_zostanwSchronieniu",
      },
    ],
  },

  akt2_ruiny_maszkrysztal_brakaktywnosci: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_ruiny_maszkrysztal_brakaktywnosci,
    options: [
      {
        tekst: translations.AIPL_akt2_ruiny_maszkrysztal_brakaktywnosci_option1,
        next: "akt2_end_of_act",
      },
      {
        tekst: translations.AIPL_akt2_ruiny_maszkrysztal_brakaktywnosci_option2,
        next: "akt2_badaniesygnalu_zostanwSchronieniu",
      },
    ],
  },

  akt2_end_of_act: {
    npcKey: "flightControlCenter",
    tekst: () => translations.AIPL_akt2_end_of_act,
    endAct: "actEndScreen",
    nextAct: "akt-2",
  },
});
