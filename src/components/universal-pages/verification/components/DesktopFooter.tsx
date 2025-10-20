'use client';

import React from 'react';

interface DesktopFooterProps {
  showSuccess: boolean;
  isFinal: boolean;
  canGoBack: boolean;
  onCancel: () => void;
  onBack: () => void;
  onPrimary: () => void;
}

const DesktopFooter: React.FC<DesktopFooterProps> = ({ showSuccess, isFinal, canGoBack, onCancel, onBack, onPrimary }) => {
  return (
    <div className="p-5 border-t border-gray-200 flex-shrink-0 flex gap-3 justify-end">
      <button onClick={onCancel} className="px-6 py-3 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
      {!showSuccess && canGoBack && (
        <button onClick={onBack} className="px-6 py-3 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 transition-colors">Back</button>
      )}
      <button
        onClick={onPrimary}
        className={`px-6 py-3 rounded-lg transition-colors ${
          showSuccess || isFinal ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {showSuccess ? 'Close' : isFinal ? 'Complete Verification' : 'Continue'}
      </button>
    </div>
  );
};

export default DesktopFooter;


