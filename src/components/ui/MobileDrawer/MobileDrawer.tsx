'use client';

import { ReactNode, useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface MobileDrawerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  /** Accessible title for screen readers (required by Radix Dialog). */
  title?: string;
  showPullIndicator?: boolean;
  variant?: "sheet" | "fullscreen" | "action-sheet";
  lockTouchMove?: boolean;
}

const MOBILE_DRAWER_VISIBILITY_EVENT = "mobile-drawer-visibility-change";

const isScrollableElement = (element: HTMLElement) => {
  const { overflowY } = window.getComputedStyle(element);
  return (
    ["auto", "scroll", "overlay"].includes(overflowY) &&
    element.scrollHeight > element.clientHeight
  );
};

const getScrollableAncestor = (
  target: HTMLElement,
  boundary: HTMLElement
): HTMLElement | null => {
  let current: HTMLElement | null = target;

  while (current && current !== boundary) {
    if (isScrollableElement(current)) {
      return current;
    }
    current = current.parentElement;
  }

  return isScrollableElement(boundary) ? boundary : null;
};

export function MobileDrawer({
  children,
  isOpen,
  onClose,
  title = "Dialog",
  showPullIndicator = true,
  variant = "sheet",
  lockTouchMove = true,
}: MobileDrawerProps) {
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktopViewport(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isDesktopViewport || !isOpen || !lockTouchMove) return;

    const body = document.body;
    const root = document.documentElement;
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
      body.style.setProperty("overflow", "hidden");
      root.style.setProperty("overflow", "hidden");
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
        body.style.removeProperty("overflow");
        root.style.removeProperty("overflow");
        if (savedScrollY !== undefined) {
          delete body.dataset.mobileDrawerScrollY;
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
  }, [isDesktopViewport, isOpen, lockTouchMove]);

  useEffect(() => {
    if (isDesktopViewport || !isOpen) return;

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!event.cancelable) return;

      const startY = touchStartYRef.current;
      const currentY = event.touches[0]?.clientY;

      if (startY == null || currentY == null) return;

      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        event.preventDefault();
        return;
      }

      if (!scrollContainer.contains(target)) {
        event.preventDefault();
        return;
      }

      // Let embedded maps / canvases handle their own gestures (marker tap, pan, pinch).
      if (target.closest("[data-vaul-no-drag]")) {
        return;
      }

      const scrollableAncestor = getScrollableAncestor(target, scrollContainer);
      if (!scrollableAncestor) {
        event.preventDefault();
        return;
      }

      const deltaY = currentY - startY;
      const isPullingDown = deltaY > 0;
      const isPushingUp = deltaY < 0;
      const isAtTop = scrollableAncestor.scrollTop <= 0;
      const isAtBottom =
        scrollableAncestor.scrollTop + scrollableAncestor.clientHeight >=
        scrollableAncestor.scrollHeight - 1;

      if ((isPullingDown && isAtTop) || (isPushingUp && isAtBottom)) {
        event.preventDefault();
        return;
      }

      touchStartYRef.current = currentY;
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    document.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDesktopViewport, isOpen]);

  if (!isOpen) return null;
  if (isDesktopViewport) return null;

  const isFullscreen = variant === "fullscreen";
  const isActionSheet = variant === "action-sheet";
  const shouldShowPullIndicator = !isFullscreen && !isActionSheet && showPullIndicator;

  return (
    <Drawer.Root
      open={isOpen}
      modal
      dismissible
      fixed={isFullscreen}
      repositionInputs={false}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[2500] bg-[rgba(27,27,27,0.5)] backdrop-blur-[4px]" />
        <Drawer.Content
          className={
            isFullscreen
              ? "fixed inset-x-0 bottom-0 top-0 z-[3000] flex h-[100dvh] max-h-[100dvh] w-full flex-col bg-[var(--surface-color)] outline-none"
              : isActionSheet
              ? "fixed inset-x-0 bottom-0 z-[3000] flex flex-col bg-transparent px-2 pb-[calc(env(safe-area-inset-bottom)+8px)] outline-none"
              : "fixed bottom-0 left-0 right-0 z-[3000] flex max-h-[calc(100dvh-16px)] min-h-[45dvh] w-full flex-col rounded-t-[24px] bg-[var(--surface-color)] outline-none"
          }
          style={{
            boxShadow: isFullscreen
              ? "0 12px 40px rgba(0, 0, 0, 0.18)"
              : isActionSheet
              ? "none"
              : "0 -8px 32px rgba(0, 0, 0, 0.12), 0 -2px 8px rgba(0, 0, 0, 0.04)",
          }}
          aria-describedby={undefined}
        >
          <VisuallyHidden.Root asChild>
            <Drawer.Title>{title}</Drawer.Title>
          </VisuallyHidden.Root>
          {/* Pull indicator */}
          {shouldShowPullIndicator && (
            <div className="mx-auto mt-3 mb-2 h-1 w-9 shrink-0 rounded-full bg-[var(--border-color)] opacity-80" />
          )}
          <div
            ref={scrollContainerRef}
            className={
              isFullscreen
                ? "flex min-h-0 flex-1 flex-col overflow-hidden"
                : isActionSheet
                ? "min-h-0 overflow-visible"
                : "flex min-h-[50dvh] flex-1 flex-col overflow-y-auto overscroll-y-contain touch-pan-y"
            }
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
