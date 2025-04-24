interface SearchBarProps {
  isVisible: boolean;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  isVisible,
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div
      className={`sticky top-[61px] bg-gray-200 z-[9] px-4 py-3 border-b border-gray-300 transition-all ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <div className="relative">
        <input
          type="search"
          className="w-full p-2.5 pl-10 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 shadow-sm focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-100"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
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
};
