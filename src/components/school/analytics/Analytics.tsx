'use client';

import { FC, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navigationItems: NavItem[] = [
  { id: 'general', label: 'General', href: '#general' },
  { id: 'reviews', label: 'Reviews', href: '#reviews' },
  { id: 'spotlight', label: 'Spotlight', href: '#spotlight' },
  { id: 'case-studies', label: 'Case Studies', href: '#case-studies' },
  { id: 'forms', label: 'Forms', href: '#forms' },
  { id: 'offers', label: 'Offers', href: '#offers' },
  { id: 'checklist', label: 'Checklist', href: '#checklist' },
];

export const Analytics: FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [showPreviewMenu, setShowPreviewMenu] = useState(false);
  const tabNavRef = useRef<HTMLDivElement>(null);
  const activeTabRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const handleSave = () => {
    setSaveStatus('saving');
    setIsSaving(true);
    
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => {
        setSaveStatus('idle');
        setIsSaving(false);
      }, 2000);
    }, 1000);
  };

  const handleInfoClick = () => {
    window.open('https://example.com', '_blank');
  };

  const getSaveButtonText = () => {
    if (saveStatus === 'saving') return 'Saving...';
    if (saveStatus === 'saved') return 'Saved!';
    return 'Save';
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Auto-scroll active tab into view
  useEffect(() => {
    if (tabNavRef.current && activeTabRefs.current[activeTab]) {
      const activeTabElement = activeTabRefs.current[activeTab];
      const navElement = tabNavRef.current;
      
      if (activeTabElement) {
        const tabRect = activeTabElement.getBoundingClientRect();
        const navRect = navElement.getBoundingClientRect();
        const targetScroll = tabRect.left - navRect.left - (navRect.width - tabRect.width) / 2 + navElement.scrollLeft;
        
        navElement.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen">
      {/* Desktop Header */}
      <header className="hidden md:block bg-[#E1E7EE] px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 sticky top-0 z-[100]">
        <div className="max-w-[1147px] mx-auto bg-[#E1E7EE] pb-3 rounded-lg relative">
          {/* Bottom border with shadow */}
          <div className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]" />

          <div className="flex justify-between items-start gap-4">
            {/* Left Section - Listing Info */}
            <div className="flex gap-3 sm:gap-4 md:gap-6 items-start min-w-0">
              {/* Listing Image */}
              <div className="relative w-16 sm:w-20 md:w-[120px] h-10 sm:h-14 md:h-[80px] rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src="https://i.ibb.co/XkdtT1Yj/product2.png"
                  alt="Stanford University"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Listing Details */}
              <div className="flex flex-col h-10 sm:h-14 md:h-[80px] justify-between min-w-0 flex-1">
                {/* Title */}
                <h1 className="text-sm sm:text-base md:text-2xl font-semibold text-[#464646] flex items-center gap-1 sm:gap-2 tracking-[-0.01em] -mt-0.5 truncate">
                  Stanford University
                  <svg
                    onClick={handleInfoClick}
                    className="w-4 h-4 sm:w-4 md:w-5 md:h-5 opacity-60 cursor-pointer transition-opacity duration-200 hover:opacity-100 flex-shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 23a11 11 0 1 1 0-22 11 11 0 0 1 0 22m0-20a9 9 0 1 0 0 18 9 9 0 0 0 0-18m0 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2m-.09-4a1 1 0 0 1-.32-1.95c.6-.2 2.32-1 2.32-2.05A2 2 0 0 0 10 9.33a1 1 0 1 1-1.88-.66 4 4 0 0 1 3.767-2.656A4 4 0 0 1 15.89 10c0 2.64-3.31 3.82-3.68 3.95a1.3 1.3 0 0 1-.29.05z"
                      fill="currentColor"
                    />
                  </svg>
                </h1>

                {/* Navigation */}
                <nav className="hidden sm:flex gap-4 md:gap-8 -mb-2 overflow-x-auto">
                  {navigationItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleTabChange(item.id);
                      }}
                      className={cn(
                        'text-xs sm:text-sm md:text-[15px] font-medium pb-2 border-b-2 border-transparent transition-all duration-200 relative whitespace-nowrap',
                        activeTab === item.id
                          ? 'text-[#0B6333]'
                          : 'text-[#5F5F5F] hover:text-[#464646]'
                      )}
                    >
                      {item.label}
                      {activeTab === item.id && (
                        <span
                          className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#0B6333]"
                          style={{ clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 100%, 0 100%)' }}
                        />
                      )}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex gap-2 sm:gap-3 md:gap-4 items-start flex-shrink-0">
              {/* Preview Button with Dropdown */}
              <div className="relative hidden sm:block">
                <button
                  onMouseEnter={() => setShowPreviewMenu(true)}
                  onMouseLeave={() => setShowPreviewMenu(false)}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-[#e0e0e0] rounded-lg bg-white text-[#1B1B1B] text-xs sm:text-sm md:text-sm font-medium cursor-pointer transition-all duration-200 hover:border-[#ccc] hover:bg-[#f8f8f8]"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span className="hidden md:inline">Preview</span>
                  <svg
                    className="transition-transform"
                    height="14"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinejoin="round" strokeLinecap="round" />
                  </svg>
                </button>

                {/* Preview Dropdown */}
                {showPreviewMenu && (
                  <div
                    onMouseEnter={() => setShowPreviewMenu(true)}
                    onMouseLeave={() => setShowPreviewMenu(false)}
                    className="absolute top-[calc(100%+8px)] right-0 bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)] py-2 min-w-[200px] sm:min-w-[225px] z-10"
                  >
                    <div className="px-4 py-2 text-[#1B1B1B] text-sm flex items-center gap-3 cursor-pointer transition-colors hover:bg-[#f5f5f5]">
                      <svg viewBox="0 0 20 20" className="w-5 h-5">
                        <path
                          fill="#5F5F5F"
                          d="M4.16671 4.08331C4.14461 4.08331 4.12341 4.09209 4.10778 4.10772C4.09215 4.12335 4.08337 4.14455 4.08337 4.16665V5.91665H5.91671V4.08331H4.16671ZM4.16671 2.58331C3.74678 2.58331 3.34405 2.75013 3.04712 3.04706C2.75019 3.34399 2.58337 3.74672 2.58337 4.16665V15.8333C2.58337 16.2532 2.75019 16.656 3.04712 16.9529C3.34406 17.2498 3.74678 17.4166 4.16671 17.4166H15.8334C16.2533 17.4166 16.656 17.2498 16.953 16.9529C17.2499 16.656 17.4167 16.2532 17.4167 15.8333V4.16665C17.4167 3.74672 17.2499 3.34399 16.953 3.04706C16.656 2.75013 16.2533 2.58331 15.8334 2.58331H4.16671ZM7.41671 4.08331V5.91665H15.9167V4.16665C15.9167 4.14454 15.9079 4.12335 15.8923 4.10772C15.8767 4.09209 15.8555 4.08331 15.8334 4.08331H7.41671ZM15.9167 7.41665H4.08337V15.8333C4.08337 15.8554 4.09215 15.8766 4.10778 15.8922C4.12341 15.9079 4.1446 15.9166 4.16671 15.9166H15.8334C15.8555 15.9166 15.8767 15.9079 15.8923 15.8922C15.9079 15.8766 15.9167 15.8554 15.9167 15.8333V7.41665Z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                        <path
                          fill="#5F5F5F"
                          d="M7.6529 11.25C8.54057 12.2158 9.3248 12.5834 9.99996 12.5834C10.6751 12.5834 11.4593 12.2158 12.347 11.25C11.4593 10.2842 10.6751 9.91669 9.99996 9.91669C9.3248 9.91669 8.54057 10.2842 7.6529 11.25ZM9.99996 8.41669C11.4473 8.41669 12.7509 9.32129 13.919 10.7815C14.1381 11.0554 14.1381 11.4446 13.919 11.7185C12.7509 13.1787 11.4473 14.0834 9.99996 14.0834C8.55263 14.0834 7.24902 13.1787 6.08095 11.7185C5.86185 11.4446 5.86185 11.0554 6.08095 10.7815C7.24902 9.32129 8.55263 8.41669 9.99996 8.41669ZM9.24329 11.2502C9.24329 10.8359 9.57907 10.5002 9.99329 10.5002H9.99995C10.4142 10.5002 10.75 10.8359 10.75 11.2502C10.75 11.6644 10.4142 12.0002 9.99995 12.0002H9.99329C9.57907 12.0002 9.24329 11.6644 9.24329 11.2502Z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                      Preview Listing Page
                    </div>
                    <div className="px-4 py-2 text-[#1B1B1B] text-sm flex items-center gap-3 cursor-pointer transition-colors hover:bg-[#f5f5f5]">
                      <svg fill="none" viewBox="0 0 20 20" className="w-5 h-5">
                        <path
                          fill="#5F5F5F"
                          d="M5.00004 4.08331C4.75693 4.08331 4.52377 4.17989 4.35186 4.3518C4.17995 4.52371 4.08337 4.75686 4.08337 4.99998V6.66665C4.08337 7.08086 3.74759 7.41665 3.33337 7.41665C2.91916 7.41665 2.58337 7.08086 2.58337 6.66665V4.99998C2.58337 4.35904 2.83799 3.74435 3.2912 3.29114C3.74441 2.83793 4.3591 2.58331 5.00004 2.58331H6.66671C7.41671 2.58331 7.41671 2.9191 7.41671 3.33331C7.41671 3.74753 7.08092 4.08331 6.66671 4.08331H5.00004ZM12.5834 3.33331C12.5834 2.9191 12.9192 2.58331 13.3334 2.58331H15C15.641 2.58331 16.2557 2.83793 16.7089 3.29114C17.1621 3.74435 17.4167 4.35904 17.4167 4.99998V6.66665C17.4167 7.08086 17.0809 7.41665 16.6667 7.41665C16.2525 7.41665 15.9167 7.08086 15.9167 6.66665V4.99998C15.9167 4.75686 15.8201 4.52371 15.6482 4.3518C15.4763 4.17989 15.2432 4.08331 15 4.08331H13.3334C12.9192 4.08331 12.5834 3.74753 12.5834 3.33331ZM3.33337 12.5833C3.74759 12.5833 4.08337 12.9191 4.08337 13.3333V15C4.08337 15.2431 4.17995 15.4763 4.35186 15.6482C4.52377 15.8201 4.75693 15.9166 5.00004 15.9166H6.66671C7.08092 15.9166 7.41671 16.2524 7.41671 16.6666C7.41671 17.0809 7.08092 17.4166 6.66671 17.4166H5.00004C4.3591 17.4166 3.74441 17.162 3.2912 16.7088C2.83799 16.2556 2.58337 15.6409 2.58337 15V13.3333C2.58337 12.9191 2.91916 12.5833 3.33337 12.5833ZM16.6667 12.5833C17.0809 12.5833 17.4167 12.9191 17.4167 13.3333V15C17.4167 15.6409 17.1621 16.2556 16.7089 16.7088C16.2557 17.162 15.641 17.4166 15 17.4166H13.3334C12.9192 17.4166 12.5834 17.0809 12.5834 16.6666C12.5834 16.2524 12.9192 15.9166 13.3334 15.9166H15C15.2432 15.9166 15.4763 15.8201 15.6482 15.6482C15.8201 15.4763 15.9167 15.2431 15.9167 15V13.3333C15.9167 12.9191 16.2525 12.5833 16.6667 12.5833Z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                        <path
                          fill="#5F5F5F"
                          d="M7.63052 6.34733C7.86565 6.2142 8.15421 6.21784 8.38591 6.35686L13.3859 9.35686C13.6118 9.4924 13.75 9.73653 13.75 9.99998C13.75 10.2634 13.6118 10.5076 13.3859 10.6431L8.38591 13.6431C8.15421 13.7821 7.86565 13.7858 7.63052 13.6526C7.39538 13.5195 7.25004 13.2702 7.25004 13V6.99998C7.25004 6.72978 7.39538 6.48046 7.63052 6.34733ZM8.75004 8.32462V11.6753L11.5423 9.99998L8.75004 8.32462Z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                      Preview Details View
                    </div>
                  </div>
                )}
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-[#1a1a1a] text-white border-none rounded-lg text-xs sm:text-sm md:text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-[#333] disabled:opacity-70"
              >
                {getSaveButtonText()}
              </button>

              {/* More Button */}
              <button className="p-1.5 sm:p-2 bg-transparent border-none cursor-pointer text-[#5F5F5F] rounded-full transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#1B1B1B]">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden bg-white sticky top-0 z-[100] border-b border-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        {/* Listing Header */}
        <div className="p-2.5 sm:p-3 md:p-4 flex items-center gap-2 sm:gap-3">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src="https://i.ibb.co/XkdtT1Yj/product2.png"
              alt="Stanford University"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-sm sm:text-base font-semibold text-[#464646] flex items-center gap-1 truncate">
            Stanford University
            <svg
              onClick={handleInfoClick}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-60 cursor-pointer transition-opacity duration-200 ml-1 flex-shrink-0"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 23a11 11 0 1 1 0-22 11 11 0 0 1 0 22m0-20a9 9 0 1 0 0 18 9 9 0 0 0 0-18m0 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2m-.09-4a1 1 0 0 1-.32-1.95c.6-.2 2.32-1 2.32-2.05A2 2 0 0 0 10 9.33a1 1 0 1 1-1.88-.66 4 4 0 0 1 3.767-2.656A4 4 0 0 1 15.89 10c0 2.64-3.31 3.82-3.68 3.95a1.3 1.3 0 0 1-.29.05z"
                fill="currentColor"
              />
            </svg>
          </h1>
        </div>

        {/* Tab Navigation */}
        <nav 
          ref={tabNavRef}
          className="px-2.5 sm:px-3 md:px-4 overflow-x-auto whitespace-nowrap mb-2 scrollbar-hide scroll-smooth"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
        >
          <div className="inline-flex gap-4 sm:gap-6 pb-2 border-b border-transparent">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                ref={(el) => {
                  activeTabRefs.current[item.id] = el;
                }}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange(item.id);
                }}
                className={cn(
                  'text-xs sm:text-sm font-medium pb-2 relative cursor-pointer transition-colors duration-200 whitespace-nowrap flex-shrink-0',
                  activeTab === item.id
                    ? 'text-[#0B6333]'
                    : 'text-[#5F5F5F] hover:text-[#464646]'
                )}
              >
                {item.label}
                {activeTab === item.id && (
                  <span
                    className="absolute bottom-[-10px] left-0 w-full h-[2px] bg-[#0B6333]"
                    style={{ clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 100%, 0 100%)' }}
                  />
                )}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Content Area */}
      <div className="max-w-[1147px] mx-auto px-3 sm:px-4 md:px-8 py-3 sm:py-4 md:py-6">
        <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 shadow-sm">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#464646] mb-2 sm:mb-3 md:mb-4">
            Analytics Content - {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#5F5F5F]">
            This is where the {activeTab} analytics content will be displayed.
          </p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        nav {
          scroll-behavior: smooth;
        }
        nav > div {
          display: inline-flex;
          gap: 1rem;
        }
        @media (max-width: 640px) {
          nav > div {
            gap: 1rem;
          }
        }
        @media (min-width: 641px) and (max-width: 1023px) {
          nav > div {
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};
