import { actsConfig } from "@/settings/acts.config";
import { Language, translations } from "@/i18n/translations";

export type ActId = keyof typeof actsConfig;

export const getScenesForAct = (
  actId: ActId,
  lang: Language,
  plec: "pan" | "pani" | null
) => {
  const config = actsConfig[actId];

  if (!config || !config.scenario) {
    console.log("{x} Brak scenariusza dla aktu:", actId);
    return {};
  }

  try {
    console.log("📘 Ładowanie scen dla aktu:", actId);
    // console.log("📘 Tłumaczenia:", translations[lang]);
    console.log("📘 Płeć gracza:", plec);

    const scenes = config.scenario.getScenes(translations[lang], plec);

    // console.log("📘 Sceny:", scenes);

    return scenes;
  } catch (err) {
    console.log("❌ Błąd przy ładowaniu scenariusza:", err);
    return {};
  }
};

export const getInitialSceneForAct = (actId: ActId): string => {
  return actsConfig[actId]?.initialScene ?? "start";
};
