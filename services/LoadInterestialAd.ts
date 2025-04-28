import { Platform } from "react-native";
import { AdEventType, InterstitialAd } from "react-native-google-mobile-ads";

// ID reklamy (zmień na własny przed publikacją!)
const adUnitId =
  Platform.OS === "ios"
    ? "ca-app-pub-4136563182662861/1075007008" // iOS Ads ID
    : "ca-app-pub-4136563182662861/9144358271"; // Android Ads ID

// Inicjalizacja reklamy
export const interstitial = InterstitialAd.createForAdRequest(adUnitId);

// Pokaż reklamę, gdy tylko się załaduje
export const adListener = interstitial.addAdEventListener(
  AdEventType.LOADED,
  () => {
    console.log(
      "[✅] Interestial Ad Loader - Reklama załadowana.\n ID Reklamy: " +
        adUnitId
    );
    interstitial.show();
  }
);
