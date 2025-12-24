"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Header = ({
  classes,
  imageSizes = "w-16 h-16",
}: {
  classes?: string;
  imageSizes?: string;
}) => {
  const [activeTab, setActiveTab] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show header on desktop when scrolled down
      if (window.innerWidth >= 768) {
        setIsScrolled(window.scrollY > 100);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navTabs = [
    { id: "about", label: "About" },
    { id: "events", label: "Events" },
    { id: "map", label: "Map" },
    { id: "area", label: "Area" },
    { id: "teachers", label: "Teachers" },
    { id: "students", label: "Students" },
  ];

  return (
    <header
      className={`z-50 transition-all duration-300 min-h-fit bg-white pt-4 sm:pt-6 ${
        isScrolled
          ? "fixed top-0 left-0 right-0 shadow-md md:pt-[52px] opacity-100 pointer-events-auto transition-all duration-300"
          : "relative md:opacity-0 md:pointer-events-none md:hidden transition-all duration-300"
      }${classes || ""}`}
    >
      <div className="max-w-full flex justify-center pt-3">
        <div className="px-4 sm:px-5 flex w-full max-w-[1080px] justify-between">
          {/* School Info */}
          <div className="flex gap-3 sm:gap-5 flex-1 min-w-0">
            {/* Thumbnail */}
            <div
              className={`${imageSizes} rounded-lg overflow-hidden flex-shrink-0 border border-gray-200/60 shadow-sm`}
            >
              <Image
                src="https://i.ibb.co/J8QjpbD/school1.webp"
                alt="School Thumbnail"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>

            {/* School Details */}
            <div className="flex-1 flex flex-col justify-between h-14 py-0.5 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-700 leading-tight truncate">
                  Lincoln Academy
                </h1>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0"
                  viewBox="0 0 30 30"
                  fill="currentColor"
                >
                  <path d="M13.474 2.80108C14.2729 1.85822 15.7271 1.85822 16.526 2.80108L17.4886 3.9373C17.9785 4.51548 18.753 4.76715 19.4892 4.58733L20.9358 4.23394C22.1363 3.94069 23.3128 4.79547 23.4049 6.0278L23.5158 7.51286C23.5723 8.26854 24.051 8.92742 24.7522 9.21463L26.1303 9.77906C27.2739 10.2474 27.7233 11.6305 27.0734 12.6816L26.2903 13.9482C25.8918 14.5928 25.8918 15.4072 26.2903 16.0518L27.0734 17.3184C27.7233 18.3695 27.2739 19.7526 26.1303 20.2209L24.7522 20.7854C24.051 21.0726 23.5723 21.7315 23.5158 22.4871L23.4049 23.9722C23.3128 25.2045 22.1363 26.0593 20.9358 25.7661L19.4892 25.4127C18.753 25.2328 17.9785 25.4845 17.4886 26.0627L16.526 27.1989C15.7271 28.1418 14.2729 28.1418 13.474 27.1989L12.5114 26.0627C12.0215 25.4845 11.247 25.2328 10.5108 25.4127L9.06418 25.7661C7.86371 26.0593 6.6872 25.2045 6.59513 23.9722L6.48419 22.4871C6.42773 21.7315 5.94903 21.0726 5.24777 20.7854L3.86969 20.2209C2.72612 19.7526 2.27673 18.3695 2.9266 17.3184L3.70973 16.0518C4.10824 15.4072 4.10824 14.5928 3.70973 13.9482L2.9266 12.6816C2.27673 11.6305 2.72612 10.2474 3.86969 9.77906L5.24777 9.21463C5.94903 8.92742 6.42773 8.26854 6.48419 7.51286L6.59513 6.0278C6.6872 4.79547 7.86371 3.94069 9.06418 4.23394L10.5108 4.58733C11.247 4.76715 12.0215 4.51548 12.5114 3.9373L13.474 2.80108Z" />
                  <path
                    stroke="white"
                    fill="white"
                    d="M13.5 17.625L10.875 15L10 15.875L13.5 19.375L21 11.875L20.125 11L13.5 17.625Z"
                  />
                </svg>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                <span className="bg-green-400 text-green-800 px-2 sm:px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider shadow-sm">
                  #1 in Arts
                </span>
                <div className="flex items-center gap-1 sm:gap-2 text-gray-700">
                  <span className="font-semibold text-green-600 text-sm">4.8</span>
                  <span className="text-green-600">★</span>
                  <span className="text-gray-500 text-xs sm:text-sm">(9 reviews)</span>
                </div>
                <nav className="hidden sm:flex items-center gap-6 ml-4">
                  {navTabs.map((tab) => (
                    <a
                      key={tab.id}
                      href={`#${tab.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab(tab.id);
                      }}
                      className={`text-sm text-gray-500 hover:text-green-800 transition-colors ${
                        activeTab === tab.id
                          ? "text-green-800 font-semibold border-b-2 border-green-800"
                          : ""
                      }`}
                    >
                      {tab.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Add to List Button */}
          <div className="flex items-center h-full">
            <button className="flex items-center self-center gap-1 sm:gap-2 bg-teal-500 text-white px-3 sm:px-4 py-2 rounded-md font-semibold hover:bg-teal-600 transition-colors text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M16 9a7 7 0 1 1 0 14 7 7 0 1 1 0-14zm4-7a2 2 0 0 1 2 2v4h-1.5V3.5h-17v17H8V22H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16zm-3 10h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3z"
                  fillRule="nonzero"
                />
              </svg>
              <span className="hidden sm:inline">Add To List</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
