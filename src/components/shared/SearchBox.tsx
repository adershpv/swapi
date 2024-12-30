import { Input } from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";

interface SearchBoxProps {
  value: string;
  onSearchChange: (value: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onSearchChange,
}) => {
  return (
    <Input
      value={value}
      onChange={(e) => onSearchChange(e.target.value)}
      autoComplete="off"
      classNames={{
        inputWrapper: [
          "bg-white",
          "data-[hover=true]:bg-white",
          "group-data-[focus=true]:bg-white",
        ],
      }}
      label="Search"
      placeholder="Type to search..."
      radius="lg"
      startContent={
        <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
      }
    />
  );
};
