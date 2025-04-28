import { useState } from "react";
import { NpcKey } from "@/settings/NPCData";

export type DialogueMessage = {
  autor: "NPC" | "GRACZ";
  tekst: string;
  npcKey?: NpcKey;
};

export const useDialogue = () => {
  const [dialogue, setDialogue] = useState<DialogueMessage[]>([]);

  const addMessage = (
    autor: "NPC" | "GRACZ",
    tekst: string,
    npcKey?: NpcKey
  ) => {
    setDialogue((prev) => [...prev, { autor, tekst, npcKey }]);
  };

  const clearDialogue = () => {
    setDialogue([]);
  };

  const clearMessages = () => {
    setDialogue([]);
  };

  return {
    dialogue,
    addMessage,
    clearDialogue,
    clearMessages,
  };
};
