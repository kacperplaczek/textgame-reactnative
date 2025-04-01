import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StyleSheet, AppState } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import "react-native-reanimated";
import * as Notifications from "expo-notifications";
import * as NavigationBar from "expo-navigation-bar";
import { Audio } from "expo-av";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LanguageProvider } from "@/components/LanguageProviders";
import Storage from "expo-storage";

// ✅ Import pliku dźwiękowego
import pustynia from "@/assets/sounds/pustynia.mp3";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    VT323Regular: require("../assets/fonts/VT323-Regular.ttf"),
  });

  // 🔊 Ref do obiektu Audio
  const soundRef = useRef<Audio.Sound | null>(null);
  const [canPlayMusic, setCanPlayMusic] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  // ✅ Funkcja do zatrzymywania muzyki
  const stopMusic = async () => {
    if (soundRef.current) {
      try {
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded) {
          await soundRef.current.stopAsync();
          await soundRef.current.unloadAsync();
          soundRef.current = null;
          setIsLoaded(false);
          console.log("⛔ Muzyka została wyłączona.");
        }
      } catch (error) {
        console.error("❌ Błąd zatrzymywania muzyki:", error);
      }
    }
  };

  const loadAndPlayMusic = async () => {
    try {
      if (!canPlayMusic || appState !== "active") {
        console.log("⏳ Muzyka wyłączona lub aplikacja w tle.");
        return;
      }

      if (soundRef.current) {
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          console.log("✅ Muzyka już gra – nie ładuję ponownie.");
          return;
        }
      }

      console.log("🎵 Ładowanie muzyki...");

      // ✅ Konfiguracja trybu audio
      await Audio.setAudioModeAsync({
        staysActiveInBackground: false, // Muzyka zatrzyma się w tle
        playsInSilentModeIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: true,
      });

      const { sound } = await Audio.Sound.createAsync(pustynia, {
        shouldPlay: true,
        isLooping: true,
        volume: 0.5,
      });

      soundRef.current = sound;
      setIsLoaded(true);
      await sound.playAsync();
      console.log("🎶 Muzyka w tle odtwarzana!");
    } catch (error) {
      console.error("❌ Błąd odtwarzania muzyki:", error);
    }
  };

  // ✅ Pobieranie ustawień z pamięci
  useEffect(() => {
    const fetchSettings = async () => {
      const storedMusic = await Storage.getItem({ key: "canPlayMusic" });
      const isMusicOn = storedMusic !== "off";
      setCanPlayMusic(isMusicOn);
      console.log(`🎵 Ustawienia startowe: ${isMusicOn ? "ON" : "OFF"}`);
    };
    fetchSettings();
  }, []);

  // ✅ Cykliczne sprawdzanie ustawień
  useEffect(() => {
    const interval = setInterval(async () => {
      const stored = await Storage.getItem({ key: "canPlayMusic" });
      const isOn = stored !== "off";

      if (isOn !== canPlayMusic) {
        console.log("🔁 Zmiana ustawień muzyki");
        setCanPlayMusic(isOn);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [canPlayMusic]);

  // ✅ Automatyczne włączanie/wyłączanie muzyki
  useEffect(() => {
    if (canPlayMusic) {
      loadAndPlayMusic();
    } else {
      stopMusic();
    }
  }, [canPlayMusic]);

  // ✅ Nasłuchiwanie zmian stanu aplikacji
  useEffect(() => {
    const handleAppStateChange = (nextState: string) => {
      setAppState(nextState);
      if (nextState === "active" && canPlayMusic) {
        loadAndPlayMusic();
      } else {
        stopMusic();
      }
    };

    const sub = AppState.addEventListener("change", handleAppStateChange);
    return () => sub.remove();
  }, [canPlayMusic]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LanguageProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar style="auto" hidden />
      </ThemeProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  bgDefault: {
    backgroundColor: "black",
  },
});
