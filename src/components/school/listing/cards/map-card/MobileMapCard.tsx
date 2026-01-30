"use client";
import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import Image from "next/image";
import { schools } from "./mock";
import { School } from "./types";
import MapHeader from "./MapHeader";

const getMarkerColor = (grade: string): string => {
  const colors: Record<string, string> = {
    "A+": "#00DF8B",
    A: "#1ad598",
    "B+": "#4CAF50",
    B: "#8BC34A",
    "C+": "#FFC107",
  };
  return colors[grade] || colors["C+"];
};

export default function MobileMapCard({ id }: { id: string }) {
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");
  const [showLabels, setShowLabels] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (typeof google === "undefined" || !mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 35.1983, lng: -111.6513 },
        zoom: 13,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#464646" }],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [{ color: "#f2f2f2" }],
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [{ color: "#d1e6ea" }],
          },
        ],
        disableDefaultUI: true, // Disable all default UI controls
        zoomControl: true, // Enable zoom controls
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM,
        },
        streetViewControl: false, // Disable street view on mobile
        mapTypeControl: false,
        fullscreenControl: false,
      });

      mapInstanceRef.current = map;

      // Clear existing markers
      markersRef.current.forEach((marker) => (marker as any).setMap(null));
      markersRef.current = [];

      // Create markers for each school
      schools.forEach((school) => {
        const marker = new google.maps.Marker({
          position: school.position,
          map: map,
          icon: {
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(`
                <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="18" fill="${getMarkerColor(
                    school.grade
                  )}"/>
                  <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-weight="bold" font-size="14">${
                    school.grade
                  }</text>
                </svg>
              `),
            scaledSize: new google.maps.Size(36, 36),
          },
        });

        marker.addListener("click", () => {
          setSelectedSchool(school);
        });

        markersRef.current.push(marker);
      });
    };

    // Check if Google Maps is already loaded
    if (typeof google !== "undefined" && google.maps) {
      initMap();
    } else {
      // Wait for Google Maps to load
      const checkGoogle = setInterval(() => {
        if (typeof google !== "undefined" && google.maps) {
          clearInterval(checkGoogle);
          initMap();
        }
      }, 100);

      return () => clearInterval(checkGoogle);
    }
  }, []);

  // Handle map type and labels changes
  useEffect(() => {
    if (!mapInstanceRef.current || typeof google === "undefined") return;

    const map = mapInstanceRef.current;

    // Set map type and labels (matching desktop logic)
    if (mapType === "satellite") {
      // Use HYBRID for satellite with labels, SATELLITE for satellite without labels
      if (showLabels) {
        map.setMapTypeId(google.maps.MapTypeId.HYBRID);
      } else {
        map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
      }
    } else {
      // For roadmap, use styles to hide labels if needed
      map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
      const baseStyles = [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#464646" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#d1e6ea" }],
        },
      ];
      
      // Hide labels if showLabels is false
      if (!showLabels) {
        baseStyles.push({
          featureType: "all",
          elementType: "labels",
          stylers: [{ visibility: "off" } as any],
        });
      }
      
      (map as any).setOptions({ styles: baseStyles });
    }
  }, [mapType, showLabels]);

  const handleFullscreen = () => {
    const mapContent = document.getElementById(`map-content-${id}`);
    if (!mapContent) return;

    if (!document.fullscreenElement) {
      if (mapContent.requestFullscreen) {
        mapContent.requestFullscreen();
      } else if ((mapContent as any).webkitRequestFullscreen) {
        (mapContent as any).webkitRequestFullscreen();
      } else if ((mapContent as any).msRequestFullscreen) {
        (mapContent as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  const handleSchoolClick = (school: School) => {
    setSelectedSchool(school);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(school.position);
      mapInstanceRef.current.setZoom(15);
      // Scroll to map
      mapRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMapTypeChange = (type: "roadmap" | "satellite") => {
    setMapType(type);
  };

  return (
    <div id={id} className="block md:hidden max-w-[390px] mx-auto" style={{ scrollMarginTop: "80px" }}>
      <div className="w-full bg-white rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.05)] overflow-hidden border border-black/10">
        {/* Header with controls */}
        <MapHeader 
          mapType={mapType}
          setMapType={setMapType}
          onMapTypeChange={handleMapTypeChange}
          showLabels={showLabels}
          setShowLabels={setShowLabels}
        />

        {/* Map Content */}
        <div
          id={`map-content-${id}`}
          className="relative h-[400px]"
        >
          {/* Fullscreen Button */}
          <button
            onClick={handleFullscreen}
            className="absolute top-2.5 right-2.5 z-[5] bg-white border-none rounded w-8 h-8 flex items-center justify-center cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
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
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </button>

          {/* Map */}
          <div ref={mapRef} className="w-full h-full" />

          {/* School Tooltip */}
          {selectedSchool && (
            <div className="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 z-[1000] bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-3 w-[250px] flex gap-3">
              <Image
                src={selectedSchool.image}
                alt={selectedSchool.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-md object-cover"
              />
              <div className="flex-grow flex flex-col justify-between">
                <h3 className="text-[#464646] text-[15px] font-semibold m-0 mb-1">
                  {selectedSchool.name}
                </h3>
                <p className="text-[#5F5F5F] text-[13px] m-0">
                  {selectedSchool.location}
                </p>
              </div>
              <button
                onClick={() => setSelectedSchool(null)}
                className="absolute top-1.5 right-1.5 text-[#5F5F5F] bg-transparent border-none text-base cursor-pointer"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* School List */}
        <div className="p-4 bg-white">
          <h3 className="text-lg font-semibold text-[#464646] mb-4">
            Nearby Schools
          </h3>
          {schools.map((school) => {
            const gradeClass = `marker-${school.grade
              .toLowerCase()
              .replace("+", "-plus")}`;
            return (
              <div
                key={school.id}
                onClick={() => handleSchoolClick(school)}
                className="flex gap-3 p-3 rounded-lg bg-white border border-black/8 mb-3 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <Image
                  src={school.image}
                  alt={school.name}
                  width={60}
                  height={60}
                  className="w-[60px] h-[60px] rounded-md object-cover"
                />
                <div className="flex-grow">
                  <h3 className="text-[#464646] text-base font-semibold m-0 mb-1">
                    {school.name}
                  </h3>
                  <p className="text-[#5F5F5F] text-sm m-0">
                    {school.location}
                  </p>
                </div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${gradeClass}`}
                  style={{
                    background:
                      gradeClass === "marker-a-plus"
                        ? "#00DF8B"
                        : gradeClass === "marker-a"
                        ? "#1ad598"
                        : gradeClass === "marker-b-plus"
                        ? "#4CAF50"
                        : gradeClass === "marker-b"
                        ? "#8BC34A"
                        : "#FFC107",
                  }}
                >
                  {school.grade}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Script
        id="google-maps-mobile"
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBuuN90JoSkfCGWSO_i5MOqMZnQiZ9skiY`}
        strategy="afterInteractive"
      />
    </div>
  );
}

