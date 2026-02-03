import React from "react";

interface SortOptionProps {
  option: { value: string; label: string };
  isSelected: boolean;
  onClick: () => void;
}

const SortOption: React.FC<SortOptionProps> = ({
  option,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`dropdown-item flex items-center gap-3 px-3 py-2 rounded hover:bg-[var(--hover-bg)] cursor-pointer text-sm ${
        isSelected ? "text-[var(--verification-blue)] bg-[rgba(125,211,252,0.12)]" : ""
      }`}
      onClick={onClick}
    >
      <span className="dropdown-item-text flex-1">{option.label}</span>
      {isSelected && (
        <svg
          className="dropdown-item-check w-5 h-5"
          viewBox="0 0 256 256"
          fill="currentColor"
        >
          <path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z" />
        </svg>
      )}
    </div>
  );
};

export default SortOption;
