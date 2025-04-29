import { useRouter } from "expo-router";
import Storage from "expo-storage";
import { useLanguage } from "@/context/LanguageContext"; // <<< Dodane

export function useHomeScreenViewModel() {
  const router = useRouter();
  const { language } = useLanguage(); // <<< Teraz język globalny z Context API

  const handleStartPress = async () => {
    const gameStarted = await Storage.getItem({ key: "gameStarted" });
    const currentAct = await Storage.getItem({ key: "currentAct" });

    console.log("🔍 Sprawdzanie statusu gry...");
    console.log("📌 gameStarted:", gameStarted);
    console.log("📌 currentAct:", currentAct);

    if (gameStarted !== "true") {
      console.log("🚀 Przenoszę gracza do prologu...");
      router.replace("/prolog");
    } else if (currentAct) {
      console.log("🎭 Przenoszę gracza do aktu:", currentAct);
      router.replace("/game");
    } else {
      console.log("🎮 Brak aktu, startuję od początku...");
      router.replace("/game");
    }
  };

  return {
    language, // zamiast jezyk
    handleStartPress,
  };
}
