import DeathScreen from '@/components/deathscreens/DeathScreen';

export const deathScreensMap: Record<
    string,
    (props: { onRetry: () => void }) => JSX.Element
> = {
    explosionDeathScreen: ({ onRetry }) => (
        <DeathScreen
            title="ROZWALONO STATEK"
            description="Twój statek został zniszczony przez piratów."
            image={require('@/assets/images/bg_prolog.png')}
            onRetry={onRetry}
        />
    ),

    // Tu dodasz kolejne typy śmierci np.
    spaceDeathScreen: ({ onRetry }) => (
        <DeathScreen
            title="WYSSANY W PRÓŻNIĘ"
            description="Utworzyła się dziura w kadłubie. Nikt nie przeżył."
            image={require('@/assets/images/bg_intro.png')}
            onRetry={onRetry}
        />
    ),
};
