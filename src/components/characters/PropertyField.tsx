"use client";

import { Input } from "@nextui-org/react";

interface PropertyFieldProps {
  value: string | number | { title?: string; name?: string }[] | null;
  editable?: boolean;
  options?: string[];
  onEdit: (value: string | number) => void;
}

export const PropertyField = ({
  value,
  editable,
  options,
  onEdit,
}: PropertyFieldProps) => {
  if (editable && options) {
    // Render dropdown for options
    return (
      <select
        className="bg-default-100 h-10 rounded-medium w-full px-3 appearance-none tap-highlight-transparent focus:outline-none"
        value={value as string}
        onChange={(e) => onEdit(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  } else if (editable) {
    // Render input for free-text editing
    return (
      <Input
        value={value as string}
        onChange={(e) => onEdit(e.target.value)}
        aria-label="Property Field"
        type="text"
        size="sm"
      />
    );
  } else if (Array.isArray(value)) {
    // Render array values as comma-separated strings
    return (
      <p className="font-extrabold text-sm capitalize">
        {value.map((item) => item.title || item.name).join(", ")}
      </p>
    );
  }

  // Render plain text for non-editable fields
  return (
    <p className="font-extrabold text-sm capitalize">{value ?? "Unknown"}</p>
  );
};
