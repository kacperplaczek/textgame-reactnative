import Storage from "expo-storage";
import { getLogger } from "../helpers/getLogger";

export const saveDialogue = async (
  act: string,
  scene: string,
  message: { autor: "NPC" | "GRACZ"; tekst: string; npcKey?: string }
) => {
  try {
    const storedData = await Storage.getItem({ key: "dialogue_history" });
    const dialogues = storedData ? JSON.parse(storedData) : {};

    if (!dialogues[act]) {
      dialogues[act] = [];
    }

    dialogues[act].push({ scene, ...message });

    await Storage.setItem({
      key: "dialogue_history",
      value: JSON.stringify(dialogues),
    });

    getLogger(`{v} Zapisano dialog dla aktu ${act}:`, dialogues[act]);
  } catch (error) {
    getLogger("{x} Bład zapisu historii dialogu: ", error);
  }
};
