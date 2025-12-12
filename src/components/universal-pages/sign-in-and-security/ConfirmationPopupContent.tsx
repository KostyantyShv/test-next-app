"use client";

import React from "react";

interface ConfirmationPopupContentProps {
  onClose: () => void;
  providerName: string;
  onConfirm: () => void;
}

const ConfirmationPopupContent: React.FC<ConfirmationPopupContentProps> = ({
  onClose,
  providerName,
  onConfirm,
}) => {
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
