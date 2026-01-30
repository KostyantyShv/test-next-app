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
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(min-width: 768px)").matches;
  });
  const mapContainerRef = useRef<{ exitStreetView: () => void } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(min-width: 768px)");

    const update = () => setIsDesktop(mql.matches);
    update();

    // Safari fallback
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
    mql.addListener(update);
    return () => mql.removeListener(update);
  }, []);

  const handleMapTypeChange = (_type: "roadmap" | "satellite") => {
    if (mapContainerRef.current) {
      mapContainerRef.current.exitStreetView();
    }
  };

  return (
    <>
      {/* Mobile Map Card (only render on mobile to avoid initializing Google Maps in hidden DOM) */}
      {!isDesktop && <MobileMapCard id={id} />}

      {/* Desktop Map Card */}
      {isDesktop && (
        <div
          id={id}
          className="hidden md:flex justify-center my-cardMargin"
          style={{ scrollMarginTop: "132px" }}
        >
          <div className="w-full max-w-[1077px] bg-white rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.05)] overflow-hidden border border-black/10">
            <MapHeader
              mapType={mapType}
              setMapType={setMapType}
              onMapTypeChange={handleMapTypeChange}
              showLabels={showLabels}
              setShowLabels={setShowLabels}
            />
            {/* Match Explore map panel height */}
            <div className="relative h-[400px]">
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
      )}
    </>
  );
}
