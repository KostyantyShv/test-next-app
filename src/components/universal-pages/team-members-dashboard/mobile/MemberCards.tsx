import { StatusBadge } from "../StatusBadge";
import { TeamMember } from "../types";
import { useTeam } from "./hooks/useTeam";

interface MemberCardsProps {
  onActionClick: (id: number) => void;
}

export function MemberCards({ onActionClick }: MemberCardsProps) {
  const { displayedMembers } = useTeam();

  if (displayedMembers.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-gray-500">
        No members found.
      </div>
    );
  }

  return (
    <div className="p-4">
      {displayedMembers.map((member: TeamMember) => (
        <div
          key={member.id}
          className="mb-3 rounded-xl border border-gray-200 bg-white p-4"
          data-id={member.id}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-1 gap-3">
              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                <img
                  src={member.avatar}
                  alt={`${member.firstName} ${member.lastName}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-col justify-center">
                <div className="mb-1 truncate text-base font-semibold text-bold-text">
                  {member.firstName} {member.lastName}
                </div>
                <div className="truncate text-sm text-gray-500">
                  {member.email}
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
                onClick={() => onActionClick(member.id)}
                aria-label="Member Actions"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mb-2 flex min-h-[26px] items-center justify-between gap-2">
            <div className="flex min-w-0 flex-shrink flex-wrap items-center gap-2 overflow-hidden">
              {member.isAdmin ? (
                <span className="badge badge-admin inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#dbeafe] text-[#142E53]">
                  Admin
                </span>
              ) : member.listings.length > 0 ? (
                <>
                  <span className="badge badge-listing inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#e4e4e4] text-[#343332]">
                    {member.listings[0].name}
                  </span>
                  {member.listings.length > 1 && (
                    <span className="multiple-badge inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#d6d6d6] text-[#343332] text-xs font-semibold ml-2">
                      +{member.listings.length - 1}
                    </span>
                  )}
                </>
              ) : null}
            </div>
            <div className="inline-flex flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-medium">
              <StatusBadge status={member.status} />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-start gap-2">
            <div className="text-xs text-gray-500">
              Last active: {member.lastActive}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
