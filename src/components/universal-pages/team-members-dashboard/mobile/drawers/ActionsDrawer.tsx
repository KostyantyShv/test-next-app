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
          className="w-full text-center py-3 rounded-lg bg-white hover:bg-gray-100"
          onClick={onClose}
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: '#2563EB',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
          }}
        >
          Cancel
        </button>
      }
    >
      <div className="p-2">
        {currentMemberId && (
          <>
            <button
              className="w-full text-left px-5 py-4 border-b border-gray-100 hover:bg-gray-100"
              onClick={onEditClick}
              style={{
                fontSize: '15px',
                color: '#4A4A4A',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
              }}
            >
              Edit
            </button>
            <button
              className="w-full text-left px-5 py-4 border-b border-gray-100 hover:bg-gray-100"
              onClick={onActivityLogClick}
              style={{
                fontSize: '15px',
                color: '#4A4A4A',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
              }}
            >
              Activity Log
            </button>
            {!currentMember?.isAdmin && (
              <button
                className="w-full text-left px-5 py-4 border-b border-gray-100 hover:bg-gray-100"
                onClick={onAssignToListingClick}
                style={{
                  fontSize: '15px',
                  color: '#4A4A4A',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
                }}
              >
                Assign to Listing
              </button>
            )}
            {(currentMember?.status === "pending" ||
              currentMember?.status === "rejected") && (
              <button
                className="w-full text-left px-5 py-4 border-b border-gray-100 hover:bg-gray-100"
                onClick={onResendInvitationClick}
                style={{
                  fontSize: '15px',
                  color: '#4A4A4A',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
                }}
              >
                Resend Invitation
              </button>
            )}
            <button
              className="w-full text-left px-5 py-4 border-b border-gray-100 hover:bg-gray-100"
              onClick={onDeleteClick}
              style={{
                fontSize: '15px',
                color: '#991b1b',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </Drawer>
  );
};
