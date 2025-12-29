'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Portal } from '@/components/ui/Portal';

interface Notification {
  id: string;
  category: 'student' | 'vendor' | 'system';
  avatar: string;
  text: string;
  content?: React.ReactNode;
  date: string;
  timeAgo: string;
  isUnread: boolean;
  isRead: boolean;
}

interface NotificationsPanelMobileProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    category: 'student',
    avatar: 'https://i.ibb.co/LXWbBrR/AVATAR-midtone-ux-instrgram.jpg',
    text: 'You earned a new badge Active Member',
    content: (
      <div className="bg-[#EBFCF3] p-3 rounded-md border-l-[3px] border-[#00DF8B] flex items-center gap-3">
        <div className="w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center text-white font-bold text-xs">★</div>
        <div>
          <div className="font-semibold">Active Member</div>
          <div className="text-xs text-[#6B7280]">You wrote your first review!</div>
        </div>
      </div>
    ),
    date: 'Friday, Dec 23, 2024',
    timeAgo: '1 hour ago',
    isUnread: true,
    isRead: false,
  },
  {
    id: '2',
    category: 'student',
    avatar: 'https://i.ibb.co/q3gjNwF/AVATAR-Kostis-Kapelonis.png',
    text: 'Jane D. just reviewed Stanford University',
    content: (
      <div className="bg-[#EBFCF3] p-3 rounded-md border-l-[3px] border-[#089E68]">
        <div className="flex items-center gap-1 text-[#F59E0B] font-semibold mb-2">
          <span>★★★★★</span>
          <span>5</span>
        </div>
        <div>&quot;The campus is absolutely beautiful and the comp-sci program is top-notch...&quot;</div>
      </div>
    ),
    date: 'Friday, Dec 23, 2024',
    timeAgo: '2 hours ago',
    isUnread: true,
    isRead: false,
  },
  {
    id: '3',
    category: 'student',
    avatar: 'https://i.ibb.co/gLtx1DB/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg',
    text: 'Application Deadline Reminder: The deadline for Duke University is approaching',
    content: (
      <div className="bg-[#FEF3E2] p-3 rounded-md border-l-[3px] border-[#F59E0B]">
        <div className="font-semibold">⚠️ 7 days remaining</div>
        <div className="mt-1">Deadline: January 2, 2025 at 11:59 PM</div>
      </div>
    ),
    date: 'Friday, Dec 23, 2024',
    timeAgo: '3 hours ago',
    isUnread: true,
    isRead: false,
  },
];

const categories = [
  { id: 'student', label: 'Student', count: 8 },
  { id: 'vendor', label: 'Vendor', count: 3 },
  { id: 'system', label: 'System', count: 2 },
];

