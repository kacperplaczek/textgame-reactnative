// @/app/game/_components/screens/SpecialSceneOverlay.tsx
import React from "react";
import { View, Text, Modal, ImageBackground } from "react-native";

export default function SpecialSceneOverlay({
  visible,
  title,
  subtitle,
  background,
}: {
  visible: boolean;
  title: string;
  subtitle?: string;
  background?: any;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" testID="">
      <ImageBackground
        source={background || require("@/assets/images/INTRO.png")}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 28, marginBottom: 10 }}>
            {title}
          </Text>
          {subtitle && (
            <Text style={{ color: "white", fontSize: 20 }}>{subtitle}</Text>
          )}
        </View>
      </ImageBackground>
    </Modal>
  );
}
