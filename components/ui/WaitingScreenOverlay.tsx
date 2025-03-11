import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Modal } from "react-native";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

// 🔹 Definiujemy ekrany + ich tła
const waitingScreens = {
  hibernacja_w_toku: {
    title: "HIBERNACJA W TOKU",
    subtitle: "Twoje ciało przechodzi w stan hibernacji.",
    color: "#219653",
    background: require("@/assets/images/hibernacja.png"),
  },
  odpoczynek: {
    title: "😴 Odpoczynek...",
    subtitle: "Regenerujesz siły przed dalszą podróżą.",
    color: "#219653",
    background: require("@/assets/images/bg_ufo.png"),
  },
  rekrutacja_oficer: {
    title: "PROSZĘ CZEKAĆ",
    subtitle: "PRZETWARZANIE ZGŁOSZENIA REKRUTACYJNEGO",
    color: "#219653",
    background: require("@/assets/images/rekrutacja_oficer_tlo.png"),
  },
  sygnal: {
    title: "📡 Oczekiwanie na sygnał...",
    subtitle: "Czekasz na połączenie ze statkiem.",
    color: "#219653",
    background: require("@/assets/images/bg_ufo.png"),
  },
  powrot_na_statek: {
    title: "Wracasz na STATEK",
    subtitle: "Oczekiwanie na powrót na Statek.",
    color: "#219653",
    background: require("@/assets/images/end_of_act_bg.png"),
  },
  wspinaczka_w_toku: {
    title: "PROSZĘ CZEKAĆ",
    subtitle: "WSPINACZKA W TOKU",
    color: "#219653",
    background: require("@/assets/images/wspinaczka_ekran.png"),
  },

  przeprawa_w_toku: {
    title: "PROSZĘ CZEKAĆ",
    subtitle: "PRZEPRAWA W TOKU",
    color: "#219653",
    background: require("@/assets/images/przeprawa_ekran.png"),
  },
  boom: {
    title: "",
    subtitle: "Proszę czekać...",
    color: "#219653",
    background: require("@/assets/images/boom.png"),
  },
  kosmita_oczekiwanie: {
    title: "",
    subtitle: "Proszę czekać...",
    color: "#219653",
    background: require("@/assets/images/kosmita_oczekiwanie.png"),
  },
  krysztal_analiza: {
    title: "ANALIZOWANIE KRYSZTAŁU",
    subtitle: "Proszę czekać...",
    color: "#219653",
    background: require("@/assets/images/krysztal_obraz.png"),
  },
};

// 🔹 Domyślny ekran (jeśli `notifyScreenName` nie pasuje)
const defaultScreen = {
  title: "PROSZĘ CZEKAĆ",
  subtitle: "Przygotowania w toku...",
  color: "#219653",
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

  // ✅ ID reklamy - używaj TestIds w trybie deweloperskim
  const interstitialAdUnitId = "ca-app-pub-4136563182662861/9144358271";

  useEffect(() => {
    if (!visible) return; // 🔥 Zabezpieczenie przed błędem

    console.log("🔄 Ustawiam odpowiedni ekran:", notifyScreenName);

    // 🔹 Ustawiamy właściwy ekran dopiero po zamontowaniu komponentu
    setScreen(waitingScreens[notifyScreenName] || defaultScreen);

    console.log("📌 Aktualny ekran:", screen.title);

    // 🔥 Tworzymy instancję reklamy pełnoekranowej
    const interstitialAd =
      InterstitialAd.createForAdRequest(interstitialAdUnitId);

    // 🔥 Nasłuchujemy, kiedy reklama się załaduje
    const adListener = interstitialAd.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log("✅ Reklama załadowana!");
        setAdLoaded(true);
        interstitialAd
          .show()
          .catch((err) => console.error("❌ Błąd wyświetlania reklamy:", err));
      }
    );

    // 🔥 Jeśli użytkownik zamknie reklamę, logujemy zdarzenie
    interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      console.log("✅ Reklama zamknięta.");
    });

    // 🔥 Ładujemy reklamę
    interstitialAd.load();

    return () => {
      adListener(); // Usuwamy nasłuchiwanie
    };
  }, [visible, notifyScreenName]);

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="fade" transparent={false}>
      <ImageBackground source={screen.background} style={styles.background}>
        <View style={styles.overlay}>
          {/* 🔹 Tytuł na górze */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: screen.color }]}>
              {screen.title}
            </Text>
          </View>

          {/* 🔹 Dolna część z opisem i czasem */}
          <View style={styles.footer}>
            <Text style={styles.subtitle}>{screen.subtitle}</Text>
            <Text style={styles.timeText}>
              Pozostały czas: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
            </Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.1)", // 🔹 Przyciemnienie, żeby poprawić czytelność tekstu
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
