'use client';

import { FC } from 'react';
import { Icon, IconName } from '@/components/ui/Icon';

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
  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200 py-4">
      <nav className="h-full flex flex-col">
        {/* Explore Section */}
        <div className="px-4 mb-8">
          <h2 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wider">
            Explore
          </h2>
          <ul className="space-y-1">
            {exploreItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Icon name={item.icon} className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Library Section */}
        <div className="px-4 mb-8">
          <h2 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wider">
            Library
          </h2>
          <ul className="space-y-1">
            {libraryItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Icon name={item.icon} className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Items */}
        <div className="mt-auto px-4">
          <ul className="space-y-1">
            {bottomItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Icon name={item.icon} className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}; 