'use client';

import { FC, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Types
type ChannelType = 'email' | 'slack' | 'sms' | 'webhook' | 'discord' | 'teams' | 'telegram' | 'gitlab';

interface ChannelConfig {
  name: string;
  active?: boolean;
  subscribeNew?: boolean;
  [key: string]: any;
}

interface EmailConfig extends ChannelConfig {
  email: string;
  server: string;
  port: string;
  username?: string;
  password?: string;
}

interface SlackConfig extends ChannelConfig {
  url: string;
  channel: string;
}

interface SmsConfig extends ChannelConfig {
  phone: string;
  provider: string;
  apiKey: string;
}

interface WebhookConfig extends ChannelConfig {
  url: string;
  method: 'POST' | 'PUT' | 'PATCH';
  headers?: Record<string, string>;
}

interface DiscordConfig extends ChannelConfig {
  url: string;
}

interface TeamsConfig extends ChannelConfig {
  url: string;
}

interface TelegramConfig extends ChannelConfig {
  apiKey: string;
  chatId: string;
}

interface GitlabConfig extends ChannelConfig {
  url: string;
  projectId: string;
  token: string;
}

interface ChannelData {
  connected: boolean;
  config: ChannelConfig[];
}

const CHANNEL_INFO: Record<ChannelType, { title: string; subtitle: string; iconColor: string }> = {
  email: { title: 'Email', subtitle: 'You are connected to Email', iconColor: 'bg-[#E8F4FF] text-[#1976D2]' },
  slack: { title: 'Slack', subtitle: 'Send notifications to Slack channels', iconColor: 'bg-[#F0F8FF] text-[#4A154B]' },
  sms: { title: 'SMS', subtitle: 'Send notifications via text message', iconColor: 'bg-[#E8F5E8] text-[#2E7D32]' },
  webhook: { title: 'WebHook', subtitle: 'Send HTTP POST notifications to custom endpoints', iconColor: 'bg-[#FFF3E0] text-[#F57C00]' },
  discord: { title: 'Discord', subtitle: 'Send notifications to Discord channels', iconColor: 'bg-[#F3F2FF] text-[#5865F2]' },
  teams: { title: 'Microsoft Teams', subtitle: 'Send notifications to Teams channels', iconColor: 'bg-[#E8F0FF] text-[#5059C9]' },
  telegram: { title: 'Telegram', subtitle: 'Send notifications to Telegram chats', iconColor: 'bg-[#E3F2FD] text-[#2196F3]' },
  gitlab: { title: 'GitLab', subtitle: 'Send notifications to GitLab issues', iconColor: 'bg-[#FFF3E0] text-[#E24329]' },
};

// Drawer Component (Mobile)
const Drawer: FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; onSave: () => void }> = ({
  isOpen,
  onClose,
  title,
  children,
  onSave,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-black/50 z-[1000] transition-opacity duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "md:hidden fixed bottom-0 left-0 w-full max-h-[90%] bg-white rounded-t-[20px] shadow-[0_-2px_10px_rgba(0,0,0,0.15)] z-[1001] transition-transform duration-300 flex flex-col overflow-hidden",
          isOpen ? "translate-y-0 visible" : "translate-y-full invisible"
        )}
      >
        <div className="sticky top-0 bg-white px-5 py-4 border-b border-[#EBEDF0] flex justify-between items-center z-10 flex-shrink-0">
          <h3 className="text-lg font-semibold text-[#1B1B1B]">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border-none bg-transparent cursor-pointer text-[#5F5F5F] rounded-full transition-colors active:bg-[#F3F4F6]"
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="px-5 py-4 overflow-y-auto flex-grow">{children}</div>
        <div className="px-5 py-4 border-t border-[#EBEDF0] flex justify-end gap-3 bg-white flex-shrink-0 sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-[#E4E6EB] text-[#050505] cursor-pointer transition-all active:bg-[#D8DADF] min-h-[44px]"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-[#0B6333] text-white cursor-pointer transition-all active:bg-[#089E68] min-h-[44px]"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </>
  );
};

