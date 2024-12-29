"use client";

import React from "react";
import { Character } from "@/app/types";
import PropertiesTable from "./PropertiesTable";
import { DISPLAY_PROPERTIES } from "@/app/constants";

export default function CharacterDetail({
  character,
}: {
  character: Character;
}) {
  const details = DISPLAY_PROPERTIES.map((key) => ({
    key,
    value: character[key],
  }));

  return (
    <>
      <PropertiesTable properties={details} />
    </>
  );
}
