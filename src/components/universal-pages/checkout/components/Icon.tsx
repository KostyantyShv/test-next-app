import React from 'react';

interface IconProps {
  type: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ type, className = "w-4 h-4 md:w-4 md:h-4" }) => {
  const iconPaths: Record<string, React.ReactElement> = {
    'ad-free': (
      <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    ),
    compare: (
      <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    ),
    export: (
      <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    ),
    bell: (
      <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    ),
    clock: (
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    ),
    lock: (
      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    ),
    calendar: (
      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    ),
    eye: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="12" cy="12" r="3" stroke="#464646" strokeWidth="2" fill="none"/>
      </>
    ),
    shield: (
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    ),
    users: (
      <>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="9" cy="7" r="4" stroke="#464646" strokeWidth="2" fill="none"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M16 3.13a4 4 0 010 7.75" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </>
    ),
    chart: (
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    ),
    zap: (
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    ),
    search: (
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    ),
    mail: (
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    ),
  };

  return (
    <svg fill="#464646" viewBox="0 0 24 24" className={`${className} flex-shrink-0`}>
      {iconPaths[type] || iconPaths.clock}
    </svg>
  );
};

