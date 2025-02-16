import { View, Text, TouchableOpacity } from 'react-native';
import Storage from 'expo-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function PrologScreen() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const handleStartGame = async () => {
        setIsSaving(true);
        await Storage.setItem({ key: 'gameStarted', value: 'true' });

        // Tutaj kluczowa zmiana - dodajemy refresh=1
        router.replace('/startgame?refresh=1');
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', paddingHorizontal: 20 }}>
            <Text style={{ color: 'limegreen', fontSize: 18 }}>
                Witaj w grze "No Return". Historia... bla bla...
            </Text>
            <TouchableOpacity onPress={handleStartGame} disabled={isSaving}>
                <Text style={{ color: 'limegreen', marginTop: 20 }}>
                    {isSaving ? 'Zapisywanie...' : 'Rozumiem, zaczynajmy!'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
