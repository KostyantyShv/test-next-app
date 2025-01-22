import { FC } from 'react';
import { Collection } from '@/lib/types/collection';
import { cn } from '@/lib/utils';

interface CollectionsDropdownProps {
  collections: Collection[];
  isOpen: boolean;
}

export const CollectionsDropdown: FC<CollectionsDropdownProps> = ({
  collections,
  isOpen
}) => {
  if (!isOpen) return null;

  return (
    <div className="pl-6 space-y-1">
      {collections.map((collection) => (
        <button
          key={collection.id}
          className={cn(
            "w-full px-3 py-2 flex items-center gap-2",
            "hover:bg-[var(--menu-hover)] rounded-lg transition-colors",
            "text-left text-sm text-gray-600"
          )}
        >
          <span className="text-lg">{collection.emoji}</span>
          <span>{collection.title}</span>
        </button>
      ))}
    </div>
  );
}; 