// viewmodels/useCallingScreenViewModel.ts
import { useEffect, useState } from "react";
import {
  pauseBackgroundMusic,
  resumeBackgroundMusic,
  playRingSound,
  stopRingSound,
} from "@/services/soundController";
import { npcData, NpcKey } from "@/settings/NPCData";
import { translations } from "@/i18n/translations";
import { useLanguage } from "@/context/LanguageContext";

export const useCallingScreenViewModel = ({
  visible,
  npcKey,
  title,
  subtitle,
  background,
  autoNextDelay,
  onClose,
}: {
  visible: boolean;
  npcKey?: NpcKey;
  title?: string;
  subtitle?: string;
  background?: any;
  autoNextDelay?: number;
  onClose: () => void;
}) => {
  const { language } = useLanguage();
  const [backgroundImage, setBackgroundImage] = useState<any>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const init = async () => {
      if (visible) {
        await pauseBackgroundMusic();
        await playRingSound();

        if (autoNextDelay) {
          timeout = setTimeout(handleClose, autoNextDelay);
        }
      }
    };

    init();

    return () => {
      clearTimeout(timeout);
      stopRingSound();
      resumeBackgroundMusic();
    };
  }, [visible, autoNextDelay]);

  const handleClose = async () => {
    await stopRingSound();
    await resumeBackgroundMusic();
    onClose();
  };

  const npcAvatar = npcKey ? npcData[npcKey]?.avatar : null;
  const npcName =
    npcKey && translations[language]?.[npcData[npcKey]?.nameKey]
      ? translations[language][npcData[npcKey].nameKey]
      : "Nieznany NPC";

  const translatedTitle =
    title && translations[language]?.[title]
      ? translations[language][title]
      : translations[language]?.incomingCallTitle ?? "Połączenie przychodzące";

  const translatedSubtitle =
    subtitle && translations[language]?.[subtitle]
      ? translations[language][subtitle]
      : translations[language]?.incomingCallSubtitle ?? "Kliknij, aby odebrać";

  useEffect(() => {
    if (typeof background === "string" && background.startsWith("http")) {
      setBackgroundImage({ uri: background });
    } else if (background && typeof background !== "string") {
      setBackgroundImage(background);
    } else {
      setBackgroundImage(require("@/assets/images/bg_intro.png"));
    }
  }, [background]);

  return {
    npcAvatar,
    npcName,
    translatedTitle,
    translatedSubtitle,
    backgroundImage,
    handleClose,
  };
};
