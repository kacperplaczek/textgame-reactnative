import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { translations } from "@/i18n/translations";
import { useHomeScreenViewModel } from "@/viewmodels/useHomeScreenViewModel";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext"; // <<< używamy LanguageContext!

export default function HomeScreen() {
  const { handleStartPress } = useHomeScreenViewModel();
  const { language } = useLanguage(); // <<< to jest aktualny język

  if (!language || !translations[language]) {
    return null; // Poczekaj aż język się załaduje
  }

  const useBlinkingStyle = (delay = 0) => {
    const opacity = useSharedValue(1);

    useEffect(() => {
      opacity.value = withDelay(
        delay,
        withRepeat(withTiming(0, { duration: 500 }), -1, true)
      );
    }, []);

    return useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));
  };

  const BlinkingLight = ({
    top,
    left,
    delay,
  }: {
    top: number;
    left: number;
    delay: number;
  }) => {
    const style = useBlinkingStyle(delay);

    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            top,
            left,
            width: 10,
            height: 10,
            backgroundColor: "#00ff00",
            borderRadius: 2,
          },
          style,
        ]}
      />
    );
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.fullscreenTouchable}
        onPress={handleStartPress}
        activeOpacity={0.9}
      >
        <ImageBackground
          source={require("@/assets/images/bg-starter-screen.gif")}
          style={styles.background}
          resizeMode="contain"
        >
          <Text style={styles.title}>
            {translations[language].startScreenTitle}
          </Text>
          <View style={styles.spacer} />
          <Text style={styles.subtitle}>
            {translations[language].startScreenSubtitle}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
      <View style={styles.border} />
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "black",
    position: "relative",
  },
  fullscreenTouchable: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 44,
    color: "#219653",
    fontFamily: "VT323Regular",
    textAlign: "center",
    marginTop: 64,
  },
  subtitle: {
    fontSize: 25,
    color: "#219653",
    fontFamily: "VT323Regular",
    textAlign: "center",
    marginBottom: 48,
  },
  spacer: {
    flex: 1,
  },
  border: {
    position: "absolute",
    top: 15,
    bottom: 15,
    left: 20,
    right: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#219653",
    pointerEvents: "none",
  },
});
