import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useActsSwitchViewModel } from "@/viewmodels/useActsSwitchViewModel";

const ActSwitcher = ({ onMountRefresh }: { onMountRefresh?: () => void }) => {
  const {
    currentAct,
    completedActs,
    historyAct,
    handleActSwitch,
    getTranslatedActName,
  } = useActsSwitchViewModel();

  return (
    <View testID="acts-switch" style={styles.container}>
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
    zIndex: 100,
    elevation: 10,
    pointerEvents: "box-none",
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
