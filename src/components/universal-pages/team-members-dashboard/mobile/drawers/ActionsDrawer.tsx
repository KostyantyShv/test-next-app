import { TeamMember } from "../../types";
import { Drawer } from "./Drawer";

interface ActionsDrawerProps {
  isOpen: boolean;
  currentMemberId: number | null;
  members: TeamMember[];
  onClose: () => void;
  onEditClick: () => void;
  onActivityLogClick: () => void;
  onAssignToListingClick: () => void;
  onResendInvitationClick: () => void;
  onDeleteClick: () => void;
}

export const ActionsDrawer: React.FC<ActionsDrawerProps> = ({
  isOpen,
  currentMemberId,
  members,
  onClose,
  onEditClick,
  onActivityLogClick,
  onAssignToListingClick,
  onResendInvitationClick,
  onDeleteClick,
}) => {
  const currentMember = members.find((m) => m.id === currentMemberId);
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title=""
      footer={
        <button
          className="w-full text-center py-3 rounded-lg text-sm font-semibold text-blue-600 bg-white hover:bg-gray-100"
          onClick={onClose}
        >
          Cancel
        </button>
      }
    >
      <div className="p-2">
        {currentMemberId && (
          <>
            <button
              className="w-full text-left px-5 py-4 text-base text-gray-600 border-b border-gray-100 hover:bg-gray-100"
              onClick={onEditClick}
            >
              Edit
            </button>
            <button
              className="w-full text-left px-5 py-4 text-base text-gray-600 border-b border-gray-100 hover:bg-gray-100"
              onClick={onActivityLogClick}
            >
              Activity Log
            </button>
            {!currentMember?.isAdmin && (
              <button
                className="w-full text-left px-5 py-4 text-base text-gray-600 border-b border-gray-100 hover:bg-gray-100"
                onClick={onAssignToListingClick}
              >
                Assign to Listing
              </button>
            )}
            {(currentMember?.status === "pending" ||
              currentMember?.status === "rejected") && (
              <button
                className="w-full text-left px-5 py-4 text-base text-gray-600 border-b border-gray-100 hover:bg-gray-100"
                onClick={onResendInvitationClick}
              >
                Resend Invitation
              </button>
            )}
            <button
              className="w-full text-left px-5 py-4 text-base text-red-800 border-b border-gray-100 hover:bg-gray-100"
              onClick={onDeleteClick}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </Drawer>
  );
};
