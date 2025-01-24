'use client';

import { FC, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Section {
  id: string;
  title: string;
  level: number;
  isActive?: boolean;
}

interface TableOfContentsProps {
  sections: Section[];
}

export const TableOfContents: FC<TableOfContentsProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0.5
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-4 p-4 pr-0">
      <div className="flex flex-col gap-2">
        {sections.map((section) => (
          <div
            key={section.id}
            className={cn(
              "relative pl-4",
              activeSection === section.id ? "border-l-2 border-[#222d2e] -ml-[2px]" : "border-l-2 border-gray-200"
            )}
          >
            <button
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "text-sm hover:text-[#222d2e] transition-colors text-left",
                activeSection === section.id 
                  ? "text-[#222d2e]" 
                  : "text-gray-500"
              )}
            >
              {section.title}
            </button>
          </div>
        ))}
      </div>
    </nav>
  );
}; 