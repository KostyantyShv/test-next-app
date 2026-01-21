import { StatusBadge } from "../StatusBadge";
import { TeamMember } from "../types";

interface MemberCardProps {
  member: TeamMember;
  onActionClick: (id: number) => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({
  member,
  onActionClick,
}) => {
  return (
    <div className="mb-3 bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex justify-between items-start mb-3 gap-3">
        <div className="flex gap-3 flex-grow min-w-0">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={member.avatar}
              alt={`${member.firstName} ${member.lastName}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <div 
              className="mb-1 truncate"
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#464646',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
              }}
            >
              {member.firstName} {member.lastName}
            </div>
            <div 
              className="truncate"
              style={{
                fontSize: '14px',
                color: '#6B7280',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
              }}
            >
              {member.email}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <button
            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
            onClick={() => onActionClick(member.id)}
            aria-label="Member Actions"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2 mb-2 min-h-[26px]">
        <div className="flex flex-nowrap gap-2 items-center overflow-hidden min-w-0 flex-shrink">
          {member.isAdmin ? (
            <StatusBadge status="admin" />
          ) : member.listings.length > 0 ? (
            <>
              <span
                className="px-2.5 py-1 rounded-full max-w-[180px] truncate"
                title={member.listings[0].name}
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  backgroundColor: '#e4e4e4',
                  color: '#343332',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
                }}
              >
                {member.listings[0].name}
              </span>
              {member.listings.length > 1 && (
                <div 
                  className="flex items-center justify-center w-[22px] h-[22px] rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: '#E5E7EB',
                    color: '#4B5563',
                    fontSize: '11px',
                    fontWeight: 600,
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
                  }}
                >
                  +{member.listings.length - 1}
                </div>
              )}
            </>
          ) : null}
        </div>
        <div className="flex-shrink-0">
          <StatusBadge status={member.status} />
        </div>
      </div>
      <div className="flex justify-start items-center flex-wrap gap-2">
        <div 
          style={{
            fontSize: '12px',
            color: '#6B7280',
            whiteSpace: 'nowrap',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
          }}
        >
          Last active: {member.lastActive}
        </div>
      </div>
    </div>
  );
};
