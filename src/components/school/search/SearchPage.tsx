"use client";
import { useState } from "react";
import SearchFiltersSection from "./sections/SearchFiltersSection";
import SearchMainContentSection from "./sections/SearchMainContentSection";

const SearchPage = () => {
  const [isContainerExpanded, setIsContainerExpanded] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col items-center py-4 md:py-5 px-3 md:px-5"
      style={{ backgroundColor: "var(--background-color, var(--background))" }}
    >
      <div
        className="w-full transition-all duration-300 ease-in-out"
        style={{
          maxWidth: isContainerExpanded ? "1318.75px" : "1055px",
        }}
      >
        <div className="hidden md:block">
          <SearchFiltersSection />
        </div>
        <SearchMainContentSection onContainerExpandChange={setIsContainerExpanded} />
      </div>
    </div>
  );
};

export default SearchPage; 