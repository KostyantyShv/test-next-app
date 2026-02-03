"use client";
import { useState } from "react";
import FiltersSection from "./sections/FiltersSection";
import MainContentSection from "./sections/MainContentSection";

const ExplorePage = () => {
  const [isContainerExpanded, setIsContainerExpanded] = useState(false);

  return (
    <div
      className="explore-page min-h-screen flex flex-col items-center py-4 md:py-5 px-3 md:px-5 text-[var(--text-default)]"
      style={{ backgroundColor: "var(--background-color, var(--background))" }}
    >
      <div 
        className="w-full transition-all duration-300 ease-in-out"
        style={{ 
          maxWidth: isContainerExpanded ? '1318.75px' : '1055px' 
        }}
      >
        <div className="hidden md:block">
          <FiltersSection />
        </div>
        <MainContentSection onContainerExpandChange={setIsContainerExpanded} />
      </div>
    </div>
  );
};

export default ExplorePage;
