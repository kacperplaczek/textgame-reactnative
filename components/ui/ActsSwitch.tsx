import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { actsConfig } from '@/lib/settings/actConfig';
import { useEffect, useState } from 'react';
import Storage from 'expo-storage';

export default function ActsSwitch() {
    const [completedActs, setCompletedActs] = useState<string[]>([]);
    const [currentAct, setCurrentAct] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const completed = [];
            for (const act of actsConfig) {
                const isCompleted = await Storage.getItem({ key: act.completedKey });
                if (isCompleted === 'true') {
                    completed.push(act.key);
                }
            }
            const current = await Storage.getItem({ key: 'currentAct' });

            setCompletedActs(completed);
            setCurrentAct(current);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Ładowanie aktów...</Text>
            </View>
        );
    }

    const currentActTitle =
        actsConfig.find((act) => act.key === currentAct)?.title || 'Nieznany akt';

    return (
        <View style={styles.container}>
            <Text style={styles.currentActText}>Aktualny akt: {currentActTitle}</Text>
            {actsConfig.map((act) => {
                const isCompleted = completedActs.includes(act.key);
                const isCurrent = act.key === currentAct;

                if (!isCompleted && !isCurrent) {
                    return null;
                }

                return (
                    <TouchableOpacity
                        key={act.key}
                        style={[styles.button, isCurrent && styles.activeButton]}
                        onPress={() => router.replace(`/${act.key}` as any)}
                    >
                        <Text style={styles.buttonText}>{act.title}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'black',
        padding: 10,
        borderWidth: 2,
        borderColor: 'limegreen',
        borderRadius: 8,
    },
    loadingText: {
        color: 'limegreen',
        fontFamily: 'VT323Regular',
        fontSize: 16,
    },
    currentActText: {
        color: 'limegreen',
        fontFamily: 'VT323Regular',
        fontSize: 16,
        marginBottom: 8,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: 'limegreen',
        borderRadius: 8,
        marginBottom: 4,
    },
    activeButton: {
        backgroundColor: '#219653',
    },
    buttonText: {
        color: 'black',
        fontFamily: 'VT323Regular',
        fontSize: 16,
    },
});
