'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, IconName } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { CollectionsDropdown } from './CollectionsDropdown';
import { CreateCollectionModal } from './CreateCollectionModal';
import { mockCollections } from '@/lib/mocks/collections';

interface NavItem {
  icon: IconName;
  label: string;
  href: string;
}

const navigationItems: NavItem[] = [
  { icon: 'home', label: 'Dashboard', href: '/' },
  { icon: 'explore', label: 'Explore', href: '/explore' },
  { icon: 'collections', label: 'Collections', href: '/collections' },
  { icon: 'bookmarks', label: 'Bookmarks', href: '/bookmarks' },
  { icon: 'library', label: 'My Library', href: '/library' },
  { icon: 'history', label: 'View History', href: '/history' },
  { icon: 'playlist', label: 'Playlist', href: '/playlist' },
  { icon: 'notifications', label: 'Notifications', href: '/notifications' },
  { icon: 'settings', label: 'Settings', href: '/settings' },
];

interface SidebarContentProps {
  variant?: 'desktop' | 'mobile';
  isCollapsed?: boolean;
}

export const SidebarContent: FC<SidebarContentProps> = ({ 
  variant = 'desktop',
  isCollapsed = false 
}) => {
  const pathname = usePathname();
  const [isCollectionsDropdownOpen, setIsCollectionsDropdownOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (variant === 'mobile') {
    return (
      <>
        <nav>
          {navigationItems.map((item) => {
            const isCollections = item.href === '/collections';
            
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-5 px-6 py-4",
                    "text-[16px] font-medium text-gray-600",
                    "hover:bg-[var(--menu-hover)]",
                    pathname === item.href && "bg-[var(--menu-active)]"
                  )}
                >
                  <Icon 
                    name={item.icon} 
                    size="lg"
                    className={cn(
                      "shrink-0",
                      pathname === item.href ? "text-[var(--icon)]" : "text-gray-500"
                    )} 
                  />
                  <span className="flex-1">{item.label}</span>
                  {isCollections && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsCreateModalOpen(true);
                        }}
                        className="p-1 hover:bg-gray-200 rounded-md"
                        aria-label="Add collection"
                      >
                        <Icon name="plus" size="sm" className="text-gray-500" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsCollectionsDropdownOpen(!isCollectionsDropdownOpen);
                        }}
                        className="p-1 hover:bg-gray-200 rounded-md"
                        aria-label="Toggle collections"
                      >
                        <Icon 
                          name="chevron-up" 
                          size="sm" 
                          className={cn(
                            "text-gray-500 transition-transform",
                            isCollectionsDropdownOpen ? "rotate-180" : ""
                          )} 
                        />
                      </button>
                    </div>
                  )}
                </Link>
                {isCollections && (
                  <CollectionsDropdown
                    collections={mockCollections}
                    isOpen={isCollectionsDropdownOpen}
                    variant="mobile"
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* Create Collection Modal */}
        <CreateCollectionModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </>
    );
  }

  // Desktop version remains unchanged
  return (
    <nav className="flex flex-col py-4">
      {/* Explore Section */}
      <div className={'mb-8'}>
        <div className={cn(
          "px-3 mb-2",
          'text-sm font-medium text-gray-500'
        )}>
          EXPLORE
        </div>
        {navigationItems.slice(0, 2).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3",
              "px-3 py-4 text-base",
              "font-medium",
              "hover:bg-gray-100",
              pathname === item.href && "text-primary",
              isCollapsed && variant === 'desktop' && "justify-center"
            )}
          >
            <Icon 
              name={item.icon} 
              size={"lg"}
              className={pathname === item.href ? "text-primary" : "text-gray-500"} 
            />
            {(!isCollapsed) && <span>{item.label}</span>}
          </Link>
        ))}
      </div>

      {/* Library Section */}
      <div className={'mt-8 mb-8'}>
        <div className={cn(
          "px-3 mb-2",
          'text-sm font-medium text-gray-500'
        )}>
          LIBRARY
        </div>
        {navigationItems.slice(2, 5).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3",
              "px-3 py-4 text-base",
              "font-medium",
              "hover:bg-gray-100",
              pathname === item.href && "text-primary",
              isCollapsed && variant === 'desktop' && "justify-center"
            )}
          >
            <Icon 
              name={item.icon} 
              size={"lg"}
              className={pathname === item.href ? "text-primary" : "text-gray-500"} 
            />
            {(!isCollapsed) && <span>{item.label}</span>}
          </Link>
        ))}
      </div>

      {/* Bottom Items */}
      <div className="mt-8">
        {navigationItems.slice(5).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3",
              "px-3 py-4 text-base",
              "font-medium",
              "hover:bg-gray-100",
              pathname === item.href && "text-primary",
              isCollapsed && variant === 'desktop' && "justify-center"
            )}
          >
            <Icon 
              name={item.icon} 
              size={"lg"}
              className={pathname === item.href ? "text-primary" : "text-gray-500"} 
            />
            {(!isCollapsed) && <span>{item.label}</span>}
          </Link>
        ))}
      </div>
    </nav>
  );
}; 