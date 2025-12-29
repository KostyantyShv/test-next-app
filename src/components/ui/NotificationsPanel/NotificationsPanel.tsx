'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import styles from './NotificationsPanel.module.css';
import { NotificationsPanelMobile } from './NotificationsPanelMobile';

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

interface NotificationsPanelProps {
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
      <div className="bg-[var(--apply-button-bg)] p-3 rounded-md border-l-[3px] border-[var(--grade-badge)] flex items-center gap-3 font-inter">
        <div className="w-8 h-8 bg-[var(--grade-badge)] rounded-full flex items-center justify-center text-white font-bold text-xs">★</div>
        <div>
          <div className="font-semibold text-[var(--text-default)] font-inter">Active Member</div>
          <div className="text-xs text-[var(--gray-500)] font-inter">You wrote your first review!</div>
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
      <div className="bg-[var(--apply-button-bg)] p-3 rounded-md border-l-[3px] border-[var(--success-green)] font-inter">
        <div className="flex items-center gap-1 text-[#F59E0B] font-semibold mb-2 font-inter">
          <span>★★★★★</span>
          <span>5</span>
        </div>
        <div className="text-[var(--text-default)] font-inter">&quot;The campus is absolutely beautiful and the comp-sci program is top-notch...&quot;</div>
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
      <div className="bg-[#FEF3E2] p-3 rounded-md border-l-[3px] border-[#F59E0B] font-inter">
        <div className="font-semibold text-[var(--text-default)] font-inter">⚠️ 7 days remaining</div>
        <div className="mt-1 text-[var(--text-default)] font-inter">Deadline: January 2, 2025 at 11:59 PM</div>
      </div>
    ),
    date: 'Friday, Dec 23, 2024',
    timeAgo: '3 hours ago',
    isUnread: true,
    isRead: false,
  },
];

