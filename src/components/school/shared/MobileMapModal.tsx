'use client';

import { ReactNode } from 'react';
import { MobileDrawer } from '@/components/ui/MobileDrawer/MobileDrawer';

interface MobileMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function MobileMapModal({
  isOpen,
  onClose,
  title = 'Map',
  children,
}: MobileMapModalProps) {
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
        </div>
        <div className="flex min-h-0 flex-1 overflow-hidden bg-[var(--surface-secondary)]">
          {children}
        </div>
      </div>
    </MobileDrawer>
  );
}
