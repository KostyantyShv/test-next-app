"use client";

import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { useTeam } from "./hooks/useTeam";
import { useToast } from "./hooks/useToast";

interface ActionsDrawerProps {
  isOpen: boolean | undefined;
  memberId?: number;
  onClose: () => void;
}

export function ActionsDrawer({
  isOpen = false,
  memberId,
  onClose,
}: ActionsDrawerProps) {
  const { members, setCurrentMemberId, teamType } = useTeam();
  const { showToast } = useToast();
  const member = members.find((m) => m.id === memberId);

  const openEditMemberDrawer = (id: number) => {
    setCurrentMemberId(id);
    document.dispatchEvent(
      new CustomEvent("openDrawer", { detail: "editMember" })
    );
  };

  const openActivityLogDrawer = (id: number) => {
    setCurrentMemberId(id);
    document.dispatchEvent(
      new CustomEvent("openDrawer", { detail: "activityLog" })
    );
  };

  const openAssignToListingDrawer = (id: number) => {
    setCurrentMemberId(id);
    document.dispatchEvent(
      new CustomEvent("openDrawer", { detail: "assignToListing" })
    );
  };

  const openDeleteConfirmationDrawer = (id: number) => {
    setCurrentMemberId(id);
    document.dispatchEvent(
      new CustomEvent("openDrawer", { detail: "deleteConfirmation" })
    );
  };

  const resendInvitation = () => {
    showToast(`Invitation resent to ${member?.email}`, "success");
  };

  return (
    <MobileDrawer isOpen={isOpen} onClose={onClose}>
      <div className="p-2">
        <button
          className="flex w-full items-center gap-3 px-5 py-4 text-base text-text-default border-none border-b border-gray-100 hover:bg-gray-100 transition-colors"
          onClick={() => {
            if (memberId) openEditMemberDrawer(memberId);
            onClose();
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span className="flex-grow text-left">Edit</span>
        </button>
        <button
          className="flex w-full items-center gap-3 px-5 py-4 text-base text-text-default border-none border-b border-gray-100 hover:bg-gray-100 transition-colors"
          onClick={() => {
            if (memberId) openActivityLogDrawer(memberId);
            onClose();
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          <span className="flex-grow text-left">Activity Log</span>
        </button>
        {(!member?.isAdmin || teamType === "collaborators") && (
          <button
            className="flex w-full items-center gap-3 px-5 py-4 text-base text-text-default border-none border-b border-gray-100 hover:bg-gray-100 transition-colors"
            onClick={() => {
              if (memberId) openAssignToListingDrawer(memberId);
              onClose();
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            <span className="flex-grow text-left">Assign to Listing</span>
          </button>
        )}
        {(member?.status === "pending" || member?.status === "rejected") && (
          <button
            className="flex w-full items-center gap-3 px-5 py-4 text-base text-text-default border-none border-b border-gray-100 hover:bg-gray-100 transition-colors"
            onClick={() => {
              resendInvitation();
              onClose();
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="flex-grow text-left">Resend Invitation</span>
          </button>
        )}
        <button
          className="flex w-full items-center gap-3 px-5 py-4 text-base text-rejected-text border-none border-b border-gray-100 hover:bg-gray-100 transition-colors"
          onClick={() => {
            if (memberId) openDeleteConfirmationDrawer(memberId);
            onClose();
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
          <span className="flex-grow text-left">Delete</span>
        </button>
      </div>
      <div className="p-5 border-t-[8px] border-gray-100 bg-white flex-shrink-0">
        <button
          className="w-full px-5 py-3 rounded-lg text-base font-semibold text-link-text bg-white hover:bg-gray-100 transition-colors"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </MobileDrawer>
  );
}
