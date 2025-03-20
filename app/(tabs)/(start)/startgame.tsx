import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  AppState,
  Platform,
} from "react-native";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Storage from "expo-storage";
import { translations, Language } from "@/lib/translations/translations";
import { DialogueController } from "@/lib/dialogue/DialogueController";
import { npcData, NpcKey } from "@/lib/dialogue/NPCData";
import { getCurrentLanguage } from "@/lib/settings/LanguageController";
import { getScenes } from "@/scenario/scenariuszAkt1";
import { calculateRemainingTime } from "@/lib/dialogue/SceneUtils";
import { scheduleNotification } from "@/lib/notifications/NotificationUtils";
import { deathScreensMap } from "@/lib/screens/DeathScreens";
import GameMenu from "@/components/ui/GameMenu";
import { endActScreensMap } from "@/lib/screens/EndActScreens";
import { Audio } from "expo-av";
import { soundsMap } from "@/lib/settings/soundMap";
import { useFocusEffect } from "@react-navigation/native";
import SpecialSceneOverlay from "@/components/ui/CallingScreenOverlay";
import WaitingScreenOverlay from "@/components/ui/WaitingScreenOverlay";
import * as Notifications from "expo-notifications";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import choiceSound from "@/assets/sounds/choice.wav";
import useChoiceSound from "@/lib/dialogue/useChoiceSounds";
import ActSwitcher from "@/components/ui/ActsSwitch";

