// useGameMenuViewModel.ts
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getCurrentLanguage } from "@/models/LanguageController";
import { translations } from "@/i18n/translations";
import * as Updates from "expo-updates";
import Storage from "expo-storage";
import {
  isSoundEnabled,
  isMusicEnabled,
  setSoundEffectsEnabled,
  setMusicEnabled,
  playClickSound,
  playBackgroundMusic,
  pauseBackgroundMusic,
} from "@/services/soundController";

export function useGameMenuViewModel() {
  const [jezyk, setJezyk] = useState("pl");
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true); // efekty kliknięcia itd.
  const [canPlayMusic, setCanPlayMusic] = useState(true);
  const [canPlaySound, setCanPlaySound] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const fetchLanguage = async () => {
      const lang = await getCurrentLanguage();
      setJezyk(lang);
    };
    fetchLanguage();
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      setSoundEnabled(isSoundEnabled());
      setCanPlayMusic(isMusicEnabled());

      const storedNotifications = await Storage.getItem({
        key: "notificationsEnabled",
      });
      setNotificationsEnabled(storedNotifications !== "off");
    };
    fetchSettings();
  }, []);

  const toggleMusic = async () => {
    try {
      const newSetting = !canPlayMusic;
      await setMusicEnabled(newSetting);
      setCanPlayMusic(newSetting);
      console.log(`🎵 Muzyka ustawiona na: ${newSetting}`);
    } catch (e) {
      console.error("❌ Błąd zmiany ustawienia muzyki:", e);
    }
  };

  const toggleSound = async () => {
    try {
      const newSetting = !soundEnabled;
      await setSoundEffectsEnabled(newSetting);
      setSoundEnabled(newSetting);
      console.log(`🔊 Efekty dźwiękowe ustawione na: ${newSetting}`);
      if (newSetting) {
        await playClickSound();
      }
    } catch (e) {
      console.error("❌ Błąd zmiany efektów dźwiękowych:", e);
    }
  };

  const toggleNotifications = async () => {
    const newSetting = notificationsEnabled ? "off" : "on";
    await Storage.setItem({ key: "notificationsEnabled", value: newSetting });
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleResetGame = async () => {
    Alert.alert(
      translations[jezyk].menuResetTitle,
      translations[jezyk].menuResetMessage,
      [
        { text: translations[jezyk].menuResetCancel, style: "cancel" },
        {
          text: translations[jezyk].menuResetConfirm,
          onPress: async () => {
            console.log("🔍 Usuwanie wszystkich kluczy...");

            const allKeys = await Storage.getAllKeys();
            for (const key of allKeys) {
              await Storage.removeItem({ key });
            }

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
    canPlayMusic,
    notificationsEnabled,
    toggleMusic,
    toggleSound,
    toggleNotifications,
    handleResetGame,
  };
}
