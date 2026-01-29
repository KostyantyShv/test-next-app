"use client";
import React from "react";
import dynamic from "next/dynamic";
import { SIDE_TABS_DESKTOP } from "./side-tabs.constant";
import { useTabsObserver } from "./tabs-observer.hook";
import AdmissionsScatterPlotCard from "../cards/scatter-plot-card/ScatterPlotCard";
import ReviewHighlightsCard from "../cards/review-highlights-card/review-highlights-modal/ReviewHighlightsCard";
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
import AreaCard from "../cards/area-card/AreaCard";
import Announcements from "../cards/announcements-card/AnnouncementsCard";
import { removeLastWord } from "@/utils/removeLastWord";
import ArticlesCard from "../cards/articles-card/ArticlesCard";
import ComparisonCard from "../cards/comparison-card/ComparisonCard";
import SocialMediaCard from "../cards/social-media-card/SocialMediaCard";
const DynamicMapCard = dynamic(() => import("../cards/map-card/MapCard"), {
  loading: () => <p>Loading...</p>,
});

type SchoolType = "k12" | "college" | "grad";

interface ContentDesktopProps {
  schoolType?: SchoolType;
}

const ContentDesktop: React.FC<ContentDesktopProps> = ({ schoolType = "college" }) => {
  const { activeTab, setActiveTab } = useTabsObserver();

  const scrollToSection = (tabId: string) => {
    const headerOffset = 176; // sticky header total height on listing page

    const findElement = () =>
      (document.getElementById(tabId) ||
        (document.querySelector(`[id="${tabId}"]`) as HTMLElement | null)) ??
      null;

    const attemptScroll = (attempts = 0) => {
      const element = findElement();
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        window.scrollTo({
          top: Math.max(0, elementTop - headerOffset),
          behavior: "smooth",
        });
        return;
      }

      // Map is loaded via next/dynamic; wait for it to mount.
      if (attempts < 50) {
        const delay = tabId.includes("Map") ? 200 : 120;
        setTimeout(() => attemptScroll(attempts + 1), delay);
      }
    };

    requestAnimationFrame(() => attemptScroll());
  };
  
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
  
  // Render different content based on school type
  const renderContent = () => {
    switch (schoolType) {
      case "k12":
        return (
          <div className="py-5 flex flex-col md:flex-row gap-14">
            <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-20 self-start max-sm:hidden h-[calc(100vh-5rem)]">
              <ul className="flex flex-col pl-[40px] overflow-y-auto h-full scrollbar-hide">
                {Object.values(SIDE_TABS_DESKTOP).map((value, index) => {
                  const formattedValue = removeLastWord(value);
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setActiveTab(value);
                        scrollToSection(value);
                      }}
                      className={`py-2 cursor-pointer relative flex items-center text-[#5F5F5F] text-sm sm:text-base ${
                        activeTab === value
                          ? 'text-[#0B6333] font-semibold before:content-[""] before:w-2 before:h-2 before:bg-[#0B6333] before:rounded-full before:absolute before:left-[-20px] before:top-1/2 before:transform before:-translate-y-1/2 md:before:block before:hidden'
                          : ""
                      }`}
                    >
                      <a
                        href={`#${value}`}
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        {formattedValue}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </aside>
            <div className="flex-1 max-w-[760px] font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif]">
              {/* K-12 specific content - placeholder for now */}
              <div className="p-8 text-center text-gray-500">
                <h2 className="text-2xl font-semibold mb-4">K-12 Content</h2>
                <p>K-12 specific content will be displayed here.</p>
              </div>
            </div>
          </div>
        );
      case "grad":
        return (
          <div className="py-5 flex flex-col md:flex-row gap-14">
            <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-20 self-start max-sm:hidden h-[calc(100vh-5rem)]">
              <ul className="flex flex-col pl-[40px] overflow-y-auto h-full scrollbar-hide">
                {Object.values(SIDE_TABS_DESKTOP).map((value, index) => {
                  const formattedValue = removeLastWord(value);
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setActiveTab(value);
                        scrollToSection(value);
                      }}
                      className={`py-2 cursor-pointer relative flex items-center text-[#5F5F5F] text-sm sm:text-base ${
                        activeTab === value
                          ? 'text-[#0B6333] font-semibold before:content-[""] before:w-2 before:h-2 before:bg-[#0B6333] before:rounded-full before:absolute before:left-[-20px] before:top-1/2 before:transform before:-translate-y-1/2 md:before:block before:hidden'
                          : ""
                      }`}
                    >
                      <a
                        href={`#${value}`}
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        {formattedValue}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </aside>
            <div className="flex-1 max-w-[760px] font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif]">
              {/* Grad School specific content - placeholder for now */}
              <div className="p-8 text-center text-gray-500">
                <h2 className="text-2xl font-semibold mb-4">Graduate School Content</h2>
                <p>Graduate School specific content will be displayed here.</p>
              </div>
            </div>
          </div>
        );
      case "college":
      default:
        // Existing college content
        return (
          <div className="w-full max-w-[1077px] mx-auto">
            <div className="py-5 flex flex-col md:flex-row gap-14">
              <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-20 self-start max-sm:hidden h-[calc(100vh-5rem)]">
                <ul className="flex flex-col pl-[40px] overflow-y-auto h-full scrollbar-hide">
                  {Object.values(SIDE_TABS_DESKTOP).map((value, index) => {
                    const formattedValue = removeLastWord(value);
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          setActiveTab(value);
                          scrollToSection(value);
                        }}
                        className={`py-2 cursor-pointer relative flex items-center text-[#5F5F5F] text-sm sm:text-base ${
                          activeTab === value
                            ? 'text-[#0B6333] font-semibold before:content-[""] before:w-2 before:h-2 before:bg-[#0B6333] before:rounded-full before:absolute before:left-[-20px] before:top-1/2 before:transform before:-translate-y-1/2 md:before:block before:hidden'
                            : ""
                        }`}
                      >
                        <a
                          href={`#${value}`}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          {formattedValue}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </aside>
              <div className="flex-1 max-w-[760px] font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif]">
                <Announcements id={SIDE_TABS_DESKTOP.MONTHLY_UPDATE_DESKTOP} />
                <ReportCard id={SIDE_TABS_DESKTOP.REPORT_CARD_DESKTOP} />
                <AboutCard id={SIDE_TABS_DESKTOP.ABOUT_DESKTOP} />
                <RankCard id={SIDE_TABS_DESKTOP.RANKINGS_DESKTOP} />
                <AdmissionsCard id={SIDE_TABS_DESKTOP.ADMISSIONS_DESKTOP} />
                <AdmissionsScatterPlotCard
                  id={SIDE_TABS_DESKTOP.SCATTER_PLOT_DESKTOP}
                />
                <OverviewCard id={SIDE_TABS_DESKTOP.OVERVIEW_DESKTOP} />
                <TestimonialsCard id={SIDE_TABS_DESKTOP.TESTIMONIALS_DESKTOP} />
                <LinksCard id={SIDE_TABS_DESKTOP.LINKS_DESKTOP} />
                <EventsCards id={SIDE_TABS_DESKTOP.EVENTS_DESKTOP} />
                <Reviews id={SIDE_TABS_DESKTOP.REVIEWS_DESKTOP} />
                <ReviewHighlightsCard
                  {...reviewData}
                  id={SIDE_TABS_DESKTOP.REVIEW_HIGHLIGHTS_DESKTOP}
                />
                <Similar id={SIDE_TABS_DESKTOP.SIMILAR_DESKTOP} />
                <DynamicMapCard id={SIDE_TABS_DESKTOP.MAP_DESKTOP} />
                <CultureSafety id={SIDE_TABS_DESKTOP.CULTURE_DESKTOP} />
                <CostSection id={SIDE_TABS_DESKTOP.COST_DESKTOP} />
                <MajorsCard id={SIDE_TABS_DESKTOP.MAJORS_DESKTOP} />
                <StudentsCard id={SIDE_TABS_DESKTOP.STUDENTS_DESKTOP} />
                <AcademicsCard id={SIDE_TABS_DESKTOP.ACADEMICS_DESKTOP} />
                <TeachersCard id={SIDE_TABS_DESKTOP.TEACHERS_DESKTOP} />
                <Activities id={SIDE_TABS_DESKTOP.ACTIVITIES_DESKTOP} />
                <SpotlightCard id={SIDE_TABS_DESKTOP.SPOTLIGHT_DESKTOP} />
                <CaseStudyCard id={SIDE_TABS_DESKTOP.CASE_STUDY_DESKTOP} />
                <AfterCollege id={SIDE_TABS_DESKTOP.AFTER_COLLEGE_DESKTOP} />
                <AreaCard id={SIDE_TABS_DESKTOP.AREA_DESKTOP} />
                <ProgramsCard id={SIDE_TABS_DESKTOP.PROGRAMS_DESKTOP} />
                <SocialMediaCard idDesktop={SIDE_TABS_DESKTOP.SOCIAL_MEDIA_DESKTOP} />
                <ComparisonCard idDesktop={SIDE_TABS_DESKTOP.COMPARISON_DESKTOP} />
                <ArticlesCard idDesktop={SIDE_TABS_DESKTOP.ARTICLES_DESKTOP} />
              </div>
            </div>
          </div>
        );
    }
  };
  
  return renderContent();
};

export default ContentDesktop;
