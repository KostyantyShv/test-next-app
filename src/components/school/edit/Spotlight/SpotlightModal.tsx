import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import React from "react";
import { Spotlight, SpotlightFormData } from "./types";
import SpotlightModalContent from "./SpotlightModalContent";

interface SpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: SpotlightFormData) => void;
  onDelete: () => void;
  spotlight?: Spotlight;
}

const SpotlightModal: React.FC<SpotlightModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  onSave,
  spotlight,
}) => {
  return (
    <>
      <div className="max-md:block hidden">
        <MobileDrawer isOpen={isOpen} onClose={onClose}>
          <SpotlightModalContent
            onClose={onClose}
            onDelete={onDelete}
            onSave={onSave}
            spotlight={spotlight}
          />
        </MobileDrawer>
      </div>
      <div className="max-md:hidden block">
        <DesktopModal isOpen={isOpen} onClose={onClose}>
          <SpotlightModalContent
            onClose={onClose}
            onDelete={onDelete}
            onSave={onSave}
            spotlight={spotlight}
          />
        </DesktopModal>
      </div>
    </>
  );
};

export default SpotlightModal;
