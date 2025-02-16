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
