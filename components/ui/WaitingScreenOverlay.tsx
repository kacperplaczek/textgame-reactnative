import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Modal,
  Platform,
} from "react-native";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";
import { getCurrentLanguage } from "@/lib/settings/LanguageController";
import { translations } from "@/lib/translations/translations";
import GlowSkia from "./GlowBackground";
import { Dimensions, SafeAreaView } from "react-native";

// 🔥 ID reklamy (zmień na własny przed publikacją!)
const adUnitId =
  Platform.OS === "ios"
    ? "ca-app-pub-4136563182662861/1075007008" // 🛠 iOS Test Ad
    : "ca-app-pub-4136563182662861/9144358271"; // 🛠 Android Test Ad

// 🔥 Inicjalizacja reklamy
const interstitial = InterstitialAd.createForAdRequest(adUnitId);

const waitingScreens = {
  hibernacja_w_toku: {
    titleKey: "hibernacjaTitle",
    subtitleKey: "hibernacjaSubtitle",
    background: require("@/assets/images/hibernacja.png"),
  },
  odpoczynek: {
    titleKey: "odpoczynekTitle",
    subtitleKey: "odpoczynekSubtitle",
    background: require("@/assets/images/bg_ufo.png"),
  },
  rekrutacja_oficer: {
    titleKey: "rekrutacjaTitle",
    subtitleKey: "rekrutacjaSubtitle",
    background: require("@/assets/images/rekrutacja_oficer_tlo.png"),
  },
  sygnal: {
    titleKey: "sygnalTitle",
    subtitleKey: "sygnalSubtitle",
    background: require("@/assets/images/bg_ufo.png"),
  },
  powrot_na_statek: {
    titleKey: "powrotTitle",
    subtitleKey: "powrotSubtitle",
    background: require("@/assets/images/end_of_act_bg.png"),
  },
  wspinaczka_w_toku: {
    titleKey: "wspinaczkaTitle",
    subtitleKey: "wspinaczkaSubtitle",
    background: require("@/assets/images/wspinaczka_ekran.png"),
  },
  przeprawa_w_toku: {
    titleKey: "przeprawaTitle",
    subtitleKey: "przeprawaSubtitle",
    background: require("@/assets/images/przeprawa_ekran.png"),
  },
  boom: {
    titleKey: "boomTitle",
    subtitleKey: "boomSubtitle",
    background: require("@/assets/images/boom.png"),
  },
  kosmita_oczekiwanie: {
    titleKey: "kosmitaTitle",
    subtitleKey: "kosmitaSubtitle",
    background: require("@/assets/images/kosmita_oczekiwanie.png"),
  },
  krysztal_analiza: {
    titleKey: "krysztalTitle",
    subtitleKey: "krysztalSubtitle",
    background: require("@/assets/images/krysztal_obraz.png"),
  },
  statek_odlatuje: {
    titleKey: "statekOdlatujeTitle",
    subtitleKey: "statekOdlatujeSubtitle",
    background: require("@/assets/images/statek-odlatuje.png"),
  },
};

const defaultScreen = {
  titleKey: "defaultTitle",
  subtitleKey: "defaultSubtitle",
  background: require("@/assets/images/bg_ufo.png"),
};

export default function WaitingScreenOverlay({
  visible,
  timeLeft,
  notifyScreenName,
}: {
  visible: boolean;
  timeLeft: number;
  notifyScreenName: string;
}) {
  const [screen, setScreen] = useState(defaultScreen);
  const [jezyk, setJezyk] = useState<"pl" | "en">("en");

  useEffect(() => {
    console.log("🔄 [WaitingScreenOverlay] Wywołanie useEffect");
    console.log("📌 notifyScreenName:", notifyScreenName);

    // if (!visible || !notifyScreenName) {
    //   console.log("⚠️ notifyScreenName nie jest ustawiony - ustawiam default");
    //   return;
    // }

    if (!visible) {
      return;
    }

    console.log("🔄 Ustawiam odpowiedni ekran:", notifyScreenName);
    // const selectedScreen = waitingScreens[notifyScreenName] || defaultScreen;
    // console.log(
    //   "🎯 Wybrany ekran:",
    //   notifyScreenName,
    //   "->",
    //   selectedScreen.titleKey
    // );

    // setScreen(selectedScreen);

    const selectedName =
      notifyScreenName && waitingScreens[notifyScreenName]
        ? notifyScreenName
        : "default";

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
    // ✅ Pokaż reklamę, gdy tylko się załaduje
    const adListener = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log("🎥 Reklama załadowana - wyświetlam...");
        interstitial.show();
      }
    );

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
    <Modal
      key={notifyScreenName}
      visible={visible}
      animationType="fade"
      transparent={false}
      presentationStyle="fullScreen" // <- ważne
    >
      <ImageBackground
        source={screen.background}
        style={{ width, height }} // <- pełny ekran
        resizeMode="cover"
      >
        <GlowSkia />

        <SafeAreaView style={styles.overlay}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: "#219653" }]}>
              {translatedTitle}
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.subtitle}>{translatedSubtitle}</Text>
            <Text style={styles.timeText}>
              {translatedWaitingTime}: {Math.floor(timeLeft / 60)}m{" "}
              {timeLeft % 60}s
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </Modal>
  );
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
  },
  header: {
    width: "100%",
    alignItems: "center",
    marginTop: 80,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 80,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    fontFamily: "VT323Regular",
    textShadowColor: "rgba(0,0,0,1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    color: "#219653",
    fontSize: 24,
    marginVertical: 10,
    textAlign: "center",
    fontFamily: "VT323Regular",
    textShadowColor: "rgba(0,0,0,1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  timeText: {
    color: "limegreen",
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
    fontFamily: "VT323Regular",
    textShadowColor: "rgba(0,0,0,1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
