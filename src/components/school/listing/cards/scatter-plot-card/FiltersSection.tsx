import { majorOptions } from "./mock";

interface FiltersSectionProps {
  filters: {
    accepted: boolean;
    rejected: boolean;
    considering: boolean;
  };
  onFilterChange: (type: keyof FiltersSectionProps["filters"]) => void;
  onMajorChange: () => void;
}

export default function FiltersSection({
  filters,
  onFilterChange,
  onMajorChange,
}: FiltersSectionProps) {
  return (
    <div className="flex-1 space-y-4 md:space-y-5">
      <div className="space-y-3">
        <label className="checkbox-item flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.accepted}
            onChange={() => onFilterChange("accepted")}
            className="w-[18px] h-[18px] cursor-pointer accent-[#0B6333] rounded-sm"
          />
          <span className="text-[#0B6333] font-semibold">Accepted</span>
        </label>
        <label className="checkbox-item flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.rejected}
            onChange={() => onFilterChange("rejected")}
            className="w-[18px] h-[18px] cursor-pointer accent-[#FF4B4B] rounded-sm"
          />
          <span className="text-[#FF4B4B] font-semibold">Rejected</span>
        </label>
        <label className="checkbox-item flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.considering}
            onChange={() => onFilterChange("considering")}
            className="w-[18px] h-[18px] cursor-pointer accent-[#1D77BD] rounded-sm"
          />
          <span className="text-[#1D77BD] font-semibold">Considering</span>
        </label>
      </div>
      <select
        className="w-full md:w-[200px] p-2.5 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-white appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%226%22%20viewBox%3D%220%200%2012%206%22%3E%3Cpath%20fill%3D%22%235F5F5F%22%20d%3D%22M6%206L0%200h12z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:10px]"
        onChange={onMajorChange}
      >
        {majorOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
