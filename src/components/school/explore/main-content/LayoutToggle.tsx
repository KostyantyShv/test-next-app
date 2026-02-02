import React, { ReactNode } from "react";

interface LayoutToggleProps {
  layout: string;
  setLayout: (value: string) => void;
  layouts: { type: string; icon: ReactNode }[];
  width: number;
}

const LayoutToggle: React.FC<LayoutToggleProps> = ({
  layout,
  setLayout,
  layouts,
  width,
}) => {
  return (
    <div
      // Use a CSS variable so Tailwind can generate the class (avoids dynamic `hover:w-[${width}px]`).
      style={{ ["--expanded-width" as never]: `${width}px` } as React.CSSProperties}
      className="flex items-center gap-[4px] bg-[#f5f5f7] rounded-md p-[3px] w-10 overflow-hidden transition-all duration-300 hover:w-[var(--expanded-width)] group"
    >
      {layouts.map(({ type, icon }, index) => (
        <button
          key={type}
          className={`w-8 h-7 flex items-center justify-center rounded transition-all duration-200 ${
            layout === type
              ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
              : "hidden group-hover:flex hover:bg-[rgba(0,0,0,0.05)]"
          }`}
          style={{ order: index }}
          onClick={() => {
            console.log(`Switching to layout: ${type}`);
            setLayout(type);
          }}
        >
          <span
            className={`w-5 h-5 flex items-center justify-center ${
              layout === type ? "text-[#0093B0]" : "text-[#6B7280]"
            }`}
          >
            {icon}
          </span>
        </button>
      ))}
    </div>
  );
};

export default LayoutToggle;
