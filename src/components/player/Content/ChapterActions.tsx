'use client';

import { FC } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';

interface ChapterActionsProps {
  sources: Array<{
    logo: string;
    alt: string;
  }>;
  sourceCount: number;
  highlightCount: number;
  commentCount: number;
}

export const ChapterActions: FC<ChapterActionsProps> = ({
  sources,
  sourceCount,
  highlightCount,
  commentCount
}) => {
  return (
    <div className="flex items-center justify-between mb-2">
      {/* Left side - Sources */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-gray-50 rounded-full px-3 py-1.5">
          <div className="flex -space-x-2 mr-2">
            {sources.slice(0, 3).map((source, index) => (
              <div 
                key={index} 
                className="w-6 h-6 rounded-full bg-white overflow-hidden ring-2 ring-white"
              >
                <Image
                  src={source.logo}
                  alt={source.alt}
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-600">{sourceCount} sources</span>
        </div>

        <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
          <Icon name="link" className="w-5 h-5 text-gray-600" />
        </button>

        <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
          <Icon name="copy" className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Right side - Highlights & Comments */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition-colors">
          <Icon name="highlight" className="w-4 h-4" />
          <span>{highlightCount}</span>
        </button>

        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition-colors">
          <Icon name="message" className="w-4 h-4" />
          <span>{commentCount}</span>
        </button>

        <button className="p-1.5 hover:bg-gray-50 rounded-full transition-colors">
          <Icon name="more" className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}; 