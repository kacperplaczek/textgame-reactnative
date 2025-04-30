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
          <View style={styles.overlay}>
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "VT323Regular",
  },
});

export default DeathScreen;
