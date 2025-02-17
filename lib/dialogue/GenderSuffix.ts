import Storage from 'expo-storage';

export const getStoredGender = async (): Promise<'pan' | 'pani' | null> => {
    const gender = await Storage.getItem({ key: 'plec' });
    if (gender === 'pan' || gender === 'pani') {
        return gender;
    }
    return null;
};
