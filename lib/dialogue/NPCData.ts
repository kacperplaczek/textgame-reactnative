/*


NPCData.ts odpowiada za dodanie nowych postaci do gry.
Tworząc tablicę podajemy nazwę obietku, nameKey: dla tłumaczenia, avatar dla samego avatara.

Przykładowe użycie:

    officer: {
        nameKey: 'officerTitle',
        avatar: require('@/assets/images/avatar/oficer_rekrutacji.png'),
    },

Gdy nazwa się nie wyświetla sprawdź tłumaczenia w en i pl (translations.ts)
Sprawdź też czy masz dodaną poprawną ściężkę avatara.

*/


import { translations, Language } from '@/lib/translations/translations';

export type NpcKey = 'officer' | 'mechanic' | 'captain';

type NpcData = {
    nameKey: keyof typeof translations['pl'];
    avatar: any;
};

export const npcData: Record<NpcKey, NpcData> = {
    officer: {
        nameKey: 'officerTitle',
        avatar: require('@/assets/images/avatar/oficer_rekrutacji.png'),
    },
    mechanic: {
        nameKey: 'mechanicTitle',
        avatar: require('@/assets/images/avatar/oficer_rekrutacji.png'),
    },
    captain: {
        nameKey: 'captainTitle',
        avatar: require('@/assets/images/avatar/oficer_rekrutacji.png'),
    },
};
