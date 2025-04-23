// /app/game/index.tsx
import React, { useRef, useEffect } from "react";
import { ImageBackgroundProps, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ImageBackground } from "react-native";
import GlowSkia from "@/components/ui/GlowBackground";
import { useDarknessUI } from "@/hooks/useDarnkessUI";
import GameMenu from "@/components/ui/GameMenu";
import WaitingScreenOverlay from "./_components/screens/WaitingScreen/WaitingScreen";
import DialogueBox from "./_components/ui/DialogueBox";
import OptionsBox from "./_components/ui/OptionsBox";
import CallingScreenOverlay from "./_components/screens/CallingScreen/CallingScreen";
import ActSwitcher from "@/components/ui/ActsSwitch";
import { useSceneManager } from "@/lib/dialogue/useSceneManager";
import { useOptions } from "@/lib/dialogue/useOptions";
import { useGameEngine } from "@/lib/game/useGameEngine";
import { stopAllSounds, stopSound } from "@/lib/helpers/soundController";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export default function GameScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const { darknessUI } = useDarknessUI();
  const {
    dialogue,
    options,
    currentScene,
    handleSceneChange,
    specialScene,
    specialSceneVisible,
    setSpecialSceneVisible, // ← TO!
    setSpecialScene, // ← TO TEŻ!
    waitingVisible,
    notifyScreenName,
    timeLeft,
  } = useGameEngine();

  const ContentWrapper: React.ComponentType<ViewProps | ImageBackgroundProps> =
    darknessUI ? View : ImageBackground;
  const wrapperProps = darknessUI
    ? { style: { flex: 1, backgroundColor: "black" } }
    : {
        source: require("@/assets/images/INTRO.png"),
        style: { flex: 1 },
        resizeMode: "cover" as const,
      };

  return (
    <ContentWrapper {...wrapperProps}>
      {!darknessUI && <GlowSkia />}
      <StatusBar hidden />
      <ActSwitcher />
      <GameMenu onReset={() => {}} />

      <WaitingScreenOverlay
        visible={waitingVisible}
        timeLeft={timeLeft}
        notifyScreenName={notifyScreenName}
      />

      <CallingScreenOverlay
        visible={specialSceneVisible}
        title={specialScene?.title}
        subtitle={specialScene?.subtitle}
        npcKey={specialScene?.npcKey}
        background={specialScene?.background}
        onClose={async () => {
          console.log(
            "📞 Kliknięto ekran – zatrzymuję dźwięki i przechodzę dalej..."
          );
          await stopAllSounds();
          setSpecialSceneVisible(false);
          if (specialScene?.nextScene) {
            handleSceneChange(specialScene.nextScene);
          }
        }}
      />

      <View
        style={{ flex: 1, justifyContent: "space-between", paddingTop: 50 }}
      >
        <DialogueBox scrollRef={scrollRef} dialogue={dialogue || []} />

        <OptionsBox options={options} />
      </View>
    </ContentWrapper>
  );
}
