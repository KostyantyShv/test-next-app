"use client";
import React, { useState, useEffect, useRef } from "react";
import AdmissionsScatterPlotCard from "../cards/scatter-plot-card/ScatterPlotCard";
import AnnouncementsCard from "../cards/announcements-card/AnnouncementsCard";
import TestimonialsCard from "../cards/testimonials-card/TestimonialsCard";
import AdmissionsCard from "../cards/admissions-card/AdmissionsCard";
import OverviewCard from "../cards/overview-card/OverviewCard";
import EventsCards from "../cards/events-card/EventsCard";
import ReportCard from "../cards/report-card/ReportCard";
import AboutCard from "../cards/about-card/AboutCard";
import LinksCard from "../cards/links-card/LinksCard";
import RankCard from "../cards/rank-card/RankCard";

const SIDE_TABS = {
  MONTHLY_UPDATE: "Monthly Update",
  REPORT_CARD: "Report Card",
  ABOUT: "About",
  RANKINGS: "Rankings",
  ADMISSIONS: "Admissions",
  SCATTER_PLOT: "Scatter plot",
  OVERVIEW: "Overview",
  TESTIMONIALS: "Testimonials",
  LINKS: "Links",
  EVENTS: "Events",
};

const Content = () => {
  const [activeTab, setActiveTab] = useState(SIDE_TABS.MONTHLY_UPDATE);
  const observerRef = useRef<IntersectionObserver>(null);

  useEffect(() => {
    const sections = [
      {
        id: SIDE_TABS.MONTHLY_UPDATE,
        element: document.getElementById(SIDE_TABS.MONTHLY_UPDATE),
      },
      {
        id: SIDE_TABS.REPORT_CARD,
        element: document.getElementById(SIDE_TABS.REPORT_CARD),
      },
      {
        id: SIDE_TABS.ABOUT,
        element: document.getElementById(SIDE_TABS.ABOUT),
      },
      {
        id: SIDE_TABS.RANKINGS,
        element: document.getElementById(SIDE_TABS.RANKINGS),
      },
      {
        id: SIDE_TABS.ADMISSIONS,
        element: document.getElementById(SIDE_TABS.ADMISSIONS),
      },
      {
        id: SIDE_TABS.SCATTER_PLOT,
        element: document.getElementById(SIDE_TABS.SCATTER_PLOT),
      },
      {
        id: SIDE_TABS.OVERVIEW,
        element: document.getElementById(SIDE_TABS.OVERVIEW),
      },
      {
        id: SIDE_TABS.TESTIMONIALS,
        element: document.getElementById(SIDE_TABS.TESTIMONIALS),
      },
      {
        id: SIDE_TABS.LINKS,
        element: document.getElementById(SIDE_TABS.LINKS),
      },
      {
        id: SIDE_TABS.EVENTS,
        element: document.getElementById(SIDE_TABS.EVENTS),
      },
    ].filter((section) => section.element); // Filter out null elements

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-100px 0px -50% 0px", // Adjust this to control when the switch happens
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    sections.forEach((section) => {
      if (section.element) observer.observe(section.element);
    });

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="py-5 flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-20 self-start">
        <ul className="flex flex-col pl-[40px]">
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
      </div>
    </div>
  );
};

export default Content;
