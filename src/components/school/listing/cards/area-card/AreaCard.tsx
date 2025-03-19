"use client";

import { useState } from "react";
import AreaModal from "./AreaModal";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";

const AreaCard: React.FC<{ id: string }> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        id={id}
        className="w-full bg-cardBackground rounded-cardBorderRadius shadow-cardShadow overflow-hidden my-cardMargin"
      >
        <div className="bg-[#F2F7EF] p-8 border-b border-[rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2 mb-1.5">
            <svg
              className="w-6 h-6"
              viewBox="0 0 50 50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#0B6333"
                d="M11.9,23.9c6.6,0,11.9-5.3,11.9-11.9S18.5,0,11.9,0S0,5.3,0,11.9S5.3,23.9,11.9,23.9"
              />
              <path
                fill="#016853"
                d="M11.9,50c6.6,0,11.9-5.3,11.9-11.9s-5.3-11.9-11.9-11.9S0,31.5,0,38.1S5.3,50,11.9,50"
              />
              <path
                fill="#089E68"
                d="M38.1,23.9c6.6,0,11.9-5.3,11.9-11.9S44.7,0,38.1,0S26.1,5.3,26.1,11.9S31.5,23.9,38.1,23.9"
              />
              <path
                fill="#00DF8B"
                d="M38.1,50C44.7,50,50,44.7,50,38.1s-5.3-11.9-11.9-11.9s-11.9,5.3-11.9,11.9S31.5,50,38.1,50"
              />
            </svg>
            <span className="text-sm font-medium text-[#0B6333] uppercase tracking-[0.5px]">
              LIVING IN THE AREA
            </span>
          </div>
          <h1 className="text-4xl font-semibold text-[#0B6333] m-0">
            Panama City
          </h1>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-7">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-semibold text-white bg-[#4CAF50]">
                B
              </div>
              <div className="text-lg font-medium text-[#464646]">
                Overall SkoolScout Grade
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-base font-semibold text-white bg-[#4CAF50]">
                  B
                </div>
                <div className="text-[15px] text-[#464646] font-medium">
                  Cost of Living
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-base font-semibold text-white bg-[#8BC34A]">
                  B-
                </div>
                <div className="text-[15px] text-[#464646] font-medium">
                  Good for Families
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-base font-semibold text-white bg-[#8BC34A]">
                  B-
                </div>
                <div className="text-[15px] text-[#464646] font-medium">
                  Housing
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-0">
              {[
                {
                  label: "Median Household Income",
                  value: "$61,125",
                  subvalue: "Natl. $78,538",
                },
                {
                  label: "Median Rent",
                  value: "$1,334",
                  subvalue: "Natl. $1,348",
                },
                {
                  label: "Median Home Value",
                  value: "$243,200",
                  subvalue: "Natl. $303,400",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="flex justify-between py-4 border-b border-[rgba(0,0,0,0.08)] items-baseline"
                >
                  <div className="text-[15px] font-normal">{stat.label}</div>
                  <div className="flex flex-col items-end">
                    <div className="text-xl text-[#464646] font-semibold text-right">
                      {stat.value}
                    </div>
                    <div className="text-[13px] text-[#5F5F5F] font-normal text-right mt-0.5">
                      {stat.subvalue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end p-4 border-t border-[rgba(0,0,0,0.08)]">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center text-[#346DC2] text-[15px] font-medium gap-2 hover:underline transition duration-200 ease-in-out"
          >
            Read More About Panama City
            <svg className="w-4 h-4 fill-[#346DC2]" viewBox="0 0 24 24">
              <path
                d="M10.5 5.5L16 11H4v2h12l-5.5 5.5L12 20l8-8-8-8z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="hidden md:block">
        <DesktopModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <AreaModal onClose={() => setIsModalOpen(false)} />
        </DesktopModal>
      </div>
      <div className="block md:hidden">
        <MobileDrawer
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <AreaModal onClose={() => setIsModalOpen(false)} />
        </MobileDrawer>
      </div>
    </>
  );
};

export default AreaCard;
