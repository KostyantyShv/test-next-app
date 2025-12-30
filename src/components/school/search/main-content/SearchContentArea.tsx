import React from "react";
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
  const cardCounts = {
    grid: 6,
    list: 4,
    hybrid: 4,
    classic: 8,
  };

  const getGridCols = () => {
    if (layout === "grid") {
      return isMapActive ? "grid-cols-2" : "grid-cols-3";
    }
    if (layout === "hybrid") {
      return isMapActive ? "grid-cols-1" : "grid-cols-2";
    }
    if (layout === "classic") {
      return isMapActive ? "grid-cols-3" : "grid-cols-4";
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
    <div className="flex flex-col md:flex-row min-h-[400px]">
      <div className="flex-1 p-6 transition-all duration-300">
        {/* Mobile Layouts */}
        <div className="md:hidden">
          {layout === "grid" && (
            <div className="grid grid-cols-1 gap-4">
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
        <div className="hidden md:block">
          {layout === "grid" || layout === "hybrid" || layout === "classic" ? (
            <div className={`grid gap-6 ${getGridCols()}`}>
              {renderCards()}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {renderCards()}
            </div>
          )}
        </div>
      </div>
      <SearchMapContainer isMapActive={isMapActive} schools={schools} />
    </div>
  );
};

export default SearchContentArea; 