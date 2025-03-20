import React from "react";

interface SortDropdownProps {
  minWidth: string;
  children: React.ReactNode;
  isOpened: boolean;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  minWidth = "200px",
  children,
  isOpened,
}) => {
  return (
    <div
      className={`${
        isOpened ? "block" : "hidden"
      } absolute min-w-[${minWidth}] top-full right-0 mt-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-2 z-[1000]`}
    >
      {children}
    </div>
  );
};

export default SortDropdown;
