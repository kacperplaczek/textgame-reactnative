import Storage from "expo-storage";
import { getLogger } from "../helpers/getLogger";

export const clearStoredTime = async () => {
  try {
    await Storage.removeItem({ key: "waitingEndTime" });
    await Storage.removeItem({ key: "waitingScene" });
    console.log("✅ Zapisany czas został usunięty.");
  } catch (error) {
    getLogger("{x} clearStoredTime error: ", error);
  }
};
