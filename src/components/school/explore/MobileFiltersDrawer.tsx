"use client";
import React, { useState } from "react";
import { useSchoolsExplore } from "@/store/use-schools-explore";

// Custom FilterSection component for mobile
const FilterSection: React.FC<{
  title: string;
  sectionId: string;
  children: React.ReactNode;
  expanded?: boolean;
  onToggle?: () => void;
}> = ({ title, sectionId, children, expanded = false, onToggle }) => (
  <div className="border-b border-gray-200">
    <div 
      className="flex items-center justify-between p-4 cursor-pointer"
      onClick={onToggle}
    >
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <svg 
        className={`w-4 h-4 text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    {expanded && (
      <div className="px-4 pb-4">
        {children}
      </div>
    )}
  </div>
);

// Custom CheckBoxFilter component for mobile
const CheckBoxFilter: React.FC<{
  label: string;
  checked: boolean;
  onChange: () => void;
}> = ({ label, checked, onChange }) => (
  <label className="flex items-center justify-between p-3 cursor-pointer rounded hover:bg-gray-50 font-normal text-sm">
    <span>{label}</span>
    <input
      type="checkbox"
      className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer"
      checked={checked}
      onChange={onChange}
    />
  </label>
);

// Custom ToggleSwitch component for mobile
const ToggleSwitch: React.FC<{
  checked: boolean;
  onChange: () => void;
}> = ({ checked, onChange }) => (
  <label className="flex items-center justify-between p-3 cursor-pointer rounded hover:bg-gray-50 font-normal text-sm">
    <span>Offers boarding</span>
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div className={`w-10 h-6 rounded-full transition-colors ${checked ? 'bg-green-500' : 'bg-gray-300'}`}>
        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'} mt-1 ml-1`} />
      </div>
    </div>
  </label>
);

