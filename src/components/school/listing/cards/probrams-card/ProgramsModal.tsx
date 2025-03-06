// components/ProgramsModal.tsx
"use client";

import { useState, useEffect } from "react";
import ProgramCard from "./ProgramCard";
import {
  mastersProgramMock,
  doctoralCategoriesMock,
  doctoralProgramMock,
  mastersCategoriesMock,
} from "./mock";
import { useExpand } from "./useExpand.hook";
import { ProgramCategory } from "./types";

const ProgramsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"masters" | "doctoral">("masters");
  const [activeCategory, setActiveCategory] = useState<string>(
    "Agricultural Sciences"
  );
  const { expandedDescriptions, handleDescriptionToggle } = useExpand();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const renderProgramCategory = (category: ProgramCategory) => (
    <div key={category.header} className="mb-8">
      <h3 className="text-xl font-semibold text-[#016853] mb-4 pb-2 border-b border-[rgba(0,0,0,0.08)]">
        {category.header}
      </h3>
      <div className="mb-6">
        {category.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between py-3 border-b border-[rgba(0,0,0,0.08)]"
          >
            <span className="text-[15px] text-[#4A4A4A]">{item.name}</span>
            <span className="text-sm text-[#5F5F5F]">{item.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-[90%] max-w-[1100px] max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.15)] animate-fadeIn">
        {/* Header */}
        <div className="bg-[#016853] text-white p-6 flex justify-between items-center sticky top-0 z-10 border-b border-white/10">
          <div>
            <h1 className="text-2xl md:text-[28px] font-bold">
              Lincoln Academy
            </h1>
            <p className="mt-2 text-base opacity-90">Programs and Majors</p>
          </div>
          <button
            className="text-2xl md:text-[28px] w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[rgba(0,0,0,0.08)]">
          <button
            className={`p-5 md:px-8 text-lg md:text-[18px] font-semibold ${
              activeTab === "masters"
                ? "text-[#016853] border-b-2 border-[#016853]"
                : "text-[#5F5F5F]"
            } transition-all`}
            onClick={() => setActiveTab("masters")}
          >
            Master`s programs
          </button>
          <button
            className={`p-5 md:px-8 text-lg md:text-[18px] font-semibold ${
              activeTab === "doctoral"
                ? "text-[#016853] border-b-2 border-[#016853]"
                : "text-[#5F5F5F]"
            } transition-all`}
            onClick={() => setActiveTab("doctoral")}
          >
            Doctoral programs
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className={activeTab === "masters" ? "block p-8" : "hidden"}>
            {/* Category Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                "Agricultural Sciences",
                "Anthropology and Sociology",
                "Architecture",
                "Biology",
                "Business and Management",
                "Chemistry",
                "Communications",
                "Computer Science",
                "Show All",
              ].map((category) => (
                <button
                  key={category}
                  className={`border border-[#016853] text-[#016853] px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-[#016853] text-white"
                      : "hover:bg-[#016853] hover:text-white"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Featured Programs */}
            <h2 className="text-2xl font-semibold text-[#464646] mb-6">
              Featured master`s programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {mastersProgramMock.map((program, index) => (
                <ProgramCard
                  key={index}
                  program={program}
                  index={index}
                  tab="masters"
                  expandedDescriptions={expandedDescriptions}
                  onDescriptionToggle={handleDescriptionToggle}
                />
              ))}
            </div>

            {/* All Programs */}
            <div>
              <h2 className="text-2xl font-semibold text-[#464646] mb-6">
                All master`s programs offered
              </h2>
              {mastersCategoriesMock.map(renderProgramCategory)}
              <a
                href="#"
                className="flex justify-end items-center gap-2 text-[#346DC2] text-sm font-medium hover:underline"
              >
                See all Biology Programs
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 3.33334L7.06 4.27334L10.78 8.00001L7.06 11.7267L8 12.6667L12.6667 8.00001L8 3.33334Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className={activeTab === "doctoral" ? "block p-8" : "hidden"}>
            {/* Category Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                "All Categories",
                "Biology",
                "Chemistry",
                "Physics",
                "Engineering",
                "Computer Science",
              ].map((category) => (
                <button
                  key={category}
                  className={`border border-[#016853] text-[#016853] px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-[#016853] text-white"
                      : "hover:bg-[#016853] hover:text-white"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Featured Programs */}
            <h2 className="text-2xl font-semibold text-[#464646] mb-6">
              Featured doctoral programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {doctoralProgramMock.map((program, index) => (
                <ProgramCard
                  key={index}
                  program={program}
                  index={index}
                  tab="doctoral"
                  expandedDescriptions={expandedDescriptions}
                  onDescriptionToggle={handleDescriptionToggle}
                />
              ))}
            </div>

            {/* All Programs */}
            <div>
              <h2 className="text-2xl font-semibold text-[#464646] mb-6">
                All doctoral programs offered
              </h2>
              {doctoralCategoriesMock.map(renderProgramCategory)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsModal;
