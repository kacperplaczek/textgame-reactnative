import { useHistoryScreenViewModel } from "@/viewmodels/useHistoryScreenViewModel";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { npcData } from "@/settings/NPCData";
import GameMenu from "@/components/buttons/GameMenu";
import ActSwitcher from "@/components/buttons/ActsSwitch";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { translations } from "@/i18n/translations";

const { width, height } = Dimensions.get("window");

const HistoryScreen = () => {
  const { act } = useLocalSearchParams();
  const router = useRouter();
  const { dialogueHistory, language, scrollRef, getTranslatedActName } =
    useHistoryScreenViewModel(act as string);

  const optionsBanner =
    Platform.OS === "android"
      ? "ca-app-pub-4136563182662861/8460997846"
      : "ca-app-pub-4136563182662861/4480470362";

  return (
    <ImageBackground
      source={require("@/assets/images/INTRO.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <Image
        source={require("@/assets/images/refleks.png")}
        resizeMode="contain"
        style={styles.overlayImage}
      />

      <ActSwitcher />
      <GameMenu onReset={undefined} />

      <View style={styles.contentContainer}>
        <View style={styles.dialogueContainer}>
          <ScrollView ref={scrollRef}>
            {dialogueHistory.length === 0 ? (
              <Text style={styles.emptyText}>
                {translations[language]?.historyEmpty || "Ładowanie..."}
              </Text>
            ) : (
              dialogueHistory.map((msg, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageBlock,
                    msg.autor === "GRACZ" && styles.playerMessageBlock,
                  ]}
                >
                  {msg.autor === "NPC" && msg.npcKey && npcData[msg.npcKey] && (
                    <View>
                      <Text style={styles.messageTitle}>
                        {translations[language]?.[
                          npcData[msg.npcKey]
                            .nameKey as keyof (typeof translations)[language]
                        ] || "NPC"}
                      </Text>
                      <View style={styles.messageContent}>
                        <Image
                          source={npcData[msg.npcKey].avatar}
                          style={styles.avatar}
                        />
                        <Text style={styles.messageText}>{msg.tekst}</Text>
                      </View>
                    </View>
                  )}
                  {msg.autor === "GRACZ" && (
                    <Text
                      style={[styles.messageText, styles.playerMessageText]}
                    >
                      {msg.tekst}
                    </Text>
                  )}
                </View>
              ))
            )}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>
            {translations[language]?.backButton || "⬅ Powrót"}
          </Text>
        </TouchableOpacity>

        <BannerAd unitId={optionsBanner} size={BannerAdSize.ADAPTIVE_BANNER} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },

  overlayImage: {
    position: "absolute",
    width: width * 1,
    height: height * 0.5,
    zIndex: 0,
  },

  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 50,
  },

  dialogueContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderColor: "#219653",
    borderWidth: 4,
    borderRadius: 10,
    marginTop: 40,
    marginHorizontal: 10,
    marginBottom: 10,
  },

  messageBlock: {
    marginBottom: 12,
  },

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

  messageTitle: {
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: 23,
    marginBottom: 4,
  },

  messageContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 4,
    marginRight: 8,
    marginTop: 10,
  },

  messageText: {
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: 25,
    flexShrink: 1,
  },

  emptyText: {
    color: "gray",
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },

  backButton: {
    padding: 12,
    width: "95%",
    textAlign: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#219653",
    borderRadius: 8,
    fontFamily: "VT323Regular",
    alignSelf: "center",
    marginBottom: 30,
  },
  historyTab: {
    backgroundColor: "#27AE60", // Ciemniejsza zieleń dla aktualnie przeglądanego aktu
  },
  historyText: {
    color: "white", // Jasny tekst dla aktualnie przeglądanego aktu
  },
  backButtonText: {
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: 23,
  },
});

export default HistoryScreen;
