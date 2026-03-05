import React from "react";
import styles from "./StudentsModalContent.module.css";

const StudentsModalContent: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  return (
    <div className="relative flex h-full min-h-0 w-full flex-col bg-white animate-[fadeIn_0.3s_ease]">
      <div className="sticky top-0 z-50 flex flex-shrink-0 items-center justify-between border-b border-black/5 bg-white px-5 py-5">
        <div className="flex items-center">
          <h1 className="text-[#016853] text-[28px] font-semibold">Students</h1>
        </div>
        <button
          onClick={closeModal}
          className="w-8 h-8 bg-[#F5F5F5] rounded-full flex items-center justify-center text-[#5F5F5F] hover:bg-[#EEEEEE] transition-colors"
          aria-label="Close popup"
        >
          ✕
        </button>
      </div>

      <div
        className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain touch-pan-y"
        style={{ WebkitOverflowScrolling: "touch" }}
        data-vaul-no-drag
      >
        <div className="px-5 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-5">
          <div className="mb-12">
            <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
              <div className="border-[rgba(0,0,0,0.1)] max-md:border-b max-md:pb-8 md:border-r md:pr-8">
                <div className="mb-6 text-[48px] font-bold text-[#1B1B1B]">335</div>
                <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.1)] py-3">
                  <span className="text-[15px] font-medium text-[#4A4A4A]">
                    Gifted Students
                  </span>
                  <span className="text-[15px] font-semibold text-[#089E68]">
                    10%
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="mb-4 text-[15px] font-medium text-[#4A4A4A]">
                    Gender
                  </h3>
                  <div className="relative mb-3 h-8 overflow-hidden rounded-md bg-[#EBFCF4]">
                    <div className="h-full w-[52%] bg-[#D7F7E9]" />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#4A4A4A]">
                      Female
                    </span>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#089E68]">
                      52%
                    </span>
                  </div>
                  <div className="relative h-8 overflow-hidden rounded-md bg-[#EBFCF4]">
                    <div className="h-full w-[48%] bg-[#D7F7E9]" />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#4A4A4A]">
                      Male
                    </span>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#089E68]">
                      48%
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:pl-8">
                <h3 className="mb-6 text-[15px] font-medium text-[#4A4A4A] max-md:pt-8">
                  Student Diversity
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "White", value: "33.4%" },
                    { label: "African American", value: "24.5%" },
                    { label: "International", value: "17.9%" },
                    { label: "Hispanic", value: "9%" },
                    { label: "Asian", value: "6%" },
                    { label: "Multiracial", value: "6%" },
                    { label: "Native American", value: "3%" },
                    { label: "Pacific Islander", value: "0.3%" },
                    { label: "Unknown", value: "0%" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="relative h-8 overflow-hidden rounded-md bg-[#F5F5F5]"
                    >
                      <div
                        className="h-full bg-[#D7F7E9]"
                        style={{ width: item.value }}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#4A4A4A]">
                        {item.label}
                      </span>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#089E68]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-[rgba(0,0,0,0.1)] pt-12">
            <h2 className="mb-8 text-2xl font-semibold text-[#016853]">
              What Students Say
            </h2>
            <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
              <div className="border-[rgba(0,0,0,0.1)] max-md:mb-8 max-md:border-b md:border-r md:pr-8">
                {[
                  {
                    percentage: 88,
                    desc: "of students say kids at this school are friendly.",
                    responses: 16,
                  },
                  {
                    percentage: 81,
                    desc: "of students say kids at this school are involved in school activities.",
                    responses: 16,
                  },
                  {
                    percentage: 88,
                    desc: "of students say kids are hardworking.",
                    responses: 16,
                  },
                ].map((poll, idx) => (
                  <div
                    key={idx}
                    className="mb-8 rounded-xl max-md:bg-[#FAFAFA] max-md:p-4"
                  >
                    <div className="mb-6 flex items-center gap-2">
                      <div className={styles.pollIcon}></div>
                      <div className="text-[13px] font-semibold uppercase tracking-wider text-[#1D77BD]">
                        POLL
                      </div>
                    </div>
                    <div className="mb-4 flex items-center gap-6">
                      <div
                        className="relative h-[60px] w-[60px] rounded-full"
                        style={{
                          background: `conic-gradient(#77d3fa ${poll.percentage}%, #e8f4fc 0)`,
                        }}
                      >
                        <div className="absolute left-1/2 top-1/2 h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                      </div>
                      <div className="text-[36px] font-bold leading-none text-[#1B1B1B]">
                        {poll.percentage}
                        <span className="text-lg font-semibold text-[#666]">%</span>
                      </div>
                    </div>
                    <div className="mb-2 text-sm leading-6 text-[#4A4A4A]">
                      {poll.desc}
                    </div>
                    <div className="text-[13px] text-[#5F5F5F]">
                      {poll.responses} responses
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl max-md:bg-[#FAFAFA] max-md:p-4 md:pl-8">
                <div className="mb-6 flex items-center gap-2">
                  <div className="relative h-4 w-4 before:absolute before:left-2 before:top-[2px] before:h-[10px] before:w-[3px] before:clip-[rect(0,8px,10px,-10px)] before:bg-[#c5e4b8] before:shadow-[4px_4px_0_#f78f6a,-8px_4px_0_#9eddf8,0_0_0_transparent,-4px_2px_0_#6bbef2] before:content-['']"></div>
                  <div className="text-[13px] font-semibold uppercase tracking-wider text-[#1D77BD]">
                    POLL
                  </div>
                </div>
                <div className="mb-6 text-base font-semibold text-[#1B1B1B]">
                  What one word or phrase best describes the typical student at this
                  school?
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Intelligent", value: "31%" },
                    { label: "smart, friendly, diverse", value: "25%" },
                    { label: "Diverse", value: "19%" },
                    { label: "Outgoing", value: "13%" },
                    { label: "Lazy", value: "6%" },
                    { label: "Unique", value: "6%" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="relative h-8 overflow-hidden rounded-md bg-[#EBFCF4]"
                    >
                      <div
                        className="h-full bg-[#D7F7E9]"
                        style={{ width: item.value }}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#4A4A4A]">
                        {item.label}
                      </span>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#089E68]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-[13px] text-[#5F5F5F]">
                  Based on 16 responses
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsModalContent;
