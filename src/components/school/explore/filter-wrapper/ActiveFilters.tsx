// ActiveFilters.tsx
import FilterPill from "@/components/ui/Filter/FilterPill";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import React from "react";

const ActiveFilters = () => {
  const { getActiveFilters } = useSchoolsExplore((state) => state);

  const renderActivePills = () => {
    const activeFilters = getActiveFilters();
    return activeFilters.map((filter) => {
      let displayValue: string;
      switch (filter.type) {
        case "tuition":
          displayValue = `$${Number(filter.value).toLocaleString()}`;
          break;
        case "ration":
          displayValue = `${filter.value}:1`;
          break;
        case "schoolScoutGrades":
          displayValue = String(filter.value);
          break;
        case "rating":
          displayValue = `${filter.value}+ Rating`;
          break;
        default:
          displayValue = String(filter.value);
      }
      return (
        <FilterPill
          key={`${filter.type}-${filter.value}`}
          filterType={filter.type as string} // Cast to string
          value={displayValue}
        />
      );
    });
  };

  return (
    <span
      className={`${
        getActiveFilters().length !== 0 ? "block" : "hidden"
      } text-sm font-medium text-textDefault flex flex-row flex-wrap items-center gap-2`}
    >
      Active Filters: {renderActivePills()}
    </span>
  );
};

export default ActiveFilters;
