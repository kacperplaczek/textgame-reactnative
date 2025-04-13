import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import GlowSkia from "@/components/ui/GlowBackground";

type DeathScreenProps = {
  title: string;
  image: any; // require() obrazka
  onRetry: () => void;
};

export default function DeathScreen({
  title,
  image,
  onRetry,
}: DeathScreenProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onRetry}>
      <ImageBackground
        source={image}
        style={styles.background}
        resizeMode="cover"
      >
        <GlowSkia />
        <View style={styles.overlay} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.tapText}>Dotknij, aby wrócić do checkpointu</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#219653",
    fontSize: 42,
    fontFamily: "VT323Regular",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tapText: {
    color: "#219653",
    fontSize: 18,
    fontFamily: "VT323Regular",
    textShadowColor: "rgba(0,0,0,1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
