import { useEffect, useRef, useState } from "react";
import { SIDE_TABS_DESKTOP } from "./side-tabs.constant";
import { useListingStickyHeader } from "@/store/use-listing-sticky-header";

export const useTabsObserver = () => {
  const [activeTab, setActiveTab] = useState(
    SIDE_TABS_DESKTOP.MONTHLY_UPDATE_DESKTOP
  );
  const observerRef = useRef<IntersectionObserver>(null);
  const isDesktopStickyHeaderVisible = useListingStickyHeader(
    (s) => s.isDesktopStickyHeaderVisible
  );

  useEffect(() => {
    // Keep the active section aligned with the visible header stack.
    // - global header stack: ~87px
    // - plus listing sticky header when visible: ~112px
    // - plus breathing room: 20px
    const topOffsetPx = (isDesktopStickyHeaderVisible ? 112 : 87) + 20;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: `-${topOffsetPx}px 0px -50% 0px`,
        threshold: 0.1,
      }
    );

    const observedIds = new Set<string>();
    const allSectionIds = Object.values(SIDE_TABS_DESKTOP);

    const tryObserveAvailableSections = () => {
      allSectionIds.forEach((id) => {
        if (observedIds.has(id)) return;
        const el = document.getElementById(id);
        if (!el) return;
        observer.observe(el);
        observedIds.add(id);
      });
    };

    // First pass (most sections already exist)
    tryObserveAvailableSections();

    // Map is loaded via next/dynamic; it may appear after initial render.
    // Poll for a short time to attach observer when it mounts.
    const interval = window.setInterval(() => {
      tryObserveAvailableSections();
      if (observedIds.size >= allSectionIds.length) {
        window.clearInterval(interval);
      }
    }, 250);
    const timeout = window.setTimeout(() => window.clearInterval(interval), 12000);

    observerRef.current = observer;

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isDesktopStickyHeaderVisible]);

  return { activeTab, setActiveTab };
};
