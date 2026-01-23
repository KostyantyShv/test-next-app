import AboutSection from "../cards/about-card/AboutCard";
import AcademicsCard from "../cards/academics-card/AcademicsCard";
import Activities from "../cards/Activities-card/ActivitiesCard";
import Admissions from "../cards/admissions-card/AdmissionsCard";
import AfterCollege from "../cards/after-college-card/AfterCollegeCard";
import Announcements from "../cards/announcements-card/AnnouncementsCard";
import AreaCard from "../cards/area-card/AreaCard";
import ArticlesCard from "../cards/articles-card/ArticlesCard";
import CaseStudyCard from "../cards/case-study-card/CaseStudyCard";
import ComparisonCard from "../cards/comparison-card/ComparisonCard";
import CostSection from "../cards/cost-card/CostCard";
import CultureSafety from "../cards/culture-card/CultureCard";
import EventsCards from "../cards/events-card/EventsCard";
import LinksCard from "../cards/links-card/LinksCard";
import MajorsCard from "../cards/majors-card/MajorsCard";
import MapCard from "../cards/map-card/MapCard";
import OverviewCard from "../cards/overview-card/OverviewCard";
import ProgramsCard from "../cards/probrams-card/ProgramsCard";
import Rankings from "../cards/rank-card/RankCard";
import ReportCard from "../cards/report-card/ReportCard";
import ReviewHighlightsCard from "../cards/review-highlights-card/review-highlights-modal/ReviewHighlightsCard";
import Reviews from "../cards/reviews-card/ReviewsCard";
import AdmissionsScatterPlotCard from "../cards/scatter-plot-card/ScatterPlotCard";
import Similar from "../cards/similar/Similar";
import SocialMediaCard from "../cards/social-media-card/SocialMediaCard";
import SpotlightCard from "../cards/spotlight-card/SpotlightCard";
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

type SchoolType = "k12" | "college" | "grad";

interface ContentMobileProps {
  schoolType?: SchoolType;
}

const ContentMobile: React.FC<ContentMobileProps> = ({ schoolType = "college" }) => {
  // Render different content based on school type
  const renderContent = () => {
    switch (schoolType) {
      case "k12":
        return (
          <div className="p-4 h-fit w-full pb-32">
            {/* K-12 specific content - placeholder for now */}
            <div className="p-8 text-center text-gray-500">
              <h2 className="text-2xl font-semibold mb-4">K-12 Content</h2>
              <p>K-12 specific content will be displayed here.</p>
            </div>
          </div>
        );
      case "grad":
        return (
          <div className="p-4 h-fit w-full pb-32">
            {/* Grad School specific content - placeholder for now */}
            <div className="p-8 text-center text-gray-500">
              <h2 className="text-2xl font-semibold mb-4">Graduate School Content</h2>
              <p>Graduate School specific content will be displayed here.</p>
            </div>
          </div>
        );
      case "college":
      default:
        // Existing college content
        return (
          <div className="p-4 h-fit w-full pb-32">
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
            <Activities id={SIDE_TABS_MOBILE.ACTIVITIES_MOBILE} />
            <SpotlightCard id={SIDE_TABS_MOBILE.SPOTLIGHT_MOBILE} />
            <CaseStudyCard id={SIDE_TABS_MOBILE.CASE_STUDY_MOBILE} />
            <AfterCollege id={SIDE_TABS_MOBILE.AFTER_COLLEGE_MOBILE} />
            <AreaCard id={SIDE_TABS_MOBILE.AREA_MOBILE} />
            <ProgramsCard id={SIDE_TABS_MOBILE.PROGRAMS_MOBILE} />
            <SocialMediaCard idMobile={SIDE_TABS_MOBILE.SOCIAL_MEDIA_MOBILE} />
            <ComparisonCard idMobile={SIDE_TABS_MOBILE.COMPARISON_MOBILE} />
            <ArticlesCard idMobile={SIDE_TABS_MOBILE.ARTICLES_MOBILE} />
          </div>
        );
    }
  };
  
  return renderContent();
};

export default ContentMobile;
