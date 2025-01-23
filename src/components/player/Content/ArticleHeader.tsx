'use client';

import { FC } from 'react';

interface ArticleHeaderProps {
  title: string;
  subtitle: string;
  id?: string;
}

export const ArticleHeader: FC<ArticleHeaderProps> = ({ title, subtitle, id }) => {
  return (
    <div id={id} className="mb-2">
      {/* Subtitle */}
      <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
        {subtitle}
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}; 