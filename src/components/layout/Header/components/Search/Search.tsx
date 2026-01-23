'use client';

import { FC, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export const Search: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const trendingSearches = [
    'Machine Learning Fundamentals',
    'UX Design Principles', 
    'Data Science Bootcamp',
    'Leadership Masterclass',
    'Digital Marketing Strategy'
  ];

  const topics = [
    'Programming',
    'Digital Marketing',
    'Data Science',
    'Leadership',
    'Design Thinking',
    'AI & Machine Learning'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value.length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      setShowSuggestions(false);
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Wrapper */}
      <div className={cn(
        "flex items-stretch w-full max-w-[800px] h-[52px] bg-[#E1E7EE] border border-[#065f46] rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300",
        isFocused && "border-[#065f46] shadow-[0_0_0_4px_rgba(0,158,203,0.03)]"
      )}>
        {/* Search Icon */}
        <div className="flex items-center justify-center px-2 pl-4 flex-shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 opacity-70" fill="#065f46">
            <path fillRule="nonzero" fill="#065f46" d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"></path>
            <path fillRule="nonzero" fill="#065f46" d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"></path>
          </svg>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search for books, podcasts, skills..."
          className="flex-grow border-none outline-none bg-transparent px-4 pr-0 text-base font-normal text-[#4A4A4A] rounded-[14px_0_0_14px] placeholder:text-[#5F5F5F] placeholder:opacity-90"
        />

        {/* Clear Button */}
        {searchValue && (
          <button
            onClick={handleClear}
            className="bg-transparent border-none p-0 mr-[10px] cursor-pointer flex items-center justify-center opacity-60 transition-all duration-300 rounded-full w-[26px] h-[26px] flex-shrink-0 self-center leading-none hover:opacity-100 hover:bg-[rgba(0,0,0,0.06)] hover:scale-105"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#065f46] block">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0a.9959.9959 0 0 1 0-1.41L10.59 12 7.7 9.11a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41"></path>
            </svg>
          </button>
        )}

        {/* Search Filter */}
        <div className="relative flex items-center gap-2 px-5 text-[#4A4A4A] bg-white cursor-pointer whitespace-nowrap transition-all duration-300 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[10px] before:bg-white before:rounded-[10px] before:transform before:-translate-x-[50%]">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#065f46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14.25L12 17.25L20 14.25"/>
            <path d="M4 10.5L12 13.5L20 10.5"/>
            <path d="M12 6.75L20 9.75L12 12.75L4 9.75L12 6.75Z"/>
          </svg>
          <span>All</span>
          <svg className="w-3 h-3" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#065f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 5L5 1L9 5" />
            <path d="M1 11L5 15L9 11" />
          </svg>
        </div>

        {/* Search Button */}
        <button className="relative flex items-center justify-center border-none bg-[#016853] text-white px-6 cursor-pointer transition-all duration-200 rounded-[0_6px_6px_0] border-l border-[#065f46] hover:bg-[#0B6333] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[10px] before:bg-white before:rounded-[10px] before:transform before:-translate-x-[50%]">
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M14.29 5.71c-.39.39-.39 1.02 0 1.41L18.17 11H3c-.55 0-1 .45-1 1s.45 1 1 1h15.18l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l5.59-5.59c.39-.39.39-1.02 0-1.41l-5.6-5.58c-.38-.39-1.02-.39-1.41 0"></path>
          </svg>
        </button>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] opacity-100 visible transform translate-y-0 transition-all duration-300 z-[1000] max-h-[600px] overflow-y-auto p-4">
          {/* Trending Section */}
          <div className="mb-6">
            <h3 className="text-sm text-[#5F5F5F] mb-1 font-semibold tracking-[-0.01em]">Trending now</h3>
            <div className="flex flex-col gap-1">
              {trendingSearches.map((search, index) => (
                <div key={index} className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#f8f9fa]">
                  <svg fill="currentColor" className="shrink-0 h-5 w-5 text-[#065f46]" viewBox="0 -960 960 960">
                    <path d="M659-534v102q0 13 8.5 21.5T689-402t21.5-8.5T719-432v-170q0-13-8.5-21.5T689-632H519q-13 0-21.5 8.5T489-602t8.5 21.5T519-572h102L436-387l-106-93q-9-8-21-7t-20 9L134-323q-7 7-8.5 16t3.5 17q7 11 20.5 12.5T172-285l139-139 106 93q9 8 21 7t20-9z"></path>
                  </svg>
                  <span className="text-sm font-[450] text-[#4A4A4A] tracking-[-0.01em]">{search}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Topics Section */}
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#f8f9fa] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-[#065f46]" viewBox="0 0 24 24" strokeWidth="2" stroke="#065f46" fill="none">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M4 4h6v6h-6z" />
                  <path d="M14 4h6v6h-6z" />
                  <path d="M4 14h6v6h-6z" />
                  <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                </svg>
              </div>
              <h3 className="text-sm text-[#5F5F5F] font-semibold tracking-[-0.01em]">Topics</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {topics.map((topic, index) => (
                <div key={index} className="inline-flex items-center justify-between px-3 py-1.5 bg-[#EBFCF4] border border-[#065f46] rounded-lg min-w-[120px] max-w-fit gap-2 text-sm text-[#4A4A4A] transition-all duration-300 cursor-pointer hover:bg-[#D7F7E9]">
                  <span className="font-[450] tracking-[-0.01em]">{topic}</span>
                  <div className="w-[18px] h-[18px] bg-[#065f46] rounded-full flex items-center justify-center">
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
