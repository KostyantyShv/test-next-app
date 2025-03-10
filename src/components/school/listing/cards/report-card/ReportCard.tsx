"use client";

import { useState } from "react";
import { mockGrades } from "./mock";

// Define the type for grade items
type GradeItem = {
  grade: string;
  subject: string;
  badgeColor: string;
};

// Mock data for grades

// Mock overall grade
const mockOverallGrade: GradeItem = {
  grade: "A-",
  subject: "Overall SkoolScout Grade",
  badgeColor: "#1ad598",
};

const ReportCard: React.FC<{ id: string }> = ({ id }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Split grades into main and expandable sections (first 6 in main, rest in expandable)
  const mainGrades = mockGrades.slice(0, 6);
  const expandableGrades = mockGrades.slice(6); // Now contains the remaining "College Prep" entries

  return (
    <div id={id} className="flex items-center justify-center my-cardMargin">
      <div className="w-full max-w-[375px] sm:max-w-[875px] rounded-cardBorderRadius bg-white shadow-cardShadow overflow-hidden">
        <div className="p-5 sm:p-6 sm:flex sm:gap-8">
          {/* Overall Grade Section */}
          <div className="flex-shrink-0 w-full sm:w-[200px] flex flex-col items-center border-b sm:border-b-0 pb-6 sm:pb-0 mb-5 sm:mb-0 border-gray-100">
            <div className="sm:hidden flex justify-center gap-2 mb-3">
              <a
                href="#"
                className="text-[13px] text-[#346DC2] no-underline hover:underline"
              >
                How are grades calculated?
              </a>
              <span className="text-[var(--subtle-text)]">•</span>
              <a
                href="#"
                className="text-[13px] text-[#346DC2] no-underline hover:underline"
              >
                Data Sources
              </a>
            </div>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3"
              style={{ backgroundColor: mockOverallGrade.badgeColor }}
            >
              {mockOverallGrade.grade}
            </div>
            <div className="text-[15px] text-[var(--bold-text)] font-medium text-center">
              {mockOverallGrade.subject}
            </div>
            <div className="hidden sm:flex flex-col items-center gap-2 mt-3">
              <a
                href="#"
                className="text-[13px] text-[#346DC2] no-underline hover:underline"
              >
                How are grades calculated?
              </a>
              <a
                href="#"
                className="text-[13px] text-[#346DC2] no-underline hover:underline"
              >
                Data Sources
              </a>
            </div>
          </div>

          {/* Grades Section */}
          <div className="flex-grow w-full">
            <div className="grid grid-cols-2 gap-4 mt-2 sm:mt-0">
              {mainGrades.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center gap-4 p-3 sm:p-0"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base"
                    style={{ backgroundColor: item.badgeColor }}
                  >
                    {item.grade}
                  </div>
                  <div className="text-[14px] sm:text-[15px] text-[var(--bold-text)] font-medium text-center sm:text-left">
                    {item.subject}
                  </div>
                </div>
              ))}
            </div>

            {/* Expandable Content */}
            <div className={`mt-2 sm:mt-4 ${isExpanded ? "block" : "hidden"}`}>
              <div className="grid grid-cols-2 gap-4">
                {expandableGrades.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-center gap-4 p-3 sm:p-0"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base"
                      style={{ backgroundColor: item.badgeColor }}
                    >
                      {item.grade}
                    </div>
                    <div className="text-[14px] sm:text-[15px] text-[var(--bold-text)] font-medium text-center sm:text-left">
                      {item.subject}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="p-4 sm:p-6 border-t border-gray-100 flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          onClick={toggleExpand}
        >
          <span className="text-[14px] text-[var(--subtle-text)] font-medium">
            {isExpanded ? "Hide" : "View Full Report Card"}
          </span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
