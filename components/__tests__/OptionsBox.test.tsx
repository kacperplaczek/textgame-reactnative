import React from "react";
import { render } from "@testing-library/react-native";
import OptionsBox from "@/components/buttons/OptionsBox";

describe("OptionsBox", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<OptionsBox options={[]} />);
    expect(getByTestId("options-box")).toBeTruthy();
  });
});