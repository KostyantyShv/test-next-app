import React, { useState } from "react";
import SearchMapContainer from "./SearchMapContainer";
import SchoolCard from "../../explore/SchoolCard";
import { School } from "../../explore/types";

interface SearchContentAreaProps {
  isMapActive: boolean;
  layout: string;
  schools: School[];
}

const SearchContentArea: React.FC<SearchContentAreaProps> = ({
  isMapActive,
  layout,
  schools,
}) => {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const cardCounts = {
    grid: 6,
    card: 6,
    list: 4,
    magazine: 4,
    hybrid: 4,
    classic: 8,
  };

  const getGridCols = () => {
    if (layout === "grid" || layout === "card") {
      return isMapActive
        ? "grid-cols-2 max-[900px]:grid-cols-1"
        : "grid-cols-3 max-[1200px]:grid-cols-2 max-[900px]:grid-cols-1";
    }
    if (layout === "hybrid") {
      return isMapActive ? "grid-cols-1" : "grid-cols-2 max-[900px]:grid-cols-1";
    }
    if (layout === "classic") {
      return isMapActive
        ? "grid-cols-2 max-[900px]:grid-cols-1"
        : "grid-cols-4 max-[1200px]:grid-cols-3 max-[1000px]:grid-cols-2 max-[800px]:grid-cols-1";
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
      <div className={`flex-1 min-w-0 p-6 transition-all duration-300 ${isMapExpanded ? 'hidden' : ''}`}>
        {/* Mobile Layouts */}
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
      <SearchMapContainer isMapActive={isMapActive} schools={schools} onExpandedChange={setIsMapExpanded} />
    </div>
  );
};

export default SearchContentArea; 
