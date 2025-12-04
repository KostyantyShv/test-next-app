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
      <div className="w-full md:max-w-[875px] bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden md:px-[87px]">
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
            <mask
              height="27"
              width="21"
              y="4"
              x="10"
              maskUnits="userSpaceOnUse"
              style={{ maskType: "alpha" }}
              id="mask0_3860_15202"
            >
              <path fill="#017A5B" d="M10.5 4H30.5V31H19L10.5 22.5V4Z"></path>
            </mask>
            <g mask="url(#mask0_3860_15202)">
              <path
                fill="#017A5B"
                d="M27.5 4.07324V12.1271C27.6804 12.1737 27.8578 12.2329 28.0307 12.3045C28.516 12.5056 28.957 12.8002 29.3284 13.1716C29.6999 13.5431 29.9945 13.984 30.1955 14.4693C30.3965 14.9546 30.5 15.4748 30.5 16.0001C30.5 16.5253 30.3965 17.0455 30.1955 17.5308C29.9945 18.0161 29.6999 18.457 29.3284 18.8285C28.957 19.1999 28.516 19.4946 28.0307 19.6956C27.8578 19.7672 27.6804 19.8264 27.5 19.873V27.9935L25.9021 26.8016C21.7404 23.6975 16.6906 22.0141 11.4988 22.0001H9.5069C9.52995 23.2013 9.62958 24.4013 10.0583 25.5161C10.58 26.8723 11.6207 28.1713 13.8714 29.0716L13.1286 30.9285C10.3793 29.8288 8.92002 28.1278 8.19165 26.234C7.63935 24.798 7.52798 23.2934 7.50559 22.0001H2.5C1.43913 22.0001 0.421719 21.5786 -0.328427 20.8285C-1.07857 20.0783 -1.5 19.0609 -1.5 18.0001V14.0001C-1.5 12.9392 -1.07857 11.9218 -0.328427 11.1716C0.421719 10.4215 1.43913 10.0001 2.5 10.0001H11.4848C16.6654 9.84086 21.6858 8.16589 25.9244 5.18233L27.5 4.07324ZM9.5 20.0001H11.5026C16.4751 20.0132 21.3273 21.4407 25.5 24.0963V7.85073C21.2909 10.4154 16.4782 11.8503 11.5302 11.9996L11.5151 12.0001H9.5V20.0001ZM7.5 12.0001V20.0001H2.5C1.96957 20.0001 1.46086 19.7893 1.08579 19.4143C0.710714 19.0392 0.5 18.5305 0.5 18.0001V14.0001C0.5 13.4696 0.710714 12.9609 1.08579 12.5858C1.46086 12.2108 1.96957 12.0001 2.5 12.0001H7.5ZM27.5 17.7321C27.651 17.6449 27.7904 17.5381 27.9142 17.4143C28.0999 17.2286 28.2472 17.0081 28.3478 16.7654C28.4483 16.5228 28.5 16.2627 28.5 16.0001C28.5 15.7374 28.4483 15.4773 28.3478 15.2347C28.2472 14.992 28.0999 14.7716 27.9142 14.5858C27.7904 14.462 27.651 14.3552 27.5 14.268V17.7321Z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </g>
            <mask
              height="28"
              width="19"
              y="1"
              x="1"
              maskUnits="userSpaceOnUse"
              style={{ maskType: "alpha" }}
              id="mask1_3860_15202"
            >
              <path fill="#D9D9D9" d="M1.5 1.5H12.5V22L20 28.5H13.5H1.5V1.5Z"></path>
            </mask>
            <g mask="url(#mask1_3860_15202)">
              <path
                fill="#017A5B"
                d="M30.5 4V12.0538C30.6804 12.1004 30.8578 12.1597 31.0307 12.2313C31.516 12.4323 31.957 12.7269 32.3284 13.0984C32.6999 13.4698 32.9945 13.9108 33.1955 14.3961C33.3965 14.8814 33.5 15.4015 33.5 15.9268C33.5 16.4521 33.3965 16.9722 33.1955 17.4575C32.9945 17.9428 32.6999 18.3838 32.3284 18.7552C31.957 19.1267 31.516 19.4213 31.0307 19.6223C30.8578 19.694 30.6804 19.7532 30.5 19.7998V27.9202L28.9021 26.7284C24.7404 23.6242 19.6906 21.9408 14.4988 21.9268H12.5069C12.53 23.1281 12.6296 24.328 13.0583 25.4428C13.58 26.7991 14.6207 28.0981 16.8714 28.9983L16.1286 30.8553C13.3793 29.7556 11.92 28.0545 11.1917 26.1608C10.6393 24.7248 10.528 23.2202 10.5056 21.9268H5.5C4.43913 21.9268 3.42172 21.5054 2.67157 20.7552C1.92143 20.0051 1.5 18.9877 1.5 17.9268V13.9268C1.5 12.8659 1.92143 11.8485 2.67157 11.0984C3.42172 10.3482 4.43913 9.92681 5.5 9.92681H14.4848C19.6654 9.76761 24.6858 8.09265 28.9244 5.10908L30.5 4ZM12.5 19.9268H14.5026C19.4751 19.94 24.3273 21.3675 28.5 24.0231V7.77749C24.2909 10.3421 19.4782 11.7771 14.5302 11.9264L14.5151 11.9268H12.5V19.9268ZM10.5 11.9268V19.9268H5.5C4.96957 19.9268 4.46086 19.7161 4.08579 19.341C3.71071 18.966 3.5 18.4572 3.5 17.9268V13.9268C3.5 13.3964 3.71071 12.8877 4.08579 12.5126C4.46086 12.1375 4.96957 11.9268 5.5 11.9268H10.5ZM30.5 17.6589C30.651 17.5717 30.7904 17.4649 30.9142 17.341C31.0999 17.1553 31.2472 16.9348 31.3478 16.6922C31.4483 16.4495 31.5 16.1895 31.5 15.9268C31.5 15.6642 31.4483 15.4041 31.3478 15.1614C31.2472 14.9188 31.0999 14.6983 30.9142 14.5126C30.7904 14.3887 30.651 14.282 30.5 14.1948V17.6589Z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </g>
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
