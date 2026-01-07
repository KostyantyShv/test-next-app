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
      <div className="w-full md:max-w-[875px] bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex items-center p-4 md:p-6 md:items-center border-b border-[#f0f0f0]"
        >
          <svg
            className="w-8 h-8 md:w-10 md:h-10 mr-3 md:mr-4 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 32 32"
            height="32"
            width="32"
          >
            <path
              fill="#017A5B"
              d="M27.5 4.07324V12.1271C27.6804 12.1737 27.8578 12.2329 28.0307 12.3045C28.516 12.5056 28.957 12.8002 29.3284 13.1716C29.6999 13.5431 29.9945 13.984 30.1955 14.4693C30.3965 14.9546 30.5 15.4748 30.5 16.0001C30.5 16.5253 30.3965 17.0455 30.1955 17.5308C29.9945 18.0161 29.6999 18.457 29.3284 18.8285C28.957 19.1999 28.516 19.4946 28.0307 19.6956C27.8578 19.7672 27.6804 19.8264 27.5 19.873V27.9935L25.9021 26.8016C21.7404 23.6975 16.6906 22.0141 11.4988 22.0001H9.5069C9.52995 23.2013 9.62958 24.4013 10.0583 25.5161C10.58 26.8723 11.6207 28.1713 13.8714 29.0716L13.1286 30.9285C10.3793 29.8288 8.92002 28.1278 8.19165 26.234C7.63935 24.798 7.52798 23.2934 7.50559 22.0001H2.5C1.43913 22.0001 0.421719 21.5786 -0.328427 20.8285C-1.07857 20.0783 -1.5 19.0609 -1.5 18.0001V14.0001C-1.5 12.9392 -1.07857 11.9218 -0.328427 11.1716C0.421719 10.4215 1.43913 10.0001 2.5 10.0001H11.4848C16.6654 9.84086 21.6858 8.16589 25.9244 5.18233L27.5 4.07324ZM9.5 20.0001H11.5026C16.4751 20.0132 21.3273 21.4407 25.5 24.0963V7.85073C21.2909 10.4154 16.4782 11.8503 11.5302 11.9996L11.5151 12.0001H9.5V20.0001ZM7.5 12.0001V20.0001H2.5C1.96957 20.0001 1.46086 19.7893 1.08579 19.4143C0.710714 19.0392 0.5 18.5305 0.5 18.0001V14.0001C0.5 13.4696 0.710714 12.9609 1.08579 12.5858C1.46086 12.2108 1.96957 12.0001 2.5 12.0001H7.5ZM27.5 17.7321C27.651 17.6449 27.7904 17.5381 27.9142 17.4143C28.0999 17.2286 28.2472 17.0081 28.3478 16.7654C28.4483 16.5228 28.5 16.2627 28.5 16.0001C28.5 15.7374 28.4483 15.4773 28.3478 15.2347C28.2472 14.992 28.0999 14.7716 27.9142 14.5858C27.7904 14.462 27.651 14.3552 27.5 14.268V17.7321Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
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
                    className="text-[#346DC2] font-semibold ml-1 hover:text-[#275293] hover:underline"
                  >
                    {announcement.link.text}
                  </a>
                </div>
                {announcement.image && (
                  <Image
                    src="/temp-images/img-announcement.png"
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
                    } items-center gap-2 bg-[#EBFCF4] text-[#016853] font-semibold text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full hover:bg-[#D7F7E9] transition-colors`}
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
