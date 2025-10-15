import { FC } from 'react';
import { Tooltip } from './Tooltip';
import { Toggle } from './Toggle';
import { STUDENT_NOTIFICATIONS, VENDOR_NOTIFICATIONS, SYSTEM_NOTIFICATIONS } from '../constants';
import { Preferences } from '../types';

interface NotificationPreferencesProps {
  preferences: Preferences;
  onUpdateNotification: (id: string, type: 'email' | 'onSite', value: boolean) => void;
  userRole: 'user' | 'admin';
  onSave: () => void;
  isSaving: boolean;
}

export const NotificationPreferences: FC<NotificationPreferencesProps> = ({
  preferences,
  onUpdateNotification,
  userRole,
  onSave,
  isSaving,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-start mb-0">
      <div className="flex-[0_0_100%] md:flex-[0_0_30%]">
        <h2 className="text-[18px] md:text-xl font-semibold text-[#464646] mb-2 md:mb-3">Notification Preferences</h2>
        <p className="text-[14px] text-[#5F5F5F] leading-[1.5] mb-5 md:mb-0">
          This section controls the alerts you receive on the platform. Toggle on to receive these notifications via email or view them on the site.
        </p>
      </div>

      <div className="flex-[0_0_100%] md:flex-[0_0_70%]">
        {/* Student Notifications */}
        <div className="bg-white rounded-xl md:rounded-lg p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] md:shadow-[0_1px_3px_rgba(0,0,0,0.1)] mb-[15px] md:mb-8">
          <h3 className="text-base font-semibold text-[#464646] mb-4 md:mb-5">Student Notifications</h3>
          
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] px-4 pb-3 border-b border-[#DFDDDB] mb-4">
            <div className="text-[13px] font-medium text-[#5F5F5F]">Notification Type</div>
            <div className="text-[13px] font-medium text-[#5F5F5F] text-center">Email</div>
            <div className="text-[13px] font-medium text-[#5F5F5F] text-center">On Site</div>
          </div>

          {STUDENT_NOTIFICATIONS.map((notification) => (
            <div key={notification.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] px-0 md:px-4 py-4 md:py-3 items-start md:items-center rounded-md transition-colors md:hover:bg-[#EBFCF4] gap-3 md:gap-0 border-b border-[#EBEDF0] md:border-b-0 last:border-b-0">
              <div className="flex items-center gap-2 text-[14px] md:text-sm font-medium text-[#464646]">
                {notification.name}
                <Tooltip text={notification.tooltip} />
              </div>
              <div className="flex items-center justify-between md:justify-center gap-2 md:gap-0">
                <span className="text-[12px] text-[#5F5F5F] md:hidden">Email</span>
                <Toggle
                  checked={preferences.notifications[notification.id]?.email ?? true}
                  onChange={() => onUpdateNotification(notification.id, 'email', !preferences.notifications[notification.id]?.email)}
                />
              </div>
              <div className="flex items-center justify-between md:justify-center gap-2 md:gap-0">
                <span className="text-[12px] text-[#5F5F5F] md:hidden">On Site</span>
                <Toggle
                  checked={preferences.notifications[notification.id]?.onSite ?? true}
                  onChange={() => onUpdateNotification(notification.id, 'onSite', !preferences.notifications[notification.id]?.onSite)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Vendor Notifications (Admin only) */}
        {userRole === 'admin' && (
          <div className="bg-white rounded-xl md:rounded-lg p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] md:shadow-[0_1px_3px_rgba(0,0,0,0.1)] mb-4 md:mb-8">
            <h3 className="text-base font-semibold text-[#464646] mb-4 md:mb-5 flex items-center gap-2">
              Vendor Notifications
              <span className="inline-block bg-[#00DF8B] text-[#1B1B1B] text-[10px] md:text-[11px] font-semibold px-1.5 md:px-2 py-0.5 rounded-lg md:rounded-xl">ADMIN</span>
            </h3>
            
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] px-4 pb-3 border-b border-[#DFDDDB] mb-4">
              <div className="text-[13px] font-medium text-[#5F5F5F]">Notification Type</div>
              <div className="text-[13px] font-medium text-[#5F5F5F] text-center">Email</div>
              <div className="text-[13px] font-medium text-[#5F5F5F] text-center">On Site</div>
            </div>

            {VENDOR_NOTIFICATIONS.map((notification) => (
              <div key={notification.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] px-0 md:px-4 py-4 md:py-3 items-start md:items-center rounded-md transition-colors md:hover:bg-[#EBFCF4] gap-3 md:gap-0 border-b border-[#EBEDF0] md:border-b-0 last:border-b-0">
                <div className="flex items-center gap-2 text-sm font-medium text-[#464646]">
                  {notification.name}
                  <Tooltip text={notification.tooltip} />
                </div>
                <div className="flex items-center justify-between md:justify-center gap-2 md:gap-0">
                  <span className="text-[12px] text-[#5F5F5F] md:hidden">Email</span>
                  <Toggle
                    checked={preferences.notifications[notification.id]?.email ?? true}
                    onChange={() => onUpdateNotification(notification.id, 'email', !preferences.notifications[notification.id]?.email)}
                  />
                </div>
                <div className="flex items-center justify-between md:justify-center gap-2 md:gap-0">
                  <span className="text-[12px] text-[#5F5F5F] md:hidden">On Site</span>
                  <Toggle
                    checked={preferences.notifications[notification.id]?.onSite ?? true}
                    onChange={() => onUpdateNotification(notification.id, 'onSite', !preferences.notifications[notification.id]?.onSite)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* System Notifications */}
        <div className="bg-white rounded-xl md:rounded-lg p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] md:shadow-[0_1px_3px_rgba(0,0,0,0.1)] mb-4 md:mb-8">
          <h3 className="text-base font-semibold text-[#464646] mb-4 md:mb-5">System Notifications</h3>
          
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] px-4 pb-3 border-b border-[#DFDDDB] mb-4">
            <div className="text-[13px] font-medium text-[#5F5F5F]">Notification Type</div>
            <div className="text-[13px] font-medium text-[#5F5F5F] text-center">Email</div>
            <div className="text-[13px] font-medium text-[#5F5F5F] text-center">On Site</div>
          </div>

          {SYSTEM_NOTIFICATIONS.map((notification) => (
            <div key={notification.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] px-0 md:px-4 py-4 md:py-3 items-start md:items-center rounded-md transition-colors md:hover:bg-[#EBFCF4] gap-3 md:gap-0 border-b border-[#EBEDF0] md:border-b-0 last:border-b-0">
              <div className="flex items-center gap-2 text-sm font-medium text-[#464646]">
                {notification.name}
                <Tooltip text={notification.tooltip} />
              </div>
              <div className="flex items-center justify-between md:justify-center gap-2 md:gap-0">
                <span className="text-[12px] text-[#5F5F5F] md:hidden">Email</span>
                <Toggle
                  checked={preferences.notifications[notification.id]?.email ?? true}
                  onChange={() => onUpdateNotification(notification.id, 'email', !preferences.notifications[notification.id]?.email)}
                />
              </div>
              <div className="flex items-center justify-between md:justify-center gap-2 md:gap-0">
                <span className="text-[12px] text-[#5F5F5F] md:hidden">On Site</span>
                <Toggle
                  checked={preferences.notifications[notification.id]?.onSite ?? true}
                  onChange={() => onUpdateNotification(notification.id, 'onSite', !preferences.notifications[notification.id]?.onSite)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Save Button */}
        <div className="hidden md:block text-right">
          <button
            onClick={onSave}
            disabled={isSaving}
            className="bg-[#0B6333] text-white border-none px-6 py-3 rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-[#089E68] disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
};
