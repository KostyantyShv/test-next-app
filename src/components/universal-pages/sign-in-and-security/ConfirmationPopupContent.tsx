"use client";

import React from "react";

interface ConfirmationPopupContentProps {
  onClose: () => void;
  providerName: string;
  onConfirm: () => void;
  variant?: "dialog" | "action-sheet";
}

const ConfirmationPopupContent: React.FC<ConfirmationPopupContentProps> = ({
  onClose,
  providerName,
  onConfirm,
  variant = "dialog",
}) => {
  if (variant === "action-sheet") {
    return (
      <div className="pb-2 pt-1">
        <div className="overflow-hidden rounded-[20px] bg-[#F2F2F7] shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
          <div className="border-b border-black/10 px-6 py-4 text-center">
            <h3 className="text-[14px] font-semibold tracking-[-0.01em] text-[#1B1B1B]">
              Disconnect {providerName}?
            </h3>
            <p className="mt-2 text-[13px] leading-[1.4] text-[#6B7280]">
              Are you sure you want to disconnect your {providerName} account? You
              will no longer be able to sign in using this method.
            </p>
          </div>
          <button
            className="w-full bg-white px-6 py-4 text-[17px] font-semibold text-[#DC3545] transition-colors duration-200 active:bg-[#F5F5F7]"
            onClick={onConfirm}
          >
            Disconnect {providerName}
          </button>
        </div>

        <button
          className="mt-2 w-full rounded-[20px] bg-white px-6 py-4 text-[17px] font-semibold text-[#1B1B1B] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-colors duration-200 active:bg-[#F5F5F7]"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="confirmation-popup text-center p-2.5">
      <h3 className="confirmation-title text-lg font-semibold mb-2.5 text-[#1B1B1B]">
        Disconnect {providerName}?
      </h3>
      <p className="confirmation-message text-sm text-[#5F5F5F] mb-6">
        Are you sure you want to disconnect your {providerName} account? You
        will no longer be able to sign in using this method.
      </p>
      <div className="confirmation-actions flex justify-end gap-2.5">
        <button
          className="btn btn-secondary px-4 py-2 rounded-md text-sm font-medium cursor-pointer border border-[#E4E6EB] bg-[#E4E6EB] text-[#050505] hover:bg-[#D8DADF] transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger px-4 py-2 rounded-md text-sm font-medium cursor-pointer bg-[#FDEEED] text-[#DC3545] hover:bg-[#FAD8D6] transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap border-transparent"
          onClick={onConfirm}
        >
          Disconnect {providerName}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPopupContent;
