import React from "react";

interface SortButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ icon, label, onClick }) => {
  return (
    <button
      className="sort-button flex items-center gap-2 bg-[var(--surface-secondary)] border border-[var(--border-color)] rounded-md text-[var(--text-default)] font-medium text-sm px-3 py-1.5 min-h-[32px] hover:bg-[var(--hover-bg)] hover:border-[var(--border-color)] transition-all"
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};

export default SortButton;
