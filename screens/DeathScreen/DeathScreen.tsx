import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";

const { width, height } = Dimensions.get("window");

const DeathScreen = ({
  title,
  image,
  onRetry,
}: {
  title: string;
  image: any;
  onRetry: () => void;
}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={onRetry}
        activeOpacity={1}
      >
        <ImageBackground
          source={image}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>{title}</Text>
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
