'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Portal } from '@/components/ui/Portal';

interface School {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  tags: string[];
  description: string;
  expanded: boolean;
}

interface Feature {
  key: string;
  label: string;
  icon: string;
  tooltip: string;
  values: string[];
}

interface CompareItemsMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompareItemsMobile: React.FC<CompareItemsMobileProps> = ({ isOpen, onClose }) => {
  const [currentSchool, setCurrentSchool] = useState(0);
  const [schools, setSchools] = useState<School[]>([
    {
      id: '1',
      name: 'Harvard University',
      image: 'https://i.ibb.co/J8QjpbD/school1.webp',
      rating: 4.9,
      reviewCount: 5347,
      location: 'Cambridge, MA',
      tags: ['Research', 'Liberal Arts'],
      description: 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636, Harvard is the oldest institution of higher education in the United States.',
      expanded: false
    },
    {
      id: '2',
      name: 'Stanford University',
      image: 'https://i.ibb.co/J8QjpbD/school1.webp',
      rating: 4.8,
      reviewCount: 4892,
      location: 'Stanford, CA',
      tags: ['Research', 'Liberal Arts', 'Academic'],
      description: 'Stanford University is a private research university in Stanford, California. Known for its academic strength, wealth, and proximity to Silicon Valley.',
      expanded: false
    },
    {
      id: '3',
      name: 'MIT',
      image: 'https://i.ibb.co/J8QjpbD/school1.webp',
      rating: 4.7,
      reviewCount: 3245,
      location: 'Cambridge, MA',
      tags: ['Research', 'Liberal Arts'],
      description: 'Massachusetts Institute of Technology is a private research university in Cambridge. Known for its research and education in the physical sciences and engineering.',
      expanded: false
    },
    {
      id: '4',
      name: 'Yale University',
      image: 'https://i.ibb.co/J8QjpbD/school1.webp',
      rating: 4.6,
      reviewCount: 2891,
      location: 'New Haven, CT',
      tags: ['Research', 'Liberal Arts'],
      description: 'Yale University is a private Ivy League research university in New Haven, Connecticut. Founded in 1701, Yale is one of the nine Colonial Colleges.',
      expanded: false
    },
    {
      id: '5',
      name: 'Princeton',
      image: 'https://i.ibb.co/J8QjpbD/school1.webp',
      rating: 4.8,
      reviewCount: 2654,
      location: 'Princeton, NJ',
      tags: ['Research', 'Liberal Arts'],
      description: 'Princeton University is a private Ivy League research university in Princeton, New Jersey. Founded in 1746, Princeton is the fourth-oldest college in the United States.',
      expanded: false
    }
  ]);

