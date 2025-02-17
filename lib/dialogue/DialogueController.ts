import Storage from 'expo-storage';

// Scena i checkpoint
export const DialogueController = {
    getScene: async (): Promise<string | null> => {
        return await Storage.getItem({ key: 'currentScene' });
    },

    setScene: async (sceneName: string) => {
        await Storage.setItem({ key: 'currentScene', value: sceneName });
    },

    getLastCheckpoint: async (): Promise<string | null> => {
        return await Storage.getItem({ key: 'lastCheckpoint' });
    },

    setCheckpoint: async (sceneName: string) => {
        await Storage.setItem({ key: 'lastCheckpoint', value: sceneName });
    },

    clearAfterCheckpoint: async (checkpointScene: string) => {
        const allKeys = await Storage.getAllKeys();
        for (const key of allKeys) {
            if (key.startsWith('scene_')) {
                const index = parseInt(key.replace('scene_', ''), 10);
                const checkpointIndex = parseInt(checkpointScene.replace('scene_', ''), 10);
                if (index > checkpointIndex) {
                    await Storage.removeItem({ key });
                }
            }
        }
        await DialogueController.setScene(checkpointScene);
    },

    setDeathScreen: async (screenName: string) => {
        await Storage.setItem({ key: 'deathScreen', value: screenName });
    },

    getDeathScreen: async (): Promise<string | null> => {
        return await Storage.getItem({ key: 'deathScreen' });
    },

    clearDeathScreen: async () => {
        await Storage.removeItem({ key: 'deathScreen' });
    },
};
