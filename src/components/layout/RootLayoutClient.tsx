"use client";

import { useState, useEffect } from "react";
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
  const [isListingPageScrolled, setIsListingPageScrolled] = useState(false);
  const { isPlayerVisible, isPlaylistVisible } = useAudioPlayer();
  const pathname = usePathname();
  
  // Check if current route is an auth route
  const isAuthRoute = AUTH_ROUTES.some(route => pathname?.startsWith(route));
  
  // Check if current route is team-members-dashboard (hide header on mobile)
  const isTeamMembersPage = pathname?.startsWith("/team-members-dashboard");
  
  // Check if current route is listing page
  const isListingPage = pathname?.startsWith("/listing");
  
  // Hide default header on listing page when scrolled (sticky header replaces it)
  useEffect(() => {
    if (!isListingPage) {
      setIsListingPageScrolled(false);
      return;
    }
    
    const handleScroll = () => {
      setIsListingPageScrolled(window.scrollY > 100);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isListingPage]);

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
          {/* Mobile Header - hide while mobile sidebar is open */}
          {!(isTeamMembersPage) && !isMobileSidebarOpen && (
            <div className="md:hidden">
              <Header onOpenSidebar={() => setIsMobileSidebarOpen(true)} />
              <div className="h-[12px] flex-shrink-0" />
            </div>
          )}
          
          {/* Desktop Header - hide on listing page when scrolled (sticky header replaces it) */}
          {!(isTeamMembersPage) && !(isListingPage && isListingPageScrolled) && (
            <div className="hidden md:block">
              <Header onOpenSidebar={() => setIsMobileSidebarOpen(true)} />
              <div className="h-[12px] flex-shrink-0" />
            </div>
          )}
          
          {/* Show header on desktop even for team-members-dashboard */}
          {isTeamMembersPage && (
            <div className="hidden md:block">
              <Header onOpenSidebar={() => setIsMobileSidebarOpen(true)} />
              <div className="h-[12px] flex-shrink-0" />
            </div>
          )}

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

          {/* Mobile Navigation - show only when player is not visible and not on team-members-dashboard */}
          {!isPlayerVisible && !isTeamMembersPage && <MobileNavigation />}

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
