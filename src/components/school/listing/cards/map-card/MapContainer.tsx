import { useEffect, useRef } from "react";
import { School } from "./types";

interface MapContainerProps {
  mapType: "roadmap" | "hybrid";
  schools: School[];
  setActiveTooltip: (school: School | null) => void;
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

export default function MapContainer({
  mapType,
  schools,
  setActiveTooltip,
}: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = () => {
    if (!mapRef.current || typeof google === "undefined") return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 35.1983, lng: -111.6513 },
      zoom: 13,
      styles: [
        // ... map styles (unchanged)
      ],
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
      mapTypeId:
        mapType === "roadmap"
          ? google.maps.MapTypeId.ROADMAP
          : google.maps.MapTypeId.HYBRID,
    });

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

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="school-tooltip flex gap-3 p-3 bg-white rounded-lg shadow-lg w-[250px] md:w-[280px]">
            <img src="${school.image}" alt="${school.name}" class="w-[80px] md:w-[100px] h-[80px] md:h-[100px] rounded-md object-cover">
            <div class="flex-1 flex flex-col justify-between">
              <h3 class="school-name text-[#464646] text-[15px] md:text-base font-semibold m-0">${school.name}</h3>
              <p class="school-location text-[#5f5f5f] text-[13px] md:text-sm m-0">${school.location}</p>
            </div>
          </div>
        `,
        pixelOffset: new google.maps.Size(0, -45),
      });

      marker.addListener("mouseover", () => {
        infoWindow.open({ anchor: marker, map, shouldFocus: false });
      });
      marker.addListener("mouseout", () => {
        infoWindow.close();
      });
      marker.addListener("click", () => {
        setActiveTooltip(school);
        map.setCenter(school.position);
        map.setZoom(15);
      });
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined" && typeof google !== "undefined") {
      initMap();
    }
  }, [mapType]);

  return <div ref={mapRef} className="w-full h-full" />;
}
