'use client';

import React from 'react';

interface DesktopTabsProps {
  titles: string[];
  currentStep: number;
  completedSteps: Set<number>;
  onSelect: (index: number) => void;
}

const DesktopTabs: React.FC<DesktopTabsProps> = ({ titles, currentStep, completedSteps, onSelect }) => {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {titles.map((title, index) => (
        <div
          key={index}
          className={`px-4 py-2 rounded-md cursor-pointer transition-all whitespace-nowrap text-sm relative ${
            index === currentStep
              ? 'bg-green-50 border border-green-500 text-green-700'
              : completedSteps.has(index)
              ? 'bg-green-500 border border-green-500 text-white'
              : 'bg-gray-50 border border-gray-200 text-gray-500'
          }`}
          onClick={() => onSelect(index)}
        >
          {title}
          {completedSteps.has(index) && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white rounded-full text-xs flex items-center justify-center border-2 border-white">
              ✓
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default DesktopTabs;


