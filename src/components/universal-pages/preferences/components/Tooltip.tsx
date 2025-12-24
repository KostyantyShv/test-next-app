import { FC } from 'react';

interface TooltipProps {
  text: string;
}

export const Tooltip: FC<TooltipProps> = ({ text }) => (
  <div
    className="relative inline-flex items-center group z-50"
    tabIndex={0}
    aria-label={text}
  >
    <svg
      className="w-4 h-4 cursor-help transition-all duration-200 flex-shrink-0 relative z-50"
      style={{ color: 'var(--active-green)' }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4m0-4h.01" />
    </svg>
    <span
      className="tooltip-with-theme invisible group-hover:visible group-focus:visible absolute bottom-[125%] left-1/2 -translate-x-1/2 w-[280px] text-left rounded-md p-3 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 text-xs leading-relaxed z-[1000] whitespace-normal break-words after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-[5px] after:border-[5px] after:border-solid after:border-x-transparent after:border-b-transparent"
      style={{
        backgroundColor: 'var(--tooltip-bg)',
        color: 'var(--tooltip-text)',
      }}
      role="tooltip"
    >
      {text}
    </span>
  </div>
);