// Modal Component (Desktop)
const Modal: FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; onSave: () => void }> = ({
  isOpen,
  onClose,
  title,
  children,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "hidden md:flex fixed inset-0 bg-black/60 items-center justify-center z-[1000] transition-opacity duration-300",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] w-full max-w-[520px] p-6 relative transition-transform duration-300 max-h-[90vh] overflow-y-auto",
          isOpen ? "scale-100" : "scale-95"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5 pb-4 border-b border-[#EBEDF0]">
          <h3 className="text-xl font-semibold text-[#1B1B1B]">{title}</h3>
          <button
            onClick={onClose}
            className="bg-[#E4E6EB] border-none rounded-full w-[30px] h-[30px] text-xl text-[#5F5F5F] cursor-pointer flex justify-center items-center transition-colors hover:bg-[#D8DADF]"
          >
            ×
          </button>
        </div>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-medium border border-transparent bg-[#E4E6EB] text-[#050505] cursor-pointer transition-all hover:bg-[#D8DADF]"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-md text-sm font-medium border border-[#0B6333] bg-[#0B6333] text-white cursor-pointer transition-all hover:bg-[#089E68]"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

// Form Group Component
const FormGroup: FC<{ label: string; description?: string; children: React.ReactNode }> = ({ label, description, children }) => (
  <div className="mb-4 md:mb-5 last:mb-0">
    <label className="block text-sm font-medium text-[#464646] mb-2">{label}</label>
    {children}
    {description && <div className="text-xs text-[#5F5F5F] mt-1.5 leading-snug">{description}</div>}
  </div>
);

export const NotificationChannelsSection: FC = () => {
  const [channels, setChannels] = useState<Record<ChannelType, ChannelData>>({
    email: {
      connected: true,
      config: [
        {
          name: 'Primary Email',
          email: 'admin@company.com',
          server: 'mail.company.com',
          port: '587',
          active: true,
          subscribeNew: true,
        } as EmailConfig,
      ],
    },
    slack: { connected: false, config: [] },
    sms: { connected: false, config: [] },
    webhook: { connected: false, config: [] },
    discord: { connected: false, config: [] },
    teams: { connected: false, config: [] },
    telegram: { connected: false, config: [] },
    gitlab: { connected: false, config: [] },
  });

  const [expandedChannel, setExpandedChannel] = useState<ChannelType | null>(null);
  const [activeModal, setActiveModal] = useState<ChannelType | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const openModal = (channel: ChannelType, index: number | null = null) => {
    setActiveModal(channel);
    setEditingIndex(index);
    if (index !== null && channels[channel].config[index]) {
      setFormData({ ...channels[channel].config[index] });
    } else {
      setFormData({});
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setEditingIndex(null);
    setFormData({});
  };

  const saveConfig = (channel: ChannelType) => {
    const newConfig = { ...formData, active: true, subscribeNew: true };
    
    setChannels(prev => {
      const updated = { ...prev };
      if (editingIndex !== null) {
        updated[channel].config[editingIndex] = newConfig;
      } else {
        updated[channel].config = [...updated[channel].config, newConfig];
      }
      updated[channel].connected = true;
      return updated;
    });

    closeModal();
    showMessage(`${CHANNEL_INFO[channel].title} configuration saved successfully!`);
  };

  const removeConfig = (channel: ChannelType, index: number) => {
    if (confirm(`Are you sure you want to remove this ${CHANNEL_INFO[channel].title} configuration?`)) {
      setChannels(prev => {
        const updated = { ...prev };
        updated[channel].config.splice(index, 1);
        if (updated[channel].config.length === 0) {
          updated[channel].connected = false;
        }
        return updated;
      });
      showMessage(`${CHANNEL_INFO[channel].title} configuration removed successfully!`);
    }
  };

  const toggleStatus = (channel: ChannelType, index: number) => {
    setChannels(prev => {
      const updated = { ...prev };
      updated[channel].config[index].active = !updated[channel].config[index].active;
      return updated;
    });
  };

  const toggleExpanded = (channel: ChannelType) => {
    setExpandedChannel(expandedChannel === channel ? null : channel);
  };

  const getConfigDetails = (channel: ChannelType, config: any) => {
    switch (channel) {
      case 'email':
        return `${config.server}:${config.port} (${config.email})`;
      case 'sms':
        return `${config.phone} via ${config.provider}`;
      case 'webhook':
        return config.url;
      case 'slack':
        return config.channel;
      case 'discord':
      case 'teams':
        return 'Webhook configured';
      case 'telegram':
        return `Chat ID: ${config.chatId}`;
      case 'gitlab':
        return `Project: ${config.projectId}`;
      default:
        return 'Configured';
    }
  };

  const renderChannelIcon = (channel: ChannelType) => {
    const icons: Record<ChannelType, React.ReactNode> = {
      email: (
        <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
          <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2M1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z"/>
        </svg>
      ),
      slack: (
        <svg viewBox="0 0 128 128" className="w-5 h-5">
          <path fill="#de1c59" d="M27.255 80.719c0 7.33-5.978 13.317-13.309 13.317S.63 88.049.63 80.719s5.987-13.317 13.317-13.317h13.309zm6.709 0c0-7.33 5.987-13.317 13.317-13.317s13.317 5.986 13.317 13.317v33.335c0 7.33-5.986 13.317-13.317 13.317c-7.33 0-13.317-5.987-13.317-13.317zm0 0"/>
          <path fill="#35c5f0" d="M47.281 27.255c-7.33 0-13.317-5.978-13.317-13.309S39.951.63 47.281.63s13.317 5.987 13.317 13.317v13.309zm0 6.709c7.33 0 13.317 5.987 13.317 13.317s-5.986 13.317-13.317 13.317H13.946C6.616 60.598.63 54.612.63 47.281c0-7.33 5.987-13.317 13.317-13.317zm0 0"/>
          <path fill="#2eb57d" d="M100.745 47.281c0-7.33 5.978-13.317 13.309-13.317s13.317 5.987 13.317 13.317s-5.987 13.317-13.317 13.317h-13.309zm-6.709 0c0 7.33-5.987 13.317-13.317 13.317s-13.317-5.986-13.317-13.317V13.946C67.402 6.616 73.388.63 80.719.63c7.33 0 13.317 5.987 13.317 13.317zm0 0"/>
          <path fill="#ebb02e" d="M80.719 100.745c7.33 0 13.317 5.978 13.317 13.309s-5.987 13.317-13.317 13.317s-13.317-5.987-13.317-13.317v-13.309zm0-6.709c-7.33 0-13.317-5.987-13.317-13.317s5.986-13.317 13.317-13.317h33.335c7.33 0 13.317 5.986 13.317 13.317c0 7.33-5.987 13.317-13.317 13.317zm0 0"/>
        </svg>
      ),
      sms: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M17 11h-2V9h2m-4 2h-2V9h2m-4 2H7V9h2m11-7H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"/>
        </svg>
      ),
      webhook: (
        <svg viewBox="0 0 256 239" className="w-5 h-5 scale-110" fill="currentColor">
          <path d="M119.54 100.503c-10.61 17.836-20.775 35.108-31.152 52.25c-2.665 4.401-3.984 7.986-1.855 13.58c5.878 15.454-2.414 30.493-17.998 34.575c-14.697 3.851-29.016-5.808-31.932-21.543c-2.584-13.927 8.224-27.58 23.58-29.757c1.286-.184 2.6-.205 4.762-.367l23.358-39.168C73.612 95.465 64.868 78.39 66.803 57.23c1.368-14.957 7.25-27.883 18-38.477c20.59-20.288 52.002-23.573 76.246-8.001c23.284 14.958 33.948 44.094 24.858 69.031c-6.854-1.858-13.756-3.732-21.343-5.79c2.854-13.865.743-26.315-8.608-36.981c-6.178-7.042-14.106-10.733-23.12-12.093c-18.072-2.73-35.815 8.88-41.08 26.618c-5.976 20.13 3.069 36.575 27.784 48.967"/>
        </svg>
      ),
      discord: (
        <svg viewBox="0 0 256 256" className="w-5 h-5">
          <rect width="256" height="256" fill="#5865F2" rx="60"/>
          <path fill="#fff" d="M197.308 64.797a165 165 0 0 0-40.709-12.627a.62.62 0 0 0-.654.31c-1.758 3.126-3.706 7.206-5.069 10.412c-15.373-2.302-30.666-2.302-45.723 0c-1.364-3.278-3.382-7.286-5.148-10.412a.64.64 0 0 0-.655-.31a164.5 164.5 0 0 0-40.709 12.627a.6.6 0 0 0-.268.23c-25.928 38.736-33.03 76.52-29.546 113.836a.7.7 0 0 0 .26.468c17.106 12.563 33.677 20.19 49.94 25.245a.65.65 0 0 0 .702-.23c3.847-5.254 7.276-10.793 10.217-16.618a.633.633 0 0 0-.347-.881c-5.44-2.064-10.619-4.579-15.601-7.436a.642.642 0 0 1-.063-1.064a86 86 0 0 0 3.098-2.428a.62.62 0 0 1 .646-.088c32.732 14.944 68.167 14.944 100.512 0a.62.62 0 0 1 .655.08a80 80 0 0 0 3.106 2.436a.642.642 0 0 1-.055 1.064a102.6 102.6 0 0 1-15.609 7.428a.64.64 0 0 0-.339.889a133 133 0 0 0 10.208 16.61a.64.64 0 0 0 .702.238c16.342-5.055 32.913-12.682 50.02-25.245a.65.65 0 0 0 .26-.46c4.17-43.141-6.985-80.616-29.571-113.836a.5.5 0 0 0-.26-.238M94.834 156.142c-9.855 0-17.975-9.047-17.975-20.158s7.963-20.158 17.975-20.158c10.09 0 18.131 9.127 17.973 20.158c0 11.111-7.962 20.158-17.973 20.158m66.456 0c-9.855 0-17.974-9.047-17.974-20.158s7.962-20.158 17.974-20.158c10.09 0 18.131 9.127 17.974 20.158c0 11.111-7.884 20.158-17.974 20.158"/>
        </svg>
      ),
      teams: (
        <svg viewBox="0 0 256 239" className="w-5 h-5">
          <path fill="#5059C9" d="M178.563 89.302h66.125c6.248 0 11.312 5.065 11.312 11.312v60.231c0 22.96-18.613 41.574-41.573 41.574h-.197c-22.96.003-41.576-18.607-41.579-41.568V95.215a5.91 5.91 0 0 1 5.912-5.913"/>
          <circle cx="223.256" cy="50.605" r="26.791" fill="#5059C9"/>
          <circle cx="139.907" cy="38.698" r="38.698" fill="#7B83EB"/>
          <path fill="#3940AB" d="M10.913 53.581h109.15c6.028 0 10.914 4.886 10.914 10.913v109.151c0 6.027-4.886 10.913-10.913 10.913H10.913C4.886 184.558 0 179.672 0 173.645V64.495C0 58.466 4.886 53.58 10.913 53.58"/>
          <path fill="#FFF" d="M94.208 95.125h-21.82v59.416H58.487V95.125H36.769V83.599h57.439z"/>
        </svg>
      ),
      telegram: (
        <svg viewBox="0 0 256 256" className="w-5 h-5">
          <defs>
            <linearGradient id="telegram-grad" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#2AABEE"/>
              <stop offset="100%" stopColor="#229ED9"/>
            </linearGradient>
          </defs>
          <path fill="url(#telegram-grad)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.04 128.04 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51s-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0"/>
          <path fill="#FFF" d="M57.94 126.648q55.98-24.384 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072"/>
        </svg>
      ),
      gitlab: (
        <svg viewBox="0 0 128 128" className="w-5 h-5">
          <path fill="#E24329" d="m124.755 51.382l-.177-.452L107.47 6.282a4.46 4.46 0 0 0-1.761-2.121a4.58 4.58 0 0 0-5.236.281a4.6 4.6 0 0 0-1.518 2.304L87.404 42.088H40.629L29.077 6.746a4.5 4.5 0 0 0-1.518-2.31a4.58 4.58 0 0 0-5.236-.281a4.5 4.5 0 0 0-1.761 2.121L3.422 50.904l-.17.452c-5.059 13.219-.763 28.192 10.537 36.716l.059.046l.157.111l26.061 19.516l12.893 9.758l7.854 5.93a5.28 5.28 0 0 0 6.388 0l7.854-5.93l12.893-9.758l26.218-19.634l.065-.052c11.273-8.526 15.562-23.472 10.524-36.677"/>
        </svg>
      ),
    };
    return icons[channel] || <div className="w-5 h-5" />;
  };

  return (
    <>
      {/* Success/Error Message */}
      {message && (
        <div className={cn(
          "px-4 py-3 rounded-md mb-4 text-sm flex items-center gap-2",
          message.type === 'success' ? "bg-[#EBFCF4] border border-[#D7F7E9] text-[#089E68]" : "bg-[#FDEEED] border border-[#FAD8D6] text-[#DC3545]"
        )}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {message.type === 'success' ? (
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
          {message.text}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-5 md:gap-6 mb-[30px] md:mb-12 items-start">
        <div className="flex-[0_0_100%] md:flex-[0_0_30%]">
          <h2 className="text-[18px] md:text-xl font-semibold text-[#464646] mb-2 md:mb-3">Notification Channels</h2>
          <p className="text-[14px] text-[#5F5F5F] leading-[1.5] mb-5 md:mb-0">
            Configure how you receive alerts and notifications from your monitoring systems. Connect multiple channels to ensure you never miss critical updates.
          </p>
        </div>

        <div className="flex-[0_0_100%] md:flex-[0_0_70%]">
          <div className="bg-white rounded-xl md:rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:shadow-[0_1px_3px_rgba(0,0,0,0.08)] overflow-hidden">
            {(Object.keys(CHANNEL_INFO) as ChannelType[]).map((channel) => (
              <div
                key={channel}
                className={cn(
                  "relative transition-colors",
                  expandedChannel === channel && "bg-[#F8F9FA]"
                )}
              >
                <div className="p-4 md:p-5 flex items-center relative">
                  {/* Divider */}
                  <div className="absolute bottom-0 left-4 md:left-5 right-4 md:right-5 h-[1px] bg-black/8" />

                  {/* Icon */}
                  <div className={cn("w-10 h-10 flex items-center justify-center rounded-lg mr-[15px] md:mr-4 flex-shrink-0", CHANNEL_INFO[channel].iconColor)}>
                    {renderChannelIcon(channel)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 mr-3 md:mr-4">
                    <h3 className="text-[16px] md:text-base font-semibold mb-0.5 text-[#464646]">{CHANNEL_INFO[channel].title}</h3>
                    <p className="text-[13px] md:text-sm text-[#5F5F5F]">
                      {channels[channel].connected ? `You are connected to ${CHANNEL_INFO[channel].title}` : CHANNEL_INFO[channel].subtitle}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    {!channels[channel].connected ? (
                      <button
                        onClick={() => openModal(channel)}
                        className="px-4 py-2 rounded-lg md:rounded-md text-[14px] md:text-sm font-medium bg-[#E4E6EB] text-[#050505] border border-[#E4E6EB] cursor-pointer transition-all active:bg-[#D8DADF] md:hover:bg-[#D8DADF] min-h-[44px] md:min-h-0"
                      >
                        {channel === 'webhook' ? 'Add WebHook' : channel === 'email' ? 'Configure Email' : `Add ${CHANNEL_INFO[channel].title}`}
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleExpanded(channel)}
                        className="px-3 py-2 rounded-lg md:rounded-md text-[14px] md:text-sm font-medium bg-[#E4E6EB] text-[#050505] border border-[#E4E6EB] cursor-pointer transition-all active:bg-[#D8DADF] md:hover:bg-[#D8DADF] min-w-[80px] min-h-[44px] md:min-h-0 flex items-center justify-center gap-1"
                      >
                        Edit
                        <svg
                          className={cn("w-4 h-4 transition-transform", expandedChannel === channel && "rotate-180")}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M7 10L12 15L17 10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {channels[channel].connected && expandedChannel === channel && (
                  <div className="p-4 bg-[#F8F9FA] border-b border-black/8">
                    {channels[channel].config.map((config, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-8 items-start bg-white p-5 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] mb-4 last:mb-0">
                        {/* Channel Info */}
                        <div>
                          <h4 className="text-xs font-semibold text-[#5F5F5F] uppercase tracking-wide mb-2.5">{CHANNEL_INFO[channel].title} Configuration</h4>
                          <div className="text-sm font-semibold text-[#464646] mb-1">{config.name || 'Unnamed'}</div>
                          <div className="text-[13px] text-[#5F5F5F] leading-snug">{getConfigDetails(channel, config)}</div>
                          <div className="flex items-center gap-2.5 p-2.5 px-4 bg-[#EBFCF4] border border-[#D7F7E9] rounded-md mt-4">
                            <input
                              type="checkbox"
                              checked={config.subscribeNew !== false}
                              onChange={(e) => {
                                const updated = { ...channels };
                                updated[channel].config[index].subscribeNew = e.target.checked;
                                setChannels(updated);
                              }}
                              className="w-[18px] h-[18px] border-2 border-[#DFDDDB] rounded cursor-pointer appearance-none relative transition-all checked:border-[#0B6333] checked:bg-[#0B6333] before:content-['✓'] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:text-white before:text-xs before:font-bold before:opacity-0 checked:before:opacity-100"
                            />
                            <label className="text-[13px] text-[#464646] cursor-pointer flex-1">
                              Auto-subscribe new checks
                            </label>
                          </div>
                        </div>

                        {/* Status */}
                        <div>
                          <h4 className="text-xs font-semibold text-[#5F5F5F] uppercase tracking-wide mb-2.5">Status</h4>
                          <div
                            onClick={() => toggleStatus(channel, index)}
                            className="flex items-center cursor-pointer transition-all rounded px-1.5 py-0.5 hover:bg-black/5"
                            title="Click to toggle status"
                          >
                            <div className={cn("w-2.5 h-2.5 rounded-full mr-2 flex-shrink-0", config.active !== false ? "bg-[#089E68]" : "bg-[#DC3545]")} />
                            <p className="text-sm">{config.active !== false ? 'Active' : 'Inactive'}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2.5 w-full md:w-auto">
                          <button
                            onClick={() => {
                              // Test notification
                              showMessage(`Test ${CHANNEL_INFO[channel].title} notification sent!`);
                            }}
                            className="px-3 py-1.5 rounded-md text-sm font-medium bg-[#E4E6EB] text-[#050505] cursor-pointer transition-all hover:bg-[#D8DADF] flex items-center justify-start gap-2 w-full md:min-w-[120px]"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                            </svg>
                            Test
                          </button>
                          <button
                            onClick={() => openModal(channel, index)}
                            className="px-3 py-1.5 rounded-md text-sm font-medium bg-[#E4E6EB] text-[#050505] cursor-pointer transition-all hover:bg-[#D8DADF] flex items-center justify-start gap-2 w-full"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => removeConfig(channel, index)}
                            className="px-3 py-1.5 rounded-md text-sm font-medium bg-[#FDEEED] text-[#DC3545] cursor-pointer transition-all hover:bg-[#FAD8D6] flex items-center justify-start gap-2 w-full"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"/>
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Add Another Button */}
                    <button
                      onClick={() => openModal(channel)}
                      className="w-full border-2 border-dashed border-[#DFDDDB] bg-transparent text-[#5F5F5F] rounded-md p-4 cursor-pointer transition-all hover:border-[#0B6333] hover:text-[#0B6333] hover:bg-[#EBFCF4] flex items-center justify-center gap-2"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14m7-7H5" strokeLinecap="round"/>
                      </svg>
                      Add Another {CHANNEL_INFO[channel].title}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Email Modal */}
      <Modal isOpen={activeModal === 'email'} onClose={closeModal} title="Email Configuration" onSave={() => saveConfig('email')}>
        <FormGroup label="Configuration Name" description="A friendly name for this email configuration">
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Primary Email"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="Email Address" description="The email address where notifications will be sent">
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="admin@company.com"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="SMTP Server">
          <input
            type="text"
            value={formData.server || ''}
            onChange={(e) => setFormData({ ...formData, server: e.target.value })}
            placeholder="mail.company.com"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="Port">
          <input
            type="number"
            value={formData.port || ''}
            onChange={(e) => setFormData({ ...formData, port: e.target.value })}
            placeholder="587"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="Username">
          <input
            type="text"
            value={formData.username || ''}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder="admin@company.com"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="Password">
          <input
            type="password"
            value={formData.password || ''}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
      </Modal>

      {/* Slack Modal */}
      <Modal isOpen={activeModal === 'slack'} onClose={closeModal} title="Slack Configuration" onSave={() => saveConfig('slack')}>
        <FormGroup label="Webhook Name">
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Production Alerts"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="Slack Webhook URL" description="Get this from your Slack app's webhook settings">
          <input
            type="url"
            value={formData.url || ''}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://hooks.slack.com/services/..."
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="Channel">
          <input
            type="text"
            value={formData.channel || ''}
            onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
            placeholder="#alerts or @username"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
      </Modal>

      {/* SMS Modal */}
      <Modal isOpen={activeModal === 'sms'} onClose={closeModal} title="SMS Configuration" onSave={() => saveConfig('sms')}>
        <FormGroup label="Configuration Name" description="A friendly name for this SMS configuration">
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Primary SMS"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="Phone Number" description="Include country code (e.g., +1 for US)">
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="Provider">
          <select
            value={formData.provider || 'twilio'}
            onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)]"
          >
            <option value="twilio">Twilio</option>
            <option value="aws-sns">AWS SNS</option>
            <option value="nexmo">Nexmo</option>
          </select>
        </FormGroup>
        <FormGroup label="API Key">
          <input
            type="password"
            value={formData.apiKey || ''}
            onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
      </Modal>

      {/* WebHook Modal */}
      <Modal isOpen={activeModal === 'webhook'} onClose={closeModal} title="Add WebHook" onSave={() => saveConfig('webhook')}>
        <FormGroup label="Webhook Name">
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Production API Webhook"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="URL" description="The endpoint where POST notifications will be sent">
          <input
            type="url"
            value={formData.url || ''}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://api.example.com/webhook"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="Method">
          <select
            value={formData.method || 'POST'}
            onChange={(e) => setFormData({ ...formData, method: e.target.value })}
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)]"
          >
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
          </select>
        </FormGroup>
        <FormGroup label="Headers (Optional)" description="JSON format headers to include with requests">
          <textarea
            value={formData.headers ? JSON.stringify(formData.headers, null, 2) : ''}
            onChange={(e) => {
              try {
                const headers = e.target.value ? JSON.parse(e.target.value) : {};
                setFormData({ ...formData, headers });
              } catch {
                // Invalid JSON, keep as string
              }
            }}
            placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
            rows={3}
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
      </Modal>

      {/* Discord Modal */}
      <Modal isOpen={activeModal === 'discord'} onClose={closeModal} title="Discord Configuration" onSave={() => saveConfig('discord')}>
        <FormGroup label="Webhook Name">
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Alert Bot"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="Discord Webhook URL" description="Get this from your Discord server's webhook settings">
          <input
            type="url"
            value={formData.url || ''}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://discord.com/api/webhooks/..."
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
      </Modal>

      {/* Teams Modal */}
      <Modal isOpen={activeModal === 'teams'} onClose={closeModal} title="Microsoft Teams Configuration" onSave={() => saveConfig('teams')}>
        <FormGroup label="Webhook Name">
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="System Alerts"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="Teams Webhook URL" description="Get this from your Teams channel connector settings">
          <input
            type="url"
            value={formData.url || ''}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://outlook.office.com/webhook/..."
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
      </Modal>

      {/* Telegram Modal */}
      <Modal isOpen={activeModal === 'telegram'} onClose={closeModal} title="Telegram Configuration" onSave={() => saveConfig('telegram')}>
        <FormGroup label="Bot Name">
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Alert Bot"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="Bot API Token" description="Get this from @BotFather on Telegram">
          <input
            type="password"
            value={formData.apiKey || ''}
            onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
            placeholder="1234567890:ABCdefGHIjklMNOpqrSTUvwxyz"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="Chat ID" description="The chat or group ID where messages will be sent">
          <input
            type="text"
            value={formData.chatId || ''}
            onChange={(e) => setFormData({ ...formData, chatId: e.target.value })}
            placeholder="-1001234567890"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
      </Modal>

      {/* GitLab Modal */}
      <Modal isOpen={activeModal === 'gitlab'} onClose={closeModal} title="GitLab Configuration" onSave={() => saveConfig('gitlab')}>
        <FormGroup label="Configuration Name" description="A friendly name for this GitLab configuration">
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="GitLab Integration"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="GitLab URL">
          <input
            type="url"
            value={formData.url || ''}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://gitlab.com"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="Project ID" description="The GitLab project ID where issues will be created">
          <input
            type="text"
            value={formData.projectId || ''}
            onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
            placeholder="12345"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
        <FormGroup label="Access Token" description="GitLab personal access token with API access">
          <input
            type="password"
            value={formData.token || ''}
            onChange={(e) => setFormData({ ...formData, token: e.target.value })}
            placeholder="glpat-xxxxxxxxxxxxxxxxxxxx"
            className="w-full px-4 py-3 border border-[#DFDDDB] rounded-md text-sm text-[#4A4A4A] bg-[#F5F6F7] transition-all focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.2)] placeholder:text-[#5F5F5F]"
          />
        </FormGroup>
      </Modal>
    </>
  );
};

