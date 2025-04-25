import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import React from "react";
import EditPaymentModalContent from "./EditPaymentModalContent";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";

const EditPaymentModal = ({
  isOpen,
  onClose,
  onAddPayment,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddPayment: () => void;
}) => {
  return (
    <>
      <div className="max-md:block hidden">
        <MobileDrawer isOpen={isOpen} onClose={onClose}>
          <EditPaymentModalContent
            onClose={onClose}
            onAddPayment={onAddPayment}
          />
        </MobileDrawer>
      </div>
      <div className="max-md:hidden block">
        <DesktopModal isOpen={isOpen} onClose={onClose}>
          <EditPaymentModalContent
            onAddPayment={onAddPayment}
            onClose={onClose}
          />
        </DesktopModal>
      </div>
    </>
  );
};

export default EditPaymentModal;
