import useChoiceSound from "@/lib/dialogue/useChoiceSounds";
import { TouchableOpacity, Text } from "react-native";

export default function ChoiceButton() {
  return (
    <TouchableOpacity onPress={useChoiceSound}>
      <Text>Kliknij</Text>
    </TouchableOpacity>
  );
}
