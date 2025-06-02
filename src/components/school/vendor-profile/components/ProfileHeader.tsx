import { useState } from "react";

export default function ProfileHeader() {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex gap-6 mb-8">
      <img
        src="https://i.ibb.co/XkdtT1Yj/product2.png"
        alt="Lincoln University"
        className="w-40 h-40 rounded-xl object-cover"
      />
      <div className="flex-1">
        <h1 className="text-3xl font-semibold text-[#464646] mb-2 tracking-tight">
          Lincoln University
        </h1>
        <div className="flex gap-2 text-[#6F767E] text-sm mb-6 flex-wrap items-center">
          <span>Educational</span>
          <span className="text-[#D1D5DB]">◇</span>
          <span>Established 1854</span>
          <span className="text-[#D1D5DB]">◇</span>
          <span>Higher Education</span>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-xs text-[#6F767E] uppercase tracking-wider">
              SAVED ITEMS
            </span>
            <span className="text-2xl font-semibold text-[#1B1B1B]">195</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-[#6F767E] uppercase tracking-wider">
              LOCATION
            </span>
            <span className="text-2xl font-semibold text-[#1B1B1B]">
              CAMBRIDGE, MA
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-[#6F767E] uppercase tracking-wider">
              LIKES
            </span>
            <span className="text-2xl font-semibold text-[#1B1B1B]">90K</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <button
          onClick={handleFollowClick}
          className="flex items-center gap-2 bg-[#016853] text-white border-none rounded-lg px-5 py-3 text-[15px] font-medium cursor-pointer hover:bg-[#015745] transition-colors"
        >
          {isFollowing ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
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
        <button className="bg-[#EBFCF4] text-[#016853] border-none rounded-lg px-5 py-3 text-[15px] font-medium cursor-pointer hover:bg-[#D7F7E9] transition-colors">
          Contact
        </button>
        <button className="bg-[#F5F5F7] text-[#4A4A4A] border-none rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#E8E8EA] transition-colors">
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
  );
}
