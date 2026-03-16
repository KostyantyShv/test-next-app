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
    <div className="flex items-center gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          className={`calendar-filter-button inline-flex h-11 items-center gap-2 rounded-full border px-4 text-[15px] font-medium transition-colors ${
            filter === option.value
              ? "border-[#2F344E] bg-[#2F344E] text-white shadow-[0_6px_16px_rgba(47,52,78,0.18)] is-active"
              : "border-[var(--border-color)] bg-white text-[var(--subtle-text)] hover:border-[#D5D8E1] hover:text-[var(--bold-text)]"
          }`}
          onClick={() => setFilter(option.value)}
        >
          {option.icon === "megaphone" && (
            <svg
              viewBox="0 0 24 24"
              className={`h-3.5 w-3.5 ${filter === option.value ? "text-[#F97362]" : "text-[#F97362]"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M3 11v2a1 1 0 0 0 1 1h2l5 3V7l-5 3H4a1 1 0 0 0-1 1Z" />
              <path d="M14 9.5a4.5 4.5 0 0 1 0 5" />
              <path d="M16.5 7a8 8 0 0 1 0 10" />
            </svg>
          )}
          {option.icon === "alert" && (
            <span
              className={`inline-flex h-4 w-4 items-center justify-center text-[16px] font-semibold leading-none ${
                filter === option.value ? "text-[#F97362]" : "text-[#F97362]"
              }`}
              aria-hidden
            >
              !
            </span>
          )}
          {option.label}
        </button>
      ))}
    </div>
  );
};
