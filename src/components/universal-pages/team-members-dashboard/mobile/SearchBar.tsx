import { useTeam } from "./hooks/useTeam";

interface SearchBarProps {
  visible: boolean;
}

export function SearchBar({ visible }: SearchBarProps) {
  const { searchTerm, setSearchTerm } = useTeam();

  return (
    <div
      className={`sticky top-[61px] z-[9] bg-background px-4 py-3 ${
        visible ? "block" : "hidden"
      } border-b border-gray-divider`}
    >
      <div className="relative">
        <input
          type="search"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-10 text-sm text-text-default shadow-sm focus:border-active-green focus:outline-none focus:ring-2 focus:ring-active-green/10"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
    </div>
  );
}
