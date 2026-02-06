"use client";
import { useState } from "react";
import FiltersSection from "./sections/FiltersSection";
import MainContentSection from "./sections/MainContentSection";

const ExplorePage = () => {
  const [isContainerExpanded, setIsContainerExpanded] = useState(false);
  return (
    <div
      className="explore-page min-h-screen flex flex-col items-center -mt-3 md:mt-0 pt-0 pb-4 md:py-5 px-3 md:px-5 text-[var(--text-default)]"
      style={{ backgroundColor: "var(--background-color, var(--background))" }}
    >
      <div
        className="w-full transition-all duration-300 ease-in-out"
        style={{ maxWidth: isContainerExpanded ? "100%" : "1055px" }}
      >
        <div className="hidden md:block">
          <FiltersSection />
        </div>
        <MainContentSection
          onContainerExpandChange={setIsContainerExpanded}
          isContainerExpanded={isContainerExpanded}
        />
      </div>
    </div>
  );
};

export default ExplorePage;
