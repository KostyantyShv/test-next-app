'use client';

import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { cn } from '@/lib/utils';

interface ChangeItem {
  id: number;
  itemImage: string;
  itemTitle: string;
  oldValue: string;
  newValue: string;
  time: string;
  isNew: boolean;
  isRead: boolean;
}

interface MonitorProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}

export const Monitor: React.FC<MonitorProps> = ({
  isOpen,
  onClose,
  className,
  buttonRef,
}) => {
  const [arrowPosition, setArrowPosition] = useState<number>(24); // default right-6 = 24px
  const [panelRight, setPanelRight] = useState<number>(88); // default right position
  const [changesData, setChangesData] = useState<ChangeItem[]>([
    {
      id: 1,
      itemImage: 'https://i.ibb.co/8DRBhzTm/product5.jpg',
      itemTitle: 'The Complete Guide to Machine Learning',
      oldValue: '$39.99',
      newValue: '$29.99',
      time: '5 min ago',
      isNew: true,
      isRead: false
    },
    {
      id: 2,
      itemImage: 'https://i.ibb.co/23PtGQWJ/product55.jpg',
      itemTitle: 'JavaScript: The Definitive Guide',
      oldValue: '52 units',
      newValue: '47 units',
      time: '12 min ago',
      isNew: false,
      isRead: false
    },
    {
      id: 3,
      itemImage: 'https://i.ibb.co/8DRBhzTm/product5.jpg',
      itemTitle: 'Advanced Analytics Dashboard',
      oldValue: '4.7',
      newValue: '4.8',
      time: '1 hour ago',
      isNew: false,
      isRead: false
    },
    {
      id: 4,
      itemImage: 'https://i.ibb.co/23PtGQWJ/product55.jpg',
      itemTitle: 'Python Programming Masterclass',
      oldValue: '$24.99',
      newValue: '$22.99',
      time: '2 hours ago',
      isNew: false,
      isRead: true
    },
    {
      id: 5,
      itemImage: 'https://i.ibb.co/8DRBhzTm/product5.jpg',
      itemTitle: 'React Development Course',
      oldValue: '0 units',
      newValue: '25 units',
      time: '3 hours ago',
      isNew: false,
      isRead: false
    }
  ]);

  const [hideRead, setHideRead] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    // Перевіряємо, чи клік не на модалці
    if (modalRef.current && !modalRef.current.contains(target as Node)) {
      // Перевіряємо, чи клік на backdrop або поза модалкою (але не на header)
      if (!target.closest('header')) {
        onClose();
      }
    }
  }, [onClose]);

  // Calculate arrow position and panel position based on button position
  useLayoutEffect(() => {
    if (isOpen && buttonRef?.current) {
      const updateArrowPosition = () => {
        const button = buttonRef.current;
        if (button) {
          const buttonRect = button.getBoundingClientRect();
          const buttonCenterX = buttonRect.left + buttonRect.width / 2;
          const windowWidth = window.innerWidth;
          const panelWidth = 440; // w-[440px]
          
          // Calculate panel position: align arrow (at arrowPosition from right) with button center
          // We want: windowWidth - panelRight - arrowPosition = buttonCenterX
          // So: panelRight = windowWidth - buttonCenterX - arrowPosition
          // But we need to determine arrowPosition first
          // Let's use a target arrow position (e.g., 24px from right) and calculate panel position
          const targetArrowPosition = 24; // Default arrow position from right
          const calculatedRight = windowWidth - buttonCenterX - targetArrowPosition;
          
          // Ensure panel doesn't go off screen (min 24px from right, max to keep panel on screen)
          const minRight = 24;
          const maxRight = windowWidth - panelWidth - 24;
          const finalRight = Math.max(minRight, Math.min(maxRight, calculatedRight));
          setPanelRight(finalRight);
          
          // Calculate arrow position based on final panel position
          // Panel right edge is at: windowWidth - finalRight
          // Arrow is at: windowWidth - finalRight - arrowPosition
          // We want arrow center to align with button center: windowWidth - finalRight - arrowPosition = buttonCenterX
          // So: arrowPosition = windowWidth - finalRight - buttonCenterX
          const modalRight = windowWidth - finalRight;
          const distanceFromRight = modalRight - buttonCenterX;
          // Arrow is 16px wide (w-4), so center it
          setArrowPosition(distanceFromRight - 8); // 8px = half of 16px
        }
      };
      updateArrowPosition();
      window.addEventListener('resize', updateArrowPosition);
      window.addEventListener('scroll', updateArrowPosition, true);
      return () => {
        window.removeEventListener('resize', updateArrowPosition);
        window.removeEventListener('scroll', updateArrowPosition, true);
      };
    }
  }, [isOpen, buttonRef]);

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
        console.warn('Error removing event listener:', error);
      }
    };
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const markAsRead = (changeId: number) => {
    setChangesData(prev => 
      prev.map(change => 
        change.id === changeId 
          ? { ...change, isRead: true, isNew: false }
          : change
      )
    );
  };

  const dismissChange = (changeId: number) => {
    setChangesData(prev => prev.filter(change => change.id !== changeId));
  };

  const markAllAsRead = () => {
    setChangesData(prev => 
      prev.map(change => ({ ...change, isRead: true, isNew: false }))
    );
  };

  const unreadCount = changesData.filter(change => !change.isRead).length;
  const filteredChanges = hideRead ? changesData.filter(change => !change.isRead) : changesData;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1001]">
      {/* Backdrop */}
      <div 
        className="absolute top-[75px] left-0 right-0 bottom-0 cursor-pointer" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
        onClick={onClose}
      />
      
      {/* Monitor Modal */}
      <div 
        ref={modalRef}
        className={cn(
          "absolute top-[72px] right-0 w-[440px] bg-[var(--surface-color)] rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.15)] border border-[var(--border-color)]",
          "opacity-0 visibility-hidden transform -translate-y-2.5 transition-all duration-300 ease-out",
          "z-[1000]",
          isOpen && "opacity-100 visibility-visible transform translate-y-0",
          className
        )}
        style={{
          backgroundColor: 'var(--surface-color) !important',
          position: 'fixed',
          top: '72px',
          right: `${panelRight}px`,
        }}
      >
        {/* Arrow pointer */}
        <div 
          className="absolute -top-2 w-4 h-4 bg-[var(--surface-color)] border border-[var(--border-color)] border-b-0 border-r-0 transform rotate-45" 
          style={{ right: `${arrowPosition}px` }}
        />
        
        {/* Modal Header */}
        <div className="p-5 pb-4 border-b border-[var(--border-color)]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-base font-semibold text-[var(--header-green)] font-inter">
              <svg className="w-[18px] h-[18px] text-[var(--header-green)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
              Recent Changes
            </div>
            <div className="flex items-center gap-3 h-6">
              <label className="flex items-center gap-2 text-[var(--subtle-text)] text-xs font-medium font-inter">
                Hide Read
                <label className="relative w-7 h-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hideRead}
                    onChange={(e) => setHideRead(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={cn(
                    "absolute top-0 left-0 right-0 bottom-0 rounded-2xl transition-colors duration-200",
                    hideRead ? "bg-[var(--active-green)]" : "bg-[var(--gray-300)]"
                  )}>
                    <div className={cn(
                      "absolute h-3 w-3 bg-white rounded-full transition-transform duration-200",
                      "top-[2px]",
                      hideRead ? "left-[14px]" : "left-[2px]"
                    )} />
                  </div>
                </label>
              </label>
              
              <button
                onClick={markAllAsRead}
                className="p-1 rounded bg-transparent border-none cursor-pointer transition-all text-[var(--subtle-text)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-default)] flex items-center justify-center"
                title="Mark All Read"
              >
                <svg className="w-4 h-4" stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth={2}>
                  <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
                  <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
                  <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
                  <path d="M11 6l9 0" />
                  <path d="M11 12l9 0" />
                  <path d="M11 18l9 0" />
                </svg>
              </button>
              
              <button className="p-1 rounded bg-transparent border-none cursor-pointer transition-all text-[var(--subtle-text)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-default)] flex items-center justify-center" title="Settings">
                <svg className="w-4 h-4" stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth={2}>
                  <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                  <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Changes List */}
        <div 
          className="max-h-[320px] overflow-y-auto monitor-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--gray-200) var(--gray-100)',
          }}
        >
          {filteredChanges.length === 0 ? (
            <div className="p-10 text-center text-[var(--subtle-text)]">
              <svg className="w-12 h-12 mx-auto mb-3 text-[var(--subtle-text)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-[var(--subtle-text)] font-inter">No recent changes</div>
            </div>
          ) : (
            filteredChanges.map((change) => (
              <div 
                key={change.id} 
                className={cn(
                  "flex items-start gap-3 py-4 px-5 border-b border-[var(--border-color)] transition-colors hover:bg-[var(--hover-bg)] relative group last:border-b-0",
                  change.isRead && "opacity-70",
                  change.isNew && "animate-[slideIn_0.3s_ease-out]"
                )}
              >
                <img 
                  src={change.itemImage} 
                  alt={change.itemTitle} 
                  className="w-10 h-10 rounded-md object-cover flex-shrink-0 border border-[var(--border-color)]"
                />
                <div className="flex-1 min-w-0 pr-[60px]">
                  <div className="text-sm font-semibold text-[var(--bold-text)] mb-2 max-w-[265px] overflow-hidden text-ellipsis whitespace-nowrap font-inter leading-[1.4]" title={change.itemTitle}>
                    {change.itemTitle}
                  </div>
                  <div className="flex items-center gap-2 text-[13px] mb-1 font-inter">
                    <span className="text-[var(--subtle-text)] line-through font-medium">{change.oldValue}</span>
                    <span className="text-[var(--subtle-text)] font-medium">→</span>
                    <span className="text-[var(--bold-text)] font-semibold">{change.newValue}</span>
                  </div>
                </div>
                
                {/* Monitor Indicators */}
                <div className="absolute right-5 top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5">
                  {!change.isRead && (
                    <div className="w-2 h-2 rounded-full bg-[var(--verification-blue)]" />
                  )}
                  <button
                    onClick={() => markAsRead(change.id)}
                    className="p-1 rounded-full bg-transparent border-none cursor-pointer transition-all text-[var(--gray-400)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-default)] flex items-center justify-center"
                    title="Mark as read"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M149.61,85.71l-89.6,88a8,8,0,0,1-11.22,0L10.39,136a8,8,0,1,1,11.22-11.41L54.4,156.79l84-82.5a8,8,0,1,1,11.22,11.42Zm96.1-11.32a8,8,0,0,0-11.32-.1l-84,82.5-18.83-18.5a8,8,0,0,0-11.21,11.42l24.43,24a8,8,0,0,0,11.22,0l89.6-88A8,8,0,0,0,245.71,74.39Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => dismissChange(change.id)}
                    className="p-1 rounded-full bg-transparent border-none cursor-pointer transition-all text-[var(--gray-400)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-default)] flex items-center justify-center"
                    title="Dismiss notification"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 15 15" fill="none">
                      <path clipRule="evenodd" fillRule="evenodd" fill="currentColor" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" />
                    </svg>
                  </button>
                </div>
                
                {/* Change Time */}
                <div className="absolute top-10 right-5 text-[11px] text-[var(--subtle-text)] font-medium font-inter">
                  {change.time}
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="p-5 bg-[var(--surface-secondary)] border-t border-[var(--border-color)] rounded-b-xl">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--subtle-text)] font-inter">Total Unread Changes:</span>
            <span className="text-base font-semibold text-[var(--bold-text)] font-inter">{unreadCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
