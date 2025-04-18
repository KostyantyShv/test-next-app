import { useState } from "react";
import { useTeam } from "../hooks/useTeam";
import { useToast } from "../hooks/useToast";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";

interface EditMemberDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditMemberDrawer({ isOpen, onClose }: EditMemberDrawerProps) {
  const { members, setMembers, currentMemberId } = useTeam();
  const member = members.find((m) => m.id === currentMemberId);
  const [firstName, setFirstName] = useState(member?.firstName || "");
  const [lastName, setLastName] = useState(member?.lastName || "");
  const [isAdmin, setIsAdmin] = useState(member?.isAdmin || false);
  const { showToast } = useToast();

  const handleSave = () => {
    if (firstName.trim() && lastName.trim()) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === currentMemberId ? { ...m, firstName, lastName, isAdmin } : m
        )
      );
      showToast("Member updated successfully", "success");
      onClose();
    } else {
      showToast("Please fill in all fields", "error");
    }
  };

  return (
    <MobileDrawer isOpen={isOpen} onClose={onClose}>
      <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
        <h2 className="text-lg font-semibold text-bold-text">
          Edit Team Member
        </h2>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close Edit Member"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className="px-5 py-4 space-y-4">
        <div>
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-bold-text"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-text-default focus:border-active-green focus:outline-none focus:ring-2 focus:ring-active-green/10"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium text-bold-text"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-text-default focus:border-active-green focus:outline-none focus:ring-2 focus:ring-active-green/10"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="h-4 w-4 border-gray-300 text-active-green focus:ring-active-green"
          />
          <span className="text-sm text-text-default">Admin</span>
        </label>
      </div>
      <div className="sticky bottom-0 border-t border-gray-200 bg-white px-5 py-4">
        <button
          className="w-full rounded-lg bg-apply-button-bg px-4 py-2.5 text-sm font-semibold text-active-green transition-colors hover:bg-apply-button-hover"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </MobileDrawer>
  );
}
