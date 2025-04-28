import { useEffect, useState } from "react";
import { getCurrentLanguage } from "@/models/LanguageController";
import { useRouter } from "expo-router";
import Storage from "expo-storage";

export function useHomeScreenViewModel() {
  const router = useRouter();
  const [jezyk, setJezyk] = useState<"pl" | "en">("pl");

  useEffect(() => {
    const fetchLanguage = async () => {
      const lang = await getCurrentLanguage();
      setJezyk(lang);
    };
    fetchLanguage();
  }, []);

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
    jezyk,
    handleStartPress,
  };
}
