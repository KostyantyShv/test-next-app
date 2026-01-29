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
    list: 4,
    hybrid: 4,
    classic: 8,
  };

  const getGridCols = () => {
    if (layout === "grid") {
      // Match provided HTML (6.5) when map is OFF:
      // 3 cols, 2 below 900px, 1 below 600px
      //
      // When map is ON, available width is much smaller → keep cards readable:
      // 2 cols, 1 below ~700px.
      return isMapActive
        ? "grid-cols-2 max-[700px]:grid-cols-1"
        : "grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1";
    }
    if (layout === "hybrid") {
      return isMapActive ? "grid-cols-1" : "grid-cols-2";
    }
    if (layout === "classic") {
      return isMapActive ? "grid-cols-2" : "grid-cols-4";
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
        className={`flex-1 min-w-0 p-6 transition-all duration-300 ${isMapExpanded ? "hidden" : ""}`}
        aria-hidden={isMapExpanded}
      >
        {/* Mobile Layouts */}
        <div className="md:hidden">
          {layout === "grid" && (
            <div className="flex flex-col gap-4">
              {renderCards()}
            </div>
          )}
          {layout === "list" && (
            <div className="flex flex-col gap-4">
              {renderCards()}
            </div>
          )}
          {layout === "hybrid" && (
            <div className="grid grid-cols-1 gap-4">
              {renderCards()}
            </div>
          )}
          {layout === "classic" && (
            <div className="flex flex-col gap-4">
              {renderCards()}
            </div>
          )}
        </div>

        {/* Desktop Layouts */}
        <div className="hidden md:block min-w-0">
          {layout === "grid" || layout === "hybrid" || layout === "classic" ? (
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
      <MapContainer isMapActive={isMapActive} schools={schools} layout={layout} onExpandedChange={setIsMapExpanded} />
    </div>
  );
};

export default ContentArea;
