import React, { useEffect, useMemo, useRef, useState } from "react";
import { School } from "../../types";
import { DesktopGridSchoolCard } from "./DesktopGridSchoolCard";

type Establishment = "K-12" | "Colleges" | "Graduates" | "District";

const ESTABLISHMENT_OPTIONS: Array<{ value: Establishment; label: string }> = [
  { value: "K-12", label: "K-12" },
  { value: "Colleges", label: "Colleges" },
  { value: "Graduates", label: "Graduate" },
  { value: "District", label: "Districts" },
];

export const DesktopGridExplore: React.FC<{
  schools: School[];
  establishment: Establishment;
  setEstablishment: (value: Establishment) => void;
  layout: string;
  setLayout: (value: string) => void;
}> = ({ schools, establishment, setEstablishment, layout, setLayout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLayoutMenuOpen, setIsLayoutMenuOpen] = useState(false);
  const headerLeftRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isDropdownOpen && !isLayoutMenuOpen) return;
    const onClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (headerLeftRef.current && headerLeftRef.current.contains(target)) return;
      setIsDropdownOpen(false);
      setIsLayoutMenuOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [isDropdownOpen, isLayoutMenuOpen]);

  const currentLabel = useMemo(() => {
    return ESTABLISHMENT_OPTIONS.find((o) => o.value === establishment)?.label ?? establishment;
  }, [establishment]);

  return (
    <div className="hidden md:block w-full">
      {/* Container 1:1 */}
      <div className="max-w-[1055px] w-full mx-auto bg-white p-8 rounded-xl border border-[rgba(0,0,0,0.1)] shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="flex items-center justify-between py-4 bg-white border-b border-[rgba(0,0,0,0.08)] relative mb-6">
          <div
            ref={headerLeftRef}
            className={`flex items-center gap-3 relative cursor-pointer px-4 py-2 rounded-[20px] transition-colors ${
              isDropdownOpen ? "active bg-[#f5f5f7]" : "hover:bg-[#f5f5f7]"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen((v) => !v);
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center text-[#464646]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M4 4h6v6h-6z"></path>
                <path d="M14 4h6v6h-6z"></path>
                <path d="M4 14h6v6h-6z"></path>
                <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
              </svg>
            </div>

            <h1 className="text-[18px] font-semibold text-[#464646]">{currentLabel}</h1>

            <div className={`w-4 h-4 ml-2 text-[#4A4A4A] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </div>

            {/* Dropdown */}
            <div
              className={`absolute top-[calc(100%+8px)] left-0 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] w-[240px] py-2 z-[1000] ${
                isDropdownOpen ? "block" : "hidden"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {ESTABLISHMENT_OPTIONS.map((opt) => {
                const selected = opt.value === establishment;
                return (
                  <div
                    key={opt.value}
                    className={`flex items-center px-4 py-2.5 cursor-pointer text-sm font-medium transition-colors ${
                      selected ? "bg-[rgba(0,147,176,0.1)] text-[#0093B0]" : "hover:bg-[rgba(0,0,0,0.04)] text-[#4A4A4A]"
                    }`}
                    onClick={() => {
                      setEstablishment(opt.value);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <div className="w-6 h-6 flex items-center justify-center mr-3">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={selected ? "text-[#0093B0]" : "text-[#5F5F5F]"}>
                        <path d="M4 4h6v6h-6z"></path>
                        <path d="M14 4h6v6h-6z"></path>
                        <path d="M4 14h6v6h-6z"></path>
                        <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                      </svg>
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-[#4A4A4A]">{opt.label}</span>
                      <span className="text-[13px] text-[#5F5F5F]">{schools.length}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Header right: layout toggle (closed state matches HTML) */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex items-center bg-[#f5f5f7] rounded-[6px] p-[2px] w-9">
                <button
                  type="button"
                  className="relative flex items-center justify-center w-8 h-7 rounded-[4px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-[#0093B0]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLayoutMenuOpen((v) => !v);
                  }}
                >
                  <svg viewBox="0 0 16 16" strokeLinejoin="round" className="w-4 h-4">
                    <path
                      fill="currentColor"
                      d="M2.5 5.5V2.5H5.5V5.5H2.5ZM1 2C1 1.44772 1.44772 1 2 1H6C6.55228 1 7 1.44772 7 2V6C7 6.55228 6.55228 7 6 7H2C1.44772 7 1 6.55228 1 6V2ZM2.5 13.5V10.5H5.5V13.5H2.5ZM1 10C1 9.44772 1.44772 9 2 9H6C6.55228 9 7 9.44772 7 10V14C7 14.5523 6.55228 15 6 15H2C1.44772 15 1 14.5523 1 14V10ZM10.5 2.5V5.5H13.5V2.5H10.5ZM10 1C9.44772 1 9 1.44772 9 2V6C9 6.55228 9.44772 7 10 7H14C14.5523 7 15 6.55228 15 6V2C15 1.44772 14.5523 1 14 1H10ZM10.5 13.5V10.5H13.5V13.5H10.5ZM9 10C9 9.44772 9.44772 9 10 9H14C14.5523 9 15 9.44772 15 10V14C15 14.5523 14.5523 15 14 15H10C9.44772 15 9 14.5523 9 14V10Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 bg-[#464646] text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Grid
                  </span>
                </button>
              </div>

              {/* Simple layout menu (only appears on click; closed state remains 1:1) */}
              {isLayoutMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-black/5 z-[1000] overflow-hidden">
                  {[
                    { value: "grid", label: "Grid" },
                    { value: "card", label: "Card" },
                    { value: "magazine", label: "Magazine" },
                    { value: "hybrid", label: "Hybrid" },
                    { value: "classic", label: "Classic" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                        layout === opt.value ? "bg-[rgba(0,147,176,0.1)] text-[#0093B0]" : "hover:bg-black/5 text-[#464646]"
                      }`}
                      onClick={() => {
                        setLayout(opt.value);
                        setIsLayoutMenuOpen(false);
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 w-full">
          {schools.map((school, idx) => (
            <DesktopGridSchoolCard key={`${school.name}-${idx}`} school={school} establishment={establishment} />
          ))}
        </div>
      </div>
    </div>
  );
};

