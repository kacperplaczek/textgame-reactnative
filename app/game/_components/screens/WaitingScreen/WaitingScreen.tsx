import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Modal,
  ActivityIndicator,
} from "react-native";
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
  const [isImageLoaded, setIsImageLoaded] = useState(false); // 👈 dodaj

  useEffect(() => {
    if (!visible) return;

    setIsImageLoaded(false); // resetuj przy każdym ekranie

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
    interstitial.load();
  }, [visible, notifyScreenName]);

  useEffect(() => {
    return () => {
      adListener();
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
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      {!isImageLoaded && (
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#219653" />
        </View>
      )}

      <ImageBackground
        source={screen.background}
        style={{ flex: 1 }}
        resizeMode="cover"
        onLoadEnd={() => setIsImageLoaded(true)} // 👈 kluczowy moment
      >
        {isImageLoaded && (
          <>
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
          </>
        )}
      </ImageBackground>
    </View>
  );
}
