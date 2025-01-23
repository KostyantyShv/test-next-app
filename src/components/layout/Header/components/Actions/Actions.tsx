'use client';

import { FC } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Icon } from '@/components/ui/Icon';
import { Filters } from '../Filters';
import { useEffect, useState } from 'react';

export const Actions: FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {/* Filters button */}
      <Filters />

      {/* Notifications */}
      <button 
        className="p-2 hover:bg-gray-200 rounded-lg transition-colors relative"
        aria-label="View notifications"
      >
        <Icon name="notifications" className="w-5 h-5 text-gray-500" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      {/* Dark Mode Toggle */}
      <button 
        onClick={toggleTheme}
        className="p-2 hover:bg-gray-200 rounded-lg transition-all duration-300"
        aria-label="Toggle dark mode"
      >
        <Icon 
          name={theme === 'dark' ? 'sun' : 'moon'} 
          className="w-5 h-5 text-gray-500 transition-transform duration-300 rotate-0 scale-100" 
        />
      </button>

      {/* User Profile Link */}
      <Link 
        href="/player"
        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
        aria-label="Go to profile"
      >
        <Icon name="user" className="w-5 h-5 text-gray-500" />
      </Link>
    </div>
  );
};
