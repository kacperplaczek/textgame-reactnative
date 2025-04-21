import { useEffect, useState, useCallback } from "react";
import Storage from "expo-storage";

export function useDarknessUI() {
  const [darknessUI, setDarknessUI] = useState(false);

  useEffect(() => {
    const fetchDarkness = async () => {
      const stored = await Storage.getItem({ key: "darknessUI" });
      setDarknessUI(stored === "true");
    };

    fetchDarkness();
  }, []);

  const enableDarkness = useCallback(async () => {
    await Storage.setItem({ key: "darknessUI", value: "true" });
    setDarknessUI(true);
  }, []);

  const disableDarkness = useCallback(async () => {
    await Storage.removeItem({ key: "darknessUI" });
    setDarknessUI(false);
  }, []);

  const toggleDarkness = useCallback(async () => {
    const newValue = !darknessUI;
    if (newValue) {
      await Storage.setItem({ key: "darknessUI", value: "true" });
    } else {
      await Storage.removeItem({ key: "darknessUI" });
    }
    setDarknessUI(newValue);
  }, [darknessUI]);

  return {
    darknessUI,
    enableDarkness,
    disableDarkness,
    toggleDarkness,
  };
}
