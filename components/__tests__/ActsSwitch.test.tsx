import React from "react";
import { render } from "@testing-library/react-native";
import ActsSwitch from "@/components/buttons/ActsSwitch";

describe("ActsSwitch", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<ActsSwitch />);
    expect(getByTestId("acts-switch")).toBeTruthy();
  });
});