import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import React from "react";
import AddPaymentModalContent from "./AddPaymentModalContent";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";

const AddPaymentModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      <div className="max-md:block hidden">
        <MobileDrawer isOpen={isOpen} onClose={onClose}>
          <AddPaymentModalContent onClose={onClose} />
        </MobileDrawer>
      </div>
      <div className="max-md:hidden block">
        <DesktopModal isOpen={isOpen} onClose={onClose}>
          <AddPaymentModalContent onClose={onClose} />
        </DesktopModal>
      </div>
    </>
  );
};

export default AddPaymentModal;
