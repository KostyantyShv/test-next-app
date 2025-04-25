import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import React from "react";
import InvoiceDetailModalContent from "./InvoiceDetailModalContent";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";

const InvoiceDetailModal = ({
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
          <InvoiceDetailModalContent onClose={onClose} />
        </MobileDrawer>
      </div>
      <div className="max-md:hidden block">
        <DesktopModal isOpen={isOpen} onClose={onClose}>
          <InvoiceDetailModalContent onClose={onClose} />
        </DesktopModal>
      </div>
    </>
  );
};

export default InvoiceDetailModal;
