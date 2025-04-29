import { useEffect, useRef, useState } from "react";
import Storage from "expo-storage";
import { translations } from "@/i18n/translations";
import { useLanguage } from "@/context/LanguageContext"; // <<< Dodane

export function useHistoryScreenViewModel(act: string) {
  const { language } = useLanguage(); // <<< Korzystamy z globalnego języka
  const [dialogueHistory, setDialogueHistory] = useState([]);
  const scrollRef = useRef<ScrollView>(null);

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
    scrollRef,
    getTranslatedActName,
  };
}
