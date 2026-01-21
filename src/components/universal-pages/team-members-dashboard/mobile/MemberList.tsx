import { TeamMember } from "../types";
import { MemberCard } from "./MemberCard";

interface MemberListProps {
  members: TeamMember[];
  onActionClick: (memberId: number) => void;
}

export const MemberList: React.FC<MemberListProps> = ({
  members,
  onActionClick,
}) => {
  return (
    <div className="p-4">
      {members.length === 0 ? (
        <div 
          className="flex items-center justify-center p-5"
          style={{
            fontSize: '14px',
            color: '#6B7280',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
          }}
        >
          No members found.
        </div>
      ) : (
        members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onActionClick={onActionClick}
          />
        ))
      )}
    </div>
  );
};
