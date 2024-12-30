"use client";

import React, { useState, useEffect } from "react";
import { Character } from "@/types/characters";
import { DISPLAY_PROPERTIES } from "@/app/constants";
import PropertiesTable from "./PropertiesTable";
import { Button } from "@nextui-org/react";
import { HeartIcon } from "../icons/HeartIcon";
import { isFavorite, addFavorite, removeFavorite } from "@/utilities/favorites";

export default function CharacterDetail({
  character,
}: {
  character: Character;
}) {
  const [isFav, setIsFav] = useState(false);
  const [editableCharacter, setEditableCharacter] = useState(character);

  // Initialize favorite status and load any stored edits
  useEffect(() => {
    setIsFav(isFavorite(character.url));

    const storedEdits = localStorage.getItem(character.url);
    if (storedEdits) {
      setEditableCharacter(JSON.parse(storedEdits));
    }
  }, [character]);

  // Toggle favorite status
  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(character.url);
    } else {
      addFavorite(character.url);
    }
    setIsFav(!isFav);
  };

  // Update character property and save to localStorage
  const handleEdit = (key: string, value: string | number) => {
    const updatedCharacter = { ...editableCharacter, [key]: value };
    setEditableCharacter(updatedCharacter);
    localStorage.setItem(character.url, JSON.stringify(updatedCharacter));
  };

  const details = DISPLAY_PROPERTIES.map((key) => ({
    key,
    value: editableCharacter[key] ?? null, // Replace `undefined` with `null`
    editable: key === "height" || key === "gender", // Allow editing for height and gender
    options: key === "gender" ? ["Male", "Female", "N/A"] : undefined, // Dropdown options for gender
  }));

  return (
    <>
      <div className="flex justify-between items-center my-6">
        <h1 className="text-4xl font-extrabold">{editableCharacter.name}</h1>
        <Button
          isIconOnly
          className={`text-default-900/60 data-[hover]:bg-foreground/10 ${
            isFav ? "text-red-500" : ""
          }`}
          radius="full"
          variant="light"
          onPress={toggleFavorite}
        >
          <HeartIcon
            className={isFav ? "[&>path]:stroke-transparent" : ""}
            fill={isFav ? "red" : "none"}
          />
        </Button>
      </div>

      <PropertiesTable properties={details} onEdit={handleEdit} />
    </>
  );
}
