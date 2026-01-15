import { FilterType } from "../types/filter";

export const FilterNav: React.FC<{
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}> = ({ filter, setFilter }) => {
  const options = [
    { value: "ALL" as FilterType, label: "All" },
    { value: "UPCOMING" as FilterType, label: "Upcoming", icon: "megaphone" },
    { value: "PAST" as FilterType, label: "Past", icon: "alert" }
  ];

  return (
    <nav className="flex gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            filter === option.value
              ? "bg-[#262b3c] text-white"
              : "bg-white text-[#5F6368] border border-[#E0E0E0]"
          }`}
          onClick={() => setFilter(option.value)}
        >
          {option.icon === "megaphone" && (
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              <circle cx="18" cy="6" r="2.5" fill="#DC2626" />
            </svg>
          )}
          {option.icon === "alert" && (
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 24 24" 
              fill="#DC2626"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          )}
          <span>{option.label}</span>
        </button>
      ))}
    </nav>
  );
};
