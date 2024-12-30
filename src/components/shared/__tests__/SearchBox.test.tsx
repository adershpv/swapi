import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBox } from "../SearchBox";

describe("SearchBox Component", () => {
  it("matches the snapshot", () => {
    const { asFragment } = render(
      <SearchBox value="test" onSearchChange={jest.fn()} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("calls onSearchChange when the input value changes", () => {
    const mockOnSearchChange = jest.fn();
    render(<SearchBox value="" onSearchChange={mockOnSearchChange} />);

    const input = screen.getByLabelText("Search");
    fireEvent.change(input, { target: { value: "new value" } });

    expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
    expect(mockOnSearchChange).toHaveBeenCalledWith("new value");
  });
});
