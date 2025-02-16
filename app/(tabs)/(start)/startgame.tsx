import { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import Storage from 'expo-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function StartGameScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasStartedGame, setHasStartedGame] = useState<boolean | null>(null);
    const router = useRouter();
    const { refresh } = useLocalSearchParams(); // Odczytaj query param

    // Funkcja sprawdzająca Storage
    const checkGameStarted = useCallback(async () => {
        setIsLoading(true);
        const started = await Storage.getItem({ key: 'gameStarted' });

        if (started === 'true') {
            setHasStartedGame(true);
        } else {
            setHasStartedGame(false);
        }

        setIsLoading(false);
    }, []);

    // Sprawdzenie na start i po refresh param
    useEffect(() => {
        checkGameStarted();
    }, [refresh]); // Kluczowe - reagujemy na "refresh"

    useEffect(() => {
        if (hasStartedGame === false) {
            router.replace('/prolog');
        }
    }, [hasStartedGame]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                <ActivityIndicator color="limegreen" />
            </View>
        );
    }

    if (hasStartedGame === true) {
        return (
            <View style={{ flex: 1, backgroundColor: 'black', padding: 20 }}>
                <Text style={{ color: 'limegreen', fontSize: 24 }}>Witaj ponownie! Teraz możesz grać.</Text>

                <TouchableOpacity onPress={() => router.push('/startgame?refresh=1')}>
                    <Text style={{ color: 'yellow', marginTop: 20 }}>Odśwież</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={async () => {
                        const allKeys = await Storage.getAllKeys();
                        for (const key of allKeys) {
                            await Storage.removeItem({ key });
                        }
                        router.push('/startgame?refresh=1'); // Po wyczyszczeniu przeładuj
                    }}
                >
                    <Text style={{ color: 'red', marginTop: 20 }}>WYCZYŚĆ PAMIĘĆ</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return null;
}
