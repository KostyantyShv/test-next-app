"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { LeftSidebar } from "@/components/layout/Sidebar/Left";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { MobileLeftSidebar } from "@/components/layout/Sidebar/Left/MobileLeftSidebar";
import { RightSidebar } from "./Sidebar/Right";
import { AudioPlayer } from "@/components/player/AudioPlayer";
import { Playlist } from "@/components/player/Playlist/Playlist";
import { useAudioPlayer } from "@/store/use-audio-player";
import { useListingStickyHeader } from "@/store/use-listing-sticky-header";
import { useLeftSidebar } from "@/store/use-left-sidebar";
import { cn } from "@/lib/utils";
import PageContainer from "./PageContainer";
import { OpenMobileSidebarProvider } from "@/context/OpenMobileSidebarContext";
import { useIsMobile } from "@/hooks/useIsMobile";

// Routes where header and sidebars should be hidden
const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/verification"];

// Routes that use their own mobile header (Explore / Collections)
const EXPLORE_COLLECTIONS_ROUTES = [
  "/schools/explore",
  "/schools/collections",
  "/collections",
];

export const RootLayoutClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const { isPlayerVisible, isPlaylistVisible } = useAudioPlayer();
  const isLeftSidebarCollapsed = useLeftSidebar((s) => s.isCollapsed);
  const isDesktopListingStickyHeaderVisible = useListingStickyHeader(
    (s) => s.isDesktopStickyHeaderVisible
  );
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const openMobileSidebar = useCallback(
    () => setIsMobileSidebarOpen(true),
    []
  );

  // Prevent hydration mismatches caused by client-only persisted UI state (e.g. sidebar collapsed).
  // First render (server + initial client) uses a stable default; then we sync after mount.
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  // Check if current route is an auth route
  const isAuthRoute = AUTH_ROUTES.some(route => pathname?.startsWith(route));

  // Routes that use their own mobile header (Explore / Collections) — hide default app header on mobile
  const isExploreOrCollectionsPage = EXPLORE_COLLECTIONS_ROUTES.some(
    (route) =>
      pathname === route ||
      (route !== "/collections" && pathname?.startsWith(route))
  );
  const hideDefaultMobileHeader = isMobile && isExploreOrCollectionsPage;
  
  // Check if current route is team-members-dashboard (hide header on mobile)
  const isTeamMembersPage = pathname?.startsWith("/team-members-dashboard");
  const isListingPage =
    pathname?.startsWith("/listing") || pathname?.startsWith("/schools/listing");

  // If auth route, render children without layout
  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <OpenMobileSidebarProvider openSidebar={openMobileSidebar}>
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar */}
      <MobileLeftSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Playlist */}
      {isPlaylistVisible && <Playlist />}

      <div className="flex h-full min-w-0">
        {/* Desktop Sidebar: keep always visible (fixed) */}
        <div
          className={cn(
            "hidden md:block shrink-0",
            (hasMounted ? isLeftSidebarCollapsed : false) ? "w-20" : "w-64"
          )}
          aria-hidden="true"
        />
        <div className="hidden md:block fixed top-0 left-0 h-screen z-[1000]">
          <LeftSidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header - hide on Explore/Collections (they use their own); hide while mobile sidebar is open */}
          {!(isTeamMembersPage) && !isMobileSidebarOpen && !hideDefaultMobileHeader && (
            <div className="md:hidden">
              <Header onOpenSidebar={() => setIsMobileSidebarOpen(true)} />
              <div className="h-[12px] flex-shrink-0" />
            </div>
          )}
          
          {/* Desktop Header (hide on listing when listing sticky header is visible) */}
          {!(isTeamMembersPage) &&
            !(isListingPage && isDesktopListingStickyHeaderVisible) && (
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
    </OpenMobileSidebarProvider>
  );
};
