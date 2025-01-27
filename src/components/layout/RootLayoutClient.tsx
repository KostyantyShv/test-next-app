'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { LeftSidebar } from '@/components/layout/Sidebar/Left';
import { MobileNavigation } from '@/components/layout/MobileNavigation';
import { MobileLeftSidebar } from '@/components/layout/Sidebar/Left/MobileLeftSidebar';
import { RightSidebar } from './Sidebar/Right';
import { AudioPlayer } from '@/components/player/AudioPlayer';
import { Playlist } from '@/components/player/Playlist/Playlist';
import { useAudioPlayer } from '@/store/use-audio-player';
import { cn } from '@/lib/utils';

export const RootLayoutClient = ({ children }: { children: React.ReactNode }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { isPlayerVisible, isPlaylistVisible } = useAudioPlayer();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar */}
      <MobileLeftSidebar 
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Playlist */}
      {isPlaylistVisible && <Playlist />}

      <div className="flex h-full">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <LeftSidebar/>
        </div>

        <div className="flex-1 flex flex-col">
          {/* Header with mobile menu button */}
          <Header onOpenSidebar={() => setIsMobileSidebarOpen(true)} />
          
          {/* Main Content */}
          <main className={cn(
            "flex-1",
            isPlayerVisible && "pb-[72px] md:pb-[72px]" // Add padding when player is visible
          )}>
            {children}
          </main>

          {/* Mobile Navigation - show only when player is not visible */}
          {!isPlayerVisible && <MobileNavigation />}

          {/* Audio Player - show when visible */}
          {isPlayerVisible && <AudioPlayer />}
        </div>

        {/* Right Sidebar */}
        <aside>
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
}; 