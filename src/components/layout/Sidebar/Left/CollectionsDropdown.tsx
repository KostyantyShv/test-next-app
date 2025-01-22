import { FC } from 'react';
import { Collection } from '@/lib/types/collection';
import { cn } from '@/lib/utils';

interface CollectionsDropdownProps {
  collections: Collection[];
  isOpen: boolean;
  variant?: 'desktop' | 'mobile';
}

export const CollectionsDropdown: FC<CollectionsDropdownProps> = ({
  collections,
  isOpen,
  variant = 'desktop'
}) => {
  if (!isOpen) return null;

  return (
    <div className={cn("pl-6 space-y-1", variant === 'mobile' && 'bg-[var(--menu-hover)]')}>
      {collections.map((collection) => (
        <button
          key={collection.id}
          className={cn(
            "w-full px-3 py-2 flex items-center gap-2",
            "hover:bg-[var(--menu-hover)] rounded-lg transition-colors",
            "text-left text-sm text-gray-600"
          )}
        >
          <span className={cn(variant === 'mobile' ? 'text-xl' : 'text-lg')}>{collection.emoji}</span>
          <span className={cn(variant === 'mobile' ? 'text-md' : 'text-sm')}>{collection.title}</span>
        </button>
      ))}
    </div>
  );
}; 