'use client';

import { FC } from 'react';
import Image from 'next/image';

export interface SourceItem {
  id: string;
  title: string;
  source: string;
  sourceNumber: number;
  type: 'text' | 'image';
  content?: string;
  image?: string;
  sourceLogo: string; // URL логотипу джерела
}

interface SourceListProps {
  items: SourceItem[];
}

export const SourceList: FC<SourceListProps> = ({ items }) => {
  const displayItems = items.slice(0, 4);
  const remainingCount = Math.max(0, items.length - 3);
  const showViewMore = items.length > 3;

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {displayItems.map((item, index) => {
        if (index === 3 && showViewMore) {
          return (
            <div key="view-more" className="bg-blue-50 rounded-lg p-4 flex flex-col">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {items.slice(3).map((source) => (
                    <div 
                      key={source.id}
                      className="w-8 h-8 rounded-full bg-white overflow-hidden flex items-center justify-center"
                    >
                      <Image
                        src={source.sourceLogo}
                        alt={source.source}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-auto">
                View {remainingCount} more
              </div>
            </div>
          );
        }

        return (
          <div key={item.id} className="bg-blue-50 rounded-lg p-4 flex flex-col">
            {/* Main Content */}
            <div className="flex-1 mb-4">
              {item.type === 'image' && item.image ? (
                <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="text-sm">
                  {item.content}
                </div>
              )}
            </div>

            {/* Source Info */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white overflow-hidden flex items-center justify-center">
                <Image
                  src={item.sourceLogo}
                  alt={item.source}
                  width={20}
                  height={20}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-sm text-gray-600">
                {item.source} · {item.sourceNumber}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}; 