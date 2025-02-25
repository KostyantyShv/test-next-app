"use client";
import React, { useState } from "react";
import AnnouncementsCard from "../announcements-card/Announcements";
import ReportCard from "../report-card/ReportCard";
import RankCard from "../rank-card/RankCard";
import AboutSection from "../about/About";

const SIDE_TABS = {
  MONTHLY_UPDATE: "Monthly Update",
  REPORT_CARD: "Report Card",
  ABOUT: "About",
  ENROLLING: "Enrolling",
  FROM_THE_SCHOOL: "From the School",
  UPCOMING_EVENTS: "Upcoming Events",
  RANKINGS: "Rankings",
  ACADEMICS: "Academics",
  MAP: "Map",
  HOME_LISTINGS: "Home Listings",
  LIVING_IN_THE_AREA: "Living in the Area",
  CULTURE_AND_SAFETY: "Culture & Safety",
  STUDENTS: "Students",
  TEACHERS: "Teachers",
  CLUBS_AND_ACTIVITIES: "Clubs & Activities",
  REVIEWS: "Reviews",
};

const Content = () => {
  const [activeTab, setActiveTab] = useState(SIDE_TABS.MONTHLY_UPDATE);

  const renderContent = () => {
    switch (activeTab) {
      case SIDE_TABS.MONTHLY_UPDATE:
        return <AnnouncementsCard />;
      case SIDE_TABS.REPORT_CARD:
        return <ReportCard />;
      case SIDE_TABS.RANKINGS:
        return <RankCard />;
      case SIDE_TABS.ABOUT:
        return <AboutSection />;
      default:
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold">{activeTab}</h2>
            <p>Content for {activeTab} coming soon...</p>
          </div>
        );
    }
  };
  return (
    <div className="py-5 flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-64 flex-shrink-0">
        <ul className="flex flex-col pl-0 md:pl-10">
          {Object.values(SIDE_TABS).map((value, index) => (
            <li
              key={index}
              onClick={() => setActiveTab(value)}
              className={`py-2 cursor-pointer relative flex items-center text-[#5F5F5F] text-sm sm:text-base ${
                activeTab === value
                  ? 'text-[#0B6333] font-semibold before:content-[""] before:w-2 before:h-2 before:bg-[#0B6333] before:rounded-full before:absolute before:left-[-20px] before:top-1/2 before:transform before:-translate-y-1/2 md:before:block before:hidden'
                  : ""
              }`}
            >
              {value}
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex-1">
        {renderContent()} {/* Render the active component */}
      </div>
    </div>
  );
};

export default Content;