export const NotificationsPanelMobile: React.FC<NotificationsPanelMobileProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  const [activeCategory, setActiveCategory] = useState('student');
  const [hideRead, setHideRead] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(mockNotifications);
  const panelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Node;
    if (panelRef.current && !panelRef.current.contains(target)) {
      const backdrop = document.querySelector('[data-backdrop="notifications-mobile"]');
      if (backdrop && backdrop.contains(target)) {
        onClose();
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      try {
        if (document) {
          document.removeEventListener('mousedown', handleClickOutside);
        }
      } catch (error) {
        console.warn('Error removing event listener:', error);
      }
    };
  }, [isOpen, handleClickOutside]);

  const filteredNotifications = notifications.filter(notification => {
    const matchesCategory = notification.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      notification.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesReadFilter = !hideRead || !notification.isRead;
    
    return matchesCategory && matchesSearch && matchesReadFilter;
  });

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isUnread: false, isRead: true } : notif
      )
    );
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isUnread: false, isRead: true }))
    );
  }, []);

  if (!isOpen) return null;

  return (
    <Portal containerId="notifications-panel-portal">
      <div className="fixed inset-0 z-[1001] md:hidden">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-25 transition-opacity duration-300" 
          onClick={onClose}
          data-backdrop="notifications-mobile"
        />
        
        {/* Mobile Frame */}
        <div 
          ref={frameRef}
          className={cn(
            "fixed left-0 right-0 w-full bg-surface overflow-hidden"
          )}
          style={{ 
            top: '64px',
            height: 'calc(100vh - 64px)',
            borderRadius: '20px 20px 0 0',
            boxShadow: '0 -4px 12px var(--shadow-color)'
          }}
        >
        {/* Drawer Handle */}
        <div 
          className="relative h-6 flex justify-center items-center bg-surface cursor-pointer py-2.5 z-[100]"
          onClick={onClose}
        >
          <div className="w-8 h-1 rounded-full" style={{ backgroundColor: 'var(--gray-300)' }} />
        </div>
        
        {/* Notifications Panel */}
        <div 
          ref={panelRef}
          className="h-[calc(100%-24px)] overflow-y-auto flex flex-col"
          style={{ backgroundColor: 'var(--surface-color)' }}
        >
          {/* Header */}
          <div className="p-4 pb-2 border-b border-theme bg-surface sticky top-0 z-10">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold" style={{ color: 'var(--bold-text)' }}>Notifications</h1>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--subtle-text)' }}>
                  Hide Read
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={hideRead}
                      onChange={(e) => setHideRead(e.target.checked)}
                      className="sr-only"
                    />
                    <div 
                      className="w-9 h-5 rounded-full transition-colors duration-200 cursor-pointer"
                      style={{ backgroundColor: hideRead ? 'var(--active-green)' : 'var(--gray-300)' }}
                    >
                      <div 
                        className="w-4 h-4 rounded-full transition-transform duration-200 mt-0.5"
                        style={{ 
                          backgroundColor: 'var(--surface-color)',
                          transform: hideRead ? 'translateX(16px)' : 'translateX(2px)'
                        }}
                      />
                    </div>
                  </div>
                </label>
                
                <button
                  onClick={markAllAsRead}
                  className="p-2 rounded-md transition-colors"
                  style={{ 
                    color: 'var(--subtle-text)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                    e.currentTarget.style.color = 'var(--text-default)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--subtle-text)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                    e.currentTarget.style.color = 'var(--text-default)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                    e.currentTarget.style.color = 'var(--text-default)';
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "px-3 py-2 rounded-2xl text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 whitespace-nowrap flex-shrink-0",
                    activeCategory === category.id
                      ? "text-white"
                      : ""
                  )}
                  style={{
                    backgroundColor: activeCategory === category.id ? 'var(--active-green)' : 'transparent',
                    color: activeCategory === category.id ? 'white' : 'var(--subtle-text)',
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== category.id) {
                      e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== category.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {category.label}
                  <span 
                    className="px-2 py-0.5 rounded-xl text-xs font-medium"
                    style={{
                      backgroundColor: activeCategory === category.id ? 'rgba(255, 255, 255, 0.2)' : 'var(--gray-200)',
                      color: activeCategory === category.id ? 'white' : 'var(--subtle-text)',
                    }}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="p-3 bg-surface sticky top-0 z-5">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--subtle-text)' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Filter messages"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-lg border-2 border-transparent transition-all duration-200 text-sm"
              style={{
                backgroundColor: 'var(--gray-100)',
                color: 'var(--text-default)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--active-green)';
                e.currentTarget.style.backgroundColor = 'var(--surface-color)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.backgroundColor = 'var(--gray-100)';
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors"
                style={{ color: 'var(--subtle-text)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--gray-300)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--gray-300)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--gray-300)';
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto scrollbar-hide px-4" style={{ backgroundColor: 'transparent' }}>
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex gap-3 py-4 border-b relative group",
                  notification.isRead && "opacity-70"
                )}
                style={{ borderColor: 'var(--border-color)' }}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={notification.avatar}
                    alt="User"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm mb-1 pr-16 leading-relaxed" style={{ color: 'var(--text-default)' }}>
                    {notification.text}
                  </div>
                  {notification.content && (
                    <div className="mb-2">
                      {notification.content}
                    </div>
                  )}
                  <div className="flex justify-between text-xs" style={{ color: 'var(--subtle-text)' }}>
                    <span>{notification.date}</span>
                    <span>{notification.timeAgo}</span>
                  </div>
                </div>

                {/* Indicators */}
                <div className="absolute right-0 top-4 flex items-center gap-1.5">
                  {notification.isUnread && (
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--verification-blue)' }} />
                  )}
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-1 rounded-full transition-colors"
                    style={{ color: 'var(--subtle-text)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                      e.currentTarget.style.color = 'var(--text-default)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--subtle-text)';
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                      e.currentTarget.style.color = 'var(--text-default)';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                      e.currentTarget.style.color = 'var(--text-default)';
                    }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M149.61,85.71l-89.6,88a8,8,0,0,1-11.22,0L10.39,136a8,8,0,1,1,11.22-11.41L54.4,156.79l84-82.5a8,8,0,1,1,11.22,11.42Zm96.1-11.32a8,8,0,0,0-11.32-.1l-84,82.5-18.83-18.5a8,8,0,0,0-11.21,11.42l24.43,24a8,8,0,0,0,11.22,0l89.6-88A8,8,0,0,0,245.71,74.39Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => dismissNotification(notification.id)}
                    className="p-1 rounded-full transition-colors"
                    style={{ color: 'var(--subtle-text)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                      e.currentTarget.style.color = 'var(--text-default)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--subtle-text)';
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                      e.currentTarget.style.color = 'var(--text-default)';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                      e.currentTarget.style.color = 'var(--text-default)';
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </Portal>
  );
};
