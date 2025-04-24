import { Platform } from "react-native";

export const adBannerUnitID =
  Platform.OS === "ios"
    ? "ca-app-pub-4136563182662861/4480470362" // Dla IOS
    : "ca-app-pub-4136563182662861/8460997846"; // Dla Android
