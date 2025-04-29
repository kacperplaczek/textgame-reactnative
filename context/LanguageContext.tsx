import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentLanguage,
  setLanguage as setLangInStorage,
} from "@/models/LanguageController";
import { Language } from "@/i18n/translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguageState] = useState<Language>("pl");

  useEffect(() => {
    getCurrentLanguage().then(setLanguageState);
  }, []);

  const setLanguage = (lang: Language) => {
    setLangInStorage(lang); // zapis do Storage
    setLanguageState(lang); // aktualizacja kontekstu
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
