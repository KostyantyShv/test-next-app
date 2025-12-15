import React from "react";
import TeamMembersDashboardDesktop from "./desktop/TeamMembersDashboardDesktop";
import TeamMembersDashboardMobile from "./mobile/TeamMembersDashboardMobile";
import { TeamMember } from "./types";

interface TeamMembersDashboardProps {
  initialMembers?: TeamMember[];
  ownerId: string;
}

const TeamMembersDashboard: React.FC<TeamMembersDashboardProps> = ({
  initialMembers,
  ownerId,
}) => {
  return (
    <>
      <div className="max-md:hidden block">
        <TeamMembersDashboardDesktop
          initialMembers={initialMembers}
          ownerId={ownerId}
        />
      </div>
      <div className="max-md:block hidden">
        <TeamMembersDashboardMobile
          initialMembers={initialMembers}
          ownerId={ownerId}
        />
      </div>
    </>
  );
};

export default TeamMembersDashboard;
