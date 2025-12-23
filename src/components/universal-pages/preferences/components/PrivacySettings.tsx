import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Tooltip } from './Tooltip';
import { Preferences } from '../types';

interface PrivacySettingsProps {
  preferences: Preferences;
  onUpdatePreference: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
}

export const PrivacySettings: FC<PrivacySettingsProps> = ({
  preferences,
  onUpdatePreference,
}) => {
  const visibilityOptionsEnabled = preferences.profileVisibility || preferences.showGuests;

  return (
    <div className="flex flex-col md:flex-row gap-5 md:gap-6 mb-[30px] md:mb-12 items-start">
      <div className="flex-[0_0_100%] md:flex-[0_0_30%]">
        <h2 className="text-[18px] md:text-xl font-semibold text-[#464646] mb-2 md:mb-3">Privacy Settings</h2>
        <p className="text-[14px] text-[#5F5F5F] leading-[1.5] mb-5 md:mb-0">
          Control who can view your profile and what information is visible to different types of users on the platform.
        </p>
      </div>

      <div className="flex-[0_0_100%] md:flex-[0_0_70%]">
        <div className="bg-white rounded-xl md:rounded-lg p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] md:shadow-[0_1px_3px_rgba(0,0,0,0.1)] mb-[15px] md:mb-5">
          <div className="space-y-3">
            <label className="flex items-start gap-3 text-[15px] md:text-sm text-[#464646] cursor-pointer py-3 md:py-2 rounded-lg md:rounded-none transition-colors md:hover:bg-[#F8F9FA]">
              <input
                type="checkbox"
                checked={preferences.profileVisibility}
                onChange={(e) => {
                  onUpdatePreference('profileVisibility', e.target.checked);
                  if (!e.target.checked) {
                    onUpdatePreference('showGuests', false);
                  }
                }}
                className="w-5 h-5 md:w-[18px] md:h-[18px] border-2 border-[#DFDDDB] rounded cursor-pointer appearance-none relative transition-all !bg-white checked:border-[#0B6333] checked:bg-[#0B6333] before:content-['✓'] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:text-white before:text-xs before:font-bold before:opacity-0 checked:before:opacity-100 flex-shrink-0 mt-[2px] md:mt-0"
              />
              <div className="flex items-center gap-2 flex-1">
                Show profile to logged-in users
                <Tooltip text="Toggling this on makes your public profile, including your chosen name and avatar, visible to other users and guests. If off, your profile page will not be accessible to others." />
              </div>
            </label>

            <label className="flex items-start gap-3 text-[15px] md:text-sm text-[#464646] cursor-pointer py-3 md:py-2 rounded-lg md:rounded-none transition-colors md:hover:bg-[#F8F9FA]">
              <input
                type="checkbox"
                checked={preferences.showGuests}
                onChange={(e) => onUpdatePreference('showGuests', e.target.checked)}
                disabled={!preferences.profileVisibility}
                className="w-5 h-5 md:w-[18px] md:h-[18px] border-2 border-[#DFDDDB] rounded cursor-pointer appearance-none relative transition-all !bg-white checked:border-[#0B6333] checked:bg-[#0B6333] disabled:opacity-50 disabled:cursor-not-allowed before:content-['✓'] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:text-white before:text-xs before:font-bold before:opacity-0 checked:before:opacity-100 flex-shrink-0 mt-[2px] md:mt-0"
              />
              <div className="flex items-center gap-2 flex-1">
                Show profile to guests
                <Tooltip text="Allow non-registered users to view your public profile when they visit the site." />
              </div>
            </label>

            <div className={cn("ml-8 md:ml-6 space-y-3 transition-opacity mt-2 md:mt-0", visibilityOptionsEnabled ? "opacity-100" : "opacity-60 pointer-events-none")}>
              {[
                { key: 'showBookmarks' as const, label: 'Show bookmarked schools', tooltip: 'When your profile is public, this allows other users to see the list of schools you have bookmarked.' },
                { key: 'showFollowing' as const, label: 'Show following list', tooltip: 'When your profile is public, this allows other users to see the list of schools and users you are following.' },
                { key: 'showEvents' as const, label: 'Show events attended', tooltip: 'When your profile is public, this allows other users to see a list of public virtual or in-person events you have attended.' },
              ].map((item) => (
                <label key={item.key} className="flex items-start gap-3 text-[15px] md:text-sm text-[#464646] cursor-pointer py-3 md:py-2 rounded-lg md:rounded-none transition-colors md:hover:bg-[#F8F9FA]">
                  <input
                    type="checkbox"
                    checked={preferences[item.key]}
                    onChange={(e) => onUpdatePreference(item.key, e.target.checked)}
                    disabled={!visibilityOptionsEnabled}
                    className="w-5 h-5 md:w-[18px] md:h-[18px] border-2 border-[#DFDDDB] rounded cursor-pointer appearance-none relative transition-all !bg-white checked:border-[#0B6333] checked:bg-[#0B6333] disabled:opacity-50 disabled:cursor-not-allowed before:content-['✓'] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:text-white before:text-xs before:font-bold before:opacity-0 checked:before:opacity-100 flex-shrink-0 mt-[2px] md:mt-0"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    {item.label}
                    <Tooltip text={item.tooltip} />
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
