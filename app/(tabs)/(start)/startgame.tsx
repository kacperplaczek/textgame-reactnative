import { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Dimensions, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Storage from 'expo-storage';

import { substituteGenderSuffixes } from '@/lib/dialogue/GenderSuffix';
import { translations, Language } from '@/lib/translations/translations';
import { DialogueController } from '@/lib/dialogue/DialogueController';
import { npcData, NpcKey } from '@/lib/dialogue/NPCData';
import { getCurrentLanguage } from '@/lib/settings/LanguageController';
import { getScenes, SceneType } from '@/lib/dialogue/scenesWithDeath';
import { calculateRemainingTime } from '@/lib/dialogue/SceneUtils';
import { scheduleNotification } from "@/lib/notifications/NotificationUtils";
import GameMenu from '@/components/ui/GameMenu';

const { width, height } = Dimensions.get('window');

export default function StartGameScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasStartedGame, setHasStartedGame] = useState<boolean | null>(null);
    const [plec, setPlec] = useState<'pan' | 'pani' | null>(null);
    const [jezyk, setJezyk] = useState<Language>('pl');
    const [dialogue, setDialogue] = useState<{ autor: 'NPC' | 'GRACZ'; tekst: string; npcKey?: NpcKey }[]>([]);
    const [options, setOptions] = useState<{ tekst: string; akcja: () => void }[]>([]);
    const [currentScene, setCurrentScene] = useState<string | null>(null);
    const [waiting, setWaiting] = useState<{ sceneName: string; endTime: number } | null>(null);
    const [remainingTime, setRemainingTime] = useState<number | null>(null);

    const router = useRouter();
    const scrollRef = useRef<ScrollView>(null);

    const checkGameStarted = useCallback(async () => {
        setIsLoading(true);
        const started = await Storage.getItem({ key: 'gameStarted' });
        const gender = await Storage.getItem({ key: 'plec' });
        const storedScene = await DialogueController.getScene();

        if (started === 'true') {
            setHasStartedGame(true);
        } else {
            setHasStartedGame(false);
        }

        if (gender === 'pan' || gender === 'pani') {
            setPlec(gender);
        }

        setCurrentScene(storedScene || 'dzwoni_officer');

        const lang = await getCurrentLanguage();
        setJezyk(lang);

        setIsLoading(false);
    }, []);

    useEffect(() => {
        checkGameStarted();
    }, []);

    useEffect(() => {
        if (hasStartedGame === false) {
            router.replace('/prolog');
        }
    }, [hasStartedGame]);

    useEffect(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
    }, [dialogue]);

    const addMessage = (autor: 'NPC' | 'GRACZ', tekst: string, npcKey?: NpcKey) => {
        setDialogue((prev) => [...prev, { autor, tekst, npcKey }]);
    };

    const renderText = (text: string) => {
        if (jezyk === 'pl') {
            return substituteGenderSuffixes(text, plec);
        }
        return text;
    };

    const handleSceneChange = async (sceneName: string) => {
        const scenes = getScenes(translations[jezyk]);
        const scene = scenes[sceneName];

        if (scene.waitTime) {
            const endTime = Math.floor(Date.now() / 1000) + scene.waitTime;
            setWaiting({ sceneName, endTime });

            if (scene.enableNotification) {
                await scheduleNotification(
                    'Czas oczekiwania zakończony',
                    'Możesz kontynuować dialog.',
                    scene.waitTime
                );
            }
        } else {
            setCurrentScene(sceneName);
            await DialogueController.setScene(sceneName);
        }

        if (scene.checkpoint) {
            await DialogueController.setCheckpoint(sceneName);
        }
    };

    useEffect(() => {
        if (!currentScene || waiting) return;
        const scenes = getScenes(translations[jezyk]);
        const scene = scenes[currentScene];

        if (!scene) return;

        addMessage('NPC', scene.tekst, scene.npcKey);

        if (scene.options) {
            setOptions(
                scene.options.map((option) => ({
                    tekst: option.tekst,
                    akcja: () => handleSceneChange(option.next),
                }))
            );
        } else {
            setOptions([]);
        }

        if (scene.autoNextScene && scene.autoNextDelay) {
            const timeout = setTimeout(() => {
                handleSceneChange(scene.autoNextScene!);
            }, scene.autoNextDelay);

            return () => clearTimeout(timeout);
        }
    }, [currentScene, jezyk, waiting]);


    useEffect(() => {
        if (waiting) {
            const interval = setInterval(() => {
                const remaining = calculateRemainingTime(waiting.endTime);
                setRemainingTime(remaining);

                if (remaining <= 0) {
                    clearInterval(interval);
                    setWaiting(null);
                    handleSceneChange(waiting.sceneName);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [waiting]);

    if (isLoading) {
        return <View style={styles.loadingContainer}><ActivityIndicator color="limegreen" /></View>;
    }

    return (
        <ImageBackground source={require('../../../assets/images/bg_komputer.png')} style={styles.background} resizeMode="cover">
            <StatusBar hidden />
            <GameMenu onReset={() => setDialogue([])} />

            <View style={styles.contentContainer}>
                <View style={styles.dialogueContainer}>
                    <ScrollView ref={scrollRef}>
                        {dialogue.map((msg, index) => (
                            <View key={index} style={styles.messageBlock}>
                                {msg.autor === 'NPC' && msg.npcKey && npcData[msg.npcKey] && (
                                    <View style={styles.messageHeader}>
                                        <Image source={npcData[msg.npcKey].avatar} style={styles.avatar} />
                                        <Text style={styles.messageTitle}>{translations[jezyk][npcData[msg.npcKey].nameKey]}</Text>
                                    </View>
                                )}
                                <Text style={styles.messageText}>{renderText(msg.tekst)}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    {waiting && remainingTime !== null && (
                        <Text style={styles.waitingText}>Oczekiwanie: {Math.floor(remainingTime / 60)}m {remainingTime % 60}s</Text>
                    )}
                </View>

                <View style={styles.optionsContainer}>
                    {options.map((option, index) => (
                        <TouchableOpacity key={index} onPress={option.akcja} style={styles.choiceButton}>
                            <Text style={styles.choiceButtonText}>{option.tekst}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, width: '100%', height: '100%' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' },

    contentContainer: { flex: 1, justifyContent: 'space-between', paddingTop: 50 },

    dialogueContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderColor: 'limegreen',
        borderWidth: 2,
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 10,
    },

    messageBlock: {
        marginBottom: 12,
    },

    playerMessageBlock: {
        backgroundColor: '#219653',
        padding: 8,
        borderRadius: 10,
    },

    playerMessageText: {
        color: 'white',
        fontFamily: 'VT323Regular',
        fontSize: 16,
    },

    messageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },

    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: 8,
    },

    messageTitle: {
        color: 'limegreen',
        fontFamily: 'VT323Regular',
        fontSize: 18,
    },

    messageText: {
        color: 'white',
        fontFamily: 'VT323Regular',
        fontSize: 16,
    },

    optionsContainer: {
        paddingHorizontal: 10,
        marginBottom: 10,
    },

    choiceButton: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: 'black',
        borderColor: 'limegreen',
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
    },

    choiceButtonText: {
        color: 'limegreen',
        fontFamily: 'VT323Regular',
        fontSize: 18,
    },

    waitingText: {
        marginTop: 10,
        textAlign: 'center',
        color: 'limegreen',
        fontFamily: 'VT323Regular',
        fontSize: 18,
    },

    menuButtonContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
    },
});
