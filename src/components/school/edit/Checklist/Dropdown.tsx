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

  const getButtonLabel = () => {
    if (expandMode === "all") return "Collapse All";
    if (expandMode === "incomplete") return "Collapse Incomplete";
    if (expandMode === "issues") return "Collapse Issues";
    if (expandMode === "completed") return "Collapse Completed";
    return "Expand";
  };

  return (
    <div className="expand-dropdown-trigger" ref={dropdownRef}>
      <button
        className={`expand-button ${
          expandMode === "incomplete" ? "two-line" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        type="button"
      >
        {expandMode === "incomplete" ? (
          <>
            <span className="expand-button-labels">
              <span>Collapse</span>
              <span>Incomplete</span>
            </span>
            {expandButtonSVG}
          </>
        ) : (
          <>
            <span className="expand-button-label">{getButtonLabel()}</span>
            {expandButtonSVG}
          </>
        )}
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
