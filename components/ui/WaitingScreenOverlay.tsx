import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Modal,
} from "react-native";

// 🔹 Definiujemy ekrany + ich tła
const waitingScreens = {
  hibernacja_w_toku: {
    title: "HIBERNACJA W TOKU",
    subtitle: "Twoje ciało przechodzi w stan hibernacji.",
    color: "#219653",
    background: require("@/assets/images/bg_ufo.png"),
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
  if (!visible) return null;

  // 🔹 Pobieramy ekran na podstawie `notifyScreenName`
  const screen = waitingScreens[notifyScreenName] || defaultScreen;

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
            {/* <ActivityIndicator size="large" color={screen.color} /> */}
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
    fontSize: 18,
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
