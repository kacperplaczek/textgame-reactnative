import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { getCurrentLanguage } from "@/lib/settings/LanguageController";
import { DialogueMessage } from "@/lib/dialogue/useDialogue";

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
