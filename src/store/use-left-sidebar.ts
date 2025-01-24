import { create } from 'zustand';

interface LeftSidebarStore {
  isCollapsed: boolean;
  isCollectionsOpen: boolean;
  setIsCollapsed: (value: boolean) => void;
  setIsCollectionsOpen: (value: boolean) => void;
}

export const useLeftSidebar = create<LeftSidebarStore>((set) => ({
  isCollapsed: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('leftSidebarCollapsed') || 'true')
    : true,
  isCollectionsOpen: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('leftSidebarCollectionsOpen') || 'false')
    : false,
  setIsCollapsed: (value) => {
    localStorage.setItem('leftSidebarCollapsed', JSON.stringify(value));
    set({ 
      isCollapsed: value,
      ...(value && { isCollectionsOpen: false })
    });
  },
  setIsCollectionsOpen: (value) => {
    localStorage.setItem('leftSidebarCollectionsOpen', JSON.stringify(value));
    set({ isCollectionsOpen: value });
  },
})); 