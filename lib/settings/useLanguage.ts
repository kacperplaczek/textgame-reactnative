import { useState, useEffect } from "react";
import Storage from "expo-storage";
import * as Localization from "expo-localization";

export type Language = "pl" | "en";

export const useLanguage = () => {
  const [jezyk, setJezyk] = useState<Language | null>(null);

  // Pobieramy język przy starcie aplikacji
  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await Storage.getItem({ key: "lang" });

      if (storedLang === "pl" || storedLang === "en") {
        console.log("✅ Pobrany język z `Storage`: ", storedLang);
        setJezyk(storedLang);
      } else {
        const systemLang = Localization.getLocales()[0]?.languageCode;
        const defaultLang = systemLang === "pl" ? "pl" : "en";

        console.log("🌍 Brak języka w `Storage`, ustawiam systemowy:", defaultLang);
        await Storage.setItem({ key: "lang", value: defaultLang });
        setJezyk(defaultLang);
      }
    };

    loadLanguage();
  }, []);

  // **Monitorujemy zmianę języka co sekundę**  
  useEffect(() => {
    const interval = setInterval(async () => {
      const storedLang = await Storage.getItem({ key: "lang" });

      if (storedLang && storedLang !== jezyk) {
        console.log(`🔄 Język w `Storage` (${storedLang}) różni się od aktualnego (${jezyk}), aktualizuję...`);
        setJezyk(storedLang);
      }
    }, 1000); // Sprawdzamy co sekundę

    return () => clearInterval(interval);
  }, [jezyk]);

  const zmienJezyk = async (lang: Language) => {
    console.log("🔵 Ustawiam nowy język:", lang);
    await Storage.setItem({ key: "lang", value: lang });
    setJezyk(lang);
  };

  return { jezyk, zmienJezyk };
};
