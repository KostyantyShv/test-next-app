import React from "react";

interface FilterButtonProps {
  onDropdownOpen: () => void;
  icon: React.ReactNode;
  label: string;
  className?: string;
  activeCount: number;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  onDropdownOpen,
  icon,
  label,
  className = "",
  activeCount,
}) => (
  <button
    onClick={onDropdownOpen}
    className={`filter-button flex items-center gap-2 px-4 py-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-md text-textDefault font-medium text-sm min-h-[36px] hover:bg-[#f8fafc] hover:border-[rgba(0,0,0,0.15)] transition-all ${className}`}
  >
    {icon}
    {label}
    {activeCount ? (
      <span className="bg-[#00DF8B] text-white w-5 h-5 rounded-full font-medium items-center justify-center">
        {activeCount}
      </span>
    ) : null}
  </button>
);
