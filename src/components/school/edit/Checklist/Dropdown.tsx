import { useState, useEffect, useRef } from "react";

interface DropdownProps {
  expandMode: "all" | "incomplete" | "issues" | "completed" | null;
  handleExpand: (mode: "all" | "incomplete" | "issues" | "completed") => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  expandMode,
  handleExpand,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { label: "Expand All", mode: "all" },
    { label: "Expand Incomplete", mode: "incomplete" },
    { label: "Expand Issues", mode: "issues" },
    { label: "Expand Completed", mode: "completed" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const expandButtonSVG = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const getButtonText = () => {
    if (expandMode === "all") return <>Collapse All {expandButtonSVG}</>;
    if (expandMode === "incomplete") return <>Collapse Incomplete {expandButtonSVG}</>;
    if (expandMode === "issues") return <>Collapse Issues {expandButtonSVG}</>;
    if (expandMode === "completed") return <>Collapse Completed {expandButtonSVG}</>;
    return <>Expand {expandButtonSVG}</>;
  };

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        className="px-4 py-2 bg-white border rounded text-sm font-medium flex items-center gap-2 transition-all"
        style={{
          borderColor: 'var(--border-color)',
          color: 'var(--dark-text)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--apply-button-bg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'white';
        }}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {getButtonText()}
      </button>
      <div
        className={`absolute top-full right-0 mt-1 bg-white border rounded min-w-[200px] z-10 ${
          isOpen ? "block" : "hidden"
        }`}
        style={{
          borderColor: 'var(--border-color)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        {options.map((option) => (
          <button
            key={option.mode}
            className="w-full text-left px-4 py-2 text-sm transition-all"
            style={{
              color: 'var(--dark-text)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--apply-button-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
            }}
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
