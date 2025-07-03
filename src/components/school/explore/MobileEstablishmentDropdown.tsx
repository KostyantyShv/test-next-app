"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import { EstablishmentType } from "@/types/schools-explore";

interface MobileEstablishmentDropdownProps {
  establishment: string;
  onEstablishmentChange: (establishment: EstablishmentType) => void;
}

const MobileEstablishmentDropdown: React.FC<MobileEstablishmentDropdownProps> = ({
  establishment,
  onEstablishmentChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const establishmentTypes = [
    { type: "K-12" as EstablishmentType, label: "K-12 Schools", count: "1,234 schools" },
    { type: "Colleges" as EstablishmentType, label: "Colleges", count: "2,456 colleges" },
    { type: "Graduates" as EstablishmentType, label: "Graduate Schools", count: "890 graduate schools" },
    { type: "District" as EstablishmentType, label: "Districts", count: "958 districts" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEstablishmentSelect = (type: EstablishmentType) => {
    onEstablishmentChange(type);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-lg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-600">
            <path d="M4 4h6v6h-6z"></path>
            <path d="M14 4h6v6h-6z"></path>
            <path d="M4 14h6v6h-6z"></path>
            <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
          </svg>
        </div>
        <h1 className="text-base font-semibold text-gray-700">
          {establishment}
        </h1>
        <div className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" clipRule="evenodd" fillRule="evenodd"></path>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-60 z-50">
          <div className="py-2">
            {establishmentTypes.map((item) => (
              <div
                key={item.type}
                className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
                  establishment === item.type ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleEstablishmentSelect(item.type)}
              >
                <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-600">
                    <path d="M4 4h6v6h-6z"></path>
                    <path d="M14 4h6v6h-6z"></path>
                    <path d="M4 14h6v6h-6z"></path>
                    <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                  </svg>
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-gray-500">{item.count}</span>
                </div>
                {establishment === item.type && (
                  <svg className="w-6 h-6 text-blue-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileEstablishmentDropdown; 