'use client';

import { ReactNode, useEffect, useState } from "react";
import { Drawer } from "vaul";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface MobileDrawerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  /** Accessible title for screen readers (required by Radix Dialog). */
  title?: string;
  showPullIndicator?: boolean;
}

const MOBILE_DRAWER_VISIBILITY_EVENT = "mobile-drawer-visibility-change";

export function MobileDrawer({
  children,
  isOpen,
  onClose,
  title = "Dialog",
  showPullIndicator = true,
}: MobileDrawerProps) {
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktopViewport(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isDesktopViewport || !isOpen) return;

    const body = document.body;
    const currentCount = Number(body.dataset.mobileDrawerOpenCount || "0");
    const nextCount = currentCount + 1;

    body.dataset.mobileDrawerOpenCount = String(nextCount);
    body.dataset.mobileDrawerOpen = "true";
    window.dispatchEvent(new Event(MOBILE_DRAWER_VISIBILITY_EVENT));

    // First drawer opening: lock background with position:fixed and save scroll (reliable on iOS)
    let scrollY = 0;
    if (currentCount === 0) {
      scrollY = window.scrollY ?? window.pageYOffset;
      body.style.setProperty("position", "fixed");
      body.style.setProperty("top", `-${scrollY}px`);
      body.style.setProperty("left", "0");
      body.style.setProperty("right", "0");
      body.style.setProperty("width", "100%");
      body.dataset.mobileDrawerScrollY = String(scrollY);
    }

    return () => {
      const latestCount = Number(body.dataset.mobileDrawerOpenCount || "1");
      const decremented = Math.max(0, latestCount - 1);

      if (decremented === 0) {
        delete body.dataset.mobileDrawerOpenCount;
        delete body.dataset.mobileDrawerOpen;
        // Restore scroll position and body style
        const savedScrollY = body.dataset.mobileDrawerScrollY;
        body.style.removeProperty("position");
        body.style.removeProperty("top");
        body.style.removeProperty("left");
        body.style.removeProperty("right");
        body.style.removeProperty("width");
        if (savedScrollY !== undefined) {
          delete body.dataset.mobileDrawerScrollY;
          const root = document.documentElement;
          const previousScrollBehavior = root.style.scrollBehavior;
          // Prevent the global `scroll-behavior: smooth` from animating close restoration.
          root.style.scrollBehavior = "auto";
          window.scrollTo(0, Number(savedScrollY));
          requestAnimationFrame(() => {
            if (previousScrollBehavior) {
              root.style.scrollBehavior = previousScrollBehavior;
            } else {
              root.style.removeProperty("scroll-behavior");
            }
          });
        }
      } else {
        body.dataset.mobileDrawerOpenCount = String(decremented);
      }

      window.dispatchEvent(new Event(MOBILE_DRAWER_VISIBILITY_EVENT));
    };
  }, [isDesktopViewport, isOpen]);

  if (!isOpen) return null;
  if (isDesktopViewport) return null;

  return (
    <Drawer.Root
      open={true}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-[rgba(27,27,27,0.4)] backdrop-blur-[4px] z-[2500]" />
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 z-[3000] flex flex-col bg-white rounded-t-[24px] max-h-[85%] outline-none"
          style={{
            boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.12), 0 -2px 8px rgba(0, 0, 0, 0.04)',
          }}
          aria-describedby={undefined}
        >
          <VisuallyHidden.Root asChild>
            <Drawer.Title>{title}</Drawer.Title>
          </VisuallyHidden.Root>
          {/* Pull indicator */}
          {showPullIndicator && (
            <div className="mx-auto mt-3 mb-2 w-9 h-1 rounded-full bg-[#DFDDDB] flex-shrink-0" />
          )}
          <div
            className="flex-1 overflow-y-auto overscroll-contain min-h-0"
            style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
          >
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
