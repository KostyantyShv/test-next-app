// Types for Preferences components
export type Theme = 'midnight' | 'light' | 'mint' | 'teal' | 'oceanic';
export type Layout = 'grid' | 'list' | 'hybrid' | 'classic' | 'table' | 'card' | 'magazine' | 'compact';
export type ComparisonLayout = 'side-by-side' | 'vertical';
export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'zh' | 'ja';

export interface NotificationPreferences {
  email: boolean;
  onSite: boolean;
}

export interface Preferences {
  language: Language;
  theme: Theme;
  autoTheme: boolean;
  searchLayout: Layout;
  comparisonLayout: ComparisonLayout;
  profileVisibility: boolean;
  showGuests: boolean;
  showBookmarks: boolean;
  showFollowing: boolean;
  showEvents: boolean;
  notifications: {
    [key: string]: NotificationPreferences;
  };
}

export interface NotificationItem {
  id: string;
  name: string;
  tooltip: string;
}

export interface ThemeOption {
  id: Theme;
  name: string;
  description: string;
}

export interface LayoutOption {
  id: Layout;
  name: string;
  description: string;
}
