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
            <div className="text-base font-semibold text-gray-700 mb-1 truncate">
              {member.firstName} {member.lastName}
            </div>
            <div className="text-sm text-gray-500 truncate">{member.email}</div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <button
            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
            onClick={() => onActionClick(member.id)}
            aria-label="Member Actions"
          >
            <svg
              className="w-4.5 h-4.5"
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
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800 max-w-[180px] truncate"
                title={member.listings[0].name}
              >
                {member.listings[0].name}
              </span>
              {member.listings.length > 1 && (
                <div className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-gray-200 text-gray-600 text-[11px] font-semibold flex-shrink-0">
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
        <div className="text-xs text-gray-500">
          Last active: {member.lastActive}
        </div>
      </div>
    </div>
  );
};
