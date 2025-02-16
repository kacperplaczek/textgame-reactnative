export const genderSuffixes = {
    eś: { pan: 'eś', pani: 'aś' },
    y: { pan: 'y', pani: 'a' },
    em: { pan: 'em', pani: 'ą' },
    u: { pan: 'u', pani: 'ie' },
    ego: { pan: 'ego', pani: 'ej' },
    ym: { pan: 'ym', pani: 'ą' },
};

export const substituteGenderSuffixes = (text: string, plec: 'pan' | 'pani' | null) => {
    if (!plec) return text;

    return text.replace(/<prefix_([a-z0-9]+)>/g, (_, key) => {
        const suffix = genderSuffixes[key as keyof typeof genderSuffixes];
        if (!suffix) {
            console.warn(`Brak zdefiniowanej końcówki: ${key}`);
            return `<prefix_${key}>`;
        }
        return suffix[plec];
    });
};
