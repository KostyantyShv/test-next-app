import AboutSection from "../cards/about-card/AboutCard";
import Admissions from "../cards/admissions-card/AdmissionsCard";
import Announcements from "../cards/announcements-card/AnnouncementsCard";
import EventsCards from "../cards/events-card/EventsCard";
import LinksCard from "../cards/links-card/LinksCard";
import OverviewCard from "../cards/overview-card/OverviewCard";
import Rankings from "../cards/rank-card/RankCard";
import ReportCard from "../cards/report-card/ReportCard";
import AdmissionsScatterPlotCard from "../cards/scatter-plot-card/ScatterPlotCard";
import TestimonialsCard from "../cards/testimonials-card/TestimonialsCard";
import { SIDE_TABS_MOBILE } from "./side-tabs.constant";

const ContentMobile: React.FC = () => {
  return (
    <div className="p-4 h-fit pb-32">
      <Announcements id={SIDE_TABS_MOBILE.MONTHLY_UPDATE_MOBILE} />
      <ReportCard id={SIDE_TABS_MOBILE.REPORT_CARD_MOBILE} />
      <AboutSection id={SIDE_TABS_MOBILE.ABOUT_MOBILE} />
      <Rankings id={SIDE_TABS_MOBILE.RANKINGS_MOBILE} />
      <Admissions id={SIDE_TABS_MOBILE.ADMISSIONS_MOBILE} />
      <AdmissionsScatterPlotCard id={SIDE_TABS_MOBILE.SCATTER_PLOT_MOBILE} />
      <OverviewCard id={SIDE_TABS_MOBILE.OVERVIEW_MOBILE} />
      <TestimonialsCard id={SIDE_TABS_MOBILE.TESTIMONIALS_MOBILE} />
      <LinksCard id={SIDE_TABS_MOBILE.LINKS_MOBILE} />
      <EventsCards id={SIDE_TABS_MOBILE.EVENTS_MOBILE} />
    </div>
  );
};

export default ContentMobile;
