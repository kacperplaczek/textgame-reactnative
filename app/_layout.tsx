import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { AppState, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LanguageProvider } from "@/context/LanguageContext";
import Storage from "expo-storage";
import {
  playBackgroundMusic,
  pauseBackgroundMusic,
  loadSoundSettings,
} from "@/services/soundController";
import { WaitingScreenProvider } from "@/context/WaitingScreenContext";
import { DarknessUIProvider } from "@/context/DarknessUIContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    VT323Regular: require("../assets/fonts/VT323-Regular.ttf"),
  });

  const [canPlayMusic, setCanPlayMusic] = useState(false);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
      NavigationBar.setPositionAsync("absolute");
    }
  }, []);

  useEffect(() => {
    const setupMusic = async () => {
      await loadSoundSettings();
      const storedMusic = await Storage.getItem({ key: "canPlayMusic" });
      if (storedMusic !== "off") {
        await playBackgroundMusic();
        setCanPlayMusic(true);
      }
    };
    setupMusic();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active" && canPlayMusic) {
        playBackgroundMusic();
      } else {
        pauseBackgroundMusic();
      }
    });
    return () => subscription.remove();
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
      <DarknessUIProvider>
        <WaitingScreenProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar style="auto" hidden />
          </ThemeProvider>
        </WaitingScreenProvider>
      </DarknessUIProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  bgDefault: {
    backgroundColor: "black",
  },
});
