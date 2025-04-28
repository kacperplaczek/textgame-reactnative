import Storage from "expo-storage";
import { DialogueMessage } from "@/viewmodels/useDialogueViewModel";

export const saveToHistory = async (
  actId: string,
  message: DialogueMessage
) => {
  const key = "dialogue_history";
  const existing = await Storage.getItem({ key });
  const historyData = existing ? JSON.parse(existing) : {};

  if (!historyData[actId]) {
    historyData[actId] = [];
  }

  historyData[actId].push(message);

  await Storage.setItem({
    key,
    value: JSON.stringify(historyData),
  });
};
