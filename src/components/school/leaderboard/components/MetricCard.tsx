import React from 'react';
import { MetricCardProps } from '../types';

export const MetricCard: React.FC<MetricCardProps> = ({ icon, number, label, tooltip }) => {
  return (
    <div className="relative flex items-center gap-3 px-5 py-4 rounded-lg bg-[#F8F9FA] text-[#464646] font-medium transition-all duration-200 hover:bg-[#EAEAEA] hover:-translate-y-0.5">
      <div className="w-5 h-5 text-[#016853] flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <span className="font-bold text-[#1B1B1B]">{number}</span>{' '}
        <span className="font-medium text-[#5F5F5F]">{label}</span>
      </div>
      <div className="group absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-help">
        <div className="w-5 h-5 rounded-full bg-[rgba(8,158,104,0.1)] flex items-center justify-center transition-all duration-200 group-hover:bg-[rgba(8,158,104,0.2)] group-hover:scale-110">
          <div className="w-2 h-2 rounded-full bg-[#089E68]"></div>
        </div>
        <div className="invisible group-hover:visible absolute bottom-[calc(100%+12px)] right-[-8px] bg-[#464646] text-white px-4 py-2 rounded-md text-xs whitespace-nowrap z-[1000] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {tooltip}
          <div className="absolute top-full right-3 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#464646]"></div>
        </div>
      </div>
    </div>
  );
};

