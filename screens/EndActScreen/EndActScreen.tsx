import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { getCurrentLanguage } from "@/lib/settings/LanguageController";
import { translations, Language } from "@/lib/translations/translations";

type ActEndScreenProps = {
  onContinue: () => void;
};

export default function ActEndScreen({ onContinue }: ActEndScreenProps) {
  const [jezyk, setJezyk] = useState<Language>("pl");

  useEffect(() => {
    const fetchLang = async () => {
      const lang = await getCurrentLanguage();
      setJezyk(lang);
    };
    fetchLang();

    const timeout = setTimeout(onContinue, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ImageBackground style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <ActivityIndicator
          size="large"
          color="limegreen"
          style={styles.spinner}
        />
        <Text style={styles.waitingText}>
          {translations[jezyk].endActWaiting}
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Cały ekran
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "#219653",
    marginBottom: 8,
    fontFamily: "VT323Regular",
  },
  subtitle: {
    fontSize: 20,
    color: "white",
    marginBottom: 16,
    fontFamily: "VT323Regular",
  },
  spinner: { marginBottom: 10 },
  waitingText: { fontSize: 18, color: "#219653", fontFamily: "VT323Regular" },
});
