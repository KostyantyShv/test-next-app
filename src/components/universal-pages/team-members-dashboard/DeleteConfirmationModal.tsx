import React from "react";

interface DeleteConfirmationModalProps {
  memberId: number;
  onClose: () => void;
  onDelete: (memberId: number) => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  memberId,
  onClose,
  onDelete,
}) => {
  return (
    <div className="confirmation-modal-content p-6 text-center">
      <div className="modal-header pb-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="modal-title text-xl font-semibold text-[#464646]">
          Confirm Deletion
        </h2>
        <div
          className="modal-close cursor-pointer p-2 flex items-center justify-center text-gray-500 hover:text-[#464646] transition-colors"
          onClick={onClose}
        >
          <svg fill="none" viewBox="0 0 15 15" className="w-5 h-5">
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              fill="currentColor"
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="confirmation-message text-base text-[#464646] mb-6">
        Are you sure you want to delete this team member? This action cannot be
        undone.
      </div>
      <div className="confirmation-buttons flex justify-center gap-4">
        <button
          onClick={onClose}
          className="cancel-btn py-2.5 px-5 bg-white text-gray-600 border border-gray-300 rounded-md font-medium text-sm hover:bg-gray-50 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={() => onDelete(memberId)}
          className="confirm-btn py-2.5 px-5 bg-[#EF4444] text-white rounded-md font-medium text-sm hover:bg-[#DC2626] transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
