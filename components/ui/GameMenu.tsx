import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Updates from 'expo-updates';
import Storage from 'expo-storage';
import { getCurrentLanguage } from '@/lib/settings/LanguageController';
import { translations } from '@/lib/translations/translations';
import { useEffect, useState } from 'react';

type MenuProps = {
    onReset?: () => void;
};

export default function GameMenu({ onReset }: MenuProps) {
    const [jezyk, setJezyk] = useState<'pl' | 'en'>('pl');

    useEffect(() => {
        const fetchLanguage = async () => {
            const lang = await getCurrentLanguage();
            setJezyk(lang);
        };
        fetchLanguage();
    }, []);

    const handleResetGame = async () => {
        Alert.alert(
            translations[jezyk].menuResetTitle,
            translations[jezyk].menuResetMessage,
            [
                { text: translations[jezyk].menuResetCancel, style: 'cancel' },
                {
                    text: translations[jezyk].menuResetConfirm,
                    onPress: async () => {
                        const allKeys = await Storage.getAllKeys();
                        for (const key of allKeys) {
                            await Storage.removeItem({ key });
                        }

                        onReset?.();

                        try {
                            await Updates.reloadAsync();
                        } catch (e) {
                            console.error(translations[jezyk].menuResetError, e);
                        }
                    },
                },
            ]
        );
    };

    return (
        <TouchableOpacity style={styles.menuButton} onPress={handleResetGame}>
            <Text style={styles.menuText}>{translations[jezyk].menuButtonText} </Text>
            <Ionicons name="menu" size={24} color="#219653" />
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
        backgroundColor: 'transparent',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    menuText: {
        color: '#219653',
        fontFamily: 'VT323Regular',
        fontSize: 18,
        marginRight: 5,
    },
});
