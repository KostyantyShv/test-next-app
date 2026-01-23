'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Portal } from '@/components/ui/Portal';

interface Notification {
  id: string;
  category: 'student' | 'vendor' | 'system';
  avatar: string;
  text: React.ReactNode;
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
    text: (
      <>
        <strong>You</strong> earned a new badge <a href="#" className="text-[#346DC2] underline font-semibold">Active Member</a>
      </>
    ),
    content: (
      <div className="bg-[var(--apply-button-bg)] p-3 rounded-lg border-l-[3px] border-[var(--grade-badge)] flex items-center gap-3" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <div className="w-8 h-8 bg-[var(--grade-badge)] rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">★</div>
        <div>
          <div className="text-[var(--text-default)]" style={{ fontWeight: 600, fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>Active Member</div>
          <div className="text-[var(--gray-500)]" style={{ fontSize: '0.75rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>You wrote your first review!</div>
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
    text: (
      <>
        <strong>Jane D.</strong> just reviewed <a href="#" className="text-[#346DC2] underline font-semibold">Stanford University</a>
      </>
    ),
    content: (
      <div className="bg-[var(--apply-button-bg)] p-3 rounded-lg border-l-[3px] border-[var(--success-green)]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <div className="flex items-center gap-1 text-[#F59E0B] mb-2" style={{ fontWeight: 600, fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
          <span>★★★★★</span>
          <span>5</span>
        </div>
        <div className="text-[var(--text-default)] mt-2" style={{ fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>&quot;The campus is absolutely beautiful and the comp-sci program is top-notch...&quot;</div>
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
    text: (
      <>
        <strong>Application Deadline Reminder:</strong> The deadline for <a href="#" className="text-[#346DC2] underline font-semibold">Duke University</a> is approaching
      </>
    ),
    content: (
      <div className="bg-[#FEF3E2] p-3 rounded-lg border-l-[3px] border-[#F59E0B]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <div className="text-[var(--text-default)]" style={{ fontWeight: 600, fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>⚠️ 7 days remaining</div>
        <div className="mt-1 text-[var(--text-default)]" style={{ fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>Deadline: January 2, 2025 at 11:59 PM</div>
      </div>
    ),
    date: 'Friday, Dec 23, 2024',
    timeAgo: '3 hours ago',
    isUnread: true,
    isRead: false,
  },
  {
    id: '4',
    category: 'student',
    avatar: 'https://i.ibb.co/sphq90p/AVATAR-couponcodefinder.jpg',
    text: (
      <>
        <a href="#" className="text-[#346DC2] underline font-semibold">New York University</a> just updated its profile
      </>
    ),
    content: (
      <div className="bg-[var(--apply-button-bg)] p-3 rounded-lg border-l-[3px] border-[var(--success-green)]" style={{ fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        Added a new &quot;Data Science&quot; program and updated application deadlines.
      </div>
    ),
    date: 'Friday, Dec 23, 2024',
    timeAgo: '4 hours ago',
    isUnread: true,
    isRead: false,
  },
  {
    id: '5',
    category: 'student',
    avatar: 'https://i.ibb.co/GvKRBQY/AVATAR-github-com-biowaffeln.png',
    text: (
      <>
        Your review for <a href="#" className="text-[#346DC2] underline font-semibold">Princeton University</a> has been published
      </>
    ),
    content: (
      <div className="bg-[var(--gray-100)] flex items-center gap-3 p-3 rounded-lg" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <Image
          src="https://i.ibb.co/BHcDXgQ/product5.webp"
          alt="Princeton University"
          width={48}
          height={48}
          className="rounded object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="text-[var(--bold-text)] mb-1" style={{ fontWeight: 600, fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>Princeton University</div>
          <div className="text-[var(--gray-500)]" style={{ fontSize: '0.75rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>by Princeton Admin</div>
        </div>
      </div>
    ),
    date: 'Friday, Dec 23, 2024',
    timeAgo: '5 hours ago',
    isUnread: true,
    isRead: false,
  },
  {
    id: '6',
    category: 'student',
    avatar: 'https://i.ibb.co/spz3sVG/AVATAR-Hannah-Seligson.png',
    text: (
      <>
        Because you&apos;re interested in <strong>UCLA</strong>, you might like <a href="#" className="text-[#346DC2] underline font-semibold">USC</a>
      </>
    ),
    content: (
      <div className="bg-[var(--gray-100)] flex items-center gap-3 p-3 rounded-lg" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <Image
          src="https://i.ibb.co/5NTkykV/product3.jpg"
          alt="USC"
          width={48}
          height={48}
          className="rounded object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="text-[var(--bold-text)] mb-1" style={{ fontWeight: 600, fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>University of Southern California</div>
          <div className="text-[var(--gray-500)]" style={{ fontSize: '0.75rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>by USC Admin</div>
        </div>
      </div>
    ),
    date: 'Friday, Dec 23, 2024',
    timeAgo: '6 hours ago',
    isUnread: true,
    isRead: false,
  },
  {
    id: '7',
    category: 'student',
    avatar: 'https://i.ibb.co/fGQ8pG7/AVATAR-nightcafe.jpg',
    text: (
      <>
        <strong>Chris P.</strong> found your review of <a href="#" className="text-[#346DC2] underline font-semibold">Cornell University</a> helpful
      </>
    ),
    content: (
      <div className="bg-[var(--gray-100)] flex items-center gap-3 p-3 rounded-lg" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <Image
          src="https://i.ibb.co/XkdtT1Y/product2.png"
          alt="Cornell University"
          width={48}
          height={48}
          className="rounded object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="text-[var(--bold-text)] mb-1" style={{ fontWeight: 600, fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>Cornell University</div>
          <div className="text-[var(--gray-500)]" style={{ fontSize: '0.75rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>by Cornell Admin</div>
        </div>
      </div>
    ),
    date: 'Friday, Dec 23, 2024',
    timeAgo: '8 hours ago',
    isUnread: true,
    isRead: false,
  },
  {
    id: '8',
    category: 'vendor',
    avatar: 'https://i.ibb.co/LXWbBrR/AVATAR-midtone-ux-instrgram.jpg',
    text: (
      <>
        <strong>Reviewer123</strong> left a new review for <a href="#" className="text-[#346DC2] underline font-semibold">Your School Name</a>
      </>
    ),
    content: (
      <div className="bg-[var(--gray-100)] rounded-lg overflow-hidden" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <div className="flex items-center gap-3 p-3">
          <Image
            src="https://i.ibb.co/60MjrnY/product1.webp"
            alt="Your School Name"
            width={48}
            height={48}
            className="rounded object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="text-[var(--bold-text)] mb-1" style={{ fontWeight: 600, fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>Your School Name</div>
            <div className="text-[var(--gray-500)]" style={{ fontSize: '0.75rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>by School Admin</div>
          </div>
        </div>
        <div className="p-3 border-t border-[var(--gray-300)] bg-[rgba(255,255,255,0.5)]">
          <div className="flex items-center gap-1 text-[#F59E0B] mb-2" style={{ fontWeight: 600, fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            <span>★★☆☆☆</span>
            <span>2</span>
          </div>
          <div style={{ fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>&quot;The financial aid office was not very helpful, and navigating the bureaucracy was a nightmare...&quot;</div>
        </div>
      </div>
    ),
    date: 'Friday, Dec 23, 2024',
    timeAgo: '1 hour ago',
    isUnread: true,
    isRead: false,
  },
  {
    id: '9',
    category: 'vendor',
    avatar: 'https://i.ibb.co/q3gjNwF/AVATAR-Kostis-Kapelonis.png',
    text: (
      <>
        A review on your <a href="#" className="text-[#346DC2] underline font-semibold">Your School Name</a> page was flagged for moderation
      </>
    ),
    content: (
      <div className="bg-[#FEF2F2] p-3 rounded-lg border-l-[3px] border-[#EF4444]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <div className="text-[var(--text-default)] mb-1" style={{ fontWeight: 600, fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>🚨 Report Reason: Hate Speech</div>
        <div className="mt-1 text-[var(--text-default)]" style={{ fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>Our moderation team will review it shortly.</div>
      </div>
    ),
    date: 'Friday, Dec 23, 2024',
    timeAgo: '3 hours ago',
    isUnread: true,
    isRead: false,
  },
  {
    id: '10',
    category: 'vendor',
    avatar: 'https://i.ibb.co/gLtx1DB/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg',
    text: (
      <>
        <strong>FutureStudent25</strong> just followed <a href="#" className="text-[#346DC2] underline font-semibold">Your School Name</a>
      </>
    ),
    date: 'Friday, Dec 23, 2024',
    timeAgo: '5 hours ago',
    isUnread: true,
    isRead: false,
  },
  {
    id: '11',
    category: 'system',
    avatar: 'https://i.ibb.co/sphq90p/AVATAR-couponcodefinder.jpg',
    text: (
      <>
        <strong>Security Alert:</strong> We detected a new login to your account
      </>
    ),
    content: (
      <div className="bg-[#FEF2F2] p-3 rounded-lg border-l-[3px] border-[#EF4444]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <div className="text-[var(--text-default)] mb-1" style={{ fontWeight: 600, fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>📱 Chrome on Windows</div>
        <div className="mt-1 text-[var(--text-default)]" style={{ fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>Location: Brooklyn, NY • IP: 192.168.1.1</div>
      </div>
    ),
    date: 'Friday, Dec 23, 2024',
    timeAgo: '2 hours ago',
    isUnread: true,
    isRead: false,
  },
  {
    id: '12',
    category: 'system',
    avatar: 'https://i.ibb.co/GvKRBQY/AVATAR-github-com-biowaffeln.png',
    text: (
      <>
        <strong>Security Alert:</strong> Your password has been successfully changed
      </>
    ),
    content: (
      <div className="bg-[#FEF2F2] p-3 rounded-lg border-l-[3px] border-[#EF4444]" style={{ fontSize: '0.875rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        If you did not make this change, please contact support immediately.
      </div>
    ),
    date: 'Friday, Dec 23, 2024',
    timeAgo: '6 hours ago',
    isUnread: true,
    isRead: false,
  },
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
    const searchWords = searchTerm.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    let matchesSearch = true;
    
    if (searchWords.length > 0) {
      let textContent = '';
      if (typeof notification.text === 'string') {
        textContent = notification.text;
      } else if (React.isValidElement(notification.text)) {
        const element = notification.text as React.ReactElement;
        if (element.props && typeof element.props === 'object' && 'children' in element.props) {
          textContent = String(element.props.children || '');
        }
      }
      const fullContent = textContent.toLowerCase();
      matchesSearch = searchWords.every(word => fullContent.includes(word));
    }
    
    const matchesReadFilter = !hideRead || !notification.isRead;
    
    return matchesCategory && matchesSearch && matchesReadFilter;
  });

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

  return (
    <Portal containerId="notifications-panel-portal">
      <div className="fixed inset-0 z-[1001] md:hidden pointer-events-none">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 cursor-pointer pointer-events-auto" 
          onClick={onClose}
          data-backdrop="notifications-mobile"
        />
        
        {/* Mobile Panel - Side Panel */}
        <div 
          ref={panelRef}
          className={cn(
            "fixed top-0 right-0 w-full max-w-[400px] bg-white shadow-2xl flex flex-col pointer-events-auto",
            "transform transition-transform duration-300 ease-in-out",
            "border-l border-[var(--gray-300)]",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
          style={{
            backgroundColor: 'white',
            boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.1)',
            top: '0',
            height: '100vh',
            minHeight: '100vh',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-4 pt-6 pb-4 border-b border-[var(--gray-300)]">
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-[var(--bold-text)]" style={{ fontSize: '1.5rem', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>Notifications</h1>
              <div className="flex items-center gap-2 h-6">
                <label className="flex items-center gap-3 text-[var(--subtle-text)]" style={{ fontSize: '0.7rem', fontWeight: 500, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  Hide Read
                  <label className="relative w-9 h-5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hideRead}
                      onChange={(e) => setHideRead(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={cn(
                      "absolute top-0 left-0 right-0 bottom-0 rounded-[20px] transition-colors duration-400",
                      hideRead ? "bg-[var(--active-green)]" : "bg-[var(--gray-300)]"
                    )}>
                      <div className={cn(
                        "absolute h-4 w-4 bg-white rounded-full transition-transform duration-400",
                        "bottom-[2px] left-[2px]",
                        hideRead && "transform translate-x-4"
                      )} />
                    </div>
                  </label>
                </label>
                
                <button
                  onClick={markAllAsRead}
                  className="p-2 rounded-md hover:bg-[var(--hover-bg)] transition-colors text-[var(--subtle-text)] hover:text-[var(--text-default)] flex items-center justify-center"
                  style={{ padding: '0.5rem' }}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinejoin="round" strokeLinecap="round" strokeWidth={2}>
                    <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
                    <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
                    <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
                    <path d="M11 6l9 0" />
                    <path d="M11 12l9 0" />
                    <path d="M11 18l9 0" />
                  </svg>
                </button>
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-[var(--hover-bg)] transition-colors text-[var(--subtle-text)] hover:text-[var(--text-default)] flex items-center justify-center close-icon"
                  style={{ padding: '0.5rem' }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 15 15" fill="none">
                    <path clipRule="evenodd" fillRule="evenodd" fill="currentColor" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="relative flex items-center overflow-hidden">
              <div 
                className="flex gap-2 overflow-x-scroll scrollbar-hide pr-4 -mr-4"
                style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
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
                        "px-3 py-2 rounded-[20px] flex items-center gap-2 transition-all duration-200 whitespace-nowrap",
                        activeCategory === category.id
                          ? "bg-[var(--active-green)] text-white"
                          : "text-[var(--subtle-text)] hover:bg-[var(--hover-bg)]"
                      )}
                      style={{ fontSize: '0.875rem', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                    >
                      {category.label}
                      <span className={cn(
                        "px-2 py-0.5 rounded-xl",
                        activeCategory === category.id
                          ? "bg-[rgba(255,255,255,0.2)] text-white"
                          : "bg-[var(--gray-200)] text-[var(--subtle-text)]"
                      )}
                      style={{ fontSize: '0.75rem', fontWeight: 500, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="px-4 py-4 relative">
            <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-[var(--gray-400)]">
              <svg className="w-4 h-4" viewBox="1 1 60 60" fill="currentColor">
                <path d="M27.765 42.244c-8.614 0-15.622-7.008-15.622-15.622S19.151 11 27.765 11s15.622 7.008 15.622 15.622-7.007 15.622-15.622 15.622zm0-28.398c-7.045 0-12.775 5.73-12.775 12.775s5.73 12.775 12.775 12.775 12.775-5.73 12.775-12.775-5.73-12.775-12.775-12.775z" />
                <path d="M34.869 39.146l4.014-3.738 9.286 9.114a3.164 3.164 0 01-.07 4.562l-.071.066a3.163 3.163 0 01-4.561-.257l-8.598-9.747zM27.77 34.173c-2.882 0-5.412-.876-7.656-2.526a1.002 1.002 0 01-.35-.81c.008-.461.445-.969 1.02-.959.284.005.493.153.713.308 1.837 1.302 3.832 1.971 6.275 1.971 1.875 0 4.492-.476 6.314-2.118a.98.98 0 01.638-.261.92.92 0 01.686.241c.222.209.33.527.336.735a1.02 1.02 0 01-.318.775c-1.333 1.237-4.262 2.644-7.658 2.644z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Filter messages"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-lg border-2 border-transparent bg-[var(--gray-100)] focus:border-[var(--active-green)] focus:bg-white focus:outline-none transition-all duration-200 text-[var(--text-default)] placeholder:text-[var(--gray-400)]"
              style={{ fontSize: '0.875rem', paddingLeft: '2.5rem', paddingRight: '2.5rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-[var(--gray-300)] transition-colors flex items-center justify-center"
                style={{ display: 'flex' }}
              >
                <svg className="w-4 h-4" viewBox="0 0 15 15" fill="none">
                  <path clipRule="evenodd" fillRule="evenodd" fill="currentColor" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" />
                </svg>
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto px-4 py-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--gray-200) var(--gray-100)' }}>
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                data-category={notification.category}
                className={cn(
                  "flex gap-4 py-4 border-b border-[var(--gray-300)] relative group last:border-b-0",
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
                  <div 
                    className="notification-text-content text-[var(--text-default)] mb-1 pr-20 leading-[1.5] break-words" 
                    style={{ 
                      fontSize: '0.875rem', 
                      lineHeight: 1.5, 
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' 
                    }}
                  >
                    {notification.text}
                  </div>
                  {notification.content && (
                    <div className="my-2">
                      {notification.content}
                    </div>
                  )}
                  <div className="flex justify-between text-[var(--gray-500)]" style={{ fontSize: '0.75rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                    <span>{notification.date}</span>
                    <span>{notification.timeAgo}</span>
                  </div>
                </div>

                {/* Indicators */}
                <div className="absolute right-0 top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
                  {notification.isUnread && !notification.isRead && (
                    <div className="w-2 h-2 rounded-full bg-[var(--verification-blue)]" style={{ width: '8px', height: '8px' }} />
                  )}
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-1 rounded-full hover:bg-[var(--hover-bg)] transition-colors text-[var(--gray-400)] hover:text-[var(--text-default)] flex items-center justify-center"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
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
    </Portal>
  );
};
