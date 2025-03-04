// components/CostSection.tsx
import React, { useEffect, useState, useRef } from "react";
import CostModal from "./CostModal";

const CostSection: React.FC<{ id: string }> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (popupRef.current && headerRef.current) {
        if (popupRef.current.scrollTop > 0) {
          headerRef.current.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)";
        } else {
          headerRef.current.style.boxShadow = "none";
        }
      }
    };

    const popup = popupRef.current;
    if (popup) {
      popup.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (popup) {
        popup.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  const openPopup = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div id={id} className="flex justify-center my-cardMargin font-['Inter']">
      <div className="w-[875px] bg-cardBackground rounded-cardBorderRadius p-cardPadding shadow-cardShadow">
        <h2 className="text-[#016853] text-2xl font-semibold mb-8 tracking-[-0.02em]">
          Cost
        </h2>

        <div className="grid grid-cols-2 gap-12 mb-8">
          {/* Left Section */}
          <div className="border-r border-[rgba(0,0,0,0.1)] pr-12">
            <div className="mb-6">
              <div className="text-[#4A4A4A] text-sm mb-2">Net Price</div>
              <div className="text-[#1B1B1B] text-[40px] font-bold mb-1 tracking-[-0.02em]">
                $18,647
                <span className="text-base font-medium text-[#5F5F5F]">
                  / year
                </span>
              </div>
            </div>

            <div className="text-[#5F5F5F] text-sm mb-6">
              National{" "}
              <span className="text-[#4A4A4A] font-medium">$15,523</span>
            </div>

            <p className="text-[#4A4A4A] text-sm leading-6 mb-8">
              Average cost after financial aid for students receiving grant or
              scholarship aid, as reported by the college.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="text-[#346DC2] text-[15px] font-medium hover:text-[#1D77BD] hover:underline transition-colors duration-200"
              >
                Find Private Student Loans
              </a>
              <a
                href="#"
                className="text-[#346DC2] text-[15px] font-medium hover:text-[#1D77BD] hover:underline transition-colors duration-200"
              >
                Find College Scholarships
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-6">
            <div className="mb-6">
              <div className="text-[#089E68] text-2xl font-semibold mb-1">
                $63,523
                <span className="text-base font-medium text-[#5F5F5F]">
                  / year
                </span>
              </div>
              <div className="text-[#4A4A4A] text-[15px] leading-5">
                Average Total Aid Awarded
              </div>
              <div className="text-[#5F5F5F] text-[13px] mt-1">
                Natl. $7,535
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-[#089E68] text-2xl font-semibold">59%</div>
              <div className="text-[#4A4A4A] text-[15px] leading-5">
                Students Receiving Financial Aid
              </div>
            </div>
            <CostModal
              isOpen={isOpen}
              closePopup={closePopup}
              handleOverlayClick={handleOverlayClick}
              popupRef={popupRef}
              headerRef={headerRef}
            />
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
      </div>
    </div>
  );
};

export default CostSection;
