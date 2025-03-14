import AboutSection from "../cards/about-card/AboutCard";
import AcademicsCard from "../cards/academics-card/AcademicsCard";
import Admissions from "../cards/admissions-card/AdmissionsCard";
import Announcements from "../cards/announcements-card/AnnouncementsCard";
import CostSection from "../cards/cost-card/CostCard";
import CultureSafety from "../cards/culture-card/CultureCard";
import EventsCards from "../cards/events-card/EventsCard";
import LinksCard from "../cards/links-card/LinksCard";
import MajorsCard from "../cards/majors-card/MajorsCard";
import MapCard from "../cards/map-card/MapCard";
import OverviewCard from "../cards/overview-card/OverviewCard";
import Rankings from "../cards/rank-card/RankCard";
import ReportCard from "../cards/report-card/ReportCard";
import ReviewHighlightsCard from "../cards/review-highlights-card/review-highlights-modal/ReviewHighlightsCard";
import Reviews from "../cards/reviews-card/ReviewsCard";
import AdmissionsScatterPlotCard from "../cards/scatter-plot-card/ScatterPlotCard";
import Similar from "../cards/similar/Similar";
import StudentsCard from "../cards/students-card/StudentsCard";
import TeachersCard from "../cards/teachers-card/TeachersCard";
import TestimonialsCard from "../cards/testimonials-card/TestimonialsCard";
import { SIDE_TABS_MOBILE } from "./side-tabs.constant";

const reviewData = {
  author: "Shuwang Y.",
  avatar: "https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
  rating: 4.9,
  date: "June 22, 2022",
  content:
    "Really impressed with the quality of service. The team went above and beyond to ensure everything was perfect. Would definitely recommend to anyone looking for a professional and reliable solution.",
  helpfulCount: 24,
};

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
      <Reviews id={SIDE_TABS_MOBILE.REVIEWS_MOBILE} />
      <ReviewHighlightsCard
        {...reviewData}
        id={SIDE_TABS_MOBILE.REVIEW_HIGHLIGHTS_MOBILE}
      />
      <Similar id={SIDE_TABS_MOBILE.SIMILAR_MOBILE} />
      <MapCard id={SIDE_TABS_MOBILE.MAP_MOBILE} />
      <CultureSafety id={SIDE_TABS_MOBILE.CULTURE_MOBILE} />
      <CostSection id={SIDE_TABS_MOBILE.COST_MOBILE} />
      <MajorsCard id={SIDE_TABS_MOBILE.MAJORS_MOBILE} />
      <StudentsCard id={SIDE_TABS_MOBILE.STUDENTS_MOBILE} />
      <AcademicsCard id={SIDE_TABS_MOBILE.ACADEMICS_MOBILE} />
      <TeachersCard id={SIDE_TABS_MOBILE.TEACHERS_MOBILE} />
    </div>
  );
};

export default ContentMobile;
