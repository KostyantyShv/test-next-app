import FilterPill from "@/components/ui/Filter/FilterPill";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import React from "react";

const ActiveFilters = () => {
  const { filters, getActiveFilters } = useSchoolsExplore((state) => state);

  const renderActivePills = () => {
    return Object.entries(filters).map(([key, value]) => {
      const filterValues = (Array.isArray(value) ? value : [value]).filter(
        (item) => item !== 0 && item !== "any"
      );
      return filterValues.map((item) => (
        <FilterPill key={`${key}+${item}`} filterType={key} value={item} />
      ));
    });
  };

  return (
    <span
      className={`${
        getActiveFilters().length !== 0 ? "block" : "hidden"
      } text-sm font-medium text-textDefault flex flex-row items-center gap-2`}
    >
      Active Filters: {renderActivePills()}
    </span>
  );
};

export default ActiveFilters;
