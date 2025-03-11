import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import * as Updates from "expo-updates";
import Storage from "expo-storage";
import { getCurrentLanguage } from "@/lib/settings/LanguageController";
import { translations } from "@/lib/translations/translations";
import { Ionicons } from "@expo/vector-icons";

console.log("🔍 Czy aplikacja jest w trybie produkcyjnym?", Updates.isEnabled);
console.log(
  "🔍 Czy mamy dostępną aktualizację?",
  Updates.checkForUpdateAsync()
);

export default function GameMenu({ onReset }) {
  const [jezyk, setJezyk] = useState<"pl" | "en">("pl");
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchLanguage = async () => {
      const lang = await getCurrentLanguage();
      setJezyk(lang);
    };
    fetchLanguage();
  }, []);

  const handleResetGame = async () => {
    Alert.alert(
      translations[jezyk].menuResetTitle,
      translations[jezyk].menuResetMessage,
      [
        { text: translations[jezyk].menuResetCancel, style: "cancel" },
        {
          text: translations[jezyk].menuResetConfirm,
          onPress: async () => {
            console.log("🔍 Pobieram wszystkie klucze...");

            const allKeys = await Storage.getAllKeys();
            console.log("📌 Klucze do usunięcia:", allKeys);

            // Usuwanie wszystkich kluczy pojedynczo
            for (const key of allKeys) {
              console.log(`🗑 Usuwam: ${key}`);
              await Storage.removeItem({ key });
            }

            // Sprawdzenie, czy storage jest pusty
            const allKeysAfter = await Storage.getAllKeys();
            console.log("✅ Klucze po usunięciu:", allKeysAfter);

            console.log("🔄 Restartuję aplikację...");
            setTimeout(async () => {
              try {
                await Updates.reloadAsync();
              } catch (e) {
                console.error("❌ Błąd restartu:", e);
              }
            }, 500);
          },
        },
      ]
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setSettingsVisible(true)}
      >
        <Text style={styles.menuText}>
          {translations[jezyk].menuButtonText}
        </Text>
      </TouchableOpacity>

      <Modal visible={settingsVisible} animationType="fade" transparent={false}>
        <View style={styles.fullscreenContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSettingsVisible(false)}
          >
            <Text style={styles.backText}>{"< POWRÓT"}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>USTAWIENIA</Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.option} onPress={handleResetGame}>
              <Text style={styles.optionText}>RESETOWANIE GRY</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.optionText}>POLITYKA PRYWATNOŚCI</Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Tutaj znajdzie się treść polityki prywatności.
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButton}>Zamknij</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuButton: {
    position: "absolute",
    top: 20,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  menuText: {
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: 31,
    marginRight: 5,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: "#081c0d",
    alignItems: "center",
    paddingVertical: 20,
    justifyContent: "flex-start",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
  },
  backText: {
    color: "#41ff91",
    fontSize: 24,
    fontFamily: "VT323Regular",
  },
  title: {
    fontSize: 32,
    fontFamily: "VT323Regular",
    color: "#41ff91",
    marginBottom: 20,
    marginTop: 50,
  },
  optionsContainer: {
    alignItems: "center",
  },
  option: {
    paddingVertical: 5,
    marginVertical: 10,
  },
  optionText: {
    fontSize: 24,
    fontFamily: "VT323Regular",
    color: "#41ff91",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#0d2b14",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    color: "#41ff91",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 18,
    color: "#41ff91",
    fontFamily: "VT323Regular",
  },
});
