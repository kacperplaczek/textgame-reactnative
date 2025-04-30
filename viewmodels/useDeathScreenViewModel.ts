import { useCallback } from "react";

export const useDeathScreenViewModel = ({
  title,
  onRetry,
}: {
  title: string;
  onRetry: () => void;
}) => {
  const handleRetry = useCallback(() => {
    onRetry();
  }, [onRetry]);

  return {
    title,
    handleRetry,
  };
};
