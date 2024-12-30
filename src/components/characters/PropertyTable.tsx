"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { PropertyField } from "./PropertyField";

export interface Property {
  key: string;
  value: string | number | { title?: string; name?: string }[] | null;
  editable?: boolean;
  options?: string[]; // Dropdown options for editable fields
}

interface CharacterPropertiesProps {
  properties: Property[];
  onEdit: (key: string, value: string | number) => void; // Callback for edits
}

export const PropertyTable = ({
  properties,
  onEdit,
}: CharacterPropertiesProps) => {
  const renderRow = (property: Property) => {
    const { key, value, editable, options } = property;
    const displayKey = key.replace("_", " ");

    // Transform value if it's an array
    const transformedValue = Array.isArray(value)
      ? value.map((item) => item.title || item.name).join(", ")
      : value;

    return (
      <TableRow key={key}>
        <TableCell>
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{displayKey}:</p>
          </div>
        </TableCell>
        <TableCell>
          <div className="relative flex items-center gap-2">
            <PropertyField
              key={key}
              value={transformedValue as string | number | null} // Ensure type compatibility
              editable={editable}
              options={options}
              onEdit={(newValue) => onEdit(key, newValue)}
            />
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Table aria-label="Character Properties">
      <TableHeader>
        <TableColumn>Property</TableColumn>
        <TableColumn>Detail</TableColumn>
      </TableHeader>
      <TableBody>{properties.map((property) => renderRow(property))}</TableBody>
    </Table>
  );
};
