'use client';

import { FC, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export const Actions: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDarkMode(newTheme === 'dark');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      {/* Filter Icon */}
      <button 
        className="relative w-11 h-11 border border-[#e9ecef] bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-[#4A4A4A] hover:bg-[#EBFCF4] hover:border-[#0B6333] hover:opacity-90"
        title="Filters"
      >
        <svg viewBox="0 0 512 512" className="w-5 h-5">
          <path d="M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2-32.5-40.5-56-76.3-56s-66.1 23.5-76.3 56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z" fill="currentColor"></path>
        </svg>
      </button>

      {/* Comparison Icon */}
      <button 
        className="relative w-11 h-11 border border-[#e9ecef] bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-[#4A4A4A] hover:bg-[#EBFCF4] hover:border-[#0B6333] hover:opacity-90"
        title="Compare Items"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none" className="w-5 h-5">
          <path d="M4.5 11.25L6 12.75L9.375 9.375M6 6V3.9C6 3.05992 6 2.63988 6.16349 2.31901C6.3073 2.03677 6.53677 1.8073 6.81901 1.66349C7.13988 1.5 7.55992 1.5 8.4 1.5H14.1C14.9401 1.5 15.3601 1.5 15.681 1.66349C15.9632 1.8073 16.1927 2.03677 16.3365 2.31901C16.5 2.63988 16.5 3.05992 16.5 3.9V9.6C16.5 10.4401 16.5 10.8601 16.3365 11.181C16.1927 11.4632 15.9632 11.6927 15.681 11.8365C15.3601 12 14.9401 12 14.1 12H12M3.9 16.5H9.6C10.4401 16.5 10.8601 16.5 11.181 16.3365C11.4632 16.1927 11.6927 15.9632 11.8365 15.681C12 15.3601 12 14.9401 12 14.1V8.4C12 7.55992 12 7.13988 11.8365 6.81901C11.6927 6.53677 11.4632 6.3073 11.181 6.16349C10.8601 6 10.4401 6 9.6 6H3.9C3.05992 6 2.63988 6 2.31901 6.16349C2.03677 6.3073 1.8073 6.53677 1.66349 6.81901C1.5 7.13988 1.5 7.55992 1.5 8.4V14.1C1.5 14.9401 1.5 15.3601 1.66349 15.681C1.8073 15.9632 2.03677 16.1927 2.31901 16.3365C2.63988 16.5 3.05992 16.5 3.9 16.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        <span className="absolute -top-1.5 -right-1.5 bg-[#1D77BD] text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-semibold border-2 border-white">2</span>
      </button>

      {/* Monitor Icon */}
      <button 
        className="relative w-11 h-11 border border-[#e9ecef] bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-[#4A4A4A] hover:bg-[#EBFCF4] hover:border-[#0B6333] hover:opacity-90"
        title="Monitor"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 10.74 21.78 9.54 21.38 8.44L19.92 9.9C20.37 10.56 20.62 11.27 20.62 12C20.62 16.76 16.76 20.62 12 20.62C7.24 20.62 3.38 16.76 3.38 12C3.38 7.24 7.24 3.38 12 3.38C13.81 3.38 15.48 3.92 16.84 4.85L18.25 3.43C16.57 2.45 14.4 2 12 2ZM19.95 5.5L16.2 9.25L14.75 7.8L18.5 4.05L19.95 5.5Z"></path>
          <path d="M6 2c.306 0 .582.187.696.471L10 10.731l1.304-3.26A.751.751 0 0 1 12 7h3.25a.75.75 0 0 1 0 1.5h-2.742l-1.812 4.528a.751.751 0 0 1-1.392 0L6 4.77 4.696 8.03A.75.75 0 0 1 4 8.5H.75a.75.75 0 0 1 0-1.5h2.742l1.812-4.529A.751.751 0 0 1 6 2Z" transform="translate(4 4)"></path>
        </svg>
      </button>

      {/* Notifications */}
      <button 
        className="relative w-11 h-11 border border-[#e9ecef] bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-[#4A4A4A] hover:bg-[#EBFCF4] hover:border-[#0B6333] hover:opacity-90"
        title="Notifications"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-black dark:fill-white">
          <path fill="currentColor" d="M7.52166 4.85499C8.70939 3.66726 10.3203 3 12 3C13.6797 3 15.2906 3.66726 16.4783 4.85499C17.6661 6.04272 18.3333 7.65363 18.3333 9.33333C18.3333 11.013 17.6661 12.6239 16.4783 13.8117C15.2906 14.9994 13.6797 15.6667 12 15.6667C10.3203 15.6667 8.70939 14.9994 7.52166 13.8117C6.33393 12.6239 5.66667 11.013 5.66667 9.33333C5.66667 7.65363 6.33393 6.04272 7.52166 4.85499ZM12 5C10.8507 5 9.74853 5.45655 8.93587 6.2692C8.12321 7.08186 7.66667 8.18406 7.66667 9.33333C7.66667 10.4826 8.12321 11.5848 8.93587 12.3975C9.74853 13.2101 10.8507 13.6667 12 13.6667C13.1493 13.6667 14.2515 13.2101 15.0641 12.3975C15.8768 11.5848 16.3333 10.4826 16.3333 9.33333C16.3333 8.18406 15.8768 7.08186 15.0641 6.2692C14.2515 5.45655 13.1493 5 12 5ZM20.3646 3.92514C20.5016 3.39011 21.0463 3.06744 21.5814 3.20443C22.9437 3.55324 24.1512 4.34554 25.0135 5.45642C25.8758 6.5673 26.3438 7.93357 26.3438 9.33984C26.3438 10.7461 25.8758 12.1124 25.0135 13.2233C24.1512 14.3341 22.9437 15.1265 21.5814 15.4753C21.0463 15.6122 20.5016 15.2896 20.3646 14.7545C20.2276 14.2195 20.5503 13.6747 21.0853 13.5378C22.0174 13.2991 22.8436 12.757 23.4336 11.9969C24.0236 11.2368 24.3438 10.302 24.3438 9.33984C24.3438 8.37766 24.0236 7.44284 23.4336 6.68276C22.8436 5.92269 22.0174 5.38059 21.0853 5.14193C20.5503 5.00494 20.2276 4.46016 20.3646 3.92514ZM9.33333 21C8.18406 21 7.08186 21.4565 6.2692 22.2692C5.45655 23.0819 5 24.1841 5 25.3333V28C5 28.5523 4.55228 29 4 29C3.44772 29 3 28.5523 3 28V25.3333C3 23.6536 3.66726 22.0427 4.85499 20.855C6.04272 19.6673 7.65363 19 9.33333 19H14.6667C16.1859 19 17.5807 19.5359 18.6722 20.4265C19.1001 20.7757 19.164 21.4056 18.8148 21.8335C18.4657 22.2614 17.8357 22.3253 17.4078 21.9761C16.6593 21.3654 15.7074 21 14.6667 21H9.33333Z" clipRule="evenodd" fillRule="evenodd"></path>
          <path fill="currentColor" d="M23.5859 18.5858C23.961 18.2107 24.4697 18 25.0001 18C25.5305 18 26.0392 18.2107 26.4143 18.5858C26.6314 18.8029 26.7934 19.0647 26.8914 19.3496C27.4303 19.6869 27.8933 20.1357 28.2482 20.6679C28.7012 21.3474 28.9607 22.1374 28.999 22.9531C28.9997 22.9687 29.0001 22.9844 29.0001 23V24.4293C29.0238 24.5668 29.076 24.698 29.1535 24.8144C29.2404 24.9446 29.3566 25.0527 29.4928 25.1298C29.888 25.3536 30.0828 25.8156 29.9671 26.2548C29.8514 26.694 29.4542 27 29.0001 27H27.4496C27.3523 27.4767 27.1171 27.9186 26.7679 28.2678C26.299 28.7366 25.6631 29 25.0001 29C24.3371 29 23.7012 28.7366 23.2323 28.2678C22.8831 27.9186 22.6479 27.4767 22.5506 27H21.0001C20.5459 27 20.1488 26.694 20.0331 26.2548C19.9174 25.8156 20.1121 25.3536 20.5073 25.1298C20.6436 25.0527 20.7598 24.9446 20.8466 24.8144C20.9242 24.698 20.9764 24.5668 21.0001 24.4293V23C21.0001 22.9844 21.0005 22.9687 21.0012 22.9531C21.0395 22.1374 21.299 21.3474 21.752 20.6679C22.1069 20.1357 22.5699 19.6869 23.1088 19.3496C23.2068 19.0647 23.3688 18.8029 23.5859 18.5858ZM22.9218 25C22.9535 24.8754 22.9773 24.7485 22.9928 24.6202C22.9977 24.5803 23.0001 24.5402 23.0001 24.5V23.0254C23.0248 22.5799 23.1684 22.1489 23.4161 21.7773C23.6678 21.3999 24.0174 21.098 24.4276 20.904C24.7771 20.7387 25.0001 20.3867 25.0001 20C25.0001 20.3867 25.223 20.7387 25.5726 20.904C25.9828 21.098 26.3324 21.3999 26.5841 21.7773C26.8318 22.1489 26.9753 22.5799 27.0001 23.0254V24.5C27.0001 24.5402 27.0025 24.5803 27.0073 24.6202C27.0229 24.7485 27.0466 24.8754 27.0784 25H22.9218Z" clipRule="evenodd"></path>
        </svg>
        <span className="absolute -top-1.5 -right-1.5 bg-[#e74c3c] text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-semibold border-2 border-white">5</span>
      </button>

      {/* Cart */}
      <button 
        className="relative w-11 h-11 border border-[#e9ecef] bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-[#4A4A4A] hover:bg-[#EBFCF4] hover:border-[#0B6333] hover:opacity-90"
        title="Shopping Cart"
      >
        <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5">
          <path fill="currentColor" d="M22.5 16.14L23.92 6l-18.8-.81L4.92 4A4.43 4.43 0 002.51.8L.58 0 0 1.39l1.88.78a2.88 2.88 0 011.56 2.11l2.5 14.86a2.54 2.54 0 103.57 3h5.93a2.54 2.54 0 100-1.5H9.52a2.53 2.53 0 00-2.1-1.79l-.31-1.83 15.39-.88zm-4.65 4.21a1 1 0 11-.1 1.997 1 1 0 01.1-1.997zm4.36-12.92l-1 7.29-14.33.84-1.51-8.85 16.84.72zM8.14 21.4a1 1 0 11-2 0 1 1 0 012 0z"></path>
        </svg>
        <span className="absolute -top-1.5 -right-1.5 bg-[#1D77BD] text-white rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-semibold border-2 border-white">3</span>
      </button>

      {/* Dark/Light Mode Toggle */}
      <button 
        onClick={toggleTheme}
        className="relative w-11 h-11 border border-[#e9ecef] bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-[#4A4A4A] hover:bg-[#EBFCF4] hover:border-[#0B6333] hover:opacity-90"
        title="Toggle Theme"
      >
        <svg fill="none" viewBox="0 0 20 20" className="fill-background w-5 h-5">
          <g clipPath="url(#clip0_1607_78670)">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="#4F4F4F" d="M9.9999 2.49983C10.1099 2.49983 10.2191 2.49983 10.3274 2.49983C9.25685 3.49459 8.56872 4.83303 8.38264 6.28251C8.19656 7.732 8.52428 9.20086 9.30885 10.4338C10.0934 11.6667 11.2852 12.5857 12.6771 13.0311C14.0689 13.4764 15.5728 13.42 16.9274 12.8715C16.4063 14.1252 15.5547 15.214 14.4634 16.0217C13.3721 16.8294 12.0819 17.3257 10.7307 17.4577C9.37938 17.5896 8.01762 17.3523 6.79064 16.771C5.56366 16.1897 4.51749 15.2862 3.76372 14.157C3.00995 13.0277 2.57686 11.7151 2.51064 10.359C2.44442 9.00288 2.74755 7.65424 3.38771 6.45693C4.02787 5.25961 4.98103 4.25852 6.14554 3.56044C7.31004 2.86237 8.64219 2.49349 9.9999 2.49316V2.49983Z"></path>
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="#4F4F4F" d="M14.1667 3.33301C14.1667 3.77504 14.3423 4.19896 14.6548 4.51152C14.9674 4.82408 15.3913 4.99967 15.8333 4.99967C15.3913 4.99967 14.9674 5.17527 14.6548 5.48783C14.3423 5.80039 14.1667 6.22431 14.1667 6.66634C14.1667 6.22431 13.9911 5.80039 13.6785 5.48783C13.366 5.17527 12.942 4.99967 12.5 4.99967C12.942 4.99967 13.366 4.82408 13.6785 4.51152C13.9911 4.19896 14.1667 3.77504 14.1667 3.33301Z"></path>
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="#4F4F4F" d="M15.8333 9.16634H17.4999M16.6666 8.33301V9.99967"></path>
          </g>
          <defs>
            <clipPath id="clip0_1607_78670">
              <rect fill="white" height="20" width="20"></rect>
            </clipPath>
          </defs>
        </svg>
      </button>

      {/* AI Panel */}
      <button 
        className="relative w-11 h-11 border border-[#e9ecef] bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-[#4A4A4A] hover:bg-[#EBFCF4] hover:border-[#0B6333] hover:opacity-90"
        title="AI Panel"
      >
        <svg viewBox="0 0 18 18" className="w-5 h-5">
          <path d="M11.879 16.244 10.864 18H7.132l-1.014-1.756h5.76ZM8.999 0c3.684 0 6.672 2.978 6.672 6.652a6.643 6.643 0 0 1-3.199 5.68l-.044.027v2.744H5.582v-2.736l-.016-.01a6.646 6.646 0 0 1-3.24-5.62v-.085C2.325 2.978 5.313 0 8.998 0Zm0 1.756c-2.717 0-4.918 2.193-4.918 4.896a4.894 4.894 0 0 0 2.762 4.402l.494.24v2.052h3.335V11.29l.492-.241a4.887 4.887 0 0 0 2.75-4.397c.001-2.703-2.2-4.896-4.916-4.896Zm.216 2.229-.493 1.9h2.449l-.91 3.827H8.456l.492-2.07H6.453L7.4 3.985h1.814Z" fill="currentColor"></path>
        </svg>
      </button>

      {/* Signup Button */}
      <button className="bg-[#1B1B1B] text-white border-none py-2.5 px-5 rounded-[24px] font-medium text-sm cursor-pointer transition-all duration-300 whitespace-nowrap h-10 flex items-center justify-center hover:bg-[#464646] hover:opacity-85">
        + Signup
      </button>

      {/* Avatar */}
      <div className="relative">
        <button 
          className="w-11 h-11 bg-white text-[#4A4A4A] border border-[#e9ecef] rounded-full flex items-center justify-center font-medium text-sm cursor-pointer transition-all duration-300 tracking-[0.5px] hover:bg-[#EBFCF4] hover:border-[#0B6333] hover:opacity-90"
          title="User Menu"
        >
          AZ
        </button>
      </div>
    </div>
  );
};
