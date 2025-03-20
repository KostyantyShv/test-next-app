import React from "react";

interface SortButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ icon, label, onClick }) => {
  return (
    <button
      className="sort-button flex items-center gap-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-md text-textDefault font-medium text-sm px-3 py-1.5 min-h-[32px] hover:bg-[#f8fafc] hover:border-[rgba(0,0,0,0.15)] transition-all"
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};

export default SortButton;
