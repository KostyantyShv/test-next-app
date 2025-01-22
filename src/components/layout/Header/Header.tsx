import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Search } from './components/Search';
import { Filters } from './components/Filters';
// import { Actions } from './components/Actions';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn('h-16 bg-white border-b border-gray-200', className)}>
      <div className="h-full px-4 flex items-center justify-between gap-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* <Logo /> */}
        </div>

        {/* Center section */}
        <div className="flex-1 max-w-3xl flex items-center gap-4">
          <Search />
          <Filters />
        </div>

        {/* Right section */}
        {/* <Actions /> */}
      </div>
    </header>
  );
}; 