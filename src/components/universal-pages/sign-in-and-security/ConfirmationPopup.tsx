"use client";

import React, { RefObject, useEffect } from "react";
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
    <div
      ref={popupRef}
      className={`popup-overlay fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-[1000] transition-opacity duration-300 ${
        isOpen ? "active opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={(e) => {
        if (e.target === popupRef.current) onClose();
      }}
    >
      <div
        className={`popup bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] w-full max-w-[480px] p-6 relative transform transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <ConfirmationPopupContent
          onClose={onClose}
          providerName={providerName}
          onConfirm={onConfirm}
        />
      </div>
    </div>
  );
};

export default ConfirmationPopup;
