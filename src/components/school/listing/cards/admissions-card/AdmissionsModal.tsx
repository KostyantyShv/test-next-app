import React from "react";
import AdmissionsModalDesktop from "./AdmissionsModalDesktop";
import AdmissionsModalMobile from "./AdmissionsModalMobile";

interface AdmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdmissionsModal: React.FC<AdmissionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Mobile Version - Hidden on md and larger */}
      <div className="block md:hidden">
        <AdmissionsModalMobile isOpen={isOpen} onClose={onClose} />
      </div>

      {/* Desktop Version - Hidden below md */}
      <div className="hidden md:block">
        <AdmissionsModalDesktop isOpen={isOpen} onClose={onClose} />
      </div>
    </>
  );
};

export default AdmissionsModal;
