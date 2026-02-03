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
      className="explore-layout-toggle flex items-center gap-[4px] bg-[var(--surface-secondary)] rounded-md p-[3px] w-10 overflow-hidden transition-all duration-300 hover:w-[var(--expanded-width)] group border border-[var(--border-color)]"
    >
      {layouts.map(({ type, icon }, index) => (
        <button
          key={type}
          className={`layout-toggle-button w-8 h-7 flex items-center justify-center rounded transition-all duration-200 ${
            layout === type
              ? "is-active bg-[var(--surface-color)] shadow-[0_1px_3px_var(--shadow-color)]"
              : "hidden group-hover:flex hover:bg-[var(--hover-bg)]"
          }`}
          style={{ order: index }}
          onClick={() => {
            console.log(`Switching to layout: ${type}`);
            setLayout(type);
          }}
        >
          <span
            className={`layout-toggle-icon w-5 h-5 flex items-center justify-center ${
              layout === type ? "text-[var(--verification-blue)]" : "text-[var(--subtle-text)]"
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
