import { NpcKey } from "@/lib/dialogue/NPCData";

type SceneType = {
  npcKey?: NpcKey;
  tekst?: () => string | Promise<string>;
  options?: { tekst: string; next: string; akcja?: () => Promise<void> }[];
  checkpoint?: boolean;
  deathScreen?: string;
  options?: {
    tekst: string;
    next: string;
    akcja?: string;
  }[];
  autoNextScene?: string;
  autoNextDelay?: number;
  waitTime?: number;
  enableNotification?: boolean;
  endAct?: string; // Informacja jaki akt został zakończony
  nextAct?: string; // Informacja jaki akt ma być następny
  waitTimeScreen?: boolean;
  akcja?: () => Promise<void>; // ✅ Teraz poprawne
  waitTimeScreenName?: string;
  sound?: string;
  soundPlayLoop?: boolean;

  // Służy do ekranów informujących o połączeniach przychodzących.
  specialScreen?: {
    npcKey?: string;
    title: string;
    subtitle?: string;
    image?: string;
    background?: string;
    requireWait?: boolean;
    requireWaitTime?: number;
  };

  instantResponse?: string;
  notifyTime?: number; // ⏳ Czas oczekiwania w sekundach
  notifyScreen?: boolean; // 🖥️ Czy pokazać ekran oczekiwania?
  notifyScreenName?: string; // 📌 Nazwa ekranu oczekiwania
  enableNotification?: boolean; // 🔔 Czy wysłać powiadomienie push?

  // W obu przypadkach użyj tylko 'true' lub w ogóle nie oddawaj tego do kodu...
  enableDarknessUI?: boolean; // Czy ma w danej scenie odpalić całkowitą ciemność w UI?
  disableDarknessUI?: boolean; // Czy ma w danej scenie usunąć zapis o całkowitej ciemności i tym samym wyłączyć całkowitą ciemność ?

  clearHistory?: boolean; // Czyszczenie poprzednich wiadomości z okna dialogowego, daj na true lub w ogóle nie ustawiaj.
};
