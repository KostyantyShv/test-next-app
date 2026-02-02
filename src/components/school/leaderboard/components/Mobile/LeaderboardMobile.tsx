"use client";

import React, { useEffect, useMemo, useState } from "react";
import { metrics, communityStats, topPerformers, listingImages, schoolNames } from "../../mock";
import { SignupsIcon, BookmarksIcon, FollowsIcon } from "../MetricIcons";

type LeaderboardType = "reviews" | "followers" | "events";

interface LBItem {
  rank: number;
  imageUrl: string;
  schoolName: string;
  points: number;
}

const iconsMap = {
  signups: <SignupsIcon />,
  bookmarks: <BookmarksIcon />,
  follows: <FollowsIcon />,
};

const getRandomSchoolName = () => schoolNames[Math.floor(Math.random() * schoolNames.length)];
const getRandomPoints = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

function generate(type: LeaderboardType): LBItem[] {
  const ranges: Record<LeaderboardType, { min: number; max: number }> = {
    reviews: { min: 50, max: 200 },
    followers: { min: 100, max: 400 },
    events: { min: 10, max: 50 },
  };
  const { min, max } = ranges[type];
  return Array.from({ length: 10 }, (_, i) => ({
    rank: i + 1,
    imageUrl: listingImages[i % listingImages.length],
    schoolName: getRandomSchoolName(),
    points: getRandomPoints(min, max),
  }));
}

