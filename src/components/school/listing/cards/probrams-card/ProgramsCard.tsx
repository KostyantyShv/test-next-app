import { useState, useRef, useEffect } from "react";
import CardWrapper from "../../card-wrapper/CardWrapper";
import ProgramCard from "./ProgramCard";
import { mastersProgramMock } from "./mock";
import ProgramsModal from "./ProgramsModal";
import { useExpand } from "./useExpand.hook";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";

const ProgramsCard: React.FC<{ id: string }> = ({ id }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { expandedDescriptions, handleDescriptionToggle } = useExpand();
  const totalCards = mastersProgramMock.length;
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const maxVisibleIndex = mobile ? totalCards - 1 : totalCards - 2;
      setCanScrollPrev(currentIndex > 0);
      setCanScrollNext(currentIndex < maxVisibleIndex);
      if (mobile && currentIndex > maxVisibleIndex) {
        setCurrentIndex(maxVisibleIndex);
      }
    };

    setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, totalCards]);

  // Update navigation state
  useEffect(() => {
    const maxVisibleIndex = isMobile ? totalCards - 1 : totalCards - 2;
    setCanScrollPrev(currentIndex > 0);
    setCanScrollNext(currentIndex < maxVisibleIndex);
  }, [currentIndex, totalCards, isMobile]);

  // Scroll function
  const scrollGrid = (direction: "prev" | "next") => {
    if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "next") {
      const maxVisibleIndex = isMobile ? totalCards - 1 : totalCards - 2;
      if (currentIndex < maxVisibleIndex) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const goToCard = (index: number) => {
    const maxVisibleIndex = isMobile ? totalCards - 1 : totalCards - 2;
    if (index >= 0 && index <= maxVisibleIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <CardWrapper id={id}>
      <h2 className="text-2xl font-semibold text-[#016853] mb-5">
        Masters Programs
      </h2>

      {/* Grid Container */}
      <div
        ref={gridRef}
        className="flex flex-col md:flex-row gap-4 overflow-hidden relative"
      >
        {mastersProgramMock.map((program, index) => {
          const isVisible = isMobile
            ? index === currentIndex
            : index >= currentIndex && index < currentIndex + 2;

          return (
            <div
              key={index}
              className={`w-full md:w-1/2 flex-shrink-0 transition-all duration-300 ease-in-out ${
                isVisible ? "block" : "hidden"
              } md:border md:border-[rgba(0,0,0,0.08)] md:rounded-xl md:p-4 md:bg-white md:shadow-sm`}
            >
              <ProgramCard
                index={index + 1}
                tab=""
                program={program}
                expandedDescriptions={expandedDescriptions}
                onDescriptionToggle={handleDescriptionToggle}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col items-center mt-6 gap-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center w-full">
          <button
            className="w-9 h-9 rounded-full border border-[rgba(0,0,0,0.1)] bg-white text-[#5F5F5F] flex items-center justify-center transition-all hover:bg-[#f5f5f5] hover:text-[#346DC2] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => scrollGrid("prev")}
            disabled={!canScrollPrev}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="flex-1 mx-4 h-1 bg-[#f0f0f0] rounded-sm relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#016853] rounded-sm transition-all"
              style={{
                width: `${
                  (Math.min(currentIndex + 2, totalCards) / totalCards) * 100
                }%`,
              }}
            />
          </div>
          <div className="text-sm text-[#5F5F5F] mx-2">
            {currentIndex + 1}-{Math.min(currentIndex + 2, totalCards)}/
            {totalCards}
          </div>
          <button
            className="w-9 h-9 rounded-full border border-[rgba(0,0,0,0.1)] bg-white text-[#5F5F5F] flex items-center justify-center transition-all hover:bg-[#f5f5f5] hover:text-[#346DC2] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => scrollGrid("next")}
            disabled={!canScrollNext}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden justify-between items-center w-full">
          <button
            className="w-9 h-9 rounded-full border border-[rgba(0,0,0,0.1)] bg-white text-[#5F5F5F] flex items-center justify-center transition-all hover:bg-[#f5f5f5] hover:text-[#346DC2] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => scrollGrid("prev")}
            disabled={!canScrollPrev}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="flex-1 mx-2 h-1 bg-[#f0f0f0] rounded-sm relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#0B6333] rounded-sm transition-all"
              style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
            />
          </div>
          <div className="text-sm text-[#5F5F5F] mx-2">
            {currentIndex + 1}/{totalCards}
          </div>
          <button
            className="w-9 h-9 rounded-full border border-[rgba(0,0,0,0.1)] bg-white text-[#5F5F5F] flex items-center justify-center transition-all hover:bg-[#f5f5f5] hover:text-[#346DC2] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => scrollGrid("next")}
            disabled={!canScrollNext}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex md:hidden justify-center gap-1.5 mt-2">
          {mastersProgramMock.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-[#0B6333]" : "bg-[#DFDDDB]"
              }`}
              onClick={() => goToCard(index)}
            />
          ))}
        </div>

        {/* Desktop Pagination Dots */}
        <div className="hidden md:flex justify-center gap-2 mt-2">
          {Array.from({ length: Math.ceil(totalCards / 2) }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === Math.floor(currentIndex / 2)
                  ? "bg-[#016853]"
                  : "bg-[#DFDDDB]"
              }`}
              onClick={() => goToCard(index * 2)}
            />
          ))}
        </div>
      </div>

      {/* See All Link */}
      <div className="flex justify-end mt-6">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
          className="text-[#346DC2] font-medium flex items-center gap-1 hover:underline"
        >
          See All Masters Programs
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3.33334L7.06 4.27334L10.78 8.00001L7.06 11.7267L8 12.6667L12.6667 8.00001L8 3.33334Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>

      {/* Modal/Drawer */}
      <div className="hidden md:block">
        <DesktopModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <ProgramsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </DesktopModal>
      </div>
      <div className="block md:hidden">
        <MobileDrawer
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <ProgramsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </MobileDrawer>
      </div>
    </CardWrapper>
  );
};

export default ProgramsCard;
