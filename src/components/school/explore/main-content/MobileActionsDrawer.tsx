"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { Portal } from "@/components/ui/Portal";

const SORT_OPTIONS = [
  { value: "best-match", label: "Best Match" },
  { value: "newest", label: "Newest" },
  { value: "highest-rated", label: "Highest Rated" },
  { value: "most-wished", label: "Most Wished" },
];

const SEARCH_TYPE_OPTIONS = [
  { value: "trending", label: "Trending" },
  { value: "latest", label: "Latest" },
  { value: "highest-rated", label: "Highest Rated" },
];

interface MobileActionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  layout: string;
  setLayout: (value: string) => void;
  layouts: { type: string; icon: ReactNode }[];
}

export function MobileActionsDrawer({
  isOpen,
  onClose,
  layout,
  setLayout,
  layouts,
}: MobileActionsDrawerProps) {
  const [active, setActive] = useState(false);
  const [sort, setSort] = useState("best-match");
  const [searchType, setSearchType] = useState("trending");

  const drawerLayouts = layouts;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => setActive(true));
      });
      return () => {
        cancelAnimationFrame(t);
        document.body.style.overflow = "";
      };
    } else {
      setActive(false);
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleClose = () => {
    setActive(false);
    setTimeout(onClose, 300);
  };

  const handleSortSelect = (value: string) => {
    setSort(value);
    handleClose();
  };

  const handleSearchTypeSelect = (value: string) => {
    setSearchType(value);
    handleClose();
  };

  const handleLayoutSelect = (value: string) => {
    setLayout(value);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <Portal containerId="mobile-modal-root">
      <div className="md:hidden">
        {/* No overlay here — Header's shared overlay is used when isOptionsDrawerOpen is true */}
        <div
          className="fixed bottom-0 left-1/2 z-[1001] flex max-h-[85vh] w-full max-w-[420px] -translate-x-1/2 flex-col overflow-hidden rounded-t-[20px] bg-white shadow-[0_-8px_18px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out"
          style={{
            transform: active ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(100%)",
            visibility: active ? "visible" : "hidden",
          }}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-[rgba(0,0,0,0.1)] px-4 py-4">
            <h2 className="text-lg font-semibold text-[#1B1B1B]">Options</h2>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#5F5F5F] transition-colors hover:bg-[rgba(0,0,0,0.05)]"
              onClick={handleClose}
              aria-label="Close"
            >
              <span className="text-2xl leading-none">×</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Sort By */}
            <div className="border-b border-[rgba(0,0,0,0.1)] py-2">
              <div className="px-4 pt-4 pb-2 text-base font-medium text-[#1B1B1B]">
                Sort By
              </div>
              {SORT_OPTIONS.map((opt) => (
                <div
                  key={opt.value}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSortSelect(opt.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSortSelect(opt.value)
                  }
                  className={`flex items-center px-4 py-3 transition-colors hover:bg-[#f5f5f7] ${
                    sort === opt.value ? "bg-transparent" : ""
                  }`}
                >
                  <div className="flex flex-1 items-center justify-between">
                    <span className="text-sm text-[#4A4A4A]">{opt.label}</span>
                    {sort === opt.value && (
                      <svg
                        className="h-5 w-5 text-[#0093B0]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Search Type */}
            <div className="border-b border-[rgba(0,0,0,0.1)] py-2">
              <div className="px-4 pt-4 pb-2 text-base font-medium text-[#1B1B1B]">
                Search Type
              </div>
              {SEARCH_TYPE_OPTIONS.map((opt) => (
                <div
                  key={opt.value}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSearchTypeSelect(opt.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSearchTypeSelect(opt.value)
                  }
                  className={`flex items-center px-4 py-3 transition-colors hover:bg-[#f5f5f7] ${
                    searchType === opt.value ? "bg-transparent" : ""
                  }`}
                >
                  <div className="flex flex-1 items-center justify-between">
                    <span className="text-sm text-[#4A4A4A]">{opt.label}</span>
                    {searchType === opt.value && (
                      <svg
                        className="h-5 w-5 text-[#0093B0]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Layout */}
            <div className="border-b border-[rgba(0,0,0,0.1)] py-2">
              <div className="px-4 pt-4 pb-2 text-base font-medium text-[#1B1B1B]">
                Layout
              </div>
              <div className="flex flex-wrap gap-2 px-4 pb-4">
                {drawerLayouts.map(({ type, icon }) => {
                  const label = type.charAt(0).toUpperCase() + type.slice(1);
                  return (
                  <button
                    key={type}
                    type="button"
                    title={label}
                    onClick={() => handleLayoutSelect(type)}
                    className={`flex flex-col items-center justify-center rounded-lg border transition-all h-[72px] w-[72px] ${
                      layout === type
                        ? "border-[#0093B0] bg-[rgba(0,147,176,0.1)]"
                        : "border-[rgba(0,0,0,0.1)] bg-white hover:bg-[#f5f5f7]"
                    }`}
                  >
                    <span
                      className={`mb-1 h-6 w-6 flex items-center justify-center ${
                        layout === type ? "text-[#0093B0]" : "text-[#4A4A4A]"
                      }`}
                    >
                      {icon}
                    </span>
                    <span
                      className={`text-xs ${
                        layout === type
                          ? "text-[#0093B0] font-medium"
                          : "text-[#4A4A4A]"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
