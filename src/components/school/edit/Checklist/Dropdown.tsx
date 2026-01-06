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
    <div className="relative flex items-center max-md:relative max-md:flex-shrink-0" ref={dropdownRef}>
      <button
        className="px-4 max-md:px-[10px] py-2 max-md:py-1.5 bg-white max-md:bg-white border max-md:border-[#E5E7EB] rounded max-md:rounded-md text-sm max-md:text-xs font-medium max-md:font-medium flex items-center gap-2 max-md:gap-1 transition-all max-md:transition-all whitespace-nowrap max-md:whitespace-nowrap"
        style={{
          borderColor: 'var(--border-color)',
          color: 'var(--dark-text)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--apply-button-hover)';
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
        className={`absolute top-full max-md:top-[calc(100%+4px)] right-0 max-md:right-0 mt-1 max-md:mt-0 bg-white max-md:bg-white border max-md:border-[#E5E7EB] rounded max-md:rounded-md min-w-[200px] max-md:min-w-[160px] z-10 max-md:z-10 ${
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
            className="w-full text-left px-4 max-md:px-3 py-2 max-md:py-2 text-sm max-md:text-xs transition-all max-md:transition-all"
            style={{
              color: 'var(--dark-text)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--apply-button-hover)';
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
