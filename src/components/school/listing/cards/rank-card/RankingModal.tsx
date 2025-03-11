import React from "react";
import RankingModalMobile from "./RankingModalMobile"; // Adjust path as needed
import RankingModalDesktop from "./RankingModalDesktop"; // Adjust path as needed

interface RankingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RankingModal: React.FC<RankingModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Version - Hidden on md and larger */}
      <div className="block md:hidden">
        <RankingModalMobile isOpen={isOpen} onClose={onClose} />
      </div>

      {/* Desktop Version - Hidden below md */}
      <div className="hidden md:block">
        <RankingModalDesktop isOpen={isOpen} onClose={onClose} />
      </div>
    </>
  );
};

export default RankingModal;
