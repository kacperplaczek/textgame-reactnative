import { useEffect, useState, useCallback, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    ImageBackground, Dimensions
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Storage from 'expo-storage';
import { substituteGenderSuffixes } from '@/lib/dialogue/GenderSuffix';
import { translations, Language } from '@/lib/translations/translations';
import { DialogueController } from '@/lib/dialogue/DialogueController';

const { width, height } = Dimensions.get('window');

export default function StartGameScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasStartedGame, setHasStartedGame] = useState<boolean | null>(null);
    const [plec, setPlec] = useState<'pan' | 'pani' | null>(null);
    const [jezyk, setJezyk] = useState<Language>('pl');
    const [dialogue, setDialogue] = useState<{ autor: 'NPC' | 'GRACZ'; tekst: string }[]>([]);
    const [options, setOptions] = useState<{ tekst: string; akcja: () => void }[]>([]);
    const [currentScene, setCurrentScene] = useState<string | null>(null);

    const router = useRouter();
    const { refresh } = useLocalSearchParams();
    const scrollRef = useRef<ScrollView>(null);

    const checkGameStarted = useCallback(async () => {
        setIsLoading(true);
        const started = await Storage.getItem({ key: 'gameStarted' });
        const gender = await Storage.getItem({ key: 'plec' });
        const storedLang = await Storage.getItem({ key: 'lang' });
        const storedScene = await DialogueController.getScene();

        if (started === 'true') {
            setHasStartedGame(true);
        } else {
            setHasStartedGame(false);
        }

        if (gender === 'pan' || gender === 'pani') {
            setPlec(gender);
        }

        if (storedLang === 'pl' || storedLang === 'en') {
            setJezyk(storedLang);
        }

        setCurrentScene(storedScene || 'dzwoni_officer'); // domyślnie początkowa scena

        setIsLoading(false);
    }, []);

    useEffect(() => {
        checkGameStarted();
    }, [refresh]);

    useEffect(() => {
        if (hasStartedGame === false) {
            router.replace('/prolog');
        }
    }, [hasStartedGame]);

    useEffect(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
    }, [dialogue]);

    const addMessage = (autor: 'NPC' | 'GRACZ', tekst: string) => {
        setDialogue((prev) => [...prev, { autor, tekst }]);
    };

    const renderText = (text: string, plec: 'pan' | 'pani' | null, jezyk: Language) => {
        if (jezyk === 'pl') {
            return substituteGenderSuffixes(text, plec);
        }
        return text;
    };

    const handleSceneChange = async (sceneName: string) => {
        setCurrentScene(sceneName);
        await DialogueController.setScene(sceneName);
    };

    const handleGenderChoice = async (gender: 'pan' | 'pani') => {
        await Storage.setItem({ key: 'plec', value: gender });
        setPlec(gender);
        addMessage('GRACZ', translations[jezyk][gender]);
        await handleSceneChange('powitanie_po_pleci');
    };

    useEffect(() => {
        if (!currentScene) return;

        switch (currentScene) {
            case 'dzwoni_officer':
                addMessage('NPC', translations[jezyk].dzwoniOfficer);
                setOptions([
                    {
                        tekst: translations[jezyk].odbierzPolaczenie,
                        akcja: () => handleSceneChange('start'),
                    },
                ]);
                break;

            case 'start':
                addMessage('NPC', translations[jezyk].connecting);
                setOptions([]);
                setTimeout(() => handleSceneChange('pytanie_o_plec'), 5000);
                break;

            case 'pytanie_o_plec':
                addMessage('NPC', translations[jezyk].welcome);
                setOptions([
                    { tekst: translations[jezyk].pan, akcja: () => handleGenderChoice('pan') },
                    { tekst: translations[jezyk].pani, akcja: () => handleGenderChoice('pani') },
                ]);
                break;

            case 'powitanie_po_pleci':
                addMessage('NPC', translations[jezyk].dalej);
                setOptions([]);
                break;

            default:
                console.warn('Nieznana scena:', currentScene);
        }
    }, [currentScene, jezyk]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator color="limegreen" />
            </View>
        );
    }

    return (
        <ImageBackground
            source={require('../../../assets/images/bg_komputer.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.dialogueContainer}>
                <ScrollView ref={scrollRef}>
                    {dialogue.map((msg, index) => (
                        <View key={index} style={styles.messageBlock}>
                            {msg.autor === 'NPC' && (
                                <View style={styles.messageHeader}>
                                    <Image
                                        source={require('../../../assets/images/avatar/oficer_rekrutacji.png')}
                                        style={styles.avatar}
                                    />
                                    <Text style={styles.messageTitle}>{translations[jezyk].officerTitle}</Text>
                                </View>
                            )}
                            <Text style={styles.messageText}>{renderText(msg.tekst, plec, jezyk)}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                    <TouchableOpacity key={index} style={styles.choiceButton} onPress={option.akcja}>
                        <Text style={styles.choiceButtonText}>{option.tekst}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    dialogueContainer: {
        flex: 1,
        marginHorizontal: width * 0.05,
        marginTop: height * 0.02,
        marginBottom: height * 0.01,
        padding: 10,
        borderWidth: 3,
        borderColor: 'limegreen',
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    messageBlock: {
        marginBottom: 12,
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
        fontSize: 20,
    },
    messageText: {
        color: 'white',
        fontFamily: 'VT323Regular',
        fontSize: 20,
    },
    optionsContainer: {
        marginBottom: height * 0.02,
    },
    choiceButton: {
        marginHorizontal: width * 0.05,
        marginBottom: 8,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: 'limegreen',
        backgroundColor: 'black',
        borderRadius: 8,
        alignItems: 'center',
    },
    choiceButtonText: {
        color: 'limegreen',
        fontFamily: 'VT323Regular',
        fontSize: 18,
    },
});

