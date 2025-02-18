import {SceneType} from "@/scenario/types";

export const getScenes = (translations: any, plec: 'pan' | 'pani' | null): Record<string, SceneType> => ({
    dzwoni_officer: {
        npcKey: 'officer',
        tekst: translations.dzwoniOfficer,
        options: [{ tekst: translations.odbierzPolaczenie, next: 'start' }],
    },
    start: {
        npcKey: 'officer',
        tekst: translations.connecting,
        autoNextScene: 'test_oczekiwania_start',
        autoNextDelay: 5,
    },

    test_oczekiwania_start: {
        npcKey: 'officer',
        tekst: () => translations.oczekiwanieStart, // np. "Czekaj na odpowiedź..."
        waitTime: 15,
        enableNotification: false,
        autoNextScene: 'test_oczekiwania_wiadomosc',
    },

    test_oczekiwania_wiadomosc: {
        npcKey: 'officer',
        tekst: () => translations.oczekiwanieKoniec, // np. "Dziękuję za czekanie. Przechodzimy dalej."
        autoNextScene: 'pytanie_o_plec',
        autoNextDelay: 2000,
    },

    pytanie_o_plec: {
        npcKey: 'officer',
        tekst: translations.welcome,
        checkpoint: true,
        options: [
            { tekst: translations.pan, next: 'powitanie_po_pleci_pan' },
            { tekst: translations.pani, next: 'powitanie_po_pleci_pani' },
        ],
    },
    powitanie_po_pleci_pan: {
        npcKey: 'officer',
        tekst: translations.dalej_pan,
        autoNextScene: 'end_of_act',
        autoNextDelay: 2000,
    },
    powitanie_po_pleci_pani: {
        npcKey: 'officer',
        tekst: translations.dalej_pani,
        autoNextScene: 'end_of_act',
        autoNextDelay: 2000,
    },
    end_of_act: {
        npcKey: 'officer',
        tekst: () => translations.end_of_act,
        endAct: 'actEndScreen',
        nextAct: 'akt-2',
    },

    zly_wybor: {
        npcKey: 'officer',
        tekst: translations.zlyWyborText,
        options: [{ tekst: translations.continueText, next: 'zly_ruch' }],
    },
    zly_ruch: {
        npcKey: 'officer',
        tekst: translations.zlyRuchText,
        deathScreen: 'explosionDeathScreen',
    },
});
