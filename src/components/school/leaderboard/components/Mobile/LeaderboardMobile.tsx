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
          <p className="text-[12px] text-[#5F5F5F]">This week's champions</p>
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
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <button
          className="w-full flex items-center justify-between px-4 py-4 border-b border-[#F3F4F6]"
          onClick={() => setActive((a) => a)}
        >
          <span className="text-[17px] font-bold text-[#464646]">7 Day Leaderboard</span>
          <svg className="w-6 h-6 text-[#5F5F5F]" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5H7z"/></svg>
        </button>

        {/* Tabs */}
        <div className="flex gap-0 overflow-x-auto border-b border-[#F3F4F6] px-2">
          {([
            { id: "reviews", label: "Reviews" },
            { id: "followers", label: "Followers" },
            { id: "events", label: "Events" },
          ] as { id: LeaderboardType; label: string }[]).map((t) => (
            <button
              key={t.id}
              className={`flex items-center gap-2 px-3 py-2.5 text-[13px] font-semibold border-b-4 -mb-[1px] whitespace-nowrap transition ${
                active === t.id ? "text-[#016853] border-[#016853]" : "text-[#5F5F5F] border-transparent hover:bg-[rgba(1,104,83,0.05)]"
              }`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className={`flex flex-col gap-2.5 p-4 ${loading ? "animate-pulse" : ""}`}>
          {items.map((it) => (
            <div key={it.rank} className="flex items-center p-3 bg-[#F8F9FA] rounded-xl">
              <div className={`w-7 h-7 rounded-md flex items-center justify-center font-bold mr-3 text-white ${
                it.rank === 1 ? "bg-[#00DF8B]" : it.rank === 2 ? "bg-[#089E68]" : it.rank === 3 ? "bg-[#0B6333]" : "bg-white text-[#464646]"
              }`}>{it.rank}</div>
              <img src={it.imageUrl} alt={it.schoolName} className="w-9 h-9 rounded-lg object-cover mr-3" />
              <div className="flex-1 text-[13px] font-semibold text-[#464646] truncate">{it.schoolName}</div>
              <div className="text-[15px] font-bold text-[#1D77BD]">+{it.points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


