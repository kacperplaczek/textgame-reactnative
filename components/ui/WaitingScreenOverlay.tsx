import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Modal,
  Platform,
} from "react-native";
import { InterstitialAd, AdEventType } from "react-native-google-mobile-ads";
import { getCurrentLanguage } from "@/lib/settings/LanguageController";
import { translations } from "@/lib/translations/translations";

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
  const [adLoaded, setAdLoaded] = useState(false);
  const [jezyk, setJezyk] = useState<"pl" | "en">("en");

  useEffect(() => {
    if (!visible || !notifyScreenName) return;

    console.log("🔄 Ustawiam odpowiedni ekran:", notifyScreenName);

    const selectedScreen = waitingScreens[notifyScreenName] || defaultScreen;

    if (screen !== selectedScreen) {
      console.log("📌 Aktualizacja ekranu na:", notifyScreenName);
      setScreen(selectedScreen);
    }

    // ✅ Pobranie języka użytkownika
    const loadLang = async () => {
      const lang = await getCurrentLanguage();
      console.log("🌍 Ustawiam język w WaitingScreenOverlay:", lang);
      setJezyk(lang);
    };

    loadLang();
  }, [visible, notifyScreenName]);

  useEffect(() => {
    if (notifyScreenName && waitingScreens[notifyScreenName]) {
      console.log("🔄 Wymuszam aktualizację ekranu:", notifyScreenName);
      setScreen(waitingScreens[notifyScreenName]);
    }
  }, [notifyScreenName]);

  if (!visible) return null;

  const translatedTitle =
    translations[jezyk]?.[screen.titleKey] ?? "PROSZĘ CZEKAĆ";
  const translatedSubtitle =
    translations[jezyk]?.[screen.subtitleKey] ?? "Przygotowania w toku...";

  return (
    <Modal
      key={notifyScreenName}
      visible={visible}
      animationType="fade"
      transparent={false}
    >
      <ImageBackground source={screen.background} style={styles.background}>
        <View style={styles.overlay}>
          {/* 🔹 Tytuł na górze */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: "#219653" }]}>
              {translatedTitle}
            </Text>
          </View>

          {/* 🔹 Dolna część z opisem i czasem */}
          <View style={styles.footer}>
            <Text style={styles.subtitle}>{translatedSubtitle}</Text>
            {/* <Text style={styles.timeText}>
              Pozostały czas: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
            </Text> */}
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
}

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
