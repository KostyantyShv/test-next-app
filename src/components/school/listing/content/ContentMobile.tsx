import AboutSection from "../cards/about-card/AboutCard";
import Announcements from "../cards/announcements-card/AnnouncementsCard";
import ReportCard from "../cards/report-card/ReportCard";
import { SIDE_TABS } from "./side-tabs.constant";

const ContentMobile: React.FC = () => {
  return (
    <div className="p-4 h-fit pb-32">
      <Announcements id={SIDE_TABS.MONTHLY_UPDATE} />
      <ReportCard id={SIDE_TABS.REPORT_CARD} />
      <AboutSection id={SIDE_TABS.ABOUT} />
    </div>
  );
};

export default ContentMobile;
