"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { LeftSidebar } from "@/components/layout/Sidebar/Left";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { MobileLeftSidebar } from "@/components/layout/Sidebar/Left/MobileLeftSidebar";
import { RightSidebar } from "./Sidebar/Right";
import { AudioPlayer } from "@/components/player/AudioPlayer";
import { Playlist } from "@/components/player/Playlist/Playlist";
import { useAudioPlayer } from "@/store/use-audio-player";
import { cn } from "@/lib/utils";
import PageContainer from "./PageContainer";

// Routes where header and sidebars should be hidden
const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/verification"];

export const RootLayoutClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { isPlayerVisible, isPlaylistVisible } = useAudioPlayer();
  const pathname = usePathname();
  
  // Check if current route is an auth route
  const isAuthRoute = AUTH_ROUTES.some(route => pathname?.startsWith(route));

  // If auth route, render children without layout
  if (isAuthRoute) {
    return <>{children}</>;
  }

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
        <div className="hidden md:block z-[100]">
          <LeftSidebar />
        </div>

        <div className="flex-1 flex flex-col">
          {/* Header with mobile menu button */}
          <Header onOpenSidebar={() => setIsMobileSidebarOpen(true)} />
          
          {/* Spacer to maintain gap under sticky header */}
          <div className="h-[12px] flex-shrink-0" />

          {/* Main Content */}
          <main
            className={cn(
              "flex-1",
              isPlayerVisible
                ? "pb-[72px] md:pb-[72px]" // Player visible: reserve player height
                : "pb-[56px] md:pb-0" // Player hidden: reserve mobile nav height
            )}
          >
            <PageContainer>{children}</PageContainer>
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
