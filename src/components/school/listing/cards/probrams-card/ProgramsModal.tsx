"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ProgramCard from "./ProgramCard";
import {
  mastersProgramMock,
  doctoralCategoriesMock,
  doctoralProgramMock,
  mastersCategoriesMock,
} from "./mock";
import { useExpand } from "./useExpand.hook";
import { ProgramCategory } from "./types";

const ProgramsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"masters" | "doctoral">("masters");
  const [activeCategory, setActiveCategory] = useState<string>(
    "Agricultural Sciences"
  );
  const { expandedDescriptions, handleDescriptionToggle } = useExpand();

  // State for tracking active carousel slide
  const [mastersActiveSlide, setMastersActiveSlide] = useState(0);
  const [doctoralActiveSlide, setDoctoralActiveSlide] = useState(0);

  // Refs for carousel containers
  const mastersCarouselRef = useRef<HTMLDivElement>(null);
  const doctoralCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Scroll handler for masters carousel with debouncing
  const handleMastersScroll = useCallback(() => {
    if (!mastersCarouselRef.current) return;

    const container = mastersCarouselRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth =
      container.querySelector(".snap-start")?.clientWidth || 270;
    const spaceBetween = 16; // gap-4 = 16px
    const scrollableWidth = cardWidth + spaceBetween;

    // Calculate the active slide based on scroll position
    const activeIndex = Math.round(scrollPosition / scrollableWidth);

    if (activeIndex !== mastersActiveSlide) {
      setMastersActiveSlide(activeIndex);
    }
  }, [mastersActiveSlide]);

  // Scroll handler for doctoral carousel with debouncing
  const handleDoctoralScroll = useCallback(() => {
    if (!doctoralCarouselRef.current) return;

    const container = doctoralCarouselRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth =
      container.querySelector(".snap-start")?.clientWidth || 270;
    const spaceBetween = 16; // gap-4 = 16px
    const scrollableWidth = cardWidth + spaceBetween;

    // Calculate the active slide based on scroll position
    const activeIndex = Math.round(scrollPosition / scrollableWidth);

    if (activeIndex !== doctoralActiveSlide) {
      setDoctoralActiveSlide(activeIndex);
    }
  }, [doctoralActiveSlide]);

  // Set up scroll listeners with debouncing
  useEffect(() => {
    const mastersCarousel = mastersCarouselRef.current;
    const doctoralCarousel = doctoralCarouselRef.current;

    let mastersScrollTimer: ReturnType<typeof setTimeout> | null = null;
    let doctoralScrollTimer: ReturnType<typeof setTimeout> | null = null;

    const handleMastersScrollWithDebounce = () => {
      if (mastersScrollTimer) clearTimeout(mastersScrollTimer);
      mastersScrollTimer = setTimeout(() => {
        handleMastersScroll();
      }, 50); // 50ms debounce
    };

    const handleDoctoralScrollWithDebounce = () => {
      if (doctoralScrollTimer) clearTimeout(doctoralScrollTimer);
      doctoralScrollTimer = setTimeout(() => {
        handleDoctoralScroll();
      }, 50); // 50ms debounce
    };

    if (mastersCarousel) {
      mastersCarousel.addEventListener(
        "scroll",
        handleMastersScrollWithDebounce
      );
      // Initialize on mount
      handleMastersScroll();
    }

    if (doctoralCarousel) {
      doctoralCarousel.addEventListener(
        "scroll",
        handleDoctoralScrollWithDebounce
      );
      // Initialize on mount
      handleDoctoralScroll();
    }

    return () => {
      if (mastersCarousel) {
        mastersCarousel.removeEventListener(
          "scroll",
          handleMastersScrollWithDebounce
        );
      }
      if (doctoralCarousel) {
        doctoralCarousel.removeEventListener(
          "scroll",
          handleDoctoralScrollWithDebounce
        );
      }

      // Clear timers on cleanup
      if (mastersScrollTimer) clearTimeout(mastersScrollTimer);
      if (doctoralScrollTimer) clearTimeout(doctoralScrollTimer);
    };
  }, [handleMastersScroll, handleDoctoralScroll]);

  // Scroll to slide function
  const scrollToSlide = (index: number, isDoctoralTab: boolean = false) => {
    const carouselRef = isDoctoralTab
      ? doctoralCarouselRef
      : mastersCarouselRef;
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const cardWidth =
      container.querySelector(".snap-start")?.clientWidth || 270;
    const spaceBetween = 16; // gap-4 = 16px
    const scrollableWidth = cardWidth + spaceBetween;

    carouselRef.current.scrollTo({
      left: index * scrollableWidth,
      behavior: "smooth",
    });

    // Update active slide state immediately for smoother UI
    if (isDoctoralTab) {
      setDoctoralActiveSlide(index);
    } else {
      setMastersActiveSlide(index);
    }
  };

  if (!isOpen) return null;

  const renderProgramCategory = (category: ProgramCategory) => (
    <div key={category.header} className="mb-6">
      <h3 className="text-base md:text-xl font-semibold text-[#016853] mb-3 md:mb-4 pb-2 border-b border-[rgba(0,0,0,0.08)]">
        {category.header}
      </h3>
      <div className="mb-4 md:mb-6">
        {category.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between py-2 md:py-3 border-b border-[rgba(0,0,0,0.08)] text-sm md:text-[15px]"
          >
            <span className="text-[#4A4A4A]">{item.name}</span>
            <span className="text-[#5F5F5F]">{item.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Header */}
      <div className="bg-[#016853] text-white p-4 md:p-6 flex justify-between items-center sticky top-0 z-10 border-b border-white/10">
        <div>
          <h1 className="text-xl md:text-[28px] font-bold">Lincoln Academy</h1>
          <p className="mt-1 md:mt-2 text-sm md:text-base opacity-90">
            Programs and Majors
          </p>
        </div>
        <button
          className="text-2xl w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[rgba(0,0,0,0.08)]">
        <button
          className={`flex-1 p-3 md:p-5 text-sm md:text-lg font-semibold ${
            activeTab === "masters"
              ? "text-[#016853] border-b-2 border-[#016853]"
              : "text-[#5F5F5F]"
          } transition-all`}
          onClick={() => setActiveTab("masters")}
        >
          Master`s programs
        </button>
        <button
          className={`flex-1 p-3 md:p-5 text-sm md:text-lg font-semibold ${
            activeTab === "doctoral"
              ? "text-[#016853] border-b-2 border-[#016853]"
              : "text-[#5F5F5F]"
          } transition-all`}
          onClick={() => setActiveTab("doctoral")}
        >
          Doctoral programs
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto h-[calc(100%-130px)] md:max-h-[calc(90vh-100px)]">
        <div
          className={activeTab === "masters" ? "block p-4 md:p-8" : "hidden"}
        >
          {/* Category Tags */}
          <div className="flex flex-nowrap gap-2 md:gap-3 mb-6 md:mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {[
              "Agricultural Sciences",
              "Anthropology and Sociology",
              "Architecture",
              "Biology",
              "Business and Management",
              "Chemistry",
              "Communications",
              "Computer Science",
              "Show All",
            ].map((category) => (
              <button
                key={category}
                className={`border border-[#016853] text-[#016853] px-3 md:px-5 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-[#016853] text-white"
                    : "hover:bg-[#016853] hover:text-white"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Programs */}
          <h2 className="text-lg md:text-2xl font-semibold text-[#464646] mb-4 md:mb-6">
            Featured master`s programs
          </h2>
          <div
            ref={mastersCarouselRef}
            className="flex md:grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-10 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          >
            {mastersProgramMock.map((program, index) => (
              <div key={index} className="snap-start min-w-[270px] md:min-w-0">
                <ProgramCard
                  program={program}
                  index={index}
                  tab="masters"
                  expandedDescriptions={expandedDescriptions}
                  onDescriptionToggle={handleDescriptionToggle}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mb-6 md:hidden">
            {mastersProgramMock.map((_, index) => (
              <div
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                  index === mastersActiveSlide ? "bg-[#0B6333]" : "bg-[#DFDDDB]"
                }`}
              />
            ))}
          </div>

          {/* All Programs */}
          <div>
            <h2 className="text-lg md:text-2xl font-semibold text-[#464646] mb-4 md:mb-6">
              All master`s programs offered
            </h2>
            {mastersCategoriesMock.map(renderProgramCategory)}
            <a
              href="#"
              className="flex justify-end items-center gap-2 text-[#346DC2] text-xs md:text-sm font-medium hover:underline"
            >
              See all Biology Programs
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 3.33334L7.06 4.27334L10.78 8.00001L7.06 11.7267L8 12.6667L12.6667 8.00001L8 3.33334Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>

        <div
          className={activeTab === "doctoral" ? "block p-4 md:p-8" : "hidden"}
        >
          {/* Category Tags */}
          <div className="flex flex-nowrap gap-2 md:gap-3 mb-6 md:mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {[
              "All Categories",
              "Biology",
              "Chemistry",
              "Physics",
              "Engineering",
              "Computer Science",
            ].map((category) => (
              <button
                key={category}
                className={`border border-[#016853] text-[#016853] px-3 md:px-5 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-[#016853] text-white"
                    : "hover:bg-[#016853] hover:text-white"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Programs - Fixed ref from mastersCarouselRef to doctoralCarouselRef */}
          <h2 className="text-lg md:text-2xl font-semibold text-[#464646] mb-4 md:mb-6">
            Featured doctoral programs
          </h2>
          <div
            ref={doctoralCarouselRef}
            className="flex md:grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-10 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          >
            {doctoralProgramMock.map((program, index) => (
              <div key={index} className="snap-start min-w-[270px] md:min-w-0">
                <ProgramCard
                  program={program}
                  index={index}
                  tab="doctoral"
                  expandedDescriptions={expandedDescriptions}
                  onDescriptionToggle={handleDescriptionToggle}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mb-6 md:hidden">
            {doctoralProgramMock.map((_, index) => (
              <div
                key={index}
                onClick={() => scrollToSlide(index, true)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                  index === doctoralActiveSlide
                    ? "bg-[#0B6333]"
                    : "bg-[#DFDDDB]"
                }`}
              />
            ))}
          </div>

          {/* All Programs */}
          <div>
            <h2 className="text-lg md:text-2xl font-semibold text-[#464646] mb-4 md:mb-6">
              All doctoral programs offered
            </h2>
            {doctoralCategoriesMock.map(renderProgramCategory)}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramsModal;
