"use client";
import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import Script from "next/script";
import MapControls from "./MapControls";
import { School } from "../types";

interface MapContainerProps {
  isMapActive: boolean;
  schools: School[];
  layout?: string;
  onExpandedChange?: (isExpanded: boolean) => void;
  mode?: "desktopPanel" | "mobileDrawer";
}

export interface MapContainerRef {
  exitStreetView: () => void;
}

// Helper function to get position from location string
const getPositionFromLocation = (location: string, index: number): { lat: number; lng: number } => {
  // Map of known locations to coordinates
  const locationMap: Record<string, { lat: number; lng: number }> = {
    "Cambridge, MA": { lat: 42.3736, lng: -71.1097 },
    "Stanford, CA": { lat: 37.4241, lng: -122.1661 },
    "Pasadena, CA": { lat: 34.1478, lng: -118.1445 },
    "Houston, TX": { lat: 29.7604, lng: -95.3698 },
    "New York, NY": { lat: 40.7128, lng: -74.0060 },
    "Los Angeles, CA": { lat: 34.0522, lng: -118.2437 },
    "Chicago, IL": { lat: 41.8781, lng: -87.6298 },
    "Boston, MA": { lat: 42.3601, lng: -71.0589 },
  };

  // Try to find exact match
  if (locationMap[location]) {
    return locationMap[location];
  }

  // Try to find partial match
  for (const [key, value] of Object.entries(locationMap)) {
    if (location.includes(key.split(",")[0])) {
      // Add small random offset based on index to avoid overlapping
      return {
        lat: value.lat + (index % 5) * 0.01,
        lng: value.lng + (index % 5) * 0.01,
      };
    }
  }

  // Default to a location with small offsets based on index
  return {
    lat: 35.1983 + (index % 10) * 0.05,
    lng: -111.6513 + (index % 10) * 0.05,
  };
};

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

