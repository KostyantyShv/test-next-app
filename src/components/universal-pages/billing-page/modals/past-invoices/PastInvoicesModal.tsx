import React from "react";
import PastInvoicesModalContent from "./PastInvoicesModalContent";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";

const PastInvoicesModal = ({
  isOpen,
  onClose,
  onViewInvoice,
}: {
  isOpen: boolean;
  onClose: () => void;
  onViewInvoice: () => void;
}) => {
  return (
    <>
      <div className="max-md:block hidden">
        <MobileDrawer isOpen={isOpen} onClose={onClose}>
          <PastInvoicesModalContent
            onClose={onClose}
            onViewInvoice={onViewInvoice}
          />
        </MobileDrawer>
      </div>
      <div className="max-md:hidden block">
        <DesktopModal isOpen={isOpen} onClose={onClose}>
          <PastInvoicesModalContent
            onClose={onClose}
            onViewInvoice={onViewInvoice}
          />
        </DesktopModal>
      </div>
    </>
  );
};

export default PastInvoicesModal;
