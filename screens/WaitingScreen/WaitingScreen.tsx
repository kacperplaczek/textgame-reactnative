// /screens/WaitingScreen/WaitingScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useWaitingScreen } from "@/context/WaitingScreenContext";
import { getCurrentLanguage } from "@/models/LanguageController";
import { translations } from "@/i18n/translations";
import { waitingScreens } from "./_config/WaitingScreens";
import { defaultScreen } from "./_config/DefaultWaitingScreen";
import GlowSkia from "@/components/ui/GlowBackground";

export default function WaitingScreenOverlay() {
  const { waitingVisible, notifyScreenName, timeLeft } = useWaitingScreen();
  const { width, height } = Dimensions.get("window");

  const [screen, setScreen] = useState(defaultScreen);
  const [jezyk, setJezyk] = useState<"pl" | "en">("en");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (!waitingVisible) return;

    setIsImageLoaded(false);

    const selectedName =
      notifyScreenName && waitingScreens[notifyScreenName]
        ? notifyScreenName
        : "defaultScreen";

    setScreen(waitingScreens[selectedName] || defaultScreen);

    const loadLang = async () => {
      const lang = await getCurrentLanguage();
      setJezyk(lang);
    };
    loadLang();
  }, [waitingVisible, notifyScreenName]);

  if (!waitingVisible) return null;

  const translatedTitle =
    translations[jezyk]?.[screen.titleKey] ?? "PROSZĘ CZEKAĆ";
  const translatedSubtitle =
    translations[jezyk]?.[screen.subtitleKey] ?? "Przygotowania w toku...";
  const translatedWaitingTime =
    translations[jezyk]?.["WaitingTime"] ?? "Pozostało";

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      testID="ActivityIndicator"
    >
      {!isImageLoaded && <ActivityIndicator size="large" color="#219653" />}

      <ImageBackground
        source={screen.background}
        style={{ flex: 1 }}
        resizeMode="cover"
        onLoadEnd={() => setIsImageLoaded(true)}
      >
        {isImageLoaded && (
          <>
            <GlowSkia />
            <SafeAreaView style={styles.overlay}>
              <View style={styles.header}>
                <Text style={styles.title}>{translatedTitle}</Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.subtitle}>{translatedSubtitle}</Text>
                <Text style={styles.timeText}>
                  {translatedWaitingTime}: {Math.floor(timeLeft / 60)}m{" "}
                  {timeLeft % 60}s
                </Text>
              </View>
            </SafeAreaView>
          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    marginTop: 20,
  },
  title: {
    color: "#219653",
    fontSize: 28,
    fontFamily: "VT323Regular",
    textAlign: "center",
  },
  footer: {
    marginBottom: 40,
    alignItems: "center",
  },
  subtitle: {
    color: "#41ff91",
    fontSize: 20,
    fontFamily: "VT323Regular",
    marginBottom: 10,
  },
  timeText: {
    color: "#41ff91",
    fontSize: 18,
    fontFamily: "VT323Regular",
  },
});
