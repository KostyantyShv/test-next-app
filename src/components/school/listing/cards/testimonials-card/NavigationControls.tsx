interface NavigationControlsProps {
  currentSlide: number;
  updateDots: (index: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
}

export function NavigationControls({
  currentSlide,
  updateDots,
  handlePrev,
  handleNext,
}: NavigationControlsProps) {
  return (
    <div className="flex items-center justify-between mt-auto mb-4 md:mb-0">
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            onClick={() => updateDots(index)}
            className={`w-2 h-2 md:w-2 md:h-2 rounded-full border-2 border-[#0B6333] cursor-pointer transition-all duration-300 ${
              currentSlide === index ? "bg-[#0B6333] scale-125" : ""
            }`}
          />
        ))}
      </div>
      <div className="flex gap-2.5 md:gap-3">
        <div
          onClick={handlePrev}
          className="w-7 h-7 md:w-8 md:h-8 border border-[#0B6333] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#0B6333] group"
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="md:w-6 md:h-6"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#0B6333"
              className="group-hover:stroke-white transition-all duration-300"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          onClick={handleNext}
          className="w-7 h-7 md:w-8 md:h-8 border border-[#0B6333] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#0B6333] group"
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="md:w-6 md:h-6"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="#0B6333"
              className="group-hover:stroke-white transition-all duration-300"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
