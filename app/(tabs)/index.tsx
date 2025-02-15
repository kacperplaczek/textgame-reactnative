import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.wrapper}>
            {/* Klikalny cały ekran */}
            <TouchableOpacity
                style={styles.fullscreenTouchable}
                onPress={() => router.replace('/startgame')}
                activeOpacity={0.9}
            >
                <ImageBackground
                    source={require('../../assets/images/bg_ufo.png')}
                    style={styles.background}
                    resizeMode="contain" // ewentualnie 'cover' - zobacz, co lepiej wygląda
                >
                    <Text style={styles.title}>BEZ POWROTU</Text>

                    <View style={styles.spacer} />

                    <Text style={styles.subtitle}>KLIKNIJ EKRAN ABY ROZPOCZĄĆ</Text>
                </ImageBackground>
            </TouchableOpacity>

            {/* Dekoracyjna ramka */}
            <View style={styles.border} />
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'black',
        position: 'relative',
    },
    fullscreenTouchable: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 44,
        color: 'limegreen',
        fontFamily: 'VT323Regular',
        textAlign: 'center',
        marginTop: 40,
    },
    subtitle: {
        fontSize: 24,
        color: 'limegreen',
        fontFamily: 'VT323Regular',
        textAlign: 'center',
        marginBottom: 20,
    },
    spacer: {
        flex: 1, // żeby "KLIKNIJ" poszło na dół
    },
    border: {
        position: 'absolute',
        top: 30,
        bottom: 10,
        left: 20,
        right: 20,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: 'limegreen',
        pointerEvents: 'none', // żeby nie blokowało kliknięć
    },
});