  const features: Feature[] = [
    {
      key: 'overallRank',
      label: 'Overall Rank',
      icon: 'rank',
      tooltip: 'Overall school ranking',
      values: ['A+', 'A', 'A-', 'A+', 'A']
    },
    {
      key: 'academicsRank',
      label: 'Academics Rank',
      icon: 'graduationRate',
      tooltip: 'Academic quality ranking',
      values: ['A+', 'A', 'A-', 'A', 'A+']
    },
    {
      key: 'diversityRank',
      label: 'Diversity Rank',
      icon: 'enrollment',
      tooltip: 'Campus diversity ranking',
      values: ['B+', 'A-', 'A', 'B', 'A-']
    },
    {
      key: 'teacherRank',
      label: 'Teacher Rank',
      icon: 'studentRatio',
      tooltip: 'Teaching quality ranking',
      values: ['A', 'A+', 'A-', 'A', 'A+']
    },
    {
      key: 'duration',
      label: 'Duration',
      icon: 'duration',
      tooltip: 'Standard program duration',
      values: ['4 yr', '4 yr', '4 yr', '4 yr', '4 yr']
    },
    {
      key: 'location',
      label: 'Location',
      icon: 'location',
      tooltip: 'School location',
      values: ['Cambridge, MA', 'Stanford, CA', 'Cambridge, MA', 'New Haven, CT', 'Princeton, NJ']
    },
    {
      key: 'enrollment',
      label: 'Students',
      icon: 'enrollment',
      tooltip: 'Total student enrollment',
      values: ['6,858', '7,064', '4,638', '5,964', '5,267']
    },
    {
      key: 'acceptanceRate',
      label: 'Acceptance Rate',
      icon: 'acceptanceRate',
      tooltip: 'Percentage of applicants admitted',
      values: ['11%', '6%', '7%', '9%', '8%']
    },
    {
      key: 'graduationRate',
      label: 'Graduation Rate',
      icon: 'graduationRate',
      tooltip: 'Percentage of students who graduate',
      values: ['92%', '94%', '93%', '91%', '95%']
    },
    {
      key: 'studentRatio',
      label: 'Student Ratio',
      icon: 'studentRatio',
      tooltip: 'Student to faculty ratio',
      values: ['7:1', '5:1', '3:1', '6:1', '5:1']
    },
    {
      key: 'website',
      label: 'Website',
      icon: 'website',
      tooltip: 'Official school website',
      values: ['harvard.edu', 'stanford.edu', 'mit.edu', 'yale.edu', 'princeton.edu']
    }
  ];

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Node;
    if (modalRef.current && !modalRef.current.contains(target)) {
      // Додаткова перевірка: переконаємося, що клік не на backdrop
      const backdrop = document.querySelector('[data-backdrop="compare-mobile"]');
      if (backdrop && backdrop.contains(target)) {
        onClose();
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      try {
        if (document) {
          document.removeEventListener('mousedown', handleClickOutside);
        }
      } catch (error) {
        console.warn('Error removing event listener:', error);
      }
    };
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const toggleDescription = (schoolId: string) => {
    setSchools(prevSchools => 
      prevSchools.map(school => 
        school.id === schoolId 
          ? { ...school, expanded: !school.expanded }
          : school
      )
    );
  };

  const removeSchool = (schoolId: string) => {
    setSchools(prevSchools => {
      const newSchools = prevSchools.filter(school => school.id !== schoolId);
      if (currentSchool >= newSchools.length) {
        setCurrentSchool(Math.max(0, newSchools.length - 1));
      }
      return newSchools;
    });
  };

  const scrollToSchool = (schoolIndex: number) => {
    if (schoolIndex < 0 || schoolIndex >= schools.length) return;
    setCurrentSchool(schoolIndex);
  };

  const nextSchool = () => {
    if (currentSchool < schools.length - 1) {
      setCurrentSchool(currentSchool + 1);
    }
  };

  const prevSchool = () => {
    if (currentSchool > 0) {
      setCurrentSchool(currentSchool - 1);
    }
  };

  if (!isOpen) return null;

  const currentSchoolData = schools[currentSchool];
  const currentSchoolFeatures = features.map(feature => ({
    ...feature,
    value: feature.values[currentSchool] || ''
  }));

  return (
    <Portal containerId="compare-panel-portal">
      <div className="fixed inset-0 z-[1001] md:hidden">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-25 transition-opacity duration-300" 
          onClick={onClose}
          data-backdrop="compare-mobile"
        />
        
        {/* Mobile Frame */}
        <div 
          ref={modalRef}
          className={cn(
            "fixed left-0 right-0 w-full bg-surface overflow-hidden"
          )}
          style={{ 
            top: '64px',
            height: 'calc(100vh - 64px)',
            borderRadius: '20px 20px 0 0',
            boxShadow: '0 -4px 12px var(--shadow-color)'
          }}
        >
        {/* Drawer Handle */}
        <div 
          className="relative h-6 flex justify-center items-center bg-surface cursor-pointer py-2.5 z-[100]"
          onClick={onClose}
        >
          <div className="w-8 h-1 rounded-full" style={{ backgroundColor: 'var(--gray-300)' }} />
        </div>
        
        {/* Content */}
        <div 
          className="h-[calc(100%-24px)] overflow-y-auto flex flex-col"
          style={{ backgroundColor: 'transparent' }}
        >
        {/* Header */}
        <div className="p-4 border-b border-theme bg-surface sticky top-0 z-10 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#016853]">Compare Schools</h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-white border-none rounded-full flex items-center justify-center cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#262B3D]">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* School Navigation */}
        <div className="p-4 border-b border-theme bg-surface sticky top-[73px] z-10 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#5F5F5F]">School {currentSchool + 1} of {schools.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={prevSchool}
                disabled={currentSchool <= 0}
                className="w-8 h-8 rounded-full border border-[rgba(0,0,0,0.1)] bg-white text-[#5F5F5F] cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#346DC2] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                onClick={nextSchool}
                disabled={currentSchool >= schools.length - 1}
                className="w-8 h-8 rounded-full border border-[rgba(0,0,0,0.1)] bg-white text-[#5F5F5F] cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#346DC2] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1 bg-[#f0f0f0] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#016853] rounded-full transition-all duration-300"
              style={{ width: `${((currentSchool + 1) / schools.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Current School Info */}
          {currentSchoolData && (
            <div className="p-4 border-b border-theme">
              <div className="flex items-start gap-3">
                <img 
                  src={currentSchoolData.image} 
                  alt={currentSchoolData.name} 
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-[#464646] mb-1">{currentSchoolData.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <svg className="text-[#00DF8B] w-3 h-3" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <span className="font-semibold text-[#464646] text-sm">{currentSchoolData.rating}</span>
                    <span className="text-[#5F5F5F] text-xs">({currentSchoolData.reviewCount.toLocaleString()})</span>
                  </div>
                  <div className="text-[#5F5F5F] text-xs mb-2">{currentSchoolData.location}</div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {currentSchoolData.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="bg-[rgba(0,0,0,0.05)] px-2 py-1 rounded-xl text-xs text-[#5F5F5F]">
                        {tag}
                      </span>
                    ))}
                    {currentSchoolData.tags.length > 2 && (
                      <span className="bg-[rgba(0,0,0,0.08)] px-2 py-1 rounded-xl text-xs text-[#5F5F5F] font-medium">
                        +{currentSchoolData.tags.length - 2}
                      </span>
                    )}
                  </div>
                  <div className={`text-sm leading-[1.4] text-[#4A4A4A] mb-2 ${currentSchoolData.expanded ? '' : 'line-clamp-2'}`}>
                    {currentSchoolData.description}
                  </div>
                  <span 
                    className="text-[#346DC2] text-xs font-medium cursor-pointer"
                    onClick={() => toggleDescription(currentSchoolData.id)}
                  >
                    {currentSchoolData.expanded ? 'Less' : 'More'}
                  </span>
                </div>
                <button 
                  onClick={() => removeSchool(currentSchoolData.id)}
                  className="w-6 h-6 rounded-full bg-[rgba(0,0,0,0.05)] border-none flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[rgba(239,68,68,0.1)] hover:text-[#ef4444]"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-[#5F5F5F]">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Features Comparison */}
          <div className="p-4">
            <h4 className="text-sm font-semibold text-[#464646] mb-3">Comparison Details</h4>
            <div className="space-y-3">
              {currentSchoolFeatures.map((feature, index) => (
                <div key={feature.key} className="flex items-center justify-between py-2 border-b border-[#f3f4f6]">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 text-[#089E68] flex-shrink-0">
                      {/* Icon placeholder */}
                      <div className="w-full h-full bg-[#089E68] rounded-sm"></div>
                    </div>
                    <span className="text-sm font-medium text-[#464646]">{feature.label}</span>
                  </div>
                  <div className="text-sm font-medium text-[#464646]">
                    {feature.key.includes('Rank') ? (
                      <span className="bg-[#00DF8B] text-white px-2 py-1 rounded font-semibold text-xs">
                        {feature.value}
                      </span>
                    ) : (
                      feature.value
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-theme bg-surface flex-shrink-0">
          <div className="flex gap-3">
            <button className="flex-1 py-3 px-4 bg-[#016853] text-white border-none rounded-lg text-sm font-semibold cursor-pointer transition-colors hover:bg-[#014d3f]">
              Apply Now
            </button>
            <button className="flex-1 py-3 px-4 border border-[#346DC2] text-[#346DC2] bg-transparent rounded-lg text-sm font-semibold cursor-pointer transition-colors hover:bg-[#346DC2] hover:text-white">
              Learn More
            </button>
          </div>
        </div>
        </div>
        </div>
      </div>
    </Portal>
  );
};

export default CompareItemsMobile;
