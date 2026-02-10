"use client";

import { FC, useState, useLayoutEffect, useEffect, useCallback } from "react";
import { Icon, IconName } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CreateCollectionModal } from "./CreateCollectionModal";
import { mockCollections } from "@/lib/mocks/collections";
import { CollectionsDropdown } from "./CollectionsDropdown";
import { useLeftSidebar } from "@/store/use-left-sidebar";
import { useAudioPlayer } from "@/store/use-audio-player";
import { Avatar } from "@/components/ui/Avatar";
import { ContactUsModal } from "@/components/ui/ContactUsModal";
import { createClient } from "@/lib/supabase_utils/client";

// Компонент для відображення імені користувача
const UserProfileName: FC = () => {
  const [userName, setUserName] = useState("User");
  const supabase = createClient();

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, first_name, last_name, email")
          .eq("id", user.id)
          .single();

        if (profile) {
          const name = profile.full_name ||
            `${profile.first_name || ''} ${profile.last_name || ''}`.trim() ||
            profile.email?.split('@')[0] ||
            'User';
          setUserName(name);
        } else {
          setUserName(user.email?.split('@')[0] || 'User');
        }
      } catch (error) {
        console.error('Error loading user name:', error);
      }
    };

    loadUserName();
  }, []);

  return (
    <div className="flex-1">
      <div className="sidebar-user-name font-inter text-sm font-semibold text-gray-700">{userName}</div>
    </div>
  );
};

// Компонент для tooltip при згорнутій sidebar
const UserProfileTooltip: FC = () => {
  const [userName, setUserName] = useState("User");
  const supabase = createClient();

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, first_name, last_name, email")
          .eq("id", user.id)
          .single();

        if (profile) {
          const name = profile.full_name ||
            `${profile.first_name || ''} ${profile.last_name || ''}`.trim() ||
            profile.email?.split('@')[0] ||
            'User';
          setUserName(name);
        } else {
          setUserName(user.email?.split('@')[0] || 'User');
        }
      } catch (error) {
        console.error('Error loading user name:', error);
      }
    };

    loadUserName();
  }, []);

  return (
    <div className="sidebar-tooltip absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-900 text-white px-3 py-2 rounded-lg font-inter text-xs font-medium opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 z-50 whitespace-nowrap">
      {userName}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-y-[5px] border-y-transparent border-r-[5px] border-r-gray-900" />
    </div>
  );
};

interface NavItem {
  icon: IconName;
  label: string;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
  hasSubmenu?: boolean;
  submenuItems?: Array<{
    emoji: string;
    label: string;
    href: string;
  }>;
}

const exploreItems: NavItem[] = [
  { icon: "compass", label: "Explore", href: "/schools/explore" },
  { icon: "activity", label: "Leaderboard", href: "/schools/leaderboard" },
];

const libraryItems: NavItem[] = [
  { icon: "bookmark-heart", label: "Liked", href: "/liked" },
  {
    icon: "collections",
    label: "Collections",
    href: "/collections",
    hasSubmenu: true,
    submenuItems: [
      { emoji: "🏫", label: "Collection ABC", href: "/collections/abc" },
      { emoji: "🎓", label: "Collection XYZ", href: "/collections/xyz" },
      { emoji: "📚", label: "Collection 789", href: "/collections/789" },
      { emoji: "📖", label: "Collection DEF", href: "/collections/def" },
    ]
  },
  { icon: "history-clock", label: "Recently Viewed", href: "/recent" },
  { icon: "users", label: "My Listings", href: "/listing" },
  { icon: "calendar", label: "Calendar", href: "/calendar" },
  {
    icon: "zap",
    label: "Monitors",
    href: "/monitors",
    hasSubmenu: true,
    submenuItems: [
      { emoji: "📊", label: "Performance Monitor", href: "/monitors/performance" },
      { emoji: "🔍", label: "SEO Monitor", href: "/monitors/seo" },
      { emoji: "💰", label: "Price Monitor", href: "/monitors/price" },
      { emoji: "🚨", label: "Alert Monitor", href: "/monitors/alerts" },
    ]
  },
  {
    icon: "trending-up",
    label: "Analytics",
    href: "/analytics",
    hasSubmenu: true,
    submenuItems: [
      { emoji: "📈", label: "Traffic Analytics", href: "/analytics/traffic" },
      { emoji: "👥", label: "User Analytics", href: "/analytics/users" },
      { emoji: "💸", label: "Revenue Analytics", href: "/analytics/revenue" },
      { emoji: "🎯", label: "Goal Analytics", href: "/analytics/goals" },
    ]
  },
  { icon: "lock-keyhole", label: "My Library", href: "/library" },
];

const bottomItems: NavItem[] = [
  {
    icon: "list-todo",
    label: "Playlist",
    href: "#",
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      useAudioPlayer.getState().setPlaylistVisible(true);
    },
  },
  { icon: "bell", label: "Notifications", href: "/notifications" },
  { icon: "sliders", label: "Settings", href: "/settings" },
];

