import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import Storage from "expo-storage";
import choiceSound from "@/assets/sounds/choice.wav";
import { AppState } from "react-native";

export default function useChoiceSound() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [playPending, setPlayPending] = useState(false); // 🆕
  const soundRef = useRef<Audio.Sound | null>(null);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (nextState) => {
      setAppState(nextState);
    });

    return () => sub.remove();
  }, []);

  // ✅ Pobranie ustawień przy starcie
  useEffect(() => {
    const fetchSettings = async () => {
      const storedSound = await Storage.getItem({ key: "canPlayMusic" });
      const isOn = storedSound !== "off";
      setSoundEnabled(isOn);
      console.log(`🔊 Ustawienia startowe: ${isOn ? "ON" : "OFF"}`);
    };
    fetchSettings();
  }, []);

  // ✅ Nasłuchiwanie zmian
  useEffect(() => {
    const interval = setInterval(async () => {
      const stored = await Storage.getItem({ key: "canPlayMusic" });
      const isOn = stored !== "off";
      setSoundEnabled((prev) => {
        if (prev !== isOn) {
          console.log("🔁 Zmiana ustawień soundEnabled");
          return isOn;
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Ładowanie dźwięku gdy `soundEnabled` się zmieni
  useEffect(() => {
    const loadSound = async () => {
      if (!soundEnabled) {
        console.log("🔇 Dźwięk wyłączony – czyszczenie...");
        if (soundRef.current) {
          await soundRef.current.unloadAsync();
          soundRef.current = null;
        }
        setIsLoaded(false);
        return;
      }

      try {
        const { sound } = await Audio.Sound.createAsync(choiceSound);
        await sound.setVolumeAsync(1.0);
        soundRef.current = sound;
        setIsLoaded(true);
        console.log("✅ Dźwięk kliknięcia załadowany");
      } catch (error) {
        console.error("❌ Błąd ładowania dźwięku:", error);
      }
    };

    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, [soundEnabled]);

  // ✅ Jeśli kliknięcie było w międzyczasie, odpal je teraz
  useEffect(() => {
    if (playPending && isLoaded && soundRef.current && appState === "active") {
      console.log("▶️ Odtwarzam zaległy dźwięk po załadowaniu.");
      soundRef.current.replayAsync();
      setPlayPending(false);
    }
  }, [isLoaded, playPending]);

  // ✅ Główna funkcja
  const playChoiceSound = async () => {
    if (!soundEnabled) {
      console.log("🔇 Dźwięki wyłączone – brak reakcji.");
      return;
    }

    if (appState !== "active") {
      console.log("⏸️ Aplikacja nieaktywna – nie odtwarzam dźwięku.");
      return;
    }

    if (!isLoaded || !soundRef.current) {
      console.log("⏳ Dźwięk jeszcze się ładuje – kolejkuję kliknięcie.");
      setPlayPending(true);
      return;
    }

    try {
      console.log("🔊 Klik – odtwarzam.");
      await soundRef.current.replayAsync();
    } catch (error) {
      console.error("❌ Błąd odtwarzania:", error);
    }
  };

  return playChoiceSound;
}
