'use client';

import { FC, ReactNode, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Portal } from '@/components/ui/Portal';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const MobileDrawer: FC<MobileDrawerProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <Portal containerId="mobile-drawers">
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-[2500] transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={cn(
          "fixed left-0 w-full max-h-[85%] bg-white rounded-t-[20px] z-[3000] transition-all duration-300 md:hidden",
          "flex flex-col shadow-[0_-2px_10px_rgba(0,0,0,0.1)]",
          isOpen ? "bottom-0" : "-bottom-full"
        )}
      >
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-center relative border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button 
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-5">
          {children}
        </div>
      </div>
    </Portal>
  );
};

