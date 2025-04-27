import { Audio } from "expo-av";
import { soundsMap } from "../lib/settings/soundMap";

let activeSounds: Audio.Sound[] = [];

export const playSound = async (key: string, loop: boolean = false) => {
  try {
    console.log(`🔊 playSound -> key: ${key}, loop: ${loop}`);

    if (!soundsMap[key]) {
      console.warn(`🚨 Dźwięk ${key} nie znaleziony w soundMap`);
      return;
    }

    // Zatrzymaj wszystko co leci
    await stopAllSounds();

    const { sound } = await Audio.Sound.createAsync(soundsMap[key]);
    activeSounds.push(sound);

    await sound.setIsLoopingAsync(loop);
    await sound.playAsync();

    console.log("✅ Dźwięk gra");
  } catch (err) {
    console.error("❌ Błąd odtwarzania dźwięku:", err);
  }
};

export const stopAllSounds = async () => {
  try {
    console.log("🛑 Zatrzymuję wszystkie dźwięki...");
    for (const sound of activeSounds) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
    activeSounds = [];
    console.log("✅ Wszystkie dźwięki zatrzymane");
  } catch (err) {
    console.error("❌ Błąd zatrzymywania dźwięków:", err);
  }
};
