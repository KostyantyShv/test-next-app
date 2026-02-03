import React from "react";

interface SortDropdownProps {
  children: React.ReactNode;
  isOpened: boolean;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ children, isOpened }) => {
  return (
    <div
      className={`${
        isOpened ? "block" : "hidden"
      } absolute min-w-[200px] top-full right-0 mt-2 bg-[var(--surface-secondary)] border border-[var(--border-color)] rounded-lg shadow-[0_4px_12px_var(--shadow-color)] p-2 z-[1000] text-[var(--text-default)]`}
    >
      {children}
    </div>
  );
};

export default SortDropdown;
