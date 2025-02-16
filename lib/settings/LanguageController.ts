import Storage from 'expo-storage';
import { Language } from '@/lib/translations/translations';

export const getCurrentLanguage = async (): Promise<Language> => {
    const lang = await Storage.getItem({ key: 'lang' });

    if (lang === 'pl' || lang === 'en') {
        return lang;
    }

    // Na sztywno, na razie PL – potem naprawimy automatyczne
    const defaultLang: Language = 'pl';

    await Storage.setItem({ key: 'lang', value: defaultLang });

    return defaultLang;
};

export const setLanguage = async (lang: Language) => {
    await Storage.setItem({ key: 'lang', value: lang });
};
