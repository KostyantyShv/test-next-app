"use client";

import React, { RefObject, useEffect } from "react";
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
        <PasswordPopupContent onClose={onClose} />
      </div>
    </div>
  );
};

export default PasswordPopup;
