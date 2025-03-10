"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { mockAnnouncements } from "./mock";

const Announcements: React.FC<{ id: string }> = ({ id }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const secondAnnouncementRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleViewMore = () => {
    setIsExpanded(true);
    secondAnnouncementRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewLess = () => {
    setIsExpanded(false);
    headerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id={id} className="flex justify-center items-center">
      <div className="w-full max-w-[375px] md:max-w-[875px] bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex items-start p-4 md:p-6 md:items-center border-b border-[#f0f0f0]"
        >
          <Image
            src="https://i.ibb.co/4nYXBCkZ/megaphone.webp"
            alt="Megaphone"
            width={32}
            height={32}
            className="w-8 h-8 md:w-10 md:h-10 mr-3 md:mr-4 object-contain"
          />
          <div className="flex-1">
            <h1 className="text-[#016853] md:text-[#464646] text-xl md:text-2xl font-semibold">
              Monthly Update
            </h1>
          </div>
        </div>

        {/* Announcements */}
        <div className="flex flex-col">
          {mockAnnouncements.map((announcement, index) => (
            <div
              key={announcement.id}
              ref={index === 1 ? secondAnnouncementRef : null}
              className={`${
                index > 0 && !isExpanded ? "hidden" : ""
              } relative p-4 md:p-6`}
            >
              {announcement.isPinned && (
                <div className="inline-flex items-center gap-2 bg-[#EBFCF4] text-[#016853] font-semibold text-[13px] md:text-sm px-4 py-2 rounded mb-3 md:mb-4">
                  <svg fill="none" viewBox="0 0 20 20" width={16} height={16}>
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      stroke="#016853"
                      d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5"
                    />
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      stroke="#016853"
                      d="M7.5 12.5L3.75 16.25"
                    />
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      stroke="#016853"
                      d="M12.084 3.33398L16.6673 7.91732"
                    />
                  </svg>
                  Pinned
                </div>
              )}
              <div className="flex gap-3 md:gap-3 mb-3">
                <Image
                  src={announcement.author.avatar}
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="text-[#464646] md:text-[#262B3D] font-semibold text-sm flex items-center">
                    {announcement.author.name}
                    {announcement.author.isVerified && (
                      <span className="hidden md:inline-flex ml-1 text-[#1D77BD]">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          width={16}
                          height={16}
                        >
                          <path
                            d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className="text-[#5F5F5F] text-xs md:text-sm">
                    {announcement.author.role}{" "}
                    <span className="hidden md:inline">•</span>
                    <span className="inline-block w-[3px] h-[3px] bg-[#5F5F5F] rounded-full mx-[6px] align-middle md:hidden" />
                    {announcement.timestamp}
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-4 mb-3 md:mb-4">
                <div className="text-[#4A4A4A] md:text-[#262B3D] text-sm leading-relaxed flex-1">
                  {announcement.content}
                  <a
                    href={announcement.link.url}
                    className="text-[#346DC2] font-medium ml-1 hover:text-[#275293] hover:underline"
                  >
                    {announcement.link.text}
                  </a>
                </div>
                {announcement.image && (
                  <Image
                    src={announcement.image}
                    alt="Announcement image"
                    width={120}
                    height={80}
                    className="w-full md:w-[120px] h-[160px] md:h-[80px] rounded-lg object-cover mt-3 md:mt-0"
                  />
                )}
              </div>
              {index === 0 && (
                <div className="flex justify-center mt-3 md:mt-4">
                  <button
                    onClick={handleViewMore}
                    className={`${
                      isExpanded ? "hidden" : "flex"
                    } items-center gap-2 bg-[#EBFCF4] text-[#016853] font-medium text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full hover:bg-[#D7F7E9] transition-colors`}
                  >
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                      <path
                        d="M19 9L12 16L5 9"
                        stroke="#016853"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    View More Announcements
                  </button>
                </div>
              )}
              {index === mockAnnouncements.length - 1 && (
                <div
                  className={`${
                    !isExpanded ? "hidden" : "flex"
                  } justify-center mt-3 md:mt-4`}
                >
                  <button
                    onClick={handleViewLess}
                    className="flex items-center gap-2 bg-[#EBFCF4] text-[#016853] font-medium text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full hover:bg-[#D7F7E9] transition-colors"
                  >
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 15L12 8L19 15"
                        stroke="#016853"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    View Less
                  </button>
                </div>
              )}
              {index < mockAnnouncements.length - 1 && (
                <div className="absolute bottom-0 left-4 right-4 h-px bg-[#f0f0f0] md:left-6 md:right-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