export default function LeaderboardMobile() {
  const [active, setActive] = useState<LeaderboardType>("reviews");
  const [items, setItems] = useState<LBItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

  const metricCards = useMemo(
    () => [
      { key: "signups", number: metrics[0].number, label: metrics[0].label, tooltip: metrics[0].tooltip },
      { key: "bookmarks", number: metrics[1].number, label: metrics[1].label, tooltip: metrics[1].tooltip },
      { key: "follows", number: metrics[2].number, label: metrics[2].label, tooltip: metrics[2].tooltip },
    ],
    []
  );

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setItems(generate(active));
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div className="md:hidden w-full max-w-[420px] mx-auto px-3 pb-5">
      {/* Header */}
      <div className="pt-6 pb-3 text-[#464646]">
        <h1 className="text-[20px] font-bold">Leaderboard</h1>
      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow-md p-4 -mt-2 mb-3 flex flex-col gap-2.5">
        {metricCards.map((m) => (
          <div key={m.key} className="relative flex items-center p-3 rounded-xl bg-[#F8F9FA] active:scale-[0.98] active:bg-[#EBFCF4] transition">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mr-3 text-[#016853]">
              {/* icon */}
              <div className="w-[20px] h-[20px]">{iconsMap[m.key as keyof typeof iconsMap]}</div>
            </div>
            <div className="flex-1 flex items-baseline gap-2">
              <span className="text-[15px] font-bold text-[#464646]">{m.number}</span>
              <span className="text-[12px] font-medium text-[#5F5F5F]">{m.label}</span>
            </div>
            <div className="w-5 h-5 rounded-full bg-[rgba(8,158,104,0.1)] flex items-center justify-center" title={m.tooltip}>
              <div className="w-[6px] h-[6px] rounded-full bg-[#089E68]" />
            </div>
          </div>
        ))}
      </div>

      {/* Community stats */}
      <div className="flex gap-2 px-0 mb-3">
        {communityStats.map((s, i) => (
          <div key={i} className="flex-1 bg-white p-4 rounded-xl text-center shadow-sm">
            <div className="text-[18px] font-bold text-[#464646] mb-0.5">{s.value}</div>
            <div className="text-[11px] text-[#5F5F5F] font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Podium - mobile stacked cards */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
        <div className="text-center mb-5">
          <h2 className="text-[18px] font-bold text-[#016853]">Top Performers</h2>
          <p className="text-[12px] text-[#5F5F5F]">This week&apos;s champions</p>
        </div>
        <div className="flex flex-col gap-3.5">
          {topPerformers.map((p) => (
            <div
              key={p.position}
              className={`relative flex p-4 rounded-xl active:scale-[0.98] transition ${
                p.position === "first"
                  ? "bg-[rgba(0,223,139,0.06)] border border-[rgba(0,223,139,0.2)]"
                  : p.position === "second"
                  ? "bg-[rgba(8,158,104,0.06)] border border-[rgba(8,158,104,0.2)]"
                  : "bg-[rgba(11,99,51,0.06)] border border-[rgba(11,99,51,0.2)]"
              }`}
            >
              <div
                className={`absolute -top-2 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white ${
                  p.position === "first" ? "bg-[#00DF8B]" : p.position === "second" ? "bg-[#089E68]" : "bg-[#0B6333]"
                }`}
              >
                {p.title}
              </div>
              <img src={p.imageUrl} alt={p.schoolName} className={`w-[44px] h-[44px] rounded-xl object-cover mr-3 border-2 ${
                p.position === "first" ? "border-[#00DF8B] shadow-[0_0_12px_rgba(0,223,139,0.3)]" :
                p.position === "second" ? "border-[#089E68] shadow-[0_0_12px_rgba(8,158,104,0.3)]" :
                "border-[#0B6333] shadow-[0_0_12px_rgba(11,99,51,0.3)]"
              }`} />
              <div className="flex-1">
                <div className="text-[15px] font-bold text-[#464646] mb-1">{p.schoolName}</div>
                <div className="inline-block text-[11px] text-[#5F5F5F] bg-[#EBFCF4] px-2 py-0.5 rounded-md mb-1.5">{p.achievementText}</div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-[#1D77BD] rotate-45" />
                  <div className="text-[16px] font-bold text-[#089E68]">{p.totalAmount}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard section */}
      <div className="w-full max-w-[366px] mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <button
          className="w-full flex items-center justify-between px-5 py-5 border-b border-[#F8F9FA] bg-white cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-[18px] font-bold text-[#464646]">7 Day Leaderboard</span>
          <svg
            className={`w-6 h-6 text-[#5F5F5F] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </button>

        {isExpanded && (
          <>
            {/* Tabs */}
            <div className="flex gap-0 overflow-x-auto scrollbar-hide border-b-2 border-[#F8F9FA] px-2">
              {([
                {
                  id: "reviews" as LeaderboardType,
                  label: "Reviews",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M22.954 9.395C22.832 9.017 22.481 8.756 22.058 8.747L15.298 8.823L12.878 1.628C12.746 1.252 12.39 1 11.992 1H11.99C11.591 1 11.236 1.254 11.103 1.639L8.72301 8.822L1.92101 8.686C1.52101 8.693 1.16901 8.953 1.04601 9.333C0.922011 9.714 1.05401 10.132 1.36001 10.361L6.82101 14.607L4.55601 21.791C4.44101 22.173 4.58101 22.588 4.90501 22.821C5.23101 23.056 5.66501 23.056 5.99101 22.829L12.121 18.526L17.994 22.83C18.155 22.942 18.343 22.998 18.531 22.998C18.726 22.998 18.919 22.938 19.083 22.819C19.406 22.583 19.544 22.169 19.424 21.777L17.129 14.74L22.628 10.43C22.946 10.189 23.077 9.772 22.954 9.393V9.395ZM16.211 13.554C15.736 13.916 15.534 14.541 15.711 15.123L17.463 20.581L12.942 17.268C12.451 16.925 11.794 16.927 11.304 17.268L6.49301 20.646L8.25601 15.053C8.42901 14.482 8.22601 13.856 7.76201 13.504L3.60601 10.222L8.80301 10.326C9.39901 10.313 9.93101 9.927 10.13 9.353L11.997 3.719L13.895 9.363C14.091 9.927 14.622 10.313 15.243 10.326L20.405 10.267L16.211 13.554Z" />
                    </svg>
                  ),
                },
                {
                  id: "followers" as LeaderboardType,
                  label: "Followers",
                  icon: (
                    <svg viewBox="0 0 256 256" fill="currentColor" className="w-4 h-4">
                      <path d="M125.18,156.94a64,64,0,1,0-82.36,0,100.23,100.23,0,0,0-39.49,32,12,12,0,0,0,19.35,14.2,76,76,0,0,1,122.64,0,12,12,0,0,0,19.36-14.2A100.33,100.33,0,0,0,125.18,156.94ZM44,108a40,40,0,1,1,40,40A40,40,0,0,1,44,108Zm206.1,97.67a12,12,0,0,1-16.78-2.57A76.31,76.31,0,0,0,172,172a12,12,0,0,1,0-24,40,40,0,1,0-10.3-78.67,12,12,0,1,1-6.16-23.19,64,64,0,0,1,57.64,110.8,100.23,100.23,0,0,1,39.49,32A12,12,0,0,1,250.1,205.67Z" />
                    </svg>
                  ),
                },
                {
                  id: "events" as LeaderboardType,
                  label: "Events",
                  icon: (
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                      <rect x="0.5" y="2.5" width="15" height="13" rx="1.5" strokeLinejoin="round" />
                      <path d="M.5 6.5h15" strokeLinejoin="round" />
                      <path d="M4.5 4V.5M11.5 4V.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M7.71 8.455a.326.326 0 01.58 0l.675 1.361c.048.095.139.16.244.175l1.515.22a.317.317 0 01.18.543l-1.1 1.065a.317.317 0 00-.093.281l.26 1.503c.02.12-.03.242-.13.312a.328.328 0 01-.34.023l-1.35-.706a.328.328 0 00-.302 0l-1.35.706a.328.328 0 01-.34-.023.315.315 0 01-.13-.312l.26-1.503a.317.317 0 00-.092-.28l-1.1-1.067a.317.317 0 01.179-.543l1.515-.22a.323.323 0 00.244-.174l.674-1.361z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                  ),
                },
              ]).map((t) => (
                <button
                  key={t.id}
                  className={`flex items-center gap-2 px-4 py-3 text-[13px] font-semibold border-b-[3px] -mb-[1px] whitespace-nowrap transition-all duration-300 ${
                    active === t.id
                      ? "text-[#016853] border-[#016853]"
                      : "text-[#5F5F5F] border-transparent hover:bg-[rgba(1,104,83,0.05)]"
                  }`}
                  onClick={() => setActive(t.id)}
                >
                  <span className={active === t.id ? "text-[#016853]" : "text-[#5F5F5F]"}>{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>

            {/* List */}
            <div className={`flex flex-col gap-3 p-5 ${loading ? "animate-pulse" : ""}`}>
              {items.map((it) => (
                <div key={it.rank} className="flex items-center p-4 bg-[#F8F9FA] rounded-xl">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center mr-3 text-[14px] font-bold flex-shrink-0 ${
                      it.rank === 1
                        ? "bg-[#00DF8B] text-white"
                        : it.rank === 2
                        ? "bg-[#089E68] text-white"
                        : it.rank === 3
                        ? "bg-[#0B6333] text-white"
                        : "bg-white text-[#5F5F5F]"
                    }`}
                  >
                    {it.rank}
                  </div>
                  <img
                    src={it.imageUrl}
                    alt={it.schoolName}
                    className="w-10 h-10 rounded-[10px] object-cover mr-3 flex-shrink-0"
                  />
                  <div className="flex-1 text-[14px] font-semibold text-[#464646] truncate">{it.schoolName}</div>
                  <div className="text-[16px] font-bold text-[#1D77BD] flex-shrink-0">+{it.points}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


