import React from 'react';
import { LeaderboardCardProps } from '../types';

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ title, items, type }) => {
  const getTooltipText = (points: number) => {
    switch (type) {
      case 'rank':
        return `+${points} new reviews`;
      case 'followers':
        return `+${points} new followers`;
      case 'events':
        return `+${points} new attendees`;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-[#00DF8B] font-bold';
      case 2:
        return 'text-[#089E68] font-bold';
      case 3:
        return 'text-[#0B6333] font-bold';
      default:
        return 'text-[#5F5F5F]';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#464646] mb-3 text-center">
          {title}
        </h3>
        <div className="h-px bg-[rgba(0,0,0,0.06)] relative">
          <div className="absolute left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#1D77BD] -bottom-px rounded"></div>
        </div>
      </div>
      <ul className="list-none">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center py-3 border-b border-[#F8F9FA]"
          >
            <span className={`w-6 font-semibold ${getRankClass(item.rank)} mr-3`}>
              {item.rank}
            </span>
            <div className="flex items-center flex-1">
              <img
                src={item.imageUrl}
                alt={item.schoolName}
                className="w-10 h-10 rounded-lg mr-3 object-cover"
              />
              <span className="font-semibold text-[#464646] text-sm">
                {item.schoolName}
              </span>
            </div>
            <span className="font-semibold text-[#1D77BD] relative group cursor-help">
              +{item.points}
              <span className="invisible group-hover:visible absolute bottom-[calc(100%+8px)] right-[-8px] bg-[#464646] text-white px-4 py-2 rounded text-xs whitespace-nowrap z-[1000] font-normal">
                {getTooltipText(item.points)}
                <span className="absolute bottom-[-4px] right-2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#464646]"></span>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

