import SpotlightItem from "./SpotlightItem";
import { Spotlight } from "./types";

interface SpotlightRightProps {
  spotlights: Spotlight[];
  onAddSpotlight: () => void;
  onEditSpotlight: (id: number) => void;
  onTogglePin: (id: number) => void;
  maxSpotlights: number;
}

export default function SpotlightRight({
  spotlights,
  onAddSpotlight,
  onEditSpotlight,
  onTogglePin,
  maxSpotlights,
}: SpotlightRightProps) {
  return (
    <div className="w-full bg-white max-md:bg-transparent rounded-lg max-md:rounded-none p-6 max-md:p-0 shadow-[0_1px_3px_rgba(0,0,0,0.1)] max-md:shadow-none relative">
      <div className="absolute top-6 right-6 max-md:top-4 max-md:right-4 text-sm max-md:text-[13px] font-semibold text-[#4A4A4A] bg-[#F8F9FA] max-md:bg-[#F8F9FA] rounded-full px-3 max-md:px-3 py-1 max-md:py-[6px]">
        {spotlights.length}/{maxSpotlights}
      </div>
      <div className="mt-6 max-md:mt-0 pt-2 max-md:pt-0">
        <div className="max-md:px-4 max-md:pb-4">
          <div className="bg-white max-md:bg-white rounded-lg max-md:rounded-lg p-4 max-md:p-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] max-md:shadow-[0_1px_3px_rgba(0,0,0,0.1)] relative max-md:mb-4">
            <div className="max-md:pt-2.5">
              {spotlights.map((spotlight) => (
                <SpotlightItem
                  key={spotlight.id}
                  spotlight={spotlight}
                  onEdit={() => onEditSpotlight(spotlight.id)}
                  onTogglePin={() => onTogglePin(spotlight.id)}
                />
              ))}
            </div>
            <button
              onClick={onAddSpotlight}
              className="bg-[#02C5AF] max-md:bg-[#02C5AF] text-white px-6 max-md:px-0 py-3 max-md:py-3 rounded-lg max-md:rounded-lg text-sm max-md:text-sm font-semibold max-md:font-semibold hover:opacity-90 max-md:hover:opacity-90 transition-opacity max-md:w-full max-md:mt-3"
            >
              Add Spotlight
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
