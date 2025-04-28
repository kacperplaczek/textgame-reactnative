import { useEffect, useState, useRef } from "react";
import Storage from "expo-storage";
import { getCurrentLanguage } from "@/models/LanguageController";
import { translations, Language } from "@/i18n/translations";

export function useHistoryScreenViewModel(act: string) {
  const [dialogueHistory, setDialogueHistory] = useState([]);
  const [language, setLanguage] = useState<Language>("pl"); // Domyślnie PL
  const scrollRef = useRef(null);

  useEffect(() => {
    const loadLanguage = async () => {
      const lang = await getCurrentLanguage();
      setLanguage(lang || "pl");
    };
    loadLanguage();
  }, []);

  useEffect(() => {
    const loadDialogueHistory = async () => {
      const storedData = await Storage.getItem({ key: "dialogue_history" });

      if (storedData) {
        const dialogues = JSON.parse(storedData);
        const actHistory = dialogues[act];

        if (actHistory) {
          setDialogueHistory(actHistory);
        } else {
          setDialogueHistory([]);
        }
      } else {
        setDialogueHistory([]);
      }
    };

    loadDialogueHistory();
  }, [act]);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [dialogueHistory]);

  const getTranslatedActName = (act: string) => {
    const normalizedAct = act.replace("akt-", "akt");
    return (
      translations[language]?.[`${normalizedAct}Title`] || act.toUpperCase()
    );
  };

  return {
    dialogueHistory,
    language,
    scrollRef,
    getTranslatedActName,
  };
}
