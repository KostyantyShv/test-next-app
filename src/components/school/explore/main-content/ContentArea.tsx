import React from "react";
import MapContainer from "./MapContainer";

interface ContentAreaProps {
  isMapActive: boolean;
  layout: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({ isMapActive, layout }) => {
  return (
    <div className="flex p-6 min-h-[400px]">
      <div className="flex-1 transition-all duration-300">
        <div
          className={`grid gap-6 ${
            layout === "grid" ? "grid-cols-3" : "hidden"
          } ${isMapActive ? "grid-cols-2" : ""}`}
        >
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-[#f5f5f7] h-[300px] rounded-xl overflow-hidden"
              ></div>
            ))}
        </div>
        <div
          className={`flex flex-col gap-4 ${
            layout === "list" ? "block" : "hidden"
          }`}
        >
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-[#f5f5f7] h-[120px] rounded-xl overflow-hidden"
              ></div>
            ))}
        </div>
        <div
          className={`grid gap-6 ${
            layout === "hybrid" ? "grid-cols-2" : "hidden"
          } ${isMapActive ? "grid-cols-1" : ""}`}
        >
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-[#f5f5f7] h-[200px] rounded-xl overflow-hidden"
              ></div>
            ))}
        </div>
        <div
          className={`grid gap-6 ${
            layout === "classic" ? "grid-cols-4" : "hidden"
          } ${isMapActive ? "grid-cols-3" : ""}`}
        >
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-[#f5f5f7] h-[200px] rounded-xl overflow-hidden"
              ></div>
            ))}
        </div>
      </div>
      <MapContainer isMapActive={isMapActive} />
    </div>
  );
};

export default ContentArea;
