import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";

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

    const { status } = await Notifications.getPermissionsAsync();
    const safeDelay = Math.max(1, delayInSeconds);
    const scheduledDate = new Date(Date.now() + safeDelay * 1000);

    console.log(
      `⏰ Obliczona data powiadomienia: ${scheduledDate.toISOString()}`
    );

    if (status !== "granted") {
      console.warn("❌ Brak uprawnień do wysyłania powiadomień!");
      return;
    }

    const result = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        type: SchedulableTriggerInputTypes.DATE,
        date: scheduledDate,
        channelId: "default",
      },
    });

    console.log("✅ Powiadomienie zostało zaplanowane poprawnie!");
    console.log(`🆔 ID zaplanowanego powiadomienia: ${result}`);
  } catch (error) {
    console.error("❌ Błąd planowania powiadomienia:", error);
  }
};
