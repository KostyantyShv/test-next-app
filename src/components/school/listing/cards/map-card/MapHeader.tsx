"use client";
import { Dispatch, SetStateAction } from "react";

interface MapHeaderProps {
  mapType: "roadmap" | "satellite";
  setMapType: Dispatch<SetStateAction<"roadmap" | "satellite">>;
  onMapTypeChange: (type: "roadmap" | "satellite") => void;
  showLabels: boolean;
  setShowLabels: Dispatch<SetStateAction<boolean>>;
}

export default function MapHeader({
  mapType,
  setMapType,
  onMapTypeChange,
  showLabels,
  setShowLabels,
}: MapHeaderProps) {
  const handleMapTypeClick = (type: "roadmap" | "satellite") => {
    setMapType(type);
    onMapTypeChange(type);
  };

  return (
    <div className="px-4 md:px-6 py-4 md:py-5 border-b border-black/8 flex justify-between items-center">
      <h2 className="text-[#333] text-xl md:text-2xl font-semibold m-0">Map</h2>
      
      {/* Controls Wrapper */}
      <div className="flex items-center gap-3">
        {/* Labels Toggle Button (Square with curved edges) */}
        <button
          className={`w-10 h-10 border rounded-[10px] flex items-center justify-center transition-all duration-200 ${
            showLabels
              ? "bg-[#EBFCF4] text-[#016853] border-[#00DF8B]"
              : "bg-white text-[#5F5F5F] border-[#E0E0E0] hover:bg-[#F9FAFB] hover:text-[#1B1B1B] hover:border-[#D0D0D0]"
          }`}
          onClick={() => setShowLabels(!showLabels)}
          title="Toggle Labels"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6h.008v.008H6V6Z"
            />
          </svg>
        </button>

        {/* Map Type Toggle Group (Segmented Control) */}
        <div className="bg-[#F2F4F7] p-1 rounded-[10px] flex gap-0.5">
          <button
            className={`px-4 py-2 text-sm font-semibold rounded-lg border-none transition-all duration-200 ${
              mapType === "roadmap"
                ? "bg-white text-[#016853] shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
                : "bg-transparent text-[#5F5F5F] hover:text-[#1B1B1B]"
            }`}
            onClick={() => handleMapTypeClick("roadmap")}
          >
            Map
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold rounded-lg border-none transition-all duration-200 ${
              mapType === "satellite"
                ? "bg-white text-[#016853] shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
                : "bg-transparent text-[#5F5F5F] hover:text-[#1B1B1B]"
            }`}
            onClick={() => handleMapTypeClick("satellite")}
          >
            Satellite
          </button>
        </div>
      </div>
    </div>
  );
}
