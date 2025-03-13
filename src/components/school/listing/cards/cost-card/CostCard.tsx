// components/CostSection.tsx
import React, { useState } from "react";
import CardWrapper from "../../card-wrapper/CardWrapper";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import CostModalContent from "./cost-modal/CostModalContent";
import { netPriceBreakdownData, valueSectionData } from "./mock";

const CostSection: React.FC<{ id: string }> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <CardWrapper id={id}>
      <h2 className="text-[#016853] text-2xl font-semibold mb-8 tracking-[-0.02em]">
        Cost
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
        {/* Left Section */}
        <div className="md:border-r max-md:border-b max-md:pb-10 border-[rgba(0,0,0,0.1)] pr-12">
          <div className="mb-6">
            <div className="text-[#4A4A4A] text-sm mb-2">Net Price</div>
            <div className="text-[#1B1B1B] text-[40px] font-bold mb-1 tracking-[-0.02em]">
              {netPriceBreakdownData.mainStats[0].value.split(" /")[0]}
              <span className="text-base font-medium text-[#5F5F5F]">
                / year
              </span>
            </div>
          </div>

          <div className="text-[#5F5F5F] text-sm mb-6">
            National{" "}
            <span className="text-[#4A4A4A] font-medium">
              {netPriceBreakdownData.mainStats[0].national}
            </span>
          </div>

          <p className="text-[#4A4A4A] text-sm leading-6 mb-8">
            {valueSectionData.priceNote}
          </p>

          <div className="flex flex-col gap-3">
            {valueSectionData.links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-[#346DC2] text-[15px] font-medium hover:text-[#1D77BD] hover:underline transition-colors duration-200"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6">
          <div className="mb-6">
            <div className="text-[#089E68] text-2xl font-semibold mb-1">
              {netPriceBreakdownData.mainStats[1].value.split(" /")[0]}
              <span className="text-base font-medium text-[#5F5F5F]">
                / year
              </span>
            </div>
            <div className="text-[#4A4A4A] text-[15px] leading-5">
              Average Total Aid Awarded
            </div>
            <div className="text-[#5F5F5F] text-[13px] mt-1">
              Natl. {netPriceBreakdownData.mainStats[1].national}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-[#089E68] text-2xl font-semibold">
              {netPriceBreakdownData.mainStats[2].value}
            </div>
            <div className="text-[#4A4A4A] text-[15px] leading-5">
              Students Receiving Financial Aid
            </div>
          </div>

          <div className="hidden md:block">
            <DesktopModal isOpen={isOpen} onClose={closePopup}>
              <CostModalContent closePopup={closePopup} />
            </DesktopModal>
          </div>

          <div className="block md:hidden">
            <MobileDrawer isOpen={isOpen} onClose={closePopup}>
              <CostModalContent closePopup={closePopup} />
            </MobileDrawer>
          </div>

          <a
            href="#"
            className="flex items-center text-[#346DC2] text-sm font-medium mt-auto hover:text-[#1D77BD] hover:underline transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault();
              openPopup();
            }}
          >
            Explore Tuition & Cost Breakdown
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
    </CardWrapper>
  );
};

export default CostSection;
