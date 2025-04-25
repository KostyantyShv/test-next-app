import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import React from "react";
import ConfirmationModalContent from "./ConfirmationModalContent";

interface ConfirmationModalProps {
  isOpen: boolean;
  type: "add" | "remove" | null;
  addonName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal = ({
  isOpen,
  addonName,
  onCancel,
  onConfirm,
  type,
}: ConfirmationModalProps) => {
  return (
    <>
      <div className="max-md:block hidden">
        <MobileDrawer isOpen={isOpen} onClose={onCancel}>
          <ConfirmationModalContent
            addonName={addonName}
            onCancel={onCancel}
            onConfirm={onConfirm}
            type={type}
          />
        </MobileDrawer>
      </div>
      <div className="max-md:hidden block">
        <DesktopModal isOpen={isOpen} onClose={onCancel}>
          <ConfirmationModalContent
            addonName={addonName}
            onCancel={onCancel}
            onConfirm={onConfirm}
            type={type}
          />
        </DesktopModal>
      </div>
    </>
  );
};

export default ConfirmationModal;
