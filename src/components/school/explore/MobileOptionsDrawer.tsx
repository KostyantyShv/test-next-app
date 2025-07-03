"use client";
import React, { useState } from "react";

interface MobileOptionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  layout: 'grid' | 'list';
  onLayoutChange: (layout: 'grid' | 'list') => void;
}

const MobileOptionsDrawer: React.FC<MobileOptionsDrawerProps> = ({
  isOpen,
  onClose,
  layout,
  onLayoutChange,
}) => {
  const [selectedSort, setSelectedSort] = useState('rating');
  const [selectedSearchType, setSelectedSearchType] = useState('exact');

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div className={`fixed bottom-0 left-0 right-0 h-[85%] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 rounded-t-[20px] ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Options</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Sort Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Sort by</h3>
              <div className="space-y-0">
                {[
                  { label: "Rating", value: "rating" },
                  { label: "Name", value: "name" },
                  { label: "Distance", value: "distance" },
                  { label: "Price", value: "price" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center justify-between p-3 cursor-pointer rounded hover:bg-gray-50">
                    <span className="text-sm text-gray-700">{option.label}</span>
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={selectedSort === option.value}
                      onChange={(e) => setSelectedSort(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Search Type */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Search type</h3>
              <div className="space-y-0">
                {[
                  { label: "Exact match", value: "exact" },
                  { label: "Partial match", value: "partial" },
                  { label: "Advanced search", value: "advanced" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center justify-between p-3 cursor-pointer rounded hover:bg-gray-50">
                    <span className="text-sm text-gray-700">{option.label}</span>
                    <input
                      type="radio"
                      name="searchType"
                      value={option.value}
                      checked={selectedSearchType === option.value}
                      onChange={(e) => setSelectedSearchType(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Layout Options */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Layout</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { 
                    label: "Grid", 
                    value: "grid", 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    )
                  },
                  { 
                    label: "List", 
                    value: "list", 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    )
                  },
                  { 
                    label: "Classic", 
                    value: "classic", 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    )
                  },
                  { 
                    label: "Hybrid", 
                    value: "hybrid", 
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    )
                  },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onLayoutChange(option.value as 'grid' | 'list')}
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${
                      layout === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`mb-2 ${layout === option.value ? 'text-blue-600' : 'text-gray-600'}`}>
                      {option.icon}
                    </div>
                    <span className={`text-xs ${layout === option.value ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileOptionsDrawer; 