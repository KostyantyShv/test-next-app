'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Portal } from '@/components/ui/Portal';
import CompareItemsMobile from './CompareItemsMobile';

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

interface CompareItemsProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompareItems: React.FC<CompareItemsProps> = ({ isOpen, onClose }) => {
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0);
  const [maxScrollPosition, setMaxScrollPosition] = useState(0);
  const [layout, setLayout] = useState<'grid' | 'list'>('list');
  const [listColumnStart, setListColumnStart] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

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

  const icons = {
    duration: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.0251 3.98957C12.6023 3.33626 14.2928 3 16 3C17.7072 3 19.3977 3.33626 20.9749 3.98957C22.5521 4.64288 23.9852 5.60045 25.1924 6.80761C26.3995 8.01477 27.3571 9.44788 28.0104 11.0251C28.6637 12.6023 29 14.2928 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3995 23.9852 25.1924 25.1924C23.9852 26.3995 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3995 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 14.2928 3.33625 12.6023 3.98957 11.0251C4.64288 9.44788 5.60045 8.01477 6.80761 6.80761C8.01477 5.60045 9.44788 4.64288 11.0251 3.98957ZM16 5C14.5555 5 13.1251 5.28452 11.7905 5.83733C10.4559 6.39013 9.24327 7.20038 8.22183 8.22183C7.20038 9.24327 6.39013 10.4559 5.83733 11.7905C5.28452 13.1251 5 14.5555 5 16C5 17.4445 5.28452 18.8749 5.83733 20.2095C6.39013 21.5441 7.20038 22.7567 8.22183 23.7782C9.24327 24.7996 10.4559 25.6099 11.7905 26.1627C13.1251 26.7155 14.5555 27 16 27C17.4445 27 18.8749 26.7155 20.2095 26.1627C21.5441 25.6099 22.7567 24.7996 23.7782 23.7782C24.7996 22.7567 25.6099 21.5441 26.1627 20.2095C26.7155 18.8749 27 17.4445 27 16C27 14.5555 26.7155 13.1251 26.1627 11.7905C25.6099 10.4559 24.7996 9.24327 23.7782 8.22183C22.7567 7.20038 21.5441 6.39013 20.2095 5.83733C18.8749 5.28452 17.4445 5 16 5ZM16 8.33333C16.5523 8.33333 17 8.78105 17 9.33333V15.4648L20.5547 17.8346C21.0142 18.141 21.1384 18.7618 20.8321 19.2214C20.5257 19.6809 19.9048 19.8051 19.4453 19.4987L15.4453 16.8321C15.1671 16.6466 15 16.3344 15 16V9.33333C15 8.78105 15.4477 8.33333 16 8.33333Z" fill="currentColor"></path></svg>`,
    location: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z"></path><path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1C18.6,5.5,19.8,8.4,19.2,11.2z"></path></svg>`,
    rank: `<svg viewBox="0 0 32 32"><path fill="currentColor" d="M10.8571 26.2857C10.8571 27.2325 10.0896 28 9.14286 28H5.71429C4.76751 28 4 27.2325 4 26.2857V22C4 21.0532 4.76751 20.2857 5.71429 20.2857H9.14286C10.0896 20.2857 10.8571 21.0532 10.8571 22V26.2857ZM19.4286 26.2857V14.2857C19.4286 13.3389 18.6611 12.5714 17.7143 12.5714H14.2857C13.3389 12.5714 12.5714 13.3389 12.5714 14.2857V26.2857C12.5714 27.2325 13.3389 28 14.2857 28H17.7143C18.6611 28 19.4286 27.2325 19.4286 26.2857ZM21.1429 26.2857C21.1429 27.2325 21.9104 28 22.8571 28H26.2857C27.2325 28 28 27.2325 28 26.2857V5.71429C28 4.76751 27.2325 4 26.2857 4H22.8571C21.9104 4 21.1429 4.76751 21.1429 5.71429V26.2857ZM17.7143 14.2857H14.2857V26.2857H17.7143V14.2857ZM26.2857 5.71429H22.8571V26.2857H26.2857V5.71429Z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>`,
    enrollment: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
    acceptanceRate: `<svg viewBox="0 0 18 18"><path d="m9.84 0 .001 7.243a1.948 1.948 0 1 1-1.64-.02V5.34a3.778 3.778 0 0 0 .824 7.462 3.776 3.776 0 0 0 3.207-5.77l1.358-.922A5.416 5.416 0 1 1 8.2 3.67V1.682a7.361 7.361 0 1 0 6.99 3.336l1.353-.918A8.908 8.908 0 0 1 18 9 9 9 0 1 1 8.202.035c.138-.012.276-.012.415-.008L9.84 0Z" fill="currentColor"></path></svg>`,
    graduationRate: `<svg viewBox="0 0 20 20" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.72154 3.47033C9.90035 3.39881 10.0998 3.39881 10.2786 3.47033L18.612 6.80366C18.8967 6.91756 19.0834 7.19334 19.0834 7.50002V12.5C19.0834 12.9142 18.7476 13.25 18.3334 13.25C17.9192 13.25 17.5834 12.9142 17.5834 12.5V8.6078L15.7501 9.34113V13.3334C15.7501 14.4243 14.9016 15.2566 13.871 15.7719C12.8053 16.3048 11.4126 16.5834 10.0001 16.5834C8.58758 16.5834 7.19484 16.3048 6.12914 15.7719C5.09852 15.2566 4.25008 14.4243 4.25008 13.3334V9.34113L1.38821 8.19638C1.10346 8.08248 0.916748 7.8067 0.916748 7.50002C0.916748 7.19334 1.10346 6.91756 1.38821 6.80366L9.72154 3.47033ZM5.29422 8.14324C5.2838 8.13879 5.27326 8.13457 5.2626 8.13059L3.68619 7.50002L10.0001 4.97446L16.314 7.50002L14.7376 8.13059C14.7269 8.13457 14.7164 8.13879 14.7059 8.14323L10.0001 10.0256L5.29422 8.14324ZM5.75008 9.94113V13.3334C5.75008 13.5685 5.95521 14.0079 6.79996 14.4303C7.60962 14.8351 8.76042 15.0834 10.0001 15.0834C11.2397 15.0834 12.3905 14.8351 13.2002 14.4303C14.0449 14.0079 14.2501 13.5685 14.2501 13.3334V9.94113L10.2786 11.5297C10.0998 11.6012 9.90035 11.6012 9.72154 11.5297L5.75008 9.94113Z" fill="currentColor"></path></svg>`,
    website: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2 0-.68.06-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08C6.03 6.34 7.57 5.06 9.4 4.44 8.8 5.55 8.35 6.75 8 8m-2.92 0C5.18 6.84 5.62 5.8 6.36 5 7.1 4.2 8.14 3.76 9.2 3.76s2.1.44 2.84 1.24c.74.8 1.18 1.84 1.28 2.96H8m6.92 0c-.35-1.25-.8-2.45-1.4-3.56 1.83.62 3.37 1.9 4.32 3.56m2.92 8H16c.35 1.25.8 2.45 1.4 3.56-1.83-.62-3.37-1.9-4.32-3.56M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97"/></svg>`,
    studentRatio: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm0 1c-1.33 0-4 .67-4 2v1h8v-1c0-1.33-2.67-2-4-2z"/></svg>`,
    help: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.961 7.19025C10.9071 7.1925 10.0724 7.55861 9.4967 7.98876C9.20858 8.20404 8.98273 8.43724 8.82543 8.65266C8.67602 8.85727 8.56436 9.07874 8.55632 9.26768L8.5561 9.27805C8.5561 9.60617 8.67937 9.83406 8.8129 9.96759C9.00138 10.1561 9.26165 10.2537 9.55122 10.2537C9.9432 10.2537 10.2167 9.97149 10.4099 9.76915C10.5689 9.60527 10.7399 9.43619 10.9807 9.30407C11.2186 9.17359 11.5364 9.07317 11.9902 9.07317C12.3037 9.07317 12.6935 9.15178 12.9967 9.30821C13.3039 9.46671 13.4634 9.66976 13.4634 9.90244C13.4634 9.94201 13.4476 9.99942 13.3899 10.0791C13.3318 10.1592 13.2413 10.2478 13.1175 10.3439C12.8694 10.5365 12.5258 10.7303 12.151 10.925C11.4834 11.2718 11.0976 11.687 10.8808 12.0765C10.665 12.4642 10.6244 12.8119 10.6244 13.0146C10.6244 13.2981 10.737 13.5642 10.9098 13.7601C11.0818 13.9552 11.3298 14.0976 11.6098 14.0976C12.08 14.0976 12.5999 13.7214 12.6048 13.1208C12.605 13.1205 12.6052 13.1198 12.6055 13.1188C12.6075 13.1125 12.6141 13.0923 12.6339 13.0568C12.6631 13.0044 12.7119 12.9357 12.7845 12.8578C12.9292 12.7025 13.1593 12.5207 13.4883 12.3674L13.5089 12.3578C14.0049 12.1247 15.4439 11.4484 15.4439 9.85366C15.4439 9.37659 15.2548 8.70854 14.7171 8.15873C14.1753 7.60477 13.301 7.19226 11.9707 7.19025L11.961 7.19025Z"></path><path d="M11.6585 14.6829C10.8692 14.6829 10.3902 15.3007 10.3902 15.9024C10.3902 16.4825 10.8299 17.1805 11.6585 17.1805C12.0616 17.1805 12.3767 17.0174 12.587 16.7664C12.7924 16.521 12.8878 16.2046 12.8878 15.9024C12.8878 15.3143 12.4605 14.6829 11.6585 14.6829Z"></path><path d="M12 2C6.48969 2 2 6.48969 2 12C2 17.5103 6.48969 22 12 22C17.5103 22 22 17.5103 22 12C22 6.48969 17.5103 2 12 2ZM3.8439 12C3.8439 7.50056 7.50056 3.8439 12 3.8439C16.4994 3.8439 20.1561 7.50056 20.1561 12C20.1561 16.4994 16.4994 20.1561 12 20.1561C7.50056 20.1561 3.8439 16.4994 3.8439 12Z"></path></svg>`
  };

  // Fullscreen overlay doesn't need click outside handler - only ESC key


  useEffect(() => {
    if (isOpen) {
      updateScrollConstraints();
      // Prevent body scroll when overlay is open
      document.body.style.overflow = 'hidden';
      document.body.classList.add('compare-open');
      document.documentElement.classList.add('compare-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('compare-open');
      document.documentElement.classList.remove('compare-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('compare-open');
      document.documentElement.classList.remove('compare-open');
    };
  }, [isOpen, schools]);

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

  const updateScrollConstraints = () => {
    const totalCards = schools.length;
    const visibleCards = Math.floor(1075 / 260); // 1075px visible width, 260px per card
    const newMaxScrollPosition = Math.max(0, totalCards - visibleCards);
    setMaxScrollPosition(newMaxScrollPosition);
    
    if (currentScrollPosition > newMaxScrollPosition) {
      setCurrentScrollPosition(newMaxScrollPosition);
    }
  };

  const scrollPrev = () => {
    if (currentScrollPosition > 0) {
      setCurrentScrollPosition(Math.max(0, currentScrollPosition - 4));
    }
  };

  const scrollNext = () => {
    if (currentScrollPosition < maxScrollPosition) {
      setCurrentScrollPosition(Math.min(maxScrollPosition, currentScrollPosition + 4));
    }
  };

  const listPrev = () => {
    if (listColumnStart > 0) {
      setListColumnStart(Math.max(0, listColumnStart - columnsPerViewList));
    }
  };

  const listNext = () => {
    if (listColumnStart < maxListStart) {
      setListColumnStart(Math.min(maxListStart, listColumnStart + columnsPerViewList));
    }
  };

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
    setSchools(prevSchools => prevSchools.filter(school => school.id !== schoolId));
  };

  const getGradeClass = (grade: string) => {
    const gradeMap: Record<string, string> = {
      'A+': 'bg-[#00DF8B]',
      'A': 'bg-[#089E68]',
      'A-': 'bg-[#1ad598]',
      'B+': 'bg-[#4CAF50]',
      'B': 'bg-[#346DC2]',
      'B-': 'bg-[#8BC34A]',
      'C+': 'bg-[#FFA500]',
      'C': 'bg-[#FF8C00]',
      'C-': 'bg-[#FF7F00]'
    };
    return gradeMap[grade] || 'bg-[#FF8C00]';
  };

  const handlePaginationClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;

    if (layout === 'grid') {
    const targetPosition = Math.round(clickPosition * maxScrollPosition);
    setCurrentScrollPosition(Math.max(0, Math.min(maxScrollPosition, targetPosition)));
    } else {
      const targetPosition = Math.round(clickPosition * maxListStart);
      setListColumnStart(Math.max(0, Math.min(maxListStart, targetPosition)));
    }
  };

  // List view pagination constants
  const columnsPerViewList = 6;
  const totalFeatureColumns = features.length;
  const maxListStart = Math.max(0, totalFeatureColumns - columnsPerViewList);
  const listStartIndex = listColumnStart + 1;
  const listEndIndex = Math.min(listColumnStart + columnsPerViewList, totalFeatureColumns);
  const listProgressWidth =
    totalFeatureColumns > columnsPerViewList
      ? ((listColumnStart + columnsPerViewList) / totalFeatureColumns) * 100
      : 100;

  const scrollDistance = currentScrollPosition * 260;
  const totalPages = maxScrollPosition + 1;
  const currentPage = currentScrollPosition + 1;
  const progressWidth = (currentPage / totalPages) * 100;

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Version */}
      <CompareItemsMobile isOpen={isOpen} onClose={onClose} />
      
      {/* Desktop Version - Fullscreen Overlay */}
      <Portal containerId="compare-items-portal">
        <div className={cn(
          "fixed inset-0 z-[1001] hidden md:block bg-[var(--surface-color)] overflow-hidden",
          "opacity-0 visibility-hidden transition-all duration-300",
          isOpen && "opacity-100 visibility-visible"
        )}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="fixed top-6 right-6 w-8 h-8 bg-[var(--surface-color)] border-none rounded-full flex items-center justify-center cursor-pointer z-[1003] shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[var(--dark-text)]">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Overlay Content */}
        <div className="pt-10 px-5 pb-5 bg-[var(--surface-color)] min-h-screen">
          <div className="max-w-[1200px] mx-auto">
            {/* Table Header with Title, Layout Toggle and Pagination */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-5">
                <h2 className="text-[28px] font-semibold text-[var(--header-green)] mb-0 text-left font-inter">Compare with similar schools</h2>
                
                {/* Layout Toggle */}
                <div className="inline-flex bg-[var(--background-color)] rounded-lg p-1 gap-1">
                  <button
                    onClick={() => setLayout('grid')}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2 border-none rounded-md text-sm font-medium font-inter cursor-pointer transition-all duration-200 whitespace-nowrap",
                      layout === 'grid'
                        ? "bg-[var(--dark-text)] text-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                        : "bg-transparent text-[var(--subtle-text)] hover:bg-[rgba(38,43,61,0.05)] hover:text-[var(--bold-text)]"
                    )}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0">
                      <path d="M5.5 4h4c.83 0 1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5h-4A1.5 1.5 0 0 1 4 9.5v-4C4 4.67 4.67 4 5.5 4zm9 0h4c.83 0 1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5h-4A1.5 1.5 0 0 1 13 9.5v-4c0-.83.67-1.5 1.5-1.5zm0 9h4c.83 0 1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5v-4c0-.83.67-1.5 1.5-1.5zm-9 0h4c.83 0 1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5h-4A1.5 1.5 0 0 1 4 18.5v-4c0-.83.67-1.5 1.5-1.5zm0-7.5v4h4v-4h-4zm9 0v4h4v-4h-4zm0 9v4h4v-4h-4zm-9 0v4h4v-4h-4z" fill="currentColor" />
                    </svg>
                    Grid
                  </button>
                  <button
                    onClick={() => setLayout('list')}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2 border-none rounded-md text-sm font-medium font-inter cursor-pointer transition-all duration-200 whitespace-nowrap",
                      layout === 'list'
                        ? "bg-[var(--dark-text)] text-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                        : "bg-transparent text-[var(--subtle-text)] hover:bg-[rgba(38,43,61,0.05)] hover:text-[var(--bold-text)]"
                    )}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0">
                      <path d="M11.75 5.25h7.5a.75.75 0 1 1 0 1.5h-7.5a.75.75 0 1 1 0-1.5zm0 6h7.5a.75.75 0 1 1 0 1.5h-7.5a.75.75 0 1 1 0-1.5zm0 6h7.5a.75.75 0 1 1 0 1.5h-7.5a.75.75 0 1 1 0-1.5zM6 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fillRule="evenodd" fill="currentColor" />
                    </svg>
                    List
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={layout === 'grid' ? scrollPrev : listPrev}
                  disabled={layout === 'grid' ? currentScrollPosition <= 0 : listColumnStart <= 0}
                  className="w-9 h-9 rounded-[18px] border border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--subtle-text)] cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[var(--hover-bg)] hover:text-[var(--link-text)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div 
                  className="w-[120px] h-1 bg-[var(--gray-200)] rounded-[2px] relative overflow-hidden cursor-pointer"
                  onClick={handlePaginationClick}
                >
                  <div 
                    className="absolute left-0 top-0 h-full bg-[var(--header-green)] rounded-[2px] transition-[width] duration-300"
                    style={{ width: `${layout === 'grid' ? progressWidth : Math.min(listProgressWidth, 100)}%` }}
                  ></div>
                </div>
                <div className="text-sm text-[var(--subtle-text)] min-w-[60px] text-center font-inter">
                  {layout === 'grid'
                    ? `${currentPage}/${totalPages}`
                    : `${listStartIndex}-${listEndIndex}/${totalFeatureColumns}`}
                </div>
                <button 
                  onClick={layout === 'grid' ? scrollNext : listNext}
                  disabled={
                    layout === 'grid'
                      ? currentScrollPosition >= maxScrollPosition
                      : listColumnStart >= maxListStart
                  }
                  className="w-9 h-9 rounded-[18px] border border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--subtle-text)] cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[var(--hover-bg)] hover:text-[var(--link-text)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Comparison Wrapper */}
            <div className="relative border border-[var(--border-color)] rounded-xl bg-[var(--surface-color)] overflow-hidden">
              {layout === 'grid' ? (
                /* Grid View */
              <div className="table w-full border-collapse border-spacing-0">
                <div className="table-row bg-[var(--surface-secondary)]">
                  <div className="table-cell w-[200px] min-w-[200px] p-0 bg-[var(--surface-secondary)] border-r border-[var(--border-color)] sticky left-0 z-10"></div>
                  <div className="table-cell overflow-x-hidden w-[1075px] relative">
                    <div 
                      className="flex w-max min-w-[1075px]"
                      style={{ transform: `translateX(-${scrollDistance}px)` }}
                    >
                      {schools.map((school, index) => (
                        <div key={school.id} className="min-w-[260px] flex-[0_0_260px] p-5 border-r border-[var(--border-color)] border-b border-[var(--border-color)] bg-[var(--surface-color)] relative last:border-r-0">
                          <button 
                            onClick={() => removeSchool(school.id)}
                            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[var(--gray-100)] border-none flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[rgba(239,68,68,0.1)] hover:text-[#ef4444]"
                          >
                            <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-[var(--subtle-text)]">
                              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          
                          <img src={school.image} alt={school.name} className="w-12 h-12 rounded-lg object-cover mb-3" />
                          <h3 className="text-base font-semibold text-[var(--bold-text)] mb-2 leading-[1.3] font-inter">{school.name}</h3>
                          
                          <div className="flex items-center gap-1.5 mb-2">
                            <svg className="text-[var(--grade-badge)] w-3.5 h-3.5" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                            <span className="font-semibold text-[var(--bold-text)] text-sm font-inter">{school.rating}</span>
                            <span className="text-[var(--subtle-text)] text-xs font-inter">({school.reviewCount.toLocaleString()})</span>
                          </div>
                          
                          <div className="text-[var(--subtle-text)] text-xs mb-2 font-inter">{school.location}</div>
                          
                          <div className="flex flex-wrap gap-1 mb-3 items-center min-h-6 overflow-hidden">
                            {school.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span key={tagIndex} className="bg-[var(--gray-100)] px-2 py-1 rounded-xl text-xs text-[var(--subtle-text)] whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px] flex-shrink-0 font-inter">
                                {tag}
                              </span>
                            ))}
                            {school.tags.length > 2 && (
                              <span className="bg-[var(--gray-200)] px-2 py-1 rounded-xl text-xs text-[var(--subtle-text)] font-medium whitespace-nowrap flex-shrink-0 ml-auto font-inter">
                                +{school.tags.length - 2}
                              </span>
                            )}
                          </div>
                          
                          <div className={`text-sm leading-[1.4] text-[var(--text-default)] mb-2 overflow-hidden font-inter ${school.expanded ? '' : 'line-clamp-2'}`}>
                            {school.description}
                          </div>
                          <span 
                            className="text-[var(--link-text)] text-xs font-medium cursor-pointer mb-3 inline-block font-inter"
                            onClick={() => toggleDescription(school.id)}
                          >
                            {school.expanded ? 'Less' : 'More'}
                          </span>
                          
                          <div className="flex justify-between items-center pt-3 border-t border-[var(--border-color)]">
                            <button className="text-[var(--header-green)] font-semibold text-xs bg-none border-none cursor-pointer p-0 font-inter">Apply Now</button>
                            <div className="flex items-center gap-1 text-[var(--link-text)] font-medium text-xs cursor-pointer font-inter">
                              Learn More
                              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                <path d="M8 3.33334L7.06 4.27334L10.78 8.00001L7.06 11.7267L8 12.6667L12.6667 8.00001L8 3.33334Z" fill="currentColor"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="table-row-group">
                  {features.map((feature, featureIndex) => (
                    <div key={feature.key} className={`table-row ${featureIndex % 2 === 1 ? 'bg-[var(--gray-100)]' : ''}`}>
                      <div className="table-cell w-[200px] min-w-[200px] p-4 bg-inherit border-r border-[var(--border-color)] sticky left-0 z-[5]">
                        <div className="flex items-center gap-2 text-[var(--bold-text)] text-sm font-semibold font-inter">
                          <div 
                            className="w-4 h-4 text-[var(--success-green)] flex-shrink-0"
                            dangerouslySetInnerHTML={{ __html: icons[feature.icon as keyof typeof icons] }}
                          />
                          {feature.label}
                          <div className="relative inline-block">
                            <div 
                              className="w-3.5 h-3.5 text-[var(--subtle-text)] cursor-help flex-shrink-0"
                              dangerouslySetInnerHTML={{ __html: icons.help }}
                            />
                            <span className="invisible absolute z-10 bottom-[125%] left-1/2 transform -translate-x-1/2 w-[200px] bg-[var(--tooltip-bg)] text-[var(--tooltip-text)] text-center py-2 px-3 rounded-md text-xs opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 font-inter">
                              {feature.tooltip}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="table-cell overflow-x-hidden relative">
                        <div 
                          className="flex w-max min-w-[1075px]"
                          style={{ transform: `translateX(-${scrollDistance}px)` }}
                        >
                          {feature.values.map((value, valueIndex) => (
                            <div key={valueIndex} className="min-w-[260px] flex-[0_0_260px] p-4 border-r border-[var(--border-color)] flex items-center justify-center text-center font-medium text-[var(--bold-text)] text-sm last:border-r-0 font-inter">
                              {feature.key.includes('Rank') ? (
                                <span className="bg-[var(--grade-badge)] text-white px-2 py-1 rounded font-semibold text-[13px] font-inter">
                                  {value}
                                </span>
                              ) : (
                                value
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="table-row border-t border-[var(--border-color)]">
                  <div className="table-cell w-[200px] min-w-[200px] bg-[var(--surface-secondary)] border-r border-[var(--border-color)]"></div>
                  <div className="table-cell overflow-x-hidden relative">
                    <div 
                      className="flex w-max min-w-[1075px]"
                      style={{ transform: `translateX(-${scrollDistance}px)` }}
                    >
                      {schools.map((school, index) => (
                        <div key={school.id} className="min-w-[260px] flex-[0_0_260px] p-5 border-r border-[var(--border-color)] flex justify-between items-center bg-[var(--surface-secondary)] last:border-r-0">
                          <button className="text-[var(--header-green)] font-semibold text-xs bg-none border-none cursor-pointer p-0 font-inter">Apply Now</button>
                          <div className="flex items-center gap-1 text-[var(--link-text)] font-medium text-xs cursor-pointer font-inter">
                            Learn More
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                              <path d="M8 3.33334L7.06 4.27334L10.78 8.00001L7.06 11.7267L8 12.6667L12.6667 8.00001L8 3.33334Z" fill="currentColor"/>
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              ) : (
                /* List View - Table */
                <div className="w-full overflow-x-hidden bg-[var(--surface-color)]">
                  <table className="w-full border-collapse table-fixed">
                    <thead>
                      <tr>
                        <th className="align-top text-left bg-[#f8f9fa] px-3 py-4 border-b border-r border-[rgba(0,0,0,0.08)] w-[280px] min-w-[280px] sticky left-0 z-10">
                          <span className="text-[14px] font-semibold text-[#016853] font-inter">School</span>
                        </th>
                        {features
                          .slice(listColumnStart, listColumnStart + columnsPerViewList)
                          .map((feature) => (
                            <th
                              key={feature.key}
                              className="align-top bg-[#f8f9fa] px-3 py-4 border-b border-l border-[rgba(0,0,0,0.08)] min-w-[140px] text-center"
                            >
                              <div className="flex flex-col items-center gap-1.5">
                                <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#016853] font-inter">
                                  <div
                                    className="w-[14px] h-[14px] text-[#089E68] flex-shrink-0"
                                    dangerouslySetInnerHTML={{ __html: icons[feature.icon as keyof typeof icons] }}
                                  />
                                  <span>{feature.label}</span>
                                  <div className="relative inline-flex items-center group">
                                    <div
                                      className="w-3 h-3 text-[#5F5F5F] cursor-help flex-shrink-0 mt-0.5"
                                      dangerouslySetInnerHTML={{ __html: icons.help }}
                                    />
                                    <span className="invisible absolute z-10 bottom-[125%] left-1/2 transform -translate-x-1/2 w-[200px] bg-[#333] text-white text-center py-2 px-3 rounded-md text-[12px] opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 font-inter">
                                      {feature.tooltip}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {schools.map((school, schoolIndex) => (
                        <tr
                          key={school.id}
                          className="odd:bg-[var(--surface-color)] even:bg-[rgba(0,0,0,0.02)] hover:bg-[rgba(1,104,83,0.02)]"
                        >
                          {/* School column */}
                          <td className="align-top px-3 py-4 border-b border-r border-[rgba(0,0,0,0.08)] w-[280px] min-w-[280px] sticky left-0 z-[5] bg-inherit">
                            <div className="flex items-start gap-3 relative">
                              <button
                                onClick={() => removeSchool(school.id)}
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[rgba(0,0,0,0.05)] border-none flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[rgba(239,68,68,0.1)] z-[5]"
                              >
                                <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-[var(--subtle-text)]">
                                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                              <img src={school.image} alt={school.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-2">
                                  <div className="text-[14px] font-semibold text-[#464646] leading-[1.3] font-inter">{school.name}</div>
                                  <div className="relative inline-flex items-center group">
                                    <div className="w-4 h-4 bg-[rgba(0,0,0,0.1)] rounded-full flex items-center justify-center cursor-help flex-shrink-0">
                                      <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 text-[var(--subtle-text)]">
                                        <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </div>
                                    <div className="invisible absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 bg-[#333] text-white py-2 px-3 rounded-md text-[12px] leading-[1.4] w-[250px] opacity-0 transition-all duration-200 z-[1000] text-left group-hover:visible group-hover:opacity-100 font-inter">
                                      {school.description}
                                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-[#333]"></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 mb-2">
                                  <svg className="text-[#00DF8B] w-3.5 h-3.5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                  </svg>
                                  <span className="font-semibold text-[#464646] text-[14px] font-inter">{school.rating}</span>
                                  <span className="text-[var(--subtle-text)] text-[12px] font-inter">({school.reviewCount.toLocaleString()})</span>
                                </div>
                                <div className="flex flex-wrap gap-1 items-center min-h-6">
                                  {school.tags.slice(0, 2).map((tag, tagIndex) => (
                                    <span key={tagIndex} className="bg-[rgba(0,0,0,0.05)] px-2 py-1 rounded-xl text-[11px] text-[var(--subtle-text)] whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px] flex-shrink-0 font-inter">
                                      {tag}
                                    </span>
                                  ))}
                                  {school.tags.length > 2 && (
                                    <span className="bg-[rgba(0,0,0,0.08)] px-2 py-1 rounded-xl text-[11px] text-[var(--subtle-text)] font-medium whitespace-nowrap flex-shrink-0 font-inter">
                                      +{school.tags.length - 2}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Data columns */}
                          {features
                            .slice(listColumnStart, listColumnStart + columnsPerViewList)
                            .map((feature) => {
                              const value = feature.values[schoolIndex];
                              return (
                                <td
                                  key={feature.key}
                                  className="align-middle px-3 py-4 border-b border-l border-[rgba(0,0,0,0.08)] text-center min-w-[140px]"
                                >
                                  {feature.key.includes('Rank') ? (
                                    <span className={`inline-flex items-center justify-center min-w-[40px] h-7 px-2 py-1 rounded-md font-semibold text-[13px] text-white font-inter ${getGradeClass(value)}`}>
                                      {value}
                                    </span>
                                  ) : feature.key === 'website' ? (
                                    <a
                                      href={`https://${value.replace(/^https?:\/\//, '')}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-[var(--link-text)] font-medium text-[14px] hover:underline font-inter"
                                    >
                                      {value.replace('https://www.', '').replace('https://', '')}
                                    </a>
                                  ) : (
                                    <span className="text-[14px] font-medium text-[#464646] font-inter">
                                      {value}
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Pagination Wrapper */}
            <div className="w-full max-w-[1200px] mx-auto mt-8 relative">
              <div className="flex justify-center items-center gap-4 w-full">
                <button 
                  onClick={layout === 'grid' ? scrollPrev : listPrev}
                  disabled={layout === 'grid' ? currentScrollPosition <= 0 : listColumnStart <= 0}
                  className="w-9 h-9 rounded-[18px] border border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--subtle-text)] cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[var(--hover-bg)] hover:text-[var(--link-text)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div 
                  className="w-full h-1 bg-[var(--gray-200)] rounded-[2px] relative overflow-hidden cursor-pointer"
                  onClick={handlePaginationClick}
                >
                  <div 
                    className="absolute left-0 top-0 h-full bg-[var(--header-green)] rounded-[2px] transition-[width] duration-300"
                    style={{ width: `${layout === 'grid' ? progressWidth : Math.min(listProgressWidth, 100)}%` }}
                  ></div>
                </div>
                <div className="text-sm text-[var(--subtle-text)] min-w-[60px] text-center font-inter">
                  {layout === 'grid'
                    ? `${currentPage}/${totalPages}`
                    : `${listStartIndex}-${listEndIndex}/${totalFeatureColumns}`}
                </div>
                <button 
                  onClick={layout === 'grid' ? scrollNext : listNext}
                  disabled={
                    layout === 'grid'
                      ? currentScrollPosition >= maxScrollPosition
                      : listColumnStart >= maxListStart
                  }
                  className="w-9 h-9 rounded-[18px] border border-[var(--border-color)] bg-[var(--surface-color)] text-[var(--subtle-text)] cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[var(--hover-bg)] hover:text-[var(--link-text)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </Portal>
    </>
  );
};

export default CompareItems;
