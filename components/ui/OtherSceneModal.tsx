import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { otherScenesMap } from "@/settings/screens/OtherScenes";

type OtherSceneModalProps = {
  visible: boolean;
  sceneKey: string | null;
  onClose: () => void;
};

const OtherSceneModal: React.FC<OtherSceneModalProps> = ({
  visible,
  sceneKey,
  onClose,
}) => {
  if (!sceneKey) return null;

  const sceneData = otherScenesMap[sceneKey] || {
    title: "Nieznana scena",
    description: "Kliknij, aby kontynuować",
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{sceneData.title}</Text>
          <Text style={styles.description}>{sceneData.description}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("🖱️ Kliknięto przycisk zamknięcia modala!");
              onClose();
            }}
          >
            <Text style={styles.buttonText}>Kliknij, aby kontynuować</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  container: {
    padding: 20,
    backgroundColor: "black",
    borderRadius: 10,
    borderColor: "limegreen",
    borderWidth: 2,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: "limegreen",
    fontFamily: "VT323Regular",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: "white",
    fontFamily: "VT323Regular",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "limegreen",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "black",
    fontFamily: "VT323Regular",
  },
});

export default OtherSceneModal;
