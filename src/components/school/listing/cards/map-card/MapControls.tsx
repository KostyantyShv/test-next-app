"use client";
import { Dispatch, SetStateAction } from "react";

interface MapControlsProps {
  mapType: "roadmap" | "satellite";
  setMapType: Dispatch<SetStateAction<"roadmap" | "satellite">>;
  onMapTypeChange: (type: "roadmap" | "satellite") => void;
  showTerrain: boolean;
  setShowTerrain: Dispatch<SetStateAction<boolean>>;
  showLabels: boolean;
  setShowLabels: Dispatch<SetStateAction<boolean>>;
}

export default function MapControls({ 
  mapType, 
  setMapType, 
  onMapTypeChange,
  showTerrain,
  setShowTerrain,
  showLabels,
  setShowLabels,
}: MapControlsProps) {
  const toggleFullscreen = () => {
    const mapContent = document.querySelector(".map-content");
    if (!mapContent) return;
    if (!document.fullscreenElement) {
      mapContent.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleMapTypeClick = (type: "roadmap" | "satellite") => {
    setMapType(type);
    onMapTypeChange(type);
    // Reset terrain when switching to satellite
    if (type === "satellite") {
      setShowTerrain(false);
    }
  };

  return (
    <>
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        <div className="flex rounded-md shadow-md overflow-hidden bg-white">
          <button
            className={`px-3 py-2 text-sm transition-colors ${
              mapType === "roadmap"
                ? "bg-gray-100 text-[#464646] font-medium"
                : "text-[#5F5F5F] hover:bg-gray-50"
            }`}
            onClick={() => handleMapTypeClick("roadmap")}
          >
            Map
          </button>
          <button
            className={`px-3 py-2 text-sm border-l border-black/10 transition-colors ${
              mapType === "satellite"
                ? "bg-gray-100 text-[#464646] font-medium"
                : "text-[#5F5F5F] hover:bg-gray-50"
            }`}
            onClick={() => handleMapTypeClick("satellite")}
          >
            Satellite
          </button>
        </div>
        
        {/* Terrain button - only show when mapType is roadmap */}
        {mapType === "roadmap" && (
          <button
            className={`px-3 py-2 text-sm rounded-md shadow-md transition-colors bg-white ${
              showTerrain
                ? "bg-gray-100 text-[#464646] font-medium"
                : "text-[#5F5F5F] hover:bg-gray-50"
            }`}
            onClick={() => setShowTerrain(!showTerrain)}
          >
            Terrain
          </button>
        )}

        {/* Labels toggle - only show when mapType is satellite */}
        {mapType === "satellite" && (
          <button
            className={`px-3 py-2 text-sm rounded-md shadow-md transition-colors bg-white flex items-center gap-2 ${
              showLabels
                ? "bg-gray-100 text-[#464646] font-medium"
                : "text-[#5F5F5F] hover:bg-gray-50"
            }`}
            onClick={() => setShowLabels(!showLabels)}
          >
            <svg
              className={`w-4 h-4 ${showLabels ? "text-[#464646]" : "text-[#5F5F5F]"}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {showLabels ? (
                <path d="M3 7V5a2 2 0 0 1 2-2h2M7 7h10M7 7l-4 4m4-4l4 4m6 0h2a2 2 0 0 1 2 2v2m-4-4V5a2 2 0 0 0-2-2h-2m-4 4h10m-4 4v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-6" />
              ) : (
                <>
                  <path d="M3 7V5a2 2 0 0 1 2-2h2M7 7h10M7 7l-4 4m4-4l4 4m6 0h2a2 2 0 0 1 2 2v2m-4-4V5a2 2 0 0 0-2-2h-2m-4 4h10m-4 4v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-6" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </>
              )}
            </svg>
            Labels
          </button>
        )}
      </div>
      <button
        className="absolute top-2 right-2 z-10 bg-white rounded-md w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
        onClick={toggleFullscreen}
        aria-label="Toggle fullscreen"
      >
        <svg
          className="w-4 h-4 text-[#565656]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
      </button>
    </>
  );
}
