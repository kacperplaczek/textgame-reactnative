import { useEffect } from "react";
import { Platform } from "react-native";
import { AdEventType, InterstitialAd } from "react-native-google-mobile-ads";

const adUnitId =
  Platform.OS === "ios"
    ? "ca-app-pub-4136563182662861/1075007008" // iOS
    : "ca-app-pub-4136563182662861/9144358271"; // Android

const interstitial = InterstitialAd.createForAdRequest(adUnitId);

export function useInterstitialAd(autoShow = true) {
  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log("[✅] Reklama załadowana");
        if (autoShow) {
          interstitial.show();
        }
      }
    );

    // Załaduj reklamę
    interstitial.load();

    return () => {
      unsubscribe();
    };
  }, [autoShow]);
}
