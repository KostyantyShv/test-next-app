import React, { RefObject, useEffect } from "react";
import ConfirmationPopupContent from "./ConfirmationPopupContent";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";

interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  provider: string | null;
  popupRef: RefObject<HTMLDivElement | null>;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  isOpen,
  onClose,
  provider,
  popupRef,
}) => {
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

  return (
    <>
      <div className="max-md:hidden block">
        <div
          ref={popupRef}
          className={`fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-[1000] transition-opacity duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={(e) => {
            if (e.target === popupRef.current) onClose();
          }}
        >
          <div
            className={`bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] w-full max-w-[480px] p-2.5 text-center transform transition-transform duration-300 ${
              isOpen ? "scale-100" : "scale-95"
            }`}
          >
            <ConfirmationPopupContent
              onClose={onClose}
              providerName={providerName}
            />
          </div>
        </div>
      </div>
      <div className="max-md:block hidden">
        <MobileDrawer isOpen={isOpen} onClose={onClose}>
          <ConfirmationPopupContent
            onClose={onClose}
            providerName={providerName}
          />
        </MobileDrawer>
      </div>
    </>
  );
};

export default ConfirmationPopup;
