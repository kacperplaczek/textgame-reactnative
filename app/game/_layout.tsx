import { defaultBackground } from "@/components/images/backgrounds";
// import GlowSkia from "@/components/ui/GlowBackground";
import GameMenu from "@/components/ui/GameMenu";
import ActSwitcher from "@/components/ui/ActsSwitch";
import Storage from "expo-storage";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Dimensions,
  Text,
} from "react-native";
import { getLogger } from "@/lib/helpers/getLogger";

interface GameLayoutProps {
  children: React.ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  const [darknessUI, setDarknessUI] = useState(false);

  useEffect(() => {
    const checkDarkness = async () => {
      const value = await Storage.getItem({ key: "darknessUI" });
      setDarknessUI(value === "true");
      getLogger("{v} Ustawienie stylu ciemnego");
    };

    checkDarkness();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {darknessUI ? (
        <View style={stylesDark.background}>
          <ActSwitcher />
          <GameMenu onReset={undefined} />
          {children}
        </View>
      ) : (
        <ImageBackground
          source={defaultBackground}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        >
          <ActSwitcher />
          <GameMenu onReset={undefined} />
          {children}
        </ImageBackground>
      )}
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  background: {
    flex: 1,
    width,
    height,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
});

const stylesDark = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
});
