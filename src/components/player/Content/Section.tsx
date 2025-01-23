import { FC, ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const Section: FC<SectionProps> = ({ id, title, subtitle, children }) => {
  return (
    <div id={id} className="mb-12 mt-4">
      {subtitle && (
        <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
          {subtitle}
        </div>
      )}
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      {children}
    </div>
  );
}; 