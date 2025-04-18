import { useTeam } from "./hooks/useTeam";

interface HeaderProps {
  onTeamTypeClick: () => void;
  onSearchToggle: () => void;
  onAddClick: () => void;
  onFilterClick: () => void;
  onMoreOptionsClick: () => void;
}

export function Header({
  onTeamTypeClick,
  onSearchToggle,
  onAddClick,
  onFilterClick,
  onMoreOptionsClick,
}: HeaderProps) {
  const { teamType, filterCount } = useTeam();

  return (
    <div className="sticky top-0 flex gap-2 items-center justify-between px-3 py-2.5 bg-background">
      <button
        className="flex items-center gap-2 rounded-full px-2 py-1.5 transition-colors hover:bg-gray-100"
        onClick={onTeamTypeClick}
      >
        <h1 className="text-lg font-semibold text-bold-text">
          {teamType.charAt(0).toUpperCase() + teamType.slice(1)}
        </h1>
        <div className="flex h-4 w-4 items-center text-text-default">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
            />
          </svg>
        </div>
      </button>
      <div className="flex items-center gap-2">
        <button
          className="flex w-9 h-9 items-center justify-center rounded-full text-bold-text transition-colors hover:bg-gray-100"
          onClick={onSearchToggle}
          aria-label="Toggle Search"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={20}
            height={20}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button
          className="flex w-9 h-9 items-center justify-center rounded-full border border-gray-divider bg-white text-bold-text transition-colors hover:bg-gray-100"
          onClick={onAddClick}
          aria-label="Add Team Member"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
          >
            <path
              d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z"
              fill="currentColor"
            />
          </svg>
        </button>
        <div className="h-5 w-px border-l" />
        <div className="relative">
          <button
            className="flex w-9 h-9 items-center justify-center rounded-full text-text-default transition-colors hover:bg-gray-100"
            onClick={onFilterClick}
            aria-label="Open Filters"
          >
            <svg viewBox="0 0 512 512" width={20} height={20}>
              <path
                d="M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2-32.5-40.5-56-76.3-56s-66.1 23.5-76.3 56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z"
                fill="currentColor"
              />
            </svg>
            {filterCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4.5 w-4.5 items-center justify-center rounded-full border-2 border-white bg-grade-badge text-xs font-semibold text-white">
                {filterCount}
              </span>
            )}
          </button>
        </div>
        <button
          className="flex w-9 h-9 items-center justify-center rounded-full text-text-default transition-colors hover:bg-gray-100"
          onClick={onMoreOptionsClick}
          aria-label="More Options"
        >
          <svg viewBox="0 0 24 24" width={20} height={20}>
            <path
              d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
