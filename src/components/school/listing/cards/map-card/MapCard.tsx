"use client";
import { useState, useRef, useEffect } from "react";
import Script from "next/script";
import MapHeader from "./MapHeader";
import MapContainer from "./MapContainer";
import MobileMapCard from "./MobileMapCard";
import { schools } from "./mock";

export default function MapCard({ id }: { id: string }) {
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");
  const [showLabels, setShowLabels] = useState(true);
  const mapContainerRef = useRef<{ exitStreetView: () => void } | null>(null);
  const desktopMapRef = useRef<HTMLDivElement>(null);

  // Ensure id is set after component mounts (for dynamic imports)
  useEffect(() => {
    if (desktopMapRef.current && id) {
      desktopMapRef.current.id = id;
    }
  }, [id]);

  const handleMapTypeChange = (type: "roadmap" | "satellite") => {
    if (mapContainerRef.current) {
      mapContainerRef.current.exitStreetView();
    }
  };

  return (
    <>
      {/* Mobile Map Card */}
      <MobileMapCard id={id} />

      {/* Desktop Map Card - Always render outer div with id (like other components) */}
      <div 
        ref={desktopMapRef}
        id={id} 
        className="flex justify-center my-cardMargin"
        style={{ scrollMarginTop: "176px" }}
      >
        <div className="hidden md:block w-full max-w-[875px] bg-white rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.05)] overflow-hidden border border-black/10">
          <MapHeader 
            mapType={mapType}
            setMapType={setMapType}
            onMapTypeChange={handleMapTypeChange}
            showLabels={showLabels}
            setShowLabels={setShowLabels}
          />
          <div className="relative h-[500px]">
            <MapContainer 
              schools={schools} 
              mapType={mapType}
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
