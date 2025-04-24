import React from "react";
import TeamMembersDashboardDesktop from "./desktop/TeamMembersDashboardDesktop";
import TeamMembersDashboardMobile from "./mobile/TeamMembersDashboardMobile";

const TeamMembersDashboard = () => {
  return (
    <>
      <div className="max-md:hidden block">
        <TeamMembersDashboardDesktop />
      </div>
      <div className="max-md:block hidden">
        <TeamMembersDashboardMobile />
      </div>
    </>
  );
};

export default TeamMembersDashboard;
