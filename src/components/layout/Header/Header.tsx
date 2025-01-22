'use client';

import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Search } from './components/Search';
import { Filters } from './components/Filters';
import { Icon } from '@/components/ui/Icon';
// import { Actions } from './components/Actions';

interface HeaderProps {
  className?: string;
  onOpenSidebar?: () => void;
}

export const Header: FC<HeaderProps> = ({ className, onOpenSidebar }) => {
  return (
    <header className={cn('h-16 bg-white border-b border-gray-200', className)}>
      <div className="h-full px-4 flex items-center justify-between gap-4">
        {/* Left section with menu button on mobile */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenSidebar}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Icon name="arrow-right" size="md" className="text-gray-500" />
          </button>
        </div>

        {/* Center section */}
        <div className="flex-1 max-w-3xl flex items-center gap-4">
          <Search />
          <Filters />
        </div>

        {/* Right section */}
        {/* <Actions /> */}
      </div>
    </header>
  );
}; 