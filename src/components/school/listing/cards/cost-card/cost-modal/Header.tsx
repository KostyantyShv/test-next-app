import React from "react";
import { headerData } from "../mock";

interface HeaderProps {
  closePopup: () => void;
}

export const Header: React.FC<HeaderProps> = ({ closePopup }) => (
  <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-black/5 bg-white p-4 md:p-6">
    <h2 className="text-lg font-semibold tracking-tight text-[#016853] md:text-2xl">
      {headerData.title}
    </h2>
    <button
      onClick={closePopup}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-black/8 bg-[#f5f5f5] text-[#5F5F5F] transition-all duration-200 hover:bg-[#ebebeb] hover:text-[#1B1B1B] md:h-9 md:w-9"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="md:h-5 md:w-5"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  </div>
);
