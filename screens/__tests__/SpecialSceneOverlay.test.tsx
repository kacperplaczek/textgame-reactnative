// __tests__/SpecialSceneOverlay.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import SpecialSceneOverlay from "@/screens/SpecialScene/SpecialSceneOverlay";

describe("SpecialSceneOverlay", () => {
  it("renders title and subtitle when visible", () => {
    const { getByText } = render(
      <SpecialSceneOverlay
        visible={true}
        title="Test Title"
        subtitle="Test Subtitle"
      />
    );

    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("Test Subtitle")).toBeTruthy();
  });

  it("renders only title when subtitle is not provided", () => {
    const { getByText, queryByText } = render(
      <SpecialSceneOverlay visible={true} title="Only Title" />
    );

    expect(getByText("Only Title")).toBeTruthy();
    expect(queryByText("Test Subtitle")).toBeNull();
  });

  it("does not render anything when visible is false", () => {
    const { queryByText } = render(
      <SpecialSceneOverlay visible={false} title="Hidden Title" />
    );

    expect(queryByText("Hidden Title")).toBeNull();
  });
});
