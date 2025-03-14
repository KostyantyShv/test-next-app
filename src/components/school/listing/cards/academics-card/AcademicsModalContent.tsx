import React, { useState } from "react";

const AcademicsModalContent: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const [showMoreColleges, setShowMoreColleges] = useState(false);
  const [showMoreMajors, setShowMoreMajors] = useState(false);

  return (
    <div className="relative w-full bg-white rounded-xl p-2 animate-[fadeIn_0.3s_ease]">
      <div className="sticky top-0 flex items-center justify-between h-fit bg-white p-5 z-50">
        <div className="flex items-center">
          <h1 className="text-[#016853] text-[28px] font-semibold">
            Academics
          </h1>
        </div>
        <button
          onClick={closeModal}
          className="w-8 h-8 bg-[#F5F5F5] rounded-full flex items-center justify-center text-[#5F5F5F] hover:bg-[#EEEEEE] transition-colors"
          aria-label="Close popup"
        >
          ✕
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
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 bg-[#00DF8B] rounded-full flex items-center justify-center 
                    text-lg md:text-xl font-semibold text-white flex-shrink-0"
                >
                  A+
                </div>
                <h3 className="text-[#016853] text-xl font-semibold tracking-tight m-0">
                  Academics
                </h3>
              </div>
              <p className="text-[#5F5F5F] text-sm leading-6 mb-6">
                Based on SAT/ACT scores, colleges students are interested in,
                and survey responses on academics from students and parents.
              </p>
            </div>
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="flex items-center text-[#016853] text-base font-medium mb-2">
                Average Graduation Rate
                <svg
                  className="w-4 h-4 ml-1.5 text-[#5F5F5F] cursor-help"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="8" />
                </svg>
              </div>
              <div className="text-[#464646] text-4xl md:text-5xl font-bold mt-2">
                100%
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: State Test Scores */}
        <div className="p-5 md:p-0 border-b border-black/8 md:mb-10 md:pb-10 last:border-b-0 last:mb-0">
          <h3 className="text-[#016853] text-xl font-semibold tracking-tight mb-6">
            State Test Scores
          </h3>
          <div className="md:flex md:gap-6 space-y-6 md:space-y-0">
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="flex items-center text-[#016853] text-base font-medium mb-2">
                Percent Proficient - Reading
                <svg
                  className="w-4 h-4 ml-1.5 text-[#5F5F5F] cursor-help"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="8" />
                </svg>
              </div>
              <div className="text-[#464646] text-4xl md:text-5xl font-bold mt-2">
                67%
              </div>
            </div>
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="flex items-center text-[#016853] text-base font-medium mb-2">
                Percent Proficient - Math
                <svg
                  className="w-4 h-4 ml-1.5 text-[#5F5F5F] cursor-help"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="8" />
                </svg>
              </div>
              <div className="text-[#464646] text-4xl md:text-5xl font-bold mt-2">
                67%
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: AP and College Prep Courses */}
        <div className="p-5 md:p-0 border-b border-black/8 md:mb-10 md:pb-10 last:border-b-0 last:mb-0">
          <h3 className="text-[#016853] text-xl font-semibold tracking-tight mb-6">
            AP and College Prep Courses
          </h3>
          <div className="md:flex md:gap-6 space-y-6 md:space-y-0">
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="flex items-center text-[#016853] text-base font-medium mb-2">
                AP Exam Pass Rate
                <svg
                  className="w-4 h-4 ml-1.5 text-[#5F5F5F] cursor-help"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="8" />
                </svg>
              </div>
              <div className="text-[#464646] text-4xl md:text-5xl font-bold mt-2">
                100%
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-black/6">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    AP Enrollment
                  </span>
                  <span className="text-[#089E68] text-[15px] font-semibold">
                    90%
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/6">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    AP Math Enrollment
                  </span>
                  <span className="text-[#089E68] text-[15px] font-semibold">
                    —
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/6">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    AP Science Enrollment
                  </span>
                  <span className="text-[#089E68] text-[15px] font-semibold">
                    Very High
                  </span>
                </div>
              </div>
            </div>
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="text-[#016853] text-base font-medium mb-2">
                Number of AP Courses Offered
              </div>
              <div className="text-[#464646] text-4xl md:text-5xl font-bold mt-2">
                12
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-black/6">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    AP Other Enrollment
                  </span>
                  <span className="text-[#089E68] text-[15px] font-semibold">
                    Very High
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/6">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    Advanced Math Enrollment
                  </span>
                  <span className="text-[#089E68] text-[15px] font-semibold">
                    Very High
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/6">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    IB Program Offered
                  </span>
                  <span className="text-[#089E68] text-[15px] font-semibold">
                    —
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: SAT and ACT Test Scores */}
        <div className="p-5 md:p-0 border-b border-black/8 md:mb-10 md:pb-10 last:border-b-0 last:mb-0">
          <h3 className="text-[#016853] text-xl font-semibold tracking-tight mb-6">
            SAT and ACT Test Scores
          </h3>
          <div className="md:flex md:gap-6 space-y-6 md:space-y-0">
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="flex items-center text-[#016853] text-base font-medium mb-2">
                Average SAT
                <svg
                  className="w-4 h-4 ml-1.5 text-[#5F5F5F] cursor-help"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="8" />
                </svg>
              </div>
              <div className="text-[#464646] text-4xl md:text-5xl font-bold mt-2">
                —
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-black/6">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    Math
                  </span>
                  <span className="text-[#089E68] text-[15px] font-semibold">
                    —
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/6">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    Verbal
                  </span>
                  <span className="text-[#089E68] text-[15px] font-semibold">
                    —
                  </span>
                </div>
              </div>
            </div>
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="flex items-center text-[#016853] text-base font-medium mb-2">
                Average ACT
                <svg
                  className="w-4 h-4 ml-1.5 text-[#5F5F5F] cursor-help"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="8" />
                </svg>
              </div>
              <div className="text-[#464646] text-4xl md:text-5xl font-bold mt-2">
                —
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-black/6">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    Math
                  </span>
                  <span className="text-[#089E68] text-[15px] font-semibold">
                    —
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/6">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    Reading
                  </span>
                  <span className="text-[#089E68] text-[15px] font-semibold">
                    —
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/6">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    English
                  </span>
                  <span className="text-[#089E68] text-[15px] font-semibold">
                    —
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-black/6">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    Science
                  </span>
                  <span className="text-[#089E68] text-[15px] font-semibold">
                    —
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-[#4A4A4A] text-base mb-4">Test Prep Options</h4>
            <div className="flex items-center gap-5 flex-wrap">
              <img
                src="https://i.ibb.co/jkhP2MsN/pre-expert.webp"
                alt="PrepExpert Logo"
                className="h-9 md:h-10 w-auto"
              />
              <div className="flex-1 min-w-[200px]">
                <ul className="pl-5 m-0 list-disc text-[#4A4A4A] text-[13px] md:text-sm">
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
          <h3 className="text-[#016853] text-xl font-semibold tracking-tight mb-6">
            Colleges Students Are Considering
          </h3>
          <h4 className="text-[#4A4A4A] text-base md:text-lg font-medium mb-3">
            Popular Colleges
          </h4>
          <p className="text-[#5F5F5F] text-sm mb-5">
            Niche users from this school are most interested in the following
            colleges.
          </p>
          <div className="space-y-3">
            <div className="flex items-center py-3 border-b border-black/6">
              <div
                className="w-8 h-8 md:w-9 md:h-9 bg-[#00DF8B] rounded-full flex items-center justify-center 
                  text-sm md:text-base font-semibold text-white mr-3 md:mr-4 flex-shrink-0"
              >
                A+
              </div>
              <div className="text-[#346DC2] text-[15px] md:text-base font-medium flex-grow">
                University of Florida
              </div>
              <div className="text-[#5F5F5F] text-[14px] md:text-[15px] font-medium">
                3 Students
              </div>
            </div>
            <div className="flex items-center py-3 border-b border-black/6">
              <div
                className="w-8 h-8 md:w-9 md:h-9 bg-[#00DF8B] rounded-full flex items-center justify-center 
                  text-sm md:text-base font-semibold text-white mr-3 md:mr-4 flex-shrink-0"
              >
                A+
              </div>
              <div className="text-[#346DC2] text-[15px] md:text-base font-medium flex-grow">
                Florida State University
              </div>
              <div className="text-[#5F5F5F] text-[14px] md:text-[15px] font-medium">
                2 Students
              </div>
            </div>
            <div className="flex items-center py-3 border-b border-black/6">
              <div
                className="w-8 h-8 md:w-9 md:h-9 bg-[#7089FD] rounded-full flex items-center justify-center 
                  text-sm md:text-base font-semibold text-white mr-3 md:mr-4 flex-shrink-0"
              >
                B+
              </div>
              <div className="text-[#346DC2] text-[15px] md:text-base font-medium flex-grow">
                University of North Florida
              </div>
              <div className="text-[#5F5F5F] text-[14px] md:text-[15px] font-medium">
                2 Students
              </div>
            </div>
            {showMoreColleges && (
              <>
                <div className="flex items-center py-3 border-b border-black/6">
                  <div
                    className="w-8 h-8 md:w-9 md:h-9 bg-[#00DF8B] rounded-full flex items-center justify-center 
                      text-sm md:text-base font-semibold text-white mr-3 md:mr-4 flex-shrink-0"
                  >
                    A
                  </div>
                  <div className="text-[#346DC2] text-[15px] md:text-base font-medium flex-grow">
                    University of Central Florida
                  </div>
                  <div className="text-[#5F5F5F] text-[14px] md:text-[15px] font-medium">
                    1 Student
                  </div>
                </div>
                <div className="flex items-center py-3 border-b border-black/6">
                  <div
                    className="w-8 h-8 md:w-9 md:h-9 bg-[#00DF8B] rounded-full flex items-center justify-center 
                      text-sm md:text-base font-semibold text-white mr-3 md:mr-4 flex-shrink-0"
                  >
                    A-
                  </div>
                  <div className="text-[#346DC2] text-[15px] md:text-base font-medium flex-grow">
                    Florida Atlantic University
                  </div>
                  <div className="text-[#5F5F5F] text-[14px] md:text-[15px] font-medium">
                    1 Student
                  </div>
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => setShowMoreColleges(!showMoreColleges)}
            className="text-[#346DC2] text-sm font-medium py-2 px-0 flex items-center mt-3 hover:underline"
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
          <h3 className="text-[#016853] text-xl font-semibold tracking-tight mb-6">
            What Students Want to Study
          </h3>
          <h4 className="text-[#4A4A4A] text-base md:text-lg font-medium mb-3">
            Popular Majors
          </h4>
          <p className="text-[#5F5F5F] text-sm mb-5">
            Niche users from this school are most interested in the following
            majors.
          </p>
          <div className="space-y-3">
            <div className="flex items-center py-3 border-b border-black/6">
              <div className="text-[#346DC2] text-[15px] md:text-base font-medium flex-grow pl-2">
                Biology
              </div>
              <div className="text-[#5F5F5F] text-[14px] md:text-[15px] font-medium">
                3 Students
              </div>
            </div>
            <div className="flex items-center py-3 border-b border-black/6">
              <div className="text-[#346DC2] text-[15px] md:text-base font-medium flex-grow pl-2">
                Pre-Medicine Studies
              </div>
              <div className="text-[#5F5F5F] text-[14px] md:text-[15px] font-medium">
                2 Students
              </div>
            </div>
            <div className="flex items-center py-3 border-b border-black/6">
              <div className="text-[#346DC2] text-[15px] md:text-base font-medium flex-grow pl-2">
                Animation, Video Graphics and Special Effects
              </div>
              <div className="text-[#5F5F5F] text-[14px] md:text-[15px] font-medium">
                1 Student
              </div>
            </div>
            {showMoreMajors && (
              <>
                <div className="flex items-center py-3 border-b border-black/6">
                  <div className="text-[#346DC2] text-[15px] md:text-base font-medium flex-grow pl-2">
                    Computer Science
                  </div>
                  <div className="text-[#5F5F5F] text-[14px] md:text-[15px] font-medium">
                    1 Student
                  </div>
                </div>
                <div className="flex items-center py-3 border-b border-black/6">
                  <div className="text-[#346DC2] text-[15px] md:text-base font-medium flex-grow pl-2">
                    Business Administration
                  </div>
                  <div className="text-[#5F5F5F] text-[14px] md:text-[15px] font-medium">
                    1 Student
                  </div>
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => setShowMoreMajors(!showMoreMajors)}
            className="text-[#346DC2] text-sm font-medium py-2 px-0 flex items-center mt-3 hover:underline"
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
          <h3 className="text-[#016853] text-xl font-semibold tracking-tight mb-6">
            What Students Say
          </h3>
          <div className="md:flex md:gap-6 space-y-6 md:space-y-0">
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="mt-4 md:mt-7">
                <div className="text-[#1D77BD] text-sm md:text-base font-semibold uppercase flex items-center mb-3">
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                  POLL
                </div>
                <div className="text-[#5F5F5F] text-sm mb-5">
                  How challenging are academics at this school?
                  <br />
                  Based on 16 responses
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="text-[#4A4A4A] text-sm">
                        This school is nationally recognized.
                      </div>
                      <div className="text-[#089E68] text-sm font-semibold">
                        81%
                      </div>
                    </div>
                    <div className="w-full h-6 bg-[#F2F2F2] rounded overflow-hidden">
                      <div
                        className="h-full bg-[#92CAF7] transition-all duration-600 ease-in-out"
                        style={{ width: "81%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="text-[#4A4A4A] text-sm">
                        This school is the best in the area.
                      </div>
                      <div className="text-[#089E68] text-sm font-semibold">
                        6%
                      </div>
                    </div>
                    <div className="w-full h-6 bg-[#F2F2F2] rounded overflow-hidden">
                      <div
                        className="h-full bg-[#A4E8B5] transition-all duration-600 ease-in-out"
                        style={{ width: "6%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="text-[#4A4A4A] text-sm">
                        Probably like most other schools.
                      </div>
                      <div className="text-[#089E68] text-sm font-semibold">
                        13%
                      </div>
                    </div>
                    <div className="w-full h-6 bg-[#F2F2F2] rounded overflow-hidden">
                      <div
                        className="h-full bg-[#7AD2CA] transition-all duration-600 ease-in-out"
                        style={{ width: "13%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:flex-1 md:min-w-[280px]">
              <div className="mt-4 md:mt-7">
                <div className="text-[#1D77BD] text-sm md:text-base font-semibold uppercase flex items-center mb-3">
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                  POLL
                </div>
                <div className="text-[#5F5F5F] text-sm mb-5">
                  How seriously do students take their classes at this school?
                  <br />
                  Based on 16 responses
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="text-[#4A4A4A] text-sm">
                        Very seriously. Students are there to learn with an eye
                        on the future.
                      </div>
                      <div className="text-[#089E68] text-sm font-semibold">
                        88%
                      </div>
                    </div>
                    <div className="w-full h-6 bg-[#F2F2F2] rounded overflow-hidden">
                      <div
                        className="h-full bg-[#92CAF7] transition-all duration-600 ease-in-out"
                        style={{ width: "88%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="text-[#4A4A4A] text-sm">
                        Somewhat seriously. Students are more focused on what`s
                        going on this weekend.
                      </div>
                      <div className="text-[#089E68] text-sm font-semibold">
                        6%
                      </div>
                    </div>
                    <div className="w-full h-6 bg-[#F2F2F2] rounded overflow-hidden">
                      <div
                        className="h-full bg-[#A4E8B5] transition-all duration-600 ease-in-out"
                        style={{ width: "6%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="text-[#4A4A4A] text-sm">
                        Not seriously at all. They`re more interested in
                        socializing and partying.
                      </div>
                      <div className="text-[#089E68] text-sm font-semibold">
                        6%
                      </div>
                    </div>
                    <div className="w-full h-6 bg-[#F2F2F2] rounded overflow-hidden">
                      <div
                        className="h-full bg-[#7AD2CA] transition-all duration-600 ease-in-out"
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
