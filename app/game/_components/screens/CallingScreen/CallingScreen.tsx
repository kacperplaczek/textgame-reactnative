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
import { stopSound } from "@/lib/helpers/soundController";

// Domyślne tła
const DefaultBgImage = require("@/assets/images/bg_intro.png");
const BottomImage = require("@/assets/images/panel_komputera.png");

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
  const [jezyk, setJezyk] = useState<"pl" | "en" | null>(null);

  useEffect(() => {
    const fetchLang = async () => {
      const lang = await getCurrentLanguage();
      setJezyk(lang);
    };
    fetchLang();

    if (autoNextDelay) {
      const timeout = setTimeout(onClose, autoNextDelay);
      return () => clearTimeout(timeout);
    }
  }, [autoNextDelay]);

  if (!visible || !jezyk) return null;

  // Avatar i nazwa NPC
  const npcAvatar = npcKey ? npcData[npcKey]?.avatar : null;
  const npcName =
    npcKey && translations[jezyk]?.[npcData[npcKey]?.nameKey]
      ? translations[jezyk][npcData[npcKey].nameKey]
      : "Nieznany NPC";

  // Tłumaczenia tytułów
  const translatedTitle =
    title && translations[jezyk]?.[title]
      ? translations[jezyk][title]
      : translations[jezyk]?.incomingCallTitle ?? "Połączenie przychodzące";

  const translatedSubtitle =
    subtitle && translations[jezyk]?.[subtitle]
      ? translations[jezyk][subtitle]
      : translations[jezyk]?.incomingCallSubtitle ?? "Kliknij, aby odebrać";

  // Tło
  let backgroundImage = DefaultBgImage;
  if (typeof background === "string" && background.startsWith("http")) {
    backgroundImage = { uri: background };
  } else if (background && typeof background !== "string") {
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
          <View style={styles.topContainer}>
            <Text style={styles.title}>{translatedTitle}</Text>
          </View>

          <View style={styles.middleContainer}>
            {npcAvatar ? (
              <Image source={npcAvatar} style={styles.image} />
            ) : (
              <Text style={{ color: "red" }}>Brak avatara</Text>
            )}
            <Text style={styles.npcName}>{npcName}</Text>
          </View>

          <View style={styles.bottomContainer}>
            <Text style={styles.subtitle}>{translatedSubtitle}</Text>
          </View>
        </View>

        <View style={styles.bottomImageContainer}>
          <Image source={BottomImage} style={styles.bottomImage} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CallingScreenOverlay;
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
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 30,
    color: "#219653",
    fontFamily: "VT323Regular",
    textAlign: "center",
    textTransform: "uppercase",
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
  },
  bottomContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    color: "#219653",
    fontFamily: "VT323Regular",
    textAlign: "center",
  },
  bottomImageContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  bottomImage: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
});
