'use client';

import { FC, useState } from 'react';
import { NotificationChannelsSection } from './components';
import { GeneralPreferences, PrivacySettings, NotificationPreferences } from './components';
import { STUDENT_NOTIFICATIONS, VENDOR_NOTIFICATIONS, SYSTEM_NOTIFICATIONS } from './constants';
import { Preferences as PreferencesType } from './types';

export const Preferences: FC = () => {
  const [preferences, setPreferences] = useState<PreferencesType>({
    language: 'en',
    theme: 'midnight',
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
  });

  const [isSaving, setIsSaving] = useState(false);
  const [userRole] = useState<'user' | 'admin'>('user'); // Change to 'admin' to see vendor notifications

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

  return (
    <div className="min-h-screen">
      <div className="w-full md:max-w-[1220px] mx-auto px-4 md:px-5 py-5 md:py-10 pb-24 md:pb-10 overflow-x-hidden">
        <h1 className="text-[20px] md:text-[28px] font-semibold md:font-bold text-[#464646] mb-5 md:mb-10">Preferences</h1>

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
            className="w-full bg-[#0B6333] text-white border-none px-6 py-4 rounded-xl text-[16px] font-semibold cursor-pointer transition-all active:bg-[#089E68] disabled:opacity-50 shadow-[0_4px_12px_rgba(11,99,51,0.3)]"
          >
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
};

