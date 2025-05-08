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
    <div className="w-[750px] bg-white rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1)] relative">
      <div className="absolute top-6 right-6 text-sm font-semibold text-[#4A4A4A] bg-[#F8F9FA] rounded-full px-3 py-1">
        {spotlights.length}/{maxSpotlights}
      </div>
      <div className="mt-6 pt-2">
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
        className="bg-[#02C5AF] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        Add Spotlight
      </button>
    </div>
  );
}
