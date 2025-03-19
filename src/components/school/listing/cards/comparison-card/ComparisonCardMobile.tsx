// components/ComparisonCardMobile.tsx
import { useState } from "react";
import { schoolsData } from "./mock"; // Assuming this contains the same data structure as the HTML version
import SchoolCard from "./SchoolCard";
import { School } from "./types";

const ComparisonCardMobile: React.FC<{ id: string }> = ({ id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedFeatures, setExpandedFeatures] = useState<number[]>([]);

  const toggleFeatures = (schoolId: number) => {
    setExpandedFeatures((prev) =>
      prev.includes(schoolId)
        ? prev.filter((id) => id !== schoolId)
        : [...prev, schoolId]
    );
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < schoolsData.length - 1)
      setCurrentIndex(currentIndex + 1);
  };

  return (
    <div
      id={id}
      className="w-full rounded-cardBorderRadius shadow-cardShadow my-cardMargin mx-auto font-['Inter'] text-[#4A4A4A] overflow-x-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="w-full">
        <div className="w-full bg-cardBackground p-cardPadding ">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-[22px] font-semibold text-[#464646]">
              Compare with similar schools
            </h2>
          </div>

          <div className="school-grid">
            {schoolsData.map((school: School, index: number) => (
              <div
                key={school.id}
                className={`w-full p-0 duration-200 ${
                  index === currentIndex ? "block" : "hidden"
                }`}
              >
                <SchoolCard school={school} key={school.id} />
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-6 gap-2">
            <button
              className="w-9 h-9 rounded-full border border-[rgba(0,0,0,0.1)] bg-white text-[#5F5F5F] flex items-center justify-center transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#346DC2] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePrev}
              disabled={currentIndex <= 0}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="w-[60%] h-1 bg-[#f0f0f0] rounded-sm relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-[#0B6333] rounded-sm transition-transform duration-300"
                style={{
                  transform: `translateX(${
                    ((currentIndex + 1) / schoolsData.length) * 100 - 100
                  }%)`,
                }}
              />
            </div>
            <div className="text-sm text-[#5F5F5F] mx-2">{`${
              currentIndex + 1
            }/${schoolsData.length}`}</div>
            <button
              className="w-9 h-9 rounded-full border border-[rgba(0,0,0,0.1)] bg-white text-[#5F5F5F] flex items-center justify-center transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#346DC2] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={currentIndex >= schoolsData.length - 1}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-center mt-2 gap-[6px]">
            {schoolsData.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? "bg-[#0B6333]" : "bg-[#DFDDDB]"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <a
              href="#"
              className="text-[#346DC2] font-medium no-underline flex items-center gap-1 hover:underline"
            >
              See All Similar Schools
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 3.33334L7.06 4.27334L10.78 8.00001L7.06 11.7267L8 12.6667L12.6667 8.00001L8 3.33334Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonCardMobile;
