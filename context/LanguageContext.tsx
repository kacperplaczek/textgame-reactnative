import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentLanguage,
  setLanguage as saveLanguage,
} from "@/models/LanguageController";
import type { Language } from "@/i18n/translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pl");

  useEffect(() => {
    const loadLanguage = async () => {
      const lang = await getCurrentLanguage();
      setLanguageState(lang);
    };
    loadLanguage();
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveLanguage(lang);
  };

  if (!language) {
    return null; // <<< bardzo ważne: NIE ZWRACAJ STRINGÓW, tylko null albo komponent
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
