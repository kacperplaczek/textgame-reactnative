import React from "react";
import { render } from "@testing-library/react-native";
import WaitingScreenOverlay from "@/screens/WaitingScreen/WaitingScreen";
import * as context from "@/context/WaitingScreenContext";
import * as langModel from "@/models/LanguageController";

// Mock GlowSkia to avoid native dependency in test
jest.mock("@/components/ui/GlowBackground", () => () => null);

// Mock kontekst + język
jest.spyOn(langModel, "getCurrentLanguage").mockResolvedValue("en");

describe("WaitingScreenOverlay", () => {
  beforeEach(() => {
    return jest.spyOn(context, "useWaitingScreen").mockReturnValue({
      waitingVisible: true,
      notifyScreenName: "defaultScreen",
      timeLeft: 125,
    });
  });

  it("renders with loading indicator before image loads", () => {
    const { getByTestId } = render(<WaitingScreenOverlay />);
    expect(getByTestId("ActivityIndicator")).toBeTruthy();
  });

  it("renders nothing when waitingVisible is false", () => {
    jest.spyOn(context, "useWaitingScreen").mockReturnValue({
      waitingVisible: false,
      notifyScreenName: null,
      timeLeft: 0,
    });

    const { toJSON } = render(<WaitingScreenOverlay />);
    expect(toJSON()).toBeNull();
  });
});
