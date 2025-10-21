"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { useAudioPlayer } from "@/store/use-audio-player";

const navigationItems: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Dashboard", icon: "home" },
  { href: "schools/explore", label: "Explore", icon: "explore" },
  { href: "/library", label: "Library", icon: "library" },
  {
    href: "#",
    label: "Playlist",
    icon: "playlist",
  },
  { href: "/player", label: "Me", icon: "finished" },
];

export const MobileNavigation: FC = () => {
  const pathname = usePathname();
  const setPlaylistVisible = useAudioPlayer(
    (state) => state.setPlaylistVisible
  );

  const handlePlaylistClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setPlaylistVisible(true);
  };

  return (
    <nav className="fixed z-30 bottom-0 left-0 right-0 bg-[#016853] md:hidden">
      <div className="flex items-center justify-between">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={item.href === "#" ? handlePlaylistClick : undefined}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 px-2 py-3",
              "text-[14px] font-medium min-w-[72px]",
              item.href === "#"
                ? "text-[#b3d2cc]"
                : pathname === item.href
                ? "text-white"
                : "text-[#b3d2cc]"
            )}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Icon
                name={item.icon}
                size="lg"
                className={cn(
                  item.href === "#"
                    ? "text-[#b3d2cc]"
                    : pathname === item.href
                    ? "text-white"
                    : "text-[#b3d2cc]"
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
