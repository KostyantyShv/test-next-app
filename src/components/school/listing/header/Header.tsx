"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SIDE_TABS_DESKTOP } from "../content/side-tabs.constant";

const navTabs = [
  { id: SIDE_TABS_DESKTOP.ABOUT_DESKTOP, label: "About" },
  { id: SIDE_TABS_DESKTOP.EVENTS_DESKTOP, label: "Events" },
  { id: SIDE_TABS_DESKTOP.MAP_DESKTOP, label: "Map" },
  { id: SIDE_TABS_DESKTOP.AREA_DESKTOP, label: "Area" },
  { id: SIDE_TABS_DESKTOP.TEACHERS_DESKTOP, label: "Teachers" },
  { id: SIDE_TABS_DESKTOP.STUDENTS_DESKTOP, label: "Students" },
];

const Header = ({
  classes,
  imageSizes = "w-16 h-16",
}: {
  classes?: string;
  imageSizes?: string;
}) => {
  const [activeTab, setActiveTab] = useState(SIDE_TABS_DESKTOP.ABOUT_DESKTOP);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Update active tab based on scroll position
      const headerHeight = 63 + 93 + 20; // Same as in handleNavClick
      const scrollPosition = window.scrollY + headerHeight;

      // Find which section is currently in view
      let currentActiveTab = navTabs[0].id;
      
      for (let i = 0; i < navTabs.length; i++) {
        const element = document.getElementById(navTabs[i].id);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          
          // If scroll position is within this section
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentActiveTab = navTabs[i].id;
            break;
          }
          
          // If we've passed this section, it might be the active one
          if (scrollPosition >= elementTop) {
            currentActiveTab = navTabs[i].id;
          }
        }
      }
      
      setActiveTab(currentActiveTab);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, tabId: string) => {
    e.preventDefault();
    setActiveTab(tabId);
    
    // Calculate header offset
    const headerOffset = 176; // 63px top + 93px header + 20px padding
    
    // Special handling for Map section which might load asynchronously
    const scrollToElement = (attempts = 0) => {
      // Try multiple methods to find the element
      let element = document.getElementById(tabId);
      if (!element) {
        // Try querySelector with escaped id
        element = document.querySelector(`[id="${tabId}"]`) as HTMLElement;
      }
      if (!element) {
        // Try querySelectorAll and find first match
        const allElements = document.querySelectorAll(`[id]`);
        element = Array.from(allElements).find(
          (el) => el.getAttribute('id') === tabId
        ) as HTMLElement;
      }
      
      // For Map, check if element exists (don't check offsetParent as it might be null due to hidden md:flex)
      const isMap = tabId.includes("Map");
      if (element && (isMap || element.offsetParent !== null)) {
        // Element exists and is visible (or is Map which might be hidden initially)
        // Use getBoundingClientRect for more accurate positioning
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const scrollPosition = elementTop - headerOffset;

        window.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: "smooth",
        });
      } else if (attempts < 50) {
        // Retry for async-loaded content (like Map) - more attempts for dynamic imports
        // Increased attempts and delay for Map specifically
        const delay = tabId.includes("Map") ? 200 : 150;
        setTimeout(() => scrollToElement(attempts + 1), delay);
      } else {
        // Final fallback: try scrollIntoView
        let element = document.getElementById(tabId);
        if (!element) {
          element = document.querySelector(`[id="${tabId}"]`) as HTMLElement;
        }
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          // Adjust for header after scroll
          setTimeout(() => {
            const rect = element!.getBoundingClientRect();
            if (rect.top < headerOffset) {
              window.scrollBy({
                top: rect.top - headerOffset,
                behavior: "smooth",
              });
            }
          }, 500);
        } else {
          console.warn(`Element with id "${tabId}" not found after ${attempts} attempts`);
        }
      }
    };
    
    // Use requestAnimationFrame for better timing with dynamic imports
    if (tabId.includes("Map")) {
      // For Map, wait a bit longer and use requestAnimationFrame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => scrollToElement(), 200);
        });
      });
    } else {
      setTimeout(() => scrollToElement(), 100);
    }
  };

  // Don't render header when at top of page
  if (!isScrolled) {
    return null;
  }

  return (
    <>
      <header
        className={`sticky top-0 z-[1001] transition-all duration-300 min-h-[5.8rem] bg-white border-b shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${classes || ""}`}
        style={{
          borderColor: "rgba(223, 221, 219, 0.4)",
        }}
      >
      <div className="max-w-[1220px] mx-auto px-0">
        <div className="flex justify-between items-start px-16 py-4 gap-10 relative">
          {/* School Info */}
          <div className="flex gap-5 flex-1">
            {/* Thumbnail */}
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border shadow-[0_2px_6px_rgba(0,0,0,0.06)]" style={{ borderColor: "rgba(223, 221, 219, 0.6)" }}>
              <Image
                src="https://i.ibb.co/J8QjpbD/school1.webp"
                alt="School Thumbnail"
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>

            {/* School Details */}
            <div className="flex-1 flex flex-col justify-between h-16 py-0.5">
              {/* Title Section */}
              <div className="flex items-center gap-3">
                <h1
                  className="text-[#464646] text-xl font-semibold leading-[1.4]"
                  style={{
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                    letterSpacing: "-0.01em",
                  }}
                >
                  Lincoln Academy
                </h1>
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  viewBox="0 0 30 30"
                  fill="#1D77BD"
                >
                  <path d="M13.474 2.80108C14.2729 1.85822 15.7271 1.85822 16.526 2.80108L17.4886 3.9373C17.9785 4.51548 18.753 4.76715 19.4892 4.58733L20.9358 4.23394C22.1363 3.94069 23.3128 4.79547 23.4049 6.0278L23.5158 7.51286C23.5723 8.26854 24.051 8.92742 24.7522 9.21463L26.1303 9.77906C27.2739 10.2474 27.7233 11.6305 27.0734 12.6816L26.2903 13.9482C25.8918 14.5928 25.8918 15.4072 26.2903 16.0518L27.0734 17.3184C27.7233 18.3695 27.2739 19.7526 26.1303 20.2209L24.7522 20.7854C24.051 21.0726 23.5723 21.7315 23.5158 22.4871L23.4049 23.9722C23.3128 25.2045 22.1363 26.0593 20.9358 25.7661L19.4892 25.4127C18.753 25.2328 17.9785 25.4845 17.4886 26.0627L16.526 27.1989C15.7271 28.1418 14.2729 28.1418 13.474 27.1989L12.5114 26.0627C12.0215 25.4845 11.247 25.2328 10.5108 25.4127L9.06418 25.7661C7.86371 26.0593 6.6872 25.2045 6.59513 23.9722L6.48419 22.4871C6.42773 21.7315 5.94903 21.0726 5.24777 20.7854L3.86969 20.2209C2.72612 19.7526 2.27673 18.3695 2.9266 17.3184L3.70973 16.0518C4.10824 15.4072 4.10824 14.5928 3.70973 13.9482L2.9266 12.6816C2.27673 11.6305 2.72612 10.2474 3.86969 9.77906L5.24777 9.21463C5.94903 8.92742 6.42773 8.26854 6.48419 7.51286L6.59513 6.0278C6.6872 4.79547 7.86371 3.94069 9.06418 4.23394L10.5108 4.58733C11.247 4.76715 12.0215 4.51548 12.5114 3.9373L13.474 2.80108Z" />
                  <path
                    stroke="white"
                    fill="white"
                    d="M13.5 17.625L10.875 15L10 15.875L13.5 19.375L21 11.875L20.125 11L13.5 17.625Z"
                  />
                </svg>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4">
                <span
                  className="bg-[#00DF8B] text-[#016853] px-3 py-1 rounded-md text-[0.8125rem] font-semibold uppercase shadow-[0_2px_4px_rgba(0,223,139,0.15)]"
                  style={{
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                    letterSpacing: "0.02em",
                  }}
                >
                  #1 in Arts
                </span>
                <div className="flex items-center gap-2 text-[#4A4A4A]">
                  <span
                    className="font-semibold text-[#089E68]"
                    style={{
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                    }}
                  >
                    4.8
                  </span>
                  <span className="text-[#089E68]">★</span>
                  <span
                    className="text-[#5F5F5F] text-sm"
                    style={{
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                    }}
                  >
                    (9 reviews)
                  </span>
                </div>
                <nav className="flex items-center gap-8 ml-6">
                  {navTabs.map((tab) => (
                    <a
                      key={tab.id}
                      href={`#${tab.id}`}
                      onClick={(e) => handleNavClick(e, tab.id)}
                      className={`text-[0.95rem] py-1 px-0 relative transition-all duration-200 ${
                        activeTab === tab.id
                          ? "text-[#0B6333] font-semibold"
                          : "text-[#5F5F5F]"
                      } hover:text-[#0B6333]`}
                      style={{
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                      }}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <span
                          className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-[#0B6333] rounded-sm"
                        />
                      )}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Add to List Button */}
          <button
            className="flex items-center gap-2 bg-[#02C5AF] text-white border-none px-4 py-2 rounded-md text-[0.95rem] font-semibold cursor-pointer transition-all duration-200 mt-1 hover:bg-[#D7F7E9] hover:text-[#02C5AF]"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M16 9a7 7 0 1 1 0 14 7 7 0 1 1 0-14zm4-7a2 2 0 0 1 2 2v4h-1.5V3.5h-17v17H8V22H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16zm-3 10h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3z"
                fillRule="nonzero"
              />
            </svg>
            Add To List
          </button>
        </div>
      </div>
      </header>
      {/* Spacer for smooth layout when header appears */}
      {isScrolled && <div className="h-[0px]" />}
    </>
  );
};

export default Header;
