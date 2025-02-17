import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

type DeathScreenProps = {
    title: string;
    description: string;
    image: any; // require() obrazka
    onRetry: () => void;
};

export default function DeathScreen({ title, description, image, onRetry }: DeathScreenProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onRetry}>
            <ImageBackground source={image} style={styles.background} resizeMode="cover">
                <View style={styles.overlay} />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
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
    description: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'VT323Regular',
        marginTop: 8,
        textAlign: 'center',
    },
    tapText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'VT323Regular',
        marginTop: 20,
    },
});
