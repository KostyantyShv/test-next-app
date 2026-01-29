import { School } from "./types";

interface SchoolTooltipProps {
  school: School;
  onClose: () => void;
}

export default function SchoolTooltip({ school, onClose }: SchoolTooltipProps) {
  return (
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-3 w-[280px] hidden md:hidden z-20">
      {/* This component is only used on mobile; mimic HTML exactly */}
      <div className="flex gap-3">
        <img
          src={school.image}
          alt={school.name}
          className="w-[100px] h-[100px] rounded-[6px] object-cover flex-shrink-0"
        />
        <div className="flex-grow flex flex-col justify-start pr-[5px] min-w-0">
          <div className="flex items-start gap-[5px] w-full">
            <h3 className="text-[#464646] text-[16px] font-semibold m-0 leading-[1.3] flex-1 overflow-hidden">
              {school.name}
            </h3>
            <button
              className="flex-shrink-0 w-5 h-5 flex items-center justify-center cursor-pointer text-[#5F5F5F] hover:text-[#1B1B1B] transition-colors bg-transparent border-0 p-0 ml-auto"
              onClick={onClose}
              aria-label="Close tooltip"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-[14px] h-[14px]" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
          <p className="text-[#5F5F5F] text-[14px] m-0 mt-3">{school.location}</p>
        </div>
      </div>
      <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-white" />
    </div>
  );
}
