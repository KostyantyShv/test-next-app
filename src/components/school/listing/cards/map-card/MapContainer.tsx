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

const ensureInfoWindowStyles = () => {
  if (typeof document === "undefined") return;
  const styleId = "school-map-infowindow-style";
  if (document.getElementById(styleId)) return;

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    /* Remove default Google InfoWindow chrome so we can fully style content */
    .gm-style .gm-style-iw-c {
      padding: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      border-radius: 0 !important;
      overflow: visible !important;
    }
    .gm-style .gm-style-iw-d {
      overflow: visible !important;
    }
    /* Hide default close button */
    .gm-style .gm-ui-hover-effect {
      display: none !important;
    }
    /* Hide default little pointer bubble */
    .gm-style .gm-style-iw-tc {
      display: none !important;
    }

    /* 1:1 tooltip styles from provided HTML */
    .school-tooltip {
      position: relative;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 12px;
      width: 280px;
      display: flex;
      gap: 12px;
      z-index: 1000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    .tooltip-arrow {
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid white;
    }

    .tooltip-image {
      width: 100px;
      height: 100px;
      border-radius: 6px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .tooltip-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-right: 5px;
      min-width: 0;
    }

    .tooltip-header {
      display: flex;
      align-items: flex-start;
      gap: 5px;
      width: 100%;
    }

    .school-name {
      color: #464646;
      font-size: 16px;
      font-weight: 600;
      margin: 0;
      line-height: 1.3;
      flex: 1;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .tooltip-close {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #5F5F5F;
      transition: color 0.2s ease;
      background: transparent;
      border: none;
      padding: 0;
      margin-left: auto;
    }

    .tooltip-close:hover {
      color: #1B1B1B;
    }

    .tooltip-close svg {
      width: 14px;
      height: 14px;
      stroke: currentColor;
      stroke-width: 2;
    }

    .school-location {
      color: #5F5F5F;
      font-size: 14px;
      margin: 12px 0 0 0;
    }
  `;

  document.head.appendChild(style);
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

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

        ensureInfoWindowStyles();

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

        let hoverTimeout: number | null = null;
        let isInfoHovered = false;
        let openInfoWindow: google.maps.InfoWindow | null = null;
        const closeAll = () => {
          infoWindowsRef.current.forEach((iw) => iw.close());
          openInfoWindow = null;
        };

        const onDocKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Escape") closeAll();
        };
        document.addEventListener("keydown", onDocKeyDown);

        map.addListener("click", () => closeAll());

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

          const rootId = `school-tooltip-${school.id}`;
          const closeId = `school-tooltip-close-${school.id}`;
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="school-tooltip" id="${rootId}">
                <img src="${escapeHtml(school.image)}" alt="${escapeHtml(
                  school.name
                )}" class="tooltip-image" />
                <div class="tooltip-content">
                  <div class="tooltip-header">
                    <h3 class="school-name">${escapeHtml(school.name)}</h3>
                    <button class="tooltip-close" id="${closeId}" aria-label="Close tooltip">
                      <svg viewBox="0 0 24 24" fill="none">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                  <p class="school-location">${escapeHtml(school.location)}</p>
                </div>
                <div class="tooltip-arrow"></div>
              </div>
            `,
            pixelOffset: new google.maps.Size(0, -5),
          });

          // Wire up close button for our custom layout
          google.maps.event.addListener(infoWindow, "domready", () => {
            const btn = document.getElementById(closeId);
            const root = document.getElementById(rootId);
            if (root) {
              root.addEventListener("mouseenter", () => {
                isInfoHovered = true;
                if (hoverTimeout) window.clearTimeout(hoverTimeout);
              });
              root.addEventListener("mouseleave", () => {
                isInfoHovered = false;
                hoverTimeout = window.setTimeout(() => infoWindow.close(), 100);
              });
            }
            if (!btn) return;
            btn.onclick = (e) => {
              e.preventDefault();
              infoWindow.close();
              if (openInfoWindow === infoWindow) openInfoWindow = null;
            };
          });

          marker.addListener("mouseover", () => {
            if (hoverTimeout) window.clearTimeout(hoverTimeout);
            // keep only one open at a time
            closeAll();
            infoWindow.open({ anchor: marker, map, shouldFocus: false });
            openInfoWindow = infoWindow;
          });

          marker.addListener("mouseout", () => {
            hoverTimeout = window.setTimeout(() => {
              if (!isInfoHovered) infoWindow.close();
              if (!isInfoHovered && openInfoWindow === infoWindow) openInfoWindow = null;
            }, 100);
          });

          marker.addListener("click", () => {
            if (openInfoWindow === infoWindow) {
              infoWindow.close();
              openInfoWindow = null;
              return;
            }
            closeAll();
            infoWindow.open({ anchor: marker, map, shouldFocus: false });
            openInfoWindow = infoWindow;
          });

          markersRef.current.push(marker);
          infoWindowsRef.current.push(infoWindow);
        });

        // Cleanup for document listeners when map is re-initialized
        return () => {
          document.removeEventListener("keydown", onDocKeyDown);
        };
      };

      // Check if Google Maps is already loaded
      if (typeof google !== "undefined" && google.maps) {
        const cleanup = initMap();
        return () => {
          if (typeof cleanup === "function") cleanup();
        };
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
