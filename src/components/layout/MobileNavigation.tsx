'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, IconName } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

const navigationItems: { href: string; label: string; icon: IconName }[] = [
  { href: '/', label: 'Dashboard', icon: 'home' },
  { href: '/explore', label: 'Explore', icon: 'explore' },
  { href: '/library', label: 'Library', icon: 'library' },
  { href: '/playlist', label: 'Playlist', icon: 'playlist' },
  { href: '/player', label: 'Me', icon: 'finished' },
];

export const MobileNavigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#003366] md:hidden">
      <div className="flex items-center justify-between">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 px-2 py-3",
              "text-[14px] font-medium min-w-[72px]",
              pathname === item.href 
                ? "text-white" 
                : "text-blue-200"
            )}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Icon 
                name={item.icon} 
                size="lg"
                className={cn(
                  pathname === item.href 
                    ? "text-white" 
                    : "text-blue-200"
                )} 
              />
            </div>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}; 