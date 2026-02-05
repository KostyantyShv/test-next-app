import React, { useState, useEffect } from "react";
import MapContainer from "./MapContainer";
import SchoolCard from "../SchoolCard";
import { School } from "../types";

interface ContentAreaProps {
  isMapActive: boolean;
  layout: string;
  schools: School[];
}

const ContentArea: React.FC<ContentAreaProps> = ({
  isMapActive,
  layout,
  schools,
}) => {
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  useEffect(() => {
    if (!isMapActive) setIsMapExpanded(false);
  }, [isMapActive]);

  // При повноекранній мапі (isMapExpanded) картки ховаються; при виході — знову показуються.
  const cardCounts = {
    grid: 6,
    card: 6,
    list: 4,
    magazine: 4,
    hybrid: 4,
    classic: 8,
  };

  const getGridCols = () => {
    if (layout === "grid") {
      // Keep cards readable on narrower viewports (avoid overlap).
      return isMapActive
        ? "grid-cols-2 max-[900px]:grid-cols-1"
        : "grid-cols-3 max-[1200px]:grid-cols-2 max-[900px]:grid-cols-1";
    }
    if (layout === "card") {
      // Same responsive behavior as grid to prevent cramped columns.
      return isMapActive
        ? "grid-cols-2 max-[900px]:grid-cols-1"
        : "grid-cols-3 max-[1200px]:grid-cols-2 max-[900px]:grid-cols-1";
    }
    if (layout === "hybrid") {
      return isMapActive ? "grid-cols-1" : "grid-cols-2 max-[900px]:grid-cols-1";
    }
    if (layout === "classic") {
      // When map is active: 2 columns only; when map is off: 4 columns with responsive breakpoints
      return isMapActive
        ? "grid-cols-2 max-[700px]:grid-cols-1"
        : "grid-cols-4 max-[1100px]:grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1";
    }
    return "";
  };

  const renderCards = () => {
    const count = cardCounts[layout as keyof typeof cardCounts] || 8;
    return schools
      .slice(0, count)
      .map((school: School, i: number) => (
        <SchoolCard key={i} school={school} layout={layout} />
      ));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[400px] min-w-0">
      <div
        className={`explore-content-area flex-1 min-w-0 md:p-6 transition-all duration-300 ${isMapExpanded ? "hidden" : ""}`}
        aria-hidden={isMapExpanded}
      >
        {/* Mobile Layouts — grid matches School Finder Mobile (10) reference: padding 16px 12px, gap 16px */}
        <div className="md:hidden">
          {layout === "grid" && (
            <div className="flex flex-col" style={{ padding: '16px 12px', gap: 16 }}>
              {renderCards()}
            </div>
          )}
          {layout === "card" && (
            <div className="py-4 px-4 flex flex-col gap-4">
              {renderCards()}
            </div>
          )}
          {layout === "list" && (
            <div className="py-4 pl-4 pr-5 flex flex-col gap-4">
              {renderCards()}
            </div>
          )}
          {layout === "magazine" && (
            <div className="py-4 pl-4 pr-5 flex flex-col gap-4">
              {renderCards()}
            </div>
          )}
          {layout === "hybrid" && (
            <div className="py-4 px-4 grid grid-cols-1 gap-4">
              {renderCards()}
            </div>
          )}
          {layout === "classic" && (
            <div className="p-4 pb-5 flex flex-col gap-4">
              {renderCards()}
            </div>
          )}
        </div>

        {/* Desktop Layouts */}
        <div className="hidden md:block min-w-0">
          {layout === "grid" || layout === "card" || layout === "hybrid" || layout === "classic" ? (
            <div className={`grid gap-6 min-w-0 ${getGridCols()}`}>
              {renderCards()}
            </div>
          ) : (
            <div className="flex flex-col gap-4 min-w-0">
              {renderCards()}
            </div>
          )}
        </div>
      </div>
      {/* Desktop map panel only (mobile uses a drawer in Header) */}
      <div
        className={`hidden md:block min-w-0 ${
          isMapActive && isMapExpanded ? "flex-1" : "shrink-0 self-start sticky top-6"
        }`}
      >
        <MapContainer
          isMapActive={isMapActive}
          schools={schools}
          layout={layout}
          onExpandedChange={setIsMapExpanded}
        />
      </div>
    </div>
  );
};

export default ContentArea;
