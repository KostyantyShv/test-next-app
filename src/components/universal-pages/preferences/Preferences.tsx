'use client';

import { FC, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { NotificationChannelsSection } from './components';
import { GeneralPreferences, PrivacySettings, NotificationPreferences } from './components';
import { STUDENT_NOTIFICATIONS, VENDOR_NOTIFICATIONS, SYSTEM_NOTIFICATIONS } from './constants';
import { Preferences as PreferencesType, Theme } from './types';

export const Preferences: FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [preferences, setPreferences] = useState<PreferencesType>(() => ({
    language: 'en',
    theme: (theme as Theme) || 'midnight',
    autoTheme: false,
    searchLayout: 'grid',
    comparisonLayout: 'side-by-side',
    profileVisibility: true,
    showGuests: true,
    showBookmarks: true,
    showFollowing: true,
    showEvents: true,
    notifications: {
      ...Object.fromEntries(STUDENT_NOTIFICATIONS.map(n => [n.id, { email: true, onSite: true }])),
      ...Object.fromEntries(VENDOR_NOTIFICATIONS.map(n => [n.id, { email: true, onSite: true }])),
      ...Object.fromEntries(SYSTEM_NOTIFICATIONS.map(n => [n.id, { email: true, onSite: true }])),
    },
  }));

  const [isSaving, setIsSaving] = useState(false);
  const [userRole] = useState<'user' | 'admin'>('user'); // Change to 'admin' to see vendor notifications

  // Sync theme changes with next-themes
  useEffect(() => {
    if (!mounted) return;

    if (preferences.autoTheme && typeof window !== 'undefined') {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme((prefersDark ? 'midnight' : 'light') as string);
    } else if (!preferences.autoTheme) {
      setTheme(preferences.theme as string);
    }
  }, [preferences.theme, preferences.autoTheme, mounted, setTheme]);

  // Listen to system theme changes when autoTheme is enabled
  useEffect(() => {
    if (!mounted || !preferences.autoTheme || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme((e.matches ? 'midnight' : 'light') as string);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [preferences.autoTheme, mounted, setTheme]);

  const handleSave = () => {
    setIsSaving(true);
    console.log('Saving preferences:', preferences);
    
    setTimeout(() => {
      setIsSaving(false);
      alert('Preferences saved successfully!');
    }, 1000);
  };

  const updatePreference = <K extends keyof PreferencesType>(key: K, value: PreferencesType[K]) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const updateNotification = (id: string, type: 'email' | 'onSite', value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [id]: {
          ...prev.notifications[id],
          [type]: value,
        },
      },
    }));
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="w-full md:max-w-[1220px] mx-auto px-4 md:px-5 py-5 md:py-10 pb-24 md:pb-10 overflow-x-hidden">
        <h1 className="text-[20px] md:text-[28px] font-semibold md:font-bold mb-5 md:mb-10" style={{ color: 'var(--bold-text)' }}>Preferences</h1>

        <GeneralPreferences
          preferences={preferences}
          onUpdatePreference={updatePreference}
          onSave={handleSave}
          isSaving={isSaving}
        />

        <PrivacySettings
          preferences={preferences}
          onUpdatePreference={updatePreference}
        />

        <NotificationChannelsSection />
        
        <NotificationPreferences
          preferences={preferences}
          onUpdateNotification={updateNotification}
          userRole={userRole}
          onSave={handleSave}
          isSaving={isSaving}
        />

        {/* Mobile Sticky Save Button */}
        <div className="md:hidden fixed bottom-[88px] left-4 right-4 z-50">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full text-white border-none px-6 py-4 rounded-xl text-[16px] font-semibold cursor-pointer transition-all disabled:opacity-50"
            style={{
              backgroundColor: 'var(--header-green)',
              boxShadow: '0 4px 12px rgba(11,99,51,0.3)',
            }}
            onMouseDown={(e) => e.currentTarget.style.backgroundColor = 'var(--success-green)'}
            onMouseUp={(e) => e.currentTarget.style.backgroundColor = 'var(--header-green)'}
          >
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
};

