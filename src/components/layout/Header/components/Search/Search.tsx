'use client';

import { FC, useState, useRef, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';

// Trending searches data
const TRENDING_SEARCHES = [
  'Machine Learning Fundamentals',
  'UX Design Principles',
  'Data Science Bootcamp',
  'Leadership Masterclass',
  'Digital Marketing Strategy'
];

// Sample search results data
const SEARCH_RESULTS = {
  k12: [
    {
      title: 'Advanced Machine Learning Techniques',
      author: 'Dr. Sarah Chen',
      duration: '2.5h',
      enrolled: '1,247',
      image: 'https://i.ibb.co/BHcDXgQt/product5.webp'
    },
    {
      title: 'Data Science Fundamentals',
      author: 'Michael Rodriguez',
      duration: '4.2h',
      enrolled: '892',
      image: 'https://i.ibb.co/XkdtT1Yj/product2.png'
    },
    {
      title: 'AI Ethics and Governance',
      author: 'Prof. Emily Watson',
      duration: '1.8h',
      enrolled: '645',
      image: 'https://i.ibb.co/5NTkykV/product3.jpg'
    }
  ],
  colleges: [
    {
      title: 'Leadership in Tech Workshop',
      author: 'David Kim',
      type: 'Live Session',
      enrolled: '156',
      image: 'https://i.ibb.co/XkdtT1Yj/product2.png'
    },
    {
      title: 'Team Building Strategies',
      author: 'Lisa Anderson',
      type: 'Interactive',
      enrolled: '234',
      image: 'https://i.ibb.co/5NTkykV/product3.jpg'
    }
  ],
  gradSchool: [
    {
      title: 'Tech Innovators Network',
      author: 'Community Lead',
      members: '2,847',
      type: 'Public',
      image: 'https://i.ibb.co/BHcDXgQt/product5.webp'
    },
    {
      title: 'AI Researchers Hub',
      author: 'Research Team',
      members: '1,523',
      type: 'Private',
      image: 'https://i.ibb.co/5NTkykV/product3.jpg'
    }
  ]
};

// Topics data
const TOPICS = [
  'Programming',
  'Digital Marketing',
  'Data Science',
  'Leadership',
  'Design Thinking',
  'AI & Machine Learning'
];

export const Search: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const normalizedQuery = searchValue.trim().toLowerCase();
  const showResults = normalizedQuery.length >= 2;
  const showSuggestions = isFocused;

  const handleTrendingClick = (item: string) => {
    setSearchValue(item);
  };

  const handleTopicClick = (topic: string) => {
    setSearchValue(topic);
  };

  const activeTheme = mounted ? theme : 'light';
  const showMidnight = activeTheme === 'midnight';
  const showOceanic = activeTheme === 'oceanic';
  const showMint = activeTheme === 'mint';
  const showTeal = activeTheme === 'teal';
  const showLegacy = !showMidnight && !showOceanic && !showMint && !showTeal;

  // Generate dynamic suggestions based on query
  const dynamicSuggestions = useMemo(() => {
    if (!normalizedQuery) return [];
    return [
      `${searchValue} fundamentals`,
      `Advanced ${searchValue} techniques`,
      `${searchValue} for beginners`,
      `${searchValue} masterclass`,
      `${searchValue} certification course`
    ];
  }, [searchValue, normalizedQuery]);

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
            placeholder="Search for books, podcasts, skills..."
            className="search-input-legacy flex-grow border-none outline-none bg-transparent px-4 pr-0 text-base font-normal rounded-[14px_0_0_14px] placeholder:opacity-90"
            style={{ color: "var(--text-default)" }}
          />

          {searchValue.length >= 2 && (
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
              <path d="M4 14.25L12 17.25L20 14.25" />
              <path d="M4 10.5L12 13.5L20 10.5" />
              <path d="M12 6.75L20 9.75L12 12.75L4 9.75L12 6.75Z" />
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

      {/* Enhanced Search Suggestions Dropdown */}
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="search-suggestions absolute left-0 right-0 bg-white border border-[#e9ecef] rounded-xl overflow-hidden z-[1000] animate-fadeIn"
          style={{
            top: 'calc(100% + 12px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            maxHeight: '600px',
            overflowY: 'auto',
            padding: '16px'
          }}
        >
          {/* Trending Section - Show when no query */}
          {!showResults && (
            <div className="trending-section mb-6">
              <h3 className="text-sm text-[#5F5F5F] mb-0.5 font-semibold tracking-[-0.01em]">Trending now</h3>
              <div className="flex flex-col gap-1">
                {TRENDING_SEARCHES.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer transition-all hover:bg-[#f8f9fa]"
                    onClick={() => handleTrendingClick(item)}
                  >
                    <svg fill="#016853" className="shrink-0 h-4 w-4" viewBox="0 -960 960 960">
                      <path d="M659-534v102q0 13 8.5 21.5T689-402t21.5-8.5T719-432v-170q0-13-8.5-21.5T689-632H519q-13 0-21.5 8.5T489-602t8.5 21.5T519-572h102L436-387l-106-93q-9-8-21-7t-20 9L134-323q-7 7-8.5 16t3.5 17q7 11 20.5 12.5T172-285l139-139 106 93q9 8 21 7t20-9z"></path>
                    </svg>
                    <span className="text-sm font-[450] text-[#4A4A4A] tracking-[-0.01em]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic suggestions when typing */}
          {showResults && (
            <div className="trending-section mb-6">
              <div className="flex flex-col gap-1">
                {dynamicSuggestions.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer transition-all hover:bg-[#f8f9fa]"
                    onClick={() => handleTrendingClick(item)}
                  >
                    <svg viewBox="0 0 20 20" fill="#016853" className="w-4 h-4 shrink-0">
                      <path d="M17.02 6.106a.5.5 0 0 1 .816.572l-.052.074-6.33 7.483a.5.5 0 0 1-.662.092l-.073-.06-3.933-3.918-3.932 3.933a.5.5 0 0 1-.638.058l-.07-.058a.5.5 0 0 1-.057-.638l.057-.069 4.286-4.286a.5.5 0 0 1 .637-.058l.07.058 3.9 3.886z"></path>
                    </svg>
                    <span className="text-sm font-[450] text-[#4A4A4A] tracking-[-0.01em]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results Section - Show when query length >= 2 */}
          {showResults && (
            <div className="results-section border-t border-[#e9ecef] pt-4">
              {/* K-12 Section */}
              <div className="results-category mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#f8f9fa] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#016853]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8.33333 3.25C8.31123 3.25 8.29004 3.25878 8.27441 3.27441C8.25878 3.29004 8.25 3.31123 8.25 3.33333V8.02267L11.3637 11.1363C11.5043 11.277 11.5833 11.4678 11.5833 11.6667V16.75H16.75V3.33333C16.75 3.31123 16.7412 3.29003 16.7256 3.27441C16.71 3.25878 16.6888 3.25 16.6667 3.25H8.33333ZM10.0833 16.75V11.9773L6.66667 8.56066L3.25 11.9773V16.75H5.91667V14.1667C5.91667 13.7525 6.25245 13.4167 6.66667 13.4167C7.08088 13.4167 7.41667 13.7525 7.41667 14.1667V16.75H10.0833ZM6.75 6.75462C6.53133 6.73031 6.30401 6.80199 6.13634 6.96967L1.96967 11.1363C1.82902 11.277 1.75 11.4678 1.75 11.6667V17.5C1.75 17.9142 2.08579 18.25 2.5 18.25H17.5C17.9142 18.25 18.25 17.9142 18.25 17.5V3.33333C18.25 2.91341 18.0832 2.51068 17.7863 2.21375C17.4893 1.91681 17.0866 1.75 16.6667 1.75H8.33333C7.91341 1.75 7.51068 1.91681 7.21375 2.21375C6.91682 2.51068 6.75 2.91341 6.75 3.33333V6.75462ZM10.8333 5.08333C11.2475 5.08333 11.5833 5.41912 11.5833 5.83333V5.84167C11.5833 6.25588 11.2475 6.59167 10.8333 6.59167C10.4191 6.59167 10.0833 6.25588 10.0833 5.84167V5.83333C10.0833 5.41912 10.4191 5.08333 10.8333 5.08333ZM14.1667 5.08333C14.5809 5.08333 14.9167 5.41912 14.9167 5.83333V5.84167C14.9167 6.25588 14.5809 6.59167 14.1667 6.59167C13.7525 6.59167 13.4167 6.25588 13.4167 5.84167V5.83333C13.4167 5.41912 13.7525 5.08333 14.1667 5.08333ZM14.1667 8.41667C14.5809 8.41667 14.9167 8.75245 14.9167 9.16667V9.175C14.9167 9.58921 14.5809 9.925 14.1667 9.925C13.7525 9.925 13.4167 9.58921 13.4167 9.175V9.16667C13.4167 8.75245 13.7525 8.41667 14.1667 8.41667ZM14.1667 11.75C14.5809 11.75 14.9167 12.0858 14.9167 12.5V12.5083C14.9167 12.9225 14.5809 13.2583 14.1667 13.2583C13.7525 13.2583 13.4167 12.9225 13.4167 12.5083V12.5C13.4167 12.0858 13.7525 11.75 14.1667 11.75Z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-[#5F5F5F] tracking-[-0.01em]">K-12</h3>
                </div>
                <div className="results-list">
                  {SEARCH_RESULTS.k12.map((item, idx) => (
                    <div key={idx} className="flex items-start py-3 gap-4 border-b border-[#f8f9fa] cursor-pointer transition-all hover:bg-[#f8f9fa] hover:rounded-lg hover:mx-[-8px] hover:px-2 last:border-b-0">
                      <Image src={item.image} alt={item.title} width={72} height={48} className="rounded-md object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[15px] font-semibold text-[#4A4A4A] mb-1 leading-[1.3] tracking-[-0.01em]">{item.title}</h4>
                        <div className="flex items-center gap-2 text-[13px] text-[#5F5F5F]">
                          <span>{item.author}</span>
                          <span className="w-[3px] h-[3px] bg-[#5F5F5F] rounded-full"></span>
                          <span>{item.duration}</span>
                          <span className="w-[3px] h-[3px] bg-[#5F5F5F] rounded-full"></span>
                          <span>{item.enrolled} enrolled</span>
                        </div>
                      </div>
                      <button className="py-1.5 px-4 bg-[#EBFCF4] text-[#016853] border border-[#016853] rounded-md text-[13px] font-medium cursor-pointer transition-all hover:bg-[#D7F7E9] tracking-[-0.01em] whitespace-nowrap self-start shrink-0">VIEW</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colleges Section */}
              <div className="results-category mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#f8f9fa] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#016853]" viewBox="0 0 640 512" fill="currentColor">
                      <path d="M306.7 4c8.1-5.4 18.6-5.4 26.6 0l138 92L568 96c39.8 0 72 32.2 72 72l0 272c0 39.8-32.2 72-72 72l-184 0-128 0L72 512c-39.8 0-72-32.2-72-72L0 168c0-39.8 32.2-72 72-72l96.7 0 138-92zM568 464c13.3 0 24-10.7 24-24l0-272c0-13.3-10.7-24-24-24l-104 0c-4.7 0-9.4-1.4-13.3-4L320 52.8 189.3 140c-3.9 2.6-8.6 4-13.3 4L72 144c-13.3 0-24 10.7-24 24l0 272c0 13.3 10.7 24 24 24l184 0 0-80c0-35.3 28.7-64 64-64s64 28.7 64 64l0 80 184 0zM112 192l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm368 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM112 320l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16zm368 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-64zM240 192a80 80 0 1 1 160 0 80 80 0 1 1 -160 0zm80-48c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l24 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-8 0 0-16c0-8.8-7.2-16-16-16z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-[#5F5F5F] tracking-[-0.01em]">Colleges</h3>
                </div>
                <div className="results-list">
                  {SEARCH_RESULTS.colleges.map((item, idx) => (
                    <div key={idx} className="flex items-start py-3 gap-4 border-b border-[#f8f9fa] cursor-pointer transition-all hover:bg-[#f8f9fa] hover:rounded-lg hover:mx-[-8px] hover:px-2 last:border-b-0">
                      <Image src={item.image} alt={item.title} width={72} height={48} className="rounded-md object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[15px] font-semibold text-[#4A4A4A] mb-1 leading-[1.3] tracking-[-0.01em]">{item.title}</h4>
                        <div className="flex items-center gap-2 text-[13px] text-[#5F5F5F]">
                          <span>{item.author}</span>
                          <span className="w-[3px] h-[3px] bg-[#5F5F5F] rounded-full"></span>
                          <span>{item.type}</span>
                          <span className="w-[3px] h-[3px] bg-[#5F5F5F] rounded-full"></span>
                          <span>{item.enrolled} enrolled</span>
                        </div>
                      </div>
                      <button className="py-1.5 px-4 bg-[#EBFCF4] text-[#016853] border border-[#016853] rounded-md text-[13px] font-medium cursor-pointer transition-all hover:bg-[#D7F7E9] tracking-[-0.01em] whitespace-nowrap self-start shrink-0">VIEW</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grad School Section */}
              <div className="results-category mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#f8f9fa] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#016853]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-[#5F5F5F] tracking-[-0.01em]">Grad School</h3>
                </div>
                <div className="results-list">
                  {SEARCH_RESULTS.gradSchool.map((item, idx) => (
                    <div key={idx} className="flex items-start py-3 gap-4 border-b border-[#f8f9fa] cursor-pointer transition-all hover:bg-[#f8f9fa] hover:rounded-lg hover:mx-[-8px] hover:px-2 last:border-b-0">
                      <Image src={item.image} alt={item.title} width={72} height={48} className="rounded-md object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[15px] font-semibold text-[#4A4A4A] mb-1 leading-[1.3] tracking-[-0.01em]">{item.title}</h4>
                        <div className="flex items-center gap-2 text-[13px] text-[#5F5F5F]">
                          <span>{item.author}</span>
                          <span className="w-[3px] h-[3px] bg-[#5F5F5F] rounded-full"></span>
                          <span>{item.type}</span>
                          <span className="w-[3px] h-[3px] bg-[#5F5F5F] rounded-full"></span>
                          <span>{item.members} members</span>
                        </div>
                      </div>
                      <button className="py-1.5 px-4 bg-[#EBFCF4] text-[#016853] border border-[#016853] rounded-md text-[13px] font-medium cursor-pointer transition-all hover:bg-[#D7F7E9] tracking-[-0.01em] whitespace-nowrap self-start shrink-0">JOIN</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Topics Section */}
          <div className="topics-section mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#f8f9fa] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-[#016853]" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 4h6v6h-6z" />
                  <path d="M14 4h6v6h-6z" />
                  <path d="M4 14h6v6h-6z" />
                  <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-[#5F5F5F]">Topics</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {TOPICS.map((topic, idx) => (
                <div
                  key={idx}
                  onClick={() => handleTopicClick(topic)}
                  className="inline-flex items-center justify-between py-1.5 px-3 bg-[#EBFCF4] border border-[#016853] rounded-lg min-w-[120px] max-w-fit gap-2 text-[13px] text-[#4A4A4A] transition-all cursor-pointer hover:bg-[#D7F7E9]"
                >
                  <span className="font-[450] tracking-[-0.01em]">{topic}</span>
                  <div className="w-[18px] h-[18px] bg-[#016853] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 fill-white" viewBox="0 0 448 512">
                      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"></path>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
