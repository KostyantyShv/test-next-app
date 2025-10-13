'use client';

import React, { useEffect, useState } from 'react';

interface TopPerformersClientProps {
  children: React.ReactNode;
}

export const TopPerformersClient: React.FC<TopPerformersClientProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
};

