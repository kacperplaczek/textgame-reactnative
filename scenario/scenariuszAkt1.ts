import { SceneType } from "@/scenario/types";

export const getScenes = (translations: any, plec: 'pan' | 'pani' | null): Record<string, SceneType> => ({
    dzwoni_officer: {
        npcKey: 'officer',
        tekst: () => translations.dzwoniOfficer,
        options: [{ tekst: translations.odbierzPolaczenie, next: 'pytanie_powitalne' }],
        sound: 'callphone',
        soundPlayLoop: true
    },
    pytanie_powitalne: {
        npcKey: 'officer',
        tekst: () => translations.welcome,
        options: [
            { tekst: translations.pan, next: 'pytanie_o_powody' },
            { tekst: translations.pani, next: 'pytanie_o_powody' },
        ],
    },
    pytanie_o_powody: {
        npcKey: 'officer',
        tekst: () => translations.pytanieOPowody00001,
        options: [
            { tekst: translations.pytaniePowitalneOpcja1, next: 'przejscie_do_misji_powody' },
            { tekst: translations.pytaniePowitalneOpcja2, next: 'przejscie_do_misji_nie_interes' },
        ],
    },
    przejscie_do_misji_powody: {
        npcKey: 'officer',
        tekst: () => translations.przejscieDoMisjiPowody00001,
        options: [
            { tekst: translations.przejscieDoMisjiOpcja1, next: 'pierwsza_misja' },
            { tekst: translations.przejscieDoMisjiOpcja2, next: 'klamstwo_trzecia_misja' },
        ],
    },
    przejscie_do_misji_nie_interes: {
        npcKey: 'officer',
        tekst: () => translations.przejscie_do_misji_nie_interes,
        options: [
            { tekst: translations.przejscieDoMisjiOpcja1, next: 'pierwsza_misja' },
            { tekst: translations.przejscieDoMisjiOpcja2, next: 'klamstwo_trzecia_misja' },
        ],
    },
    pierwsza_misja: {
        npcKey: 'officer',
        tekst: () => translations.pierwsza_misja,
        options: [
            { tekst: translations.pierwszaMisjaOpcja1, next: 'zalogowy' },
            { tekst: translations.pierwszaMisjaOpcja2, next: 'pojedynczy' },
        ],
    },
    klamstwo_trzecia_misja: {
        npcKey: 'officer',
        tekst: () => translations.klamstwo_trzecia_misja,
        options: [
            { tekst: translations.pierwszaMisjaOpcja1, next: 'zalogowy' },
            { tekst: translations.pierwszaMisjaOpcja2, next: 'pojedynczy' },
        ],
    },
    zalogowy: {
        npcKey: 'officer',
        tekst: () => translations.zalogowy,
        options: [
            { tekst: translations.wyborStatkuOpcja1, next: 'wybor_zaopatrzenia' },
            { tekst: translations.wyborStatkuOpcja2, next: 'wybor_zaopatrzenia' },
        ],
    },
    pojedynczy: {
        npcKey: 'officer',
        tekst: () => translations.preferujesz,
        options: [
            { tekst: translations.wyborStatkuOpcja1, next: 'wybor_zaopatrzenia' },
            { tekst: translations.wyborStatkuOpcja2, next: 'wybor_zaopatrzenia' },
        ],
    },
    wybor_zaopatrzenia: {
        npcKey: 'officer',
        tekst: () => translations.wybor_zaopatrzenia,
        options: [
            { tekst: translations.wyborZaopatrzeniaOpcja1, next: 'pytanie_o_zdrowie' },
            { tekst: translations.wyborZaopatrzeniaOpcja2, next: 'pytanie_o_zdrowie' },
        ],
    },
    pytanie_o_zdrowie: {
        npcKey: 'officer',
        tekst: () => translations.pytanie_o_zdrowie,
        options: [
            { tekst: translations.pytanieOZdrowieOpcja1, next: 'potwierdzenie_formularza' },
            { tekst: translations.pytanieOZdrowieOpcja2, next: 'potwierdzenie_formularza' },
        ],
    },
    potwierdzenie_formularza: {
        npcKey: 'officer',
        tekst: () => translations.potwierdzenie_formularza,
        options: [
            { tekst: translations.potwierdzenieFormularzaOpcja1, next: 'oczekiwanie_na_rozpatrzenie' },
            { tekst: translations.potwierdzenieFormularzaOpcja2, next: 'dzwoni_officer' },
        ],
    },
    oczekiwanie_na_rozpatrzenie: {
        npcKey: 'officer',
        tekst: () => translations.oczekiwanieStart,
        waitTime: 10,
        autoNextScene: 'rozpatrzenie_wynik',
    },
    rozpatrzenie_wynik: {
        npcKey: 'officer',
        tekst: () => translations.rozpatrzenie_wynik,
        options: [
            { tekst: translations.rozpatrzenieOpcja1, next: 'end_of_act' },
            { tekst: translations.rozpatrzenieOpcja2, next: 'dzwoni_officer' },
        ],
    },
    end_of_act: {
        npcKey: 'officer',
        tekst: () => translations.endActCompleted,
        endAct: 'actEndScreen',
        nextAct: 'akt-1',
    },
});
