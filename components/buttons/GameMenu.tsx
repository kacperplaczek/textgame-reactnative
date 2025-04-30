import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { translations } from "@/i18n/translations";
import { useGameMenuViewModel } from "@/viewmodels/useGameMenuViewModel";

export default function GameMenu({}) {
  const {
    jezyk,
    settingsVisible,
    setSettingsVisible,
    modalVisible,
    setModalVisible,
    soundEnabled,
    notificationsEnabled,
    canPlayMusic,
    toggleMusic,
    toggleNotifications,
    handleResetGame,
    toggleSound,
  } = useGameMenuViewModel();

  return (
    <View testID="game-menu">
      {/* Przycisk menu */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setSettingsVisible(true)}
      >
        <Text style={styles.menuText}>
          {translations[jezyk].menuButtonText}
        </Text>
      </TouchableOpacity>

      {/* MODAL USTAWIEŃ */}
      <Modal visible={settingsVisible} animationType="fade" transparent={false}>
        <ImageBackground
          source={require("@/assets/images/settings.png")}
          style={styles.fullscreenBackground}
        >
          <View style={styles.fullscreenContainer}>
            <View style={styles.settingsContainer}>
              {/* Przycisk zamykania "X" */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSettingsVisible(false)}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>

              <Text style={styles.menuTitle}>MENU</Text>

              {/* Sekcja przełączników */}
              <View style={styles.upperSection}>
                {/* Przełącznik muzyki */}
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={toggleSound}
                >
                  <Text style={styles.optionLabel}>
                    {translations[jezyk].music_sounds}
                  </Text>
                  <Text style={styles.optionDots}>....................</Text>
                  <Text style={styles.optionValue}>
                    {soundEnabled
                      ? translations[jezyk].musicOn
                      : translations[jezyk].musicOff}
                  </Text>
                </TouchableOpacity>

                {/* Przełącznik muzyki */}
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={toggleMusic}
                >
                  <Text style={styles.optionLabel}>
                    {translations[jezyk].music}
                  </Text>
                  <Text style={styles.optionDots}>....................</Text>
                  <Text style={styles.optionValue}>
                    {canPlayMusic
                      ? translations[jezyk].musicOn
                      : translations[jezyk].musicOff}
                  </Text>
                </TouchableOpacity>

                {/* Przycisk polityki prywatności */}
                <TouchableOpacity
                  style={styles.privacyButton}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.privacyButtonText}>
                    {translations[jezyk].privacyPolicy}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Przycisk resetowania gry */}
              <View style={styles.bottomSection}>
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleResetGame}
                >
                  <Text style={styles.resetButtonText}>
                    {translations[jezyk].resetGame}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Modal>

      {/* MODAL POLITYKI PRYWATNOŚCI */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {translations[jezyk].privacyPolicy}
            </Text>
            <Text style={styles.policyText}>
              {translations[jezyk].privacyText}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>
                {translations[jezyk].close}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    zIndex: 100,
    top: 40,
    right: 20,
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {
    color: "#41ff91",
    fontSize: 25,
    fontFamily: "VT323Regular",
  },
  fullscreenBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  settingsContainer: {
    width: "85%",
    height: "90%",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderRadius: 20,
    borderColor: "#41ff91",
    borderWidth: 2,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuTitle: {
    fontSize: 24,
    color: "#41ff91",
    fontFamily: "VT323Regular",
    marginBottom: 20,
    textAlign: "center",
  },
  upperSection: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
  },
  bottomSection: {
    width: "100%",
    marginTop: "auto",
  },
  resetButton: {
    backgroundColor: "#41ff91",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#219653",
  },
  resetButtonText: {
    color: "black",
    fontSize: 18,
    fontFamily: "VT323Regular",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 8,
    borderBottomColor: "#41ff91",
    borderBottomWidth: 1,
  },
  optionLabel: {
    fontSize: 20,
    color: "#41ff91",
    fontFamily: "VT323Regular",
  },
  optionValue: {
    fontSize: 20,
    color: "#41ff91",
    fontFamily: "VT323Regular",
    textTransform: "uppercase",
  },
  privacyButton: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#41ff91",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  privacyButtonText: {
    color: "#41ff91",
    fontSize: 18,
    fontFamily: "VT323Regular",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  closeButtonText: {
    textAlign: "center",
    color: "#41ff91",
    fontSize: 25,
    fontFamily: "VT323Regular",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)", // Przyciemnione tło
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    color: "#41ff91",
    fontFamily: "VT323Regular",
    marginBottom: 10,
    textAlign: "center",
  },
  policyText: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "VT323Regular",
    textAlign: "justify",
    lineHeight: 22,
    marginBottom: 20,
  },
});
