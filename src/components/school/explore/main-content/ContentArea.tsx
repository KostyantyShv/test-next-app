import React from "react";
import MapContainer from "./MapContainer";
import SchoolCard, { School, schools } from "../SchoolCard";

interface ContentAreaProps {
  isMapActive: boolean;
  layout: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({ isMapActive, layout }) => {
  // Define the number of cards to show based on layout
  const cardCounts = {
    grid: 6,
    list: 4,
    hybrid: 4,
    classic: 8,
  };

  return (
    <div className="flex p-6 min-h-[400px]">
      <div className="flex-1 transition-all duration-300">
        <div
          className={`grid gap-6 ${
            layout === "grid" ? "grid-cols-3" : "hidden"
          } ${isMapActive ? "grid-cols-2" : ""}`}
        >
          {schools
            .slice(0, cardCounts.grid)
            .map((school: School, i: number) => (
              <SchoolCard key={i} school={school} />
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
              <SchoolCard key={i} school={school} />
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
              <SchoolCard key={i} school={school} />
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
              <SchoolCard key={i} school={school} />
            ))}
        </div>
      </div>
      <MapContainer isMapActive={isMapActive} />
    </div>
  );
};

export default ContentArea;