const MapContainer = forwardRef<MapContainerRef, MapContainerProps>(
  ({ isMapActive, schools, layout, onExpandedChange, mode = "desktopPanel" }, ref) => {
    // Desktop panel heights (px). Keep explicit height to avoid blank Google Map
    // during width/height transitions and when using `h-full` on the map node.
    const DESKTOP_COLLAPSED_HEIGHT = 720;
    const DESKTOP_EXPANDED_HEIGHT = 840;

    const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");
    const [showTerrain, setShowTerrain] = useState(false);
    const [showLabels, setShowLabels] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<google.maps.Map | null>(null);
    const markersRef = useRef<google.maps.Marker[]>([]);
    const infoWindowsRef = useRef<google.maps.InfoWindow[]>([]);

    const resizeMapSoon = () => {
      if (!mapInstanceRef.current || typeof google === "undefined" || !google.maps?.event) return;
      const map = mapInstanceRef.current;
      const center = (map as any).getCenter?.();
      // Google Maps often needs explicit resize after container transitions.
      google.maps.event.trigger(map, "resize");
      if (center) {
        (map as any).setCenter(center);
      }
    };

    useImperativeHandle(ref, () => ({
      exitStreetView: () => {
        if (mapInstanceRef.current) {
          (mapInstanceRef.current as any).setStreetView(null);
        }
      },
    }));

    // Reset map UI state when closing/opening the map panel.
    // Fixes inconsistent "expand/collapse arrow" direction after:
    // 1) open map, 2) expand (full view), 3) close map, 4) open map again.
    useEffect(() => {
      if (isMapActive) return;

      // Reset UI toggles.
      setIsExpanded(false);
      onExpandedChange?.(false);
      setMapType("roadmap");
      setShowTerrain(false);
      setShowLabels(true);

      // Best-effort cleanup of map instance/markers.
      if (mapInstanceRef.current) {
        try {
          const map = mapInstanceRef.current as any;
          const streetView = map.getStreetView?.();
          if (streetView?.getVisible?.()) {
            map.setStreetView(null);
          }
        } catch {
          // ignore
        }
      }
      markersRef.current.forEach((marker) => (marker as any).setMap(null));
      infoWindowsRef.current.forEach((iw) => iw.close());
      markersRef.current = [];
      infoWindowsRef.current = [];
      mapInstanceRef.current = null;
    }, [isMapActive, onExpandedChange]);

    useEffect(() => {
      if (!mapRef.current || !isMapActive) return;

      const initMap = () => {
        if (typeof google === "undefined" || !mapRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 42.3736, lng: -71.1097 },
          zoom: 10,
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
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        mapInstanceRef.current = map;

        // Ensure map paints after panel transition/layout.
        setTimeout(resizeMapSoon, 0);
        setTimeout(resizeMapSoon, 350);

        // Listen for street view changes to show/hide markers
        (map as any).addListener("streetview_changed", () => {
          const streetView = (map as any).getStreetView();
          const isStreetViewActive = streetView && streetView.getVisible();

          markersRef.current.forEach((marker) => {
            if (isStreetViewActive) {
              (marker as any).setMap(null);
            } else {
              (marker as any).setMap(map);
            }
          });
        });

        // Clear existing markers
        markersRef.current.forEach((marker) => (marker as any).setMap(null));
        infoWindowsRef.current.forEach((iw) => iw.close());
        markersRef.current = [];
        infoWindowsRef.current = [];

        // Convert schools to map format and create markers
        schools.forEach((school, index) => {
          const position = getPositionFromLocation(school.location, index);

          const marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: {
              url:
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(`
                  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="${getMarkerColor(school.grade)}"/>
                    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-weight="bold" font-size="16">${school.grade
                  }</text>
                  </svg>
                `),
              scaledSize: new google.maps.Size(40, 40),
            },
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="display: flex; gap: 12px; padding: 12px; width: 280px;">
                <img src="${school.image}" alt="${school.name}" style="width: 100px; height: 100px; border-radius: 6px; object-fit: cover;">
                <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
                  <h3 style="color: #464646; font-size: 16px; font-weight: 600; margin: 0 0 4px;">${school.name}</h3>
                  <p style="color: #5F5F5F; font-size: 14px; margin: 0;">${school.location}</p>
                </div>
              </div>
            `,
            pixelOffset: new google.maps.Size(0, -5),
          });

          marker.addListener("mouseover", () => {
            infoWindow.open({ anchor: marker, map, shouldFocus: false });
          });

          marker.addListener("mouseout", () => {
            infoWindow.close();
          });

          markersRef.current.push(marker);
          infoWindowsRef.current.push(infoWindow);
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
    }, [schools, isMapActive]);

    // Fix "blank map" when the panel expands/collapses (size transition).
    useEffect(() => {
      if (!isMapActive) return;
      const t1 = setTimeout(resizeMapSoon, 0);
      const t2 = setTimeout(resizeMapSoon, 350);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }, [isMapActive, isExpanded, layout]);

    // Handle map type changes
    useEffect(() => {
      if (!mapInstanceRef.current || typeof google === "undefined" || !isMapActive) return;

      const map = mapInstanceRef.current;

      // Exit street view if active
      const streetView = (map as any).getStreetView();
      if (streetView && streetView.getVisible()) {
        (map as any).setStreetView(null);
      }

      // Set map type
      if (mapType === "satellite") {
        // Use HYBRID for satellite with labels, SATELLITE for satellite without labels
        if (showLabels) {
          map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        } else {
          map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        }
      } else {
        // Use TERRAIN for terrain view, ROADMAP for regular map
        if (showTerrain) {
          map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
        } else {
          map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        }
      }

      // Show markers
      markersRef.current.forEach((marker) => {
        (marker as any).setMap(map);
      });
    }, [mapType, showTerrain, showLabels, isMapActive]);

    const handleMapTypeChange = (type: "roadmap" | "satellite") => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as any).setStreetView(null);
      }
    };

    return (
      <>
        <div
          className={
            mode === "mobileDrawer"
              ? `bg-[var(--surface-color)] rounded-xl overflow-hidden transition-all duration-300 flex flex-col min-w-0 ${isMapActive ? "flex-1 m-4 border border-[var(--border-color)]" : "h-0 overflow-hidden"}`
              : `bg-[var(--surface-color)] rounded-xl overflow-hidden transition-all duration-300 ${isMapActive
                  ? isExpanded
                    ? "flex-1 m-6 border border-[var(--border-color)]"
                    : layout === "list" || layout === "magazine"
                      ? "w-[340px] mr-6 mt-6 mb-6 border border-[var(--border-color)]"
                      : "w-[400px] mr-6 mt-6 mb-6 border border-[var(--border-color)]"
                  : "w-0 overflow-hidden"
                } ${isExpanded ? "min-w-0" : "shrink-0"}`
          }
          style={
            mode === "mobileDrawer"
              ? undefined
              : isMapActive
                ? {
                    height: isExpanded ? `${DESKTOP_EXPANDED_HEIGHT}px` : `${DESKTOP_COLLAPSED_HEIGHT}px`,
                    minHeight: isExpanded ? `${DESKTOP_EXPANDED_HEIGHT}px` : `${DESKTOP_COLLAPSED_HEIGHT}px`,
                  }
                : {}
          }
        >
          {isMapActive && (
            <>

              <div
                className="relative flex-1 min-h-0"
                style={{
                  height:
                    mode === "mobileDrawer"
                      ? "100%"
                      : isExpanded
                        ? `${DESKTOP_EXPANDED_HEIGHT}px`
                        : `${DESKTOP_COLLAPSED_HEIGHT}px`,
                  minHeight:
                    mode === "mobileDrawer"
                      ? "100%"
                      : isExpanded
                        ? `${DESKTOP_EXPANDED_HEIGHT}px`
                        : `${DESKTOP_COLLAPSED_HEIGHT}px`,
                }}
              >
                <MapControls
                  mapType={mapType}
                  setMapType={setMapType}
                  onMapTypeChange={handleMapTypeChange}
                  showTerrain={showTerrain}
                  setShowTerrain={setShowTerrain}
                  showLabels={showLabels}
                  setShowLabels={setShowLabels}
                  isExpanded={isExpanded}
                  onExpand={() => {
                    setIsExpanded(true);
                    onExpandedChange?.(true);
                  }}
                  onCollapse={() => {
                    setIsExpanded(false);
                    onExpandedChange?.(false);
                  }}
                  mapInstanceRef={mapInstanceRef}
                />
                <div ref={mapRef} id="exploreMap" className="w-full h-full" />
              </div>
            </>
          )}
        </div>
        {isMapActive && (
          <Script
            id="google-maps-explore"
            src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBuuN90JoSkfCGWSO_i5MOqMZnQiZ9skiY`}
            strategy="afterInteractive"
          />
        )}
      </>
    );
  }
);

MapContainer.displayName = "MapContainer";

export default MapContainer;
