'use client';

import { FC, useState, useLayoutEffect } from 'react';
import { Icon, IconName } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CreateCollectionModal } from './CreateCollectionModal';
import { mockCollections } from '@/lib/mocks/collections';
import { CollectionsDropdown } from './CollectionsDropdown';
import { useLeftSidebar } from '@/store/use-left-sidebar';

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
  const { 
    isCollapsed, 
    isCollectionsOpen, 
    setIsCollapsed, 
    setIsCollectionsOpen 
  } = useLeftSidebar();
  const pathname = usePathname();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <aside className={cn(
        'h-screen bg-white border-r border-border shrink-0 sticky top-0 left-0',
        'transition-none',
        isCollapsed ? 'w-16' : 'w-64'
      )}>
        <div className="flex h-full flex-col">
          <div className="h-16 flex items-center px-4 border-b border-border">
            <Logo collapsed={isCollapsed} />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={cn(
      'h-screen bg-white border-r border-border shrink-0 sticky top-0 left-0',
      'transition-all duration-300 ease-in-out',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-border">
          <Logo collapsed={isCollapsed} />
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="ml-auto p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Collapse sidebar"
            >
              <Icon 
                name="collapse" 
                size="md"
                className="text-gray-500"
              />
            </button>
          )}
        </div>

        {/* Main Navigation */}
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
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg transition-colors",
                    "text-sm font-medium",
                    "hover:bg-[var(--menu-hover)]",
                    pathname === item.href && "bg-[var(--menu-active)]",
                    isCollapsed && "justify-center"
                  )}
                >
                  <Icon 
                    name={item.icon} 
                    size="md" 
                    className={cn(
                      "shrink-0",
                      pathname === item.href ? "text-[var(--icon)]" : "text-gray-500"
                    )} 
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              ))}
            </div>
          </div>

          {/* Library Section */}
          <div className={cn(!isCollapsed ? "mt-8" : "mt-1")}>
            {!isCollapsed && (
              <div className="px-6 mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Library
              </div>
            )}
            <div className="space-y-1 px-3">
              {libraryItems.map((item) => {
                const isCollections = item.href === '/collections';
                
                return (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg transition-colors",
                        "text-sm font-medium",
                        "hover:bg-[var(--menu-hover)]",
                        pathname === item.href && "bg-[var(--menu-active)]",
                        isCollapsed && "justify-center"
                      )}
                    >
                      <Icon 
                        name={item.icon} 
                        size="md" 
                        className={cn(
                          "shrink-0",
                          pathname === item.href ? "text-[var(--icon)]" : "text-gray-500"
                        )} 
                      />
                      {!isCollapsed && (
                        <>
                          <span>{item.label}</span>
                          {isCollections && (
                            <div className="ml-auto flex items-center gap-1">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsCreateModalOpen(true);
                                }}
                                className="p-1 hover:bg-gray-200 rounded-md"
                                aria-label="Add collection"
                              >
                                <Icon name="plus" size="xs" className="text-gray-500" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsCollectionsOpen(!isCollectionsOpen);
                                }}
                                className="p-1 hover:bg-gray-200 rounded-md"
                                aria-label="Toggle collections"
                              >
                                <Icon 
                                  name="chevron-up" 
                                  size="xs" 
                                  className={cn(
                                    "text-gray-500 transition-transform",
                                    isCollectionsOpen ? "rotate-180" : ""
                                  )} 
                                />
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </Link>
                    {isCollections && (
                      <CollectionsDropdown
                        collections={mockCollections}
                        isOpen={isCollectionsOpen}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Expand Button - Before Bottom Items */}
        {isCollapsed && (
          <div className="px-3 py-2">
            <button
              onClick={() => setIsCollapsed(false)}
              className="w-full p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
              aria-label="Expand sidebar"
            >
              <Icon 
                name="expand" 
                size="md"
                className="text-gray-500"
              />
            </button>
          </div>
        )}

        {/* Bottom Items */}
        <div className="px-3 py-4 border-t border-border">
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg transition-colors",
                  "text-sm font-medium",
                  "hover:bg-[var(--menu-hover)]",
                  pathname === item.href && "bg-[var(--menu-active)]",
                  isCollapsed && "justify-center"
                )}
              >
                <Icon 
                  name={item.icon} 
                  size="md" 
                  className={cn(
                    "shrink-0",
                    pathname === item.href ? "text-[var(--icon)]" : "text-gray-500"
                  )} 
                />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CreateCollectionModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </aside>
  );
}; 