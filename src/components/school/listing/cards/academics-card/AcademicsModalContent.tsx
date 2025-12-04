import React, { useState } from "react";

const AcademicsModalContent: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const [showMoreColleges, setShowMoreColleges] = useState(false);
  const [showMoreMajors, setShowMoreMajors] = useState(false);

  return (
    <div className="relative w-full bg-white rounded-xl p-2 animate-[fadeIn_0.3s_ease]">
      <div className="sticky top-0 flex items-center justify-between h-fit bg-white px-5 py-5 md:p-5 z-50 border-b border-black/5">
        <div className="flex items-center">
          <h1 className="text-[#016853] text-[22px] md:text-[28px] font-semibold tracking-[-0.02em]">
            Academics
          </h1>
        </div>
        <button
          onClick={closeModal}
          className="w-8 h-8 bg-transparent border-none flex items-center justify-center text-[#5F5F5F] text-xl cursor-pointer"
          aria-label="Close popup"
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div
        className="h-[calc(100%-61px)] md:max-h-[calc(90vh-86px)] p-0 md:p-8
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        {/* Section 1: Academics */}
        <div className="p-5 md:p-0 border-b border-black/8 md:mb-10 md:pb-10 last:border-b-0 last:mb-0">
          <div className="md:flex md:gap-8">
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 bg-[#00DF8B] rounded-full flex items-center justify-center 
                    text-lg md:text-xl font-semibold text-white flex-shrink-0"
                >
                  A+
                </div>
                <h3 className="text-[#016853] text-lg md:text-xl font-semibold tracking-[-0.02em] m-0">
                  Academics
                </h3>
              </div>
              <p className="text-[#5F5F5F] text-sm leading-[1.5] mb-4">
                Based on SAT/ACT scores, colleges students are interested in,
                and survey responses on academics from students and parents.
              </p>
            </div>
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="flex items-center text-[#016853] text-[15px] font-medium mb-1.5">
                Average Graduation Rate
                <div className="relative inline-flex ml-1.5 group">
                  <svg
                    className="w-3.5 h-3.5 text-[#5F5F5F] cursor-help"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="8" />
                  </svg>
                  <div className="absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 whitespace-normal rounded-md bg-[#333] px-3 py-2 text-[13px] leading-[1.4] text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] w-64 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                    Additional information about this metric would be displayed here.
                    <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#333]" />
                  </div>
                </div>
              </div>
              <div className="text-[#464646] text-[36px] md:text-5xl font-bold mb-5">
                100%
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: State Test Scores */}
        <div className="p-5 md:p-0 border-b border-black/8 md:mb-10 md:pb-10 last:border-b-0 last:mb-0">
          <h3 className="text-[#016853] text-lg md:text-xl font-semibold tracking-[-0.02em] mb-4">
            State Test Scores
          </h3>
          <div className="md:flex md:gap-6 space-y-6 md:space-y-0">
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="flex items-center text-[#016853] text-[15px] font-medium mb-1.5">
                Percent Proficient - Reading
                <div className="relative inline-flex ml-1.5 group">
                  <svg
                    className="w-3.5 h-3.5 text-[#5F5F5F] cursor-help"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="8" />
                  </svg>
                  <div className="absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 whitespace-normal rounded-md bg-[#333] px-3 py-2 text-[13px] leading-[1.4] text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] w-64 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                    Additional information about this metric would be displayed here.
                    <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#333]" />
                  </div>
                </div>
              </div>
              <div className="text-[#464646] text-[36px] md:text-5xl font-bold mb-5">
                67%
              </div>
            </div>
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="flex items-center text-[#016853] text-[15px] font-medium mb-1.5">
                Percent Proficient - Math
                <div className="relative inline-flex ml-1.5 group">
                  <svg
                    className="w-3.5 h-3.5 text-[#5F5F5F] cursor-help"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="8" />
                  </svg>
                  <div className="absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 whitespace-normal rounded-md bg-[#333] px-3 py-2 text-[13px] leading-[1.4] text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] w-64 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                    Additional information about this metric would be displayed here.
                    <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#333]" />
                  </div>
                </div>
              </div>
              <div className="text-[#464646] text-[36px] md:text-5xl font-bold mb-5">
                67%
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: AP and College Prep Courses */}
        <div className="p-5 md:p-0 border-b border-black/8 md:mb-10 md:pb-10 last:border-b-0 last:mb-0">
          <h3 className="text-[#016853] text-lg md:text-xl font-semibold tracking-[-0.02em] mb-4">
            AP and College Prep Courses
          </h3>
          <div className="md:flex md:gap-6 space-y-6 md:space-y-0">
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="flex items-center text-[#016853] text-[15px] font-medium mb-1.5">
                AP Exam Pass Rate
                <div className="relative inline-flex ml-1.5 group">
                  <svg
                    className="w-3.5 h-3.5 text-[#5F5F5F] cursor-help"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="8" />
                  </svg>
                  <div className="absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 whitespace-normal rounded-md bg-[#333] px-3 py-2 text-[13px] leading-[1.4] text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] w-64 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                    Additional information about this metric would be displayed here.
                    <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#333]" />
                  </div>
                </div>
              </div>
              <div className="text-[#464646] text-[36px] md:text-5xl font-bold mb-5">
                100%
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-black/8">
                  <span className="text-[#4A4A4A] text-sm font-medium">
                    AP Enrollment
                  </span>
                  <span className="text-[#089E68] text-sm font-semibold">
                    90%
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/8">
                  <span className="text-[#4A4A4A] text-sm font-medium">
                    AP Math Enrollment
                  </span>
                  <span className="text-[#089E68] text-sm font-semibold">
                    —
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/8">
                  <span className="text-[#4A4A4A] text-sm font-medium">
                    AP Science Enrollment
                  </span>
                  <span className="text-[#089E68] text-sm font-semibold">
                    Very High
                  </span>
                </div>
              </div>
            </div>
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="text-[#016853] text-[15px] font-medium mb-1.5">
                Number of AP Courses Offered
              </div>
              <div className="text-[#464646] text-[36px] md:text-5xl font-bold mb-5">
                12
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-black/8">
                  <span className="text-[#4A4A4A] text-sm font-medium">
                    AP Other Enrollment
                  </span>
                  <span className="text-[#089E68] text-sm font-semibold">
                    Very High
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/8">
                  <span className="text-[#4A4A4A] text-sm font-medium">
                    Advanced Math Enrollment
                  </span>
                  <span className="text-[#089E68] text-sm font-semibold">
                    Very High
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/8">
                  <span className="text-[#4A4A4A] text-sm font-medium">
                    IB Program Offered
                  </span>
                  <span className="text-[#089E68] text-sm font-semibold">
                    —
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: SAT and ACT Test Scores */}
        <div className="p-5 md:p-0 border-b border-black/8 md:mb-10 md:pb-10 last:border-b-0 last:mb-0">
          <h3 className="text-[#016853] text-lg md:text-xl font-semibold tracking-[-0.02em] mb-4">
            SAT and ACT Test Scores
          </h3>
          <div className="md:flex md:gap-6 space-y-6 md:space-y-0">
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="flex items-center text-[#016853] text-[15px] font-medium mb-1.5">
                Average SAT
                <div className="relative inline-flex ml-1.5 group">
                  <svg
                    className="w-3.5 h-3.5 text-[#5F5F5F] cursor-help"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="8" />
                  </svg>
                  <div className="absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 whitespace-normal rounded-md bg-[#333] px-3 py-2 text-[13px] leading-[1.4] text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] w-64 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                    Additional information about this metric would be displayed here.
                    <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#333]" />
                  </div>
                </div>
              </div>
              <div className="text-[#464646] text-[36px] md:text-5xl font-bold mb-5">
                —
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-black/8">
                  <span className="text-[#4A4A4A] text-sm font-medium">
                    Math
                  </span>
                  <span className="text-[#089E68] text-sm font-semibold">
                    —
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/8">
                  <span className="text-[#4A4A4A] text-sm font-medium">
                    Verbal
                  </span>
                  <span className="text-[#089E68] text-sm font-semibold">
                    —
                  </span>
                </div>
              </div>
            </div>
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="flex items-center text-[#016853] text-[15px] font-medium mb-1.5">
                Average ACT
                <div className="relative inline-flex ml-1.5 group">
                  <svg
                    className="w-3.5 h-3.5 text-[#5F5F5F] cursor-help"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="8" />
                  </svg>
                  <div className="absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 whitespace-normal rounded-md bg-[#333] px-3 py-2 text-[13px] leading-[1.4] text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] w-64 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                    Additional information about this metric would be displayed here.
                    <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#333]" />
                  </div>
                </div>
              </div>
              <div className="text-[#464646] text-[36px] md:text-5xl font-bold mb-5">
                —
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-black/8">
                  <span className="text-[#4A4A4A] text-sm font-medium">
                    Math
                  </span>
                  <span className="text-[#089E68] text-sm font-semibold">
                    —
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/8">
                  <span className="text-[#4A4A4A] text-sm font-medium">
                    Reading
                  </span>
                  <span className="text-[#089E68] text-sm font-semibold">
                    —
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/8">
                  <span className="text-[#4A4A4A] text-sm font-medium">
                    English
                  </span>
                  <span className="text-[#089E68] text-sm font-semibold">
                    —
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/8">
                  <span className="text-[#4A4A4A] text-sm font-medium">
                    Science
                  </span>
                  <span className="text-[#089E68] text-sm font-semibold">
                    —
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-[#4A4A4A] text-base mb-4">Test Prep Options</h4>
            <div className="flex items-center gap-3 flex-wrap">
              <img
                src="https://i.ibb.co/jkhP2MsN/pre-expert.webp"
                alt="PrepExpert Logo"
                className="h-9 w-auto"
              />
              <div className="flex-1 min-w-[200px]">
                <ul className="pl-5 m-0 list-disc text-[#4A4A4A] text-[13px]">
                  <li className="mb-2">
                    200-Point SAT & 4-Point ACT Score Improvement Guarantees
                  </li>
                  <li>Save $200 When You Enroll Online</li>
                </ul>
              </div>
              <a
                href="#"
                className="bg-[#1D77BD] text-white py-2 px-4 rounded text-sm font-medium whitespace-nowrap"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Section 5: Colleges Students Are Considering */}
        <div className="p-5 md:p-0 border-b border-black/8 md:mb-10 md:pb-10 last:border-b-0 last:mb-0">
          <h3 className="text-[#016853] text-lg md:text-xl font-semibold tracking-[-0.02em] mb-4">
            Colleges Students Are Considering
          </h3>
          <h4 className="text-[#4A4A4A] text-base font-medium mb-2">
            Popular Colleges
          </h4>
          <p className="text-[#5F5F5F] text-sm mb-4 leading-[1.4]">
            Niche users from this school are most interested in the following
            colleges.
          </p>
          <div className="mb-3">
            <div className="flex items-center py-3 border-b border-black/6">
              <div
                className="w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center 
                  text-sm font-semibold text-white mr-3 flex-shrink-0"
              >
                A+
              </div>
              <div className="text-[#346DC2] text-[15px] font-medium flex-grow">
                University of Florida
              </div>
              <div className="text-[#5F5F5F] text-sm font-medium whitespace-nowrap">
                3 Students
              </div>
            </div>
            <div className="flex items-center py-3 border-b border-black/6">
              <div
                className="w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center 
                  text-sm font-semibold text-white mr-3 flex-shrink-0"
              >
                A+
              </div>
              <div className="text-[#346DC2] text-[15px] font-medium flex-grow">
                Florida State University
              </div>
              <div className="text-[#5F5F5F] text-sm font-medium whitespace-nowrap">
                2 Students
              </div>
            </div>
            <div className="flex items-center py-3 border-b border-black/6">
              <div
                className="w-8 h-8 bg-[#7089FD] rounded-full flex items-center justify-center 
                  text-sm font-semibold text-white mr-3 flex-shrink-0"
              >
                B+
              </div>
              <div className="text-[#346DC2] text-[15px] font-medium flex-grow">
                University of North Florida
              </div>
              <div className="text-[#5F5F5F] text-sm font-medium whitespace-nowrap">
                2 Students
              </div>
            </div>
            {showMoreColleges && (
              <>
                <div className="flex items-center py-3 border-b border-black/6">
                  <div
                    className="w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center 
                      text-sm font-semibold text-white mr-3 flex-shrink-0"
                  >
                    A
                  </div>
                  <div className="text-[#346DC2] text-[15px] font-medium flex-grow">
                    University of Central Florida
                  </div>
                  <div className="text-[#5F5F5F] text-sm font-medium whitespace-nowrap">
                    1 Student
                  </div>
                </div>
                <div className="flex items-center py-3 border-b border-black/6">
                  <div
                    className="w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center 
                      text-sm font-semibold text-white mr-3 flex-shrink-0"
                  >
                    A-
                  </div>
                  <div className="text-[#346DC2] text-[15px] font-medium flex-grow">
                    Florida Atlantic University
                  </div>
                  <div className="text-[#5F5F5F] text-sm font-medium whitespace-nowrap">
                    1 Student
                  </div>
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => setShowMoreColleges(!showMoreColleges)}
            className="text-[#346DC2] text-sm font-medium py-2 px-0 flex items-center hover:underline bg-transparent border-none cursor-pointer"
          >
            {showMoreColleges ? "Less" : "More"}
            <svg
              className="ml-1 w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline
                points={showMoreColleges ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}
              />
            </svg>
          </button>
        </div>

        {/* Section 6: What Students Want to Study */}
        <div className="p-5 md:p-0 border-b border-black/8 md:mb-10 md:pb-10 last:border-b-0 last:mb-0">
          <h3 className="text-[#016853] text-lg md:text-xl font-semibold tracking-[-0.02em] mb-4">
            What Students Want to Study
          </h3>
          <h4 className="text-[#4A4A4A] text-base font-medium mb-2">
            Popular Majors
          </h4>
          <p className="text-[#5F5F5F] text-sm mb-4 leading-[1.4]">
            Niche users from this school are most interested in the following
            majors.
          </p>
          <div className="mb-3">
            <div className="flex items-center py-3 border-b border-black/6">
              <div className="text-[#346DC2] text-[15px] font-medium flex-grow pl-2">
                Biology
              </div>
              <div className="text-[#5F5F5F] text-sm font-medium whitespace-nowrap">
                3 Students
              </div>
            </div>
            <div className="flex items-center py-3 border-b border-black/6">
              <div className="text-[#346DC2] text-[15px] font-medium flex-grow pl-2">
                Pre-Medicine Studies
              </div>
              <div className="text-[#5F5F5F] text-sm font-medium whitespace-nowrap">
                2 Students
              </div>
            </div>
            <div className="flex items-center py-3 border-b border-black/6">
              <div className="text-[#346DC2] text-[15px] font-medium flex-grow pl-2">
                Animation, Video Graphics and Special Effects
              </div>
              <div className="text-[#5F5F5F] text-sm font-medium whitespace-nowrap">
                1 Student
              </div>
            </div>
            {showMoreMajors && (
              <>
                <div className="flex items-center py-3 border-b border-black/6">
                  <div className="text-[#346DC2] text-[15px] font-medium flex-grow pl-2">
                    Computer Science
                  </div>
                  <div className="text-[#5F5F5F] text-sm font-medium whitespace-nowrap">
                    1 Student
                  </div>
                </div>
                <div className="flex items-center py-3 border-b border-black/6">
                  <div className="text-[#346DC2] text-[15px] font-medium flex-grow pl-2">
                    Business Administration
                  </div>
                  <div className="text-[#5F5F5F] text-sm font-medium whitespace-nowrap">
                    1 Student
                  </div>
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => setShowMoreMajors(!showMoreMajors)}
            className="text-[#346DC2] text-sm font-medium py-2 px-0 flex items-center hover:underline bg-transparent border-none cursor-pointer"
          >
            {showMoreMajors ? "Less" : "More"}
            <svg
              className="ml-1 w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline
                points={showMoreMajors ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}
              />
            </svg>
          </button>
        </div>

        {/* Section 7: What Students Say */}
        <div className="p-5 md:p-0 border-b border-black/8 md:mb-10 md:pb-10 last:border-b-0 last:mb-0">
          <h3 className="text-[#016853] text-lg md:text-xl font-semibold tracking-[-0.02em] mb-4">
            What Students Say
          </h3>
          <div className="md:flex md:gap-6 space-y-6 md:space-y-0">
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="mb-6">
                <div className="text-[#1D77BD] text-sm font-semibold uppercase flex items-center mb-2 tracking-[0.05em]">
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1D77BD"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                  POLL
                </div>
                <div className="text-[#5F5F5F] text-sm mb-4 leading-[1.4]">
                  How challenging are academics at this school?
                  <br />
                  Based on 16 responses
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <div className="text-[#4A4A4A] text-sm pr-2.5">
                        This school is nationally recognized.
                      </div>
                      <div className="text-[#089E68] text-sm font-semibold whitespace-nowrap">
                        81%
                      </div>
                    </div>
                    <div className="w-full h-6 bg-[#F2F2F2] rounded overflow-hidden">
                      <div
                        className="h-full bg-[#92CAF7] transition-all duration-[0.8s] ease-in-out"
                        style={{ width: "81%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <div className="text-[#4A4A4A] text-sm pr-2.5">
                        This school is the best in the area.
                      </div>
                      <div className="text-[#089E68] text-sm font-semibold whitespace-nowrap">
                        6%
                      </div>
                    </div>
                    <div className="w-full h-6 bg-[#F2F2F2] rounded overflow-hidden">
                      <div
                        className="h-full bg-[#A4E8B5] transition-all duration-[0.8s] ease-in-out"
                        style={{ width: "6%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <div className="text-[#4A4A4A] text-sm pr-2.5">
                        Probably like most other schools.
                      </div>
                      <div className="text-[#089E68] text-sm font-semibold whitespace-nowrap">
                        13%
                      </div>
                    </div>
                    <div className="w-full h-6 bg-[#F2F2F2] rounded overflow-hidden">
                      <div
                        className="h-full bg-[#7AD2CA] transition-all duration-[0.8s] ease-in-out"
                        style={{ width: "13%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="mb-6">
                <div className="h-px bg-black/8 mb-6 md:hidden"></div>
                <div className="text-[#1D77BD] text-sm font-semibold uppercase flex items-center mb-2 tracking-[0.05em]">
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1D77BD"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                  POLL
                </div>
                <div className="text-[#5F5F5F] text-sm mb-4 leading-[1.4]">
                  How seriously do students take their classes at this school?
                  <br />
                  Based on 16 responses
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <div className="text-[#4A4A4A] text-sm pr-2.5">
                        Very seriously. Students are there to learn with an eye
                        on the future.
                      </div>
                      <div className="text-[#089E68] text-sm font-semibold whitespace-nowrap">
                        88%
                      </div>
                    </div>
                    <div className="w-full h-6 bg-[#F2F2F2] rounded overflow-hidden">
                      <div
                        className="h-full bg-[#92CAF7] transition-all duration-[0.8s] ease-in-out"
                        style={{ width: "88%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <div className="text-[#4A4A4A] text-sm pr-2.5">
                        Somewhat seriously. Students are more focused on what`s
                        going on this weekend.
                      </div>
                      <div className="text-[#089E68] text-sm font-semibold whitespace-nowrap">
                        6%
                      </div>
                    </div>
                    <div className="w-full h-6 bg-[#F2F2F2] rounded overflow-hidden">
                      <div
                        className="h-full bg-[#A4E8B5] transition-all duration-[0.8s] ease-in-out"
                        style={{ width: "6%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <div className="text-[#4A4A4A] text-sm pr-2.5">
                        Not seriously at all. They`re more interested in
                        socializing and partying.
                      </div>
                      <div className="text-[#089E68] text-sm font-semibold whitespace-nowrap">
                        6%
                      </div>
                    </div>
                    <div className="w-full h-6 bg-[#F2F2F2] rounded overflow-hidden">
                      <div
                        className="h-full bg-[#7AD2CA] transition-all duration-[0.8s] ease-in-out"
                        style={{ width: "6%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicsModalContent;
