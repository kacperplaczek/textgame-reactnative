import { useEffect, useState } from "react";
import { translations } from "@/i18n/translations";
import { useRouter } from "expo-router";
import Storage from "expo-storage";
import { Audio } from "expo-av";
import { useLanguage } from "@/context/LanguageContext"; // <<< Dodane

export function usePrologScreenViewModel() {
  const router = useRouter();
  const { language } = useLanguage(); // <<< Teraz język globalny z Context API

  const [currentScreen, setCurrentScreen] = useState<"intro" | "prolog">(
    "intro"
  );
  const [isSaving, setIsSaving] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [fullText, setFullText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingInterval, setTypingInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    const newText =
      currentScreen === "intro"
        ? translations[language].introText
        : translations[language].prologText;

    setFullText(newText);
    setDisplayedText("");
    setIsTyping(true);
  }, [currentScreen, language]); // <<< używamy language z kontekstu

  useEffect(() => {
    if (isTyping && fullText.length > 0) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 25);

      setTypingInterval(interval);
      return () => clearInterval(interval);
    }
  }, [isTyping, fullText]);

  const stopAllSounds = async () => {
    try {
      const sound = new Audio.Sound();
      await sound.stopAsync().catch(() => {});
      await sound.unloadAsync().catch(() => {});
    } catch (e) {
      console.error("❌ Błąd zatrzymywania dźwięków:", e);
    }
  };

  const handleScreenChange = async () => {
    if (isTyping) {
      if (typingInterval) clearInterval(typingInterval);
      setDisplayedText(fullText);
      setIsTyping(false);
      return;
    }

    if (currentScreen === "intro") {
      setCurrentScreen("prolog");
    } else if (currentScreen === "prolog") {
      setIsSaving(true);
      await stopAllSounds();
      await Storage.setItem({ key: "gameStarted", value: "true" });
      await Storage.setItem({ key: "currentAct", value: "startgame" });
      router.replace("/game");
    }
  };

  return {
    currentScreen,
    isSaving,
    displayedText,
    language,
    handleScreenChange,
  };
}
