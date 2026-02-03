import FilterPill from "@/components/ui/Filter/FilterPill";
import React from "react";
import { FilterItem, FiltersType, FilterValue } from "@/types/schools-explore"; // Ensure this type exists

interface ActiveFiltersProps {
  filters: () => FilterItem[];
  removeFilter: (value: FilterValue, filterType: keyof FiltersType) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  removeFilter,
}) => {
  const formatDisplayValue = (type: string, value: string | number): string => {
    const formatMap: Record<string, (val: string | number) => string> = {
      tuition: (val) => `$${Number(val).toLocaleString()}`,
      ration: (val) => `${val}:1`,
      rating: (val) => `${val}+ Rating`,
      cost: (val) => `$${Number(val).toLocaleString()}`,
      sat: (val) => `SAT: ${val}`,
      act: (val) => `ACT: ${val}`,
      schoolScoutGrades: String,
    };
    return formatMap[type]?.(value) ?? String(value);
  };

  return (
    <span
      className={`${
        filters().length ? "block" : "hidden"
      } text-sm font-medium text-[var(--text-default)] flex flex-wrap items-center gap-2`}
    >
      {filters().map((filter: FilterItem) => (
        <FilterPill
          removeFilter={removeFilter}
          key={`${filter.type}-${filter.value}`}
          filterType={String(filter.type)} // Ensure type is string
          value={formatDisplayValue(String(filter.type), filter.value)}
        />
      ))}
    </span>
  );
};

export default ActiveFilters;
