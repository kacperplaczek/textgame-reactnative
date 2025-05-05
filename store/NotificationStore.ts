// /stores/notificationStore.ts
import { create } from "zustand";
import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";

interface NotificationState {
  scheduledNotifications: string[]; // array of notification IDs
  scheduleNotification: (
    title: string,
    body: string,
    delayInSeconds: number
  ) => Promise<void>;
  cancelNotification: (id: string) => Promise<void>;
  cancelAllNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  scheduledNotifications: [],

  scheduleNotification: async (title, body, delayInSeconds) => {
    try {
      console.log(`📢 Planowanie powiadomienia za: ${delayInSeconds} sekund`);

      const { status } = await Notifications.getPermissionsAsync();
      const safeDelay = Math.max(1, delayInSeconds);
      const scheduledDate = new Date(Date.now() + safeDelay * 1000);

      console.log(`⏰ Data powiadomienia: ${scheduledDate.toISOString()}`);

      if (status !== "granted") {
        console.warn("❌ Brak uprawnień do powiadomień!");
        return;
      }

      const result = await Notifications.scheduleNotificationAsync({
        content: { title, body },
        trigger: {
          type: SchedulableTriggerInputTypes.DATE,
          date: scheduledDate,
          channelId: "default",
        },
      });

      console.log(`✅ Zaplanowano, ID: ${result}`);
      set((state) => ({
        scheduledNotifications: [...state.scheduledNotifications, result],
      }));
    } catch (error) {
      console.error("❌ Błąd planowania powiadomienia:", error);
    }
  },

  cancelNotification: async (id) => {
    try {
      await Notifications.cancelScheduledNotificationAsync(id);
      console.log(`🛑 Anulowano powiadomienie ID: ${id}`);
      set((state) => ({
        scheduledNotifications: state.scheduledNotifications.filter(
          (n) => n !== id
        ),
      }));
    } catch (error) {
      console.error(`❌ Błąd anulowania powiadomienia ${id}:`, error);
    }
  },

  cancelAllNotifications: async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log("🛑 Anulowano wszystkie powiadomienia");
      set({ scheduledNotifications: [] });
    } catch (error) {
      console.error("❌ Błąd anulowania wszystkich powiadomień:", error);
    }
  },
}));
