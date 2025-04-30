import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DeathScreen from "@/screens/DeathScreen/DeathScreen"; // Dostosuj ścieżkę
import { useDeathScreenViewModel } from "@/viewmodels/useDeathScreenViewModel";

// Mockujemy hook, by nie testować jego logiki tutaj
jest.mock("@/viewmodels/useDeathScreenViewModel");

describe("DeathScreen", () => {
  const mockRetry = jest.fn();
  const mockImage = { uri: "mock-image.png" };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDeathScreenViewModel as jest.Mock).mockReturnValue({
      title: "You Died",
      handleRetry: mockRetry,
    });
  });

  it("renders correctly with given title", () => {
    const { getByText } = render(
      <DeathScreen title="Any" image={mockImage} onRetry={mockRetry} />
    );
    expect(getByText("You Died")).toBeTruthy();
  });

  it("calls onRetry when pressed", () => {
    const { getByTestId } = render(
      <DeathScreen title="Any" image={mockImage} onRetry={mockRetry} />
    );

    fireEvent.press(getByTestId("death-screen-touchable"));
    expect(mockRetry).toHaveBeenCalled();
  });
});
