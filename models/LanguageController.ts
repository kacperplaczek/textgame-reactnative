import * as Localization from "expo-localization";
import Storage from "expo-storage";
import type { Language } from "@/i18n/translations";
import { useLanguageStore } from "@/store/LanguageStore";

export const getCurrentLanguage = async (): Promise<Language> => {
  const storedLang = await Storage.getItem({ key: "lang" });
  console.log("📌 `Storage.getItem('lang')` zwróciło:", storedLang);

  if (storedLang === "pl" || storedLang === "en") {
    useLanguageStore.getState().setLanguage(storedLang);
    return storedLang;
  }

  const systemLang = Localization.getLocales()[0]?.languageCode;
  const defaultLang: Language = systemLang === "pl" ? "pl" : "en";

  await Storage.setItem({ key: "lang", value: defaultLang });
  useLanguageStore.getState().setLanguage(defaultLang);

  return defaultLang;
};

export const setLanguage = async (lang: Language) => {
  console.log("🌍 Ustawiam język systemowy:", lang);
  await Storage.setItem({ key: "lang", value: lang });
  useLanguageStore.getState().setLanguage(lang);
};
