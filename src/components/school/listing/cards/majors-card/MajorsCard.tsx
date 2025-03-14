// components/MajorsSection.tsx
"use client";

import { useState, useEffect } from "react";
import MajorsModal from "./MajorsModal";
import CardWrapper from "../../card-wrapper/CardWrapper";

const MajorsCard: React.FC<{ id: string }> = ({ id }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // This replaces the DOMContentLoaded event listener
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <CardWrapper id={id}>
      <h2 className="text-[#016853] text-2xl font-semibold mb-8 tracking-[-0.02em]">
        Majors
      </h2>
      <h3 className="text-[#4A4A4A] text-lg font-semibold mb-6 tracking-[-0.01em]">
        Most Popular Majors
      </h3>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-[1fr_auto] py-3 border-b border-black/10 items-center">
          <span className="text-[#4A4A4A] text-[15px] font-medium">
            Psychology
          </span>
          <span className="text-[#089E68] text-[15px] font-semibold">
            599 Graduates
          </span>
        </div>
        <div className="grid grid-cols-[1fr_auto] py-3 border-b border-black/10 items-center">
          <span className="text-[#4A4A4A] text-[15px] font-medium">
            Biology
          </span>
          <span className="text-[#089E68] text-[15px] font-semibold">
            595 Graduates
          </span>
        </div>
        <div className="grid grid-cols-[1fr_auto] py-3 border-b border-black/10 items-center">
          <span className="text-[#4A4A4A] text-[15px] font-medium">
            Business
          </span>
          <span className="text-[#089E68] text-[15px] font-semibold">
            452 Graduates
          </span>
        </div>

        <div className={`${isExpanded ? "block" : "hidden"}`}>
          <div className="grid grid-cols-[1fr_auto] py-3 border-b border-black/10 items-center transition-all duration-300 ease-in-out opacity-100 translate-y-0">
            <span className="text-[#4A4A4A] text-[15px] font-medium">
              Political Science and Government
            </span>
            <span className="text-[#089E68] text-[15px] font-semibold">
              439 Graduates
            </span>
          </div>
          <div className="grid grid-cols-[1fr_auto] py-3 border-b border-black/10 items-center transition-all duration-300 ease-in-out opacity-100 translate-y-0">
            <span className="text-[#4A4A4A] text-[15px] font-medium">
              Information Science
            </span>
            <span className="text-[#089E68] text-[15px] font-semibold">
              338 Graduates
            </span>
          </div>
          <div className="grid grid-cols-[1fr_auto] py-3 border-b border-black/10 items-center transition-all duration-300 ease-in-out opacity-100 translate-y-0">
            <span className="text-[#4A4A4A] text-[15px] font-medium">
              Mechanical Engineering
            </span>
            <span className="text-[#089E68] text-[15px] font-semibold">
              309 Graduates
            </span>
          </div>
          <div className="grid grid-cols-[1fr_auto] py-3 border-b border-black/10 items-center transition-all duration-300 ease-in-out opacity-100 translate-y-0">
            <span className="text-[#4A4A4A] text-[15px] font-medium">
              Economics
            </span>
            <span className="text-[#089E68] text-[15px] font-semibold">
              277 Graduates
            </span>
          </div>
          <div className="grid grid-cols-[1fr_auto] py-3 border-b border-black/10 items-center transition-all duration-300 ease-in-out opacity-100 translate-y-0">
            <span className="text-[#4A4A4A] text-[15px] font-medium">
              Exercise Physiology
            </span>
            <span className="text-[#089E68] text-[15px] font-semibold">
              251 Graduates
            </span>
          </div>
          <div className="grid grid-cols-[1fr_auto] py-3 border-b border-black/10 items-center transition-all duration-300 ease-in-out opacity-100 translate-y-0">
            <span className="text-[#4A4A4A] text-[15px] font-medium">
              Public Health
            </span>
            <span className="text-[#089E68] text-[15px] font-semibold">
              250 Graduates
            </span>
          </div>
          <div className="grid grid-cols-[1fr_auto] py-3 border-b border-black/10 items-center transition-all duration-300 ease-in-out opacity-100 translate-y-0">
            <span className="text-[#4A4A4A] text-[15px] font-medium">
              Finance
            </span>
            <span className="text-[#089E68] text-[15px] font-semibold">
              248 Graduates
            </span>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between items-center mt-6 pt-4 max-w-full">
        <button
          onClick={toggleExpand}
          className="flex items-center gap-[6px] text-[#346DC2] text-sm font-medium bg-transparent border-none p-0 hover:text-[#1D77BD]"
        >
          {isExpanded ? "Hide" : "More"}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={`${
              isExpanded ? "rotate-180" : ""
            } transition-transform duration-200 ease-in-out`}
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <MajorsModal />
      </div>
    </CardWrapper>
  );
};

export default MajorsCard;
