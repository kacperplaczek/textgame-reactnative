import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type ActEndScreenProps = {
    onContinue: () => void;
};

export default function ActEndScreen({ onContinue }: ActEndScreenProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Akt Zakończony!</Text>
            <TouchableOpacity onPress={onContinue} style={styles.button}>
                <Text style={styles.buttonText}>Przejdź do kolejnego aktu</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' },
    title: { fontSize: 32, color: 'limegreen', marginBottom: 20 },
    button: { backgroundColor: 'limegreen', padding: 12, borderRadius: 8 },
    buttonText: { color: 'black', fontSize: 18 },
});
