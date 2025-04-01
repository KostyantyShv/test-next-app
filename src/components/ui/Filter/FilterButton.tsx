import React from "react";

interface FilterButtonProps {
  onDropdownOpen: () => void;
  icon: React.ReactNode;
  label: string;
  className?: string;
  activeCount: number;
  tooltip?: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  onDropdownOpen,
  icon,
  label,
  className = "",
  activeCount,
  tooltip = "",
}) => (
  <button
    onClick={onDropdownOpen}
    className={`filter-button flex items-center gap-2 px-4 py-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-md text-textDefault font-medium text-sm min-h-[36px] hover:bg-[#f8fafc] hover:border-[rgba(0,0,0,0.15)] transition-all ${className}`}
  >
    {icon}
    {label}
    {activeCount ? (
      <span className="bg-[#00DF8B] text-white w-5 h-5 rounded-full font-medium flex items-center justify-center">
        {activeCount}
      </span>
    ) : null}
    {tooltip && (
      <span className="group inline-flex items-center justify-center w-4 h-4 ml-[6px] cursor-help text-[#999] hover:text-text-default relative">
        <svg viewBox="0 0 24 24" className="w-4 h-4">
          <path
            d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 18.4C11.1 18.4 10.5 17.7 10.5 16.9C10.5 16.3 11 15.5 12 15.5C13 15.5 13.4 16.1 13.4 16.9C13.4 17.5 12.9 18.4 12 18.4ZM12.9 13.1C12.9 13.8 12.4 14.2 11.8 14.2C11.2 14.2 10.8 13.8 10.8 13.2C10.8 10.7 14 9.9 14.2 8.8C14.3 8.1 13.8 7.4 12.4 7.4C10.5 7.4 10.5 8.9 9.6 9.1C9.2 9.2 8.9 9.1 8.6 8.8C8.4 8.7 8.3 8.4 8.4 8C8.6 7.2 9.9 5.6 12.2 5.6C15.5 5.6 16.3 7.5 16.3 8.5C16.3 11.1 12.9 11.6 12.9 13.1Z"
            fill="currentColor"
          />
        </svg>
        <span className="absolute top-[calc(100%+10px)] left-1/2 transform -translate-x-1/2 bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.15)] p-2 text-xs w-[200px] text-text-default hidden group-hover:block z-[1010]">
          {tooltip}
          <span className="absolute top-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
        </span>
      </span>
    )}
  </button>
);
