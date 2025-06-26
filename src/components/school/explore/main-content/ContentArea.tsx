import React from "react";
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
  const cardCounts = {
    grid: 6,
    list: 4,
    hybrid: 4,
    classic: 8,
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[400px]">
      <div className="flex-1 p-6 transition-all duration-300">
        {/* Mobile Grid Layout */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-4">
            {schools
              .slice(0, 6)
              .map((school: School, i: number) => (
                <SchoolCard key={i} school={school} layout="grid" />
              ))}
          </div>
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
      <MapContainer isMapActive={isMapActive} />
    </div>
  );
};

export default ContentArea;
