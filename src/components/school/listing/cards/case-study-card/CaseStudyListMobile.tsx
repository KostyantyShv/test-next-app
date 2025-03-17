"use client";

import React, { useState } from "react";

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  tags: string[];
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Digital Transformation Initiative",
    description:
      "Led a comprehensive digital transformation project for a leading consulting firm, focusing on modernizing their workforce solutions platform and implementing cutting-edge..",
    date: "Sep 20, 2024",
    image: "https://i.ibb.co/J8QjpbD/school1.webp",
    tags: ["Digital", "Enterprise"],
  },
  {
    id: 2,
    title: "EduLearn Platform Evolution",
    description:
      "Spearheaded the redesign and optimization of an educational technology platform, resulting in a 75% increase in organic traffic and significantly improved user engagement metrics across all key performance indicators.",
    date: "Aug 15, 2024",
    image: "https://i.ibb.co/fVRCnNZY/school2.webp",
    tags: ["EdTech"],
  },
];

export default function CaseStudyListMobile({
  onViewClick,
}: {
  onViewClick: (id: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleSwipe = () => {
    const threshold = 50;
    if (
      touchStartX - touchEndX > threshold &&
      currentIndex < caseStudies.length - 1
    ) {
      setCurrentIndex(currentIndex + 1);
    }
    if (touchEndX - touchStartX > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFooterButtonClick = (index: number) => {
    switch (index) {
      case 0:
        console.log("View button clicked");
        onViewClick(index);
        break;
      case 1:
        console.log("Download button clicked");
        break;
      case 2:
        console.log("Share button clicked");
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-[#4A4A4A]">
      <div className="w-full h-fit bg-[#E1E7EE] overflow-y-auto relative shadow-[0_12px_24px_rgba(0,0,0,0.15)] rounded-[30px] scrollbar-hidden">
        <div className="p-6 pb-8 relative">
          <h2 className="text-2xl font-bold text-[#464646] mb-8 pl-3 relative before:content-[''] before:absolute before:left-0 before:top-2 before:h-4 before:w-1 before:bg-[#016853] before:rounded-sm">
            Case Studies
          </h2>

          <div className="mb-4 shadow-[0_8px_20px_rgba(1,104,83,0.15)] rounded-2xl overflow-visible">
            <div className="bg-gradient-to-br from-[#016853] to-[#089E68] rounded-t-2xl pt-6 px-4 pb-6 pl-[116px] text-white relative overflow-visible mt-8 shadow-[0_8px_20px_rgba(1,104,83,0.15)] min-h-[180px]">
              <div className="absolute w-[180px] h-[180px] bg-[rgba(255,255,255,0.05)] rounded-full -bottom-20 -right-15 z-[1]"></div>
              <div className="absolute top-[-24px] left-4 w-[90px] h-[90px] rounded-xl overflow-hidden border-4 border-[rgba(255,255,255,0.2)] shadow-[0_8px_20px_rgba(0,0,0,0.15)] z-[3]">
                <img
                  src={caseStudies[currentIndex].image}
                  alt={caseStudies[currentIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-[2]">
                <div className="text-xs font-medium uppercase tracking-wide opacity-90 mb-2">
                  {caseStudies[currentIndex].tags.join(", ")}
                </div>
                <h3 className="text-lg font-bold mb-3 leading-tight">
                  {caseStudies[currentIndex].title}
                </h3>
                <p className="text-sm leading-relaxed opacity-90 mb-4 line-clamp-3">
                  {caseStudies[currentIndex].description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-80">
                    {caseStudies[currentIndex].date}
                  </span>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white no-underline"
                  >
                    View Case Study
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M4.66669 11.3333L11.3334 4.66667M11.3334 4.66667H6.00002M11.3334 4.66667V10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-br from-[rgba(1,104,83,0.1)] to-[rgba(8,158,104,0.1)] rounded-b-2xl -mt-4 border-t border-[rgba(255,255,255,0.15)] shadow-[0_8px_20px_rgba(1,104,83,0.1)]">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 20 20" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.38189 10C5.24313 12.9154 7.45153 14.25 10 14.25C12.5485 14.25 14.7569 12.9154 16.6181 10C14.7569 7.0846 12.5485 5.75 10 5.75C7.45153 5.75 5.24313 7.0846 3.38189 10ZM1.85688 9.61413C3.94664 6.13119 6.65833 4.25 10 4.25C13.3417 4.25 16.0534 6.13119 18.1431 9.61413C18.2856 9.85164 18.2856 10.1484 18.1431 10.3859C16.0534 13.8688 13.3417 15.75 10 15.75C6.65833 15.75 3.94664 13.8688 1.85688 10.3859C1.71437 10.1484 1.71437 9.85164 1.85688 9.61413ZM8.29116 8.29116C8.74437 7.83795 9.35906 7.58333 10 7.58333C10.6409 7.58333 11.2556 7.83795 11.7088 8.29116C12.1621 8.74437 12.4167 9.35906 12.4167 10C12.4167 10.6409 12.1621 11.2556 11.7088 11.7088C11.2556 12.1621 10.6409 12.4167 10 12.4167C9.35906 12.4167 8.74437 12.1621 8.29116 11.7088C7.83795 11.2556 7.58333 10.6409 7.58333 10C7.58333 9.35906 7.83795 8.74437 8.29116 8.29116Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  ),
                  label: "View",
                  onClick: () => onViewClick(caseStudies[currentIndex].id),
                },
                {
                  icon: (
                    <svg fill="none" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M6 15a.75.75 0 01.75.75v.75c0 .414.336.75.75.75h9a.75.75 0 00.75-.75v-.75a.75.75 0 011.5 0v.75a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-.75A.75.75 0 016 15z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M8.47 10.72a.75.75 0 011.06 0L12 13.19l2.47-2.47a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M12 5.25a.75.75 0 01.75.75v7.875a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  ),
                  label: "Download",
                  onClick: () => console.log("Download button clicked"),
                },
                {
                  icon: (
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6c.6.8 1.6 1.4 2.8 1.4 1.9 0 3.4-1.6 3.4-3.5 0-2-1.5-3.5-3.4-3.5s-3.5 1.5-3.5 3.5c0 .3 0 .6.1.9L7.1 7.7l-.2.1c-.7-.7-1.6-1.2-2.7-1.2C2.3 6.6.7 8.1.7 10s1.5 3.5 3.5 3.5c1 0 1.9-.4 2.6-1.1l5.6 3c-.1.3-.1.5-.1.8 0 1.9 1.6 3.4 3.5 3.4s3.4-1.5 3.4-3.5-1.5-3.4-3.4-3.4c-1.2 0-2.2.6-2.9 1.5l-5.3-2.8-.2-.1c.1-.4.2-.8.2-1.2s-.1-.8-.2-1.1zm2.8-4.1c1.1 0 2.1 1 2.1 2.1.1 1-.9 2-2.1 2s-2.1-1-2.1-2.1 1-2 2.1-2M4.2 12.1c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1S6.3 9 6.3 10s-1 2.1-2.1 2.1m11.6 6.1c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1 2.1 1 2.1 2.1-.9 2.1-2.1 2.1"></path>
                    </svg>
                  ),
                  label: "Share",
                  onClick: () => console.log("Download button clicked"),
                },
              ].map((btn, index) => (
                <button
                  key={index}
                  onClick={btn.onClick}
                  className="flex flex-col items-center gap-1.5 bg-transparent border-none text-[#016853] text-xs font-medium cursor-pointer p-2 rounded-lg transition-colors hover:bg-[rgba(255,255,255,0.2)]"
                >
                  {React.cloneElement(btn.icon, {
                    className: "w-5 h-5 text-[#016853]",
                  })}
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              {caseStudies.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                    currentIndex === index
                      ? "bg-[#016853] scale-125"
                      : "bg-[#DFDDDB]"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  currentIndex > 0 && setCurrentIndex(currentIndex - 1)
                }
                className={`w-9 h-9 rounded-full bg-white flex items-center justify-center border border-[#E0E0E0] transition-colors ${
                  currentIndex === 0
                    ? "opacity-50 cursor-default"
                    : "hover:bg-[#F8F9FD]"
                }`}
                disabled={currentIndex === 0}
              >
                <svg
                  className="w-5 h-5 text-[#464646]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() =>
                  currentIndex < caseStudies.length - 1 &&
                  setCurrentIndex(currentIndex + 1)
                }
                className={`w-9 h-9 rounded-full bg-white flex items-center justify-center border border-[#E0E0E0] transition-colors ${
                  currentIndex === caseStudies.length - 1
                    ? "opacity-50 cursor-default"
                    : "hover:bg-[#F8F9FD]"
                }`}
                disabled={currentIndex === caseStudies.length - 1}
              >
                <svg
                  className="w-5 h-5 text-[#464646]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
