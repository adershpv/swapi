"use client";

import { CharacterListItem } from "@/types/characters";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Avatar,
  Chip,
} from "@nextui-org/react";

const statusColorMap: Record<string, "primary" | "secondary"> = {
  male: "primary",
  female: "secondary",
};

export default function CharacterCard({
  character,
}: {
  character: CharacterListItem;
}) {
  const id = character.url.split("/").filter(Boolean).pop();

  return (
    <Link href={`/characters/${id}`}>
      <Card className="w-full">
        <CardHeader className="flex gap-3">
          <Avatar name={character.name} />
          <div className="flex flex-col">
            <p className="text-lg">{character.name}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="text-bold text-tiny capitalize text-default-600">
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
    </Link>
  );
}
