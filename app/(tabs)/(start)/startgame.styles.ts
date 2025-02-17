import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    background: { flex: 1, width: '100%', height: '100%' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' },

    // Pojemnik na cały kontent pod menu
    contentContainer: { flex: 1, justifyContent: 'space-between', paddingTop: 50 },

    // Kontener na dialogi
    dialogueContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderColor: 'limegreen',
        borderWidth: 2,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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
    avatar: { width: 28, height: 28, borderRadius: 14, marginRight: 8 },

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

    // Oczekiwanie na czas
    waitingText: {
        marginTop: 10,
        textAlign: 'center',
        color: 'limegreen',
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

    // Przycisk MENU – nad wszystkim!
    menuContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
    },
});