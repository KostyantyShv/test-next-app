'use client';

import React from 'react';

interface MobileProgressProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: Set<string>;
  stepsOrder: string[];
}

const MobileProgress: React.FC<MobileProgressProps> = ({ currentStep, totalSteps, completedSteps, stepsOrder }) => {
  const progressPct = ((currentStep + 1) / totalSteps) * 100;
  return (
    <div className="bg-white border-b border-black/10 px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[14px] font-medium text-[#464646]">Verification Progress</div>
        <div className="text-[12px] text-[#5F5F5F]">{currentStep + 1} of {totalSteps}</div>
      </div>
      <div className="w-full h-[6px] bg-gray-200 rounded overflow-hidden mb-3">
        <div className="h-full bg-gradient-to-r from-[#089E68] to-[#00DF8B] rounded transition-all" style={{ width: `${progressPct}%` }} />
      </div>
      <div className="flex items-center justify-between">
        {stepsOrder.map((key, idx) => {
          const isActive = idx === currentStep;
          const isDone = completedSteps.has(key);
          return (
            <div key={key} className={`w-2 h-2 rounded-full transition-transform ${isActive ? 'bg-[#1D77BD] scale-125' : isDone ? 'bg-[#089E68] scale-110' : 'bg-gray-300'}`} />
          );
        })}
      </div>
    </div>
  );
};

export default MobileProgress;


