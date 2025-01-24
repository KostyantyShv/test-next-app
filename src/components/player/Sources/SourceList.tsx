'use client';

import { FC } from 'react';
import Image from 'next/image';
import { useSidebar } from '@/store/use-sidebar';

export interface SourceItem {
  id: string;
  title: string;
  source: string;
  sourceNumber: number;
  type: 'text' | 'image';
  content?: string;
  image?: string;
  sourceLogo: string;
}

interface SourceListProps {
  items: SourceItem[];
}

export const SourceList: FC<SourceListProps> = ({ items }) => {
  const openWithTab = useSidebar(state => state.openWithTab);
  
  const displayItems = items.slice(0, 4);
  const remainingCount = Math.max(0, items.length - 3);
  const showViewMore = items.length > 3;

  const handleViewMore = () => {
    openWithTab('sources');
  };

  return (
    <div className="mt-4 relative w-full pb-5">
      <div className="absolute inset-0">
        <div className="overflow-x-auto h-full">
          <div className="flex gap-4 w-max">
            {displayItems.map((item, index) => {
              if (index === 3 && showViewMore) {
                return (
                  <button
                    key="view-more"
                    onClick={handleViewMore}
                    className="bg-blue-50 rounded-lg p-4 flex flex-col hover:bg-blue-100 transition-colors h-[185px] w-[200px]"
                  >
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
                  </button>
                );
              }

              return (
                <div 
                  key={item.id} 
                  className="bg-blue-50 rounded-lg p-4 flex flex-col h-[185px] w-[200px]"
                >
                  {/* Main Content */}
                  <div className="flex-1 min-h-0">
                    {item.type === 'image' && item.image ? (
                      <div className="h-[120px] relative rounded-lg overflow-hidden">
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
                  <div className="flex items-center gap-2 mt-2 shrink-0">
                    <div className="w-6 h-6 rounded-full bg-white overflow-hidden flex items-center justify-center shrink-0">
                      <Image
                        src={item.sourceLogo}
                        alt={item.source}
                        width={20}
                        height={20}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <span className="text-sm text-gray-600 truncate">
                      {item.source} · {item.sourceNumber}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="h-[189px]" aria-hidden="true" />
    </div>
  );
}; 