// Categories will be calculated dynamically based on notifications

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  const [activeCategory, setActiveCategory] = useState('student');
  const [hideRead, setHideRead] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(mockNotifications);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    // Перевіряємо, чи клік не на панелі та не на header
    if (panelRef.current && !panelRef.current.contains(target as Node) && !target.closest('header')) {
      // Закриваємо панель при кліку поза нею
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      try {
        if (document) {
          document.removeEventListener('mousedown', handleClickOutside);
        }
      } catch (error) {
        // Ignore errors during cleanup
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

  // Calculate counts for each category (only unread notifications)
  const getCategoryCount = useCallback((categoryId: string) => {
    return notifications.filter(notif => 
      notif.category === categoryId && notif.isUnread && !notif.isRead
    ).length;
  }, [notifications]);

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

  // Additional safety check
  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Mobile Version */}
      <NotificationsPanelMobile isOpen={isOpen} onClose={onClose} className={className} />
      
      {/* Desktop Version */}
      <div className="fixed inset-0 z-[1001] hidden md:block pointer-events-none">
      {/* Backdrop - invisible, only for click outside */}
      <div 
        className="absolute top-[64px] left-0 right-0 bottom-0 cursor-pointer pointer-events-auto" 
        onClick={onClose}
        data-backdrop="notifications"
      />
      
      {/* Panel */}
      <div 
        ref={panelRef}
        className={cn(
          "absolute top-[64px] right-0 w-[480px] bg-[var(--surface-color)] shadow-2xl flex flex-col pointer-events-auto",
          "transform transition-transform duration-300 ease-in-out",
          "border-l border-[var(--border-color)]",
          styles.notificationsPanel,
          isOpen ? "translate-x-0" : "translate-x-full",
          className
        )}
        style={{
          backgroundColor: 'var(--surface-color) !important',
          boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.1)',
          height: 'calc(100vh - 64px)',
          minHeight: 'calc(100vh - 64px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-[var(--border-color)]">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-semibold text-[var(--bold-text)] font-inter">Notifications</h1>
            <div className="flex items-center justify-center gap-3 h-6">
              <label className="flex items-center justify-center gap-1 text-[var(--subtle-text)] text-xs font-medium font-inter">
                Hide Read
                <label className="relative w-9 h-5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hideRead}
                    onChange={(e) => setHideRead(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={cn(
                    "absolute top-0 left-0 right-0 bottom-0 rounded-[20px] transition-colors duration-200",
                    hideRead ? "bg-[var(--active-green)]" : "bg-[var(--gray-300)]"
                  )}>
                    <div className={cn(
                      "absolute h-4 w-4 bg-white rounded-full transition-transform duration-200",
                      "bottom-[2px]",
                      hideRead ? "left-[18px]" : "left-[2px]"
                    )} />
                  </div>
                </label>
              </label>
              
              <button
                onClick={markAllAsRead}
                className="p-2 rounded-md hover:bg-[var(--hover-bg)] transition-colors text-[var(--subtle-text)] hover:text-[var(--text-default)] flex items-center justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth={2}>
                  <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
                  <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
                  <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
                  <path d="M11 6l9 0" />
                  <path d="M11 12l9 0" />
                  <path d="M11 18l9 0" />
                </svg>
              </button>
              
              <button className="p-2 rounded-md hover:bg-[var(--hover-bg)] transition-colors text-[var(--subtle-text)] hover:text-[var(--text-default)] flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth={2}>
                  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065z" />
                  <path d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
                </svg>
              </button>
              
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-[var(--hover-bg)] transition-colors text-[var(--subtle-text)] hover:text-[var(--text-default)] flex items-center justify-center"
              >
                <svg className="w-5 h-5" viewBox="0 0 15 15" fill="none">
                  <path clipRule="evenodd" fillRule="evenodd" fill="currentColor" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { id: 'student', label: 'Student' },
              { id: 'vendor', label: 'Vendor' },
              { id: 'system', label: 'System' },
            ].map((category) => {
              const count = getCategoryCount(category.id);
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "px-3 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-200 font-inter",
                    activeCategory === category.id
                      ? "bg-[var(--active-green)] text-white"
                      : "text-[var(--subtle-text)] hover:bg-[var(--hover-bg)]"
                  )}
                >
                  {category.label}
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium font-inter",
                    activeCategory === category.id
                      ? "bg-[#3c825c] text-white"
                      : "bg-[var(--gray-200)] text-[var(--subtle-text)]"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="p-4 px-6 relative">
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-[var(--gray-400)]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Filter messages"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-lg border-2 border-transparent bg-[var(--gray-100)] focus:border-[var(--active-green)] focus:bg-[var(--surface-color)] transition-all duration-200 text-sm font-inter text-[var(--text-default)] placeholder:text-[var(--gray-400)]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-[var(--gray-300)] transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4" viewBox="0 0 15 15" fill="none">
                <path clipRule="evenodd" fillRule="evenodd" fill="currentColor" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" />
              </svg>
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 px-6 monitor-scrollbar" style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--gray-200) var(--gray-100)' }}>
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "flex gap-4 py-4 border-b border-[var(--border-color)] relative group last:border-b-0",
                notification.isRead && "opacity-70"
              )}
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
                <div className="text-sm text-[var(--text-default)] mb-1 pr-20 font-inter leading-[1.5]">
                  {notification.text}
                </div>
                {notification.content && (
                  <div className="mb-2">
                    {notification.content}
                  </div>
                )}
                <div className="flex justify-between text-xs text-[var(--gray-500)] font-inter">
                  <span>{notification.date}</span>
                  <span>{notification.timeAgo}</span>
                </div>
              </div>

              {/* Indicators */}
              <div className="absolute right-0 top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
                {notification.isUnread && (
                  <div className="w-2 h-2 rounded-full bg-[var(--verification-blue)]" />
                )}
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="p-1 rounded-full hover:bg-[var(--hover-bg)] transition-colors text-[var(--gray-400)] hover:text-[var(--text-default)] flex items-center justify-center"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M149.61,85.71l-89.6,88a8,8,0,0,1-11.22,0L10.39,136a8,8,0,1,1,11.22-11.41L54.4,156.79l84-82.5a8,8,0,1,1,11.22,11.42Zm96.1-11.32a8,8,0,0,0-11.32-.1l-84,82.5-18.83-18.5a8,8,0,0,0-11.21,11.42l24.43,24a8,8,0,0,0,11.22,0l89.6-88A8,8,0,0,0,245.71,74.39Z" />
                  </svg>
                </button>
                <button
                  onClick={() => dismissNotification(notification.id)}
                  className="p-1 rounded-full hover:bg-[var(--hover-bg)] transition-colors text-[var(--gray-400)] hover:text-[var(--text-default)] flex items-center justify-center"
                >
                  <svg className="w-4 h-4" viewBox="0 0 15 15" fill="none">
                    <path clipRule="evenodd" fillRule="evenodd" fill="currentColor" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}; 