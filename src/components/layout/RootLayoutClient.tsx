'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { LeftSidebar } from '@/components/layout/Sidebar/Left';
import { MobileNavigation } from '@/components/layout/MobileNavigation';
import { MobileLeftSidebar } from '@/components/layout/Sidebar/Left/MobileLeftSidebar';
import { RightSidebar } from './Sidebar/Right';

export const RootLayoutClient = ({ children }: { children: React.ReactNode }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar */}
      <MobileLeftSidebar 
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex h-full">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <LeftSidebar/>
        </div>

        <div className="flex-1 flex flex-col">
          {/* Header with mobile menu button */}
          <Header onOpenSidebar={() => setIsMobileSidebarOpen(true)} />
          
          {/* Main Content */}
          <main className="flex-1 pb-[72px] md:pb-0">
            {children}
          </main>

          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>

        {/* Right Sidebar */}
        <aside className="hidden md:block">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
}; 