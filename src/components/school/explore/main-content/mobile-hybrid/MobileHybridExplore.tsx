import React, { useEffect, useMemo, useRef, useState } from "react";
import { School } from "../../types";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import MobileHybridSchoolCard from "./MobileHybridSchoolCard";

type SchoolTypeKey = "all" | "k12" | "college" | "graduate" | "district";

const SCHOOL_TYPE_OPTIONS: Array<{ key: SchoolTypeKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "k12", label: "K12" },
  { key: "college", label: "College" },
  { key: "graduate", label: "Graduate" },
  { key: "district", label: "District" },
];

const MobileHybridExplore: React.FC<{
  schools: School[];
  layout: string;
  setLayout: (value: string) => void;
}> = ({ schools, layout, setLayout }) => {
  const [selectedType, setSelectedType] = useState<SchoolTypeKey>("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLayoutDrawerOpen, setIsLayoutDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isDropdownOpen) return;
    const onClick = (event: MouseEvent) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [isDropdownOpen]);

  const visibleSchools = useMemo(() => {
    // Visual-only "type" selector for now (pixel-match); data set is shared mock.
    const list = schools;
    if (!isExpanded) return list.slice(0, 2);
    return list;
  }, [schools, isExpanded]);

  const hasMore = schools.length > 2;

  return (
    <div className="explore-mobile-hybrid w-screen max-w-none -mx-3">
      <div className="mh-container">
        <div className="mh-header" ref={headerRef}>
          <button
            type="button"
            className={`mh-header-left ${isDropdownOpen ? "active" : ""}`}
            onClick={() => setIsDropdownOpen((v) => !v)}
            aria-expanded={isDropdownOpen}
            aria-label="School type selector"
          >
            <span className="mh-header-icon" aria-hidden>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h6v6h-6z"></path>
                <path d="M14 4h6v6h-6z"></path>
                <path d="M4 14h6v6h-6z"></path>
                <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
              </svg>
            </span>
            <h1 className="mh-header-title">
              {SCHOOL_TYPE_OPTIONS.find((o) => o.key === selectedType)?.label ?? "All"}
            </h1>
            <span className="mh-header-arrow" aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </span>
          </button>

          <div className="mh-layout-toggle" aria-label="Layout toggle">
            <button
              type="button"
              className="mh-layout-toggle-button active"
              aria-label="Change layout"
              onClick={() => setIsLayoutDrawerOpen(true)}
            >
              <svg viewBox="0 0 16 16" strokeLinejoin="round">
                <path
                  fill="currentColor"
                  d="M2.5 5.5V2.5H5.5V5.5H2.5ZM1 2C1 1.44772 1.44772 1 2 1H6C6.55228 1 7 1.44772 7 2V6C7 6.55228 6.55228 7 6 7H2C1.44772 7 1 6.55228 1 6V2ZM2.5 13.5V10.5H5.5V13.5H2.5ZM1 10C1 9.44772 1.44772 9 2 9H6C6.55228 9 7 9.44772 7 10V14C7 14.5523 6.55228 15 6 15H2C1.44772 15 1 14.5523 1 14V10ZM10.5 2.5V5.5H13.5V2.5H10.5ZM10 1C9.44772 1 9 1.44772 9 2V6C9 6.55228 9.44772 7 10 7H14C14.5523 7 15 6.55228 15 6V2C15 1.44772 14.5523 1 14 1H10ZM10.5 13.5V10.5H13.5V13.5H10.5ZM9 10C9 9.44772 9.44772 9 10 9H14C14.5523 9 15 9.44772 15 10V14C15 14.5523 14.5523 15 14 15H10C9.44772 15 9 14.5523 9 14V10Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div className={`mh-school-type-dropdown ${isDropdownOpen ? "active" : ""}`}>
            {SCHOOL_TYPE_OPTIONS.map((opt) => {
              const isSelected = opt.key === selectedType;
              return (
                <button
                  key={opt.key}
                  type="button"
                  className={`mh-dropdown-item ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedType(opt.key);
                    setIsDropdownOpen(false);
                    setIsExpanded(false);
                  }}
                >
                  <span className="mh-icon-wrapper" aria-hidden>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h6v6h-6z"></path>
                      <path d="M14 4h6v6h-6z"></path>
                      <path d="M4 14h6v6h-6z"></path>
                      <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                    </svg>
                  </span>
                  <span className="mh-label-wrapper">
                    <span className="mh-label">{opt.label}</span>
                    <span className="mh-count"></span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mh-schools-list">
          {visibleSchools.map((school, idx) => (
            <MobileHybridSchoolCard key={`${school.name}-${idx}`} school={school} />
          ))}
        </div>

        {hasMore && (
          <button
            type="button"
            className="mh-view-more"
            onClick={() => setIsExpanded((v) => !v)}
          >
            {isExpanded ? "View Less" : "View More"}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              {isExpanded ? (
                <path
                  d="M8 5.33203L13.332 10.664L12.6647 11.3313L8 6.66669L3.33533 11.3313L2.668 10.664L8 5.33203Z"
                  fill="currentColor"
                />
              ) : (
                <path
                  d="M8 10.668L2.668 5.33599L3.33533 4.66866L8 9.33332L12.6647 4.66866L13.332 5.33599L8 10.668Z"
                  fill="currentColor"
                />
              )}
            </svg>
          </button>
        )}
      </div>

      {/* Layout Drawer (so header button actually works on mobile) */}
      <MobileDrawer isOpen={isLayoutDrawerOpen} onClose={() => setIsLayoutDrawerOpen(false)}>
        <div className="sticky top-0 z-50 bg-white border-b border-black/10 px-5 py-4 flex items-center justify-between">
          <div className="text-[#016853] text-lg font-semibold">Layout</div>
          <button
            type="button"
            className="bg-transparent border-none text-[#5F5F5F] cursor-pointer p-2 rounded-full hover:bg-black/5 transition-colors"
            onClick={() => setIsLayoutDrawerOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6l12 12m-12 0L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="p-2">
          {[
            { value: "grid", label: "Grid" },
            { value: "card", label: "Card" },
            { value: "list", label: "List" },
            { value: "magazine", label: "Magazine" },
            { value: "hybrid", label: "Hybrid" },
            { value: "classic", label: "Classic" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setLayout(opt.value);
                setIsLayoutDrawerOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                layout === opt.value ? "bg-[rgba(1,104,83,0.10)] text-[#016853]" : "hover:bg-[#F7F9FC] text-[#464646]"
              }`}
            >
              <span className="text-[15px] font-medium">{opt.label}</span>
              {layout === opt.value ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : null}
            </button>
          ))}
        </div>
      </MobileDrawer>
    </div>
  );
};

export default MobileHybridExplore;

