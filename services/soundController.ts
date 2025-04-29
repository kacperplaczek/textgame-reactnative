import { Audio } from "expo-av";

// Ścieżki do plików
const clickSoundAsset = require("@/assets/sounds/choice.wav");
const pustyniaAsset = require("@/assets/sounds/pustynia.mp3");
const ringSoundAsset = require("@/assets/sounds/phone-call.mp3");

let clickSound: Audio.Sound | null = null;
let backgroundMusic: Audio.Sound | null = null;
let isBackgroundMusicPlaying = false;

// Inicjalizacja kliknięcia
async function loadClickSound() {
  if (!clickSound) {
    const { sound } = await Audio.Sound.createAsync(clickSoundAsset);
    clickSound = sound;
  }
}

// Odtwarzanie kliknięcia
export async function playClickSound() {
  try {
    await loadClickSound();
    await clickSound?.replayAsync();
  } catch (error) {
    console.error("❌ Błąd odtwarzania kliknięcia:", error);
  }
}

// Inicjalizacja i kontrola muzyki
export async function initializeBackgroundMusic() {
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
    await initializeBackgroundMusic();
    const status = await backgroundMusic?.getStatusAsync();
    if (status && !status.isPlaying) {
      await backgroundMusic?.playAsync();
    }
  } catch (error) {
    console.error("❌ Błąd włączania muzyki:", error);
  }
}

export async function pauseBackgroundMusic() {
  try {
    const status = await backgroundMusic?.getStatusAsync();
    if (status?.isPlaying) {
      await backgroundMusic?.pauseAsync();
      isBackgroundMusicPlaying = false;
    }
  } catch (error) {
    console.error("❌ Błąd pauzy muzyki:", error);
  }
}

export async function resumeBackgroundMusic() {
  try {
    const status = await backgroundMusic?.getStatusAsync();
    if (status && !status.isPlaying && !isBackgroundMusicPlaying) {
      await backgroundMusic?.playAsync();
      isBackgroundMusicPlaying = true;
    }
  } catch (error) {
    console.error("❌ Błąd wznowienia muzyki:", error);
  }
}

let ringSoundRef: Audio.Sound | null = null;

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

export async function playSound(soundPath: any, loop: boolean = false) {
  try {
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
