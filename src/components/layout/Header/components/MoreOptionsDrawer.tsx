'use client';

import { FC, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Portal } from '@/components/ui/Portal';

interface MoreOptionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MoreOptionsDrawer: FC<MoreOptionsDrawerProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();

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

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    onClose();
  };

  return (
    <Portal containerId="mobile-drawers">
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-[2500] transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={cn(
          "fixed left-0 w-full max-h-[85%] bg-white rounded-t-[20px] z-[3000] transition-all duration-300 md:hidden",
          "flex flex-col shadow-[0_-2px_10px_rgba(0,0,0,0.1)]",
          isOpen ? "bottom-0" : "-bottom-full"
        )}
      >
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-center relative border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">More Options</h3>
          <button 
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 pb-8">
          <div className="flex flex-col gap-3">
            {/* Join Button */}
            <button 
              onClick={onClose}
              className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="w-11 h-11 bg-black rounded-[10px] flex items-center justify-center flex-shrink-0">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-white">
                  <g>
                    <path d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.329-1.658-.329-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm8.999-8.921c-3.264 0-6.816 2.358-7 8.977L9.471 21h4.528v-2h-2.438c.367-3.781 2.17-6.004 4.938-6.004 1.089 0 2.022.356 2.784 1.004h2.632c-1.376-2.136-3.446-3.004-5.415-3.004zm0-.996c-.799 0-1.527-.279-2.116-.73C13.548 8.63 13 7.632 13 6.5 13 4.57 14.567 3 16.5 3S20 4.57 20 6.5c0 1.132-.548 2.13-1.384 2.77-.589.451-1.317.73-2.116.73zM15 6.5c0 .827.673 1.5 1.5 1.5S18 7.327 18 6.5 17.327 5 16.5 5 15 5.673 15 6.5zm-11 0C4 4.57 5.567 3 7.5 3S11 4.57 11 6.5 9.433 10 7.5 10 4 8.43 4 6.5zm2 0C6 7.327 6.673 8 7.5 8S9 7.327 9 6.5 8.327 5 7.5 5 6 5.673 6 6.5zM21 21h3v-2h-3v-3h-2v3h-3v2h3v3h2v-3z" />
                  </g>
                </svg>
              </div>
              <div className="flex-1 ml-4 text-left">
                <div className="text-base font-semibold text-gray-900">Join</div>
                <div className="text-sm text-gray-600">Join the platform</div>
              </div>
            </button>

            {/* Cart Button */}
            <button 
              onClick={onClose}
              className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="w-11 h-11 bg-[#E8F3FF] rounded-[10px] flex items-center justify-center flex-shrink-0 relative">
                <svg fill="none" viewBox="0 0 24 24" className="w-6 h-6 text-[#1D77BD]">
                  <path fill="currentColor" d="M22.5 16.14L23.92 6l-18.8-.81L4.92 4A4.43 4.43 0 002.51.8L.58 0 0 1.39l1.88.78a2.88 2.88 0 011.56 2.11l2.5 14.86a2.54 2.54 0 103.57 3h5.93a2.54 2.54 0 100-1.5H9.52a2.53 2.53 0 00-2.1-1.79l-.31-1.83 15.39-.88zm-4.65 4.21a1 1 0 11-.1 1.997 1 1 0 01.1-1.997zm4.36-12.92l-1 7.29-14.33.84-1.51-8.85 16.84.72zM8.14 21.4a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-[#ef4444] text-white rounded-full w-[18px] h-[18px] flex items-center justify-center text-[11px] font-semibold border-2 border-white">3</span>
              </div>
              <div className="flex-1 ml-4 text-left">
                <div className="text-base font-semibold text-gray-900">Shopping Cart</div>
                <div className="text-sm text-gray-600">3 items in cart</div>
              </div>
            </button>

            {/* Theme Button */}
            <button 
              onClick={handleThemeToggle}
              className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="w-11 h-11 bg-[#EBFCF4] rounded-[10px] flex items-center justify-center flex-shrink-0">
                <svg fill="none" viewBox="0 0 20 20" className="w-6 h-6 text-[#016853]">
                  <g clipPath="url(#clip0_1607_78670)">
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M9.9999 2.49983C10.1099 2.49983 10.2191 2.49983 10.3274 2.49983C9.25685 3.49459 8.56872 4.83303 8.38264 6.28251C8.19656 7.732 8.52428 9.20086 9.30885 10.4338C10.0934 11.6667 11.2852 12.5857 12.6771 13.0311C14.0689 13.4764 15.5728 13.42 16.9274 12.8715C16.4063 14.1252 15.5547 15.214 14.4634 16.0217C13.3721 16.8294 12.0819 17.3257 10.7307 17.4577C9.37938 17.5896 8.01762 17.3523 6.79064 16.771C5.56366 16.1897 4.51749 15.2862 3.76372 14.157C3.00995 13.0277 2.57686 11.7151 2.51064 10.359C2.44442 9.00288 2.74755 7.65424 3.38771 6.45693C4.02787 5.25961 4.98103 4.25852 6.14554 3.56044C7.31004 2.86237 8.64219 2.49349 9.9999 2.49316V2.49983Z" />
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M14.1667 3.33301C14.1667 3.77504 14.3423 4.19896 14.6548 4.51152C14.9674 4.82408 15.3913 4.99967 15.8333 4.99967C15.3913 4.99967 14.9674 5.17527 14.6548 5.48783C14.3423 5.80039 14.1667 6.22431 14.1667 6.66634C14.1667 6.22431 13.9911 5.80039 13.6785 5.48783C13.366 5.17527 12.942 4.99967 12.5 4.99967C12.942 4.99967 13.366 4.82408 13.6785 4.51152C13.9911 4.19896 14.1667 3.77504 14.1667 3.33301Z" />
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M15.8333 9.16634H17.4999M16.6666 8.33301V9.99967" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1607_78670">
                      <rect fill="white" height="20" width="20" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex-1 ml-4 text-left">
                <div className="text-base font-semibold text-gray-900">Theme</div>
                <div className="text-sm text-gray-600">Switch appearance</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

