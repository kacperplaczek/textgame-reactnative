import { useEffect, useState, useCallback, useRef } from "react";
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
import { getScenes } from "@/scenario/scenariuszAkt3";
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
import useChoiceSound from "@/lib/dialogue/useChoiceSounds";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

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
  const [darknessUI, setDarknessUI] = useState(false);
  const [waitingScreenVisible, setWaitingScreenVisible] = useState(false);
  const optionsBanner =
    Platform.OS === "android"
      ? "ca-app-pub-4136563182662861/8460997846" // android
      : "ca-app-pub-4136563182662861/4480470362"; // ios
  const getStyles = () => (darknessUI ? stylesDarkness : styles);

  useEffect(() => {
    console.log("🔄 Sprawdzanie stanu gry...");
    console.log("📌 Aktualne tłumaczenia:", translations[jezyk]);
    console.log("📌 Aktualny język:", jezyk);
    console.log("📌 Opcje wyboru:", options);
  }, [refreshKey]);

  useEffect(() => {
    const loadLang = async () => {
      const lang = await getCurrentLanguage();
      setJezyk(lang);
    };
    loadLang();
  }, []);

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Brak uprawnień do audio!");
      }
    };

    getPermissions();
  }, []);

  async function clearStoredTime() {
    try {
      await Storage.removeItem({ key: "waitingEndTime" });
      await Storage.removeItem({ key: "waitingScene" });
      console.log("✅ Zapisany czas został usunięty.");
    } catch (error) {
      console.error("❌ Błąd podczas usuwania zapisanego czasu:", error);
    }
  }

  const stopAllSounds = async () => {
    try {
      await Audio.setIsEnabledAsync(false); // Wyłącza wszystkie dźwięki
      await Audio.setIsEnabledAsync(true); // Włącza dźwięki ponownie
    } catch (e) {
      console.error("Błąd zatrzymywania dźwięków:", e);
    }
  };

  //? Zapisywanie dialogów
  const saveDialogue = async (dialogue: void) => {
    try {
      const aktKey = "akt1";
      await Storage.setItem({
        key: `dialogue_${aktKey}`,
        value: JSON.stringify(dialogue),
      });
    } catch (error) {
      console.error("Błąd zapisu historii dialogów:", error);
    }
  };

  //? Sprawdzanie kolorystyki UI.
  useEffect(() => {
    const checkDarknessUI = async () => {
      const storedValue = await Storage.getItem({ key: "darknessUI" });

      console.log("🌑 Sprawdzam DarknessUI w Storage:", storedValue);

      setDarknessUI(storedValue === "true"); // 🔥 Zapewniamy, że ustawiamy poprawnie true/false
    };

    checkDarknessUI();
  }, [refreshKey]); // 🔄 UI się odświeży po zmianie `refreshKey`

  const playChoiceSound = useChoiceSound(); // 🎵 Pobieramy funkcję

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
    const currentAct =
      (await Storage.getItem({ key: "currentAct" })) || "akt-1";
    const storedScene = await DialogueController.getScene();

    console.log("📌 currentAct:", currentAct);
    console.log("📌 gameStarted:", started);
    console.log("📌 storedScene:", storedScene);

    if (started === "true") {
      setHasStartedGame(true);
    } else {
      setHasStartedGame(false);
    }

    // 🟢 Jeśli nie ma zapisanego `storedScene` lub pochodzi z innego aktu – zaczynamy nowy akt
    if (!storedScene || !storedScene.startsWith("akt3_")) {
      console.log("🔄 Ustawiam domyślną scenę: rozpoczecie_aktu");
      setCurrentScene("rozpoczecie_aktu");
      handleSceneChange("rozpoczecie_aktu");
    } else {
      // 🟢 Jeśli `storedScene` istnieje i należy do nowego aktu, kontynuujemy
      console.log("📌 Przywracam zapisaną scenę:", storedScene);
      setCurrentScene(storedScene);
      handleSceneChange(storedScene);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const checkWaitingState = async () => {
      console.log("🔍 Sprawdzanie stanu oczekiwania...");

      const storedEndTime = await Storage.getItem({ key: "waitingEndTime" });
      const storedScene = await Storage.getItem({ key: "waitingScene" });

      console.log("📌 Odczytane wartości:", { storedEndTime, storedScene });

      if (storedEndTime && storedScene) {
        const endTime = parseInt(storedEndTime, 10);
        const now = Math.floor(Date.now() / 1000);
        let remaining = endTime - now;

        if (remaining <= 0) {
          console.log(
            "✅ Czas minął! Usuwam dane z pamięci i zmieniam scenę..."
          );

          await Storage.removeItem({ key: "waitingEndTime" });
          await Storage.removeItem({ key: "waitingScene" });

          setWaiting(null);
          setWaitingScreenVisible(false);
          setRemainingTime(null);

          // ❗️Zapewniamy, że nie ustawi nowego licznika!
          setTimeout(() => {
            handleSceneChange(storedScene);
          }, 500);

          return;
        } else {
          console.log(
            `⏳ Przywracanie odliczania... Pozostało: ${remaining} sekund`
          );
          setWaiting({ sceneName: storedScene, endTime });
          setWaitingScreenVisible(true);
          setRemainingTime(remaining);
        }
      } else {
        console.log("🔄 Brak oczekiwania, resetowanie UI...");
        setWaiting(null);
        setWaitingScreenVisible(false);
        setRemainingTime(null);
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
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [dialogue]);

  const addMessage = (
    autor: "NPC" | "GRACZ",
    tekst: string,
    npcKey?: NpcKey
  ) => {
    setDialogue((prev) => {
      const updatedDialogue = [...prev, { autor, tekst, npcKey }];
      saveDialogue(updatedDialogue);
      return updatedDialogue;
    });
  };

  const handleDeathScreenPress = async () => {
    const lastCheckpoint = await Storage.getItem({ key: "checkpoint" });

    console.log("📌 Przywracanie checkpointu:", lastCheckpoint);

    if (lastCheckpoint) {
      // ✅ Resetujemy stan gry przed zmianą sceny
      setDead(false);
      setDeadScreen(null);
      setDialogue([]);
      setOptions([]);

      await stopSound();
      await DialogueController.clearAfterCheckpoint(lastCheckpoint);
      await DialogueController.clearDeathScreen();

      setCurrentScene(lastCheckpoint);

      // ✅ Krótkie opóźnienie, by uniknąć glitcha z ekranem śmierci
      setTimeout(() => {
        handleSceneChange(lastCheckpoint);
      }, 200);
    } else {
      console.log("❌ Brak checkpointu! Powrót do początku.");
      setDead(false);
      setDeadScreen(null);
      setDialogue([]);
      setOptions([]);
      setCurrentScene("rozpoczecie_aktu");

      setTimeout(() => {
        handleSceneChange("rozpoczecie_aktu");
      }, 200);
    }
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
      const now = Math.floor(Date.now() / 1000); // Aktualny czas w sekundach

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

          // **PRZECHODZIMY OD RAZU DO KOLEJNEJ SCENY**
          return handleSceneChange(scene.autoNextScene);
        }

        console.log(
          `⏳ Przywracanie odliczania... Pozostało: ${remaining} sekund`
        );

        // **Ustawiamy czas pozostały do końca odliczania**
        setWaiting({
          sceneName: scene.autoNextScene ?? sceneName,
          endTime: endTime,
          notifyScreenName: scene.notifyScreenName ?? "default",
        });

        setWaitingScreenVisible(true);
        setRemainingTime(remaining);
        return;
      }

      // **Tylko jeśli `waitingEndTime` nie było zapisane – ustawiamy nowy czas**
      if (!storedEndTime) {
        const endTime = now + scene.notifyTime;
        await Storage.setItem({
          key: "waitingEndTime",
          value: endTime.toString(),
        });
        await Storage.setItem({
          key: "waitingScene",
          value: scene.autoNextScene,
        });

        console.log("📌 Poprawnie zapisano NOWY waitingEndTime:", endTime);

        setWaiting({
          sceneName: scene.autoNextScene ?? sceneName,
          endTime: endTime,
          notifyScreenName: scene.notifyScreenName ?? "default",
        });
        setWaitingScreenVisible(true);
        setRemainingTime(scene.notifyTime);
      }
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
    }
  };

  // const handleSceneChange = async (sceneName: string) => {
  //   const plec = await Storage.getItem({ key: "plec" });
  //   const scenes = getScenes(translations[jezyk], plec);
  //   const scene = scenes[sceneName];

  //   console.log(`Ustawiono język na : ${jezyk}`);

  //   if (!scene) return;

  //   console.log(`🎬 Zmiana sceny: ${sceneName}`);

  //   await stopSound();

  //   setOptions([]);

  //   if (scene.sound) {
  //     await playSound(scene.sound, scene.soundPlayLoop ?? false);
  //   }

  //   setCurrentScene(sceneName);
  //   await DialogueController.setScene(sceneName);

  //   if (scene.notifyTime) {
  //     const storedEndTime = await Storage.getItem({ key: "waitingEndTime" });
  //     const now = Math.floor(Date.now() / 1000); // Pobierz aktualny czas w sekundach

  //     if (storedEndTime) {
  //       const endTime = parseInt(storedEndTime, 10);
  //       const remaining = endTime - now;

  //       if (remaining <= 0) {
  //         console.log(
  //           "✅ Czas minął! Usuwam dane z pamięci i zmieniam scenę..."
  //         );
  //         await Storage.removeItem({ key: "waitingEndTime" });
  //         await Storage.removeItem({ key: "waitingScene" });

  //         setWaiting(null);
  //         setWaitingScreenVisible(false);
  //         setRemainingTime(null);

  //         return handleSceneChange(scene.autoNextScene);
  //       }

  //       console.log(
  //         `⏳ Przywracanie odliczania... Pozostało: ${remaining} sekund`
  //       );

  //       setWaiting({
  //         sceneName: scene.autoNextScene ?? sceneName,
  //         endTime: parseInt(storedEndTime),
  //         notifyScreenName: scene.notifyScreenName ?? "default", // <- TUTAJ
  //       });

  //       setWaitingScreenVisible(true);
  //       setRemainingTime(remaining);
  //       return;
  //     }

  //     const endTime = now + scene.notifyTime;
  //     await Storage.setItem({
  //       key: "waitingEndTime",
  //       value: endTime.toString(),
  //     });
  //     await Storage.setItem({
  //       key: "waitingScene",
  //       value: scene.autoNextScene,
  //     });

  //     console.log("📌 Poprawnie zapisano NOWY waitingEndTime:", endTime);

  //     setWaiting({
  //       sceneName: scene.autoNextScene ?? sceneName,
  //       endTime: endTime,
  //       notifyScreenName: scene.notifyScreenName ?? "default", // <- TUTAJ
  //     });

  //     setWaitingScreenVisible(true);
  //     setRemainingTime(scene.notifyTime);
  //   }

  //   // if (scene.notifyTime) {
  //   //   const storedEndTime = await Storage.getItem({ key: "waitingEndTime" });
  //   //   const now = Math.floor(Date.now() / 1000); // Pobierz aktualny czas w sekundach

  //   //   if (storedEndTime) {
  //   //     const endTime = parseInt(storedEndTime, 10);
  //   //     const remaining = endTime - now;

  //   //     if (remaining <= 0) {
  //   //       console.log(
  //   //         "✅ Czas minął! Usuwam dane z pamięci i zmieniam scenę..."
  //   //       );
  //   //       await Storage.removeItem({ key: "waitingEndTime" });
  //   //       await Storage.removeItem({ key: "waitingScene" });

  //   //       setWaiting(null);
  //   //       setWaitingScreenVisible(false);
  //   //       setRemainingTime(null);

  //   //       // ❗️BLOKADA – nie uruchamiamy notifyTime ponownie!
  //   //       return handleSceneChange(scene.autoNextScene);
  //   //     }

  //   //     console.log(
  //   //       `⏳ Przywracanie odliczania... Pozostało: ${remaining} sekund`
  //   //     );

  //   //     setWaiting({
  //   //       sceneName: scene.autoNextScene ?? sceneName,
  //   //       endTime: parseInt(storedEndTime),
  //   //       notifyScreenName: scene.notifyScreenName ?? "default",
  //   //     });

  //   //     setWaitingScreenVisible(true);
  //   //     setRemainingTime(remaining);
  //   //     return;
  //   //   }

  //   //   // ❗️ZMIANA: Nowy czas ustawiamy TYLKO, jeśli `waitingEndTime` nie istniało przed wywołaniem funkcji!
  //   //   if (!storedEndTime) {
  //   //     const endTime = now + scene.notifyTime;
  //   //     await Storage.setItem({
  //   //       key: "waitingEndTime",
  //   //       value: endTime.toString(),
  //   //     });
  //   //     await Storage.setItem({
  //   //       key: "waitingScene",
  //   //       value: scene.autoNextScene,
  //   //     });

  //   //     console.log("📌 Poprawnie zapisano NOWY waitingEndTime:", endTime);

  //   //     // 🔄 Ustawiamy ekran oczekiwania
  //   //     setWaiting({
  //   //       sceneName: scene.autoNextScene ?? sceneName,
  //   //       endTime: endTime,
  //   //     });
  //   //     setWaitingScreenVisible(true);
  //   //     setRemainingTime(scene.notifyTime);
  //   //   }
  //   // }

  //   if (scene.enableDarknessUI) {
  //     await Storage.setItem({ key: "darknessUI", value: "true" });
  //     console.log("🌑 Darkness UI włączone!");
  //     setDarknessUI(true);
  //     setRefreshKey((prev) => prev + 1); // 🔄 Wymusza odświeżenie UI
  //   }

  //   if (scene.disableDarknessUI) {
  //     await Storage.removeItem({ key: "darknessUI" });
  //     console.log("☀️ Darkness UI wyłączone!");
  //     setDarknessUI(false);
  //     setRefreshKey((prev) => prev + 1); // 🔄 Wymusza odświeżenie UI
  //   }

  //   // ❗️Dodaj krótki timeout, żeby ScrollView miał czas na aktualizację
  //   setTimeout(() => {
  //     scrollRef.current?.scrollToEnd({ animated: true });
  //   }, 100);

  //   // ✅ Sprawdzamy warunki przed przejściem do kolejnej sceny
  //   if (sceneName === "start_procedure") {
  //     const thrust = await Storage.getItem({ key: "thrustSetting" }); // Minimalny czy maksymalny?
  //     const powerCheck = await Storage.getItem({ key: "powerCheck" }); // Czy gracz sprawdził zasilanie?

  //     console.log(
  //       `📌 Ustawienia gracza: ciąg=${thrust}, zasilanie=${powerCheck}`
  //     );

  //     if (thrust !== "minimal" || powerCheck !== "checked") {
  //       console.log("❌ Zły wybór - śmierć!");
  //       setDead(true);
  //       setDeadScreen("explosion"); // Nazwa Twojego deathscreen
  //       return;
  //     }
  //   }

  //   // 🖼️ Jeśli scena ma ekran specjalny (np. rozmowę w pełnym ekranie)
  //   if (scene.specialScreen) {
  //     setSpecialSceneContent({
  //       title: scene.specialScreen.title,
  //       subtitle: scene.specialScreen.subtitle,
  //       npcKey: scene.npcKey, // ✅ Pobieramy NPC!
  //       background: scene.specialScreen.background,
  //       nextScene: scene.autoNextScene ?? sceneName,
  //       autoNextDelay: scene.autoNextDelay,
  //       requireWait: scene.specialScreen.requireWait ?? false,
  //       requireWaitTime: scene.specialScreen.requireWaitTime ?? 5000,
  //     });
  //     setSpecialSceneVisible(true);
  //     return;
  //   }

  //   // 📌 Normalne przejście sceny
  //   if (!scene.waitTime) {
  //     const tekst =
  //       typeof scene.tekst === "function" ? scene.tekst() : scene.tekst;
  //     addMessage("NPC", tekst, scene.npcKey);
  //   }

  //   if (scene.checkpoint) {
  //     console.log(`💾 Zapisuję checkpoint: ${sceneName}`);
  //     await Storage.removeItem({ key: "checkpoint" }); // Usunięcie starego
  //     await Storage.setItem({ key: "checkpoint", value: sceneName });
  //   }

  //   // 🎭 **Obsługa opcji odpowiedzi**
  //   if (scene.options) {
  //     setOptions(
  //       scene.options.map((option) => ({
  //         tekst: option.tekst,
  //         akcja: async () => {
  //           console.log("🛠 Wykonuję akcję dla opcji:", option.tekst);

  //           if (option.akcja) {
  //             await option.akcja();
  //           }

  //           addMessage("GRACZ", option.tekst);
  //           handleSceneChange(option.next);
  //         },
  //       }))
  //     );
  //   } else {
  //     setOptions([]);
  //   }

  //   if (scene.autoNextScene && scene.autoNextDelay) {
  //     setTimeout(() => {
  //       handleSceneChange(scene.autoNextScene!);
  //     }, scene.autoNextDelay);
  //   }

  //   if (scene.checkpoint) {
  //     await DialogueController.setCheckpoint(sceneName);
  //   }

  //   if (scene.deathScreen) {
  //     console.log("☠️ Wczytuję ekran śmierci:", scene.deathScreen);
  //     await DialogueController.setDeathScreen(scene.deathScreen);
  //     setDeadScreen(scene.deathScreen);
  //     setDead(true);
  //   }

  //   if (scene.endAct) {
  //     setEndAct(true);
  //     setEndActScreen(scene.endAct);
  //     setActFinished({
  //       actKey: sceneName,
  //       nextAct: scene.nextAct || "startgame",
  //     });
  //   }
  // };

  useEffect(() => {
    const checkDarknessUI = async () => {
      const storedValue = await Storage.getItem({ key: "darknessUI" });
      setDarknessUI(!!storedValue);
    };

    checkDarknessUI();
  }, []);

  const closeModalAndChangeScene = (nextScene: string) => {
    console.log("📌 Zamykam modal i przechodzę do sceny:", nextScene);
    setModalVisible(false);
    setModalContent(null); // ⬅️ Resetujemy zawartość modalu przed zmianą sceny
    setTimeout(() => {
      handleSceneChange(nextScene);
    }, 200); // ⬅️ Krótkie opóźnienie, żeby uniknąć zapętlenia
  };

  useEffect(() => {
    if (waiting) {
      const interval = setInterval(async () => {
        const now = Math.floor(Date.now() / 1000);
        const remaining = waiting.endTime - now;

        if (remaining > 0) {
          setRemainingTime(remaining);
        } else {
          console.log("✅ Czas odliczania dobiegł końca, zmiana sceny!");
          clearInterval(interval);
          await Storage.removeItem({ key: "waitingEndTime" });
          await Storage.removeItem({ key: "waitingScene" });
          setWaiting(null);
          setWaitingScreenVisible(false);
          handleSceneChange(waiting.sceneName);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [waiting]);

  if (isLoading) {
    return (
      <View style={getStyles().loadingContainer}>
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

  return darknessUI ? (
    <View style={getStyles().background}>
      <StatusBar hidden />
      <GameMenu />

      <WaitingScreenOverlay
        visible={waitingScreenVisible}
        timeLeft={remainingTime ?? 0}
        notifyScreenName={waiting?.notifyScreenName ?? "default"}
      />

      <SpecialSceneOverlay
        visible={specialSceneVisible}
        title={specialSceneContent?.title ?? ""}
        subtitle={specialSceneContent?.subtitle}
        npcKey={specialSceneContent?.npcKey}
        background={specialSceneContent?.background}
        autoNextDelay={specialSceneContent?.autoNextDelay}
        requireWait={specialSceneContent?.requireWait}
        requireWaitTime={specialSceneContent?.requireWaitTime}
        onClose={() => {
          setSpecialSceneVisible(false);
          handleSceneChange(specialSceneContent?.nextScene || "startgame");
        }}
      />

      <View style={getStyles().contentContainer}>
        <View style={getStyles().dialogueContainer}>
          <ScrollView ref={scrollRef}>
            {dialogue.map((msg, index) => (
              <View
                key={index}
                style={[
                  getStyles().messageBlock,
                  msg.autor === "GRACZ" && getStyles().playerMessageBlock,
                ]}
              >
                {msg.autor === "NPC" && msg.npcKey && npcData[msg.npcKey] && (
                  <View style={getStyles().messageHeader}>
                    <Image
                      source={npcData[msg.npcKey].avatar}
                      style={getStyles().avatar}
                    />
                    <Text style={getStyles().messageTitle}>
                      {
                        translations[jezyk][
                          npcData[msg.npcKey]
                            .nameKey as keyof (typeof translations)[jezyk]
                        ]
                      }
                    </Text>
                  </View>
                )}
                <Text
                  style={[
                    getStyles().messageText,
                    msg.autor === "GRACZ" && getStyles().playerMessageText,
                  ]}
                >
                  {msg.tekst}
                </Text>
              </View>
            ))}
          </ScrollView>
          {waiting && remainingTime !== null && (
            <Text style={getStyles().waitingText}>
              Oczekiwanie: {Math.floor(remainingTime / 60)}m{" "}
              {remainingTime % 60}s
            </Text>
          )}
        </View>

        <View style={getStyles().optionsContainer}>
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
    </View>
  ) : (
    <ImageBackground
      source={require("../../../assets/images/bg_komputer.png")}
      style={getStyles().background}
      resizeMode="cover"
    >
      <StatusBar hidden />
      <GameMenu onReset={undefined} />

      <WaitingScreenOverlay
        visible={waitingScreenVisible}
        timeLeft={remainingTime ?? 0}
        notifyScreenName={waiting?.notifyScreenName ?? "default"}
      />

      <SpecialSceneOverlay
        visible={specialSceneVisible}
        title={specialSceneContent?.title ?? ""}
        subtitle={specialSceneContent?.subtitle}
        npcKey={specialSceneContent?.npcKey}
        background={specialSceneContent?.background}
        autoNextDelay={specialSceneContent?.autoNextDelay}
        requireWait={specialSceneContent?.requireWait}
        requireWaitTime={specialSceneContent?.requireWaitTime}
        onClose={() => {
          setSpecialSceneVisible(false);
          handleSceneChange(specialSceneContent?.nextScene || "startgame");
        }}
      />

      <View style={getStyles().contentContainer}>
        <View style={getStyles().dialogueContainer}>
          <ScrollView ref={scrollRef}>
            {dialogue.map((msg, index) => (
              <View
                key={index}
                style={[
                  getStyles().messageBlock,
                  msg.autor === "GRACZ" && getStyles().playerMessageBlock,
                ]}
              >
                {msg.autor === "NPC" && msg.npcKey && npcData[msg.npcKey] && (
                  <View style={getStyles().messageHeader}>
                    <Image
                      source={npcData[msg.npcKey].avatar}
                      style={getStyles().avatar}
                    />
                    <Text style={getStyles().messageTitle}>
                      {
                        translations[jezyk][
                          npcData[msg.npcKey]
                            .nameKey as keyof (typeof translations)[jezyk]
                        ]
                      }
                    </Text>
                  </View>
                )}
                <Text
                  style={[
                    getStyles().messageText,
                    msg.autor === "GRACZ" && getStyles().playerMessageText,
                  ]}
                >
                  {msg.tekst}
                </Text>
              </View>
            ))}
          </ScrollView>
          {waiting && remainingTime !== null && (
            <Text style={getStyles().waitingText}>
              Oczekiwanie: {Math.floor(remainingTime / 60)}m{" "}
              {remainingTime % 60}s
            </Text>
          )}
        </View>

        <View style={getStyles().optionsContainer}>
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
const stylesDarkness = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
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

  // Kontener na dialogi
  dialogueContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderWidth: 4,
    borderRadius: 10,
    marginTop: 40,
    marginHorizontal: 10,
    marginBottom: 10,
  },

  // Wiadomości NPC / GRACZ
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
  },

  choiceButton: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "black",
    borderColor: "black",
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
  },

  choiceButton: {
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
