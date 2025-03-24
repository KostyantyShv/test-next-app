import React from "react";
import { layouts } from "./mock";
import CategoryDropdown from "./CategoryDropdown";
import SearchBox from "./SearchBox";
import MapButton from "./MapButton";
import LayoutToggle from "./LayoutToggle";
import SearchTypeButton from "./SearchTypeButton";

interface HeaderProps {
  isSearchActive: boolean;
  setIsSearchActive: (value: boolean) => void;
  isMapActive: boolean;
  setIsMapActive: (value: boolean) => void;
  layout: string;
  setLayout: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  isSearchActive,
  setIsSearchActive,
  isMapActive,
  setIsMapActive,
  layout,
  setLayout,
}) => {
  return (
    <div className="flex items-center justify-between p-4 md:p-6 border-b border-[rgba(0,0,0,0.08)] bg-white">
      <CategoryDropdown />
      <div className="flex items-center gap-3">
        <SearchBox
          isSearchActive={isSearchActive}
          setIsSearchActive={setIsSearchActive}
        />
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#4A4A4A] hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-200"
          onClick={() => setIsSearchActive(true)}
        >
          <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path d="M21.7,20.3l-3.3-2.9c1.5-1.7,2.3-3.8,2.3-6.1c0-5.1-4.2-9.3-9.3-9.3S2,6.2,2,11.3s4.2,9.3,9.3,9.3c2.1,0,4-0.7,5.7-1.9 l3.4,3c0.2,0.2,0.4,0.2,0.6,0.2c0.3,0,0.5-0.1,0.7-0.3C22.1,21.3,22.1,20.7,21.7,20.3z M11.3,18.7c-4.1,0-7.4-3.3-7.4-7.4 s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4S15.4,18.7,11.3,18.7z"></path>
          </svg>
        </button>
        <MapButton isMapActive={isMapActive} setIsMapActive={setIsMapActive} />
        <div className="w-[1px] h-6 bg-[rgba(0,0,0,0.1)] mx-2"></div>
        <LayoutToggle layout={layout} setLayout={setLayout} layouts={layouts} />
        <SearchTypeButton />
      </div>
    </div>
  );
};

export default Header;
