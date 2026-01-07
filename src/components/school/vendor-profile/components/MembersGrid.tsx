"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

interface Member {
  name: string;
  avatar: string;
  joined: string;
  location: string;
  isPro: boolean;
  hasListings: boolean;
  listings?: string[];
}

const membersData: Member[] = [
  {
    name: "Nixtio Branding",
    avatar:
      "https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
    joined: "Dec 15, 2024",
    location: "Miami, FL, United States",
    isPro: true,
    hasListings: true,
    listings: [
      "https://i.ibb.co/LJwrLdW/coaching-image.webp",
      "https://i.ibb.co/Csdq4rd/newsletter-image.png",
      "https://i.ibb.co/jJ4GHXP/img1.jpg",
    ],
  },
  {
    name: "Bogdan Nikitin",
    avatar: "https://i.ibb.co/mFj8fCs/AVATAR-couponcodefinder.jpg",
    joined: "Nov 30, 2024",
    location: "Miami, FL, United States",
    isPro: true,
    hasListings: true,
    listings: [
      "https://i.ibb.co/Csdq4rd/newsletter-image.png",
      "https://i.ibb.co/jJ4GHXP/img1.jpg",
      "https://i.ibb.co/LJwrLdW/coaching-image.webp",
    ],
  },
  {
    name: "Anatoly",
    avatar: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
    joined: "Jan 5, 2025",
    location: "Miami, FL, United States",
    isPro: false,
    hasListings: false,
  },
];

const PRO_BADGE_SVG = (
  <svg
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[10px] h-[10px]"
  >
    <path
      fillRule="evenodd"
      fill="currentColor"
      clipRule="evenodd"
      d="m3 0c-1.6568 0-3 1.3432-3 3v6c0 1.6569 1.3432 3 3 3h10c1.6569 0 3-1.3431 3-3v-6c0-1.6568-1.3431-3-3-3h-10zm7.9285 5.864c0 0.78 0.354 1.374 1.044 1.374 0.696 0 1.038-0.594 1.038-1.374s-0.342-1.38-1.038-1.38c-0.69 0-1.044 0.6-1.044 1.38zm3.162 0c0 1.284-0.822 2.238-2.124 2.238-1.296 0-2.118-0.954-2.118-2.238s0.82198-2.238 2.118-2.238c1.302 0 2.124 0.954 2.124 2.238zm-12.007 2.136h1.08v-1.434h1.002c0.882 0 1.452-0.582 1.452-1.404 0-0.432-0.156-0.798-0.432-1.056-0.264-0.252-0.648-0.396-1.17-0.396h-1.932v4.29zm1.08-2.274v-1.122h0.786c0.378 0 0.6 0.21 0.6 0.552s-0.216 0.57-0.6 0.57h-0.786zm2.8341 2.274h1.062v-1.608h0.642c0.456 0 0.66 0.216 0.714 0.612 0.02313 0.14931 0.03595 0.3082 0.04774 0.45445 0.02186 0.27104 0.04022 0.49868 0.11426 0.54155h1.032v-0.054c-0.0924-0.03327-0.10511-0.25095-0.12229-0.54506v-2e-5c-0.01071-0.18333-0.02315-0.39636-0.05771-0.61292-0.06-0.426-0.252-0.66-0.624-0.786v-0.018c0.498-0.174 0.744-0.54 0.744-1.038 0-0.798-0.648-1.236-1.5-1.236h-2.052v4.29zm1.062-2.394v-1.056h0.822c0.408 0 0.612 0.222 0.612 0.534 0 0.324-0.216 0.522-0.636 0.522h-0.798z"
    />
  </svg>
);

const FOLLOWING_CHECK = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <path d="M20 6L9 17L4 12"></path>
  </svg>
);

export default function MembersGrid() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sortParam = searchParams.get("sort") as "trending" | "followers" | null;
  const [sortType, setSortType] = useState<"trending" | "followers">(
    sortParam || "trending"
  );
  const [followingStates, setFollowingStates] = useState<boolean[]>(
    new Array(membersData.length).fill(false)
  );

  useEffect(() => {
    if (sortParam && sortParam !== sortType) {
      setSortType(sortParam);
    }
  }, [sortParam]);

  const handleFollowClick = (index: number) => {
    setFollowingStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const handleSortChange = (type: "trending" | "followers") => {
    setSortType(type);
    const url = new URL(window.location.href);
    url.searchParams.set("sort", type);
    router.push(url.toString());
  };

  return (
    <div className={`${inter.className} text-[#4A4A4A]`}>
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold text-[#464646]">4 Members</div>
        <div className="text-sm text-[#6F767E]">
          Sort:{" "}
          <span
            className={`cursor-pointer hover:underline ${
              sortType === "trending"
                ? "text-[#464646] font-medium"
                : "hover:text-[#464646]"
            }`}
            onClick={() => handleSortChange("trending")}
          >
            Trending
          </span>{" "}
          •{" "}
          <span
            className={`cursor-pointer hover:underline ${
              sortType === "followers"
                ? "text-[#464646] font-medium"
                : "hover:text-[#464646]"
            }`}
            onClick={() => handleSortChange("followers")}
          >
            Followers
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {membersData.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-xl w-[348px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E5E7EB] flex flex-col transition-all hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] pb-2"
          >
            <div className="flex p-6 relative">
              <div className="relative flex-shrink-0">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-[60px] h-[60px] rounded-full object-cover"
                />
                {member.isPro && (
                  <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 flex items-center justify-center text-white rounded-[3px] px-[3px] py-[1px] text-[8px] font-semibold uppercase bg-[#016853] z-10">
                    {PRO_BADGE_SVG}
                    <span className="ml-0.5">PRO</span>
                  </div>
                )}
              </div>
              <div className="pl-4 flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-base font-semibold text-[#464646]">
                    {member.name}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-[13px] text-[#6F767E]">
                    Joined {member.joined}
                  </div>
                  <div className="text-[13px] text-[#6F767E]">
                    {member.location}
                  </div>
                </div>
              </div>
              <button
                className={`absolute top-6 right-6 flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  followingStates[index]
                    ? "bg-[rgba(1,104,83,0.1)] text-[#016853]"
                    : "bg-[#F5F5F7] text-[#4A4A4A] hover:bg-[#E8E8EA]"
                }`}
                onClick={() => handleFollowClick(index)}
              >
                {followingStates[index] ? (
                  <>
                    {FOLLOWING_CHECK}
                    Following
                  </>
                ) : (
                  "Follow"
                )}
              </button>
            </div>

            {member.hasListings && member.listings ? (
              <div className="grid grid-cols-3 gap-1 px-4 pb-1 h-[88px]">
                {member.listings.slice(0, 3).map((listing, i) => (
                  <img
                    key={i}
                    src={listing}
                    alt="Listing"
                    className="w-full h-[80px] object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center w-[85%] h-[80px] mx-auto mb-2 bg-[#F8F9FA] text-[#6F767E] text-sm font-medium rounded-[10px]">
                No Listings
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
