"use client";

import React from "react";
import { Character } from "@/types/characters";
import { DISPLAY_PROPERTIES } from "@/app/constants";
import PropertiesTable from "./PropertiesTable";

export default function CharacterDetail({
  character,
}: {
  character: Character;
}) {
  const details = DISPLAY_PROPERTIES.map((key) => ({
    key,
    value: character[key] ?? null, // Replace `undefined` with `null` to match Property interface
  }));

  return (
    <>
      <PropertiesTable properties={details} />
    </>
  );
}
