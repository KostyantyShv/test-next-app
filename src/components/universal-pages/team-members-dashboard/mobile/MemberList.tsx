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
        <div className="flex items-center justify-center p-5 text-gray-500 text-sm">
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
