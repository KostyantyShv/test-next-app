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
          className="w-full border-none cursor-pointer"
          onClick={onClose}
          style={{
            width: '100%',
            justifyContent: 'center',
            fontWeight: 600,
            color: '#346DC2',
            backgroundColor: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '8px',
            fontSize: '15px',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
            display: 'flex',
            alignItems: 'center',
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.backgroundColor = '#F3F4F6';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
          }}
        >
          Cancel
        </button>
      }
    >
      <div className="p-0">
        {currentMemberId && (
          <>
            <button
              className="w-full text-left border-none bg-none cursor-pointer"
              onClick={onEditClick}
              style={{
                padding: '16px 20px',
                fontSize: '16px',
                color: '#4A4A4A',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #F3F4F6',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.backgroundColor = '#F3F4F6';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span>Edit</span>
            </button>
            <button
              className="w-full text-left border-none bg-none cursor-pointer"
              onClick={onActivityLogClick}
              style={{
                padding: '16px 20px',
                fontSize: '16px',
                color: '#4A4A4A',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #F3F4F6',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.backgroundColor = '#F3F4F6';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span>Activity Log</span>
            </button>
            {!currentMember?.isAdmin && currentMember?.status !== "accepted" && (
              <button
                className="w-full text-left border-none bg-none cursor-pointer"
                onClick={onAssignToListingClick}
                style={{
                  padding: '16px 20px',
                  fontSize: '16px',
                  color: '#4A4A4A',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid #F3F4F6',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>Assign to Listing</span>
              </button>
            )}
            {(currentMember?.status === "pending" ||
              currentMember?.status === "rejected") && (
              <button
                className="w-full text-left border-none bg-none cursor-pointer"
                onClick={onResendInvitationClick}
                style={{
                  padding: '16px 20px',
                  fontSize: '16px',
                  color: '#4A4A4A',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid #F3F4F6',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>Resend Invitation</span>
              </button>
            )}
            <button
              className="w-full text-left border-none bg-none cursor-pointer"
              onClick={onDeleteClick}
              style={{
                padding: '16px 20px',
                fontSize: '16px',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                display: 'flex',
                alignItems: 'center',
                borderBottom: 'none',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.backgroundColor = '#F3F4F6';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span style={{ color: '#991b1b' }}>Delete</span>
            </button>
          </>
        )}
      </div>
    </Drawer>
  );
};
