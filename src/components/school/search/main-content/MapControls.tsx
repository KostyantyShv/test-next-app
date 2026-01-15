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
  isExpanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  mapInstanceRef?: React.RefObject<google.maps.Map | null>;
}

export default function MapControls({ 
  mapType, 
  setMapType, 
  onMapTypeChange,
  showTerrain,
  setShowTerrain,
  showLabels,
  setShowLabels,
  isExpanded = false,
  onExpand,
  onCollapse,
  mapInstanceRef,
}: MapControlsProps) {
  const handleMapTypeClick = (type: "roadmap" | "satellite") => {
    setMapType(type);
    onMapTypeChange(type);
    // Reset terrain when switching to satellite
    if (type === "satellite") {
      setShowTerrain(false);
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef?.current) {
      const currentZoom = mapInstanceRef.current.getZoom() || 10;
      mapInstanceRef.current.setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef?.current) {
      const currentZoom = mapInstanceRef.current.getZoom() || 10;
      mapInstanceRef.current.setZoom(currentZoom - 1);
    }
  };

  return (
    <>
      {/* Expand/Collapse button - left top */}
      {!isExpanded ? (
        <button
          onClick={onExpand}
          className="absolute top-[10px] left-[10px] z-10 bg-white border-none rounded shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-8 h-8 flex items-center justify-center cursor-pointer"
          title="Expand map"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ padding: '2px', alignSelf: 'center', width: '16px', height: '16px' }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M16.7161 20.704C16.3259 21.0948 15.6927 21.0953 15.3019 20.705L7.2934 12.7076C7.10562 12.5201 7.00008 12.2656 7.00002 12.0002C6.99996 11.7349 7.10539 11.4803 7.29308 11.2927L15.2943 3.2953C15.6849 2.90487 16.3181 2.90502 16.7085 3.29564C17.0989 3.68625 17.0988 4.31942 16.7082 4.70985L9.41489 11.9997L16.7151 19.2898C17.1059 19.6801 17.1064 20.3132 16.7161 20.704Z" fill="currentColor"></path>
          </svg>
        </button>
      ) : (
        <button
          onClick={onCollapse}
          className="absolute top-[10px] left-[10px] z-10 bg-white border-none rounded shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-8 h-8 flex items-center justify-center cursor-pointer"
          title="Collapse map"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ padding: '2px', alignSelf: 'center', width: '16px', height: '16px' }}>
            <path fill="currentColor" d="M7.2839 20.704C7.6741 21.0948 8.3073 21.0953 8.6981 20.705L16.7066 12.7076C16.8944 12.5201 16.9999 12.2656 17 12.0002C17.0001 11.7349 16.8946 11.4803 16.7069 11.2927L8.7057 3.2953C8.3151 2.90487 7.6819 2.90502 7.2915 3.29564C6.9011 3.68625 6.9012 4.31942 7.2918 4.70985L14.5851 11.9997L7.2849 19.2898C6.8941 19.6801 6.8936 20.3132 7.2839 20.704Z"/>
          </svg>
        </button>
      )}

      {/* Map button - right top */}
      <button
        onClick={() => handleMapTypeClick("roadmap")}
        className="absolute top-[10px] right-[10px] z-10 bg-white border-none rounded shadow-[0_2px_4px_rgba(0,0,0,0.1)] px-3 h-8 flex items-center justify-center cursor-pointer gap-1"
        title="Map"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ padding: '2px', width: '20px', height: '20px' }}>
          <path d="M11.9897 18.9994L5.02891 13.5876C4.6678 13.3068 4.16223 13.3069 3.80118 13.5877L3.76488 13.6159C3.25014 14.0163 3.25014 14.7943 3.76488 15.1946L11.3861 21.1222C11.7472 21.4031 12.2528 21.4031 12.6139 21.1222L20.236 15.1939C20.7505 14.7938 20.7508 14.0163 20.2367 13.6158L20.1888 13.5784C19.8277 13.2971 19.3216 13.2969 18.9602 13.5779L11.9897 18.9994ZM11.3858 15.9114C11.747 16.1922 12.2528 16.192 12.6139 15.911L19.5644 10.4997L20.2312 9.98337C20.7475 9.58356 20.7483 8.80426 20.2329 8.40337L12.6139 2.47751C12.2528 2.19665 11.7472 2.19665 11.3861 2.47751L3.76399 8.40578C3.24952 8.80593 3.24919 9.58339 3.76332 9.98397L4.42528 10.4997L11.3858 15.9114ZM12 4.60028L17.8994 9.19444L12 13.7886L6.10056 9.19444L12 4.60028Z" fill="currentColor"></path>
        </svg>
        <span className="text-sm font-semibold text-[#464646]" style={{ marginLeft: '4px' }}>Map</span>
      </button>

      {/* Zoom controls - right side */}
      <div className="absolute right-[10px] top-[50px] z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 bg-white border-none rounded shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center cursor-pointer"
          title="Zoom in"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
            <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z" fill="currentColor"/>
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 bg-white border-none rounded shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center cursor-pointer"
          title="Zoom out"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
            <path d="M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </>
  );
}

