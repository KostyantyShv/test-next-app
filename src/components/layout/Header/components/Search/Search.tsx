import { FC } from 'react';
import { Icon } from '@/components/ui/Icon';

export const Search: FC = () => {
  return (
    <div className="relative flex-1 max-w-3xl">
      <input
        type="text"
        placeholder="Search for anything..."
        className="w-full h-10 px-4 pr-10 rounded-lg border border-gray-200 dark:bg-white dark:border-gray-200 focus:outline-none focus:border-primary"
      />
      <button 
        className="absolute right-3 top-1/2 -translate-y-1/2"
        aria-label="Search"
      >
        <Icon 
          name="search" 
          className="text-gray-400 hover:text-gray-600"
          size="sm"
        />
      </button>
    </div>
  );
};
