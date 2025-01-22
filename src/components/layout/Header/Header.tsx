import React from 'react';
import { Logo } from './components/Logo';
import { Search } from './components/Search';
import { Filters } from './components/Filters';
// import { Actions } from './components/Actions';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="h-full px-4 flex items-center justify-between gap-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Logo />
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