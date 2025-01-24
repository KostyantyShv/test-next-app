import { create } from 'zustand';

interface SidebarStore {
  isCollapsed: boolean;
  isExpanded: boolean;
  activeTab: string;
  setIsCollapsed: (value: boolean) => void;
  setIsExpanded: (value: boolean) => void;
  setActiveTab: (tab: string) => void;
  openWithTab: (tab: string) => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  isCollapsed: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('rightSidebarCollapsed') || 'false')
    : false,
  isExpanded: typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('rightSidebarExpanded') || 'false')
    : false,
  activeTab: typeof window !== 'undefined'
    ? localStorage.getItem('rightSidebarActiveTab') || 'sources'
    : 'sources',
  setIsCollapsed: (value) => {
    localStorage.setItem('rightSidebarCollapsed', JSON.stringify(value));
    set({ isCollapsed: value });
  },
  setIsExpanded: (value) => {
    localStorage.setItem('rightSidebarExpanded', JSON.stringify(value));
    set({ isExpanded: value });
  },
  setActiveTab: (tab) => {
    localStorage.setItem('rightSidebarActiveTab', tab);
    set({ activeTab: tab });
  },
  openWithTab: (tab) => {
    localStorage.setItem('rightSidebarActiveTab', tab);
    set({ 
      isCollapsed: false, 
      activeTab: tab,
      isExpanded: typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('rightSidebarExpanded') || 'false')
        : false
    });
  },
})); 