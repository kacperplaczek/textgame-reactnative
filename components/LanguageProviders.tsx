import React, { createContext, useContext, useEffect, useState } from "react";
import Storage from "expo-storage";
import * as Localization from "expo-localization";

export type Language = "pl" | "en";

interface LanguageContextProps {
  jezyk: Language;
  zmienJezyk: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jezyk, setJezyk] = useState<Language | null>(null);

  useEffect(() => {
    const loadLang = async () => {
      const storedLang = await Storage.getItem({ key: "lang" });
      if (storedLang === "pl" || storedLang === "en") {
        setJezyk(storedLang);
      } else {
        const systemLang = Localization.getLocales()?.[0]?.languageCode;
        const defaultLang = systemLang === "pl" ? "pl" : "en";
        await Storage.setItem({ key: "lang", value: defaultLang });
        setJezyk(defaultLang);
      }
    };
    loadLang();
  }, []);

  const zmienJezyk = async (lang: Language) => {
    await Storage.setItem({ key: "lang", value: lang });
    setJezyk(lang);
  };

  return (
    <LanguageContext.Provider value={{ jezyk: jezyk ?? "en", zmienJezyk }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage musi być używany wewnątrz LanguageProvider");
  }
  return context;
};
