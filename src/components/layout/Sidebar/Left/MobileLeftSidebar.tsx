'use client';

import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import { SidebarContent } from './SidebarContent';

interface MobileLeftSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileLeftSidebar: FC<MobileLeftSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out md:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border shrink-0">
            <Logo />
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <Icon name="close" size="md" className="text-gray-500" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <SidebarContent variant="mobile" />
          </div>

          {/* User Section */}
          <div className="border-t border-border p-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                <Icon name="finished" size="xl" className="text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-md font-medium truncate">Steven Smith</div>
                <div className="text-sm text-gray-500 truncate">smith@g.com</div>
              </div>
              <button
                className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="User menu"
              >
                <Icon name="finished" size="md" className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 