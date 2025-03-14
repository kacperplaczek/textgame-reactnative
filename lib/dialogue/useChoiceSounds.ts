import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import Storage from "expo-storage";

// ✅ Import pliku dźwiękowego
import choiceSound from "@/assets/sounds/choice.wav";

export default function useChoiceSound() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // ✅ Pobieranie ustawień dźwięku
  useEffect(() => {
    const fetchSoundSettings = async () => {
      const storedSound = await Storage.getItem({ key: "soundEnabled" });
      const isSoundOn = storedSound !== "off"; // Jeśli `off`, nie odtwarzaj
      console.log(`🔊 Ustawienia dźwięku: ${isSoundOn ? "ON" : "OFF"}`);
      setSoundEnabled(isSoundOn);
    };

    fetchSoundSettings();
  }, []);

  // ✅ Ładowanie dźwięku tylko raz przy starcie aplikacji
  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(choiceSound);
        setSound(sound);
        console.log("✅ Dźwięk kliknięcia załadowany.");
      } catch (error) {
        console.error("❌ Błąd ładowania dźwięku:", error);
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync(); // ✅ Zwolnienie pamięci przy zamknięciu aplikacji
        console.log("🛑 Dźwięk kliknięcia zwolniony z pamięci.");
      }
    };
  }, []);

  // ✅ Funkcja do odtwarzania dźwięku
  const playChoiceSound = async () => {
    if (!soundEnabled || !sound) {
      console.log("🔇 Dźwięki wyłączone – nie odtwarzam.");
      return;
    }

    try {
      console.log("🔊 Odtwarzanie dźwięku kliknięcia...");
      await sound.setPositionAsync(0); // ⬅️ Resetujemy dźwięk do początku
      await sound.playAsync();
    } catch (error) {
      console.error("❌ Błąd odtwarzania dźwięku kliknięcia:", error);
    }
  };

  return playChoiceSound;
}
