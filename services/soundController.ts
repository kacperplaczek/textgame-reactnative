import { Audio } from "expo-av";
import Storage from "expo-storage";

// Ścieżki do plików
const clickSoundAsset = require("@/assets/sounds/choice.wav");
const pustyniaAsset = require("@/assets/sounds/pustynia.mp3");
const ringSoundAsset = require("@/assets/sounds/phone-call.mp3");

let clickSound: Audio.Sound | null = null;
let backgroundMusic: Audio.Sound | null = null;
let ringSoundRef: Audio.Sound | null = null;

// Flags
let soundEffectsEnabled = true;
let musicEnabled = true;

// --- Inicjalizacja kliknięcia ---
async function loadClickSound() {
  if (!clickSound) {
    const { sound } = await Audio.Sound.createAsync(clickSoundAsset);
    clickSound = sound;
  }
}

// --- Klik ---
export async function playClickSound() {
  try {
    if (!soundEffectsEnabled) return;
    await loadClickSound();
    await clickSound?.replayAsync();
  } catch (error) {
    console.error("❌ Błąd odtwarzania kliknięcia:", error);
  }
}

// --- Muzyka tła ---
async function initializeBackgroundMusic() {
  if (!backgroundMusic) {
    const { sound } = await Audio.Sound.createAsync(pustyniaAsset, {
      shouldPlay: false,
      isLooping: true,
    });
    backgroundMusic = sound;
  }
}

export async function playBackgroundMusic() {
  try {
    if (!musicEnabled) return;
    await initializeBackgroundMusic();
    const status = await backgroundMusic?.getStatusAsync();
    if (status && !status.isPlaying) {
      await backgroundMusic?.playAsync();
    }
  } catch (error) {
    console.error("❌ Błąd odtwarzania muzyki:", error);
  }
}

export async function pauseBackgroundMusic() {
  try {
    const status = await backgroundMusic?.getStatusAsync();
    if (status?.isPlaying) {
      await backgroundMusic?.pauseAsync();
    }
  } catch (error) {
    console.error("❌ Błąd pauzy muzyki:", error);
  }
}

export async function resumeBackgroundMusic() {
  try {
    if (!musicEnabled) return;
    const status = await backgroundMusic?.getStatusAsync();
    if (status && !status.isPlaying) {
      await backgroundMusic?.playAsync();
    }
  } catch (error) {
    console.error("❌ Błąd wznowienia muzyki:", error);
  }
}

// --- Dzwonki ---
export async function playRingSound() {
  try {
    if (!ringSoundRef) {
      const { sound } = await Audio.Sound.createAsync(ringSoundAsset, {
        shouldPlay: true,
        isLooping: true,
      });
      ringSoundRef = sound;
    } else {
      const status = await ringSoundRef.getStatusAsync();
      if (!status.isPlaying) {
        await ringSoundRef.playAsync();
      }
    }
  } catch (e) {
    console.error("❌ Błąd odtwarzania dzwonka:", e);
  }
}

export async function stopRingSound() {
  try {
    if (ringSoundRef) {
      await ringSoundRef.stopAsync();
      await ringSoundRef.unloadAsync();
      ringSoundRef = null;
    }
  } catch (e) {
    console.error("❌ Błąd zatrzymywania dzwonka:", e);
  }
}

// --- Odtwarzanie dowolnego dźwięku ---
export async function playSound(soundPath: any, loop: boolean = false) {
  try {
    if (!soundEffectsEnabled) return null;
    const { sound } = await Audio.Sound.createAsync(soundPath, {
      shouldPlay: true,
      isLooping: loop,
    });
    await sound.playAsync();
    return sound;
  } catch (e) {
    console.error("❌ Błąd odtwarzania dźwięku:", e);
    return null;
  }
}

// --- 🔥 Dynamiczne ustawienia 🔥 ---
export async function setMusicEnabled(enabled: boolean) {
  musicEnabled = enabled;
  await Storage.setItem({ key: "canPlayMusic", value: enabled ? "on" : "off" });

  if (enabled) {
    await resumeBackgroundMusic();
  } else {
    await pauseBackgroundMusic();
  }
}

export function isMusicEnabled() {
  return musicEnabled;
}

export async function setSoundEffectsEnabled(enabled: boolean) {
  soundEffectsEnabled = enabled;
  await Storage.setItem({ key: "soundEnabled", value: enabled ? "on" : "off" });

  // Kliknięcia są kontrolowane przez flagę - nie trzeba ich pauzować fizycznie
}

export function isSoundEnabled() {
  return soundEffectsEnabled;
}

// --- Ładowanie zapisanych ustawień ---
export async function loadSoundSettings() {
  const musicSetting = await Storage.getItem({ key: "canPlayMusic" });
  const soundSetting = await Storage.getItem({ key: "soundEnabled" });

  musicEnabled = musicSetting !== "off";
  soundEffectsEnabled = soundSetting !== "off";

  if (!musicEnabled) {
    await pauseBackgroundMusic();
  } else {
    await resumeBackgroundMusic();
  }
}
