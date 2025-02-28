"use client";

import { useState } from "react";

export default function ReportCard({ id }: { id: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="bg-cardBackground my-cardMargin rounded-cardBorderRadius shadow-cardShadow overflow-hidden"
      id={id}
    >
      {/* Main Content */}
      <div className="p-cardPadding">
        <div className="flex flex-row">
          {/* Overall Grade Column */}
          <div className="flex flex-col items-center mr-12">
            <div className="w-20 h-20 rounded-full bg-[#00DF8B] flex items-center justify-center text-3xl font-bold text-white mb-3">
              A+
            </div>
            <div className="text-sm text-gray-700 font-medium text-center">
              Overall Niche Grade
            </div>
            <div className="mt-2 flex flex-col items-center">
              <a href="#" className="text-blue-600 text-xs hover:underline">
                How are grades calculated?
              </a>
              <a href="#" className="text-blue-600 text-xs hover:underline">
                Data Sources
              </a>
            </div>
          </div>

          {/* Grades Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#00DF8B] flex items-center justify-center font-bold text-white text-base mr-3">
                  A+
                </div>
                <div className="text-gray-800">Academics</div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#1ad598] flex items-center justify-center font-bold text-white text-base mr-3">
                  A-
                </div>
                <div className="text-gray-800">Diversity</div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center font-bold text-white text-base mr-3">
                  B+
                </div>
                <div className="text-gray-800">Teachers</div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#8BC34A] flex items-center justify-center font-bold text-white text-base mr-3">
                  B-
                </div>
                <div className="text-gray-800">College Prep</div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center font-bold text-white text-base mr-3">
                  B+
                </div>
                <div className="text-gray-800">Teachers</div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#8BC34A] flex items-center justify-center font-bold text-white text-base mr-3">
                  B-
                </div>
                <div className="text-gray-800">College Prep</div>
              </div>
            </div>

            {/* Expandable Content */}
            {isExpanded && (
              <div className="mt-4 grid grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#FFC107] flex items-center justify-center font-bold text-white text-base mr-3">
                    C+
                  </div>
                  <div className="text-gray-800">Clubs & Activities</div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#FF9800] flex items-center justify-center font-bold text-white text-base mr-3">
                    C-
                  </div>
                  <div className="text-gray-800">Administration</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100"></div>

      {/* Footer */}
      <div
        className="py-3 flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={toggleExpand}
      >
        <span className="text-gray-600 text-sm font-medium">
          {isExpanded ? "Hide" : "View Full Report Card"}
        </span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${
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
          ></path>
        </svg>
      </div>
    </div>
  );
}
