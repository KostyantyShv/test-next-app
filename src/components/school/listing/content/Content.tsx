"use client";
import React from "react";
import dynamic from "next/dynamic";
import { SIDE_TABS } from "./side-tabs.constant";
import { useTabsObserver } from "./tabs-observer.hook";
import AdmissionsScatterPlotCard from "../cards/scatter-plot-card/ScatterPlotCard";
import ReviewHighlightsCard from "../cards/review-highlights-card/ReviewHighlightsCard";
import AnnouncementsCard from "../cards/announcements-card/AnnouncementsCard";
import TestimonialsCard from "../cards/testimonials-card/TestimonialsCard";
import AdmissionsCard from "../cards/admissions-card/AdmissionsCard";
import OverviewCard from "../cards/overview-card/OverviewCard";
import EventsCards from "../cards/events-card/EventsCard";
import ReportCard from "../cards/report-card/ReportCard";
import AboutCard from "../cards/about-card/AboutCard";
import LinksCard from "../cards/links-card/LinksCard";
import RankCard from "../cards/rank-card/RankCard";
import Reviews from "../cards/reviews-card/ReviewsCard";
import Similar from "../cards/similar/Similar";
import CultureSafety from "../cards/culture-card/CultureCard";
import CostSection from "../cards/cost-card/CostCard";
import MajorsCard from "../cards/majors-card/MajorsCard";
import StudentsCard from "../cards/students-card/StudentsCard";
import AcademicsCard from "../cards/academics-card/AcademicsCard";
import TeachersCard from "../cards/teachers-card/TeachersCard";
import Activities from "../cards/Activities-card/ActivitiesCard";
import SpotlightCard from "../cards/spotlight-card/SpotlightCard";
import CaseStudyCard from "../cards/case-study-card/CaseStudyCard";
import AfterCollege from "../cards/after-college-card/AfterCollegeCard";
import ProgramsCard from "../cards/probrams-card/ProgramsCard";
import ComparisonCard from "../cards/comparison-card/ComparisonCard";
const DynamicMapCard = dynamic(() => import("../cards/map-card/MapCard"), {
  loading: () => <p>Loading...</p>,
});

const Content = () => {
  const { activeTab, setActiveTab } = useTabsObserver();

  const reviewData = {
    author: "Shuwang Y.",
    avatar:
      "https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
    rating: 4.9,
    date: "June 22, 2022",
    content:
      "Really impressed with the quality of service. The team went above and beyond to ensure everything was perfect. Would definitely recommend to anyone looking for a professional and reliable solution.",
    helpfulCount: 24,
  };

  return (
    <div className="py-5 flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-20 self-start max-sm:hidden h-[calc(100vh-5rem)]">
        <ul className="flex flex-col pl-[40px] overflow-y-auto h-full scrollbar-hide">
          {Object.values(SIDE_TABS).map((value, index) => (
            <li
              key={index}
              onClick={() => {
                setActiveTab(value);
                document
                  .getElementById(value)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`py-2 cursor-pointer relative flex items-center text-[#5F5F5F] text-sm sm:text-base ${
                activeTab === value
                  ? 'text-[#0B6333] font-semibold before:content-[""] before:w-2 before:h-2 before:bg-[#0B6333] before:rounded-full before:absolute before:left-[-20px] before:top-1/2 before:transform before:-translate-y-1/2 md:before:block before:hidden'
                  : ""
              }`}
            >
              <a href={`#${value}`}>{value}</a>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex-1 max-w-[760px] font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif]">
        <AnnouncementsCard id={SIDE_TABS.MONTHLY_UPDATE} />
        <ReportCard id={SIDE_TABS.REPORT_CARD} />
        <AboutCard id={SIDE_TABS.ABOUT} />
        <RankCard id={SIDE_TABS.RANKINGS} />
        <AdmissionsCard id={SIDE_TABS.ADMISSIONS} />
        <AdmissionsScatterPlotCard id={SIDE_TABS.SCATTER_PLOT} />
        <OverviewCard id={SIDE_TABS.OVERVIEW} />
        <TestimonialsCard id={SIDE_TABS.TESTIMONIALS} />
        <LinksCard id={SIDE_TABS.LINKS} />
        <EventsCards id={SIDE_TABS.EVENTS} />
        <Reviews id={SIDE_TABS.REVIEWS} />
        <ReviewHighlightsCard
          {...reviewData}
          id={SIDE_TABS.REVIEW_HIGHLIGHTS}
        />
        <Similar id={SIDE_TABS.SIMILAR} />
        <DynamicMapCard id={SIDE_TABS.MAP} />
        <CultureSafety id={SIDE_TABS.CULTURE} />
        <CostSection id={SIDE_TABS.COST} />
        <MajorsCard id={SIDE_TABS.MAJORS} />
        <StudentsCard id={SIDE_TABS.STUDENTS} />
        <AcademicsCard id={SIDE_TABS.ACADEMICS} />
        <TeachersCard id={SIDE_TABS.TEACHERS} />
        <Activities id={SIDE_TABS.ACTIVITIES} />
        <SpotlightCard id={SIDE_TABS.SPOTLIGHT} />
        <CaseStudyCard id={SIDE_TABS.CASE_STUDY} />
        <AfterCollege id={SIDE_TABS.AFTER_COLLEGE} />
        <ProgramsCard id={SIDE_TABS.PROGRAMS} />
        <ComparisonCard id={SIDE_TABS.COMPARISON} />
      </div>
    </div>
  );
};

export default Content;
