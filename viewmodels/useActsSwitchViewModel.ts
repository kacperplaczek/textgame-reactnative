import { useEffect, useState } from "react";
import { DeviceEventEmitter } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { translations } from "@/lib/translations/translations";
import { getCurrentLanguage } from "@/lib/settings/LanguageController";
import Storage from "expo-storage";
import { useGameEngine } from "@/lib/game/useGameEngine";

export function useActsSwitchViewModel() {
  const [currentAct, setCurrentAct] = useState<string | null>(null);
  const [completedActs, setCompletedActs] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("pl");
  const { act: historyAct } = useLocalSearchParams();
  const router = useRouter();
  const { setActSwitcherRefresh } = useGameEngine();

  useEffect(() => {
    const loadActData = async () => {
      const act = await Storage.getItem({ key: "currentAct" });
      const completed = await Storage.getItem({ key: "completedActs" });
      const lang = await getCurrentLanguage();

      setCurrentAct(act);
      setCompletedActs(completed ? JSON.parse(completed) : []);
      setLanguage(lang || "pl");
    };

    loadActData();

    const subscription = DeviceEventEmitter.addListener(
      "completedActsUpdated",
      () => {
        console.log("📥 Otrzymano completedActsUpdated – odświeżam switcher");
        loadActData();
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleActSwitch = async (act: string) => {
    console.log(`🔄 Przełączam akt na: ${act}`);

    if (act === currentAct) {
      console.log("✅ Powrót do aktualnego aktu w /game");
      router.replace("/game");
    } else {
      console.log(`📖 Otwieram historię dla aktu: ${act}`);
      await Storage.setItem({ key: "viewingHistoryAct", value: act });
      router.push(`/history?act=${act}`);
    }
  };

  const getTranslatedActName = (act: string) => {
    const normalizedAct = act.replace("akt-", "akt");
    const translatedName = translations[language]?.[`${normalizedAct}Title`];
    return translatedName || act.replace("akt-", "AKT ").toUpperCase();
  };

  return {
    currentAct,
    completedActs,
    language,
    historyAct,
    handleActSwitch,
    getTranslatedActName,
  };
}
