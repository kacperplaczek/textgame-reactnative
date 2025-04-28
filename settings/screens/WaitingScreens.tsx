import WaitingScreen from "@/components/ui/WaitingScreenOverlay";

export const waitingScreensMap: Record<
  string,
  (props: { remainingTime: number }) => JSX.Element
> = {
  statek_przygotowanie: ({ remainingTime }) => (
    <WaitingScreen
      title="Przygotowania do startu"
      description="System sprawdza poprawność ustawień."
      image={require("@/assets/images/statek_preparation.png")}
      timeLeft={remainingTime}
    />
  ),
  default: ({ remainingTime }) => (
    <WaitingScreen
      title="Oczekiwanie..."
      description="Czekaj na zakończenie procedury."
      image={require("@/assets/images/ufo_bg.png")}
      timeLeft={remainingTime}
    />
  ),
};