export default function StartGameScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasStartedGame, setHasStartedGame] = useState<boolean | null>(null);
  const [plec, setPlec] = useState<"pan" | "pani" | null>(null);
  const [jezyk, setJezyk] = useState<Language>("en");
  const [dialogue, setDialogue] = useState<
    { autor: "NPC" | "GRACZ"; tekst: string; npcKey?: NpcKey }[]
  >([]);
  const [options, setOptions] = useState<
    { tekst: string; akcja: () => void }[]
  >([]);
  const [currentScene, setCurrentScene] = useState<string | null>(null);
  const [waiting, setWaiting] = useState<{
    sceneName: string;
    endTime: number;
  } | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [dead, setDead] = useState(false);
  const [deadScreen, setDeadScreen] = useState<string | null>(null);
  const [endAct, setEndAct] = useState(false);
  const [endActScreen, setEndActScreen] = useState<string | null>(null);
  const [actFinished, setActFinished] = useState<{
    actKey: string;
    nextAct: string;
  } | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const activeSound = useRef<Audio.Sound | null>(null);
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [modalContent, setModalContent] = useState<{
    title: string;
    subtitle?: string;
    image?: any;
  } | null>(null);
  const [specialSceneVisible, setSpecialSceneVisible] = useState(false);
  const [specialSceneContent, setSpecialSceneContent] = useState<{
    title: string;
    subtitle?: string;
    image?: any;
    background?: any;
    nextScene?: string;
    autoNextDelay?: number;
    requireWait?: boolean;
    requireWaitTime?: number;
  } | null>(null);
  const [waitingScreenVisible, setWaitingScreenVisible] = useState(false);
  const optionsBanner =
    Platform.OS === "android"
      ? "ca-app-pub-4136563182662861/8460997846" // android
      : "ca-app-pub-4136563182662861/4480470362"; // ios

  useEffect(() => {
    console.log("🔄 Sprawdzanie stanu gry...");
    // console.log("📌 Aktualne tłumaczenia:", translations[jezyk]);
    console.log("📌 Aktualny język:", jezyk);
    console.log("📌 Opcje wyboru:", options);
  }, [refreshKey]);

  async function clearStoredTime() {
    try {
      await Storage.removeItem({ key: "waitingEndTime" });
      await Storage.removeItem({ key: "waitingScene" });
      console.log("✅ Zapisany czas został usunięty.");
    } catch (error) {
      console.error("❌ Błąd podczas usuwania zapisanego czasu:", error);
    }
  }

  useEffect(() => {
    const loadLang = async () => {
      const lang = await getCurrentLanguage();
      setJezyk(lang);
    };
    loadLang();
  }, []);

  useEffect(() => {
    console.log("🔄 Sprawdzanie stanu gry...");
  }, [refreshKey]);

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Brak uprawnień do audio!");
      }
    };

    getPermissions();
  }, []);

  const stopAllSounds = async () => {
    try {
      await Audio.setIsEnabledAsync(false); // Wyłącza wszystkie dźwięki
      await Audio.setIsEnabledAsync(true); // Włącza dźwięki ponownie
    } catch (e) {
      console.error("Błąd zatrzymywania dźwięków:", e);
    }
  };

  // ✅ Pobieramy ustawienia dźwięku z pamięci
  useEffect(() => {
    const fetchSettings = async () => {
      const storedSound = await Storage.getItem({ key: "soundEnabled" });
      setSoundEnabled(storedSound !== "off");
    };
    fetchSettings();
  }, []);

  const playChoiceSound = useChoiceSound(); // 🎵 Pobieramy funkcję

  const savePlayerChoices = async (
    selectedShipClass: string,
    selectedEquipment: string
  ) => {
    await Storage.setItem({ key: "shipClass", value: selectedShipClass });
    await Storage.setItem({ key: "equipment", value: selectedEquipment });

    console.log(
      `✅ Zapisano wybory gracza: Statek - ${selectedShipClass}, Wyposażenie - ${selectedEquipment}`
    );
  };

  const saveDialogue = async (
    akt: string,
    scene: string,
    message: { autor: "NPC" | "GRACZ"; tekst: string; npcKey?: string }
  ) => {
    try {
      const storedData = await Storage.getItem({ key: "dialogue_history" });
      const dialogues = storedData ? JSON.parse(storedData) : {};

      if (!dialogues[akt]) {
        dialogues[akt] = [];
      }

      dialogues[akt].push({ scene, ...message });

      await Storage.setItem({
        key: "dialogue_history",
        value: JSON.stringify(dialogues),
      });

      console.log(`✅ Zapisano dialog dla aktu ${akt}:`, dialogues[akt]);
    } catch (error) {
      console.error("❌ Błąd zapisu historii dialogów:", error);
    }
  };

  const playSound = async (soundKey: string, loop: boolean) => {
    try {
      console.log(`🔊 Odtwarzanie dźwięku: ${soundKey}`);

      // ✅ Najpierw zatrzymujemy dźwięk
      await stopSound();

      // ✅ Ustawiamy tryb odtwarzania w tle
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true, // ✅ Działa nawet w trybie cichym na iOS!
        staysActiveInBackground: true, // ✅ Działa, nawet gdy aplikacja traci focus
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
      });

      // ✅ Tworzymy dźwięk
      const { sound: newSound } = await Audio.Sound.createAsync(
        soundsMap[soundKey],
        { isLooping: loop, volume: 1.0 }
      );

      activeSound.current = newSound;
      await newSound.playAsync();

      console.log("✅ Dźwięk odtworzony pomyślnie!");
    } catch (e) {
      console.error(`❌ Błąd podczas odtwarzania dźwięku ${soundKey}:`, e);
    }
  };

  const stopSound = async () => {
    try {
      if (activeSound.current) {
        await activeSound.current.stopAsync();
        await activeSound.current.unloadAsync();
        activeSound.current = null;
      }
    } catch (e) {
      console.error("Błąd podczas zatrzymania dźwięku:", e);
    }
  };

  const checkGameStarted = useCallback(async () => {
    setIsLoading(true);

    const started = await Storage.getItem({ key: "gameStarted" });
    const storedScene = await DialogueController.getScene();

    console.log("📌 gameStarted:", started);
    console.log("📌 storedScene:", storedScene);

    if (started === "true") {
      setHasStartedGame(true);
    } else {
      setHasStartedGame(false);
    }

    if (storedScene) {
      setCurrentScene(storedScene);
      handleSceneChange(storedScene);
    } else {
      console.log("🔄 Ustawiam domyślną scenę: dzwoni_officer");
      setCurrentScene("dzwoni_officer");
      handleSceneChange("dzwoni_officer");
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const checkWaitingState = async () => {
      const storedEndTime = await Storage.getItem({ key: "waitingEndTime" });
      const storedScene = await Storage.getItem({ key: "waitingScene" });

      if (storedEndTime && storedScene) {
        const endTime = parseInt(storedEndTime, 10); // Pobieramy zapisany czas jako liczba (ms)
        const now = Date.now(); // Pobieramy aktualny timestamp (ms)
        const remaining = Math.max(0, Math.floor((endTime - now) / 1000)); // Konwersja na sekundy

        console.log(`⏳ Pozostały czas: ${remaining} sekund`);

        if (remaining > 0) {
          console.log("🔄 Przywracanie ekranu oczekiwania...");

          setWaiting({ sceneName: storedScene, endTime });
          setWaitingScreenVisible(true);
          setRemainingTime(remaining);
        } else {
          setWaiting(null);
          setWaitingScreenVisible(false);
          handleSceneChange(storedScene);
        }
      }
    };

    checkWaitingState();
  }, []);

  useEffect(() => {
    checkGameStarted();
  }, []);

  useEffect(() => {
    if (hasStartedGame === false) {
      router.replace("/prolog");
    }
  }, [hasStartedGame]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [dialogue]);

  const addMessage = async (
    autor: "NPC" | "GRACZ",
    tekst: string,
    npcKey?: NpcKey
  ) => {
    const currentAct =
      (await Storage.getItem({ key: "currentAct" })) || "startgame";
    console.log("📌 Aktualny akt zapisany w pamięci:", currentAct);

    setDialogue((prev) => {
      const updatedDialogue = [...prev, { autor, tekst, npcKey }];
      saveDialogue(currentAct, currentScene ?? "unknown", {
        autor,
        tekst,
        npcKey,
      });
      return updatedDialogue;
    });
  };

  const processScene = async (sceneName: string) => {
    const scenes = getScenes(translations[jezyk], plec);
    const scene = scenes[sceneName];

    if (!scene) return;

    await stopSound(); // <-- zatrzymaj muzykę zawsze przed odpaleniem nowej

    if (scene.sound) {
      await playSound(scene.sound, scene.soundPlayLoop ?? false);
    }

    const tekst =
      typeof scene.tekst === "function" ? scene.tekst() : scene.tekst;
    if (
      dialogue.length === 0 ||
      dialogue[dialogue.length - 1].tekst !== tekst
    ) {
      addMessage("NPC", tekst, scene.npcKey);
    }

    if (scene.clearHistory) {
      console.log("🧹 Czyszczenie historii dialogów...");

      // ✅ Resetuj stan dialogów i opcji natychmiast
      setDialogue([]);
      setOptions([]);

      // ✅ Usuń zapisane wiadomości z pamięci
      await Storage.removeItem({ key: `dialogue_akt1` }); // <-- Sprawdź, czy to pasuje do Twojego klucza w Storage
      await DialogueController.clearHistory(); // <-- Jeśli masz kontroler dialogów

      // ✅ Usuń zapisane stany oczekiwania
      await Storage.removeItem({ key: "waitingEndTime" });
      await Storage.removeItem({ key: "waitingScene" });

      console.log(
        "✅ Historia wyczyszczona! Przenoszę do:",
        scene.autoNextScene
      );

      // 🔄 **Małe opóźnienie, aby UI się odświeżyło**
      setTimeout(() => {
        handleSceneChange(scene.autoNextScene ?? "poczatek_gry");
      }, 100); // ⬅️ Czasami React potrzebuje kilku ms, by odświeżyć stan

      return;
    }

    if (scene.options) {
      setOptions(
        scene.options.map((option) => ({
          tekst: option.tekst,
          akcja: () => handleSceneChange(option.next),
        }))
      );
    } else {
      setOptions([]);
    }
    if (scene.autoNextScene && scene.autoNextDelay) {
      setTimeout(() => {
        handleSceneChange(scene.autoNextScene!);
      }, scene.autoNextDelay);
    }
  };

  const handleSceneChange = async (sceneName: string) => {
    // ✅ Pobieramy język z `Storage`
    const storedLang = (await Storage.getItem({ key: "lang" })) || "en";
    console.log("📌 Aktualny język w Storage:", storedLang);

    const plec = await Storage.getItem({ key: "plec" });

    console.log(`📌 Aktualny język w Storage: ${storedLang}`);
    console.log(`📌 Ustawiam scenę: ${sceneName}`);

    // ✅ Dynamicznie pobieramy sceny dla aktualnego języka
    const scenes = getScenes(translations[storedLang], plec);
    const scene = scenes[sceneName];

    if (!scene) {
      console.log("⚠️ Scena nie istnieje!");
      return;
    }

    console.log(`🎬 Zmiana sceny: ${sceneName}`);

    await stopSound();
    setOptions([]);

    if (scene.sound) {
      await playSound(scene.sound, scene.soundPlayLoop ?? false);
    }

    setCurrentScene(sceneName);
    await DialogueController.setScene(sceneName);

    // 📌 Normalne przejście sceny – dynamiczne tłumaczenie
    let tekst = scene.tekst
      ? typeof scene.tekst === "function"
        ? scene.tekst()
        : scene.tekst
      : "❌ Brak tekstu";

    console.log(`📜 Tekst sceny: ${tekst}`);
    addMessage("NPC", tekst, scene.npcKey);

    // ✅ **Obsługa `notifyTime` (czekanie na kolejną scenę)**
    if (scene.notifyTime) {
      const storedEndTime = await Storage.getItem({ key: "waitingEndTime" });
      const now = Math.floor(Date.now() / 1000); // Pobierz aktualny czas w sekundach

      if (storedEndTime) {
        const endTime = parseInt(storedEndTime, 10);
        const remaining = endTime - now;

        if (remaining <= 0) {
          console.log(
            "✅ Czas minął! Usuwam dane z pamięci i zmieniam scenę..."
          );
          await Storage.removeItem({ key: "waitingEndTime" });
          await Storage.removeItem({ key: "waitingScene" });

          setWaiting(null);
          setWaitingScreenVisible(false);
          setRemainingTime(null);

          return handleSceneChange(scene.autoNextScene);
        }

        console.log(
          `⏳ Przywracanie odliczania... Pozostało: ${remaining} sekund`
        );

        setWaiting({
          sceneName: scene.autoNextScene ?? sceneName,
          endTime: parseInt(storedEndTime),
          notifyScreenName: scene.notifyScreenName ?? "default", // <- TUTAJ
        });

        setWaitingScreenVisible(true);
        setRemainingTime(remaining);
        return;
      }

      const endTime = now + scene.notifyTime;
      await Storage.setItem({
        key: "waitingEndTime",
        value: endTime.toString(),
      });
      await Storage.setItem({
        key: "waitingScene",
        value: scene.notifyScreenName,
      });

      console.log("📌 Poprawnie zapisano NOWY waitingEndTime:", endTime);
      console.log(
        "✅ Zapisuję waitingScene:",
        scene.notifyScreenName || scene.sceneName || "default"
      );
      setWaiting({
        sceneName: scene.autoNextScene ?? sceneName,
        endTime: endTime,
        notifyScreenName: scene.notifyScreenName ?? "default", // <- TUTAJ
      });

      setWaitingScreenVisible(true);
      setRemainingTime(scene.notifyTime);
    }

    // ✅ **Obsługa `specialScreen`**
    if (scene.specialScreen) {
      setSpecialSceneContent({
        title: scene.specialScreen.title,
        subtitle: scene.specialScreen.subtitle,
        npcKey: scene.npcKey,
        background: scene.specialScreen.background,
        nextScene: scene.autoNextScene ?? sceneName,
        autoNextDelay: scene.autoNextDelay,
        requireWait: scene.specialScreen.requireWait ?? false,
        requireWaitTime: scene.specialScreen.requireWaitTime ?? 5000,
      });
      setSpecialSceneVisible(true);
      return;
    }

    // ✅ **Obsługa `darknessUI`**
    if (scene.enableDarknessUI) {
      await Storage.setItem({ key: "darknessUI", value: "true" });
      console.log("🌑 Darkness UI włączone!");
      setDarknessUI(true);
      setRefreshKey((prev) => prev + 1);
    }

    if (scene.disableDarknessUI) {
      await Storage.removeItem({ key: "darknessUI" });
      console.log("☀️ Darkness UI wyłączone!");
      setDarknessUI(false);
      setRefreshKey((prev) => prev + 1);
    }

    // ✅ **Obsługa opcji dialogowych**
    if (scene.options) {
      setOptions(
        scene.options.map((option) => {
          const translatedText =
            translations[storedLang]?.[option.tekst] ?? option.tekst;
          console.log(`📝 Opcja: ${translatedText}`);

          return {
            tekst: translatedText,
            akcja: async () => {
              console.log("🛠 Wykonuję akcję dla opcji:", translatedText);

              if (option.akcja) {
                await option.akcja();
              }

              addMessage("GRACZ", translatedText);
              handleSceneChange(option.next);
            },
          };
        })
      );
    } else {
      console.log("⚠️ Brak opcji w scenie!");
      setOptions([]);
    }

    // ✅ **Automatyczne przejście do kolejnej sceny po opóźnieniu**
    if (scene.autoNextScene && scene.autoNextDelay) {
      setTimeout(() => {
        handleSceneChange(scene.autoNextScene!);
      }, scene.autoNextDelay);
    }

    // ✅ **Obsługa checkpointu**
    if (scene.checkpoint) {
      console.log(`💾 Zapisuję checkpoint: ${sceneName}`);
      await Storage.removeItem({ key: "checkpoint" });
      await Storage.setItem({ key: "checkpoint", value: sceneName });
    }

    // ✅ **Obsługa `deathScreen`**
    if (scene.deathScreen) {
      console.log("☠️ Wczytuję ekran śmierci:", scene.deathScreen);
      await DialogueController.setDeathScreen(scene.deathScreen);
      setDeadScreen(scene.deathScreen);
      setDead(true);
    }

    // ✅ **Obsługa zakończenia aktu**
    if (scene.endAct) {
      setEndAct(true);
      setEndActScreen(scene.endAct);
      setActFinished({
        actKey: sceneName,
        nextAct: scene.nextAct || "startgame",
      });

      // ✅ Pobranie dotychczas ukończonych aktów
      const completedActs = await Storage.getItem({ key: "completedActs" });
      let updatedCompletedActs = completedActs ? JSON.parse(completedActs) : [];

      // ✅ Pobranie aktualnego aktu zamiast nazwy sceny
      const currentAct = await Storage.getItem({ key: "currentAct" });

      if (currentAct && !updatedCompletedActs.includes(currentAct)) {
        updatedCompletedActs.push(currentAct);
        await Storage.setItem({
          key: "completedActs",
          value: JSON.stringify(updatedCompletedActs),
        });
        console.log("🎉 Ukończono akt:", currentAct);
      }
    }
  };

  const closeModalAndChangeScene = (nextScene: string) => {
    console.log("📌 Zamykam modal i przechodzę do sceny:", nextScene);
    setModalVisible(false);
    setModalContent(null); // ⬅️ Resetujemy zawartość modalu przed zmianą sceny
    setTimeout(() => {
      handleSceneChange(nextScene);
    }, 200); // ⬅️ Krótkie opóźnienie, żeby uniknąć zapętlenia
  };

  // useEffect(() => {
  //   if (waiting) {
  //     const interval = setInterval(() => {
  //       const remaining = calculateRemainingTime(waiting.endTime);
  //       setRemainingTime(remaining);

  //       if (remaining <= 0) {
  //         clearInterval(interval);
  //         setWaiting(null);
  //         handleSceneChange(waiting.sceneName);
  //       }
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }
  // }, [waiting]);

  useEffect(() => {
    if (waiting) {
      const interval = setInterval(() => {
        const now = Math.floor(Date.now() / 1000);
        const remaining = Math.max(0, Math.floor(waiting.endTime - now));

        setRemainingTime(remaining);

        if (remaining <= 0) {
          console.log("⏩ Koniec oczekiwania, przejście do kolejnej sceny.");
          clearInterval(interval);
          setWaiting(null);
          setWaitingScreenVisible(false);
          clearStoredTime(); // ⬅️ Dopiero teraz usuwamy zapisany czas!
          setTimeout(() => {
            handleSceneChange(waiting.sceneName);
          }, 500); // ⬅️ Minimalne opóźnienie, by uniknąć glitcha
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [waiting]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="limegreen" />
      </View>
    );
  }

  if (dead && deadScreen) {
    const DeathScreenComponent = deathScreensMap[deadScreen];
    if (!DeathScreenComponent)
      return <Text>Błąd: Nie znaleziono ekranu śmierci!</Text>;
    return <DeathScreenComponent onRetry={handleDeathScreenPress} />;
  }

  if (endAct && endActScreen && actFinished) {
    const EndActScreenComponent = endActScreensMap[endActScreen];
    if (!EndActScreenComponent)
      return <Text>Błąd: Nie znaleziono ekranu końca aktu!</Text>;

    return (
      <EndActScreenComponent
        onContinue={async () => {
          await stopSound();
          await Storage.setItem({
            key: "currentAct",
            value: actFinished.nextAct,
          });
          router.replace(`/${actFinished.nextAct}` as Href<string>);
        }}
      />
    );
  }

  return (
    <ImageBackground
      source={require("../../../assets/images/INTRO.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <Image
        source={require("@/assets/images/refleks.png")}
        resizeMode="contain"
        style={styles.overlayImage}
      />

      <StatusBar hidden />

      <ActSwitcher />
      <GameMenu onReset={""} />

      <WaitingScreenOverlay
        visible={waitingScreenVisible}
        timeLeft={remainingTime ?? 0}
        notifyScreenName={waiting?.notifyScreenName ?? "default"}
      />

      <SpecialSceneOverlay
        visible={specialSceneVisible}
        title={specialSceneContent?.title ?? ""}
        subtitle={specialSceneContent?.subtitle}
        npcKey={specialSceneContent?.npcKey} // ✅ Teraz przekazujemy npcKey!
        background={specialSceneContent?.background}
        autoNextDelay={specialSceneContent?.autoNextDelay}
        requireWait={specialSceneContent?.requireWait}
        requireWaitTime={specialSceneContent?.requireWaitTime}
        onClose={() => {
          setSpecialSceneVisible(false);
          handleSceneChange(specialSceneContent?.nextScene || "startgame");
        }}
      />

      <View style={styles.contentContainer}>
        <View style={styles.dialogueContainer}>
          <ScrollView ref={scrollRef}>
            {dialogue.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.messageBlock,
                  msg.autor === "GRACZ" && styles.playerMessageBlock,
                ]}
              >
                {msg.autor === "NPC" && msg.npcKey && npcData[msg.npcKey] && (
                  <View>
                    {/* Tytuł NPC nad awatarem */}
                    <Text style={styles.messageTitle}>
                      {
                        translations[jezyk][
                          npcData[msg.npcKey]
                            .nameKey as keyof (typeof translations)[jezyk]
                        ]
                      }
                    </Text>

                    {/* Awatar i tekst w jednej linii */}
                    <View style={styles.messageContent}>
                      <Image
                        source={npcData[msg.npcKey].avatar}
                        style={styles.avatar}
                      />
                      <Text
                        style={[
                          styles.messageText,
                          msg.autor === "GRACZ" && styles.playerMessageText,
                        ]}
                      >
                        {msg.tekst}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Jeśli wiadomość od gracza – nie ma awatara */}
                {msg.autor === "GRACZ" && (
                  <Text style={[styles.messageText, styles.playerMessageText]}>
                    {msg.tekst}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
          {waiting && remainingTime !== null && (
            <Text style={styles.waitingText}>
              Oczekiwanie: {Math.floor(remainingTime / 60)}m{" "}
              {remainingTime % 60}s
            </Text>
          )}
        </View>

        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={async () => {
                await playChoiceSound(); // 🔊 Odtwarzamy dźwięk
                option.akcja(); // 🛠️ Wykonujemy akcję
              }}
              style={styles.choiceButton}
            >
              <Text style={styles.choiceButtonText}>{option.tekst}</Text>
            </TouchableOpacity>
          ))}
          <BannerAd
            unitId={optionsBanner}
            size={BannerAdSize.ADAPTIVE_BANNER}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },

  // Pojemnik na cały kontent pod menu
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 50,
  },

  overlayImage: {
    position: "absolute",
    width: width * 1,
    height: height * 0.5,
    zIndex: 1,
  },

  // Kontener na dialogi
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

  // Wiadomości NPC / GRACZ
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

  // Nagłówek wiadomości NPC (Tytuł NPC nad awatarem)
  messageHeader: {
    flexDirection: "column", // Tytuł nad awatarem
    alignItems: "flex-start",
    marginBottom: 4,
  },

  messageTitle: {
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: 23,
    marginBottom: 4, // Dystans między tytułem a awatarem
  },

  // Awatar i wiadomość w jednej linii
  messageContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 4,
    marginRight: 8, // Dystans między awatarem a tekstem
    marginTop: 10,
  },

  messageText: {
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: 25,
    flexShrink: 1, // Zapobiega "rozciąganiu" i zapewnia lepsze zawijanie tekstu
  },

  // Oczekiwanie na czas
  waitingText: {
    marginTop: 10,
    textAlign: "center",
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: 18,
  },

  // Opcje odpowiedzi
  optionsContainer: {
    paddingHorizontal: 10,
    marginBottom: 30,
    alignItems: "center",
  },

  choiceButton: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "black",
    borderColor: "#219653",
    borderWidth: 4,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },

  choiceButtonText: {
    color: "#219653",
    fontFamily: "VT323Regular",
    fontSize: 24,
  },

  // Przycisk MENU – nad wszystkim!
  menuContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
});
