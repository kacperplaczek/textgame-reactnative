import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Storage from "expo-storage";
import { useRouter } from "expo-router";

const ActSwitcher = () => {
  const [currentAct, setCurrentAct] = useState<string | null>(null);
  const [completedActs, setCompletedActs] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadActData = async () => {
      const act = await Storage.getItem({ key: "currentAct" });
      const completed = await Storage.getItem({ key: "completedActs" });
      setCurrentAct(act);
      setCompletedActs(completed ? JSON.parse(completed) : []);
    };
    loadActData();
  }, []);

  const handleActSwitch = (act: string) => {
    if (act === currentAct) {
      router.replace(`/${act}.tsx`);
    } else {
      router.push(`/history?act=${act}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.switcherContainer}>
        {completedActs.map((act) => (
          <TouchableOpacity
            key={act}
            style={[styles.tab, styles.completedTab]}
            onPress={() => handleActSwitch(act)}
          >
            <Text style={[styles.tabText, styles.completedText]}>
              {act.replace("akt-", "AKT ").toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
        {currentAct && (
          <TouchableOpacity
            style={[styles.tab, styles.currentTab]}
            onPress={() => handleActSwitch(currentAct)}
          >
            <Text style={[styles.tabText, styles.currentText]}>
              {currentAct.replace("akt-", "AKT ").toUpperCase()}
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
    marginRight: 5,
  },
  completedTab: {
    backgroundColor: "gray",
    opacity: 0.5,
  },
  currentTab: {
    backgroundColor: "#219653",
    color: "black",
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
  menuText: {
    fontSize: 18,
    fontFamily: "VT323Regular",
    color: "#1B5E20",
  },
});

export default ActSwitcher;
