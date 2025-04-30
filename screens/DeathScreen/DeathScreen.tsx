import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useDeathScreenViewModel } from "@/viewmodels/useDeathScreenViewModel";
import GlowSkia from "@/components/ui/GlowBackground"; // <- dodany import

const { width, height } = Dimensions.get("window");

interface DeathScreenProps {
  title: string;
  image: any;
  onRetry: () => void;
}

const DeathScreen: React.FC<DeathScreenProps> = ({ title, image, onRetry }) => {
  const { title: resolvedTitle, handleRetry } = useDeathScreenViewModel({
    title,
    onRetry,
  });

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={handleRetry}
        activeOpacity={1}
        testID="death-screen-touchable"
      >
        <ImageBackground
          source={image}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          {/* Przyciemnienie */}
          <View style={styles.overlay} />

          {/* Tytuł */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{resolvedTitle}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    zIndex: 9999,
    backgroundColor: "black",
  },
  touchable: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  titleContainer: {
    position: "absolute",
    top: height * 0.15,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "#219653",
    textAlign: "center",
    fontFamily: "VT323Regular",
  },
});

export default DeathScreen;
