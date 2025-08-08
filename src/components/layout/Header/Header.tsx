'use client';

import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Search } from './components/Search';
import { Actions } from './components/Actions';

interface HeaderProps {
  className?: string;
  onOpenSidebar?: () => void;
}

export const Header: FC<HeaderProps> = ({ className, onOpenSidebar }) => {
  return (
    <header className={cn('bg-white/80 backdrop-blur-sm sticky top-0 z-[1000] transition-all duration-300 border-b border-gray-100', className)}>
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-center h-18 gap-6">
        {/* Search Container */}
        <div className="flex-1 max-w-[800px] relative">
          <Search />
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-4">
          <Actions />
        </div>
      </div>
    </header>
  );
}; 