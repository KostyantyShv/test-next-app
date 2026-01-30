import { create } from "zustand";

interface ListingStickyHeaderStore {
  isDesktopStickyHeaderVisible: boolean;
  setIsDesktopStickyHeaderVisible: (value: boolean) => void;
}

export const useListingStickyHeader = create<ListingStickyHeaderStore>(
  (set) => ({
    isDesktopStickyHeaderVisible: false,
    setIsDesktopStickyHeaderVisible: (value) =>
      set({ isDesktopStickyHeaderVisible: value }),
  })
);

