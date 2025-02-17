import { NpcKey } from './NPCData';

export type SceneType = {
    npcKey?: NpcKey;
    tekst: string;
    options?: { tekst: string; next: string }[];
    checkpoint?: boolean;
    deathScreen?: string;
    autoNextScene?: string;
    autoNextDelay?: number;
    waitTime?: number;
    enableNotification?: boolean;
    waitText?: string;
};

export const getScenes = (translations: any): Record<string, SceneType> => ({
    dzwoni_officer: {
        npcKey: 'officer',
        tekst: translations.dzwoniOfficer,
        options: [{ tekst: translations.odbierzPolaczenie, next: 'start' }],
    },
    start: {
        npcKey: 'officer',
        tekst: translations.connecting,
        autoNextScene: 'pytanie_o_plec',
        autoNextDelay: 5000, // 5 sekund
    },
    pytanie_o_plec: {
        npcKey: 'officer',
        tekst: translations.welcome,
        options: [
            { tekst: translations.pan, next: 'powitanie_po_pleci' },
            { tekst: translations.pani, next: 'powitanie_po_pleci' },
        ],
    },
    powitanie_po_pleci: {
        npcKey: 'officer',
        tekst: translations.dalej,
    },
});
