import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useOptions } from "@/services/useOptions";
import { playClickSound } from "@/services/soundController";

type GameOptions = {
  tekst: string;
  akcja: () => void;
};

const OptionsBox = ({ options }: { options: GameOptions[] }) => {
  return (
    <View testID="options-box" style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={async () => {
            await playClickSound();
            option.akcja();
          }}
          style={styles.option}
        >
          <Text style={styles.text}>{option.tekst}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OptionsBox;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    borderColor: "#219653",
  },
  option: {
    backgroundColor: "black",
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#219653",
  },
  text: {
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: 22,
    textAlign: "center",
  },
});
