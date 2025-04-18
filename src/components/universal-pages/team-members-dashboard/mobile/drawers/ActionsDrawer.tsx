import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { useTeam } from "../hooks/useTeam";
import { useToast } from "../hooks/useToast";

interface ActionsDrawerProps {
  isOpen: boolean;
  memberId?: number;
  onClose: () => void;
  onEdit: () => void;
  onActivityLog: () => void;
  onAssignToListing: () => void;
  onResendInvitation: () => void;
  onDelete: () => void;
}

export function ActionsDrawer({
  isOpen,
  memberId,
  onClose,
  onEdit,
  onActivityLog,
  onAssignToListing,
  onResendInvitation,
  onDelete,
}: ActionsDrawerProps) {
  const { members } = useTeam();
  const { showToast } = useToast();
  const member = members.find((m) => m.id === memberId);

  const handleResendInvitation = () => {
    showToast(`Invitation resent to ${member?.email}`, "success");
    onResendInvitation();
    onClose();
  };

  return (
    <MobileDrawer isOpen={isOpen} onClose={onClose}>
      <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
        <h2 className="text-lg font-semibold text-bold-text">Actions</h2>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close Actions"
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
      <div className="px-2 py-2">
        <button
          className="flex w-full items-center gap-3 px-5 py-4 text-base text-text-default transition-colors hover:bg-gray-100"
          onClick={() => {
            onEdit();
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
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit
        </button>
        <button
          className="flex w-full items-center gap-3 px-5 py-4 text-base text-text-default transition-colors hover:bg-gray-100"
          onClick={() => {
            onActivityLog();
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
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          Activity Log
        </button>
        <button
          className="flex w-full items-center gap-3 px-5 py-4 text-base text-text-default transition-colors hover:bg-gray-100"
          onClick={() => {
            onAssignToListing();
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
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
          Assign to Listing
        </button>
        {member?.status === "pending" && (
          <button
            className="flex w-full items-center gap-3 px-5 py-4 text-base text-text-default transition-colors hover:bg-gray-100"
            onClick={handleResendInvitation}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Resend Invitation
          </button>
        )}
        <button
          className="flex w-full items-center gap-3 px-5 py-4 text-base text-rejected-text transition-colors hover:bg-gray-100"
          onClick={() => {
            onDelete();
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
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
          Delete
        </button>
      </div>
    </MobileDrawer>
  );
}
