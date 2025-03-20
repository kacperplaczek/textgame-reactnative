import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Storage from "expo-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import { translations } from "@/lib/translations/translations"; // Import tłumaczeń
import { getCurrentLanguage } from "@/lib/settings/LanguageController"; // ✅ Używamy poprawnej funkcji

const ActSwitcher = () => {
  const [currentAct, setCurrentAct] = useState<string | null>(null);
  const [completedActs, setCompletedActs] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("pl"); // Domyślnie PL
  const { act: historyAct } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const loadActData = async () => {
      const act = await Storage.getItem({ key: "currentAct" });
      const completed = await Storage.getItem({ key: "completedActs" });
      const lang = await getCurrentLanguage(); // ✅ Pobieramy poprawnie język

      console.log("📌 Aktualny język:", lang); // 🔍 Debugging
      console.log("📌 Aktualny akt:", act); // 🔍 Debugging
      console.log("📌 Ukończone akty:", completed); // 🔍 Debugging

      setCurrentAct(act);
      setCompletedActs(completed ? JSON.parse(completed) : []);
      setLanguage(lang || "pl");
    };

    loadActData();
  }, []);

  const handleActSwitch = async (act: string) => {
    console.log(`🔄 Przełączam akt na: ${act}`);

    if (act === currentAct) {
      console.log("✅ Powrót do aktualnego aktu!");
      router.replace(`/${act}`);
    } else {
      console.log(`📖 Otwieram historię dla aktu: ${act}`);
      await Storage.setItem({ key: "viewingHistoryAct", value: act });
      router.push(`/history?act=${act}`);
    }
  };

  const getTranslatedActName = (act: string) => {
    // Normalizujemy nazwę aktu, usuwając myślnik
    const normalizedAct = act.replace("akt-", "akt");

    // Pobieramy tłumaczenie
    const translatedName = translations[language]?.[`${normalizedAct}Title`];

    console.log(
      `🔍 Tłumaczenie dla ${act} (${normalizedAct}Title):`,
      translatedName
    ); // Debugging

    return translatedName || act.replace("akt-", "AKT ").toUpperCase();
  };

  return (
    <View style={styles.container}>
      <View style={styles.switcherContainer}>
        {completedActs.map((act) => (
          <TouchableOpacity
            key={act}
            style={[
              styles.tab,
              act === historyAct ? styles.historyTab : styles.completedTab,
            ]}
            onPress={() => handleActSwitch(act)}
          >
            <Text
              style={[
                styles.tabText,
                act === historyAct ? styles.historyText : styles.completedText,
              ]}
            >
              {getTranslatedActName(act)}
            </Text>
          </TouchableOpacity>
        ))}
        {currentAct && (
          <TouchableOpacity
            style={[
              styles.tab,
              currentAct === historyAct ? styles.historyTab : styles.currentTab,
            ]}
            onPress={() => handleActSwitch(currentAct)}
          >
            <Text
              style={[
                styles.tabText,
                currentAct === historyAct
                  ? styles.historyText
                  : styles.currentText,
              ]}
            >
              {getTranslatedActName(currentAct)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "transparent",
  },
  switcherContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginRight: 1,
  },
  completedTab: {
    backgroundColor: "gray",
    opacity: 0.5,
  },
  currentTab: {
    backgroundColor: "#219653",
  },
  historyTab: {
    backgroundColor: "#27AE60",
  },
  tabText: {
    fontSize: 16,
    fontFamily: "VT323Regular",
  },
  completedText: {
    color: "black",
  },
  currentText: {
    color: "black",
  },
  historyText: {
    color: "white",
  },
});

export default ActSwitcher;
