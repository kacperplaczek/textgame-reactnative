import * as Localization from 'expo-localization';
import Storage from 'expo-storage';
import type { Language } from '@/lib/translations/translations';

export const getCurrentLanguage = async (): Promise<Language> => {
    const storedLang = await Storage.getItem({ key: 'lang' });

    if (storedLang === 'pl' || storedLang === 'en') {
        return storedLang;
    }

    // Nowy sposób pobierania języka systemowego
    const systemLang = Localization.getLocales()[0]?.languageCode;

    const defaultLang: Language = systemLang === 'pl' ? 'pl' : 'en';

    await Storage.setItem({ key: 'lang', value: defaultLang });

    return defaultLang;
};

export const setLanguage = async (lang: Language) => {
    await Storage.setItem({ key: 'lang', value: lang });
};
