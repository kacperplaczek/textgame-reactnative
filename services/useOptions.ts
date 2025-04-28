import { useState } from "react";

type Option = {
  tekst: string;
  akcja: () => void;
};

export const useOptions = () => {
  const [options, setOptions] = useState<Option[]>([]);

  const updateOptions = (newOptions: Option[]) => {
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
