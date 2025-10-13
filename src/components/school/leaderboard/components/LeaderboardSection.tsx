'use client';

import React, { useState } from 'react';
import { LeaderboardCard } from './LeaderboardCard';
import { LeaderboardData } from '../types';

interface LeaderboardSectionProps {
  leaderboards: LeaderboardData;
}

export const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ leaderboards }) => {
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(true);

  return (
    <div className="mt-6 mb-6">
      <div
        className="flex justify-between items-center py-4 border-b border-[#DFDDDB] cursor-pointer"
        onClick={() => setIsLeaderboardOpen(!isLeaderboardOpen)}
      >
        <h2 className="text-xl font-bold text-[#464646]">7 Day Leaderboard</h2>
        <svg
          className={`w-6 h-6 text-[#5F5F5F] transition-transform duration-200 ${
            isLeaderboardOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      {isLeaderboardOpen && (
        <div className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <LeaderboardCard
              title="Reviews Leaderboard"
              items={leaderboards.rank}
              type="rank"
            />
            <LeaderboardCard
              title="Followers Leaderboard"
              items={leaderboards.followers}
              type="followers"
            />
            <LeaderboardCard
              title="Events Leaderboard"
              items={leaderboards.events}
              type="events"
            />
          </div>
        </div>
      )}
    </div>
  );
};

