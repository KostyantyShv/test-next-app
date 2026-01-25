"use client";

import React, { useState, useEffect } from "react";

interface AreaModalProps {
  onClose: () => void;
}

const AreaModal: React.FC<AreaModalProps> = ({ onClose }) => {
  const [isPlacesExpanded, setIsPlacesExpanded] = useState(false);
  const [isRankingsExpanded, setIsRankingsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("Public Schools");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="w-full h-full md:max-w-[1100px] md:h-[90vh] bg-white md:rounded-2xl relative shadow-[0_4px_24px_rgba(0,0,0,0.15)] transition-all duration-300 ease-in-out">
      {/* Header - Sticky */}
      <div className="sticky top-0 bg-[#016853] text-white p-4 md:p-6 flex justify-between items-center z-50 border-b border-white/10">
        <div>
          <h1 className="text-xl md:text-3xl font-bold m-0">Panama City</h1>
          <p className="mt-1 md:mt-2 text-sm md:text-base font-normal opacity-90">
            Florida
          </p>
        </div>
        <button
          onClick={onClose}
          className="bg-transparent border-none text-white text-2xl md:text-3xl cursor-pointer w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.1)] transition duration-300"
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-93px)] md:max-h-[calc(90vh-93px)] overflow-y-auto p-4 md:p-8">
        {/* Section 1: Living in the Area */}
        <div className="mb-4 md:mb-7">
          <h2 className="mb-3 md:mb-4 text-lg md:text-[22px] text-[#016853] font-semibold">
            Living in the Area
          </h2>
          <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] md:shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.05)] overflow-hidden">
            <div className="h-[6px] bg-gradient-to-r from-[#016853] to-[#089E68] mb-0 rounded-t-xl" />
            <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-8">
              <div className="flex-shrink-0 w-full md:w-[200px] flex flex-row md:flex-col max-md:gap-4 items-center">
                <div className="w-14 md:w-20 h-14 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-4xl font-bold text-white bg-[#4CAF50] mb-3">
                  B
                </div>
                <div>
                  <div className="text-sm md:text-[15px] text-[#464646] md:text-center font-medium">
                    Overall SchoolScout Grade
                  </div>
                </div>
              </div>
              <div className="flex-grow">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { grade: "B", subject: "Public Schools", bg: "#4CAF50" },
                    { grade: "C-", subject: "Crime & Safety", bg: "#FF9800" },
                    { grade: "B-", subject: "Housing", bg: "#8BC34A" },
                    { grade: "A", subject: "Nightlife", bg: "#1ad598" },
                    {
                      grade: "B-",
                      subject: "Good for Families",
                      bg: "#8BC34A",
                    },
                    { grade: "A", subject: "Diversity", bg: "#1ad598" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 md:gap-4"
                    >
                      <div
                        className="w-8 md:w-10 h-8 md:h-10 rounded-full flex items-center justify-center font-bold text-white text-sm md:text-base"
                        style={{ backgroundColor: item.bg }}
                      >
                        {item.grade}
                      </div>
                      <div className="text-sm md:text-[15px] text-[#464646] font-medium">
                        {item.subject}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-4 md:px-6 pb-4 md:pb-6 flex flex-col md:flex-row md:items-center md:justify-center gap-2 md:gap-4">
              <a
                href="#"
                className="text-xs md:text-[13px] text-[#346DC2] no-underline hover:underline text-center md:text-left"
              >
                How are grades calculated?
              </a>
              <a
                href="#"
                className="text-xs md:text-[13px] text-[#346DC2] no-underline hover:underline text-center md:text-left"
              >
                Data Sources
              </a>
            </div>
          </div>
        </div>

        {/* Section 2: Panama City Info */}
        <div className="mb-4 md:mb-7">
          <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] md:shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.05)] overflow-hidden">
            <div className="h-[6px] bg-gradient-to-r from-[#016853] to-[#089E68] mb-0 rounded-t-xl" />
            <div className="p-4 md:p-6">
              <p className="mb-4 md:mb-5 text-sm md:text-base leading-[1.5] md:leading-[1.6]">
                Panama City is a town in Florida with a population of 34,211.
                Panama City is in Bay County. Living in Panama City offers
                residents a dense suburban feel and most residents own their
                homes. In Panama City there are a lot of parks. Many families
                and young professionals live in Panama City and residents tend
                to lean conservative. The public schools in Panama City are
                above average.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[
                  {
                    label: "Median Household Income",
                    value: "$61,125",
                    subvalue: "Natl. $78,538",
                  },
                  {
                    label: "Median Rent",
                    value: "$1,334",
                    subvalue: "Natl. $1,348",
                  },
                  {
                    label: "Median Home Value",
                    value: "$243,200",
                    subvalue: "Natl. $303,400",
                  },
                  { label: "Population", value: "34,211" },
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="text-sm md:text-[15px] text-[#4A4A4A] mb-2">
                      {stat.label}
                    </div>
                    <div className="text-xl md:text-4xl font-bold text-[#464646] mb-1">
                      {stat.value}
                    </div>
                    {stat.subvalue && (
                      <div className="text-xs md:text-sm text-[#5F5F5F]">
                        {stat.subvalue}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Panama City Rankings */}
        <div className="mb-4 md:mb-7">
          
          <div className="w-full md:w-[95%] max-w-[1000px] mx-auto bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] md:shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.05)] overflow-hidden">
            <div className="h-[6px] bg-gradient-to-r from-[#016853] to-[#089E68] rounded-t-xl" />
            <div className="p-4 md:p-7">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-4 md:mb-6">
                <svg
                  viewBox="0 0 33 36"
                  fill="none"
                  className="w-12 md:w-[60px] h-12 md:h-[60px]"
                >
                  <path
                    d="M0 12.847v10.306c0 2.772 1.464 5.318 3.878 6.734l8.662 5.05a7.91 7.91 0 0 0 7.92 0l8.662-5.05A7.81 7.81 0 0 0 33 23.153V12.847c0-2.772-1.464-5.317-3.878-6.734l-8.662-5.05a7.91 7.91 0 0 0-7.92 0l-8.662 5.05A7.81 7.81 0 0 0 0 12.847"
                    fill="#089E68"
                  />
                  <g transform="translate(7 8)">
                    <g
                      clipPath="url(#TopProductSmall_svg__a)"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      stroke="#fff"
                    >
                      <path d="M7.125 16.625h4.75M9.5 12.294v4.33M4.75 9.5h-.754c-.64 0-1.254-.286-1.706-.795a2.9 2.9 0 0 1-.707-1.92V5.43c0-.18.064-.353.177-.48a.57.57 0 0 1 .426-.199H4.6M14.25 9.5h.754c.64 0 1.254-.286 1.706-.795.453-.509.707-1.2.707-1.92V5.43a.72.72 0 0 0-.177-.48.57.57 0 0 0-.426-.199H14.4" />
                      <path
                        d="M4.75 3.167h9.5v4.408c0 2.773-2.095 5.07-4.714 5.092a4.5 4.5 0 0 1-1.829-.372 4.7 4.7 0 0 1-1.553-1.088 5.1 5.1 0 0 1-1.039-1.636 5.3 5.3 0 0 1-.365-1.933z"
                        fill="#fff"
                      />
                    </g>
                  </g>
                </svg>
                <div className="flex-grow">
                  <h2 className="text-xl md:text-2xl font-bold text-[#016853] mb-2">
                    Panama City Rankings
                  </h2>
                  <p className="text-sm md:text-[15px] text-[#5F5F5F] leading-[1.5] md:leading-[1.6]">
                    SkoolScout rankings are based on rigorous analysis of key
                    statistics from the U.S. Department of Education and
                    millions of reviews.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-6">
                {[
                  {
                    number: "#262",
                    title: "Most Diverse Places to Live in Florida",
                    total: "1,200",
                  },
                  {
                    number: "#353",
                    title: "Places with the Lowest Cost of Living in Florida",
                    total: "1,196",
                  },
                  {
                    number: "#441",
                    title: "Best Places to Retire in Florida",
                    total: "662",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="relative bg-gradient-to-b from-[rgba(1,104,83,0.03)] to-transparent rounded-xl p-4 md:p-6 flex flex-row md:flex-col md:items-center max-md:gap-4 md:text-center hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out"
                  >
                    <div className="w-12 md:w-[60px] h-12 md:h-[60px] bg-[#ecf9f4] border-2 border-[#00c87c] rounded-full flex items-center justify-center mb-4 md:mb-5 flex-shrink-0 aspect-square">
                      <span className="text-[#00a96c] text-base md:text-xl font-bold">
                        {item.number}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-sm md:text-[15px] text-[#346DC2] font-semibold leading-[1.4] md:mb-3">
                        {item.title}
                      </h2>
                      <div className="flex items-baseline gap-1 md:justify-center">
                        <span className="text-[#016853] text-base md:text-xl font-bold">
                          {item.number}
                        </span>
                        <span className="text-[#5F5F5F] text-sm md:text-base">
                          of {item.total}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className={`${
                  isRankingsExpanded ? "grid" : "hidden"
                } grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-7`}
              >
                {[
                  {
                    number: "#512",
                    title: "Best Places to Raise a Family in Florida",
                    total: "1,173",
                  },
                  {
                    number: "#487",
                    title: "Places with the Best Public Schools in Florida",
                    total: "824",
                  },
                  {
                    number: "#329",
                    title: "Best Places to Buy a House in Florida",
                    total: "815",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="relative bg-gradient-to-b from-[rgba(1,104,83,0.03)] to-transparent rounded-xl p-4 md:p-6 flex flex-row md:flex-col md:items-center max-md:gap-4 md:text-center hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out"
                  >
                    <div className="w-12 md:w-[60px] h-12 md:h-[60px] bg-[#ecf9f4] border-2 border-[#00c87c] rounded-full flex items-center justify-center mb-4 md:mb-5 flex-shrink-0 aspect-square">
                      <span className="text-[#00a96c] text-base md:text-xl font-bold">
                        {item.number}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-sm md:text-[15px] text-[#346DC2] font-semibold leading-[1.4] md:mb-3">
                        {item.title}
                      </h2>
                      <div className="flex items-baseline gap-1 md:justify-center">
                        <span className="text-[#016853] text-base md:text-xl font-bold">
                          {item.number}
                        </span>
                        <span className="text-[#5F5F5F] text-sm md:text-base">
                          of {item.total}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[rgba(0,0,0,0.08)] pt-4 md:pt-5 mt-4 md:mt-6 flex justify-center md:justify-end">
                <button
                  onClick={() => setIsRankingsExpanded(!isRankingsExpanded)}
                  className="text-[#346DC2] text-sm md:text-[15px] font-semibold flex items-center gap-2 py-2 px-4 rounded-lg bg-[rgba(52,109,194,0.05)] hover:text-[#1D77BD] hover:bg-[rgba(52,109,194,0.1)] transition-all duration-200"
                >
                  {isRankingsExpanded
                    ? "View Less Panama City Rankings"
                    : "See All Panama City Rankings"}
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      fill="currentColor"
                      d={
                        isRankingsExpanded
                          ? "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"
                          : "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                      }
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Crime & Safety */}
        <div className="mb-4 md:mb-7">
          <h2 className="mb-3 md:mb-4 text-xl md:text-[22px] mx-0 md:mx-6 text-[#016853] font-semibold mt-4">
            Crime & Safety
          </h2>
          <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] md:shadow-none p-4 md:px-8">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-8 md:w-10 h-8 md:h-10 rounded-full flex items-center justify-center font-bold text-white bg-[#FF9800] text-sm md:text-base">
                C-
              </div>
              <div className="text-sm md:text-lg font-semibold text-[#016853]">
                Based on violent and property crime rates.
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-base md:text-base text-[#464646] mb-3 md:mb-4 font-semibold">
                  Violent Crimes
                </h3>
                <p className="text-xs md:text-[15px] mb-3 md:mb-4">
                  Calculated annually per 100,000 residents
                </p>
                {[
                  { label: "Assault", value: "505.9", natl: "282.7" },
                  { label: "Murder", value: "2.8", natl: "6.1" },
                  { label: "Rape", value: "121.5", natl: "40.7" },
                  { label: "Robbery", value: "48", natl: "135.5" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 md:py-2.5 border-b border-[rgba(0,0,0,0.08)]"
                  >
                    <span className="text-sm md:text-[15px] text-[#4A4A4A]">
                      {item.label}
                    </span>
                    <span className="text-sm md:text-[15px] text-[#464646] font-medium">
                      {item.value}{" "}
                      <span className="text-xs md:text-sm text-[#5F5F5F] ml-2">
                        Natl. {item.natl}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-base md:text-base text-[#464646] mb-3 md:mb-4 font-semibold">
                  Property Crimes
                </h3>
                <p className="text-xs md:text-[15px] mb-3 md:mb-4">
                  Calculated annually per 100,000 residents
                </p>
                {[
                  { label: "Burglary", value: "474.8", natl: "500.1" },
                  { label: "Theft", value: "2,212.9", natl: "2,042.8" },
                  {
                    label: "Motor Vehicle Theft",
                    value: "220.4",
                    natl: "284",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 md:py-2.5 border-b border-[rgba(0,0,0,0.08)]"
                  >
                    <span className="text-sm md:text-[15px] text-[#4A4A4A]">
                      {item.label}
                    </span>
                    <span className="text-sm md:text-[15px] text-[#464646] font-medium">
                      {item.value}{" "}
                      <span className="text-xs md:text-sm text-[#5F5F5F] ml-2">
                        Natl. {item.natl}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Residents */}
        <div className="mb-4 md:mb-7">
          <h2 className="mb-3 md:mb-4 text-xl md:text-[22px] mx-0 md:mx-6 text-[#016853] font-semibold mt-4">
            Residents
          </h2>
          <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] md:shadow-none p-4 md:px-8">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-8 md:w-10 h-8 md:h-10 rounded-full flex items-center justify-center font-bold text-white bg-[#1ad598] text-sm md:text-base">
                A
              </div>
              <div className="text-sm md:text-lg font-semibold text-[#016853]">
                Diversity - Based on ethnic and economic diversity.
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-base md:text-base text-[#464646] mb-3 md:mb-4 font-semibold">
                  Age
                </h3>
                {[
                  { label: "<10 years", value: "12%" },
                  { label: "10-17 years", value: "11%" },
                  { label: "18-24 years", value: "8%" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 md:py-2.5 border-b border-[rgba(0,0,0,0.08)]"
                  >
                    <span className="text-sm md:text-[15px] text-[#4A4A4A]">
                      {item.label}
                    </span>
                    <span className="text-sm md:text-[15px] text-[#464646] font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
                <div className="text-center mt-3 md:mt-4">
                  <a
                    href="#"
                    className="text-[#346DC2] bg-[rgba(52,_109,_194,_0.05)] text-xs md:text-sm font-medium flex items-center px-3 py-2 rounded-md gap-2 hover:underline"
                  >
                    More
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path
                        fill="currentColor"
                        d="M10.5 5.5L16 11H4v2h12l-5.5 5.5L12 20l8-8-8-8z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-base text-[#464646] mb-3 md:mb-4 font-semibold">
                  Education Levels
                </h3>
                {[
                  {
                    label: "Master's degree or higher",
                    value: "9%",
                    natl: "14%",
                  },
                  { label: "Bachelor's degree", value: "17%", natl: "21%" },
                  {
                    label: "Some college or associate's degree",
                    value: "36%",
                    natl: "28%",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 md:py-2.5 border-b border-[rgba(0,0,0,0.08)]"
                  >
                    <span className="text-sm md:text-[15px] text-[#4A4A4A]">
                      {item.label}
                    </span>
                    <span className="text-sm md:text-[15px] text-[#464646] font-medium">
                      {item.value}{" "}
                      <span className="text-xs md:text-sm text-[#5F5F5F] ml-2">
                        Natl. {item.natl}
                      </span>
                    </span>
                  </div>
                ))}
                <div className="text-center mt-3 md:mt-4">
                  <a
                    href="#"
                    className="text-[#346DC2] px-3 py-2 rounded-md bg-[rgba(52,_109,_194,_0.05)] text-xs md:text-sm font-medium flex items-center gap-2 hover:underline"
                  >
                    More
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path
                        fill="currentColor"
                        d="M10.5 5.5L16 11H4v2h12l-5.5 5.5L12 20l8-8-8-8z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right mt-4 md:mt-6">
              <a
                href="#"
                className="text-[#346DC2] px-3 py-2 rounded-md bg-[rgba(52,_109,_194,_0.05)] text-sm md:text-[15px] font-medium flex items-center gap-2 hover:underline"
              >
                More About Panama City Residents
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M10.5 5.5L16 11H4v2h12l-5.5 5.5L12 20l8-8-8-8z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Section 6: Working in Panama City */}
        <div className="mb-4 md:mb-7">
          <h2 className="mb-3 md:mb-4 text-xl md:text-[22px] mx-0 md:mx-6 text-[#016853] font-semibold mt-4">
            Working in Panama City
          </h2>
          <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] md:shadow-none p-4 md:px-8">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-8 md:w-10 h-8 md:h-10 rounded-full flex items-center justify-center font-bold text-white bg-[#4CAF50] text-sm md:text-base">
                B
              </div>
              <span className="text-xs md:text-[15px] text-[#4A4A4A]">
                Jobs - Based on employment rates, job and business growth, and
                cost of living.
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <div className="text-sm md:text-[15px] text-[#4A4A4A] mb-2">
                  Median Household Income
                </div>
                <div className="text-2xl md:text-4xl font-bold text-[#464646] mb-1">
                  $61,125
                </div>
                <div className="text-xs md:text-sm text-[#5F5F5F] mb-3 md:mb-4">
                  Natl. $78,538
                </div>
                <a
                  href="#"
                  className="inline-block bg-[#EBFCF4] text-[#016853] no-underline py-2 md:py-2.5 px-3 md:px-4 rounded-lg font-medium hover:bg-[#D7F7E9] transition duration-300 text-sm md:text-base"
                >
                  Search for Jobs in Panama City
                </a>
              </div>
              <div>
                <h3 className="text-base md:text-base text-[#016853] mb-3 md:mb-4 font-semibold">
                  Places to Work in Panama City
                </h3>
                {[
                  {
                    name: "Gulf Coast Regional Medical Center",
                    stars: "★★★★",
                    reviews: "(3)",
                  },
                  {
                    name: "Bay Medical Center Sacred Heart Health System",
                    stars: "★★★",
                    reviews: "(2)",
                  },
                  { name: "Express Lane", stars: "★★", reviews: "(1)" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 md:py-3 border-b border-[rgba(0,0,0,0.08)]"
                  >
                    <a
                      href="#"
                      className="text-sm md:text-[15px] text-[#346DC2] font-semibold no-underline hover:underline"
                    >
                      {item.name}
                    </a>
                    <div className="flex items-center gap-1">
                      <span className="text-[#00DF8B] text-sm md:text-base">
                        {item.stars}
                      </span>
                      <span className="text-xs md:text-[13px] text-[#5F5F5F]">
                        {item.reviews}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Schools */}
        <div className="mb-4 md:mb-7">
          <h2 className="mb-3 md:mb-4 text-xl md:text-[22px] mx-0 md:mx-6 text-[#016853] font-semibold mt-4">
            Schools
          </h2>
          <div className="w-full md:w-[95%] max-w-[1000px] mx-auto bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] md:shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.05)] overflow-hidden">
            <div className="h-[6px] bg-gradient-to-r from-[#016853] to-[#089E68] rounded-t-xl" />
            <div className="px-4 md:px-7">
              <div className="flex border-b border-[rgba(0,0,0,0.08)] mb-4 md:mb-6">
                {["Public Schools", "Private Schools"].map((tab) => (
                  <div
                    key={tab}
                    className={`py-2 md:py-3 px-4 md:px-6 text-sm md:text-base font-medium text-[#4A4A4A] cursor-pointer transition-all duration-300 ${
                      activeTab === tab
                        ? "text-[#016853] border-b-2 font-semibold md:border-b-2 border-[#016853]"
                        : ""
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-base md:text-lg text-[#016853] mb-3 md:mb-4 font-semibold">
                  Top {activeTab} Serving Panama City
                </h3>
                {activeTab === "Public Schools"
                  ? [
                      {
                        grade: "A+",
                        name: "Rising Leaders Academy",
                        stars: "★★★★",
                        reviews: "29 reviews",
                        bg: "#00DF8B",
                      },
                      {
                        grade: "A",
                        name: "North Bay Haven Charter Academy High School",
                        stars: "★★★★",
                        reviews: "176 reviews",
                        bg: "#1ad598",
                      },
                      {
                        grade: "A",
                        name: "University Academy",
                        stars: "★★★★★",
                        reviews: "2 reviews",
                        bg: "#1ad598",
                      },
                      {
                        grade: "A-",
                        name: "North Bay Haven Charter Academy Middle School",
                        stars: "★★",
                        reviews: "1 review",
                        bg: "#1ad598",
                      },
                      {
                        grade: "A-",
                        name: "Bay Haven Charter Academy Elementary School",
                        stars: "★★★★★",
                        reviews: "1 review",
                        bg: "#1ad598",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center py-2 md:py-3 border-b border-[rgba(0,0,0,0.08)]"
                      >
                        <div
                          className="w-8 md:w-9 h-8 md:h-9 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold text-white mr-3 md:mr-4 flex-shrink-0"
                          style={{ backgroundColor: item.bg }}
                        >
                          {item.grade}
                        </div>
                        <a
                          href="#"
                          className="text-sm md:text-[15px] text-[#346DC2] font-medium no-underline hover:underline flex-grow"
                        >
                          {item.name}
                        </a>
                        <div className="flex items-center max-md:flex-col gap-1">
                          <span className="text-[#00DF8B] text-sm md:text-base">
                            {item.stars}
                          </span>
                          <span className="text-xs md:text-[13px] text-[#5F5F5F]">
                            {item.reviews}
                          </span>
                        </div>
                      </div>
                    ))
                  : [
                      {
                        grade: "A",
                        name: "Holy Nativity Episcopal School",
                        stars: "★★★★★",
                        reviews: "5 reviews",
                        bg: "#1ad598",
                      },
                      {
                        grade: "B+",
                        name: "St. John Catholic School",
                        stars: "★★★★",
                        reviews: "3 reviews",
                        bg: "#4CAF50",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center py-2 md:py-3 border-b border-[rgba(0,0,0,0.08)]"
                      >
                        <div
                          className="w-8 md:w-9 h-8 md:h-9 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold text-white mr-3 md:mr-4 flex-shrink-0"
                          style={{ backgroundColor: item.bg }}
                        >
                          {item.grade}
                        </div>
                        <a
                          href="#"
                          className="text-sm md:text-[15px] text-[#346DC2] font-medium no-underline hover:underline flex-grow"
                        >
                          {item.name}
                        </a>
                        <div className="flex items-center gap-1">
                          <span className="text-[#00DF8B] text-sm md:text-base">
                            {item.stars}
                          </span>
                          <span className="text-xs md:text-[13px] text-[#5F5F5F]">
                            {item.reviews}
                          </span>
                        </div>
                      </div>
                    ))}
              </div>
              <div className="flex justify-end md:text-right mt-3 md:mt-4 mb-4 md:mb-7">
                <a
                  href="#"
                  className="text-[#346DC2] w-fit px-3 py-2 rounded-md bg-[rgba(52,_109,_194,_0.05)] text-xs md:text-sm font-medium flex items-center justify-center md:justify-end gap-2 hover:underline"
                >
                  {activeTab === "Public Schools"
                    ? "See All 29 Public Schools in Panama City"
                    : "See All 8 Private Schools in Panama City"}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 10.668L2.668 5.33599L3.33533 4.66866L8 9.33332L12.6647 4.66866L13.332 5.33599L8 10.668Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section 8: Places like Panama City */}
        <div className="mb-4 md:mb-7">
          <h2 className="mb-3 md:mb-4 text-xl md:text-[22px] mx-0 md:mx-6 text-[#016853] font-semibold mt-4">
            Places like Panama City
          </h2>
          <div className="w-full md:w-[95%] max-w-[1000px] mx-auto bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] md:shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.05)] overflow-hidden">
            <div className="h-[6px] bg-gradient-to-r from-[#016853] to-[#089E68] rounded-t-xl" />
            <div className="px-4 md:px-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5 mt-4 md:mt-6">
                {[
                  {
                    img: "https://i.ibb.co/J8QjpbD/school1.webp",
                    name: "Callaway",
                    grade: "B",
                    stats: "Florida • Bay County • Population 15,897",
                    bg: "#4CAF50",
                  },
                  {
                    img: "https://i.ibb.co/fVRCnNZY/school2.webp",
                    name: "Springfield",
                    grade: "B-",
                    stats: "Florida • Bay County • Population 8,702",
                    bg: "#8BC34A",
                  },
                  {
                    img: "https://i.ibb.co/fzzhd5tf/school4.webp",
                    name: "Laguna Beach",
                    grade: "B+",
                    stats: "Florida • Bay County • Population 3,917",
                    bg: "#4CAF50",
                  },
                  {
                    img: "https://i.ibb.co/J8QjpbD/school1.webp",
                    name: "Upper Grand Lagoon",
                    grade: "A-",
                    stats: "Florida • Bay County • Population 16,461",
                    bg: "#1ad598",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex p-3 md:p-4 border border-[rgba(0,0,0,0.08)] rounded-lg hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.12)] transition-all duration-200"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 md:w-[60px] h-12 md:h-[60px] object-cover rounded-md mr-3 md:mr-4 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm md:text-base font-semibold text-[#464646]">
                          {item.name}
                        </span>
                        <div
                          className="w-5 md:w-6 h-5 md:h-6 rounded-full flex items-center justify-center text-white font-semibold text-xs"
                          style={{ backgroundColor: item.bg }}
                        >
                          {item.grade}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 md:gap-3 items-center text-xs md:text-[13px] text-[#5F5F5F]">
                        {item.stats}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className={`${
                  isPlacesExpanded ? "grid" : "hidden"
                } grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5`}
              >
                {[
                  {
                    img: "https://i.ibb.co/fVRCnNZY/school2.webp",
                    name: "Lynn Haven",
                    grade: "A-",
                    stats: "Florida • Bay County • Population 21,287",
                    bg: "#1ad598",
                  },
                  {
                    img: "https://i.ibb.co/fzzhd5tf/school4.webp",
                    name: "Southport",
                    grade: "B",
                    stats: "Florida • Bay County • Population 7,891",
                    bg: "#4CAF50",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex p-3 md:p-4 border border-[rgba(0,0,0,0.08)] rounded-lg hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.12)] transition-all duration-200"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 md:w-[60px] h-12 md:h-[60px] object-cover rounded-md mr-3 md:mr-4 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm md:text-base font-semibold text-[#464646]">
                          {item.name}
                        </span>
                        <div
                          className="w-5 md:w-6 h-5 md:h-6 rounded-full flex items-center justify-center text-white font-semibold text-xs"
                          style={{ backgroundColor: item.bg }}
                        >
                          {item.grade}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 md:gap-3 items-center text-xs md:text-[13px] text-[#5F5F5F]">
                        {item.stats}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsPlacesExpanded(!isPlacesExpanded)}
                className="w-full flex items-center justify-center gap-2 text-[#346DC2] text-sm md:text-[15px] font-semibold py-2 md:py-3 hover:text-[#1D77BD] transition duration-200"
              >
                {isPlacesExpanded ? "View Less" : "View More"}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d={
                      isPlacesExpanded
                        ? "M8 5.33203L13.332 10.664L12.6647 11.3313L8 6.66669L3.33533 11.3313L2.668 10.664L8 5.33203Z"
                        : "M8 10.668L2.668 5.33599L3.33533 4.66866L8 9.33332L12.6647 4.66866L13.332 5.33599L8 10.668Z"
                    }
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaModal;
