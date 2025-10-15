import React from 'react';
import { CartItem } from '../types';
import { labelStyles } from '../constants';
import { Icon } from './Icon';

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: number) => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ item, onRemove }) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:gap-6 p-4 md:p-6 bg-white border border-[#F2F2F2] rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
      <div className="flex gap-3 md:gap-6 items-start">
        <img
          src={item.image}
          alt={item.title}
          className="w-20 h-[60px] md:w-40 md:h-[90px] rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1 md:mb-2">
            <h2 className="text-base md:text-xl font-semibold text-[#1B1B1B] mr-2 md:mr-4 flex-1 leading-snug">
              {item.title}
            </h2>
          </div>
          <div className="text-xs md:text-sm text-[#5F5F5F] mb-2 md:mb-3 leading-relaxed">
            {item.description}
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center gap-2 md:gap-4 flex-wrap mb-2">
          <span className={`px-2 md:px-3.5 py-0.5 md:py-1 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-medium whitespace-nowrap leading-relaxed ${labelStyles[item.label.color]}`}>
            {item.label.text}
          </span>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4 flex-wrap">
          {item.stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-1 md:gap-1.5">
              <Icon type={stat.icon} className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm leading-5 text-[#464646] font-medium tracking-tight">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {item.features && (
        <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-[#F2F2F2]">
          <div className="flex flex-wrap gap-1 md:gap-2">
            {item.features.map((feature, idx) => (
              <span
                key={idx}
                className="bg-[#F0F8FF] text-[#1D77BD] px-1.5 md:px-2 py-0.5 rounded-lg md:rounded-xl text-[10px] md:text-[11px] font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {item.specifics && (
        <div className="bg-[#F8F9FA] rounded-md p-2 md:p-3 mt-2 md:mt-3 text-[11px] md:text-[13px] space-y-1 md:space-y-0">
          {item.specifics.map((specific, idx) => (
            <div key={idx} className="text-[#464646] md:inline md:mr-4">
              <strong className="text-[#1B1B1B]">{specific.label}:</strong> {specific.value}
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-[#F2F2F2] mt-2 md:mt-0">
        <div className="flex items-baseline gap-1.5 md:gap-3 flex-wrap">
          <span className="text-lg md:text-2xl font-semibold text-[#1B1B1B]">
            ${item.price.toFixed(2)}
          </span>
          <span className="text-xs md:text-sm text-[#5F5F5F]">{item.period}</span>
          {item.originalPrice && (
            <span className="text-xs md:text-sm text-[#5F5F5F] line-through">
              ${item.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="flex items-center px-1.5 md:px-3 py-1.5 md:py-2 rounded-md text-xs md:text-sm text-[#5F5F5F] hover:bg-[#F8F9FA] hover:text-[#495057] transition-all min-w-[60px] justify-center"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 mr-1 md:mr-1.5">
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
          Remove
        </button>
      </div>
    </div>
  );
};

