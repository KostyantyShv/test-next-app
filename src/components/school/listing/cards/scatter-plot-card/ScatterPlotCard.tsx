"use client";

import { useState, useMemo } from "react";
import ScatterPlotCanvas from "./ScatterPlotCanvas";
import FiltersSection from "./FiltersSection";
import StatsSection from "./StatsSection";
import { userPoint } from "./mock";
import DataSource from "./DataSource";

export default function AdmissionsScatterPlotCard({ id }: { id: string }) {
  const [filters, setFilters] = useState({
    accepted: true,
    rejected: true,
    considering: true,
  });

  const handleMajorChange = () => {
    // Placeholder for future implementation
  };

  const handleFilterChange = (type: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // Memoize activeFilters to ensure stable reference when filters don't change
  const activeFilters = useMemo(() => {
    return Object.entries(filters)
      .filter(([_, checked]) => checked)
      .map(([type]) => type);
  }, [filters]); // Only recompute when filters object changes

  return (
    <div id={id} className="flex justify-center items-center">
      <div className="w-full p-cardPadding md:max-w-[875px] bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden md:py-cardPadding">
        <div className="mb-5 md:mb-6">
          <h1 className="text-[#016853] text-xl md:text-2xl font-semibold mb-4 md:mb-5">
            Will You Get Into Lincoln University?
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 mb-5">
          <FiltersSection
            filters={filters}
            onFilterChange={handleFilterChange}
            onMajorChange={handleMajorChange}
          />
          <StatsSection />
        </div>
        <ScatterPlotCanvas
          userPoint={userPoint}
          activeFilters={activeFilters}
        />
        <DataSource />
      </div>
    </div>
  );
}
