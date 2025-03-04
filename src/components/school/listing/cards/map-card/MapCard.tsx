"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";

interface School {
  id: number;
  name: string;
  location: string;
  grade: string;
  position: {
    lat: number;
    lng: number;
  };
  image: string;
}

export default function MapCard({ id }: { id: string }) {
  const mapRef = useRef<HTMLDivElement>(null);

  // Sample school data
  const schools: School[] = [
    {
      id: 1,
      name: "BASIS Flagstaff",
      location: "Flagstaff, AZ",
      grade: "A+",
      position: { lat: 35.1983, lng: -111.6513 },
      image: "https://i.ibb.co/fVRCnNZY/school2.webp",
    },
    {
      id: 2,
      name: "Northland Preparatory Academy",
      location: "Flagstaff, AZ",
      grade: "A",
      position: { lat: 35.2033, lng: -111.6583 },
      image: "https://via.placeholder.com/100x100",
    },
    {
      id: 3,
      name: "Flagstaff High School",
      location: "Flagstaff, AZ",
      grade: "B+",
      position: { lat: 35.1913, lng: -111.6473 },
      image: "https://via.placeholder.com/100x100",
    },
    {
      id: 4,
      name: "Coconino High School",
      location: "Flagstaff, AZ",
      grade: "B",
      position: { lat: 35.2073, lng: -111.6443 },
      image: "https://via.placeholder.com/100x100",
    },
  ];

  // Initialize map function
  const initMap = () => {
    if (!mapRef.current || typeof google === "undefined") return;

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
    });

    // Create markers and tooltips for each school
    schools.forEach((school) => {
      // Create marker using custom overlay
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

      // Create tooltip element
      const tooltipElement = document.createElement("div");
      tooltipElement.className = "school-tooltip";
      tooltipElement.innerHTML = `
        <img src="${school.image}" alt="${school.name}" class="tooltip-image">
        <div class="tooltip-content">
          <h3 class="school-name">${school.name}</h3>
          <p class="school-location">${school.location}</p>
        </div>
      `;
      document.body.appendChild(tooltipElement);

      // Add hover event listeners
      marker.addListener("mouseover", () => {
        tooltipElement.style.display = "flex";
        const point = map
          .getProjection()
          .fromLatLngToPoint(marker.getPosition()!);
        tooltipElement.style.left = `${point.x}px`;
        tooltipElement.style.top = `${point.y}px`;
      });

      marker.addListener("mouseout", () => {
        tooltipElement.style.display = "none";
      });
    });
  };

  // Helper function to get marker color based on grade
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

  // Initialize map after Google Maps script is loaded
  useEffect(() => {
    if (typeof window !== "undefined" && typeof google !== "undefined") {
      initMap();
    }
  }, []);

  return (
    <div id={id} className="my-cardMargin flex justify-center">
      <div className="w-[875px] bg-cardBackground rounded-cardBorderRadius shadow-cardShadow overflow-hidden">
        <div className="p-5 border-b border-black border-opacity-[0.08]">
          <h2 className="text-[#333] text-2xl font-semibold m-0">Map</h2>
        </div>
        <div className="relative h-[500px]">
          <div id="schoolMap" ref={mapRef} className="w-full h-full"></div>
        </div>
      </div>

      <Script
        id="google-maps"
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBuuN90JoSkfCGWSO_i5MOqMZnQiZ9skiY`}
        onLoad={initMap}
        strategy="afterInteractive"
      />

      <style jsx global>{`
        :root {
          --text-default: #4a4a4a;
          --active-green: #0b6333;
          --header-green: #016853;
          --verification-blue: #1d77bd;
          --apply-button-bg: #ebfcf4;
          --apply-button-hover: #d7f7e9;
          --grade-badge: #00df8b;
          --success-green: #089e68;
          --arrow-circle: #dfdddb;
          --bold-text: #464646;
          --subtle-text: #5f5f5f;
          --link-text: #346dc2;
          --dark-text: #1b1b1b;
        }

        .school-marker {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--grade-badge);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 16px;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .school-marker:hover {
          transform: scale(1.1);
        }

        .school-tooltip {
          position: absolute;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 12px;
          width: 280px;
          display: none;
          z-index: 1000;
          gap: 12px;
        }

        .tooltip-image {
          width: 100px;
          height: 100px;
          border-radius: 6px;
          object-fit: cover;
        }

        .tooltip-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .school-name {
          color: var(--bold-text);
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px;
        }

        .school-location {
          color: var(--subtle-text);
          font-size: 14px;
          margin: 0;
        }

        .marker-a-plus {
          background: var(--grade-badge);
        }
        .marker-a {
          background: #1ad598;
        }
        .marker-b-plus {
          background: #4caf50;
        }
        .marker-b {
          background: #8bc34a;
        }
        .marker-c-plus {
          background: #ffc107;
        }
      `}</style>
    </div>
  );
}
