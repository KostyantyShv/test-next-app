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

  return (
    <div className="flex flex-col md:flex-row min-h-[400px]">
      <div className="flex-1 p-6 transition-all duration-300">
        {/* Mobile Layouts */}
        <div className="md:hidden">
          {layout === "grid" && (
            <div className="grid grid-cols-2 gap-4">
              {schools
                .slice(0, 6)
                .map((school: School, i: number) => (
                  <SchoolCard key={i} school={school} layout="grid" />
                ))}
            </div>
          )}
          {layout === "list" && (
            <div className="flex flex-col gap-4">
              {schools
                .slice(0, 4)
                .map((school: School, i: number) => (
                  <SchoolCard key={i} school={school} layout="list" />
                ))}
            </div>
          )}
          {layout === "hybrid" && (
            <div className="grid grid-cols-2 gap-4">
              {schools
                .slice(0, 4)
                .map((school: School, i: number) => (
                  <SchoolCard key={i} school={school} layout="hybrid" />
                ))}
            </div>
          )}
          {layout === "classic" && (
            <div className="grid grid-cols-2 gap-4">
              {schools
                .slice(0, 8)
                .map((school: School, i: number) => (
                  <SchoolCard key={i} school={school} layout="classic" />
                ))}
            </div>
          )}
        </div>

        {/* Desktop Layouts */}
        <div className="hidden md:block">
          <div
            className={`grid gap-6 ${
              layout === "grid" ? "grid-cols-3" : "hidden"
            } ${isMapActive ? "grid-cols-2" : ""}`}
          >
            {schools
              .slice(0, cardCounts.grid)
              .map((school: School, i: number) => (
                <SchoolCard key={i} school={school} layout={layout} />
              ))}
          </div>
          <div
            className={`flex flex-col gap-4 ${
              layout === "list" ? "block" : "hidden"
            }`}
          >
            {schools
              .slice(0, cardCounts.list)
              .map((school: School, i: number) => (
                <SchoolCard key={i} school={school} layout={layout} />
              ))}
          </div>
          <div
            className={`grid gap-6 ${
              layout === "hybrid" ? "grid-cols-2" : "hidden"
            } ${isMapActive ? "grid-cols-1" : ""}`}
          >
            {schools
              .slice(0, cardCounts.hybrid)
              .map((school: School, i: number) => (
                <SchoolCard key={i} school={school} layout={layout} />
              ))}
          </div>
          <div
            className={`grid gap-6 ${
              layout === "classic" ? "grid-cols-4" : "hidden"
            } ${isMapActive ? "grid-cols-3" : ""}`}
          >
            {schools
              .slice(0, cardCounts.classic)
              .map((school: School, i: number) => (
                <SchoolCard key={i} school={school} layout={layout} />
              ))}
          </div>
        </div>
      </div>
      <SearchMapContainer isMapActive={isMapActive} />
    </div>
  );
};

export default SearchContentArea; 