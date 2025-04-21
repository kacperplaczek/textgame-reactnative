import * as scenariuszAkt1 from "@/scenario/scenariuszAkt1";
import * as scenariuszAkt2 from "@/scenario/scenariuszAkt2";
import * as scenariuszAkt3 from "@/scenario/scenariuszAkt3";

export const actsConfig = {
  startgame: {
    id: "startgame",
    title: "PROLOG",
    initialScene: "dzwoni_officer",
    scenario: scenariuszAkt1, // ✅ to jest importowany moduł
  },
  "akt-1": {
    id: "akt-1",
    title: "AKT I",
    initialScene: "rozpoczecie_akt2",
    scenario: scenariuszAkt2,
  },
  "akt-2": {
    id: "akt-2",
    title: "AKT II",
    initialScene: "rozpoczecie_aktu",
    scenario: scenariuszAkt3,
  },
};
