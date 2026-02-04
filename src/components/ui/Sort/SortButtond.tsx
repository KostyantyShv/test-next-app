import React from "react";

interface SortButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ icon, label, onClick }) => {
  return (
    <button
      className="sort-button flex items-center bg-white border border-[rgba(0,0,0,0.1)] cursor-pointer text-[var(--text-default)] font-medium text-sm transition-all hover:bg-[#f8fafc] hover:border-[rgba(0,0,0,0.15)]"
      style={{
        gap: '8px',
        borderRadius: '6px',
        padding: '6px 12px',
        minHeight: '32px',
      }}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};

export default SortButton;
