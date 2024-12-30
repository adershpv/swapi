import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PropertyField } from "../PropertyField";

describe("PropertyField", () => {
  it("renders a dropdown when `editable` and `options` are provided", () => {
    const mockOnEdit = jest.fn();
    const mockOptions = ["Male", "Female", "N/A"];

    render(
      <PropertyField
        value="Male"
        editable={true}
        options={mockOptions}
        onEdit={mockOnEdit}
      />,
    );

    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveValue("Male");

    fireEvent.change(dropdown, { target: { value: "Female" } });
    expect(mockOnEdit).toHaveBeenCalledWith("Female");
  });

  it("renders an input when `editable` is true and no `options` are provided", () => {
    const mockOnEdit = jest.fn();

    render(
      <PropertyField
        value="172"
        editable={true}
        options={undefined}
        onEdit={mockOnEdit}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("172");

    fireEvent.change(input, { target: { value: "180" } });
    expect(mockOnEdit).toHaveBeenCalledWith("180");
  });

  it("renders an array of values as a comma-separated string", () => {
    const mockArrayValue = [
      { title: "Item 1" },
      { title: "Item 2" },
      { title: "Item 3" },
    ];

    render(
      <PropertyField
        value={mockArrayValue}
        editable={false}
        options={undefined}
        onEdit={jest.fn()}
      />,
    );

    const text = screen.getByText("Item 1, Item 2, Item 3");
    expect(text).toBeInTheDocument();
  });

  it("renders plain text when `editable` is false and `value` is a string", () => {
    render(
      <PropertyField
        value="Luke Skywalker"
        editable={false}
        options={undefined}
        onEdit={jest.fn()}
      />,
    );

    const text = screen.getByText("Luke Skywalker");
    expect(text).toBeInTheDocument();
  });

  it("renders 'Unknown' when `value` is null or undefined", () => {
    render(
      <PropertyField
        value={null}
        editable={false}
        options={undefined}
        onEdit={jest.fn()}
      />,
    );

    const text = screen.getByText("Unknown");
    expect(text).toBeInTheDocument();
  });
});
