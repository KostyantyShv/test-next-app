// pages/index.tsx
import { useState } from "react";
import StudentModal from "./StudentsModal";

const StudentsCard: React.FC<{ id: string }> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div id={id} className="flex justify-center my-cardMargin">
      <div className="w-[875px] bg-cardBackground rounded-cardBorderRadius p-cardPadding shadow-cardShadow">
        <h2 className="text-[#016853] text-2xl font-semibold mb-8 tracking-tight">
          Students
        </h2>
        <div className="grid grid-cols-2 gap-8">
          <div className="border-r border-[rgba(0,0,0,0.1)] pr-8">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-xl font-semibold">
                  A-
                </div>
                <h3 className="text-[#4A4A4A] text-base font-semibold">
                  Diversity
                </h3>
              </div>
              <p className="text-[#5F5F5F] text-sm leading-6 mb-6">
                Based on racial and economic diversity and survey responses on
                school culture and diversity from students and parents.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-[rgba(0,0,0,0.1)]">
                <span className="text-[#4A4A4A] text-[15px] font-medium">
                  Students
                </span>
                <span className="text-[#089E68] text-[15px] font-semibold">
                  737
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[rgba(0,0,0,0.1)]">
                <span className="text-[#4A4A4A] text-[15px] font-medium">
                  Free or Reduced Lunch
                </span>
                <span className="text-[#089E68] text-[15px] font-semibold">
                  —
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#F8FCFF] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative h-4 w-4 before:content-[''] before:absolute before:top-[2px] before:left-2 before:w-[3px] before:h-[10px] before:bg-[#c5e4b8] before:shadow-[4px_4px_0_#f78f6a,-8px_4px_0_#9eddf8,0_0_0_transparent,-4px_2px_0_#6bbef2] before:clip-[rect(0,8px,10px,-10px)]"></div>
              <div className="text-[#1D77BD] text-base font-semibold uppercase tracking-wider">
                POLLS
              </div>
            </div>
            <div className="mb-6">
              <div className="text-[#333] text-[32px] font-bold mb-2">89%</div>
              <div className="text-[#4A4A4A] text-sm leading-6 mb-1">
                of students and parents agree that students at this school are
                competitive.
              </div>
              <div className="text-[#5F5F5F] text-[13px]">19 responses</div>
            </div>
            <div className="mb-6">
              <div className="text-[#333] text-[32px] font-bold mb-2">68%</div>
              <div className="text-[#4A4A4A] text-sm leading-6 mb-1">
                of students and parents agree that students at this school are
                creative and artsy.
              </div>
              <div className="text-[#5F5F5F] text-[13px]">19 responses</div>
            </div>
            <div className="mb-6">
              <div className="text-[#333] text-[32px] font-bold mb-2">37%</div>
              <div className="text-[#4A4A4A] text-sm leading-6 mb-1">
                of students and parents agree that students at this school are
                athletic.
              </div>
              <div className="text-[#5F5F5F] text-[13px]">19 responses</div>
            </div>
          </div>
        </div>
        <a
          onClick={openModal}
          className="flex items-center text-[#346DC2] text-sm font-medium mt-6 justify-end hover:underline cursor-pointer"
        >
          Read More About the Students
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
      {isModalOpen && <StudentModal closeModal={closeModal} />}
    </div>
  );
};

export default StudentsCard;
