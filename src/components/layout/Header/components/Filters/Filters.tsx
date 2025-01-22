'use client';

import { FC, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

type Language = 'English' | 'Chinese' | 'Hindi' | 'Spanish' | 'French' | 'Russian' | 'German' | 'Japanese' | 'Korean' | 'Hebrew';
type ContentType = 'Title' | 'Content';
type SortType = 'Popularity' | 'Newest' | 'Oldest';

interface FiltersState {
  language: Language;
  contentType: ContentType;
  sortBy: SortType;
}

export const Filters: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersState>({
    language: 'English',
    contentType: 'Title',
    sortBy: 'Popularity'
  });

  const handleReset = () => {
    setFilters({
      language: 'English',
      contentType: 'Title',
      sortBy: 'Popularity'
    });
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Toggle filters"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          className="text-gray-600"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" 
          />
        </svg>
      </button>

      {/* Desktop Filters Panel */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 w-[600px] hidden md:block">
          <div className="flex items-center gap-4 p-4">
            <h3 className="text-lg font-medium">Filter & Sort</h3>
            <button 
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              <span>↺</span> Reset All
            </button>
          </div>

          <div className="flex items-center gap-4 p-4 pt-0">
            {/* Language Dropdown */}
            <select
              value={filters.language}
              onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value as Language }))}
              className="px-3 py-2 bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-primary"
            >
              <option value="English">English</option>
              <option value="Chinese">Chinese</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="Russian">Russian</option>
              <option value="German">German</option>
              <option value="Japanese">Japanese</option>
              <option value="Korean">Korean</option>
              <option value="Hebrew">Hebrew</option>
            </select>

            {/* Content Type Dropdown */}
            <select
              value={filters.contentType}
              onChange={(e) => setFilters(prev => ({ ...prev, contentType: e.target.value as ContentType }))}
              className="px-3 py-2 bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-primary"
            >
              <option value="Title">Title</option>
              <option value="Content">Content</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as SortType }))}
              className="px-3 py-2 bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-primary"
            >
              <option value="Popularity">Popularity</option>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>
        </div>
      )}

      {/* Mobile Filters Panel */}
      <div className={cn(
        "md:hidden fixed inset-0 z-40 transition-all duration-200 ease-in-out",
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      )}>
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Panel */}
        <div className={cn(
          "fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl max-h-[85vh]",
          "transform transition-transform duration-500 ease-in-out",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}>
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-medium">Filter & Sort</h3>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleReset}
                className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
              >
                <span>↺</span> Reset
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Icon name="close" size="sm" className="text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Mobile Language Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Language</label>
                <select
                  value={filters.language}
                  onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value as Language }))}
                  className="w-full px-3 py-2 bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-primary"
                >
                  <option value="English">English</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="Russian">Russian</option>
                  <option value="German">German</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Korean</option>
                  <option value="Hebrew">Hebrew</option>
                </select>
              </div>

              {/* Mobile Content Type Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Content Type</label>
                <select
                  value={filters.contentType}
                  onChange={(e) => setFilters(prev => ({ ...prev, contentType: e.target.value as ContentType }))}
                  className="w-full px-3 py-2 bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Title">Title</option>
                  <option value="Content">Content</option>
                </select>
              </div>

              {/* Mobile Sort Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as SortType }))}
                  className="w-full px-3 py-2 bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Popularity">Popularity</option>
                  <option value="Newest">Newest</option>
                  <option value="Oldest">Oldest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
