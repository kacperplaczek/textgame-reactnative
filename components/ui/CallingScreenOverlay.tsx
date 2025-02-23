import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

// ✅ Import NPCData.ts
import { npcData, NpcKey } from "@/lib/dialogue/NPCData";
import { translations } from "@/lib/translations/translations";

// ✅ Domyślne tło
const DefaultBgImage = require("../../assets/images/bg_ufo.png");
// ✅ Statyczny obraz na dole
const BottomImage = require("../../assets/images/panel_komputera.png");

interface CallingScreenOverlayProps {
  visible: boolean;
  title: string;
  subtitle?: string;
  npcKey?: NpcKey; // ✅ Pobieramy NPC
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
  useEffect(() => {
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
    npcKey && npcData[npcKey]
      ? translations["pl"][npcData[npcKey].nameKey]
      : "";

  console.log("🖼️ Avatar NPC:", npcAvatar);

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
            <Text style={styles.title}>{title}</Text>
          </View>

          {/* 📌 ŚRODKOWA CZĘŚĆ: AVATAR + NAZWA NPC */}
          <View style={styles.middleContainer}>
            {npcAvatar ? (
              <Image source={npcAvatar} style={styles.image} />
            ) : (
              <Text style={{ color: "red" }}>Brak obrazu NPC</Text>
            )}

            {npcName && <Text style={styles.npcName}>{npcName}</Text>}
          </View>

          {/* 📌 DOLNY TEKST (Kliknij, by odebrać) */}
          <View style={styles.bottomContainer}>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
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
    borderWidth: 1,
    borderColor: "limegreen",
  },
  // 🔼 GÓRNY TEKST
  topContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    color: "#22ff22",
    fontFamily: "VT323Regular",
    textAlign: "center",
    textTransform: "uppercase",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  // 🏙️ ŚRODEK: AVATAR + IMIĘ NPC
  middleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 10,
    resizeMode: "contain",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#219653",
  },
  npcName: {
    fontSize: 20,
    color: "#22ff22",
    fontFamily: "VT323Regular",
    textAlign: "center",
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
    fontSize: 18,
    color: "#22ff22",
    fontFamily: "VT323Regular",
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  // 🖼️ OBRAZ NA DOLE
  bottomImageContainer: {
    width: "100%", // ✅ Szerokość taka sama jak kontener!
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0, // ✅ Pozycjonujemy go na samym dole ekranu
    backgroundColor: "rgba(0,0,0,0.7)", // 🔥 Dodajemy delikatne tło, by lepiej wyglądało
  },
  bottomImage: {
    width: "100%", // ✅ Obraz dostosowuje się do szerokości kontenera
    height: 100, // 📌 Możesz zmienić wysokość według potrzeby
    resizeMode: "contain",
  },
});

export default CallingScreenOverlay;
