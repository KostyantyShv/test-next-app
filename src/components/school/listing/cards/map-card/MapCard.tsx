"use client";
import { useState } from "react";
import Script from "next/script";
import MapHeader from "./MapHeader";
import MapControls from "./MapControls";
import MapContainer from "./MapContainer";
import SchoolTooltip from "./SchoolTooltip";
import SchoolList from "./SchoolList";
import { schools } from "./mock";
import { School } from "./types";

export default function MapCard({ id }: { id: string }) {
  const [mapType, setMapType] = useState<"roadmap" | "hybrid">("roadmap");
  const [activeTooltip, setActiveTooltip] = useState<School | null>(null);

  return (
    <div id={id} className="flex justify-center my-cardMargin">
      <div className="w-full bg-cardBackground rounded-cardBorderRadius shadow-cardShadow overflow-hidden">
        <MapHeader />
        <div className="map-content relative h-[400px] md:h-[500px]">
          <MapControls mapType={mapType} setMapType={setMapType} />
          <MapContainer
            mapType={mapType}
            schools={schools}
            setActiveTooltip={setActiveTooltip}
          />
          {activeTooltip && (
            <SchoolTooltip
              school={activeTooltip}
              onClose={() => setActiveTooltip(null)}
            />
          )}
        </div>
        <SchoolList schools={schools} setActiveTooltip={setActiveTooltip} />
      </div>
      <Script
        id="google-maps"
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBuuN90JoSkfCGWSO_i5MOqMZnQiZ9skiY`}
        strategy="afterInteractive"
      />
    </div>
  );
}
