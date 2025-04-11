import React, { useEffect, RefObject } from "react";

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

  const handleConfirm = () => {
    // In a real app, this would trigger a parent state update
    onClose();
  };

  return (
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
        <h3 className="text-lg font-semibold mb-2.5 text-[#1B1B1B]">
          Disconnect {providerName}?
        </h3>
        <p className="text-sm text-[#5F5F5F] mb-6">
          Are you sure you want to disconnect your {providerName} account? You
          will no longer be able to sign in using this method.
        </p>
        <div className="flex justify-end gap-2.5">
          <button
            className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer border border-[#E4E6EB] bg-[#E4E6EB] text-[#050505] hover:bg-[#D8DADF] transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer bg-[#FDEEED] text-[#DC3545] hover:bg-[#FAD8D6] transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap"
            onClick={handleConfirm}
          >
            Disconnect {providerName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
