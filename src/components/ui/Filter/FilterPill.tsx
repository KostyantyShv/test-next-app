// FilterPill.tsx
import { useSchoolsExplore } from "@/store/use-schools-explore";
import React from "react";
import { FilterValue, FiltersType } from "@/types/schools-explore";

const FilterPill = ({
  filterType,
  value,
}: {
  value: FilterValue;
  filterType: keyof FiltersType;
}) => {
  const removeFilter = useSchoolsExplore((state) => state.removeFilter);
  const handleRemoveFilter = () => removeFilter(filterType, value);

  // let displayValue: string;
  // switch (filterType) {
  //   case "tuition":
  //     displayValue = `$${Number(value).toLocaleString()}`;
  //     break;
  //   case "ration":
  //     displayValue = `${value}:1`;
  //     break;
  //   case "schoolScoutGrades":
  //     displayValue = String(value); // Already in "Academics: A" format
  //     break;
  //   default:
  //     displayValue = String(value); // Default to string conversion
  // }

  return (
    <div className="flex flex-row rounded-2xl bg-[#F2F2F2] py-1 px-2 w-fit items-center justify-center gap-2">
      <span className="border-r-2 pr-2">{value}</span>
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
