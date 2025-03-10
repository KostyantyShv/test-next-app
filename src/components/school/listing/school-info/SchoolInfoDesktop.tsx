"use client";
import { Icon } from "@/components/ui/Icon";
import React, { useEffect, useRef, useState } from "react";
import ActionButton from "../action-button/ActionButton";
import Header from "../header/Header";
import { SchoolInfoInterface } from "@/types/school-listings";

const LocationIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const SchoolInfoDesktop = ({
  schoolInfo,
}: {
  schoolInfo: SchoolInfoInterface;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [showFixedHeader, setShowFixedHeader] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsFixed(!entry.isIntersecting);
        },
        {
          threshold: 0,
          rootMargin: "-1px 0px 0px 0px",
        }
      );

      observer.observe(containerRef.current);

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
        observer.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (isFixed) {
      setShowFixedHeader(true);
    } else {
      const timeout = setTimeout(() => setShowFixedHeader(false), 300); // Match animation duration
      return () => clearTimeout(timeout);
    }
  }, [isFixed]);

  return (
    <>
      <div ref={containerRef}>
        <div className="rounded-b-cardBorderRadius p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#464646]">
                {schoolInfo.name}
              </h1>
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 fill-[#1D77BD]"
                viewBox="0 0 30 30"
              >
                <path d="M13.474 2.80108C14.2729 1.85822 15.7271 1.85822 16.526 2.80108L17.4886 3.9373C17.9785 4.51548 18.753 4.76715 19.4892 4.58733L20.9358 4.23394C22.1363 3.94069 23.3128 4.79547 23.4049 6.0278L23.5158 7.51286C23.5723 8.26854 24.051 8.92742 24.7522 9.21463L26.1303 9.77906C27.2739 10.2474 27.7233 11.6305 27.0734 12.6816L26.2903 13.9482C25.8918 14.5928 25.8918 15.4072 26.2903 16.0518L27.0734 17.3184C27.7233 18.3695 27.2739 19.7526 26.1303 20.2209L24.7522 20.7854C24.051 21.0726 23.5723 21.7315 23.5158 22.4871L23.4049 23.9722C23.3128 25.2045 22.1363 26.0593 20.9358 25.7661L19.4892 25.4127C18.753 25.2328 17.9785 25.4845 17.4886 26.0627L16.526 27.1989C15.7271 28.1418 14.2729 28.1418 13.474 27.1989L12.5114 26.0627C12.0215 25.4845 11.247 25.2328 10.5108 25.4127L9.06418 25.7661C7.86371 26.0593 6.6872 25.2045 6.59513 23.9722L6.48419 22.4871C6.42773 21.7315 5.94903 21.0726 5.24777 20.7854L3.86969 20.2209C2.72612 19.7526 2.27673 18.3695 2.9266 17.3184L3.70973 16.0518C4.10824 15.4072 4.10824 14.5928 3.70973 13.9482L2.9266 12.6816C2.27673 11.6305 2.72612 10.2474 3.86969 9.77906L5.24777 9.21463C5.94903 8.92742 6.42773 8.26854 6.48419 7.51286L6.59513 6.0278C6.6872 4.79547 7.86371 3.94069 9.06418 4.23394L10.5108 4.58733C11.247 4.76715 12.0215 4.51548 12.5114 3.9373L13.474 2.80108Z"></path>
                <path
                  stroke="white"
                  fill="white"
                  d="M13.5 17.625L10.875 15L10 15.875L13.5 19.375L21 11.875L20.125 11L13.5 17.625Z"
                ></path>
              </svg>
            </div>
            <div className="text-[#089E68] text-sm sm:text-lg mb-2 sm:mb-4">
              {schoolInfo.ranking}
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[#4A4A4A] text-xs sm:text-sm">
              <span className="bg-[#00DF8B] text-white px-2 py-1 rounded-xl font-semibold">
                {schoolInfo.grade}
              </span>
              <span>Overall Grade</span>
              <span className="text-[#5F5F5F]">•</span>
              <span>{schoolInfo.type}</span>
              <span className="text-[#5F5F5F]">•</span>
              <span>{schoolInfo.grades}</span>
              <span className="text-[#5F5F5F]">•</span>
              <span>{schoolInfo.location}</span>
              <span className="text-[#5F5F5F]">•</span>
              <span>
                {"★".repeat(schoolInfo.reviews.rating)}
                {"☆".repeat(5 - schoolInfo.reviews.rating)}{" "}
                {schoolInfo.reviews.count} reviews
              </span>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-2"
              >
                <Icon
                  name="expand"
                  className={`rotate-90 transform transition-transform ${
                    isExpanded ? "rotate-[270deg]" : ""
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <button className="bg-[#EBFCF4] text-[#016853] px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold text-sm sm:text-base hover:bg-[#D7F7E9] transition-colors w-full">
              Apply Now
            </button>
            <button className="bg-[#F3F4F6] text-[#4B5563] px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold text-sm sm:text-base hover:bg-gray-200 transition-colors w-full">
              Virtual Tour
            </button>
          </div>
        </div>
        {isExpanded && (
          <div className="flex flex-row bg-cardBackground p-4 sm:p-6 border-t border-gray-100 gap-2 sm:gap-3">
            <ActionButton icon={<LocationIcon />} text="Get directions" />
            <ActionButton icon={<Icon name="phone" />} text="Call now" />
            <ActionButton icon={<Icon name="globe" />} text="Website" />
            <ActionButton icon={<Icon name="share" />} text="Share" />
            <ActionButton icon={<Icon name="shield" />} text="Claim listing" />
            <ActionButton icon={<Icon name="warning" />} text="Report" />
          </div>
        )}
      </div>

      {showFixedHeader && (
        <Header
          imageSizes="h-14 w-14"
          classes={`fixed top-0 left-0 py-[3px] right-0 pl-16 w-full border z-50 transition-all duration-300 ${
            isFixed ? "animate-slideDown" : "animate-slideUp"
          }`}
        />
      )}
    </>
  );
};

export default SchoolInfoDesktop;
