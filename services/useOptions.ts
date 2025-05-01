import { useState } from "react";
import Storage from "expo-storage";

type Option = {
  tekst: string;
  akcja: () => void;
};

export const useOptions = () => {
  const [options, setOptions] = useState<Option[]>([]);

  const updateOptions = async (newOptions: Option[]) => {
    setOptions(newOptions);
  };

  const clearOptions = () => {
    setOptions([]);
  };

  return {
    options,
    updateOptions,
    clearOptions,
  };
};
