import React from "react";

interface MetaIconProps {
  className?: string;
}

export const MetaClockIcon: React.FC<MetaIconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const MetaStarIcon: React.FC<MetaIconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 3.5 14.9 9.3l6.4.9-4.6 4.4 1.1 6.3L12 17.8 6.2 20.9l1.1-6.3-4.6-4.4 6.4-.9z" />
  </svg>
);
