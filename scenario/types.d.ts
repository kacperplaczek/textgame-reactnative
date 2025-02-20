import {NpcKey} from "@/lib/dialogue/NPCData";

type SceneType = {
    npcKey?: NpcKey;
    tekst?: () => string;
    options?: { tekst: string; next: string }[];
    checkpoint?: boolean;
    deathScreen?: string;
    autoNextScene?: string;
    autoNextDelay?: number;
    waitTime?: number;
    enableNotification?: boolean;
    endAct?: string;
    nextAct?: string;
    waitTimeScreen?: boolean,
    waitTimeScreenName?: string,
    sound?: string,
    soundPlayLoop?: boolean,
};