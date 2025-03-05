"use client";

import { useState, useRef, useEffect } from "react";
import SchoolCard from "./SchoolCard";

const ComparisonCard: React.FC<{ id: string }> = ({ id }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateNavButtons = () => {
    if (gridRef.current) {
      setCanScrollPrev(gridRef.current.scrollLeft > 0);
      setCanScrollNext(
        gridRef.current.scrollLeft <
          gridRef.current.scrollWidth - gridRef.current.clientWidth
      );
    }
  };

  const handleScroll = (direction: "prev" | "next") => {
    if (gridRef.current) {
      const scrollWidth = Math.ceil(gridRef.current.scrollWidth / 3);
      gridRef.current.scrollBy({
        left: direction === "prev" ? -scrollWidth : scrollWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener("scroll", updateNavButtons);
      updateNavButtons();
      return () => grid.removeEventListener("scroll", updateNavButtons);
    }
  }, []);

  return (
    <div
      id={id}
      className="font-inter flex justify-center my-cardMargin text-[#4A4A4A]"
    >
      <div className="max-w-[875px] w-full bg-cardBackground p-cardPadding rounded-cardBorderRadius shadow-cardShadow">
        <div className="section-header flex justify-between items-center mb-6">
          <h2 className="section-title text-2xl font-semibold text-[#464646]">
            Compare with similar schools
          </h2>
          <div className="navigation-arrows flex gap-2">
            <button
              onClick={() => handleScroll("prev")}
              disabled={!canScrollPrev}
              className="nav-arrow w-10 h-10 rounded-full border border-[rgba(0,0,0,0.1)] bg-white text-[#5F5F5F] flex items-center justify-center transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#346DC2] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => handleScroll("next")}
              disabled={!canScrollNext}
              className="nav-arrow w-10 h-10 rounded-full border border-[rgba(0,0,0,0.1)] bg-white text-[#5F5F5F] flex items-center justify-center transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#346DC2] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={gridRef}
          className="comparison-grid flex gap-4 overflow-x-auto scroll-smooth p-1 relative scrollbar-hide [mask-image:linear-gradient(to_right,black_calc(100%-48px),transparent_100%)]"
        >
          <SchoolCard />
          <SchoolCard />
          <SchoolCard />
        </div>
      </div>
    </div>
  );
};

export default ComparisonCard;
