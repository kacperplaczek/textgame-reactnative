import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CallingScreenOverlay from "@/screens/CallingScreen/CallingScreen";

jest.mock("@/viewmodels/useCallingScreenViewModel", () => ({
  useCallingScreenViewModel: jest.fn().mockImplementation((props) => ({
    npcAvatar: null,
    npcName: "Mock NPC",
    translatedTitle: props.title || "Mock Title",
    translatedSubtitle: props.subtitle || "Mock Subtitle",
    backgroundImage: { uri: "mock-background" },
    handleClose: props.onClose,
  })),
}));

describe("CallingScreenOverlay", () => {
  it("does not render when visible is false", () => {
    const { toJSON } = render(
      <CallingScreenOverlay visible={false} onClose={jest.fn()} />
    );
    expect(toJSON()).toBeNull();
  });

  it("renders with provided title and subtitle", () => {
    const { getByText } = render(
      <CallingScreenOverlay
        visible={true}
        title="Calling..."
        subtitle="Please wait"
        onClose={jest.fn()}
      />
    );
    expect(getByText("Calling...")).toBeTruthy();
    expect(getByText("Please wait")).toBeTruthy();
    expect(getByText("Mock NPC")).toBeTruthy();
  });

  it("renders fallback text when npcAvatar is null", () => {
    const { getByText } = render(
      <CallingScreenOverlay visible={true} onClose={jest.fn()} />
    );
    expect(getByText("Brak avatara")).toBeTruthy();
  });

  it("calls onClose when pressed", () => {
    const mockClose = jest.fn();
    const { getByTestId } = render(
      <CallingScreenOverlay visible={true} onClose={mockClose} />
    );
    fireEvent.press(getByTestId("calling-screen-overlay"));
    expect(mockClose).toHaveBeenCalled();
  });
});
