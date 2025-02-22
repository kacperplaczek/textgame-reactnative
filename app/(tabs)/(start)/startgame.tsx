import { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Dimensions, ImageBackground } from 'react-native';
import {Href, useRouter} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Storage from 'expo-storage';
import { translations, Language } from '@/lib/translations/translations';
import { DialogueController } from '@/lib/dialogue/DialogueController';
import { npcData, NpcKey } from '@/lib/dialogue/NPCData';
import { getCurrentLanguage } from '@/lib/settings/LanguageController';
import { getScenes } from '@/scenario/scenariuszAkt1';
import { calculateRemainingTime } from '@/lib/dialogue/SceneUtils';
import { scheduleNotification } from '@/lib/notifications/NotificationUtils';
import { deathScreensMap } from '@/lib/screens/DeathScreens';
import GameMenu from '@/components/ui/GameMenu';
import {endActScreensMap} from "@/lib/screens/EndActScreens";
import { Audio } from 'expo-av';
import { soundsMap } from "@/lib/settings/soundMap";
import { useFocusEffect } from '@react-navigation/native';

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
    const [dead, setDead] = useState(false);
    const [deadScreen, setDeadScreen] = useState<string | null>(null);
    const [endAct, setEndAct] = useState(false);
    const [endActScreen, setEndActScreen] = useState<string | null>(null);
    const [actFinished, setActFinished] = useState<{ actKey: string; nextAct: string } | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const activeSound = useRef<Audio.Sound | null >(null);
    const router = useRouter();
    const scrollRef = useRef<ScrollView>(null);
    const [refreshKey, setRefreshKey] = useState(0);



    useEffect(() => {
        console.log("🔄 Sprawdzanie stanu gry...");
    }, [refreshKey])

    useEffect(() => {
        const getPermissions = async () => {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Brak uprawnień do audio!');
            }
        };
    
        getPermissions();
    }, []);

    const stopAllSounds = async () => {
        try {
            await Audio.setIsEnabledAsync(false);  // Wyłącza wszystkie dźwięki
            await Audio.setIsEnabledAsync(true);   // Włącza dźwięki ponownie
        } catch (e) {
            console.error("Błąd zatrzymywania dźwięków:", e);
        }
    };

    const saveDialogue = async (dialogue: typeof dialogue) => {
        try {
            const aktKey = 'akt1';
            await Storage.setItem({ key: `dialogue_${aktKey}`, value: JSON.stringify(dialogue) });
        } catch (error) {
            console.error('Błąd zapisu historii dialogów:', error);
        }
    };

    const playSound = async (soundKey: string, loop: boolean) => {
        try {
            await stopSound(); // ⬅️ ZAWSZE NA POCZĄTKU
    
            const { sound: newSound } = await Audio.Sound.createAsync(
                soundsMap[soundKey],
                { isLooping: loop, volume: 0.5 }
            );
    
            activeSound.current = newSound;
            await newSound.playAsync();
        } catch (e) {
            console.error(`Błąd podczas odtwarzania dźwięku ${soundKey}:`, e);
        }
    };
    
    const stopSound = async () => {
        try {
            if (activeSound.current) {
                await activeSound.current.stopAsync();
                await activeSound.current.unloadAsync();
                activeSound.current = null;
            }
        } catch (e) {
            console.error('Błąd podczas zatrzymania dźwięku:', e);
        }
    };
    
    const checkGameStarted = useCallback(async () => {
        setIsLoading(true);
    
        const started = await Storage.getItem({ key: 'gameStarted' });
        const storedScene = await DialogueController.getScene();
    
        console.log("📌 gameStarted:", started);
        console.log("📌 storedScene:", storedScene);
    
        if (started === 'true') {
            setHasStartedGame(true);
        } else {
            setHasStartedGame(false);
        }
    
        if (storedScene) {
            setCurrentScene(storedScene);
            handleSceneChange(storedScene);
        } else {
            console.log("🔄 Ustawiam domyślną scenę: dzwoni_officer");
            setCurrentScene('dzwoni_officer');
            handleSceneChange('dzwoni_officer');
        }
    
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
        setDialogue((prev) => {
            const updatedDialogue = [...prev, { autor, tekst, npcKey }];
            saveDialogue(updatedDialogue);
            return updatedDialogue;
        });
    };

    const handleDeathScreenPress = async () => {
        const lastCheckpoint = await DialogueController.getLastCheckpoint();
        if (lastCheckpoint) {
            await DialogueController.clearAfterCheckpoint(lastCheckpoint);
            await DialogueController.clearDeathScreen();
            await stopSound();

            setDead(false);
            setDeadScreen(null);
            setDialogue([]);
            setOptions([]);
            setCurrentScene(lastCheckpoint);
        }
    };

    const processScene = async (sceneName: string) => {
        const scenes = getScenes(translations[jezyk], plec);
        const scene = scenes[sceneName];
    
        if (!scene) return;
    
        await stopSound(); // <-- zatrzymaj muzykę zawsze przed odpaleniem nowej
    
        if (scene.sound) {
            await playSound(scene.sound, scene.soundPlayLoop ?? false);
        }
    
        const tekst = typeof scene.tekst === 'function' ? scene.tekst() : scene.tekst;
        if (dialogue.length === 0 || dialogue[dialogue.length - 1].tekst !== tekst) {
            addMessage('NPC', tekst, scene.npcKey);
        }
    
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
            setTimeout(() => {
                handleSceneChange(scene.autoNextScene!);
            }, scene.autoNextDelay);
        }
    };

    const handleSceneChange = async (sceneName: string) => {
        const scenes = getScenes(translations[jezyk], plec);
        const scene = scenes[sceneName];
    
        if (sceneName === currentScene) return; 
        if (!scene) return;
    
        console.log(`Zmiana sceny: ${sceneName}`);
        console.log('Muzyka do odpalenia:', scene.sound);
    
        // 🛑 Stopujemy zawsze NAJPIERW
        await stopSound();
    
        // Aktualizacja sceny
        setCurrentScene(sceneName);
        await DialogueController.setScene(sceneName);
    
        // 🎵 Odtwarzamy nową muzykę, jeżeli jest
        if (scene.sound) {
            await playSound(scene.sound, scene.soundPlayLoop ?? false);
        }
    
        // Komunikat NPC
        if (!scene.waitTime) {
            const tekst = typeof scene.tekst === 'function' ? scene.tekst() : scene.tekst;
            addMessage('NPC', tekst, scene.npcKey);
        }
    
        // Opcje wyboru
        if (scene.options) {
            setOptions(
                scene.options.map((option) => ({
                    tekst: option.tekst,
                    akcja: () => {
                        addMessage('GRACZ', option.tekst);
                        handleSceneChange(option.next);
                    },
                }))
            );
        } else {
            setOptions([]);
        }
    
        // Czekanie
        if (scene.waitTime) {
            setOptions([]);
            const endTime = Math.floor(Date.now() / 1000) + scene.waitTime;
            setWaiting({ sceneName: scene.autoNextScene ?? sceneName, endTime });
    
            await Storage.setItem({ key: 'waitingEndTime', value: endTime.toString() });
            await Storage.setItem({ key: 'waitingScene', value: scene.autoNextScene ?? sceneName });
    
            return;
        }
    
        // Auto-przejście
        if (scene.autoNextScene && scene.autoNextDelay) {
            setTimeout(() => {
                handleSceneChange(scene.autoNextScene!);
            }, scene.autoNextDelay);
        }
    
        if (scene.checkpoint) {
            await DialogueController.setCheckpoint(sceneName);
        }
    
        if (scene.deathScreen) {
            await DialogueController.setDeathScreen(scene.deathScreen);
            setDeadScreen(scene.deathScreen);
            setDead(true);
        }
    
        if (scene.endAct) {
            setEndAct(true);
            setEndActScreen(scene.endAct);
            setActFinished({ actKey: sceneName, nextAct: scene.nextAct || 'startgame' });
        }
    };
    
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

    if (dead && deadScreen) {
        const DeathScreenComponent = deathScreensMap[deadScreen];
        if (!DeathScreenComponent) return <Text>Błąd: Nie znaleziono ekranu śmierci!</Text>;
        return <DeathScreenComponent onRetry={handleDeathScreenPress} />;
    }

    if (endAct && endActScreen && actFinished) {
        const EndActScreenComponent = endActScreensMap[endActScreen];
        if (!EndActScreenComponent) return <Text>Błąd: Nie znaleziono ekranu końca aktu!</Text>;

        return (
            <EndActScreenComponent
                onContinue={async () => {
                    await stopSound();
                    await Storage.setItem({ key: 'currentAct', value: actFinished.nextAct });
                    router.replace(`/${actFinished.nextAct}` as Href<string>);
                }}
            />
        );
    }

    return (
        <ImageBackground source={require('../../../assets/images/bg_komputer.png')} style={styles.background} resizeMode="cover">
            <StatusBar hidden />
            <GameMenu />

            <View style={styles.contentContainer}>
                <View style={styles.dialogueContainer}>
                    <ScrollView ref={scrollRef}>
                        {dialogue.map((msg, index) => (
                            <View key={index} style={[styles.messageBlock, msg.autor === 'GRACZ' && styles.playerMessageBlock]}>
                                {msg.autor === 'NPC' && msg.npcKey && npcData[msg.npcKey] && (
                                    <View style={styles.messageHeader}>
                                        <Image source={npcData[msg.npcKey].avatar} style={styles.avatar} />
                                        <Text style={styles.messageTitle}>
                                            {translations[jezyk][npcData[msg.npcKey].nameKey as keyof typeof translations[jezyk]]}
                                        </Text>
                                    </View>
                                )}
                                <Text style={[styles.messageText, msg.autor === 'GRACZ' && styles.playerMessageText]}>
                                    {msg.tekst}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                    {waiting && remainingTime !== null && (
                        <Text style={styles.waitingText}>
                            Oczekiwanie: {Math.floor(remainingTime / 60)}m {remainingTime % 60}s
                        </Text>
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

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    background: { flex: 1, width: '100%', height: '100%' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' },

    // Pojemnik na cały kontent pod menu
    contentContainer: { flex: 1, justifyContent: 'space-between', paddingTop: 50 },

    // Kontener na dialogi
    dialogueContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderColor: '#219653',
        borderWidth: 2,
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 10,
    },

    // Wiadomości NPC / GRACZ
    messageBlock: { marginBottom: 12 },

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

    messageHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    avatar: { width: 28, height: 28, borderRadius: 4, marginRight: 8 },

    messageTitle: {
        color: '#219653',
        fontFamily: 'VT323Regular',
        fontSize: 18,
    },

    messageText: {
        color: '#219653',
        fontFamily: 'VT323Regular',
        fontSize: 16,
    },

    // Oczekiwanie na czas
    waitingText: {
        marginTop: 10,
        textAlign: 'center',
        color: '#219653',
        fontFamily: 'VT323Regular',
        fontSize: 18,
    },

    // Opcje odpowiedzi
    optionsContainer: {
        paddingHorizontal: 10,
        marginBottom: 10,
    },

    choiceButton: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: 'black',
        borderColor: '#219653',
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
    },

    choiceButtonText: {
        color: '#219653',
        fontFamily: 'VT323Regular',
        fontSize: 18,
    },

    // Przycisk MENU – nad wszystkim!
    menuContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
    },
});