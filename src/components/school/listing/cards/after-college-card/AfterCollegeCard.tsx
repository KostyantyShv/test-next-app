import { useState } from "react";
import Modal from "./AfterCollegeModal";

const AfterCollege: React.FC<{ id: string }> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        id={id}
        className="w-full bg-cardBackground rounded-cardBorderRadius p-cardPadding shadow-cardShadow"
      >
        <h2 className="text-[#016853] text-2xl font-semibold mb-8 tracking-[-0.02em]">
          After College
        </h2>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div className="pr-8 border-r border-[rgba(0,0,0,0.1)]">
            <div className="text-[#4A4A4A] text-[15px] font-medium mb-3">
              Median Earnings 6 Years After Graduation
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <div className="text-[#1B1B1B] text-5xl font-bold tracking-[-0.03em]">
                $56,000
              </div>
              <div className="text-[#5F5F5F] text-sm font-medium">per year</div>
            </div>
            <div className="text-[#5F5F5F] text-[13px] mt-2">
              National $33,028
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span className="text-[#4A4A4A] text-[15px] font-medium">
                Graduation Rate
              </span>
              <div className="flex flex-col items-end">
                <span className="text-[#089E68] text-xl font-semibold">
                  90%
                </span>
                <span className="text-[#5F5F5F] text-xs">Natl. 49%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#4A4A4A] text-[15px] font-medium">
                Employed 2 Years After Graduation
              </span>
              <div className="flex flex-col items-end">
                <span className="text-[#089E68] text-xl font-semibold">
                  92%
                </span>
                <span className="text-[#5F5F5F] text-xs">Natl. 83%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F8FCFF] rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 h-8">
              <div className="relative h-8 w-8 flex items-center before:content-[''] before:bg-[#c5e4b8] before:shadow-[4px_4px_0_#f78f6a,-8px_4px_0_#9eddf8] before:clip-[rect(0,16px,20px,-20px)] before:h-5 before:left-4 before:absolute before:top-1 before:w-[6px]"></div>
              <div className="text-[#1D77BD] text-[28px] font-semibold tracking-[0.05em] leading-8">
                POLL
              </div>
            </div>
            <div className="text-[#1B1B1B] text-[32px] font-bold leading-8">
              87%
            </div>
          </div>
          <div className="text-[#4A4A4A] text-sm leading-[1.5] mb-2">
            of students feel confident they will find a job in their field after
            graduation.
          </div>
          <div className="text-[#5F5F5F] text-[13px]">282 responses</div>
        </div>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
          className="flex items-center text-[#346DC2] text-sm font-medium gap-1 justify-end hover:underline"
        >
          Read More About Life After Graduation
          <svg
            className="w-4 h-4 transition-transform hover:translate-x-[2px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
      </div>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default AfterCollege;
