import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getCurrentLanguage } from "@/models/LanguageController";
import { translations } from "@/i18n/translations";
import * as Updates from "expo-updates";
import Storage from "expo-storage";

export function useGameMenuViewModel() {
  const [jezyk, setJezyk] = useState("pl");
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [canPlayMusic, setCanPlayMusic] = useState(true);

  // Pobieranie języka
  useEffect(() => {
    const fetchLanguage = async () => {
      const lang = await getCurrentLanguage();
      setJezyk(lang);
    };
    fetchLanguage();
  }, []);

  // Pobieranie ustawień muzyki, dźwięku i powiadomień
  useEffect(() => {
    const fetchSettings = async () => {
      const storedMusic = await Storage.getItem({ key: "canPlayMusic" });
      setCanPlayMusic(storedMusic !== "off");

      const storedSound = await Storage.getItem({ key: "soundEnabled" });
      setSoundEnabled(storedSound !== "off");

      const storedNotifications = await Storage.getItem({
        key: "notificationsEnabled",
      });
      setNotificationsEnabled(storedNotifications !== "off");
    };
    fetchSettings();
  }, []);

  // Przełączanie muzyki
  const toggleMusic = async () => {
    try {
      const newSetting = canPlayMusic ? "off" : "on";
      await Storage.setItem({ key: "canPlayMusic", value: newSetting });
      setCanPlayMusic(!canPlayMusic);
      console.log(`🎵 Ustawienie muzyki: ${newSetting}`);
    } catch (e) {
      console.error("❌ Błąd zmiany muzyki:", e);
    }
  };

  // Przełączanie powiadomień
  const toggleNotifications = async () => {
    const newSetting = notificationsEnabled ? "off" : "on";
    await Storage.setItem({ key: "notificationsEnabled", value: newSetting });
    setNotificationsEnabled(!notificationsEnabled);
  };

  // Resetowanie gry
  const handleResetGame = async () => {
    Alert.alert(
      translations[jezyk].menuResetTitle,
      translations[jezyk].menuResetMessage,
      [
        { text: translations[jezyk].menuResetCancel, style: "cancel" },
        {
          text: translations[jezyk].menuResetConfirm,
          onPress: async () => {
            console.log("🔍 Pobieram wszystkie klucze...");

            const allKeys = await Storage.getAllKeys();
            console.log("📌 Klucze do usunięcia:", allKeys);

            for (const key of allKeys) {
              console.log(`🗑 Usuwam: ${key}`);
              await Storage.removeItem({ key });
            }

            const allKeysAfter = await Storage.getAllKeys();
            console.log("✅ Klucze po usunięciu:", allKeysAfter);

            console.log("🔄 Restartuję aplikację...");
            setTimeout(async () => {
              try {
                await Updates.reloadAsync();
              } catch (e) {
                console.error("❌ Błąd restartu:", e);
              }
            }, 500);
          },
        },
      ]
    );
  };

  return {
    jezyk,
    settingsVisible,
    setSettingsVisible,
    modalVisible,
    setModalVisible,
    soundEnabled,
    notificationsEnabled,
    canPlayMusic,
    toggleMusic,
    toggleNotifications,
    handleResetGame,
  };
}
