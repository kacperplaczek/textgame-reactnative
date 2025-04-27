import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { npcData, NpcKey } from "@/lib/dialogue/NPCData";
import { translations } from "@/i18n/translations";
import { getCurrentLanguage } from "@/models/LanguageController";

// ✅ Domyślne tło i dolny obrazek
const DefaultBgImage = require("../../assets/images/bg_intro.png");
const BottomImage = require("../../assets/images/panel_komputera.png");

interface CallingScreenOverlayProps {
  visible: boolean;
  title?: string;
  subtitle?: string;
  npcKey?: NpcKey;
  background?: any;
  onClose: () => void;
  autoNextDelay?: number;
}

const CallingScreenOverlay: React.FC<CallingScreenOverlayProps> = ({
  visible,
  title,
  subtitle,
  npcKey,
  background,
  onClose,
  autoNextDelay,
}) => {
  const [jezyk, setJezyk] = useState<"pl" | "en" | null>(null); // ⏳ Początkowo `null`, czekamy na `Storage`

  useEffect(() => {
    const loadLang = async () => {
      const lang = await getCurrentLanguage();
      console.log("🌍 Ustawiam język:", lang);
      setJezyk(lang);
    };
    loadLang();

    if (autoNextDelay) {
      const timeout = setTimeout(() => {
        onClose();
      }, autoNextDelay);
      return () => clearTimeout(timeout);
    }
  }, [autoNextDelay]);

  if (!visible || !jezyk) return null; // ⏳ Czekamy na język

  console.log("📌 npcKey w CallingScreenOverlay:", npcKey);

  // ✅ Pobieramy dane NPC
  const npcAvatar = npcKey && npcData[npcKey] ? npcData[npcKey].avatar : null;
  const npcName =
    npcKey && npcData[npcKey] && translations[jezyk]?.[npcData[npcKey].nameKey]
      ? translations[jezyk][npcData[npcKey].nameKey]
      : "Nieznany NPC";

  // ✅ Dynamiczne tłumaczenie tytułu i subtytułu
  const translatedTitle =
    title && translations[jezyk]?.[title]
      ? translations[jezyk][title]
      : translations[jezyk]?.incomingCallTitle ?? title ?? "Incoming Call";

  const translatedSubtitle =
    subtitle && translations[jezyk]?.[subtitle] // Jeśli `subtitle` istnieje w tłumaczeniach, używamy go
      ? translations[jezyk][subtitle]
      : translations[jezyk]?.incomingCallSubtitle ?? "Kliknij, aby odebrać"; // Domyślne tłumaczenie, jeśli `subtitle` jest puste

  console.log("🖼️ Avatar NPC:", npcAvatar);
  console.log("🔤 Nazwa NPC:", npcName);
  console.log("🔠 Przetłumaczony tytuł:", translatedTitle);
  console.log("🔠 Przetłumaczony opis:", translatedSubtitle);

  // ✅ Wybór tła
  let backgroundImage = DefaultBgImage;
  if (typeof background === "string" && background.startsWith("http")) {
    backgroundImage = { uri: background };
  } else if (typeof background !== "string") {
    backgroundImage = background;
  }

  return (
    <TouchableOpacity
      style={styles.overlay}
      onPress={onClose}
      activeOpacity={1}
    >
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          {/* 📌 GÓRNY TEKST (Tytuł) */}
          <View style={styles.topContainer}>
            <Text style={styles.title}>{translatedTitle}</Text>
          </View>

          {/* 📌 ŚRODKOWA CZĘŚĆ: AVATAR */}
          <View style={styles.middleContainer}>
            {npcAvatar ? (
              <Image source={npcAvatar} style={styles.image} />
            ) : (
              <Text style={{ color: "red" }}>Brak obrazu NPC</Text>
            )}
            {/* 📌 PODPIS NPC */}
            {npcName && <Text style={styles.npcName}>{npcName}</Text>}
          </View>

          {/* 📌 DOLNY TEKST (Kliknij, by odebrać) */}
          <View style={styles.bottomContainer}>
            {translatedSubtitle && (
              <Text style={styles.subtitle}>{translatedSubtitle}</Text>
            )}
          </View>
        </View>

        {/* 📌 STATYCZNY OBRAZ NA DOLE */}
        <View style={styles.bottomImageContainer}>
          <Image source={BottomImage} style={styles.bottomImage} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    height: "70%",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "#219653",
  },
  topContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 30,
    color: "#219653",
    fontFamily: "VT323Regular",
    textAlign: "center",
    textTransform: "uppercase",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  middleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 5,
    resizeMode: "contain",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#219653",
  },
  npcName: {
    fontSize: 24,
    color: "#219653",
    fontFamily: "VT323Regular",
    textAlign: "center",
    marginTop: 4,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    color: "#219653",
    fontFamily: "VT323Regular",
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bottomImageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  bottomImage: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
});

export default CallingScreenOverlay;
