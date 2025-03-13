import { School } from "./types";

interface SchoolTooltipProps {
  school: School;
  onClose: () => void;
}

export default function SchoolTooltip({ school, onClose }: SchoolTooltipProps) {
  return (
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 w-[250px] md:w-[280px] flex gap-3 z-20 md:hidden">
      <img
        src={school.image}
        alt={school.name}
        className="w-20 h-20 rounded-md object-cover"
      />
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-[#464646] text-[15px] font-semibold m-0">
          {school.name}
        </h3>
        <p className="text-[#5f5f5f] text-[13px] m-0">{school.location}</p>
      </div>
      <button
        className="absolute top-1 right-1 text-[#5f5f5f] text-base"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}
