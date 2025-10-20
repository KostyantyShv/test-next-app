'use client';

import React from 'react';

interface MobileHeaderProps {
  onOpenSteps: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onOpenSteps }) => {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-black/10 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div>
          <h1 className="text-[18px] font-semibold text-[#464646] leading-none">Account Verification</h1>
          <div className="text-[12px] text-[#5F5F5F] mt-0.5">Complete verification to secure your account</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#4A4A4A] hover:bg-black/5" aria-label="View Steps" onClick={onOpenSteps}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
        </button>
      </div>
    </div>
  );
};

export default MobileHeader;


