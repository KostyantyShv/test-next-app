import React from 'react';
import { CommunityStatData } from '../types';

interface CommunityStatsProps {
  stats: CommunityStatData[];
}

export const CommunityStats: React.FC<CommunityStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
      {stats.map((stat, index) => (
        <div key={index} className="bg-[#F8F9FA] p-6 rounded-xl">
          <div className="text-[#5F5F5F] text-sm font-medium mb-2">{stat.label}</div>
          <div className="text-2xl font-bold text-[#464646]">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

