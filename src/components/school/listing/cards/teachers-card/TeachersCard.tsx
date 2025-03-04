// components/TeachersCard.tsx
import React from "react";

const TeachersCard: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div id={id} className="flex justify-center my-cardMargin font-['Inter']">
      <div className="w-[875px] bg-cardBackground rounded-cardBorderRadius p-cardPadding shadow-cardShadow">
        <h2 className="text-[#016853] text-2xl font-semibold mb-8 tracking-[-0.02em]">
          Teachers
        </h2>

        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="border-r border-[rgba(0,0,0,0.1)] pr-8">
            <div className="grid gap-4">
              {/* Stat Row 1 */}
              <div className="flex justify-between items-center py-3 border-b border-[rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-2">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    Student-Teacher Ratio
                  </span>
                  <div className="relative">
                    <svg
                      className="w-4 h-4 text-[#5F5F5F] cursor-help hover:text-[#346DC2] transition-colors duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 18.4C11.1 18.4 10.5 17.7 10.5 16.9C10.5 16.3 11 15.5 12 15.5C13 15.5 13.4 16.1 13.4 16.9C13.4 17.5 12.9 18.4 12 18.4ZM12.9 13.1C12.9 13.8 12.4 14.2 11.8 14.2C11.2 14.2 10.8 13.8 10.8 13.2C10.8 10.7 14 9.9 14.2 8.8C14.3 8.1 13.8 7.4 12.4 7.4C10.5 7.4 10.5 8.9 9.6 9.1C9.2 9.2 8.9 9.1 8.6 8.8C8.4 8.7 8.3 8.4 8.4 8C8.6 7.2 9.9 5.6 12.2 5.6C15.5 5.6 16.3 7.5 16.3 8.5C16.3 11.1 12.9 11.6 12.9 13.1Z" />
                    </svg>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#333] text-white px-3 py-2 rounded-md text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:-translate-y-1 transition-all duration-200 z-10">
                      Shows the ratio of students to teachers at this school
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#333]" />
                    </span>
                  </div>
                </div>
                <span className="text-[#089E68] text-[15px] font-semibold">
                  —
                </span>
              </div>

              {/* Stat Row 2 */}
              <div className="flex justify-between items-center py-3 border-b border-[rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-2">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    National
                  </span>
                </div>
                <span className="text-[#089E68] text-[15px] font-semibold">
                  17:1
                </span>
              </div>

              {/* Stat Row 3 */}
              <div className="flex justify-between items-center py-3 border-b border-[rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-2">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    Average Teacher Salary
                  </span>
                  <div className="relative group">
                    <svg
                      className="w-4 h-4 text-[#5F5F5F] cursor-help hover:text-[#346DC2] transition-colors duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 18.4C11.1 18.4 10.5 17.7 10.5 16.9C10.5 16.3 11 15.5 12 15.5C13 15.5 13.4 16.1 13.4 16.9C13.4 17.5 12.9 18.4 12 18.4ZM12.9 13.1C12.9 13.8 12.4 14.2 11.8 14.2C11.2 14.2 10.8 13.8 10.8 13.2C10.8 10.7 14 9.9 14.2 8.8C14.3 8.1 13.8 7.4 12.4 7.4C10.5 7.4 10.5 8.9 9.6 9.1C9.2 9.2 8.9 9.1 8.6 8.8C8.4 8.7 8.3 8.4 8.4 8C8.6 7.2 9.9 5.6 12.2 5.6C15.5 5.6 16.3 7.5 16.3 8.5C16.3 11.1 12.9 11.6 12.9 13.1Z" />
                    </svg>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#333] text-white px-3 py-2 rounded-md text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:-translate-y-1 transition-all duration-200 z-10">
                      Average annual salary for teachers at this school
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#333]" />
                    </span>
                  </div>
                </div>
                <span className="text-[#089E68] text-[15px] font-semibold">
                  —
                </span>
              </div>

              {/* Stat Row 4 */}
              <div className="flex justify-between items-center py-3 border-b border-[rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-2">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    Teachers in First/Second Year
                  </span>
                </div>
                <span className="text-[#089E68] text-[15px] font-semibold">
                  52.3%
                </span>
              </div>
            </div>
          </div>

          {/* Polls Section */}
          <div className="bg-[#F8FCFF] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative h-4 w-4 before:content-[''] before:absolute before:top-[2px] before:left-2 before:w-[3px] before:h-[10px] before:bg-[#c5e4b8] before:shadow-[4px_4px_0_#f78f6a,-8px_4px_0_#9eddf8,-4px_2px_0_#6bbef2]"></div>
              <div className="text-[#1D77BD] text-base font-semibold uppercase tracking-[0.05em]">
                POLLS
              </div>
            </div>

            {/* Poll Item 1 */}
            <div className="mb-6">
              <div className="text-[#333] text-[32px] font-bold mb-2">90%</div>
              <div className="text-[#4A4A4A] text-sm leading-[1.5] mb-1">
                of students and parents agree that the teachers give engaging
                lessons.
              </div>
              <div className="text-[#5F5F5F] text-[13px]">20 responses</div>
            </div>

            {/* Poll Item 2 */}
            <div className="mb-6">
              <div className="text-[#333] text-[32px] font-bold mb-2">95%</div>
              <div className="text-[#4A4A4A] text-sm leading-[1.5] mb-1">
                of students and parents agree that the teachers genuinely care
                about the students.
              </div>
              <div className="text-[#5F5F5F] text-[13px]">20 responses</div>
            </div>

            {/* Poll Item 3 */}
            <div className="mb-6">
              <div className="text-[#333] text-[32px] font-bold mb-2">85%</div>
              <div className="text-[#4A4A4A] text-sm leading-[1.5] mb-1">
                of students and parents agree that the teachers adequately lead
                and control the classroom.
              </div>
              <div className="text-[#5F5F5F] text-[13px]">20 responses</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersCard;
