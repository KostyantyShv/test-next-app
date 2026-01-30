"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import ContentArea from "./ContentArea";
import { schools } from "../mock";
import { establishmentTypes, layouts } from "./mock";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import SearchTypeButton from "./SearchTypeButton";
import MobileHybridExplore from "./mobile-hybrid/MobileHybridExplore";

interface MainContentProps {
  onContainerExpandChange?: (isExpanded: boolean) => void;
}

const MainContent: React.FC<MainContentProps> = ({ onContainerExpandChange }) => {
  const { establishment, setEstablishment } = useSchoolsExplore(
    (state) => state
  );
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);
  const [layout, setLayout] = useState("classic");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const renderDropdownItems = () => (
    <>
      {establishmentTypes.map((item) => (
        <div
          onClick={() => setEstablishment(item)}
          key={item}
          className="flex items-center p-2 hover:bg-[rgba(0,0,0,0.04)] transition-colors duration-200 cursor-pointer"
        >
          <div className="w-6 h-6 flex items-center justify-center mr-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4F4F4F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h6v6h-6z"></path>
              <path d="M14 4h6v6h-6z"></path>
              <path d="M4 14h6v6h-6z"></path>
              <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
            </svg>
          </div>
          <div className="flex-1 flex justify-between items-center">
            <span className="text-[#4A4A4A] text-sm font-medium">{item}</span>
            <span className="text-[#5F5F5F] text-[13px]"></span>
          </div>
        </div>
      ))}
    </>
  );

  const renderSearchTypeButton = () => <SearchTypeButton />;

  // Mobile Hybrid Layout: pixel-match to provided HTML reference.
  if (isMobile && layout === "hybrid") {
    return <MobileHybridExplore schools={schools} layout={layout} setLayout={setLayout} />;
  }

  return (
    <div className="w-full bg-white rounded-xl border border-[rgba(0,0,0,0.1)] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden">
      <Header
        dropdownValue={establishment}
        schools={schools}
        layouts={layouts}
        renderDropdownItems={renderDropdownItems}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
        isMapActive={isMapActive}
        setIsMapActive={setIsMapActive}
        layout={layout}
        setLayout={setLayout}
        layoutToggleWidth={134}
        renderSearchTypeButton={renderSearchTypeButton}
        onContainerExpandChange={onContainerExpandChange}
      />
      <ContentArea
        isMapActive={isMapActive}
        layout={layout}
        schools={schools}
      />
    </div>
  );
};

export default MainContent;
