import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import Storage from "expo-storage";
import { StatusBar } from "expo-status-bar";
import { translations, Language } from "@/lib/translations/translations";
import { getCurrentLanguage } from "@/lib/settings/LanguageController";
import { Audio } from "expo-av";
import { PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

export default function PrologScreen() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState<"intro" | "prolog">(
    "intro"
  );
  const [isSaving, setIsSaving] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [fullText, setFullText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingInterval, setTypingInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const [jezyk, setJezyk] = useState<Language>("pl");

  useEffect(() => {
    const loadLang = async () => {
      const lang = await getCurrentLanguage();
      setJezyk(lang);
    };
    loadLang();
  }, []);

  useEffect(() => {
    const newText =
      currentScreen === "intro"
        ? translations[jezyk].introText
        : translations[jezyk].prologText;

    setFullText(newText);
    setDisplayedText("");
    setIsTyping(true);
  }, [currentScreen, jezyk]);

  useEffect(() => {
    if (isTyping && fullText.length > 0) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 25);

      setTypingInterval(interval);
      return () => clearInterval(interval);
    }
  }, [isTyping, fullText]);

  const stopAllSounds = async () => {
    try {
      console.log("⏹️ Zatrzymuję wszystkie dźwięki przed przejściem...");
      const sound = new Audio.Sound();
      await sound.stopAsync().catch(() => {});
      await sound.unloadAsync().catch(() => {});
    } catch (e) {
      console.error("❌ Błąd zatrzymywania dźwięków:", e);
    }
  };

  const handleScreenChange = async () => {
    if (isTyping) {
      if (typingInterval) clearInterval(typingInterval);
      setDisplayedText(fullText);
      setIsTyping(false);
      return;
    }

    if (currentScreen === "intro") {
      console.log("📜 Przechodzę do prologu...");
      setCurrentScreen("prolog");
    } else if (currentScreen === "prolog") {
      console.log("✅ Prolog zakończony, zapisuję stan gry...");
      setIsSaving(true);
      await stopAllSounds();
      await Storage.setItem({ key: "gameStarted", value: "true" });
      await Storage.setItem({ key: "currentAct", value: "startgame" });
      router.replace("/startgame");
    }
  };

  return (
    <ImageBackground
      source={
        currentScreen === "intro"
          ? require("../../../assets/images/bg_intro.png")
          : require("../../../assets/images/bg_prolog.png")
      }
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar hidden />
      <View style={styles.fullscreenTouchable}>
        <View style={styles.overlay} />

        {/* Tytuł */}
        <Text style={styles.title}>
          {currentScreen === "intro"
            ? translations[jezyk].introTitle
            : translations[jezyk].prologTitle}
        </Text>

        {/* Scrollowany tekst */}
        <ScrollView style={styles.textContainer} showsVerticalScrollIndicator>
          <Text style={styles.text}>{displayedText}</Text>
        </ScrollView>

        {isSaving && (
          <ActivityIndicator color="#219653" style={{ marginTop: 20 }} />
        )}

        {/* Klikalne "KLIKNIJ ABY KONTYNUOWAĆ" - zawsze na dole ekranu */}
        {!isSaving && (
          <View style={styles.bottomWrapper}>
            <TouchableOpacity
              onPress={handleScreenChange}
              style={styles.tapArea}
            >
              <Text style={styles.tapText}>
                {translations[jezyk].clickToContinue}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

// Skaluje czcionkę w zależności od ekranu
const scaleFont = (size: number) => {
  const { width, height } = Dimensions.get("window");
  const scale = width / 375; // Punkt odniesienia: iPhone SE (375px szerokości)
  const isTablet = width >= 768; // Prosty warunek rozpoznawania iPada

  // Na iPadzie zmniejszamy skalowanie, żeby czcionki nie były za duże
  const tabletScaleFactor = isTablet ? 0.7 : 1;

  return Math.round(
    PixelRatio.getFontScale() * size * scale * tabletScaleFactor
  );
};

// Stylizacja
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  fullscreenTouchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Tekst i tytuł wyrównane do lewej
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  title: {
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: scaleFont(28),
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
    maxHeight: height * 0.6, // Maksymalna wysokość na treść
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  text: {
    color: "#219653",
    fontFamily: "VT323Regular",
    textAlign: "left", // Tekst wyrównany do lewej
    fontSize: scaleFont(24),
    paddingBottom: 0,
  },
  bottomWrapper: {
    position: "absolute",
    bottom: height * 0.05, // Stała pozycja na dole ekranu
    width: "100%",
    alignItems: "center", // TapText wyśrodkowany
  },
  tapArea: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  tapText: {
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: scaleFont(24),
    textAlign: "center",
    textTransform: "uppercase",
  },
});
