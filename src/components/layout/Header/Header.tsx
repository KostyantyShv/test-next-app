'use client';

import { FC, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Search } from './components/Search';
import { Actions } from './components/Actions';
import { MobileActions } from './components/MobileActions/MobileActions';

interface HeaderProps {
  className?: string;
  onOpenSidebar?: () => void;
}

export const Header: FC<HeaderProps> = ({ className, onOpenSidebar }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={cn('bg-white/80 backdrop-blur-sm sticky top-0 z-[1000] transition-all duration-300 ', className)}>
        {/* Desktop Header */}
        <div className="hidden md:block">
          <div className="max-w-[1400px] h-[63px] px-6 flex items-center justify-center h-18 gap-6 mx-auto">
            {/* Search Container */}
            <div className="flex-1 max-w-[800px] relative">
              <Search />
            </div>
            {/* Header Actions */}
            <div className="flex items-center gap-4">
              <Actions />
            </div>
          </div>
          <div className="h-[12px] bg-[#f8fcff] flex-shrink-0 border-t border-gray-200"></div>
        </div>
        

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-5 py-4">
          {/* Menu Button */}
          <button 
            onClick={onOpenSidebar}
            className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-50 hover:border-green-200 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z" fill="currentColor" />
            </svg>
          </button>

          {/* Mobile Actions */}
          <MobileActions />

        </div>

        {/* Scroll Progress Indicator */}
        <div className="md:hidden h-0.5 bg-gray-100 w-full">
          <div 
            className="h-full bg-[#00DF8B] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
          <div className="h-[12px] bg-[#f8fcff] flex-shrink-0 border-t border-gray-100"></div>

        </div>

      </header>
    </>
  );
}; 