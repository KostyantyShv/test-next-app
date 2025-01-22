'use client';

import { FC, useState, useLayoutEffect } from 'react';
import { Icon, IconName } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: IconName;
  label: string;
  href: string;
}

const exploreItems: NavItem[] = [
  { icon: 'home', label: 'Dashboard', href: '/' },
  { icon: 'explore', label: 'Explore', href: '/explore' },
];

const libraryItems: NavItem[] = [
  { icon: 'collections', label: 'Collections', href: '/collections' },
  { icon: 'bookmarks', label: 'Bookmarks', href: '/bookmarks' },
  { icon: 'library', label: 'My Library', href: '/library' },
  { icon: 'history', label: 'View History', href: '/history' },
];

const bottomItems: NavItem[] = [
  { icon: 'playlist', label: 'Playlist', href: '/playlist' },
  { icon: 'notifications', label: 'Notifications', href: '/notifications' },
  { icon: 'settings', label: 'Settings', href: '/settings' },
];

export const LeftSidebar: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <aside className="h-screen bg-white border-r border-border w-64 shrink-0 sticky top-0 left-0">
        <div className="flex h-full flex-col">
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            <Logo />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside 
      className={cn(
        'h-screen bg-white border-r border-border shrink-0 sticky top-0 left-0',
        'transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo and Toggle */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {!isCollapsed && <Logo />}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "p-2 rounded-lg hover:bg-gray-100 transition-colors",
              isCollapsed && "ml-auto"
            )}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon 
              name={isCollapsed ? 'expand' : 'collapse'} 
              size="md"
              className="text-gray-500"
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {/* Explore Section */}
          <div>
            {!isCollapsed && (
              <div className="px-6 mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Explore
              </div>
            )}
            <div className="space-y-1 px-3">
              {exploreItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors",
                    "text-sm font-medium",
                    isCollapsed && "justify-center"
                  )}
                >
                  <Icon name={item.icon} size="md" className="text-gray-500 shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </a>
              ))}
            </div>
          </div>

          {/* Library Section */}
          <div className={cn(!isCollapsed && "mt-8")}>
            {!isCollapsed && (
              <div className="px-6 mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Library
              </div>
            )}
            <div className="space-y-1 px-3">
              {libraryItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors",
                    "text-sm font-medium",
                    isCollapsed && "justify-center"
                  )}
                >
                  <Icon name={item.icon} size="md" className="text-gray-500 shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Bottom Items */}
        <div className="mt-auto px-3 py-4 border-t border-border">
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors",
                  "text-sm font-medium",
                  isCollapsed && "justify-center"
                )}
              >
                <Icon name={item.icon} size="md" className="text-gray-500 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}; 