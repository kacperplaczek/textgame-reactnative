import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Href, useRouter } from "expo-router";
import { getCurrentLanguage } from "@/lib/settings/LanguageController";
import { translations } from "@/lib/translations/translations";
import { useEffect, useState } from "react";
import Storage from "expo-storage";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
} from "react-native-reanimated";

export default function HomeScreen() {
  const router = useRouter();
  const [jezyk, setJezyk] = useState<"pl" | "en">("pl");

  useEffect(() => {
    const fetchLanguage = async () => {
      const lang = await getCurrentLanguage();
      setJezyk(lang);
    };
    fetchLanguage();
  }, []);

  const handleStartPress = async () => {
    const gameStarted = await Storage.getItem({ key: "gameStarted" });
    const currentAct = await Storage.getItem({ key: "currentAct" });

    console.log("🔍 Sprawdzanie statusu gry...");
    console.log("📌 gameStarted:", gameStarted);
    console.log("📌 currentAct:", currentAct);

    if (gameStarted !== "true") {
      console.log("🚀 Przenoszę gracza do prologu...");
      router.replace("/prolog");
    } else if (currentAct) {
      console.log("🎭 Przenoszę gracza do aktu:", currentAct);
      router.replace(`/${currentAct}` as Href<string>);
    } else {
      console.log("🎮 Brak aktu, startuję od początku...");
      router.replace("/startgame");
    }
  };

  const useBlinkingStyle = (delay = 0) => {
    const opacity = useSharedValue(1);

    useEffect(() => {
      opacity.value = withDelay(
        delay,
        withRepeat(
          withTiming(0, { duration: 500 }),
          -1,
          true // auto-reverse
        )
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
          source={require("../../assets/images/bg-starter-screen.gif")}
          style={styles.background}
          resizeMode="contain"
        >
          <Text style={styles.title}>
            {translations[jezyk].startScreenTitle}
          </Text>
          <View style={styles.spacer} />
          <Text style={styles.subtitle}>
            {translations[jezyk].startScreenSubtitle}
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
