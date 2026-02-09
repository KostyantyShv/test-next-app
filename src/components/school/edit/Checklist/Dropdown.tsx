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

  const baseOptions = [
    { label: "All", mode: "all" },
    { label: "Incomplete", mode: "incomplete" },
    { label: "Issues", mode: "issues" },
    { label: "Completed", mode: "completed" },
  ] as const;

  const options = baseOptions.map((option) => ({
    ...option,
    label:
      expandMode === option.mode
        ? `Collapse ${option.label}`
        : `Expand ${option.label}`,
  }));

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

  const getButtonLabel = () => {
    if (expandMode === "all") return "Collapse All";
    if (expandMode === "incomplete") return "Collapse Incomplete";
    if (expandMode === "issues") return "Collapse Issues";
    if (expandMode === "completed") return "Collapse Completed";
    return "Expand";
  };

  const displayLabel = (() => {
    const label = getButtonLabel();
    return label.length > 7 ? `${label.slice(0, 7)}\u2026` : label;
  })();

  return (
    <div className="expand-dropdown-trigger" ref={dropdownRef}>
      <button
        className="expand-button expand-button-truncate"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        type="button"
        title={getButtonLabel()}
      >
        <span className="expand-button-label">{displayLabel}</span>
        {expandButtonSVG}
      </button>

      <div className={`expand-menu ${isOpen ? "active" : ""}`}>
        {options.map((option) => (
          <button
            key={option.mode}
            type="button"
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
