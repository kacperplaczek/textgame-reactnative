/*


NPCData.ts odpowiada za dodanie nowych postaci do gry.
Tworząc tablicę podajemy nazwę obietku, nameKey: dla tłumaczenia, avatar dla samego avatara.

Przykładowe użycie:

    officer: {
        nameKey: 'officerTitle',
        avatar: require('@/assets/images/avatar/oficer_rekrutacji.png'),
    },

Gdy nazwa się nie wyświetla sprawdź tłumaczenia w en i pl (translations.ts)
Sprawdź też czy masz dodaną poprawną ściężkę avatara.

*/

import { translations, Language } from "@/lib/translations/translations";

export type NpcKey =
  | "officer"
  | "flightControlCenter"
  | "rozbitek"
  | "captain"
  | "dowodca"
  | "kosmita_harunkal"
  | "echo";

type NpcData = {
  nameKey: keyof (typeof translations)["pl"];
  avatar: any;
};

export const npcData: Record<NpcKey, NpcData> = {
  officer: {
    nameKey: "officerTitle",
    avatar: require("@/assets/images/avatar/oficer_rekrutacji.png"),
  },
  flightControlCenter: {
    nameKey: "flightControlCenterTitle",
    avatar: require("@/assets/images/avatar/control_center_avatar.png"),
  },
  rozbitek: {
    nameKey: "rozbitekTitle",
    avatar: require("@/assets/images/avatar/survivor_avatar.png"),
  },
  captain: {
    nameKey: "captainTitle",
    avatar: require("@/assets/images/avatar/oficer_rekrutacji.png"),
  },
  echo: {
    nameKey: "echoTitle",
    avatar: require("@/assets/images/avatar/echo_avatar.png"),
  },
  dowodca: {
    nameKey: "dowodcaTitle",
    avatar: require("@/assets/images/avatar/kapitan_statku.png"),
  },
  kosmita_harunkal: {
    nameKey: "harunKalTitle",
    avatar: require("@/assets/images/avatar/alien_avatar.png"),
  },
};
