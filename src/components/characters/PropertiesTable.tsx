"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { EDITABLE_PROPERTIES } from "@/app/constants";
import { EditIcon } from "../icons/EditIcon";

export interface Property {
  key: string;
  value: string | number | { title?: string; name?: string }[] | null;
}

interface PropertiesTableProps {
  properties: Property[];
}

export const columns: { name: string; uid: string }[] = [
  { name: "PROPERTY", uid: "property" },
  { name: "DETAIL", uid: "detail" },
];

export default function PropertiesTable({ properties }: PropertiesTableProps) {
  const renderRow = ({ key, value }: Property) => {
    const property = key.replace("_", " ");
    return (
      <TableRow key={key}>
        <TableCell>
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{property}:</p>
          </div>
        </TableCell>
        <TableCell>
          <div className="relative flex items-center gap-2">
            <p className="font-extrabold text-sm capitalize">
              {Array.isArray(value)
                ? value.map((item) => item.title || item.name).join(", ")
                : (value ?? "Unknown")}
            </p>
            {EDITABLE_PROPERTIES.includes(key) && (
              <Tooltip content={`Edit ${property}`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <Table aria-label="Example table with custom cells">
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