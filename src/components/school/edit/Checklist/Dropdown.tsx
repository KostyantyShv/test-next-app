import { useState } from "react";

interface DropdownProps {
  expandMode: "all" | "incomplete" | "issues" | "completed" | null;
  handleExpand: (mode: "all" | "incomplete" | "issues" | "completed") => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  expandMode,
  handleExpand,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "Expand All", mode: "all" },
    { label: "Expand Incomplete", mode: "incomplete" },
    { label: "Expand Issues", mode: "issues" },
    { label: "Expand Completed", mode: "completed" },
  ];

  return (
    <div className="relative flex items-center gap-[10px]">
      <button
        className="px-4 py-2 bg-white border border-border rounded-md text-sm font-medium text-dark-text flex items-center gap-2 hover:bg-apply-button-bg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {expandMode
          ? `Collapse ${
              expandMode.charAt(0).toUpperCase() + expandMode.slice(1)
            }`
          : "Expand"}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className={`absolute top-full right-0 mt-1 bg-white border border-border rounded-md shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] min-w-[200px] z-10 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {options.map((option) => (
          <button
            key={option.mode}
            className="w-full text-left px-4 py-2 text-sm text-dark-text hover:bg-apply-button-bg"
            onClick={() => {
              handleExpand(
                option.mode as "all" | "incomplete" | "issues" | "completed"
              );
              setIsOpen(false);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
