"use client";

import React from "react";
import { Spinner as NUISpinner } from "@nextui-org/react";

export const Spinner = ({ label }: { label?: string }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <NUISpinner label={label || "Loading..."} />
    </div>
  );
};
