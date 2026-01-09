import { useEffect } from "react";
import AcceptanceRateSection from "./AcceptanceRateSection";
import AdmissionsStatsSection from "./AdmissionsStatsSection";
import DeadlinesSection from "./DeadlinesSection";
import RequirementsSection from "./RequirementsSection";
import WillYouGetInSection from "./WillYouGetInSection";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdmissionsModalMobile({ isOpen, onClose }: PopupProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[2500] transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleOverlayClick}
      />
      <div
        className={`fixed bottom-0 left-0 w-full max-h-[80%] bg-white rounded-t-[20px] shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-[3000] transition-all duration-300 overflow-y-auto scrollbar-hide ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        {/* Drag Handle - Mobile Only */}
        <div className="w-10 h-[5px] bg-[#E5E5E5] rounded-[3px] my-[10px] mx-auto md:hidden" />

        {/* Header */}
        <div className="sticky top-0 z-50 bg-white p-4 px-5 border-b border-black/10 relative flex justify-center items-center md:p-8 md:pb-0">
          <h2 className="text-[#016853] text-lg font-semibold text-center md:text-2xl">
            Admissions Information
          </h2>
          <button
            className="absolute top-4 right-4 bg-transparent border-none cursor-pointer text-[#5F5F5F] p-2 rounded-full hover:bg-black/5 transition-colors md:top-6 md:right-6 md:p-1"
            onClick={onClose}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-0 md:p-8">
          <AcceptanceRateSection />
          <WillYouGetInSection />
          <AdmissionsStatsSection />
          <DeadlinesSection />
          <RequirementsSection />
        </div>
      </div>
    </>
  );
}
