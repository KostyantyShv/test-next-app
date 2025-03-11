export const DesktopBadgeSVG: React.FC = () => (
  <svg
    viewBox="0 0 33 36"
    fill="none"
    height="64"
    width="64"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[0_2px_4px_rgba(3,239,98,0.2)] hidden md:block"
  >
    <path
      d="M0 12.847v10.306c0 2.772 1.464 5.318 3.878 6.734l8.662 5.05a7.91 7.91 0 0 0 7.92 0l8.662-5.05A7.81 7.81 0 0 0 33 23.153V12.847c0-2.772-1.464-5.317-3.878-6.734l-8.662-5.05a7.91 7.91 0 0 0-7.92 0l-8.662 5.05A7.81 7.81 0 0 0 0 12.847"
      fill="#089E68"
    />
    <g transform="translate(7 8)">
      <g
        clipPath="url(#TopProductSmall_svg__a)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        stroke="#fff"
      >
        <path d="M7.125 16.625h4.75M9.5 12.294v4.33M4.75 9.5h-.754c-.64 0-1.254-.286-1.706-.795a2.9 2.9 0 0 1-.707-1.92V5.43c0-.18.064-.353.177-.48a.57.57 0 0 1 .426-.199H4.6M14.25 9.5h.754c.64 0 1.254-.286 1.706-.795.453-.509.707-1.2.707-1.92V5.43a.72.72 0 0 0-.177-.48.57.57 0 0 0-.426-.199H14.4" />
        <path
          d="M4.75 3.167h9.5v4.408c0 2.773-2.095 5.07-4.714 5.092a4.5 4.5 0 0 1-1.829-.372 4.7 4.7 0 0 1-1.553-1.088 5.1 5.1 0 0 1-1.039-1.636 5.3 5.3 0 0 1-.365-1.933z"
          fill="#fff"
        />
      </g>
    </g>
  </svg>
);

export const DesktopTrendUpSVG: React.FC = () => (
  <svg
    className="fill-[#00DF8B] hidden md:block"
    width="16"
    height="16"
    viewBox="0 0 24 24"
  >
    <path d="M7 14l5-5 5 5z" />
  </svg>
);

export const DesktopTrendDownSVG: React.FC = () => (
  <svg
    className="fill-[#FF4D4D] hidden md:block"
    width="16"
    height="16"
    viewBox="0 0 24 24"
  >
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

export const DesktopSeeAllSVG: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" className="hidden md:block">
    <path
      fill="currentColor"
      d="M10.5 5.5L16 11H4v2h12l-5.5 5.5L12 20l8-8-8-8z"
      clipRule="evenodd"
      fillRule="evenodd"
    />
  </svg>
);

// Mobile SVGs
export const MobileTrophySVG: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-8 h-8 fill-white block md:hidden"
  >
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
  </svg>
);

export const MobileTrendUpSVG: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-4 h-4 fill-[#00DF8B] block md:hidden"
  >
    <path d="M7 14l5-5 5 5z" />
  </svg>
);

export const MobileTrendDownSVG: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-4 h-4 fill-[#FF4D4D] block md:hidden"
  >
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

export const MobileViewAllSVG: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-4 h-4 fill-current block md:hidden"
  >
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
  </svg>
);