// Custom SegmentControl component for mobile
const SegmentControl: React.FC<{
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}> = ({ options, value, onChange }) => (
  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
    {options.map((option) => (
      <button
        key={option.value}
        onClick={() => onChange(option.value)}
        className={`flex-1 py-2 px-4 text-sm transition-colors ${
          value === option.value 
            ? 'bg-green-50 text-green-700 font-medium' 
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        {option.label}
      </button>
    ))}
  </div>
);

// Custom GradeSelect component for mobile
const GradeSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const grades = [
    { value: "any", label: "Any" },
    { value: "prek", label: "Pre-K" },
    { value: "k", label: "Kindergarten" },
    { value: "5", label: "Grade 5" },
    { value: "8", label: "Grade 8" },
    { value: "12", label: "Grade 12" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between"
      >
        <span>{grades.find(g => g.value === value)?.label || "Any"}</span>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
          {grades.map((grade) => (
            <button
              key={grade.value}
              onClick={() => {
                onChange(grade.value);
                setIsOpen(false);
              }}
              className={`w-full p-3 text-left hover:bg-gray-50 flex items-center justify-between ${
                value === grade.value ? 'bg-green-50 text-green-700' : ''
              }`}
            >
              <span>{grade.label}</span>
              {value === grade.value && (
                <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface MobileFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileFiltersDrawer: React.FC<MobileFiltersDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { establishment, filterK12, filterColleges, filterGraduates, filterDistrict } = useSchoolsExplore();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['grade']));
  const [coedStatus, setCoedStatus] = useState('coed');
  const [boardingStatus, setBoardingStatus] = useState(false);
  const [highestGrade, setHighestGrade] = useState('any');

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const renderK12Filters = () => (
    <div className="space-y-0">
      {/* Grade Filter */}
      <FilterSection 
        title="Grade" 
        sectionId="grade"
        expanded={expandedSections.has('grade')}
        onToggle={() => toggleSection('grade')}
      >
        <div className="space-y-0">
          {[
            { value: "prek", label: "Pre-K" },
            { value: "elementary", label: "Elementary" },
            { value: "middle", label: "Middle" },
            { value: "high", label: "High School" },
          ].map((grade) => (
            <CheckBoxFilter
              key={grade.value}
              label={grade.label}
              checked={false}
              onChange={() => {}}
            />
          ))}
        </div>
      </FilterSection>

      {/* Type Filter */}
      <FilterSection 
        title="Type" 
        sectionId="type"
        expanded={expandedSections.has('type')}
        onToggle={() => toggleSection('type')}
      >
        <div className="space-y-0">
          <div className="mb-2">
            <CheckBoxFilter
              label="Public"
              checked={false}
              onChange={() => {}}
            />
            <div className="ml-4 space-y-0">
              <CheckBoxFilter
                label="Traditional"
                checked={false}
                onChange={() => {}}
              />
              <CheckBoxFilter
                label="Charter"
                checked={false}
                onChange={() => {}}
              />
              <CheckBoxFilter
                label="Magnet"
                checked={false}
                onChange={() => {}}
              />
            </div>
          </div>
          <CheckBoxFilter
            label="Private"
            checked={false}
            onChange={() => {}}
          />
        </div>
      </FilterSection>

      {/* Religion Filter */}
      <FilterSection 
        title="Religion" 
        sectionId="religion"
        expanded={expandedSections.has('religion')}
        onToggle={() => toggleSection('religion')}
      >
        <div className="space-y-0">
          {[
            { value: "catholic", label: "Catholic" },
            { value: "christian", label: "Christian" },
            { value: "jewish", label: "Jewish" },
            { value: "islamic", label: "Islamic" },
          ].map((religion) => (
            <CheckBoxFilter
              key={religion.value}
              label={religion.label}
              checked={false}
              onChange={() => {}}
            />
          ))}
        </div>
      </FilterSection>

      {/* Specialty Filter */}
      <FilterSection 
        title="Specialty" 
        sectionId="specialty"
        expanded={expandedSections.has('specialty')}
        onToggle={() => toggleSection('specialty')}
      >
        <div className="space-y-0">
          {[
            { value: "online", label: "Online" },
            { value: "special-ed", label: "Special Education" },
            { value: "montessori", label: "Montessori" },
            { value: "therapeutic", label: "Therapeutic" },
          ].map((specialty) => (
            <CheckBoxFilter
              key={specialty.value}
              label={specialty.label}
              checked={false}
              onChange={() => {}}
            />
          ))}
        </div>
      </FilterSection>

      {/* Highest Grade Offered */}
      <FilterSection 
        title="Highest grade offered" 
        sectionId="highest-grade"
        expanded={expandedSections.has('highest-grade')}
        onToggle={() => toggleSection('highest-grade')}
      >
        <GradeSelect
          value={highestGrade}
          onChange={setHighestGrade}
        />
      </FilterSection>

      {/* Boarding Status */}
      <FilterSection 
        title="Boarding status" 
        sectionId="boarding"
        expanded={expandedSections.has('boarding')}
        onToggle={() => toggleSection('boarding')}
      >
        <ToggleSwitch
          checked={boardingStatus}
          onChange={() => setBoardingStatus(!boardingStatus)}
        />
      </FilterSection>

      {/* Coed Status */}
      <FilterSection 
        title="Coed status" 
        sectionId="coed"
        expanded={expandedSections.has('coed')}
        onToggle={() => toggleSection('coed')}
      >
        <SegmentControl
          options={[
            { value: "coed", label: "Coed" },
            { value: "girls", label: "All-girls" },
            { value: "boys", label: "All-boys" },
          ]}
          value={coedStatus}
          onChange={setCoedStatus}
        />
      </FilterSection>
    </div>
  );

  const renderFilters = () => {
    switch (establishment) {
      case "K-12":
        return renderK12Filters();
      case "Colleges":
        return renderK12Filters(); // Use same structure for now
      case "Graduates":
        return renderK12Filters(); // Use same structure for now
      case "District":
        return renderK12Filters(); // Use same structure for now
      default:
        return renderK12Filters();
    }
  };

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
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-2xl"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {renderFilters()}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFiltersDrawer; 