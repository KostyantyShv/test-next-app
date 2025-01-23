'use client';

import { FC } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';

interface ArticleAuthorProps {
  theme: string;
  name: string;
  avatar?: string;
  meta: {
    duration: string;
    views: number;
    likes: number;
    rating: number;
    ratingCount: number;
  };
}

export const ArticleAuthor: FC<ArticleAuthorProps> = ({ 
  theme, 
  name, 
  avatar,
  meta 
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Author Info */}
      <div className="flex items-center gap-2">
        {avatar ? (
          <Image 
            src={avatar} 
            alt={name} 
            width={40} 
            height={40} 
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200" />
        )}
        <div>
          <div className="font-medium">{theme}</div>
          <div className="text-sm text-gray-500">{name}</div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Icon name="clock" size="sm" />
          <span>{meta.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="eye" size="sm" />
          <span>{meta.views}</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="heart" size="sm" />
          <span>{meta.likes}</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="rating" size="sm" />
          <span>{meta.rating}</span>
          <span className="text-gray-400">({meta.ratingCount})</span>
        </div>
      </div>
    </div>
  );
}; 