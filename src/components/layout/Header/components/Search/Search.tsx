'use client';

import { FC, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export const Search: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue('');
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 150);
  };

  const activeTheme = mounted ? theme : 'light';
  const showMidnight = activeTheme === 'midnight';
  const showOceanic = activeTheme === 'oceanic';
  const showMint = activeTheme === 'mint';
  const showTeal = activeTheme === 'teal';
  const showLegacy = !showMidnight && !showOceanic && !showMint && !showTeal;

  return (
    <div className="relative global-header-search" ref={searchRef}>
      {/* Search Wrapper (Light Theme Legacy) */}
      {showLegacy && (
        <div
        className={cn(
          "search-container-legacy flex items-stretch w-full max-w-[800px] h-[52px] rounded-[6px] overflow-hidden transition-all duration-300",
          isFocused && "is-focused"
        )}
        style={{
          backgroundColor: "var(--apply-button-bg)",
          border: "1px solid var(--border-color)",
          boxShadow: "0 2px 8px var(--shadow-color)"
        }}
      >
        <div className="search-icon flex items-center justify-center px-2 pl-4 flex-shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 opacity-70 text-[var(--header-green)]" fill="currentColor">
            <path fillRule="nonzero" fill="currentColor" d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"></path>
            <path fillRule="nonzero" fill="currentColor" d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"></path>
          </svg>
        </div>

        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search for books, podcasts, skills..."
          className="search-input-legacy flex-grow border-none outline-none bg-transparent px-4 pr-0 text-base font-normal rounded-[14px_0_0_14px] placeholder:opacity-90"
          style={{ color: "var(--text-default)" }}
        />

        {searchValue && (
          <button
            onClick={handleClear}
            className="search-clear bg-transparent border-none p-0 mr-[10px] cursor-pointer flex items-center justify-center opacity-60 transition-all duration-300 rounded-full w-[26px] h-[26px] flex-shrink-0 self-center leading-none hover:opacity-100 hover:bg-[rgba(0,0,0,0.06)] hover:scale-105"
            style={{ color: "var(--header-green)" }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 block" fill="currentColor">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0a.9959.9959 0 0 1 0-1.41L10.59 12 7.7 9.11a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41"></path>
            </svg>
          </button>
        )}

        <div
          className="search-filter-legacy relative flex items-center gap-2 px-5 cursor-pointer whitespace-nowrap transition-all duration-300 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[10px] before:rounded-[10px] before:transform before:-translate-x-[50%]"
          style={{ backgroundColor: "var(--surface-color)", color: "var(--text-default)" }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--header-green)" }}>
            <path d="M4 14.25L12 17.25L20 14.25"/>
            <path d="M4 10.5L12 13.5L20 10.5"/>
            <path d="M12 6.75L20 9.75L12 12.75L4 9.75L12 6.75Z"/>
          </svg>
          <span>All</span>
          <svg className="w-3 h-3" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--header-green)" }}>
            <path d="M1 5L5 1L9 5" />
            <path d="M1 11L5 15L9 11" />
          </svg>
        </div>

        <button
          className="search-button-legacy relative flex items-center justify-center border-none text-white px-6 cursor-pointer transition-all duration-200 rounded-[0_6px_6px_0] border-l before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[10px] before:rounded-[10px] before:transform before:-translate-x-[50%]"
          style={{
            backgroundColor: "var(--header-green)",
            borderLeft: "1px solid var(--border-color)"
          }}
        >
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M14.29 5.71c-.39.39-.39 1.02 0 1.41L18.17 11H3c-.55 0-1 .45-1 1s.45 1 1 1h15.18l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l5.59-5.59c.39-.39.39-1.02 0-1.41l-5.6-5.58c-.38-.39-1.02-.39-1.41 0"></path>
          </svg>
        </button>
        </div>
      )}

      {/* Search Wrapper (Midnight 1:1) */}
      {showMidnight && (
        <div className={cn("search-container-midnight search-container", isFocused && "is-focused")}>
        <div className="search-icon">
          <svg viewBox="0 0 24 24" className="w-5 h-5 opacity-70" fill="#065f46" aria-hidden>
            <path
              fillRule="nonzero"
              fill="#065f46"
              d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"
            />
            <path
              fillRule="nonzero"
              fill="#065f46"
              d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"
            />
          </svg>
        </div>

        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search for.."
          className="search-input"
        />

        <div className="search-filter" role="button" aria-label="Filter">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14.25L12 17.25L20 14.25" />
            <path d="M4 10.5L12 13.5L20 10.5" />
            <path d="M12 6.75L20 9.75L12 12.75L4 9.75L12 6.75Z" />
          </svg>
          <span>All</span>
          <svg className="icon" style={{ width: "0.8rem", height: "0.8rem" }} viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 5L5 1L9 5" />
            <path d="M1 11L5 15L9 11" />
          </svg>
        </div>

        <button className="search-button" aria-label="Search">
          <svg className="icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M14.29 5.71c-.39.39-.39 1.02 0 1.41L18.17 11H3c-.55 0-1 .45-1 1s.45 1 1 1h15.18l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l5.59-5.59c-.39-.39.39-1.02 0-1.41l-5.6-5.58c-.38-.39-1.02-.39-1.41 0"></path>
          </svg>
        </button>
        </div>
      )}

      {/* Search Wrapper (Oceanic 1:1) */}
      {showOceanic && (
        <div className={cn("search-container-oceanic search-container", isFocused && "is-focused")}>
        <div className="search-icon">
          <svg viewBox="0 0 24 24" aria-hidden>
            <defs>
              <radialGradient id="circleGradientOceanic" cx="30%" cy="30%" r="70%" fx="20%" fy="20%">
                <stop offset="0%" stopColor="#BAE6FD" />
                <stop offset="45%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0369A1" />
              </radialGradient>
              <linearGradient id="handleGradientOceanic" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#0369A1" />
                <stop offset="100%" stopColor="#7DD3FC" />
              </linearGradient>
            </defs>
            <path
              opacity="0.9"
              fillRule="nonzero"
              fill="url(#handleGradientOceanic)"
              d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"
            />
            <path
              fillRule="nonzero"
              fill="url(#circleGradientOceanic)"
              d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"
            />
          </svg>
        </div>

        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search for.."
          className="search-input"
        />

        <div className="search-filter" role="button" aria-label="Filter">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14.25L12 17.25L20 14.25" />
            <path d="M4 10.5L12 13.5L20 10.5" />
            <path d="M12 6.75L20 9.75L12 12.75L4 9.75L12 6.75Z" />
          </svg>
          <span>All</span>
          <svg className="icon" style={{ width: "0.8rem", height: "0.8rem" }} viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 5L5 1L9 5" />
            <path d="M1 11L5 15L9 11" />
          </svg>
        </div>

        <button className="search-button" aria-label="Search">
          <svg className="icon" viewBox="0 0 24 24" width="22" height="22" fill="white">
            <path d="M14.29 5.71c-.39.39-.39 1.02 0 1.41L18.17 11H3c-.55 0-1 .45-1 1s.45 1 1 1h15.18l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l5.59-5.59c-.39-.39.39-1.02 0-1.41l-5.6-5.58c-.38-.39-1.02-.39-1.41 0"></path>
          </svg>
        </button>
        </div>
      )}

      {/* Search Wrapper (Teal Ocean 1:1) */}
      {showTeal && (
        <div className={cn("search-container-teal search-container", isFocused && "is-focused")}>
          <div className="search-icon">
            <svg viewBox="0 0 24 24" aria-hidden>
              <defs>
                <radialGradient id="circleGradientTeal" cx="30%" cy="30%" r="70%" fx="20%" fy="20%">
                  <stop offset="0%" stopColor="#CCFBF1" />
                  <stop offset="45%" stopColor="#5EEAD4" />
                  <stop offset="100%" stopColor="#0F766E" />
                </radialGradient>
                <linearGradient id="handleGradientTeal" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#0F766E" />
                  <stop offset="100%" stopColor="#14B8A6" />
                </linearGradient>
              </defs>
              <path
                opacity="0.9"
                fillRule="nonzero"
                fill="url(#handleGradientTeal)"
                d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"
              />
              <path
                fillRule="nonzero"
                fill="url(#circleGradientTeal)"
                d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"
              />
            </svg>
          </div>

          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search for.."
            className="search-input"
          />

          <div className="search-filter" role="button" aria-label="Filter">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 14.25L12 17.25L20 14.25" />
              <path d="M4 10.5L12 13.5L20 10.5" />
              <path d="M12 6.75L20 9.75L12 12.75L4 9.75L12 6.75Z" />
            </svg>
            <span>All</span>
            <svg className="icon" style={{ width: "0.8rem", height: "0.8rem" }} viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 5L5 1L9 5" />
              <path d="M1 11L5 15L9 11" />
            </svg>
          </div>

          <button className="search-button" aria-label="Search">
            <svg className="icon" viewBox="0 0 24 24" width="22" height="22" fill="white">
              <path d="M14.29 5.71c-.39.39-.39 1.02 0 1.41L18.17 11H3c-.55 0-1 .45-1 1s.45 1 1 1h15.18l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l5.59-5.59c-.39-.39.39-1.02 0-1.41l-5.6-5.58c-.38-.39-1.02-.39-1.41 0"></path>
            </svg>
          </button>
        </div>
      )}

      {/* Search Wrapper (Mint Fresh 1:1) */}
      {showMint && (
        <div className={cn("search-container-mint search-container", isFocused && "is-focused")}>
          <div className="search-icon">
            <svg viewBox="0 0 24 24" aria-hidden>
              <defs>
                <radialGradient id="circleGradientMint" cx="30%" cy="30%" r="70%" fx="20%" fy="20%">
                  <stop offset="0%" stopColor="#DCFCE7" />
                  <stop offset="45%" stopColor="#86EFAC" />
                  <stop offset="100%" stopColor="#166534" />
                </radialGradient>
                <linearGradient id="handleGradientMint" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#064E3B" />
                  <stop offset="100%" stopColor="#22C55E" />
                </linearGradient>
              </defs>
              <path
                opacity="0.9"
                fillRule="nonzero"
                fill="url(#handleGradientMint)"
                d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"
              />
              <path
                fillRule="nonzero"
                fill="url(#circleGradientMint)"
                d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"
              />
            </svg>
          </div>

          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search for.."
            className="search-input"
          />

          <div className="search-filter" role="button" aria-label="Filter">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 14.25L12 17.25L20 14.25" />
              <path d="M4 10.5L12 13.5L20 10.5" />
              <path d="M12 6.75L20 9.75L12 12.75L4 9.75L12 6.75Z" />
            </svg>
            <span>All</span>
            <svg className="icon" style={{ width: "0.8rem", height: "0.8rem" }} viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 5L5 1L9 5" />
              <path d="M1 11L5 15L9 11" />
            </svg>
          </div>

          <button className="search-button" aria-label="Search">
            <svg className="icon" viewBox="0 0 24 24" width="22" height="22" fill="white">
              <path d="M14.29 5.71c-.39.39-.39 1.02 0 1.41L18.17 11H3c-.55 0-1 .45-1 1s.45 1 1 1h15.18l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l5.59-5.59c-.39-.39.39-1.02 0-1.41l-5.6-5.58c-.38-.39-1.02-.39-1.41 0"></path>
            </svg>
          </button>
        </div>
      )}

    </div>
  );
};
