import Storage from 'expo-storage';

export const DialogueController = {
    // Ustawienie aktualnej sceny i zapisanie do Storage
    setScene: async (sceneName: string) => {
        await Storage.setItem({ key: 'currentScene', value: sceneName });
    },

    // Pobranie aktualnej sceny
    getScene: async (): Promise<string | null> => {
        const scene = await Storage.getItem({ key: 'currentScene' });
        return scene;
    },

    // Zapisanie konkretnego wyboru (np. otwarcie drzwi, wybór ścieżki)
    saveChoice: async (key: string, value: string) => {
        await Storage.setItem({ key, value });
    },

    // Pobranie wyboru (np. czy otworzył drzwi)
    getChoice: async (key: string): Promise<string | null> => {
        const value = await Storage.getItem({ key });
        return value;
    },
};
