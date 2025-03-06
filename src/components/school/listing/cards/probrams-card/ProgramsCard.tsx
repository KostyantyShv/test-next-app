import { useState, useRef, useEffect } from "react";
import CardWrapper from "../../card-wrapper/CardWrapper";
import ProgramCard from "./ProgramCard";
import { mastersProgramMock } from "./mock";
import ProgramsModal from "./ProgramsModal";
import { useExpand } from "./useExpand.hook";

const ProgramsCard: React.FC<{ id: string }> = ({ id }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { expandedDescriptions, handleDescriptionToggle } = useExpand();

  const checkScroll = () => {
    if (gridRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollGrid = (direction: "prev" | "next") => {
    if (gridRef.current) {
      const scrollWidth = Math.ceil(gridRef.current.scrollWidth / 2);
      gridRef.current.scrollBy({
        left: direction === "prev" ? -scrollWidth : scrollWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => grid.removeEventListener("scroll", checkScroll);
    }
  }, []);

  return (
    <CardWrapper id={id}>
      <h2 className="text-2xl font-semibold text-[#016853] mb-6">
        Masters Programs
      </h2>

      <div
        ref={gridRef}
        className="flex gap-4 overflow-x-auto scroll-smooth p-1 relative 
            [mask-image:linear-gradient(to_right,black_calc(100%-48px),transparent_100%)]
            [-webkit-mask-image:linear-gradient(to_right,black_calc(100%-48px),transparent_100%)]
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {/* Program Card 1 */}
        <ProgramCard
          key={1}
          index={1}
          tab=""
          program={mastersProgramMock[0]}
          expandedDescriptions={expandedDescriptions}
          onDescriptionToggle={handleDescriptionToggle}
        />

        {/* Program Card 2 */}
        <ProgramCard
          key={2}
          index={2}
          tab=""
          program={mastersProgramMock[2]}
          expandedDescriptions={expandedDescriptions}
          onDescriptionToggle={handleDescriptionToggle}
        />
      </div>

      <div className="flex justify-center items-center mt-8 gap-2">
        <div className="w-full h-1 bg-[#f0f0f0] rounded-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1/4 bg-[#016853] rounded-sm" />
        </div>
        <div className="text-sm text-[#5F5F5F] mx-4">1/4</div>
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
      <ProgramsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </CardWrapper>
  );
};

export default ProgramsCard;
