import React from "react";

interface ViewMoreButtonProps {
  expanded: boolean;
  onClick: () => void;
}

const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({
  expanded,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 text-[#346DC2] text-sm font-medium cursor-pointer p-3 border-none bg-transparent w-full transition-colors duration-200 hover:text-[#2857A0]"
    >
      {expanded ? "View Less" : "View More"}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="text-[#346DC2]"
      >
        <path
          d={
            expanded
              ? "M8 5.33203L13.332 10.664L12.6647 11.3313L8 6.66669L3.33533 11.3313L2.668 10.664L8 5.33203Z"
              : "M8 10.668L2.668 5.33599L3.33533 4.66866L8 9.33332L12.6647 4.66866L13.332 5.33599L8 10.668Z"
          }
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default ViewMoreButton;
