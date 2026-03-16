"use client";

import React, { RefObject, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import ConfirmationPopupContent from "./ConfirmationPopupContent";

interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  provider: string | null;
  popupRef: RefObject<HTMLDivElement | null>;
  onConfirm: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  isOpen,
  onClose,
  provider,
  popupRef,
  onConfirm,
}) => {
  const isMobile = useIsMobile();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const providerName = provider
    ? provider.charAt(0).toUpperCase() + provider.slice(1)
    : "";

  if (!hasMounted) {
    return null;
  }

  if (isMobile) {
    return (
      <MobileDrawer
        isOpen={isOpen}
        onClose={onClose}
        title={`Disconnect ${providerName || "Account"}?`}
        showPullIndicator={false}
        variant="action-sheet"
      >
        <div ref={popupRef}>
          <ConfirmationPopupContent
            onClose={onClose}
            providerName={providerName}
            onConfirm={onConfirm}
            variant="action-sheet"
          />
        </div>
      </MobileDrawer>
    );
  }

  return (
    <DesktopModal isOpen={isOpen} onClose={onClose} className="w-full max-w-[480px] p-6">
      <div ref={popupRef}>
        <ConfirmationPopupContent onClose={onClose} providerName={providerName} onConfirm={onConfirm} />
      </div>
    </DesktopModal>
  );
};

export default ConfirmationPopup;
