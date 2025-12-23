import React, { useState } from "react";
import { TeamMember } from "../../types";

interface EditMemberModalProps {
  member: TeamMember;
  onClose: () => void;
  onSave: (data: {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
  }) => void;
  isSubmitting?: boolean;
  error?: string | null;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({
  member,
  onClose,
  onSave,
  isSubmitting,
  error,
}) => {
  const [firstName, setFirstName] = useState(member.firstName);
  const [lastName, setLastName] = useState(member.lastName);
  const [email, setEmail] = useState(member.email);
  const [isAdmin, setIsAdmin] = useState(member.isAdmin);

  const handleSubmit = () => {
    if (!email.trim()) return;
    onSave({ firstName, lastName, email, isAdmin });
  };

  return (
    <div className="edit-member-modal-content">
      <div className="modal-header p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="modal-title text-xl font-semibold text-[#464646]">
          Edit Team Member
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
      <div className="p-6">
        <div className="form-row flex gap-4 mb-6">
          <div className="form-group flex-1">
            <label
              className="form-label block text-sm font-medium text-[#464646] mb-2"
              htmlFor="editFirstName"
            >
              First Name
            </label>
            <input
              type="text"
              id="editFirstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-input w-full p-2.5 border border-gray-300 rounded-md text-sm text-[#464646] !bg-white focus:outline-none focus:border-[#016853] focus:shadow-[0_0_0_2px_rgba(1,104,83,0.1)]"
            />
          </div>
          <div className="form-group flex-1">
            <label
              className="form-label block text-sm font-medium text-[#464646] mb-2"
              htmlFor="editLastName"
            >
              Last Name
            </label>
            <input
              type="text"
              id="editLastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-input w-full p-2.5 border border-gray-300 rounded-md text-sm text-[#464646] !bg-white focus:outline-none focus:border-[#016853] focus:shadow-[0_0_0_2px_rgba(1,104,83,0.1)]"
            />
          </div>
        </div>
        <div className="form-group full-width mb-6">
          <label
            className="form-label block text-sm font-medium text-[#464646] mb-2"
            htmlFor="editEmail"
          >
            Email
          </label>
          <input
            type="email"
            id="editEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input w-full p-2.5 border border-gray-300 rounded-md text-sm text-[#464646] !bg-white focus:outline-none focus:border-[#016853] focus:shadow-[0_0_0_2px_rgba(1,104,83,0.1)]"
          />
        </div>
        <div className="admin-checkbox flex items-center gap-2 mb-6 mt-4">
          <label className="checkbox-wrapper inline-flex items-center justify-center cursor-pointer">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
              className="peer absolute opacity-0 h-0 w-0 !bg-white"
            />
            <span
              className="checkmark relative h-4 w-4 bg-white border-2 border-gray-300 rounded transition-all
              peer-checked:bg-[#0B6333] peer-checked:border-[#0B6333]"
            ></span>
          </label>
          <label
            htmlFor="editAdminCheckbox"
            className="text-sm text-[#464646] cursor-pointer"
          >
            Admin access
          </label>
        </div>
        {!isAdmin && (
          <div className="listing-section mt-6 pt-6 border-t border-gray-200">
            <div className="listing-section-title text-sm font-medium text-[#464646] mb-4">
              Assign to Listings
            </div>
            <div className="listing-item-checkbox flex items-center gap-4 py-3 border-b border-gray-200">
              <label className="checkbox-wrapper inline-flex items-center justify-center cursor-pointer">
                <input
                  type="checkbox"
                  className="peer absolute opacity-0 h-0 w-0 !bg-white"
                />
                <span
                  className="checkmark relative h-4 w-4 bg-white border-2 border-gray-300 rounded transition-all
                  peer-checked:bg-[#0B6333] peer-checked:border-[#0B6333]"
                ></span>
              </label>
              <img
                src="https://i.ibb.co/fGKH7fDq/product2.png"
                alt="Harvard University"
                className="listing-thumbnail w-8 h-8 rounded object-cover"
              />
              <span className="listing-title text-sm text-[#464646]">
                Harvard University
              </span>
            </div>
            <div className="listing-item-checkbox flex items-center gap-4 py-3 border-b border-gray-200">
              <label className="checkbox-wrapper inline-flex items-center justify-center cursor-pointer">
                <input
                  type="checkbox"
                  className="peer absolute opacity-0 h-0 w-0 !bg-white"
                />
                <span
                  className="checkmark relative h-4 w-4 bg-white border-2 border-gray-300 rounded transition-all
                  peer-checked:bg-[#0B6333] peer-checked:border-[#0B6333]"
                ></span>
              </label>
              <img
                src="https://i.ibb.co/fGKH7fDq/product2.png"
                alt="Stanford University"
                className="listing-thumbnail w-8 h-8 rounded object-cover"
              />
              <span className="listing-title text-sm text-[#464646]">
                Stanford University
              </span>
            </div>
            <div className="listing-item-checkbox flex items-center gap-4 py-3">
              <label className="checkbox-wrapper inline-flex items-center justify-center cursor-pointer">
                <input
                  type="checkbox"
                  className="peer absolute opacity-0 h-0 w-0 !bg-white"
                />
                <span
                  className="checkmark relative h-4 w-4 bg-white border-2 border-gray-300 rounded transition-all
                  peer-checked:bg-[#0B6333] peer-checked:border-[#0B6333]"
                ></span>
              </label>
              <img
                src="https://i.ibb.co/63Y8x85/product3.jpg"
                alt="MIT"
                className="listing-thumbnail w-8 h-8 rounded object-cover"
              />
              <span className="listing-title text-sm text-[#464646]">
                Massachusetts Institute of Technology
              </span>
            </div>
          </div>
        )}
        {error && (
          <div className="mb-3 text-sm text-red-600">{error}</div>
        )}
        <button
          type="button"
          className="send-invitation-btn w-full py-3 bg-[#3B82F6] text-white rounded-md font-medium text-sm hover:bg-[#2563EB] transition-colors disabled:opacity-60"
          onClick={handleSubmit}
          disabled={isSubmitting || !email.trim()}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditMemberModal;
