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
import { translations } from "@/lib/translations/translations";
import { getCurrentLanguage } from "@/lib/settings/LanguageController";

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
  const [jezyk, setJezyk] = useState<"pl" | "en">("en");

  useEffect(() => {
    const loadLang = async () => {
      const lang = await getCurrentLanguage();
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

  if (!visible) return null;

  console.log("📌 npcKey w CallingScreenOverlay:", npcKey);

  // ✅ Pobieramy dane NPC
  const npcAvatar = npcKey && npcData[npcKey] ? npcData[npcKey].avatar : null;
  const npcName =
    npcKey && npcData[npcKey] && translations[jezyk][npcData[npcKey].nameKey]
      ? translations[jezyk][npcData[npcKey].nameKey]
      : "Nieznany NPC";

  // ✅ Dynamiczne tłumaczenie tytułu i subtytułu
  const translatedTitle = title
    ? translations[jezyk] && translations[jezyk][title]
      ? translations[jezyk][title]
      : title
    : translations[jezyk]?.incomingCallTitle ?? "Incoming Call";

  const translatedSubtitle = subtitle
    ? translations[jezyk] && translations[jezyk][subtitle]
      ? translations[jezyk][subtitle]
      : subtitle
    : translations[jezyk]?.incomingCallSubtitle ?? "Tap to answer";

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
            {/* 📌 PODPIS NPC (mniejsza czcionka, umieszczony POD obrazkiem) */}
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
    backgroundColor: "rgba(0, 0, 0, 0.9)", // 📌 Przyciemnienie dla czytelności
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "#219653",
  },
  // 🔼 GÓRNY TEKST
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
  // 🏙️ ŚRODEK: AVATAR + PODPIS NPC
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
  // 🔽 DOLNY TEKST
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
  // 🖼️ OBRAZ NA DOLE
  bottomImageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)", // 🔥 Delikatne tło dla czytelności
  },
  bottomImage: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
});

export default CallingScreenOverlay;
