"use client";

import React, { useState, ReactNode } from "react";
import { Drawer } from "vaul";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useIsMobile } from "@/hooks/useIsMobile";

const SORT_OPTIONS = [
  { value: "recently-added", label: "Recently Added" },
  { value: "oldest-first", label: "Oldest First" },
  { value: "title-az", label: "Title: A-Z" },
  { value: "title-za", label: "Title: Z-A" },
  { value: "highest-rated", label: "Highest Rated" },
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
  hideLayoutControls?: boolean;
  /** Appended after Sort (e.g. Collections actions). Receives `onClose` to dismiss the sheet. */
  appendContent?: ReactNode | ((onClose: () => void) => ReactNode);
}

export function MobileActionsDrawer({
  isOpen,
  onClose,
  layout,
  setLayout,
  layouts,
  hideLayoutControls = false,
  appendContent,
}: MobileActionsDrawerProps) {
  const [sort, setSort] = useState("recently-added");
  const [searchType, setSearchType] = useState("trending");
  const isMobile = useIsMobile();
  const isDrawerOpen = isOpen && isMobile;

  useBodyScrollLock(isDrawerOpen);

  const drawerLayouts = layouts;

  const handleClose = () => onClose();

  const appended =
    typeof appendContent === "function" ? appendContent(handleClose) : appendContent;

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

  const showExploreSortAndSearch = !hideLayoutControls;

  if (!isMobile) return null;

  return (
    <Drawer.Root
      open={isDrawerOpen}
      modal
      dismissible
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[3500] bg-[rgba(27,27,27,0.5)] backdrop-blur-[4px]" />
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 z-[3600] flex max-h-[85dvh] min-h-[45dvh] w-full flex-col overflow-hidden rounded-t-[20px] bg-white shadow-[0_-8px_18px_rgba(0,0,0,0.12)] outline-none"
          aria-describedby={undefined}
        >
          <div className="mx-auto mt-3 mb-2 h-1 w-10 shrink-0 rounded-full bg-[rgba(0,0,0,0.16)]" />
          <div className="flex shrink-0 items-center justify-between border-b border-[rgba(0,0,0,0.1)] px-4 py-4">
            <Drawer.Title className="text-lg font-semibold text-[#1B1B1B]">
              Options
            </Drawer.Title>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#5F5F5F] transition-colors hover:bg-[rgba(0,0,0,0.05)]"
              onClick={handleClose}
              aria-label="Close"
            >
              <span className="text-2xl leading-none">×</span>
            </button>
          </div>

          <div
            className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain touch-pan-y"
            style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
          >
          {showExploreSortAndSearch ? (
            <>
              <div className="border-b border-[rgba(0,0,0,0.1)] py-2">
                <div className="px-4 pt-4 pb-2 text-base font-medium text-[#1B1B1B]">Sort By</div>
                {SORT_OPTIONS.map((opt) => (
                  <div
                    key={opt.value}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSortSelect(opt.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSortSelect(opt.value)}
                    className={`flex cursor-pointer items-center px-4 py-3 transition-colors hover:bg-[#f5f5f7] ${
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

              <div className="border-b border-[rgba(0,0,0,0.1)] py-2">
                <div className="px-4 pt-4 pb-2 text-base font-medium text-[#1B1B1B]">Search Type</div>
                {SEARCH_TYPE_OPTIONS.map((opt) => (
                  <div
                    key={opt.value}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSearchTypeSelect(opt.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearchTypeSelect(opt.value)}
                    className={`flex cursor-pointer items-center px-4 py-3 transition-colors hover:bg-[#f5f5f7] ${
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
            </>
          ) : (
            <div className="border-b border-[rgba(0,0,0,0.1)] py-2">
              <div className="px-4 pt-4 pb-2 text-base font-medium text-[#1B1B1B]">Sort By</div>
              {SORT_OPTIONS.map((opt) => (
                <div
                  key={opt.value}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSortSelect(opt.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSortSelect(opt.value)}
                  className={`flex cursor-pointer items-center px-4 py-3 transition-colors hover:bg-[#f5f5f7] ${
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
          )}

          {drawerLayouts.length > 0 ? (
            <div className="border-b border-[rgba(0,0,0,0.1)] py-2">
              <div className="px-4 pt-4 pb-2 text-base font-medium text-[#1B1B1B]">Layout</div>
              <div className="flex flex-wrap gap-2 px-4 pb-4">
                {drawerLayouts.map(({ type, icon }) => {
                  const label = type.charAt(0).toUpperCase() + type.slice(1);
                  return (
                    <button
                      key={type}
                      type="button"
                      title={label}
                      onClick={() => handleLayoutSelect(type)}
                      className={`flex h-[72px] w-[72px] flex-col items-center justify-center rounded-lg border transition-all ${
                        layout === type
                          ? "border-[#0093B0] bg-[rgba(0,147,176,0.1)]"
                          : "border-[rgba(0,0,0,0.1)] bg-white hover:bg-[#f5f5f7]"
                      }`}
                    >
                      <span
                        className={`mb-1 flex h-6 w-6 items-center justify-center ${
                          layout === type ? "text-[#0093B0]" : "text-[#4A4A4A]"
                        }`}
                      >
                        {icon}
                      </span>
                      <span
                        className={`text-xs ${
                          layout === type ? "font-medium text-[#0093B0]" : "text-[#4A4A4A]"
                        }`}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {appended}
        </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
