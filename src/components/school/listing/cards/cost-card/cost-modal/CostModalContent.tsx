import React from "react";
import { Header } from "./Header";
import { ValueSection } from "./ValueSection";
import { NetPriceBreakdown } from "./NetPriceBreakdown";
import { StickerPriceBreakdown } from "./StickerPriceBreackdown";

interface CostModalProps {
  closePopup: () => void;
}

export const CostModalContent: React.FC<CostModalProps> = ({ closePopup }) => {
  return (
    <>
      <Header closePopup={closePopup} />
      <div className="p-4 md:p-8">
        <ValueSection />
        <NetPriceBreakdown />
        <StickerPriceBreakdown />
      </div>
    </>
  );
};

export default CostModalContent;
