"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";

export interface Property {
  key: string;
  value: string | number | { title?: string; name?: string }[] | null;
  editable?: boolean;
  options?: string[]; // Dropdown options for editable fields
}

interface PropertiesTableProps {
  properties: Property[];
  onEdit: (key: string, value: string | number) => void; // Callback for edits
}

export const columns: { name: string; uid: string }[] = [
  { name: "PROPERTY", uid: "property" },
  { name: "DETAIL", uid: "detail" },
];

export default function PropertiesTable({
  properties,
  onEdit,
}: PropertiesTableProps) {
  const renderRow = ({ key, value, editable, options }: Property) => {
    const property = key.replace("_", " ");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onEdit(key, e.target.value);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onEdit(key, e.target.value);
    };

    return (
      <TableRow key={key}>
        <TableCell>
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{property}:</p>
          </div>
        </TableCell>
        <TableCell>
          <div className="relative flex items-center gap-2">
            {editable && options ? (
              // Render a dropdown for gender
              <select
                className="bg-default-100 h-10 rounded-medium w-full px-3 appearance-none tap-highlight-transparent focus:outline-none"
                value={value as string}
                onChange={handleSelectChange}
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : editable ? (
              // Render a text input for height
              <Input
                value={value as string}
                onChange={handleInputChange}
                aria-label={`Edit ${property}`}
                type="number"
              />
            ) : (
              // Render plain text for non-editable fields
              <p className="font-extrabold text-sm capitalize">
                {Array.isArray(value)
                  ? value.map((item) => item.title || item.name).join(", ")
                  : (value ?? "Unknown")}
              </p>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <Table aria-label="Properties Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>{properties.map((item) => renderRow(item))}</TableBody>
      </Table>
    </>
  );
}
