import * as ScreenOrientation from "expo-screen-orientation";

async function lockOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
}
