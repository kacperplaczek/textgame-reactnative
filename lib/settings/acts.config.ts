// acts.config.ts
export const actsConfig = {
  startgame: {
    id: "startgame",
    title: "PROLOG",
    initialScene: "dzwoni_officer",
    scenario: require("@/scenario/scenariuszAkt1"),
  },
  "akt-1": {
    id: "akt-1",
    title: "AKT I",
    initialScene: "rozpoczecie_akt2",
    scenario: require("@/scenario/scenariuszAkt2"),
  },
  "akt-2": {
    id: "akt-2",
    title: "AKT II",
    initialScene: "rozpoczecie_aktu",
    scenario: require("@/scenario/scenariuszAkt3"),
  },
};
