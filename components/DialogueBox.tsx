import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { npcData } from "@/settings/NPCData";
import { translations } from "@/i18n/translations";
import { DialogueMessage } from "@/lib/dialogue/useDialogue";
import { useDialogueBoxViewModel } from "@/viewmodels/useDialogueBoxViewModel";

const DialogueBox = ({
  scrollRef,
  dialogue,
}: {
  scrollRef: React.RefObject<ScrollView>;
  dialogue: DialogueMessage[];
}) => {
  const { lang } = useDialogueBoxViewModel(scrollRef, dialogue);

  console.log("Dialogue Box --> wiadomości:", dialogue);

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {dialogue.map((msg, index) => (
        <View
          key={index}
          style={[
            styles.messageBlock,
            msg.autor === "GRACZ" && styles.playerMessageBlock,
          ]}
        >
          {msg.autor === "NPC" && msg.npcKey && npcData[msg.npcKey] && (
            <View style={styles.messageHeader}>
              <Image
                source={npcData[msg.npcKey].avatar}
                style={styles.avatar}
              />
              <Text style={styles.messageTitle}>
                {translations[lang][npcData[msg.npcKey].nameKey]}
              </Text>
            </View>
          )}
          <Text
            style={[
              styles.messageText,
              msg.autor === "GRACZ" && styles.playerMessageText,
            ]}
          >
            {msg.tekst}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default DialogueBox;

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 40,
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderColor: "#219653",
    borderWidth: 3,
    borderRadius: 10,
    marginTop: 40,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  messageBlock: { marginBottom: 12 },
  playerMessageBlock: {
    backgroundColor: "#219653",
    padding: 8,
    borderRadius: 10,
  },
  playerMessageText: {
    color: "black",
    fontFamily: "VT323Regular",
    fontSize: 24,
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  avatar: { width: 28, height: 28, borderRadius: 4, marginRight: 8 },
  messageTitle: {
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: 25,
  },
  messageText: {
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: 25,
  },
});
