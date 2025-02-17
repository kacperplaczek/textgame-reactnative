import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Updates from 'expo-updates';
import Storage from 'expo-storage';

type MenuProps = {
    onReset?: () => void;
};

export default function GameMenu({ onReset }: MenuProps) {
    const handleResetGame = async () => {
        Alert.alert(
            'Reset gry',
            'Na pewno chcesz zresetować grę i zacząć od nowa?',
            [
                { text: 'Anuluj', style: 'cancel' },
                {
                    text: 'Tak, resetuj',
                    onPress: async () => {
                        // Czyścimy całą pamięć
                        const allKeys = await Storage.getAllKeys();
                        for (const key of allKeys) {
                            await Storage.removeItem({ key });
                        }

                        onReset?.();

                        // Restart aplikacji za pomocą expo-updates
                        try {
                            await Updates.reloadAsync();
                        } catch (e) {
                            console.error('Błąd podczas restartu aplikacji:', e);
                        }
                    },
                },
            ]
        );
    };

    return (
        <TouchableOpacity style={styles.menuButton} onPress={handleResetGame}>
            <Text style={styles.menuText}>AKT 1</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menuButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'limegreen',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderWidth: 3,
        borderColor: 'limegreen',
    },
    menuText: {
        color: 'black',
        fontFamily: 'VT323Regular',
        fontSize: 18,
        marginRight: 5,
    },
});
