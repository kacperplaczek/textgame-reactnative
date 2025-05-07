import * as ScreenOrientation from "expo-screen-orientation";

export async function lockOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
}
