'use client';

import { ReactNode } from 'react';
import { MobileDrawer } from '@/components/ui/MobileDrawer/MobileDrawer';

interface MobileMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  mapType?: 'roadmap' | 'satellite';
  onMapTypeChange?: (type: 'roadmap' | 'satellite') => void;
  showLabels?: boolean;
  onToggleLabels?: () => void;
}

export function MobileMapModal({
  isOpen,
  onClose,
  title = 'Map',
  children,
  mapType,
  onMapTypeChange,
  showLabels,
  onToggleLabels,
}: MobileMapModalProps) {
  const hasMapToolbar =
    mapType !== undefined &&
    onMapTypeChange !== undefined &&
    showLabels !== undefined &&
    onToggleLabels !== undefined;

  return (
    <MobileDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showPullIndicator={false}
      variant="fullscreen"
      lockTouchMove={false}
    >
      <div className="flex h-full min-h-0 flex-col bg-white">
        <div
          className="flex shrink-0 items-center justify-between border-b border-[#E5E5E5] bg-white px-5 pb-4"
          style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}
        >
          {hasMapToolbar ? (
            <>
              <h2 className="text-[28px] font-semibold leading-none text-[#1B1B1B]">
                {title}
              </h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={`w-10 h-10 border rounded-[10px] flex items-center justify-center transition-all duration-200 ${
                    showLabels
                      ? 'bg-[#EBFCF4] text-[#016853] border-[#00DF8B]'
                      : 'bg-white text-[#5F5F5F] border-[#E0E0E0] active:bg-[#F9FAFB]'
                  }`}
                  onClick={onToggleLabels}
                  aria-label="Toggle labels"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6h.008v.008H6V6Z"
                    />
                  </svg>
                </button>

                <div className="bg-[#F2F4F7] p-1 rounded-[10px] flex gap-0.5">
                  <button
                    className={`px-4 py-2 text-sm font-semibold rounded-lg border-none transition-all duration-200 ${
                      mapType === 'roadmap'
                        ? 'bg-white text-[#016853] shadow-[0_2px_4px_rgba(0,0,0,0.05)]'
                        : 'bg-transparent text-[#5F5F5F]'
                    }`}
                    onClick={() => onMapTypeChange('roadmap')}
                  >
                    Map
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-semibold rounded-lg border-none transition-all duration-200 ${
                      mapType === 'satellite'
                        ? 'bg-white text-[#016853] shadow-[0_2px_4px_rgba(0,0,0,0.05)]'
                        : 'bg-transparent text-[#5F5F5F]'
                    }`}
                    onClick={() => onMapTypeChange('satellite')}
                  >
                    Satellite
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[#5F5F5F] transition-colors active:bg-[#F3F4F6]"
                  aria-label={`Close ${title.toLowerCase()}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-[28px] font-semibold leading-none text-[#1B1B1B]">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full text-[#5F5F5F] transition-colors active:bg-[#F3F4F6]"
                aria-label={`Close ${title.toLowerCase()}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </>
          )}
        </div>
        <div className="flex min-h-0 flex-1 overflow-hidden bg-[var(--surface-secondary)]">
          {children}
        </div>
      </div>
    </MobileDrawer>
  );
}
