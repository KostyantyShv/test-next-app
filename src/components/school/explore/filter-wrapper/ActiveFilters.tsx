import FilterPill from "@/components/ui/Filter/FilterPill";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import React, { useMemo } from "react";
import { FilterItem } from "@/types/schools-explore"; // Ensure this type exists

const ActiveFilters: React.FC = () => {
  const {
    getActiveFiltersK12,
    getActiveFiltersCollege,
    getActiveFiltersGraduates,
    establishment,
  } = useSchoolsExplore((state) => state);

  const getActiveFilters = useMemo(() => {
    switch (establishment) {
      case "K-12":
        return getActiveFiltersK12;
      case "Colleges":
        return getActiveFiltersCollege;
      default:
        return getActiveFiltersGraduates;
    }
  }, [
    establishment,
    getActiveFiltersK12,
    getActiveFiltersCollege,
    getActiveFiltersGraduates,
  ]);

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
        getActiveFilters().length ? "block" : "hidden"
      } text-sm font-medium text-textDefault flex flex-wrap items-center gap-2`}
    >
      Active Filters:{" "}
      {getActiveFilters().map((filter: FilterItem) => (
        <FilterPill
          key={`${filter.type}-${filter.value}`}
          filterType={String(filter.type)} // Ensure type is string
          value={formatDisplayValue(String(filter.type), filter.value)}
        />
      ))}
    </span>
  );
};

export default ActiveFilters;
