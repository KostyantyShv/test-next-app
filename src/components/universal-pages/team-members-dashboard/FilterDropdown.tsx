import { FilterOption } from "./types";

interface FilterDropdownProps {
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  value,
  options,
  onChange,
}) => {
  return (
    <div className="relative">
      <select
        className="filter-select appearance-none bg-white border border-gray-200 rounded-md py-2 pl-4 pr-8 text-sm text-gray-600 cursor-pointer min-w-[160px] focus:outline-none focus:border-[#016853] focus:shadow-[0_0_0_2px_rgba(1,104,83,0.1)]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        className="select-icon absolute right-2 top-1/2 transform -translate-y-1/2 w-[18px] h-[18px] fill-gray-500 pointer-events-none"
        viewBox="0 0 24 24"
      >
        <path d="M7 10l5 5 5-5H7z"></path>
      </svg>
    </div>
  );
};
