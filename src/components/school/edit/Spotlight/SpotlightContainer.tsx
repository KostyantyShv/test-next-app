import SpotlightLeft from "./SpotlightLeft";
import SpotlightRight from "./SpotlightRight";
import { Spotlight } from "./types";

interface SpotlightContainerProps {
  spotlights: Spotlight[];
  onAddSpotlight: () => void;
  onEditSpotlight: (id: number) => void;
  onTogglePin: (id: number) => void;
  maxSpotlights: number;
}

export default function SpotlightContainer({
  spotlights,
  onAddSpotlight,
  onEditSpotlight,
  onTogglePin,
  maxSpotlights,
}: SpotlightContainerProps) {
  return (
    <div className="max-w-[1150px] mx-auto flex max-md:flex-col gap-6">
      <SpotlightLeft />
      <SpotlightRight
        spotlights={spotlights}
        onAddSpotlight={onAddSpotlight}
        onEditSpotlight={onEditSpotlight}
        onTogglePin={onTogglePin}
        maxSpotlights={maxSpotlights}
      />
    </div>
  );
}
