import ExplosionDeathScreen from "@/components/deathscreens/ExplosionDeathScreen";

export const deathScreensMap: Record<string, React.FC<{ onRetry: () => void }>> = {
    explosionDeathScreen: ExplosionDeathScreen,
};
