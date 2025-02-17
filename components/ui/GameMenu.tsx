import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Storage from 'expo-storage';
import { Ionicons } from '@expo/vector-icons';

type MenuProps = {
    onReset?: () => void;
};

export default function GameMenu({ onReset }: MenuProps) {
    const router = useRouter();

    const handleResetGame = async () => {
        Alert.alert(
            'Reset gry',
            'Na pewno chcesz zresetować grę i zacząć od nowa?',
            [
                { text: 'Anuluj', style: 'cancel' },
                {
                    text: 'Tak, resetuj',
                    onPress: async () => {
                        await Storage.clear(); // Czyści całą pamięć
                        onReset?.(); // Opcjonalnie wywołaj przekazaną funkcję
                        router.replace('/startgame?refresh=1'); // Restart widoku
                    },
                },
            ]
        );
    };

    return (
        <TouchableOpacity style={styles.menuButton} onPress={handleResetGame}>
            <Text style={styles.menuText}>MENU </Text>
            <Ionicons name="menu" size={24} color="limegreen" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menuButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'limegreen',
    },
    menuText: {
        color: 'limegreen',
        fontFamily: 'VT323Regular',
        fontSize: 18,
        marginRight: 5,
    },
});
