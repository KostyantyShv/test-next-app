'use client';

import React from 'react';

interface MobileDrawerProps {
  open: boolean;
  stepsOrder: string[];
  stepTitles: Record<string, string>;
  currentStep: number;
  completedSteps: Set<string>;
  onClose: () => void;
  onSelectStep: (index: number) => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ open, stepsOrder, stepTitles, currentStep, completedSteps, onClose, onSelectStep }) => {
  return (
    <>
      <div className={`${open ? 'opacity-100 visible' : 'opacity-0 invisible'} fixed inset-0 bg-black/50 transition-opacity z-[1000]`} onClick={onClose} />
      <div className={`fixed left-0 right-0 bottom-0 max-h-[80%] bg-white rounded-t-2xl shadow-[0_-2px_10px_rgba(0,0,0,0.15)] z-[1001] transition-transform ${open ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="sticky top-0 bg-white px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#464646]">Verification Steps</h2>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#5F5F5F] hover:bg-gray-100" aria-label="Close Steps" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="py-2 overflow-y-auto">
          {stepsOrder.map((k, idx) => {
            const isActive = idx === currentStep;
            const isDone = completedSteps.has(k);
            return (
              <button key={k} className={`w-full text-left px-5 py-4 border-b last:border-b-0 ${isActive ? 'text-[#1D77BD] font-semibold' : isDone ? 'text-[#089E68] font-medium' : 'text-[#4A4A4A]'}`} onClick={() => { onSelectStep(idx); onClose(); }}>
                <div className="flex items-center justify-between">
                  <span>{stepTitles[k]}</span>
                  <span className="text-[18px]">{isDone ? '✅' : isActive ? '📝' : ''}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;


