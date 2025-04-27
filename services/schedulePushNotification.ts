import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";
import { Platform } from "react-native";

/**
 * 🔔 Funkcja do planowania powiadomienia
 * @param {string} title - Tytuł powiadomienia
 * @param {string} body - Treść powiadomienia
 * @param {number} delayInSeconds - Opóźnienie w sekundach
 */
export const schedulePushNotification = async (
  title: string,
  body: string,
  delayInSeconds: number
) => {
  try {
    console.log(`📢 Planowanie powiadomienia za: ${delayInSeconds} sekund`);

    // Sprawdzenie uprawnień do powiadomień
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      console.warn("❌ Brak uprawnień do wysyłania powiadomień!");
      return;
    }

    // Planowanie powiadomienia
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        type: SchedulableTriggerInputTypes.DATE,
        date: new Date(Date.now() + delayInSeconds * 1000),
        channelId: "default",
      },
    });

    console.log("✅ Powiadomienie zostało zaplanowane poprawnie!");
  } catch (error) {
    console.error("❌ Błąd planowania powiadomienia:", error);
  }
};
