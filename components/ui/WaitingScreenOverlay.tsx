import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function WaitingScreenOverlay({
  visible,
  timeLeft,
}: {
  visible: boolean;
  timeLeft: number;
}) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <Text style={styles.title}>⌛ Oczekiwanie...</Text>
      <Text style={styles.subtitle}>Przygotowania w toku...</Text>
      <ActivityIndicator size="large" color="limegreen" />
      <Text style={styles.timeText}>
        Pozostały czas: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  title: { color: "white", fontSize: 24, fontWeight: "bold" },
  subtitle: { color: "gray", fontSize: 18, marginVertical: 10 },
  timeText: { color: "limegreen", fontSize: 16, marginTop: 10 },
});
