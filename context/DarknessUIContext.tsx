// /context/DarknessUIContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Storage from "expo-storage";

interface DarknessUIContextProps {
  isDark: boolean;
  enableDark: () => Promise<void>;
  disableDark: () => Promise<void>;
  toggleDark: () => Promise<void>;
}

const DarknessUIContext = createContext<DarknessUIContextProps | null>(null);

export const DarknessUIProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadDarkSetting = async () => {
      const stored = await Storage.getItem({ key: "darknessUI" });
      setIsDark(stored === "true");
    };
    loadDarkSetting();
  }, []);

  const enableDark = async () => {
    await Storage.setItem({ key: "darknessUI", value: "true" });
    setIsDark(true);
  };

  const disableDark = async () => {
    await Storage.removeItem({ key: "darknessUI" });
    setIsDark(false);
  };

  const toggleDark = async () => {
    if (isDark) {
      await disableDark();
    } else {
      await enableDark();
    }
  };

  return (
    <DarknessUIContext.Provider
      value={{ isDark, enableDark, disableDark, toggleDark }}
    >
      {children}
    </DarknessUIContext.Provider>
  );
};

export const useDarknessUI = () => {
  const context = useContext(DarknessUIContext);
  if (!context)
    throw new Error("useDarknessUI must be used within DarknessUIProvider");
  return context;
};
