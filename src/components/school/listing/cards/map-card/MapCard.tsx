"use client";
import { useState, useRef } from "react";
import Script from "next/script";
import MapHeader from "./MapHeader";
import MapContainer from "./MapContainer";
import MapControls from "./MapControls";
import MobileMapCard from "./MobileMapCard";
import { schools } from "./mock";

export default function MapCard({ id }: { id: string }) {
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");
  const [showTerrain, setShowTerrain] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const mapContainerRef = useRef<{ exitStreetView: () => void } | null>(null);

  const handleMapTypeChange = (type: "roadmap" | "satellite") => {
    if (mapContainerRef.current) {
      mapContainerRef.current.exitStreetView();
    }
  };

  return (
    <>
      {/* Mobile Map Card */}
      <MobileMapCard id={id} />

      {/* Desktop Map Card */}
      <div 
        id={id} 
        className="hidden md:flex justify-center my-cardMargin"
        style={{ scrollMarginTop: "176px" }}
      >
        <div className="w-full max-w-[875px] bg-white rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.05)] overflow-hidden border border-black/10">
          <MapHeader />
          <div className="relative h-[500px]">
            <MapControls 
              mapType={mapType} 
              setMapType={setMapType}
              onMapTypeChange={handleMapTypeChange}
              showTerrain={showTerrain}
              setShowTerrain={setShowTerrain}
              showLabels={showLabels}
              setShowLabels={setShowLabels}
            />
            <MapContainer 
              schools={schools} 
              mapType={mapType}
              showTerrain={showTerrain}
              showLabels={showLabels}
              ref={mapContainerRef}
            />
          </div>
        </div>
        <Script
          id="google-maps"
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBuuN90JoSkfCGWSO_i5MOqMZnQiZ9skiY`}
          strategy="afterInteractive"
        />
      </div>
    </>
  );
}
