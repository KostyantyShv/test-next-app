import React from 'react';
import { TrophyIcon } from './TrophyIcon';
import { PodiumCardProps } from '../types';

export const PodiumCard: React.FC<PodiumCardProps> = ({ performer }) => {

  const getPositionClasses = () => {
    const baseClasses = 'relative bg-white rounded-2xl p-8 text-center shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-400 flex flex-col justify-between overflow-visible';
    
    switch (performer.position) {
      case 'first':
        return `${baseClasses} border-t-4 border-[#00DF8B]`;
      case 'second':
        return `${baseClasses} border-t-4 border-[#089E68]`;
      case 'third':
        return `${baseClasses} border-t-4 border-[#0B6333]`;
      default:
        return baseClasses;
    }
  };

  const getImageBorderClass = () => {
    switch (performer.position) {
      case 'first':
        return 'border-[#00DF8B] shadow-[0_0_20px_rgba(0,223,139,0.3)]';
      case 'second':
        return 'border-[#089E68] shadow-[0_0_20px_rgba(8,158,104,0.3)]';
      case 'third':
        return 'border-[#0B6333] shadow-[0_0_20px_rgba(11,99,51,0.3)]';
      default:
        return '';
    }
  };

  const getIconContainerClass = () => {
    const baseClass = 'w-20 h-20 rounded-xl flex items-center justify-center mx-auto my-4 border transition-all duration-400';
    
    switch (performer.position) {
      case 'first':
        return `${baseClass} bg-gradient-to-br from-[rgba(0,223,139,0.1)] to-[rgba(0,223,139,0.05)] border-[rgba(0,223,139,0.2)] shadow-[0_4px_12px_rgba(0,0,0,0.1)]`;
      case 'second':
        return `${baseClass} bg-gradient-to-br from-[rgba(8,158,104,0.1)] to-[rgba(8,158,104,0.05)] border-[rgba(8,158,104,0.2)] shadow-[0_4px_12px_rgba(0,0,0,0.1)]`;
      case 'third':
        return `${baseClass} bg-gradient-to-br from-[rgba(11,99,51,0.1)] to-[rgba(11,99,51,0.05)] border-[rgba(11,99,51,0.2)] shadow-[0_4px_12px_rgba(0,0,0,0.1)]`;
      default:
        return baseClass;
    }
  };

  const getHeaderBgClass = () => {
    switch (performer.position) {
      case 'first':
        return 'bg-[#00DF8B]';
      case 'second':
        return 'bg-[#089E68]';
      case 'third':
        return 'bg-[#0B6333]';
      default:
        return '';
    }
  };

  const getDividerClass = () => {
    switch (performer.position) {
      case 'first':
        return 'bg-gradient-to-r from-transparent via-[#00DF8B] to-transparent';
      case 'second':
        return 'bg-gradient-to-r from-transparent via-[#089E68] to-transparent';
      case 'third':
        return 'bg-gradient-to-r from-transparent via-[#0B6333] to-transparent';
      default:
        return '';
    }
  };

  return (
    <div className="group relative w-full transition-all duration-400 hover:-translate-y-1">
      <div className={getPositionClasses()}>
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-transparent via-[rgba(0,223,139,0.05)] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 -z-10"></div>
        
        {/* Header Badge */}
        <div className={`absolute -top-5 left-1/2 -translate-x-1/2 ${getHeaderBgClass()} text-white px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap z-10`}>
          {performer.title}
        </div>

        {/* School Image */}
        <img
          src={performer.imageUrl}
          alt={performer.schoolName}
          className={`w-20 h-20 rounded-xl object-cover border-[3px] mx-auto mb-4 ${getImageBorderClass()}`}
        />

        {/* School Name */}
        <h3 className="text-lg font-bold text-[#464646] mb-4 leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
          {performer.schoolName}
        </h3>

        {/* Trophy Icon Container */}
        <div className={`${getIconContainerClass()} group-hover:scale-110 group-hover:rotate-[5deg]`}>
          <TrophyIcon color={performer.color} />
        </div>

        {/* Achievement Badge */}
        <div className="text-sm text-[#5F5F5F] mb-4 font-medium bg-[#EBFCF4] px-4 py-2 rounded-2xl inline-block">
          {performer.achievementText}
        </div>

        {/* Elegant Divider */}
        <div className={`w-[60px] h-0.5 mx-auto my-4 ${getDividerClass()}`}></div>

        {/* Total Section */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-5 h-5 bg-[#1D77BD] rotate-45"></div>
          <span className="text-2xl font-extrabold text-[#089E68]">{performer.totalAmount}</span>
        </div>
        <p className="text-sm text-[#5F5F5F] font-medium">{performer.totalLabel}</p>
      </div>
    </div>
  );
};

