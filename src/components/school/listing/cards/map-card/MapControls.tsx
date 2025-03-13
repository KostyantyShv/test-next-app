import { Dispatch, SetStateAction } from "react";

interface MapControlsProps {
  mapType: "roadmap" | "hybrid";
  setMapType: Dispatch<SetStateAction<"roadmap" | "hybrid">>;
}

export default function MapControls({ mapType, setMapType }: MapControlsProps) {
  const toggleFullscreen = () => {
    const mapContent = document.querySelector(".map-content");
    if (!mapContent) return;
    if (!document.fullscreenElement) {
      mapContent.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <>
      <div className="map-type-controls absolute top-2 left-2 z-10 flex rounded-md shadow-md overflow-hidden">
        <button
          className={`px-2 md:px-3 py-2 text-sm bg-white ${
            mapType === "roadmap"
              ? "bg-gray-100 text-[#464646] font-medium"
              : ""
          }`}
          onClick={() => setMapType("roadmap")}
        >
          Map
        </button>
        <button
          className={`px-2 md:px-3 py-2 text-sm bg-white border-l border-black border-opacity-10 ${
            mapType === "hybrid" ? "bg-gray-100 text-[#464646] font-medium" : ""
          }`}
          onClick={() => setMapType("hybrid")}
        >
          Satellite
        </button>
      </div>
      <button
        className="absolute top-2 right-2 z-10 bg-white rounded-md w-8 h-8 flex items-center justify-center shadow-md"
        onClick={toggleFullscreen}
      >
        <svg
          className="w-4 h-4"
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
