import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function ExplosionDeathScreen({ onRetry }: { onRetry: () => void }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onRetry}>
            <ImageBackground
                source={require('@/assets/images/bg_prolog.png')}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.overlay} />
                <Text style={styles.title}>ROZWALONO STATEK</Text>
                <Text style={styles.tapText}>Dotknij, aby wrócić do checkpointu</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        color: 'red',
        fontSize: 32,
        fontFamily: 'VT323Regular',
        textAlign: 'center',
    },
    tapText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'VT323Regular',
        marginTop: 20,
    },
});
