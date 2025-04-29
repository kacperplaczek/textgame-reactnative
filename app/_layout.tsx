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
import { useEffect, useState, createContext, useContext } from "react";
import "react-native-reanimated";
import * as Notifications from "expo-notifications";
import * as NavigationBar from "expo-navigation-bar";
import { Audio } from "expo-av";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LanguageProvider } from "@/context/LanguageContext";
import Storage from "expo-storage";
import { Platform } from "react-native";

// 🎵 Globalny kontekst dźwięku
const MusicContext = createContext({
  playMusic: () => {},
  stopMusic: () => {},
});

export function useMusic() {
  return useContext(MusicContext);
}

// ✅ Globalny menedżer muzyki
let globalSoundRef: Audio.Sound | null = null;
let globalCanPlayMusic: boolean = false;

// ✅ Import pliku dźwiękowego
const pustynia = require("@/assets/sounds/pustynia.mp3");

// ✅ Funkcja inicjalizująca muzykę
async function initializeMusic() {
  try {
    console.log("🔧 Konfiguracja trybu audio...");
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: 1,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: 1,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    if (globalSoundRef === null) {
      console.log("🎵 Globalne ładowanie muzyki...");
      const { sound } = await Audio.Sound.createAsync(pustynia, {
        shouldPlay: false, // Nie odtwarzaj automatycznie
        isLooping: true,
        volume: 1,
      });
      globalSoundRef = sound;

      // Sprawdzenie stanu muzyki z pamięci
      const storedMusic = await Storage.getItem({ key: "canPlayMusic" });
      const isMusicOn = storedMusic !== "off";
      if (isMusicOn) {
        await globalSoundRef.playAsync(); // Odtwarzaj tylko jeśli włączone
        console.log("{v} Muzyka załadowana i odtwarzana");
      } else {
        console.log("{x} Muzyka załadowana, ale nie odtwarzana");
      }
    }
  } catch (error) {
    console.log("{x} Błąd inicjalizacji muzyki", error);
  }
}

// ✅ Funkcja włączająca muzykę (play)
async function playMusic() {
  try {
    if (globalSoundRef === null) {
      console.log("🔄 Ponowne ładowanie muzyki...");
      const { sound } = await Audio.Sound.createAsync(pustynia, {
        shouldPlay: true,
        isLooping: true,
        volume: 1,
      });
      globalSoundRef = sound;
      console.log("{v} Muzyka w tle jest odtwarzana");
    } else {
      const status = await globalSoundRef.getStatusAsync();
      if (!status.isPlaying) {
        await globalSoundRef.playAsync();
        console.log("{!} Muzyka w tle już jest odtwarzana");
      } else {
        console.log("{v} Muzyka już gra");
      }
    }
  } catch (error) {
    console.log("{x} Błąd włączenia muzyki:", error);
  }
}

// ✅ Funkcja wyłączająca muzykę (pause)
async function stopMusic() {
  try {
    if (globalSoundRef) {
      const status = await globalSoundRef.getStatusAsync();
      if (status.isPlaying) {
        await globalSoundRef.pauseAsync();
        console.log("{v} Muzyka wstrzymana");
      } else {
        console.log("{!} Muzyka jest już wstrzymana");
      }
    }
  } catch (error) {
    console.log("{x} Błąd wstrzymywania muzyki:", error);
  }
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    VT323Regular: require("../assets/fonts/VT323-Regular.ttf"),
  });

  const [canPlayMusic, setCanPlayMusic] = useState<boolean>(false);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
      NavigationBar.setPositionAsync("absolute");
    }
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      const storedMusic = await Storage.getItem({ key: "canPlayMusic" });
      const isMusicOn = storedMusic !== "off";
      setCanPlayMusic(isMusicOn);
      globalCanPlayMusic = isMusicOn;
      if (isMusicOn) playMusic();
    };
    fetchSettings();
    initializeMusic();
  }, []);

  // ✅ Cykliczne sprawdzanie zmian ustawień
  useEffect(() => {
    const interval = setInterval(async () => {
      const storedMusic = await Storage.getItem({ key: "canPlayMusic" });
      const isMusicOn = storedMusic !== "off";
      if (isMusicOn !== canPlayMusic) {
        setCanPlayMusic(isMusicOn);
        globalCanPlayMusic = isMusicOn;
        if (isMusicOn) {
          playMusic();
        } else {
          stopMusic();
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [canPlayMusic]);

  useEffect(() => {
    const handleAppStateChange = (nextState: string) => {
      if (nextState === "active" && globalCanPlayMusic) {
        playMusic();
      } else if (nextState !== "active") {
        stopMusic();
      }
    };
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription.remove();
  }, []);

  const toggleMusic = async () => {
    const newState = !canPlayMusic;
    setCanPlayMusic(newState);
    globalCanPlayMusic = newState;
    await Storage.setItem({
      key: "canPlayMusic",
      value: newState ? "on" : "off",
    });
    if (newState) {
      playMusic();
    } else {
      stopMusic();
    }
  };

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <MusicContext.Provider value={{ playMusic, stopMusic }}>
      <LanguageProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack screenOptions={{ headerShown: false }}></Stack>
          <StatusBar style="auto" hidden />
        </ThemeProvider>
      </LanguageProvider>
    </MusicContext.Provider>
  );
}

const styles = StyleSheet.create({
  bgDefault: {
    backgroundColor: "black",
  },
});
