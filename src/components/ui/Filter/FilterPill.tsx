// FilterPill.tsx
import React from "react";
import { FilterValue, FiltersType } from "@/types/schools-explore";

const FilterPill = ({
  filterType,
  value,
  removeFilter,
}: {
  value: FilterValue;
  filterType: keyof FiltersType;
  removeFilter: (value: FilterValue, filterType: keyof FiltersType) => void;
}) => {
  const handleRemoveFilter = () => removeFilter(filterType, value);

  return (
    <div className="flex flex-row rounded-2xl bg-[var(--surface-secondary)] py-1 px-2 w-fit items-center justify-center gap-2 text-[var(--text-default)] border border-[var(--border-color)]">
      <span className="border-r border-[var(--border-color)] pr-2">{value}</span>
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
