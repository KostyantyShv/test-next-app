"use client";
import React, { useState } from "react";

const SearchTypeButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedType, setSelectedType] = useState("All");

  const searchTypes = [
    { id: "all", label: "All" },
    { id: "schools", label: "Schools" },
    { id: "colleges", label: "Colleges" },
    { id: "universities", label: "Universities" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsActive(!isActive)}
        className={`flex items-center gap-2 px-3 py-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? "text-[#016853] border-[#016853]"
            : "text-[#4A4A4A] hover:bg-[#f5f5f7]"
        }`}
      >
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        {selectedType}
        <svg
          className={`w-4 h-4 transition-transform ${isActive ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isActive && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg shadow-lg z-50">
          {searchTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => {
                setSelectedType(type.label);
                setIsActive(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-[#f5f5f7] transition-colors ${
                selectedType === type.label ? "text-[#016853] bg-[#f0f9f6]" : "text-[#4A4A4A]"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchTypeButton; 