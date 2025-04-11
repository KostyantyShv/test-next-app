"use client";

import React, { ReactNode } from "react";

interface ContentBadgeProps {
  name: string;
  isActive: boolean;
  icon: ReactNode;
  onRemove: () => void;
  onAdd: () => void;
}

export default function ContentBadge({
  name,
  isActive,
  icon,
  onRemove,
  onAdd,
}: ContentBadgeProps) {
  return (
    <div
      className={`relative flex items-center justify-center w-10 h-10 rounded-full 
        ${isActive ? "bg-[#1D77BD] text-white" : "bg-[#E1E7EE] text-[#4A4A4A]"} 
        cursor-pointer`}
      data-addon-name={name}
    >
      {icon}
      <div
        className={`absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full flex items-center justify-center cursor-pointer 
          opacity-0 hover:opacity-100 transition-opacity duration-200 z-10
          ${
            isActive
              ? "bg-[#EEEEEE] text-[#464646] hover:bg-[#E0E0E0]"
              : "bg-[#EEEEEE] text-[#089E68] hover:bg-[#E0E0E0]"
          }`}
        onClick={(e) => {
          e.stopPropagation();
          if (isActive) onRemove();
          else onAdd();
        }}
      >
        {isActive ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </div>
    </div>
  );
}
