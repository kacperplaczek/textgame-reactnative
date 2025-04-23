import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Modal } from "react-native";
import { getCurrentLanguage } from "@/lib/settings/LanguageController";
import { translations } from "@/lib/translations/translations";
import GlowSkia from "@/components/ui/GlowBackground";
import { Dimensions, SafeAreaView } from "react-native";
import { adListener, interstitial } from "@/lib/ads/LoadInterestialAd";
import { waitingScreens } from "./_config/WaitingScreens";
import { defaultScreen } from "./_config/DefaultWaitingScreen";
import { WaitingSCreenStyles } from "./_assets/styles";

export default function WaitingScreenOverlay({
  visible,
  timeLeft,
  notifyScreenName,
}: {
  visible: boolean;
  timeLeft: number;
  notifyScreenName: string;
}) {
  const { width, height } = Dimensions.get("window");
  const [screen, setScreen] = useState(defaultScreen);
  const [jezyk, setJezyk] = useState<"pl" | "en">("en");

  useEffect(() => {
    console.log("{v} [WaitingScreenOverlay] Wywołanie useEffecta");
    console.log("📌 notifyScreenName:", notifyScreenName);

    if (!visible) {
      return;
    }

    console.log("🔄 Ustawiam odpowiedni ekran:", notifyScreenName);

    const selectedName =
      notifyScreenName && waitingScreens[notifyScreenName]
        ? notifyScreenName
        : "defaultScreen";

    console.log("🔄 Ustawiam ekran:", selectedName);

    setScreen(waitingScreens[selectedName] || defaultScreen);

    // ✅ Pobranie języka użytkownika
    const loadLang = async () => {
      const lang = await getCurrentLanguage();
      console.log("🌍 Ustawiam język w WaitingScreenOverlay:", lang);
      setJezyk(lang);
    };

    loadLang();

    // ✅ Ładowanie reklamy
    interstitial.load();
  }, [visible, notifyScreenName]);

  useEffect(() => {
    return () => {
      adListener(); // Czyszczenie event listenera
    };
  }, []);

  if (!visible) return null;

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
        zIndex: 999,
      }}
    >
      <ImageBackground
        source={screen.background}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <GlowSkia />

        <SafeAreaView style={WaitingSCreenStyles.overlay}>
          <View style={WaitingSCreenStyles.header}>
            <Text style={[WaitingSCreenStyles.title, { color: "#219653" }]}>
              {translatedTitle}
            </Text>
          </View>

          <View style={WaitingSCreenStyles.footer}>
            <Text style={WaitingSCreenStyles.subtitle}>
              {translatedSubtitle}
            </Text>
            <Text style={WaitingSCreenStyles.timeText}>
              {translatedWaitingTime}: {Math.floor(timeLeft / 60)}m{" "}
              {timeLeft % 60}s
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
