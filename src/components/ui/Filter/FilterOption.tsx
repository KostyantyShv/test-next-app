export interface FilterOptionType {
  value: string;
  label: string;
}
interface FilterOptionProps {
  filter: string;
  option: FilterOptionType;
}

export const FilterOption: React.FC<FilterOptionProps> = ({
  filter,
  option,
}) => (
  <label className="filter-option flex items-center gap-2 px-3 py-2 rounded hover:bg-[#f8fafc] cursor-pointer text-sm">
    <input
      type="checkbox"
      data-filter={filter}
      data-value={option.value}
      className="w-4 h-4 border-2 border-[#cbd5e0] rounded cursor-pointer"
    />
    {option.label}
  </label>
);
