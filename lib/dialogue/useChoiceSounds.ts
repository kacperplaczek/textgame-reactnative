import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import Storage from "expo-storage";
import choiceSound from "@/assets/sounds/choice.wav";

export default function useChoiceSound() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // ✅ Pobieranie ustawień dźwięku
  useEffect(() => {
    const fetchSoundSettings = async () => {
      const storedSound = await Storage.getItem({ key: "canPlayMusic" });
      const isSoundOn = storedSound !== "off";
      console.log(`🔊 Ustawienia dźwięku: ${isSoundOn ? "ON" : "OFF"}`);
      setSoundEnabled(isSoundOn);
    };

    fetchSoundSettings();
  }, []);

  // ✅ Ładowanie dźwięku
  useEffect(() => {
    const loadSound = async () => {
      if (!soundEnabled) {
        console.log("🔇 Dźwięk wyłączony – nie ładuję.");
        return;
      }

      try {
        const { sound } = await Audio.Sound.createAsync(choiceSound);
        await sound.setVolumeAsync(1.0);
        setSound(sound);
        console.log("✅ Dźwięk kliknięcia załadowany.");
      } catch (error) {
        console.error("❌ Błąd ładowania dźwięku:", error);
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
        console.log("🛑 Dźwięk kliknięcia zwolniony z pamięci.");
      }
    };
  }, [soundEnabled]);

  // ✅ Funkcja do odtwarzania dźwięku
  const playChoiceSound = async () => {
    if (!soundEnabled || !sound) {
      console.log("🔇 Dźwięki wyłączone – nie odtwarzam.");
      return;
    }

    try {
      console.log("🔊 Odtwarzanie dźwięku kliknięcia...");
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } catch (error) {
      console.error("❌ Błąd odtwarzania dźwięku kliknięcia:", error);
    }
  };

  return playChoiceSound;
}
