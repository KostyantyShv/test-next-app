"use client";
import React, { useState } from "react";
import FiltersSection from "./sections/FiltersSection";
import MainContentSection from "./sections/MainContentSection";

const CollectionsPage = () => {
  // Keep expand behavior identical to ExplorePage:
  // Header owns the button UI state and notifies the page to update maxWidth.
  const [isContainerExpanded, setIsContainerExpanded] = useState(false);

  return (
    <div
      className="transition-all duration-300 ease-in-out mx-auto px-3 sm:px-4 md:px-6 w-full"
      style={{ maxWidth: isContainerExpanded ? "1318.75px" : "1055px" }}
    >
      <FiltersSection />
      <MainContentSection onContainerExpandChange={setIsContainerExpanded} />
    </div>
  );
};

export default CollectionsPage;
