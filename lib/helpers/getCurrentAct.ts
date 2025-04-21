import Storage from "expo-storage";

export const getCurrentAct = async (): Promise<string> => {
  const currentAct = await Storage.getItem({ key: "currentAct" });
  let defaultAct = "startgame";
  return currentAct || defaultAct;
};

export const setCurrentAct = async (actKey: string) => {
  await Storage.setItem({ key: "currentAct", value: actKey });
};
