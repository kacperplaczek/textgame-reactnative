import ActEndScreen from '@/components/endactscreens/ActEndScreen';

export const endActScreensMap: Record<string, React.FC<{ onContinue: () => void }>> = {
    actEndScreen: ActEndScreen,
};
