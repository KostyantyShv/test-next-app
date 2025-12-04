import React from "react";
import { useState, useEffect } from "react";
import {
  DesktopBadgeSVG,
  DesktopSeeAllSVG,
  MobileTrophySVG,
  MobileViewAllSVG,
} from "./icons";
import RankingItem from "./RankingItem";
import RankingModal from "./RankingModal";

const RankCard: React.FC<{ id: string }> = ({ id }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const circles = document.querySelectorAll(".ranking-circle");
    circles.forEach((circle, index) => {
      setTimeout(() => {
        circle.classList.add("scale-100", "opacity-100");
      }, index * 100);
    });
  }, []);

  return (
    <>
      <div id={id} className="flex justify-center my-cardMargin md:p-0">
        <div className="w-full bg-cardBackground rounded-cardBorderRadius shadow-cardShadow overflow-hidden md:max-w-[875px] md:shadow-cardShadow md:px-[87px] md:py-cardPadding">
          <div className="bg-[#016853] max-md:h-4 h-1.5 md:bg-gradient-to-r md:from-[#016853] md:to-[#089E68] md:flex md:items-center md:justify-center md:text-white md:text-sm md:font-semibold mb-6 md:mb-7" />
          <div className="px-5 pb-9 md:px-9">
            <div className="flex flex-col md:flex-row items-start gap-4 mb-6 md:gap-6 md:mb-8">
              <div className="flex items-center gap-4 md:flex-shrink-0 max-md:mb-4">
                <DesktopBadgeSVG />
                <div className="bg-[#00A36C] rounded-full w-[60px] h-[60px] flex items-center justify-center md:hidden">
                  <MobileTrophySVG />
                </div>
                <h1 className="text-[#016853] text-xl font-semibold mb-2 md:hidden">
                  Yale University Rankings
                </h1>
              </div>
              <div className="flex-grow">
                <h1 className="hidden md:block text-[#016853] text-[28px] font-bold mb-3 tracking-tight">
                  Yale University Rankings
                </h1>
                <p className="text-[#5F5F5F] text-sm leading-relaxed m-0 pb-4 md:text-base">
                  Niche rankings are based on rigorous analysis of key
                  statistics from the U.S. Department of Education and millions
                  of reviews.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-6 md:grid md:grid-cols-3 md:gap-7 md:mb-9">
              <RankingItem
                rank="#1"
                title="Colleges with the Best Professors in America"
                position="#1"
                total="1,503"
                trend={{ value: "5", direction: "up" }}
              />
              <RankingItem
                rank="#1"
                title="Best Colleges for History in America"
                position="#1"
                total="926"
                trend={{ value: "5", direction: "down" }}
              />
              <RankingItem
                rank="#1"
                title="Best Colleges that teach Math in America"
                position="#1"
                total="818"
                trend={{ value: "5", direction: "up" }}
              />
            </div>

            <div className="border-t border-[#E5E5E5] pt-5 flex justify-end items-center md:border-[rgba(0,0,0,0.08)] md:pt-6">
              <a
                href="#"
                className="text-[#346DC2] text-base font-semibold flex items-center gap-2 md:px-4 md:py-2 md:rounded-lg md:bg-[rgba(52,109,194,0.05)] md:hover:text-[#1D77BD] md:hover:bg-[rgba(52,109,194,0.1)] md:transition-all md:duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPopupOpen(true);
                }}
              >
                See All Yale University Rankings
                <DesktopSeeAllSVG />
                <MobileViewAllSVG />
              </a>
            </div>
          </div>
        </div>
      </div>
      <RankingModal
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
};

export default RankCard;
