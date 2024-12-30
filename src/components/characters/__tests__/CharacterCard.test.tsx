import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CharacterCard } from "../CharacterCard";
import { isFavorite, addFavorite, removeFavorite } from "@/utilities/favorites";
import { CharacterListItemType } from "@/types/characters";

jest.mock("@/utilities/favorites");

const mockCharacter: CharacterListItemType = {
  name: "Luke Skywalker",
  gender: "male",
  height: "172",
  homeworld: "https://swapi.dev/api/planets/1/",
  url: "https://swapi.dev/api/people/1/",
};

describe("CharacterCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (isFavorite as jest.Mock).mockReturnValue(false);
  });

  it("should render character details", () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Gender:")).toBeInTheDocument();
    expect(screen.getByText("male")).toBeInTheDocument();
    expect(screen.getByText("Height:")).toBeInTheDocument();
    expect(screen.getByText("172 cms")).toBeInTheDocument();
    expect(screen.getByText("Home planet:")).toBeInTheDocument();
    expect(screen.getByText("Unknown")).toBeInTheDocument(); // No homeplanet name is provided
  });

  it("should toggle favorite status when the heart button is clicked", () => {
    const { container } = render(<CharacterCard character={mockCharacter} />);

    const heartButton = container.querySelector("button");
    expect(heartButton).toBeInTheDocument();

    // Initially not a favorite
    expect(isFavorite).toHaveBeenCalledWith(mockCharacter.url);
    fireEvent.click(heartButton!);

    // Add to favorites
    expect(addFavorite).toHaveBeenCalledWith(mockCharacter.url);
    expect(removeFavorite).not.toHaveBeenCalled();

    // Click again to remove from favorites
    (isFavorite as jest.Mock).mockReturnValue(true);
    fireEvent.click(heartButton!);

    expect(removeFavorite).toHaveBeenCalledWith(mockCharacter.url);
    expect(addFavorite).toHaveBeenCalledTimes(1);
  });

  it("should call onRemoveFavorite when provided and favorite is removed", () => {
    const mockOnRemoveFavorite = jest.fn();
    (isFavorite as jest.Mock).mockReturnValue(true);

    const { container } = render(
      <CharacterCard
        character={mockCharacter}
        onRemoveFavorite={mockOnRemoveFavorite}
      />,
    );

    const heartButton = container.querySelector("button");
    fireEvent.click(heartButton!);

    expect(removeFavorite).toHaveBeenCalledWith(mockCharacter.url);
    expect(mockOnRemoveFavorite).toHaveBeenCalledWith(mockCharacter.url);
  });

  it("should load updated character data from localStorage", () => {
    const updatedCharacterData = {
      ...mockCharacter,
      gender: "female",
      height: "180",
    };

    jest
      .spyOn(Storage.prototype, "getItem")
      .mockReturnValueOnce(JSON.stringify(updatedCharacterData));

    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByText("female")).toBeInTheDocument();
    expect(screen.getByText("180 cms")).toBeInTheDocument();
  });

  it("should not display 'cms' if the height is invalid", () => {
    const invalidHeightCharacter = { ...mockCharacter, height: "none" };

    render(<CharacterCard character={invalidHeightCharacter} />);

    expect(screen.getByText("Height:")).toBeInTheDocument();
    expect(screen.getByText("none")).toBeInTheDocument();
    expect(screen.queryByText("cms")).not.toBeInTheDocument();
  });
});
