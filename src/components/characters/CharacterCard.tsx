"use client";

import React, { useState, useEffect } from "react";
import { CharacterListItem } from "@/types/characters";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Avatar,
  Chip,
  Button,
  Link,
} from "@nextui-org/react";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { isFavorite, addFavorite, removeFavorite } from "@/utilities/favorites";

const statusColorMap: Record<string, "primary" | "secondary"> = {
  male: "primary",
  female: "secondary",
};

export default function CharacterCard({
  character,
  onRemoveFavorite,
}: {
  character: CharacterListItem;
  onRemoveFavorite?: (characterUrl: string) => void;
}) {
  const id = character.url.split("/").filter(Boolean).pop();

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(character.url));
  }, [character.url]);

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(character.url);
      setIsFav(false);
      onRemoveFavorite?.(character.url);
    } else {
      addFavorite(character.url);
      setIsFav(true);
    }
  };

  return (
    <Card className="w-full relative">
      {/* Favorite Button */}
      <Button
        isIconOnly
        className={`absolute top-2 right-2 z-20 ${
          isFav ? "text-red-500" : "text-default-900/60"
        }`}
        radius="full"
        variant="light"
        onPress={toggleFavorite}
      >
        <HeartIcon fill={isFav ? "red" : "none"} />
      </Button>
      <Link href={`/characters/${id}`} className="text-inherit">
        <CardHeader className="flex gap-3">
          <Avatar name={character.name} />
          <div className="flex flex-col">
            <p className="text-lg">{character.name}</p>
          </div>
        </CardHeader>
      </Link>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-2 text-bold text-tiny capitalize text-default-600">
          <div>
            Gender:{" "}
            {character.gender ? (
              <Chip
                className="capitalize"
                color={statusColorMap[character.gender] || "primary"}
                size="sm"
                variant="flat"
              >
                {character.gender}
              </Chip>
            ) : (
              <span>Unknown</span>
            )}
          </div>
          <div>
            Height:{" "}
            <Chip className="lowercase" size="sm" variant="flat">
              {character.height} cms
            </Chip>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <p>
          <span className="text-bold text-tiny capitalize text-default-600">
            Home planet:{" "}
          </span>
          {character.homeplanet?.name || "Unknown"}
        </p>
      </CardFooter>
    </Card>
  );
}