export const LeftSidebar: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const {
    isCollapsed: storeIsCollapsed,
    isCollectionsOpen,
    setIsCollapsed,
    setIsCollectionsOpen,
  } = useLeftSidebar();
  const pathname = usePathname();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());
  const [floatingTooltip, setFloatingTooltip] = useState<{
    label: string;
    top: number;
    left: number;
  } | null>(null);

  const isCollapsed = mounted ? storeIsCollapsed : true;

  const showFloatingTooltip = useCallback(
    (label: string, target: HTMLElement) => {
      if (!isCollapsed) return;
      const rect = target.getBoundingClientRect();
      setFloatingTooltip({
        label,
        top: rect.top + rect.height / 2,
        left: rect.right + 12,
      });
    },
    [isCollapsed]
  );

  const hideFloatingTooltip = useCallback(() => {
    setFloatingTooltip(null);
  }, []);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isCollapsed) {
      setFloatingTooltip(null);
    }
  }, [isCollapsed]);

  // Close avatar dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is outside the user profile block and dropdown
      if (isAvatarDropdownOpen && !target.closest('.user-profile-block') && !target.closest('[data-avatar-dropdown]')) {
        setIsAvatarDropdownOpen(false);
      }
    };

    if (isAvatarDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAvatarDropdownOpen]);

  const toggleSubmenu = (menuId: string) => {
    const newOpenSubmenus = new Set(openSubmenus);
    if (newOpenSubmenus.has(menuId)) {
      newOpenSubmenus.delete(menuId);
    } else {
      newOpenSubmenus.add(menuId);
    }
    setOpenSubmenus(newOpenSubmenus);
  };

  if (!mounted) {
    return (
      <aside
        data-collapsed={isCollapsed ? "true" : "false"}
        className={cn(
          "sticky top-0 left-0 z-20 h-screen w-64 shrink-0 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex h-full flex-col">
          <div
            className={cn(
              "sidebar-logo flex items-center gap-3 border-b border-transparent relative flex-shrink-0 h-[76px]",
              isCollapsed && "justify-center"
            )}
          >
            <Logo collapsed={isCollapsed} />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      data-collapsed={isCollapsed ? "true" : "false"}
      className={cn(
        "sticky top-0 left-0 z-20 h-screen w-64 shrink-0 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo Container */}
        <div
          className={cn(
            "sidebar-logo flex items-center gap-3 border-b border-transparent relative flex-shrink-0 h-[76px]",
            isCollapsed && "justify-center"
          )}
        >
          <Logo collapsed={isCollapsed} />
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="sidebar-collapse-button absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded transition-all duration-200 text-gray-500 hover:bg-green-50 hover:text-green-700"
              aria-label="Collapse sidebar"
            >
              <svg data-name="expand-panel" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                <g transform="scale(-1,1) translate(-16, 0)">
                  <path fill="currentColor" d="M9.53132 13.3098C9.22006 13.6466 8.71541 13.6466 8.40415 13.3098C8.0929 12.973 8.0929 12.4269 8.40415 12.0901L11.56 8.67494H5.07116C4.63098 8.67494 4.27413 8.28878 4.27413 7.81244C4.27413 7.33609 4.63098 6.94994 5.07116 6.94994H11.56L8.40415 3.53481C8.0929 3.19799 8.0929 2.65188 8.40415 2.31505C8.71541 1.97823 9.22006 1.97823 9.53132 2.31505L14.0478 7.20256C14.3591 7.53938 14.3591 8.08549 14.0478 8.42232L9.53132 13.3098ZM1.48453 2.04248C1.92471 2.04248 2.28156 2.42865 2.28156 2.90498V12.5976C2.28156 13.0739 1.92471 13.4601 1.48453 13.4601C1.04435 13.4601 0.6875 13.0739 0.6875 12.5976L0.687499 2.90498C0.687499 2.42865 1.04434 2.04248 1.48453 2.04248Z" clipRule="evenodd" fillRule="evenodd" />
                </g>
              </svg>
            </button>
          )}
        </div>

        {/* Scrollable Navigation Area */}
        <div
          className="sidebar-scrollable flex-1 overflow-y-auto overflow-x-visible sidebar-scroll"
          onScroll={hideFloatingTooltip}
        >
          {/* Custom scrollbar styles */}
          <style jsx>{`
            .sidebar-scroll::-webkit-scrollbar {
              width: 4px;
            }
            .sidebar-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            .sidebar-scroll::-webkit-scrollbar-thumb {
              background-color: var(--surface-tertiary);
              border-radius: 2px;
            }
          `}</style>

          <nav className="py-4">
            {/* Explore Section */}
            <div className="mb-4">
              <div
                className={cn(
                  "sidebar-section-header font-inter font-semibold text-gray-600 uppercase tracking-wider",
                  isCollapsed ? "px-2 py-2 text-xs" : "px-5 mb-2 text-xs"
                )}
              >
                {isCollapsed ? "EXPLORE" : "Explore"}
              </div>
              <div className="space-y-1 px-2">
                {exploreItems.map((item, idx) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={(e) => showFloatingTooltip(item.label, e.currentTarget)}
                    onMouseLeave={hideFloatingTooltip}
                    className={cn(
                      "sidebar-nav-item flex items-center gap-3 px-3 py-2 text-gray-600 transition-all duration-200 relative group",
                      "font-inter text-sm font-medium border border-transparent",
                      "hover:bg-green-50 hover:border-green-200",
                      pathname === item.href && "bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-700 is-active",
                      isCollapsed ? "justify-center w-11 h-11 mx-auto rounded-[12px]" : "rounded-3xl"
                    )}
                  >
                    {/* SVG from prototype */}
                    {idx === 0 && (
                      // Explore SVG
                      <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="1" stroke="none" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                        <g id="Compass">
                          <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" clipRule="evenodd" fillRule="evenodd" />
                          <path d="M16.9471 7.05269C17.2149 7.32052 17.3085 7.71669 17.1887 8.07602L15.0687 14.436C14.9692 14.7346 14.7348 14.9689 14.4362 15.0685L8.07623 17.1885C7.7169 17.3083 7.32073 17.2147 7.0529 16.9469C6.78507 16.6791 6.69154 16.2829 6.81132 15.9236L8.93132 9.56356C9.03086 9.26496 9.26517 9.03064 9.56378 8.93111L15.9238 6.81111C16.2831 6.69133 16.6793 6.78485 16.9471 7.05269ZM10.6706 10.6704L9.34115 14.6587L13.3294 13.3292L14.6589 9.34093L10.6706 10.6704Z" clipRule="evenodd" fillRule="evenodd" />
                        </g>
                      </svg>
                    )}
                    {idx === 1 && (
                      // Leaderboard SVG
                      <svg viewBox="0 0 256 256" fill="currentColor" className="w-5 h-5 shrink-0"><g><path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z"></path></g></svg>
                    )}
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                ))}
              </div>
            </div>

            {/* Library Section */}
            <div className="mb-4">
              <div
                className={cn(
                  "sidebar-section-header font-inter font-semibold text-gray-600 uppercase tracking-wider",
                  isCollapsed ? "px-2 py-2 text-xs" : "px-5 mb-2 text-xs"
                )}
              >
                {isCollapsed ? "LIBRARY" : "Library"}
              </div>
              <div className="space-y-1 px-2">
                {libraryItems.map((item, idx) => {
                  const isActive = pathname === item.href;
                  const hasSubmenu = item.hasSubmenu;
                  const submenuId = `submenu-${item.label.toLowerCase()}`;
                  const isSubmenuOpen = openSubmenus.has(submenuId);

                  return (
                    <div key={item.href}>
                      <div
                        className={cn(
                          "sidebar-nav-item flex items-center gap-3 px-3 py-2 text-gray-600 transition-all duration-200 cursor-pointer relative group",
                          "font-inter text-sm font-medium border border-transparent",
                          "hover:bg-green-50 hover:border-green-200",
                          isActive && "bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-700 is-active",
                          isCollapsed ? "justify-center w-11 h-11 mx-auto rounded-[12px]" : "rounded-3xl"
                        )}
                        onMouseEnter={(e) => {
                          showFloatingTooltip(item.label, e.currentTarget);
                          if (!isCollapsed && hasSubmenu) {
                            e.currentTarget.querySelector('.action-buttons')?.classList.add('opacity-100');
                          }
                        }}
                        onMouseLeave={(e) => {
                          hideFloatingTooltip();
                          if (!isCollapsed && hasSubmenu) {
                            e.currentTarget.querySelector('.action-buttons')?.classList.remove('opacity-100');
                          }
                        }}
                        onClick={(e) => {
                          if (hasSubmenu) {
                            e.preventDefault();
                            // For Analytics, navigate to /analytics page
                            if (item.href === "/analytics") {
                              window.location.href = "/analytics";
                            }
                            // For Collections, navigate to /collections page
                            else if (item.href === "/collections") {
                              window.location.href = "/collections";
                            }
                            // For Monitors, navigate to /monitors first, then toggle submenu
                            else if (item.href === "/monitors") {
                              window.location.href = "/monitors";
                            }
                            // For other items with submenu, do nothing on main click - use button
                            // Submenu toggle will be handled by button click
                          } else {
                            // Navigate to the href if no submenu
                            window.location.href = item.href;
                          }
                        }}
                      >
                        {/* SVG from prototype */}
                        {idx === 0 && (
                          // Liked SVG
                          <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                            <path d="M21.15 4.71H2.86C2.39 4.71 2 4.32 2 3.85C2 3.38 2.39 3 2.86 3H21.15C21.62 3 22 3.37 22 3.85C22 4.33 21.62 4.71 21.15 4.71Z" />
                            <path d="M17.4799 15.1463C17.7099 15.3664 17.7699 15.3664 17.9799 15.1463H17.9699C18.7699 14.2959 20.4199 14.556 21.2399 15.4165C21.6399 15.8267 22.0799 16.537 21.9799 17.6176C21.7931 19.8018 18.328 22.0441 18.1844 22.1371L18.1799 22.1399C18.0299 22.22 17.8599 22.27 17.7199 22.27C17.5799 22.27 17.3899 22.22 17.2599 22.1299C17.2399 22.1199 13.6699 19.8387 13.4699 17.6176C13.2399 15.1763 15.9199 13.6956 17.4799 15.1463ZM17.7299 20.389C18.9199 19.5386 20.1999 18.2279 20.2899 17.4875C20.3199 17.1173 20.2299 16.8272 20.0099 16.6071C19.7499 16.3369 19.2299 16.3469 19.0399 16.497C18.7296 16.7366 18.5608 17.0391 18.5126 17.1254C18.5064 17.1364 18.5022 17.144 18.4999 17.1474C18.4958 17.1536 18.489 17.1651 18.4802 17.18C18.4466 17.2369 18.3833 17.3441 18.3199 17.4075C18.2399 17.4875 18.0699 17.5876 18.0199 17.5976C17.9799 17.6176 17.8199 17.6476 17.7199 17.6476C17.6199 17.6476 17.4799 17.6176 17.4199 17.5976C17.3599 17.5776 17.2199 17.4975 17.1299 17.4075C17.0537 17.3397 17.0134 17.2647 16.9724 17.1886C16.965 17.1749 16.9576 17.1611 16.9499 17.1474L16.9391 17.1275C16.88 17.019 16.7282 16.7405 16.4099 16.497C16.3299 16.427 16.1799 16.387 16.0199 16.387C15.8099 16.387 15.5799 16.437 15.4399 16.5871C15.2199 16.8272 15.1299 17.0973 15.1599 17.4775C15.2299 18.1979 16.5199 19.5186 17.7299 20.389Z" />
                            <path d="M21.15 10.3138H2.86C2.39 10.3138 2 10.6938 2 11.1638C2 11.6338 2.39 12.0238 2.86 12.0238H21.15C21.62 12.0238 22 11.6438 22 11.1638C22 10.6838 21.62 10.3138 21.15 10.3138Z" />
                            <path d="M2.85 17.6276H11.27C11.74 17.6276 12.12 17.9976 12.12 18.4776C12.12 18.9576 11.74 19.3376 11.27 19.3376H2.85C2.38 19.3376 2 18.9476 2 18.4776C2 18.0076 2.38 17.6276 2.85 17.6276Z" />
                          </svg>
                        )}
                        {idx === 1 && (
                          // Collections SVG
                          <svg fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5 shrink-0">
                            <path d="M24.7994 11.2C26.9202 11.2 28.6555 12.8505 28.7909 14.937L28.7994 15.2V24.7994C28.7994 26.9202 27.149 28.6555 25.0625 28.7909L24.7994 28.7994H15.2C13.0792 28.7994 11.344 27.149 11.2085 25.0625L11.2 24.7994V15.2C11.2 13.0792 12.8505 11.344 14.937 11.2085L15.2 11.2H24.7994ZM19.9997 14.4C19.607 14.4 19.2804 14.683 19.2126 15.0562L19.1997 15.2L19.1984 19.2H15.2L15.0562 19.2129C14.683 19.2806 14.4 19.6073 14.4 20C14.4 20.3927 14.683 20.7194 15.0562 20.7871L15.2 20.8H19.1984L19.1997 24.8L19.2126 24.9438C19.2804 25.317 19.607 25.6 19.9997 25.6C20.3925 25.6 20.7191 25.317 20.7868 24.9438L20.7997 24.8L20.7984 20.8H24.8L24.9438 20.7871C25.317 20.7194 25.6 20.3927 25.6 20C25.6 19.6073 25.317 19.2806 24.9438 19.2129L24.8 19.2H20.7984L20.7997 15.2L20.7868 15.0562C20.7191 14.683 20.3925 14.4 19.9997 14.4ZM20.259 5.91211L20.3353 6.16395L21.2558 9.59982L14.4 9.60003C11.8437 9.60003 9.75417 11.5983 9.60818 14.118L9.60003 14.4L9.60047 22.9562C7.95734 22.9228 6.45777 21.8712 5.90353 20.2642L5.82005 19.9914L3.33553 10.719C2.78664 8.67051 3.93173 6.56719 5.91211 5.89634L6.16395 5.82005L15.4363 3.33553C17.3994 2.80951 19.4129 3.83924 20.1678 5.66898L20.259 5.91211Z" />
                          </svg>
                        )}
                        {idx === 2 && (
                          // Recently Viewed SVG
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                            <path fill="currentColor" d="M17.1282 5.53408C15.6009 4.20127 13.6364 3.47739 11.6095 3.50054C9.58258 3.52369 7.63513 4.29225 6.1387 5.6596C4.64227 7.02694 3.70161 8.89735 3.4962 10.914C3.45422 11.326 3.08614 11.6261 2.67405 11.5841C2.26197 11.5421 1.96194 11.174 2.00392 10.762C2.24668 8.37868 3.35837 6.1682 5.12688 4.55225C6.89539 2.9363 9.19692 2.028 11.5924 2.00064C13.9878 1.97328 16.3095 2.82877 18.1145 4.40391C19.9194 5.97904 21.0813 8.16356 21.3784 10.5407C21.6756 12.9178 21.0872 15.3211 19.7255 17.292C18.3638 19.263 16.3241 20.6637 13.9956 21.2268C11.6672 21.7899 9.21286 21.4761 7.101 20.3452C5.62665 19.5557 4.39125 18.4065 3.50006 17.019V19.838C3.50006 20.2522 3.16427 20.588 2.75006 20.588C2.33584 20.588 2.00006 20.2522 2.00006 19.838V14.838C2.00006 14.4237 2.33584 14.088 2.75006 14.088H3.23256C3.24421 14.0877 3.25584 14.0877 3.26743 14.088H7.75006C8.16427 14.088 8.50006 14.4237 8.50006 14.838C8.50006 15.2522 8.16427 15.588 7.75006 15.588H4.40079C5.1641 17.0404 6.34792 18.2404 7.80911 19.0229C9.59607 19.9798 11.6728 20.2453 13.643 19.7688C15.6133 19.2923 17.3392 18.1072 18.4914 16.4394C19.6436 14.7717 20.1414 12.7381 19.89 10.7267C19.6386 8.71532 18.6555 6.86688 17.1282 5.53408ZM11.7003 7.08789C12.1145 7.08789 12.4503 7.42368 12.4503 7.83789V11.5272L14.2306 13.3076C14.5235 13.6005 14.5235 14.0753 14.2306 14.3682C13.9377 14.6611 13.4628 14.6611 13.1699 14.3682L11.1699 12.3682C11.0293 12.2276 10.9503 12.0368 10.9503 11.8379V7.83789C10.9503 7.42368 11.286 7.08789 11.7003 7.08789Z" clipRule="evenodd" fillRule="evenodd" />
                          </svg>
                        )}
                        {idx === 3 && (
                          // My Listings SVG
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                            <path fill="currentColor" d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z" clipRule="evenodd" fillRule="evenodd" />
                            <path fill="currentColor" d="M10.9684 14.0022C11.1062 14.537 10.7843 15.0823 10.2495 15.22C7.46676 15.9369 5.5 18.2894 5.5 20.9999C5.5 21.5522 5.05228 21.9999 4.5 21.9999C3.94772 21.9999 3.5 21.5522 3.5 20.9999C3.5 17.2714 6.1909 14.2002 9.75054 13.2833C10.2854 13.1455 10.8306 13.4674 10.9684 14.0022Z" clipRule="evenodd" fillRule="evenodd" />
                            <path fill="currentColor" d="M14.5 15.75 C14.9142 15.75 15.25 15.4142 15.25 15 C15.25 14.5858 14.9142 14.25 14.5 14.25 C14.0858 14.25 13.75 14.5858 13.75 15 C13.75 15.4142 14.0858 15.75 14.5 15.75 Z" />
                            <path fill="currentColor" d="M17.25 14.25 H20.75 C21.1642 14.25 21.5 14.5858 21.5 15 C21.5 15.4142 21.1642 15.75 20.75 15.75 H17.25 C16.8358 15.75 16.5 15.4142 16.5 15 C16.5 14.5858 16.8358 14.25 17.25 14.25 Z" />
                            <path fill="currentColor" d="M14.5 18.75 C14.9142 18.75 15.25 18.4142 15.25 18 C15.25 17.5858 14.9142 17.25 14.5 17.25 C14.0858 17.25 13.75 17.5858 13.75 18 C13.75 18.4142 14.0858 18.75 14.5 18.75 Z" />
                            <path fill="currentColor" d="M17.25 17.25 H20.75 C21.1642 17.25 21.5 17.5858 21.5 18 C21.5 18.4142 21.1642 18.75 20.75 18.75 H17.25 C16.8358 18.75 16.5 18.4142 16.5 18 C16.5 17.5858 16.8358 17.25 17.25 17.25 Z" />
                            <path fill="currentColor" d="M14.5 21.75 C14.9142 21.75 15.25 21.4142 15.25 21 C15.25 20.5858 14.9142 20.25 14.5 20.25 C14.0858 20.25 13.75 20.5858 13.75 21 C13.75 21.4142 14.0858 21.75 14.5 21.75 Z" />
                            <path fill="currentColor" d="M17.25 20.25 H20.75 C21.1642 20.25 21.5 20.5858 21.5 21 C21.5 21.4142 21.1642 21.75 20.75 21.75 H17.25 C16.8358 21.75 16.5 21.4142 16.5 21 C16.5 20.5858 16.8358 20.25 17.25 20.25 Z" />
                          </svg>
                        )}
                        {idx === 4 && (
                          // Calendar SVG
                          <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                            <path d="M8 1a1 1 0 0 1 1 1v1h6V2a1 1 0 1 1 2 0v1.002c.476.003.891.013 1.252.042.562.046 1.079.145 1.564.392a4 4 0 0 1 1.748 1.748c.247.485.346 1.002.392 1.564C22 7.29 22 7.954 22 8.758v8.483c0 .805 0 1.47-.044 2.01-.046.563-.145 1.08-.392 1.565a4 4 0 0 1-1.748 1.748c-.485.247-1.002.346-1.564.392-.541.044-1.206.044-2.01.044H7.758c-.805 0-1.47 0-2.01-.044-.563-.046-1.08-.145-1.565-.392a4 4 0 0 1-1.748-1.748c-.247-.485-.346-1.002-.392-1.564C2 18.71 2 18.046 2 17.242V8.758c0-.805 0-1.47.044-2.01.046-.563.145-1.08.392-1.565a4 4 0 0 1 1.748-1.748c.485-.247 1.002-.346 1.564-.392.361-.03.777-.04 1.252-.042V2a1 1 0 0 1 1-1M7 5.002c-.446.003-.795.012-1.089.036-.438.035-.663.1-.819.18a2 2 0 0 0-.874.874c-.08.156-.145.38-.18.819C4 7.361 4 7.943 4 8.8V9h16v-.2c0-.857 0-1.439-.038-1.889-.035-.438-.1-.663-.18-.819a2 2 0 0 0-.874-.874c-.156-.08-.38-.145-.819-.18A15 15 0 0 0 17 5.002V6a1 1 0 1 1-2 0V5H9v1a1 1 0 1 1-2 0zM20 11H4v6.2c0 .857 0 1.439.038 1.889.035.438.1.663.18.819a2 2 0 0 0 .874.874c.156.08.38.145.819.18C6.361 21 6.943 21 7.8 21h8.4c.857 0 1.439 0 1.889-.038.438-.035.663-.1.819-.18a2 2 0 0 0 .874-.874c.08-.156.145-.38.18-.819.037-.45.038-1.032.038-1.889z" fillRule="evenodd" />
                          </svg>
                        )}
                        {idx === 5 && (
                          // Monitors SVG
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                          </svg>
                        )}
                        {idx === 6 && (
                          // Analytics SVG
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0">
                            <path d="M3.25 20.75v-1.64l1.5-1.5v3.14zm4 0v-5.64l1.5-1.5v7.14zm4 0v-7.14l1.5 1.52v5.62zm4 0v-5.62l1.5-1.5v7.12zm4 0v-9.64l1.5-1.5v11.14zm-16-5.53V13.1L10 6.36l4 4 6.75-6.75v2.1L14 12.48l-4-4-6.75 6.75Z" fill="currentColor" />
                          </svg>
                        )}
                        {idx === 7 && (
                          // My Library SVG
                          <svg viewBox="0 0 512 512" className="w-5 h-5 shrink-0">
                            <path d="M512 281.6H460.8V256C460.8 143 369 51.2 256 51.2S51.2 143 51.2 256v25.6H0V256C0 114.9 114.9 0 256 0S512 114.9 512 256v25.6zm-102.4 0H358.4V256c0-56.3-46.1-102.4-102.4-102.4s-102.4 46.1-102.4 102.4v25.6H102.4V256c0-84.8 68.8-153.6 153.6-153.6s153.6 68.8 153.6 153.6v25.6zm-51.2 51.2c-41.9 0-79 20.5-102.4 51.8c-23.4-31.4-60.5-51.8-102.4-51.8H0V384H153.6c42.2 0 76.8 34.6 76.8 76.8v25.6h51.2V460.8c0-42.2 34.6-76.8 76.8-76.8H512V332.8H358.4zM256 307.2a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 1 0 0 102.4z" fill="currentColor" />
                          </svg>
                        )}
                        {!isCollapsed && (
                          <>
                            <span className="flex-1">{item.label}</span>
                            {hasSubmenu && !isCollapsed && (
                              <div className="sidebar-action-buttons action-buttons flex items-center gap-1 opacity-0 transition-opacity duration-200">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsCreateModalOpen(true);
                                  }}
                                  className="sidebar-circle-button w-6 h-6 !bg-gray-200 rounded-full flex items-center justify-center hover:!bg-gray-300 transition-colors active:!bg-gray-200 focus:!bg-gray-200 text-gray-600"
                                >
                                  <svg viewBox="0 0 22 22" fill="currentColor" className="w-4 h-4">
                                    <path d="M22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11Z" fill="#E8E9ED" />
                                    <path d="M11 16C10.5314 16 10.1515 15.6201 10.1515 15.1515V6.84848C10.1515 6.37988 10.5314 6 11 6C11.4686 6 11.8485 6.37988 11.8485 6.84848V15.1515C11.8485 15.6201 11.4686 16 11 16ZM6.84849 11.8485C6.37988 11.8485 6 11.4686 6 11C6 10.5314 6.37988 10.1515 6.84848 10.1515H15.1515C15.6201 10.1515 16 10.5314 16 11C16 11.4686 15.6201 11.8485 15.1515 11.8485H6.84849Z" fill="currentColor" />
                                  </svg>
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSubmenu(submenuId);
                                  }}
                                  className="sidebar-circle-button w-6 h-6 !bg-gray-200 rounded-full flex items-center justify-center hover:!bg-gray-300 transition-colors active:!bg-gray-200 focus:!bg-gray-200 text-gray-600"
                                >
                                  <svg className={cn("w-4 h-4 transition-transform duration-200", isSubmenuOpen ? "rotate-180" : "")} height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" fill="none">
                                    <path d="M19 9l-7 7-7-7" strokeLinejoin="round" strokeLinecap="round" />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {/* Submenu */}
                      {hasSubmenu && !isCollapsed && (
                        <div
                          className={cn(
                            "sidebar-submenu mt-0 relative bg-white py-1",
                            isSubmenuOpen ? "block" : "hidden"
                          )}
                        >
                          <div className="submenu-line absolute left-7 top-0 bottom-0 w-0.5 bg-green-200"></div>
                          {item.submenuItems?.map((subItem, index) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                "sidebar-submenu-item flex items-center py-2 pr-5 pl-[52px] text-gray-600 font-inter text-sm font-medium transition-colors duration-200",
                                "hover:text-green-700 relative",
                                pathname === subItem.href && "text-green-700"
                              )}
                            >
                              <span className="mr-2 text-base">{subItem.emoji}</span>
                              <span>{subItem.label}</span>
                              {pathname === subItem.href && (
                                <div className="submenu-active-line absolute left-7 top-0 bottom-0 w-0.5 bg-green-700"></div>
                              )}
                            </Link>
                          ))}
                          <div className="sidebar-more-items pl-[52px] py-1.5 text-gray-500 font-inter text-xs font-medium opacity-80 hover:opacity-100 cursor-pointer">
                            3 more items
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>

        {/* Expand Button - Only when collapsed */}
        {isCollapsed && (
          <div className="px-3 py-2 flex-shrink-0">
            <button
              onClick={() => setIsCollapsed(false)}
              className="sidebar-expand-button w-8 h-8 mx-auto flex items-center justify-center rounded-lg hover:bg-green-50 hover:text-green-700 transition-all duration-200 text-gray-500"
              aria-label="Expand sidebar"
            >
              <svg data-name="expand-panel" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                <g>
                  <path d="M9.53132 13.3098C9.22006 13.6466 8.71541 13.6466 8.40415 13.3098C8.0929 12.973 8.0929 12.4269 8.40415 12.0901L11.56 8.67494H5.07116C4.63098 8.67494 4.27413 8.28878 4.27413 7.81244C4.27413 7.33609 4.63098 6.94994 5.07116 6.94994H11.56L8.40415 3.53481C8.0929 3.19799 8.0929 2.65188 8.40415 2.31505C8.71541 1.97823 9.22006 1.97823 9.53132 2.31505L14.0478 7.20256C14.3591 7.53938 14.3591 8.08549 14.0478 8.42232L9.53132 13.3098ZM1.48453 2.04248C1.92471 2.04248 2.28156 2.42865 2.28156 2.90498V12.5976C2.28156 13.0739 1.92471 13.4601 1.48453 13.4601C1.04435 13.4601 0.6875 13.0739 0.6875 12.5976L0.687499 2.90498C0.687499 2.42865 1.04434 2.04248 1.48453 2.04248Z" clipRule="evenodd" fillRule="evenodd" />
                </g>
              </svg>
            </button>
          </div>
        )}



        {/* Bottom Items */}
        <div className="sidebar-footer px-2 py-2 border-t border-gray-200 flex-shrink-0">
          <div className="space-y-1">
            {bottomItems.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={item.onClick}
                  onMouseEnter={(e) => showFloatingTooltip(item.label, e.currentTarget)}
                  onMouseLeave={hideFloatingTooltip}
                  className={cn(
                    "sidebar-nav-item flex items-center gap-3 px-3 py-2 text-gray-600 transition-all duration-200 relative group",
                    "font-inter text-sm font-medium border border-transparent",
                    "hover:bg-green-50 hover:border-green-200",
                    isActive && "bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-700 is-active",
                    isCollapsed ? "justify-center w-11 h-11 mx-auto rounded-[12px]" : (isActive ? "rounded-[18px]" : "rounded-3xl")
                  )}
                >
                  {/* SVG from prototype */}
                  {idx === 0 && (
                    // Playlist SVG
                    <svg viewBox="0 0 21 17" className="w-5 h-5 shrink-0">
                      <g stroke="none" strokeWidth="1" fill="currentColor" fillRule="evenodd">
                        <g transform="translate(0.865723, 0.665728)" fill="currentColor" fillRule="nonzero">
                          <path d="M6.13427734,12.6369485 L18.1342773,12.6369485 C18.6865621,12.6369485 19.1342773,13.0846638 19.1342773,13.6369485 C19.1342773,14.1892333 18.6865621,14.6369485 18.1342773,14.6369485 L6.13427734,14.6369485 C5.58199259,14.6369485 5.13427734,14.1892333 5.13427734,13.6369485 C5.13427734,13.0846638 5.58199259,12.6369485 6.13427734,12.6369485 Z M6.13427734,6.63694853 L18.1342773,6.63694853 C18.6865621,6.63694853 19.1342773,7.08466378 19.1342773,7.63694853 C19.1342773,8.18923328 18.6865621,8.63694853 18.1342773,8.63694853 L6.13427734,8.63694853 C5.58199259,8.63694853 5.13427734,8.18923328 5.13427734,7.63694853 C5.13427734,7.08466378 5.58199259,6.63694853 6.13427734,6.63694853 Z M6.13427734,0.636948529 L18.1342773,0.636948529 C18.6865621,0.636948529 19.1342773,1.08466378 19.1342773,1.63694853 C19.1342773,2.18923328 18.6865621,2.63694853 18.1342773,2.63694853 L6.13427734,2.63694853 C5.58199259,2.63694853 5.13427734,2.18923328 5.13427734,1.63694853 C5.13427734,1.08466378 5.58199259,0.636948529 6.13427734,0.636948529 Z M0.909179688,15.2121438 L2.69042969,14.163804 C2.80794271,14.0957701 2.88680013,13.998358 2.92700195,13.8715677 C2.96720378,13.7447773 2.96720378,13.6179869 2.92700195,13.4911966 C2.88680013,13.3644062 2.80794271,13.2669941 2.69042969,13.1989602 L0.909179688,12.1320657 C0.686523438,11.995998 0.479329427,11.9650735 0.287597656,12.0392923 C0.0958658854,12.113511 0,12.2805032 0,12.5402688 L0,14.8039407 C0,15.0513366 0.0974121094,15.2136901 0.292236328,15.2910013 C0.487060547,15.3683125 0.692708333,15.3420267 0.909179688,15.2121438 Z M0.909179688,9.21214384 L2.69042969,8.163804 C2.80794271,8.09577014 2.88680013,7.99835803 2.92700195,7.87156767 C2.96720378,7.74477731 2.96720378,7.61798694 2.92700195,7.49119658 C2.88680013,7.36440621 2.80794271,7.2669941 2.69042969,7.19896025 L0.909179688,6.13206572 C0.686523438,5.99599801 0.479329427,5.96507353 0.287597656,6.03929228 C0.0958658854,6.11351103 0,6.28050322 0,6.54026884 L0,8.80394072 C0,9.05133655 0.0974121094,9.21369007 0.292236328,9.29100126 C0.487060547,9.36831246 0.692708333,9.34202665 0.909179688,9.21214384 Z M0.909179688,3.21214384 L2.69042969,2.163804 C2.80794271,2.09577014 2.88680013,1.99835803 2.92700195,1.87156767 C2.96720378,1.74477731 2.96720378,1.61798694 2.92700195,1.49119658 C2.88680013,1.36440621 2.80794271,1.2669941 2.69042969,1.19896025 L0.909179688,0.132065717 C0.686523438,-0.00400199142 0.479329427,-0.0349264706 0.287597656,0.0392922794 C0.0958658854,0.113511029 0,0.280503217 0,0.540268842 L0,2.80394072 C0,3.05133655 0.0974121094,3.21369007 0.292236328,3.29100126 C0.487060547,3.36831246 0.692708333,3.34202665 0.909179688,3.21214384 Z" />
                        </g>
                      </g>
                    </svg>
                  )}
                  {idx === 1 && (
                    // Notifications SVG
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" className="w-5 h-5 shrink-0">
                      <path fill="currentColor" d="M7.52166 4.85499C8.70939 3.66726 10.3203 3 12 3C13.6797 3 15.2906 3.66726 16.4783 4.85499C17.6661 6.04272 18.3333 7.65363 18.3333 9.33333C18.3333 11.013 17.6661 12.6239 16.4783 13.8117C15.2906 14.9994 13.6797 15.6667 12 15.6667C10.3203 15.6667 8.70939 14.9994 7.52166 13.8117C6.33393 12.6239 5.66667 11.013 5.66667 9.33333C5.66667 7.65363 6.33393 6.04272 7.52166 4.85499ZM12 5C10.8507 5 9.74853 5.45655 8.93587 6.2692C8.12321 7.08186 7.66667 8.18406 7.66667 9.33333C7.66667 10.4826 8.12321 11.5848 8.93587 12.3975C9.74853 13.2101 10.8507 13.6667 12 13.6667C13.1493 13.6667 14.2515 13.2101 15.0641 12.3975C15.8768 11.5848 16.3333 10.4826 16.3333 9.33333C16.3333 8.18406 15.8768 7.08186 15.0641 6.2692C14.2515 5.45655 13.1493 5 12 5ZM20.3646 3.92514C20.5016 3.39011 21.0463 3.06744 21.5814 3.20443C22.9437 3.55324 24.1512 4.34554 25.0135 5.45642C25.8758 6.5673 26.3438 7.93357 26.3438 9.33984C26.3438 10.7461 25.8758 12.1124 25.0135 13.2233C24.1512 14.3341 22.9437 15.1265 21.5814 15.4753C21.0463 15.6122 20.5016 15.2896 20.3646 14.7545C20.2276 14.2195 20.5503 13.6747 21.0853 13.5378C22.0174 13.2991 22.8436 12.757 23.4336 11.9969C24.0236 11.2368 24.3438 10.302 24.3438 9.33984C24.3438 8.37766 24.0236 7.44284 23.4336 6.68276C22.8436 5.92269 22.0174 5.38059 21.0853 5.14193C20.5503 5.00494 20.2276 4.46016 20.3646 3.92514ZM9.33333 21C8.18406 21 7.08186 21.4565 6.2692 22.2692C5.45655 23.0819 5 24.1841 5 25.3333V28C5 28.5523 4.55228 29 4 29C3.44772 29 3 28.5523 3 28V25.3333C3 23.6536 3.66726 22.0427 4.85499 20.855C6.04272 19.6673 7.65363 19 9.33333 19H14.6667C16.1859 19 17.5807 19.5359 18.6722 20.4265C19.1001 20.7757 19.164 21.4056 18.8148 21.8335C18.4657 22.2614 17.8357 22.3253 17.4078 21.9761C16.6593 21.3654 15.7074 21 14.6667 21H9.33333Z" clipRule="evenodd" fillRule="evenodd" />
                      <path fill="currentColor" d="M23.5859 18.5858C23.961 18.2107 24.4697 18 25.0001 18C25.5305 18 26.0392 18.2107 26.4143 18.5858C26.6314 18.8029 26.7934 19.0647 26.8914 19.3496C27.4303 19.6869 27.8933 20.1357 28.2482 20.6679C28.7012 21.3474 28.9607 22.1374 28.999 22.9531C28.9997 22.9687 29.0001 22.9844 29.0001 23V24.4293C29.0238 24.5668 29.076 24.698 29.1535 24.8144C29.2404 24.9446 29.3566 25.0527 29.4928 25.1298C29.888 25.3536 30.0828 25.8156 29.9671 26.2548C29.8514 26.694 29.4542 27 29.0001 27H27.4496C27.3523 27.4767 27.1171 27.9186 26.7679 28.2678C26.299 28.7366 25.6631 29 25.0001 29C24.3371 29 23.7012 28.7366 23.2323 28.2678C22.8831 27.9186 22.6479 27.4767 22.5506 27H21.0001C20.5459 27 20.1488 26.694 20.0331 26.2548C19.9174 25.8156 20.1121 25.3536 20.5073 25.1298C20.6436 25.0527 20.7598 24.9446 20.8466 24.8144C20.9242 24.698 20.9764 24.5668 21.0001 24.4293V23C21.0001 22.9844 21.0005 22.9687 21.0012 22.9531C21.0395 22.1374 21.299 21.3474 21.752 20.6679C22.1069 20.1357 22.5699 19.6869 23.1088 19.3496C23.2068 19.0647 23.3688 18.8029 23.5859 18.5858ZM22.9218 25C22.9535 24.8754 22.9773 24.7485 22.9928 24.6202C22.9977 24.5803 23.0001 24.5402 23.0001 24.5V23.0254C23.0248 22.5799 23.1684 22.1489 23.4161 21.7773C23.6678 21.3999 24.0174 21.098 24.4276 20.904C24.7771 20.7387 25.0001 20.3867 25.0001 20C25.0001 20.3867 25.223 20.7387 25.5726 20.904C25.9828 21.098 26.3324 21.3999 26.5841 21.7773C26.8318 22.1489 26.9753 22.5799 27.0001 23.0254V24.5C27.0001 24.5402 27.0025 24.5803 27.0073 24.6202C27.0229 24.7485 27.0466 24.8754 27.0784 25H22.9218Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                  )}
                  {idx === 2 && (
                    // Settings SVG
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                      <path d="M11.5677 3.5C11.2129 3.5 10.8847 3.68789 10.7051 3.99377L9.89391 5.37524C9.3595 6.28538 8.38603 6.84786 7.3304 6.85645L5.73417 6.86945C5.3794 6.87233 5.0527 7.06288 4.87559 7.3702L4.43693 8.13135C4.2603 8.43784 4.25877 8.81481 4.43291 9.12273L5.22512 10.5235C5.74326 11.4397 5.74326 12.5603 5.22512 13.4765L4.43291 14.8773C4.25877 15.1852 4.2603 15.5622 4.43693 15.8687L4.87559 16.6298C5.0527 16.9371 5.3794 17.1277 5.73417 17.1306L7.33042 17.1436C8.38605 17.1522 9.35952 17.7146 9.89393 18.6248L10.7051 20.0062C10.8847 20.3121 11.2129 20.5 11.5677 20.5H12.4378C12.7926 20.5 13.1208 20.3121 13.3004 20.0062L14.1116 18.6248C14.646 17.7146 15.6195 17.1522 16.6751 17.1436L18.2714 17.1306C18.6262 17.1277 18.9529 16.9371 19.13 16.6298L19.5687 15.8687C19.7453 15.5622 19.7468 15.1852 19.5727 14.8773L18.7805 13.4765C18.2623 12.5603 18.2623 11.4397 18.7805 10.5235L19.5727 9.12273C19.7468 8.81481 19.7453 8.43784 19.5687 8.13135L19.13 7.3702C18.9529 7.06288 18.6262 6.87233 18.2714 6.86945L16.6751 6.85645C15.6195 6.84786 14.646 6.28538 14.1116 5.37524L13.3004 3.99377C13.1208 3.68788 12.7926 3.5 12.4378 3.5H11.5677ZM8.97978 2.98131C9.5186 2.06365 10.5033 1.5 11.5677 1.5H12.4378C13.5022 1.5 14.4869 2.06365 15.0257 2.98131L15.8369 4.36278C16.015 4.66616 16.3395 4.85365 16.6914 4.85652L18.2877 4.86951C19.352 4.87818 20.3321 5.4498 20.8635 6.37177L21.3021 7.13292C21.832 8.05239 21.8366 9.18331 21.3142 10.1071L20.522 11.5078C20.3493 11.8132 20.3493 12.1868 20.522 12.4922L21.3142 13.893C21.8366 14.8167 21.832 15.9476 21.3021 16.8671L20.8635 17.6282C20.3321 18.5502 19.352 19.1218 18.2877 19.1305L16.6914 19.1435C16.3395 19.1464 16.015 19.3339 15.8369 19.6372L15.0257 21.0187C14.4869 21.9363 13.5022 22.5 12.4378 22.5H11.5677C10.5033 22.5 9.5186 21.9363 8.97978 21.0187L8.16863 19.6372C7.99049 19.3339 7.666 19.1464 7.31413 19.1435L5.71789 19.1305C4.65357 19.1218 3.67347 18.5502 3.14213 17.6282L2.70347 16.8671C2.17358 15.9476 2.16899 14.8167 2.6914 13.893L3.48361 12.4922C3.65632 12.1868 3.65632 11.8132 3.48361 11.5078L2.6914 10.1071C2.16899 9.18331 2.17358 8.05239 2.70347 7.13292L3.14213 6.37177C3.67347 5.4498 4.65357 4.87818 5.71789 4.86951L7.31411 4.85652C7.66599 4.85366 7.99048 4.66616 8.16862 4.36278L8.97978 2.98131Z" clipRule="evenodd" fillRule="evenodd" />
                      <path d="M12.0028 10.5C11.1741 10.5 10.5024 11.1716 10.5024 12C10.5024 12.8284 11.1741 13.5 12.0028 13.5C12.8315 13.5 13.5032 12.8284 13.5032 12C13.5032 11.1716 12.8315 10.5 12.0028 10.5ZM8.50178 12C8.50178 10.067 10.0692 8.5 12.0028 8.5C13.9364 8.5 15.5038 10.067 15.5038 12C15.5038 13.933 13.9364 15.5 12.0028 15.5C10.0692 15.5 8.50178 13.933 8.50178 12Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                  )}
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>

          {/* User Profile */}
          <div
            className={cn(
              "sidebar-user-profile user-profile-block flex items-center gap-3 px-3 py-2 transition-all duration-200 mt-2 relative group cursor-pointer",
              "hover:bg-green-50",
              isCollapsed ? "justify-center w-11 h-11 mx-auto rounded-[18px]" : "rounded-3xl",
              isAvatarDropdownOpen && "bg-green-50 is-active"
            )}
            onClick={(e) => {
              // На мобільному пристрої перенаправляємо на сторінку /me
              if (typeof window !== 'undefined' && window.innerWidth < 768) {
                return;
              }
              e.stopPropagation();
              setIsAvatarDropdownOpen(!isAvatarDropdownOpen);
            }}
          >
            <Avatar
              size="sm"
              className="shrink-0"
              isDropdownOpen={isAvatarDropdownOpen}
              onDropdownToggle={setIsAvatarDropdownOpen}
              dropdownPosition="left"
              sidebarCollapsed={isCollapsed}
            />
            {!isCollapsed && (
              <UserProfileName />
            )}
            {isCollapsed && (
              <UserProfileTooltip />
            )}
          </div>
        </div>
      </div>

      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <ContactUsModal
        isOpen={isContactUsOpen}
        onClose={() => setIsContactUsOpen(false)}
      />

      {isCollapsed && floatingTooltip && (
        <div
          className="sidebar-tooltip-floating fixed z-[9999] bg-gray-900 text-white px-3 py-2 rounded-lg font-inter text-xs font-medium shadow-lg whitespace-nowrap pointer-events-none"
          style={{ top: floatingTooltip.top, left: floatingTooltip.left, transform: "translateY(-50%)" }}
        >
          <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-y-[5px] border-y-transparent border-r-[5px] border-r-gray-900" />
          {floatingTooltip.label}
        </div>
      )}
    </aside>
  );
};
