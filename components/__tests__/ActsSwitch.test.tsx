// components/__tests__/ActsSwitch.test.tsx
import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import ActsSwitch from "../buttons/ActsSwitch";
import { WaitingScreenProvider } from "@/context/WaitingScreenContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { DarknessUIProvider } from "@/context/DarknessUIContext";

// Jeśli hook useGameEngine ma inne zależności, możesz tu dodać kolejne mocki
jest.mock("@/hooks/useGameEngine", () => ({
  useGameEngine: () => ({
    setActSwitcherRefresh: jest.fn(),
  }),
}));

describe("ActsSwitch", () => {
  it("renders without crashing", async () => {
    const { getByTestId } = render(
      <LanguageProvider>
        <WaitingScreenProvider>
          <DarknessUIProvider>
            <ActsSwitch />
          </DarknessUIProvider>
        </WaitingScreenProvider>
      </LanguageProvider>
    );

    await waitFor(() => {
      expect(getByTestId("acts-switch")).toBeTruthy();
    });
  });
});
