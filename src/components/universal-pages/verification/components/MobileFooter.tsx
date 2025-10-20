'use client';

import React from 'react';

interface MobileFooterProps {
  canGoBack: boolean;
  isFinal: boolean;
  showSuccess: boolean;
  onBack: () => void;
  onPrimary: () => void;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ canGoBack, isFinal, showSuccess, onBack, onPrimary }) => {
  return (
    <div className="fixed left-0 right-0 bottom-0 z-[1002] px-4 py-4 pb-[max(16px,env(safe-area-inset-bottom))] bg-white border-t border-black/10 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] flex gap-3 justify-between">
      <button
        className={`flex-1 rounded-xl border-2 px-4 py-3 text-[15px] font-semibold ${canGoBack ? 'bg-white text-[#5F5F5F] border-gray-300' : 'opacity-50 cursor-not-allowed bg-white text-[#5F5F5F] border-gray-200'}`}
        disabled={!canGoBack || showSuccess}
        onClick={onBack}
      >
        Back
      </button>
      <button
        className={`flex-1 rounded-xl border-2 px-4 py-3 text-[15px] font-semibold text-white ${showSuccess || isFinal ? 'bg-[#089E68] border-[#089E68] hover:bg-[#077754]' : 'bg-[#1D77BD] border-[#1D77BD] hover:bg-[#1565c0]'}`}
        onClick={onPrimary}
      >
        {showSuccess ? 'Close' : isFinal ? 'Complete Verification' : 'Continue'}
      </button>
    </div>
  );
};

export default MobileFooter;


