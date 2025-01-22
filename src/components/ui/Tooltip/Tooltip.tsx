import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  return (
    <div className="relative">
      {children}
      <div className="hidden group-hover:block">{content}</div>
    </div>
  );
}; 