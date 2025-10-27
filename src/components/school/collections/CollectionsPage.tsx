"use client";
import React, { useState } from "react";
import FiltersSection from "./sections/FiltersSection";
import MainContentSection from "./sections/MainContentSection";

const CollectionsPage = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleExpandCollapse = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out mx-auto px-3 sm:px-4 md:px-6 ${
        isExpanded ? "w-full max-w-[1350px]" : "w-full max-w-[1080px]"
      }`}
    >
      <FiltersSection />
      <MainContentSection
        isExpanded={isExpanded}
        handleExpandCollapse={handleExpandCollapse}
      />
    </div>
  );
};

export default CollectionsPage;
