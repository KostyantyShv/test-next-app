"use client";
import React, { useState } from "react";
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
  // Shared state so desktop and mobile always show the same data; edits in either view apply everywhere
  const [members, setMembers] = useState<TeamMember[]>(
    initialMembers && initialMembers.length > 0 ? initialMembers : []
  );

  return (
    <>
      <div className="max-md:hidden block">
        <TeamMembersDashboardDesktop
          members={members}
          setMembers={setMembers}
          ownerId={ownerId}
        />
      </div>
      <div className="max-md:block hidden">
        <TeamMembersDashboardMobile
          members={members}
          setMembers={setMembers}
          ownerId={ownerId}
        />
      </div>
    </>
  );
};

export default TeamMembersDashboard;
