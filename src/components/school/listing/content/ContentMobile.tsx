import AboutSection from "../cards/about-card/AboutCard";
import Admissions from "../cards/admissions-card/AdmissionsCard";
import Announcements from "../cards/announcements-card/AnnouncementsCard";
import Rankings from "../cards/rank-card/RankCard";
import ReportCard from "../cards/report-card/ReportCard";
import { SIDE_TABS } from "./side-tabs.constant";

const ContentMobile: React.FC = () => {
  return (
    <div className="p-4 h-fit pb-32">
      <Announcements id={SIDE_TABS.MONTHLY_UPDATE} />
      <ReportCard id={SIDE_TABS.REPORT_CARD} />
      <AboutSection id={SIDE_TABS.ABOUT} />
      <Rankings id={SIDE_TABS.RANKINGS} />
      <Admissions id={SIDE_TABS.ADMISSIONS} />
    </div>
  );
};

export default ContentMobile;
