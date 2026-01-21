"use client";
import React, { useState } from "react";

interface ProfileHeaderProps {
  name: string;
  avatar: string;
  rating: string;
  reviews: number;
  followers: number;
  following: number;
  isFollowing?: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  avatar,
  rating,
  reviews,
  followers,
  following,
  isFollowing: initialFollowing = false,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex gap-6 mb-6 md:mb-8 flex-col md:flex-row items-center md:items-start text-center md:text-left">
      <img
        src={avatar}
        alt={name}
        className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-xl object-cover flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0"
      />
      <div className="profile-info flex-1 w-full">
        <h1 className="text-2xl md:text-[28px] font-semibold text-[#464646] mb-2 tracking-[-0.02em]">
          {name}
        </h1>
        <div className="flex flex-col md:flex-row gap-1 md:gap-2 text-[#6F767E] text-[13px] md:text-sm mb-4 md:mb-6 items-center md:items-center">
          <span>◇ Educational</span>
          <span className="hidden md:inline text-[#D1D5DB]">◇</span>
          <span>◇ Established 1854</span>
          <span className="hidden md:inline text-[#D1D5DB]">◇</span>
          <span>◇ Higher Education</span>
        </div>
        <div className="grid grid-cols-3 gap-4 md:flex md:items-center md:gap-8 w-full mb-4 md:mb-0 bg-[#F8F9FA] md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[11px] md:text-xs text-[#6F767E] uppercase tracking-[0.5px]">
              SAVED ITEMS
            </span>
            <span className="text-xl md:text-2xl font-semibold text-[#1B1B1B]">195</span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[11px] md:text-xs text-[#6F767E] uppercase tracking-[0.5px]">
              LOCATION
            </span>
            <span className="text-xl md:text-2xl font-semibold text-[#1B1B1B]">
              MA
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[11px] md:text-xs text-[#6F767E] uppercase tracking-[0.5px]">
              LIKES
            </span>
            <span className="text-xl md:text-2xl font-semibold text-[#1B1B1B]">90K</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3 w-full md:w-auto ml-auto">
        <button
          className="flex items-center justify-center gap-2 bg-[#016853] text-white border-none rounded-lg px-5 py-3 text-sm md:text-[15px] font-medium cursor-pointer transition-colors hover:bg-[#015745] w-full md:w-auto"
          onClick={handleFollowClick}
        >
          {isFollowing ? (
            <>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Following
            </>
          ) : (
            <>
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M2 21a8 8 0 0 1 13.292-6"></path>
                <circle r="5" cy="8" cx="10"></circle>
                <path d="M19 16v6"></path>
                <path d="M22 19h-6"></path>
              </svg>
              Follow
            </>
          )}
        </button>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="bg-[#EBFCF4] text-[#016853] border-none rounded-lg px-5 py-3 text-sm md:text-[15px] font-medium cursor-pointer transition-colors hover:bg-[#D7F7E9] flex-1 md:flex-none">
            Contact
          </button>
          <button className="bg-[#F5F5F7] text-[#4A4A4A] border-none rounded-lg w-11 h-11 md:w-10 md:h-10 flex items-center justify-center cursor-pointer transition-colors hover:bg-[#E8E8EA] flex-shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
