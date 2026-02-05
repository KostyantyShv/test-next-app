import React, { ReactNode, useState, useRef, useCallback } from "react";

interface LayoutToggleProps {
  layout: string;
  setLayout: (value: string) => void;
  layouts: { type: string; icon: ReactNode }[];
  width: number;
}

// Capitalize first letter helper
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const LayoutToggle: React.FC<LayoutToggleProps> = ({
  layout,
  setLayout,
  layouts,
  width,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTooltipReady, setIsTooltipReady] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsExpanded(true);

    // Wait for expansion animation to complete before enabling tooltips
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    tooltipTimeoutRef.current = setTimeout(() => {
      setIsTooltipReady(true);
    }, 300); // Match the transition duration
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Immediately disable tooltips on mouse leave
    setIsTooltipReady(false);
    setHoveredButton(null);
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);

    hoverTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 300);
  }, []);

  const handleButtonClick = useCallback((type: string) => {
    console.log(`Switching to layout: ${type}`);
    setLayout(type);

    setTimeout(() => {
      setIsExpanded(false);
      setIsTooltipReady(false);
      setHoveredButton(null);
    }, 500);
  }, [setLayout]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: isExpanded ? `${width}px` : '36px',
      }}
      className="explore-layout-toggle flex items-center bg-[#f5f5f7] rounded-md p-[2px] transition-all duration-300 relative z-[8000]"
    >
      {layouts.map(({ type, icon }, index) => (
        <button
          key={type}
          className={`layout-toggle-button relative shrink-0 w-8 h-7 flex items-center justify-center rounded transition-all duration-200 overflow-visible ${layout === type
              ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
              : isExpanded
                ? "hover:bg-[rgba(0,0,0,0.05)]"
                : "hidden"
            }`}
          style={{ order: layout === type ? 99 : index }}
          onClick={() => handleButtonClick(type)}
          onMouseEnter={() => setHoveredButton(type)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <span
            className={`layout-toggle-icon w-4 h-4 flex items-center justify-center ${layout === type ? "text-[#0093B0]" : "text-[var(--text-default)]"
              }`}
          >
            {icon}
          </span>
          {/* Tooltip - visible when isTooltipReady is true and this specific button is hovered */}
          {isTooltipReady && hoveredButton === type && (
            <span
              className="layout-tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[var(--tooltip-bg)] text-[var(--tooltip-text)] px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap pointer-events-none z-[1000] shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
            >
              {capitalize(type)}
              {/* Arrow */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[var(--tooltip-bg)]"></span>
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default LayoutToggle;
