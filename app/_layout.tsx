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
  const [canPlayMusic, setCanPlayMusic] = useState<boolean | null>(null);
  const [appState, setAppState] = useState(AppState.currentState);

  // ✅ Konfiguracja Audio – nie powoduje błędów z `interruptionMode`
  useEffect(() => {
    (async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false, // ❌ Nie pyta o mikrofon
          playsInSilentModeIOS: false, // ✅ Gra w trybie cichym
          staysActiveInBackground: false, // ✅ Pozostaje aktywne w tle
          shouldDuckAndroid: false, // 🔄 Nie wycisza innych dźwięków
          playThroughEarpieceAndroid: false,
        });
        console.log("🔊 Tryb audio poprawnie skonfigurowany.");
      } catch (e) {
        console.error("❌ Błąd konfiguracji audio:", e);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchMusicSettings = async () => {
      const storedMusic = await Storage.getItem({ key: "canPlayMusic" });
      const isMusicOn = storedMusic !== "off";
      console.log(`🎵 Pobieram ustawienia: ${isMusicOn ? "ON" : "OFF"}`);
      setCanPlayMusic(isMusicOn);
    };

    fetchMusicSettings();
  }, []);

  // ✅ Funkcja do ładowania i odtwarzania muzyki
  const loadAndPlayMusic = async () => {
    if (canPlayMusic === null) {
      console.log("⏳ Oczekiwanie na pobranie ustawień muzyki...");
      return;
    }

    if (!canPlayMusic) {
      console.log("⛔ Muzyka wyłączona – zatrzymuję dźwięk.");
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      return;
    } else {
      try {
        console.log("🎵 Sprawdzanie, czy muzyka już gra...");
        if (soundRef.current) {
          const status = await soundRef.current.getStatusAsync();
          if (status.isLoaded && status.isPlaying) {
            console.log("✅ Muzyka już gra – nie ładuję ponownie.");
            return;
          }
        }

        console.log("🎵 Ładowanie muzyki...");
        const { sound } = await Audio.Sound.createAsync(pustynia, {
          shouldPlay: true,
          isLooping: true,
          volume: 0.5,
        });

        soundRef.current = sound;
        await sound.playAsync();
        console.log("🎶 Muzyka w tle odtwarzana!");
      } catch (error) {
        console.error("❌ Błąd odtwarzania muzyki:", error);
      }
    }
  };

  // ✅ Odtwarzanie muzyki – nie wyłącza się po zmianie ekranu
  useEffect(() => {
    if (canPlayMusic !== null) {
      loadAndPlayMusic();
    }
  }, [canPlayMusic]);

  // ✅ Wznawianie muzyki po powrocie do aplikacji
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      console.log(`📱 Zmiana stanu aplikacji: ${nextAppState}`);
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        console.log("🔄 Aplikacja wróciła – sprawdzam muzykę...");
        loadAndPlayMusic(); // ✅ Wznowienie muzyki
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [appState]);

  // ✅ Konfiguracja powiadomień
  useEffect(() => {
    const configureNotifications = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      SplashScreen.preventAutoHideAsync();
      NavigationBar.setVisibilityAsync("hidden");
      NavigationBar.setBehaviorAsync("inset-swipe");
    };

    configureNotifications();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || canPlayMusic === null) {
    return null; // ⏳ Czekamy na ustawienia muzyki
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
