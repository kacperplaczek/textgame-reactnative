import { create } from "zustand";

type NotificationState = {
  notificationAllowed: boolean;
  setNotificationAllowed: (allowed: boolean) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notificationAllowed: false,
  setNotificationAllowed: (allowed) => set({ notificationAllowed: allowed }),
}));
