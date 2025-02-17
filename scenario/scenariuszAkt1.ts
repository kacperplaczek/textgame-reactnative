import { NpcKey } from '@/lib/dialogue/NPCData';

export type SceneType = {
    npcKey?: NpcKey;
    tekst: () => string;
    options?: { tekst: string; next: string }[];
    checkpoint?: boolean;
    deathScreen?: string;
    autoNextScene?: string;
    autoNextDelay?: number;
    waitTime?: number;
    enableNotification?: boolean;
};

export const getScenes = (translations: any, plec: 'pan' | 'pani' | null): Record<string, SceneType> => ({
    dzwoni_officer: {
        npcKey: 'officer',
        tekst: translations.dzwoniOfficer,
        options: [{ tekst: translations.odbierzPolaczenie, next: 'start' }],
    },
    start: {
        npcKey: 'officer',
        tekst: translations.connecting,
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
        autoNextScene: 'zly_wybor',
        autoNextDelay: 2000,
    },
    powitanie_po_pleci_pani: {
        npcKey: 'officer',
        tekst: translations.dalej_pani,
        autoNextScene: 'zly_wybor',
        autoNextDelay: 2000,
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
