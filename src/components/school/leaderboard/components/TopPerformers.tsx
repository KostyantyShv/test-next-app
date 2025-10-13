import React from 'react';
import { PodiumCard } from './PodiumCard';
import { TopPerformersClient } from './TopPerformersClient';
import { topPerformers } from '../mock';

const TopPerformers = () => {
  const getOrderClass = (position: string) => {
    // Mobile: natural order (1, 2, 3)
    // Desktop: podium order (2, 1, 3) - center is highest
    switch (position) {
      case 'first':  // Center position on desktop
        return 'order-1 lg:order-2';
      case 'second': // Left position on desktop  
        return 'order-2 lg:order-1';
      case 'third':  // Right position on desktop
        return 'order-3 lg:order-3';
      default:
        return '';
    }
  };

  return (
    <TopPerformersClient>
      <div className="w-full">
        {/* Title Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#016853]">
            Top Performers
          </h2>
        </div>

        {/* Podium Container */}
        <div className="flex flex-col lg:flex-row items-end justify-center gap-8 lg:gap-8 relative px-4 min-h-[420px] lg:h-[420px]">
          {topPerformers.map((performer, index) => (
            <div
              key={performer.position}
              className={`flex flex-col items-center w-full lg:w-80 h-auto animate-slide-up ${getOrderClass(performer.position)}`}
              style={{ 
                animationDelay: `${index * 200}ms`
              }}
            >
              <PodiumCard performer={performer} />
            </div>
          ))}
        </div>
      </div>
    </TopPerformersClient>
  );
};

export default TopPerformers;