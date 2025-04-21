import { useEffect, useState } from "react";
import Storage from "expo-storage";
import { NpcKey } from "@/lib/dialogue/NPCData";
import { getCurrentLanguage } from "@/lib/settings/LanguageController";

type DialogueMessage = {
  autor: "NPC" | "GRACZ";
  tekst: string;
  npcKey?: NpcKey;
};

export const useDialogue = () => {
  const [dialogue, setDialogue] = useState<DialogueMessage[]>([]);
  const [language, setLanguage] = useState<"pl" | "en">("pl");

  // 📦 Wczytaj język przy starcie
  useEffect(() => {
    const fetchLang = async () => {
      const lang = await getCurrentLanguage();
      setLanguage(lang);
    };
    fetchLang();
  }, []);

  // ✅ Dodaj wiadomość do dialogu
  const addMessage = (msg: DialogueMessage) => {
    setDialogue((prev) => [...prev, msg]);
  };

  // ✅ Wyczyść wszystkie wiadomości
  const clearDialogue = () => {
    setDialogue([]);
  };

  return {
    dialogue,
    addMessage,
    clearDialogue,
    language,
  };
};
