import { usePrologScreenViewModel } from "@/viewmodels/usePrologScreenViewModel";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { translations } from "@/i18n/translations";

const { width, height } = Dimensions.get("window");

export default function PrologScreen() {
  const {
    currentScreen,
    isSaving,
    displayedText,
    language,
    handleScreenChange,
  } = usePrologScreenViewModel();

  return (
    <ImageBackground
      source={
        currentScreen === "intro"
          ? require("@/assets/images/bg_intro.png")
          : require("@/assets/images/bg_prolog.png")
      }
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar hidden />
      <View style={styles.fullscreenTouchable}>
        <View style={styles.overlay} />

        {/* Tytuł */}
        <Text style={styles.title}>
          {currentScreen === "intro"
            ? translations[language].introTitle
            : translations[language].prologTitle}
        </Text>

        {/* Scrollowany tekst */}
        <ScrollView style={styles.textContainer} showsVerticalScrollIndicator>
          <Text style={styles.text}>{displayedText}</Text>
        </ScrollView>

        {isSaving && (
          <ActivityIndicator color="#219653" style={{ marginTop: 20 }} />
        )}

        {!isSaving && (
          <View style={styles.bottomWrapper}>
            <TouchableOpacity
              onPress={handleScreenChange}
              style={styles.tapArea}
            >
              <Text style={styles.tapText}>
                {translations[language].clickToContinue}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

// stylizacja (bez zmian)
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  fullscreenTouchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  title: {
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: 28,
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
    maxHeight: height * 0.6,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  text: {
    color: "#219653",
    fontFamily: "VT323Regular",
    textAlign: "left",
    fontSize: 24,
    paddingBottom: 0,
  },
  bottomWrapper: {
    position: "absolute",
    bottom: height * 0.05,
    width: "100%",
    alignItems: "center",
  },
  tapArea: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  tapText: {
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: 24,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
