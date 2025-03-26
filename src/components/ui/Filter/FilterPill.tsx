// FilterPill.tsx
import { useSchoolsExplore } from "@/store/use-schools-explore";
import React from "react";
import { FilterValue } from "@/types/schools-explore"; // Import FilterValue

const FilterPill = ({
  filterType,
  value,
}: {
  value: FilterValue; // Change to FilterValue instead of string
  filterType: string;
}) => {
  const removeFilter = useSchoolsExplore((state) => state.removeFilter);
  const handleRemoveFilter = () => removeFilter(filterType, value);

  // Convert value to string for display
  const displayValue =
    typeof value === "number" ? `$${value.toLocaleString()}` : String(value);

  return (
    <div className="flex flex-row rounded-2xl bg-[#F2F2F2] py-1 px-2 w-fit items-center justify-center gap-2">
      <span className="border-r-2 pr-2">{displayValue}</span>
      <span>
        <button
          className="flex items-center justify-center"
          onClick={handleRemoveFilter}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      </span>
    </div>
  );
};

export default FilterPill;
