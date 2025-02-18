import * as Notifications from 'expo-notifications';

export async function scheduleNotification(waitTimeInSeconds: number, sceneName: string) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Czas minął!',
            body: `Możesz wrócić do sceny: ${sceneName}`,
        },
        trigger: {
            seconds: waitTimeInSeconds,
            repeats: false,
        },
    });
}
