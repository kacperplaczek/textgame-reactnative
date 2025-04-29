import React, { useRef } from "react";
import {
  ScrollView,
  View,
  ImageBackground,
  ImageBackgroundProps,
  ViewProps,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { useGameEngine } from "@/hooks/useGameEngine";
import {
  useWaitingScreen,
  WaitingScreenProvider,
} from "@/context/WaitingScreenContext";

import GlowSkia from "@/components/ui/GlowBackground";
import GameMenu from "@/components/buttons/GameMenu";
import ActSwitcher from "@/components/buttons/ActsSwitch";
import DialogueBox from "@/components/DialogueBox";
import OptionsBox from "@/components/buttons/OptionsBox";
import CallingScreenOverlay from "@/screens/CallingScreen/CallingScreen";
import WaitingScreenOverlay from "@/screens/WaitingScreen/WaitingScreen";
import { deathScreensMap } from "@/settings/screens/DeathScreens";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { adBannerUnitID } from "@/services/LoadBannerAd";
import {
  resumeBackgroundMusic,
  stopRingSound,
} from "@/services/soundController";
import { useDarknessUI } from "@/hooks/useDarnkessUI";

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
    setSpecialSceneVisible,
    setSpecialScene,
    deathScreenVisible,
    currentDeathScreen,
    onRetryFromDeath,
    setActSwitcherRefresh,
  } = useGameEngine();

  const { waitingVisible, notifyScreenName, timeLeft } = useWaitingScreen();

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

      <ActSwitcher
        onMountRefresh={() => {
          setActSwitcherRefresh(() => {
            console.log("🔄 Odświeżam ActSwitcher (via onMountRefresh)");
          });
        }}
      />

      <GameMenu onReset={() => {}} />

      {waitingVisible && (
        <WaitingScreenOverlay
          visible={waitingVisible}
          timeLeft={timeLeft}
          notifyScreenName={notifyScreenName}
        />
      )}

      <CallingScreenOverlay
        visible={specialSceneVisible}
        title={specialScene?.title}
        subtitle={specialScene?.subtitle}
        npcKey={specialScene?.npcKey}
        background={specialScene?.background}
        onClose={async () => {
          console.log(
            "📞 Kliknięto ekran – zatrzymuję dzwonek i wznawiam muzykę..."
          );
          await stopRingSound();
          await resumeBackgroundMusic();
          setSpecialSceneVisible(false);
          if (specialScene?.nextScene) {
            handleSceneChange(specialScene.nextScene);
          }
        }}
      />

      {deathScreenVisible && currentDeathScreen && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
        >
          {deathScreensMap[currentDeathScreen]?.({
            onRetry: onRetryFromDeath,
          })}
        </View>
      )}

      <View
        style={{ flex: 1, justifyContent: "space-between", paddingTop: 50 }}
      >
        <DialogueBox scrollRef={scrollRef} dialogue={dialogue || []} />
        <OptionsBox options={options} />
        <BannerAd unitId={adBannerUnitID} size={BannerAdSize.ADAPTIVE_BANNER} />
      </View>
    </ContentWrapper>
  );
}
