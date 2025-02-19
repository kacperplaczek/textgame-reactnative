import {SceneType} from "@/scenario/types";

export const getScenes = (translations: any, plec: 'pan' | 'pani' | null): Record<string, SceneType> => ({
    rozpoczecie_akt2: {
        npcKey: 'officer',
        tekst: () => (plec === 'pan' ? translations.rozpoczecieAktu2_pan : translations.rozpoczecieAktu2_pani),
        // options: [{ tekst: translations.odbierzPolaczenie, next: 'start' }],
    },    
});
