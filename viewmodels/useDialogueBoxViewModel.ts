import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { getCurrentLanguage } from "@/models/LanguageController";
import { DialogueMessage } from "./useDialogueViewModel";

export function useDialogueBoxViewModel(
  scrollRef: React.RefObject<ScrollView>,
  dialogue: DialogueMessage[]
) {
  const [lang, setLang] = useState<"pl" | "en">("pl");

  useEffect(() => {
    getCurrentLanguage().then(setLang);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  }, [dialogue]);

  return {
    lang,
  };
}
