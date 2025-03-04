// components/Academics.tsx
import React from "react";

const AcademicsCard: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div id={id} className="flex justify-center my-cardMargin font-['Inter']">
      <div className="w-[811px] bg-cardBackground rounded-cardBorderRadius p-cardPadding shadow-cardShadow">
        <h2 className="text-[#016853] text-2xl font-semibold mb-8 tracking-[-0.02em]">
          Academics
        </h2>

        <div className="grid grid-cols-2 gap-8">
          <div className="border-r border-[rgba(0,0,0,0.1)] pr-8">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-xl font-semibold">
                  A+
                </div>
                <h3 className="text-[#4A4A4A] text-base font-semibold">
                  Professors
                </h3>
              </div>
              <p className="text-[#5F5F5F] text-sm leading-6 mb-6">
                Based on faculty accomplishments, salary, student reviews, and
                additional factors.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-[rgba(0,0,0,0.1)]">
                <span className="text-[#4A4A4A] text-[15px] font-medium">
                  Student Faculty Ratio
                </span>
                <span className="text-[#089E68] text-[15px] font-semibold">
                  3:1
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[rgba(0,0,0,0.1)]">
                <span className="text-[#4A4A4A] text-[15px] font-medium">
                  Evening Degree Programs
                </span>
                <span className="text-[#089E68] text-[15px] font-semibold">
                  No
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#F8FCFF] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative h-4 w-4">
                <div className="absolute top-[2px] left-2 w-[3px] h-[10px] bg-[#c5e4b8] shadow-[4px_4px_0_#f78f6a,-8px_4px_0_#9eddf8,-4px_2px_0_#6bbef2]" />
              </div>
              <div className="text-[#1D77BD] text-base font-semibold uppercase tracking-[0.05em]">
                POLLS
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-[#333] text-[32px] font-bold mb-2">
                  83%
                </div>
                <div className="text-[#4A4A4A] text-sm leading-6 mb-1">
                  of students agree that professors put a lot of effort into
                  teaching their classes.
                </div>
                <div className="text-[#5F5F5F] text-[13px]">47 responses</div>
              </div>

              <div>
                <div className="text-[#333] text-[32px] font-bold mb-2">
                  90%
                </div>
                <div className="text-[#4A4A4A] text-sm leading-6 mb-1">
                  of students agree that it is easy to get the classes they
                  want.
                </div>
                <div className="text-[#5F5F5F] text-[13px]">60 responses</div>
              </div>

              <div>
                <div className="text-[#333] text-[32px] font-bold mb-2">
                  35%
                </div>
                <div className="text-[#4A4A4A] text-sm leading-6 mb-1">
                  of students agree that the workload is easy to manage.
                </div>
                <div className="text-[#5F5F5F] text-[13px]">60 responses</div>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#"
          className="flex items-center justify-end text-[#346DC2] text-sm font-medium mt-6 hover:underline"
        >
          Read More About Academics
          <svg
            className="ml-1 w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default AcademicsCard;
