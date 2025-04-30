import React from "react";
import { render } from "@testing-library/react-native";
import GameMenu from "@/components/buttons/GameMenu";

describe("GameMenu", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<GameMenu />);
    expect(getByTestId("game-menu")).toBeTruthy();
  });
});
