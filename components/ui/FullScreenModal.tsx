import React from 'react';
import { Modal, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

interface FullScreenModalProps {
    visible: boolean;
    title: string;
    subtitle?: string;
    image?: any;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ visible, title, subtitle, image }) => {
    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {image && <Image source={image} style={styles.image} />}
                    <Text style={styles.title}>{title}</Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                    <ActivityIndicator size="large" color="#219653" style={{ marginTop: 20 }} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#000',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#219653',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        color: '#219653',
        fontFamily: 'VT323Regular',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#FFF',
        fontFamily: 'VT323Regular',
        textAlign: 'center',
    },
});

export default FullScreenModal;
