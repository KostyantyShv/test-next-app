'use client';

import { FC, Fragment } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

interface ChapterMetaProps {
  tags: string[];
  relatedBooks: Array<{
    title: string;
    href: string;
  }>;
  sourcesCount: number;
}

export const ChapterMeta: FC<ChapterMetaProps> = ({ 
  tags, 
  relatedBooks,
  sourcesCount 
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Left side - Tags */}
      <div className="flex items-center gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            className="px-3 py-1.5 bg-gray-50 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <Icon name="check" className="w-4 h-4 shrink-0 text-primary" />
            {tag}
          </button>
        ))}
      </div>

      {/* Right side - Related Sources */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 rounded-full text-sm text-gray-600 w-fit">
        <Icon name="explore" className="w-4 h-4 shrink-0" />
        <span>Also in</span>
        {relatedBooks.map((book, index) => (
          <Fragment key={book.title}>
            <Link 
              href={book.href}
              className="font-bold hover:underline"
            >
              {book.title}
            </Link>
            {index < relatedBooks.length - 1 && (
              <span>•</span>
            )}
          </Fragment>
        ))}
        <span className="mx-2">|</span>
        <span>{sourcesCount} sources</span>
        <Icon name="arrow-right" className="w-4 h-4 ml-1" />
      </div>
    </div>
  );
}; 