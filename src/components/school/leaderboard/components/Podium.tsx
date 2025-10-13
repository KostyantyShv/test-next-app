import React from 'react';
import { MetricCard } from './MetricCard';
import { CommunityStats } from './CommunityStats';
import { LeaderboardSection } from './LeaderboardSection';
import TopPerformers from './TopPerformers';
import { SignupsIcon, BookmarksIcon, FollowsIcon } from './MetricIcons';
import { communityStats, metrics } from '../mock';
import { getInitialLeaderboardData } from '../utils/generateLeaderboardData';

const Podium = () => {
  const leaderboards = getInitialLeaderboardData();
  const metricIcons = [<SignupsIcon key="signups" />, <BookmarksIcon key="bookmarks" />, <FollowsIcon key="follows" />];

  return (
    <div className="w-full max-w-[1075px] mx-auto bg-white rounded-xl p-8 shadow-[0_2px_4px_rgba(0,0,0,0.05)]">

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.label}
            icon={metricIcons[index]}
            number={metric.number}
            label={metric.label}
            tooltip={metric.tooltip}
          />
        ))}
      </div>

      {/* Community Stats Section */}
      <CommunityStats stats={communityStats} />

    {/* Top Performers Section */}
    <TopPerformers />
    
      {/* Leaderboard Section */}
      <LeaderboardSection leaderboards={leaderboards} />
    </div>
  );
};

export default Podium;