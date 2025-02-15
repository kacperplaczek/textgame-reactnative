import {Text, StyleSheet} from "react-native";

export default function StartGameScreen() {
    return (
        <Text style={styles.default}>
            Start Game Screen
        </Text>
    )
}


const styles = StyleSheet.create({
    default: {
        fontSize: 20,
        color: "white",
        position: 'absolute',
        top: 100,
        left: 100,
        marginTop: 25,
        marginLeft: 25,
    }
});