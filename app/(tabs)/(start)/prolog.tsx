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
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import Storage from "expo-storage";
import { StatusBar } from "expo-status-bar";
import { translations, Language } from "@/lib/translations/translations";
import { getCurrentLanguage } from "@/lib/settings/LanguageController";
import { Audio } from "expo-av";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

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
    if (currentScreen === "intro") {
      setFullText(translations[jezyk].introText);
    } else if (currentScreen === "prolog") {
      setFullText(translations[jezyk].prologText);
    }
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
      await sound.stopAsync().catch(() => {}); // Próbuje zatrzymać dźwięk
      await sound.unloadAsync().catch(() => {}); // Wymusza usunięcie z pamięci
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
      <TouchableWithoutFeedback onPress={handleScreenChange}>
        <View style={styles.fullscreenTouchable}>
          <View style={styles.overlay} />

          {/* Tytuł i treść - środek */}
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>
              {currentScreen === "intro"
                ? translations[jezyk].introTitle
                : translations[jezyk].prologTitle}
            </Text>

            {/* Scrollowany tekst */}
            <ScrollView
              style={styles.textContainer}
              contentContainerStyle={{ flexGrow: 1 }}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
            >
              <TouchableWithoutFeedback>
                <AutoSizeText
                  style={styles.text}
                  fontSize={22} // Domyślny rozmiar
                  mode={ResizeTextMode.max_lines}
                  numberOfLines={10} // Maksymalnie 10 linii przed przewijaniem
                  minFontSize={26} // Minimalny rozmiar czcionki na małych ekranach
                >
                  {displayedText}
                </AutoSizeText>
              </TouchableWithoutFeedback>
            </ScrollView>

            {isSaving && (
              <ActivityIndicator color="#219653" style={{ marginTop: 20 }} />
            )}
          </View>

          {/* Przyciski na dole */}
          <View style={styles.bottomWrapper}>
            {!isSaving && !isTyping && (
              <Text style={styles.tapText}>
                {translations[jezyk].clickToContinue}
              </Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

// Skaluje czcionkę, ale utrzymuje domyślny 22px
const scaleFont = (size) => Math.max((size * width) / 375, 16);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  fullscreenTouchable: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: height * 0.2, // Przesuwamy treść mniej więcej na środek ekranu
    paddingHorizontal: width * 0.05,
  },
  textContainer: {
    maxHeight: height * 0.4, // Ograniczenie wysokości
    marginBottom: 20, // Odstęp od dolnych elementów
  },
  bottomWrapper: {
    paddingBottom: height * 0.05,
    alignItems: "center",
  },
  title: {
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: 34,
    marginBottom: 12,
  },
  text: {
    color: "#219653",
    fontFamily: "VT323Regular",
    textAlign: "justify",
  },
  tapText: {
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: 30,
    textAlign: "center",
  },
});
