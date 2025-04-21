import { actsConfig } from "@/lib/settings/acts.config";
import { Language, translations } from "@/lib/translations/translations";
import { getLogger } from "./getLogger";

export type ActId = keyof typeof actsConfig;

export const getScenesForAct = (
  actId: ActId,
  lang: Language,
  plec: "pan" | "pani" | null
) => {
  const config = actsConfig[actId];

  if (!config || !config.scenario) {
    getLogger("{x} Brak scenariusza dla aktu:", actId);
    return {};
  }

  try {
    return config.scenario.getScenes(translations[lang], plec);
  } catch (err) {
    getLogger("❌ Błąd przy ładowaniu scenariusza:", err);
    return {};
  }

  console.log("📘 Ładowanie scen dla aktu:", actId);
  console.log("📘 Tłumaczenia:", translations[lang]);
  console.log("📘 Płeć gracza:", plec);
  console.log("📘 Sceny:", config.scenario.getScenes(translations[lang], plec));
};

export const getInitialSceneForAct = (actId: ActId): string => {
  return actsConfig[actId]?.initialScene ?? "start";
};
