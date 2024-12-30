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

  // Initialize favorite status
  useEffect(() => {
    setIsFav(isFavorite(character.url));
  }, [character.url]);

  // Toggle favorite status
  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(character.url);
    } else {
      addFavorite(character.url);
    }
    setIsFav(!isFav);
  };

  const details = DISPLAY_PROPERTIES.map((key) => ({
    key,
    value: character[key] ?? null, // Replace `undefined` with `null` to match Property interface
  }));

  return (
    <>
      <div className="flex justify-between items-center my-6">
        <h1 className="text-4xl font-extrabold">{character.name}</h1>
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

      <PropertiesTable properties={details} />
    </>
  );
}
