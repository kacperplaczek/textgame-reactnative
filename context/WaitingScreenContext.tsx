import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import Storage from "expo-storage";

interface WaitingScreenContextProps {
  waitingVisible: boolean;
  notifyScreenName: string;
  timeLeft: number;
  startWaiting: (screenName: string, totalTime: number) => void;
  stopWaiting: () => void;
  setTimeLeft: (seconds: number) => void;
}

const WaitingScreenContext = createContext<WaitingScreenContextProps | null>(
  null
);

const STORAGE_KEYS = {
  endTimestamp: "waitingEndTimestamp",
  screenName: "waitingScreenName",
};

export const WaitingScreenProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [waitingVisible, setWaitingVisible] = useState(false);
  const [notifyScreenName, setNotifyScreenName] = useState("defaultScreen");
  const [timeLeft, setTimeLeftState] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const tick = async () => {
    const now = Date.now();
    const endTimestamp = await Storage.getItem({
      key: STORAGE_KEYS.endTimestamp,
    });
    const end = endTimestamp ? parseInt(endTimestamp) : 0;

    const remaining = Math.max(0, Math.floor((end - now) / 1000));
    setTimeLeftState(remaining);

    if (remaining <= 0) {
      stopWaiting();
    }
  };

  const startWaiting = async (screenName: string, totalTime: number) => {
    const existingTimestamp = await Storage.getItem({
      key: STORAGE_KEYS.endTimestamp,
    });

    if (existingTimestamp) {
      // Już wcześniej ustawiony — nie nadpisuj
      const now = Date.now();
      const endTime = parseInt(existingTimestamp);
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setNotifyScreenName(screenName);
      setWaitingVisible(true);
      setTimeLeftState(remaining);
      clearTimer();
      intervalRef.current = setInterval(tick, 1000);
      return;
    }

    // 🆕 Pierwsze ustawienie
    const endTime = Date.now() + totalTime * 1000;
    await Storage.setItem({
      key: STORAGE_KEYS.endTimestamp,
      value: String(endTime),
    });
    await Storage.setItem({ key: STORAGE_KEYS.screenName, value: screenName });

    setNotifyScreenName(screenName);
    setWaitingVisible(true);
    setTimeLeftState(totalTime);

    clearTimer();
    intervalRef.current = setInterval(tick, 1000);
  };

  const stopWaiting = async () => {
    clearTimer();
    setWaitingVisible(false);
    setNotifyScreenName("defaultScreen");
    setTimeLeftState(0);

    await Storage.removeItem({ key: STORAGE_KEYS.endTimestamp });
    await Storage.removeItem({ key: STORAGE_KEYS.screenName });
  };

  const setTimeLeft = (seconds: number) => {
    setTimeLeftState(seconds);
  };

  useEffect(() => {
    const restoreIfNeeded = async () => {
      const endTimestamp = await Storage.getItem({
        key: STORAGE_KEYS.endTimestamp,
      });
      const screenName = await Storage.getItem({
        key: STORAGE_KEYS.screenName,
      });

      if (!endTimestamp || !screenName) return;

      const now = Date.now();
      const end = parseInt(endTimestamp);
      const remaining = Math.max(0, Math.floor((end - now) / 1000));

      if (remaining > 0) {
        setNotifyScreenName(screenName);
        setWaitingVisible(true);
        setTimeLeftState(remaining);

        clearTimer();
        intervalRef.current = setInterval(tick, 1000);
      } else {
        await stopWaiting();
      }
    };

    restoreIfNeeded();

    return () => clearTimer();
  }, []);

  return (
    <WaitingScreenContext.Provider
      value={{
        waitingVisible,
        notifyScreenName,
        timeLeft,
        startWaiting,
        stopWaiting,
        setTimeLeft,
      }}
    >
      {children}
    </WaitingScreenContext.Provider>
  );
};

export const useWaitingScreen = () => {
  const context = useContext(WaitingScreenContext);
  if (!context) {
    throw new Error(
      "useWaitingScreen must be used within a WaitingScreenProvider"
    );
  }
  return context;
};
