"use client";

import React, { RefObject, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import PasswordPopupContent from "./PasswordPopupContent";

interface PasswordPopupProps {
  isOpen: boolean;
  onClose: () => void;
  popupRef: RefObject<HTMLDivElement | null>;
}

const PasswordPopup: React.FC<PasswordPopupProps> = ({
  isOpen,
  onClose,
  popupRef,
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

  useEffect(() => {
    if (isOpen) {
      const firstInput = popupRef.current?.querySelector('input');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }, [isOpen, popupRef]);

  if (!hasMounted) {
    return null;
  }

  if (isMobile) {
    return (
      <MobileDrawer isOpen={isOpen} onClose={onClose} title="Set New Password">
        <div ref={popupRef} className="px-5 pb-6 pt-2">
          <PasswordPopupContent onClose={onClose} />
        </div>
      </MobileDrawer>
    );
  }

  return (
    <DesktopModal isOpen={isOpen} onClose={onClose} className="w-full max-w-[480px] p-6">
      <div ref={popupRef}>
        <PasswordPopupContent onClose={onClose} />
      </div>
    </DesktopModal>
  );
};

export default PasswordPopup;
