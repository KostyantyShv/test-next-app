"use client";
import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { School } from "./types";

interface MapContainerProps {
  schools: School[];
  mapType: "roadmap" | "satellite";
  showLabels: boolean;
}

export interface MapContainerRef {
  exitStreetView: () => void;
}

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
  ({ schools, mapType, showLabels }, ref) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<google.maps.Map | null>(null);
    const markersRef = useRef<google.maps.Marker[]>([]);
    const infoWindowsRef = useRef<google.maps.InfoWindow[]>([]);

    useImperativeHandle(ref, () => ({
      exitStreetView: () => {
        if (mapInstanceRef.current) {
          (mapInstanceRef.current as any).setStreetView(null);
        }
      },
    }));

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
          disableDefaultUI: false,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: true,
          streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          fullscreenControl: true,
          fullscreenControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP,
          },
        });

        mapInstanceRef.current = map;

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

        schools.forEach((school) => {
          const marker = new google.maps.Marker({
            position: school.position,
            map: map,
            icon: {
              url:
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(`
                  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="${getMarkerColor(
                      school.grade
                    )}"/>
                    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-weight="bold" font-size="16">${
                      school.grade
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
    }, [schools]);

    // Handle map type changes
    useEffect(() => {
      if (!mapInstanceRef.current || typeof google === "undefined") return;

      const map = mapInstanceRef.current;

      // Exit street view if active
      const streetView = (map as any).getStreetView();
      if (streetView && streetView.getVisible()) {
        (map as any).setStreetView(null);
      }

      // Set map type and labels (matching CodePen logic)
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

      // Show markers
      markersRef.current.forEach((marker) => {
        (marker as any).setMap(map);
      });
    }, [mapType, showLabels]);

    return <div ref={mapRef} id="schoolMap" className="w-full h-full" />;
  }
);

MapContainer.displayName = "MapContainer";

export default MapContainer;
