// /app/game/index.tsx
import React, { useRef, useEffect } from "react";
import { ImageBackgroundProps, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ImageBackground } from "react-native";
import GlowSkia from "@/components/ui/GlowBackground";
import { useDarknessUI } from "@/hooks/useDarnkessUI";
import GameMenu from "@/components/buttons/GameMenu";
import WaitingScreenOverlay from "../../screens/WaitingScreen/WaitingScreen";
import DialogueBox from "../../components/DialogueBox";
import OptionsBox from "../../components/buttons/OptionsBox";
import CallingScreenOverlay from "../../screens/CallingScreen/CallingScreen";
import ActSwitcher from "@/components/buttons/ActsSwitch";
import { useGameEngine } from "@/hooks/useGameEngine";
import { stopAllSounds } from "@/services/soundController";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { deathScreensMap } from "@/lib/screens/DeathScreens";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { adBannerUnitID } from "@/lib/ads/LoadBannerAd";

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
    waitingVisible,
    notifyScreenName,
    timeLeft,
    deathScreenVisible,
    currentDeathScreen,
    onRetryFromDeath,
    setActSwitcherRefresh,
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
      <ActSwitcher
        onMountRefresh={() => {
          setActSwitcherRefresh(() => {
            console.log("🔄 Odświeżam ActSwitcher (via onMountRefresh)");
            // zaktualizuj completedActs etc.
            // Użyj czegoś jak triggerReload() lub wewnętrzny refresh
          });
        }}
      />
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
          {deathScreensMap[currentDeathScreen]?.({ onRetry: onRetryFromDeath })}
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
