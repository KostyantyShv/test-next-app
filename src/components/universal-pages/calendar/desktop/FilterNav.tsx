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
    <div className="flex gap-8">
      {options.map((option) => (
        <button
          key={option.value}
          className={`calendar-filter-button text-sm font-medium cursor-pointer pb-2 border-b-2 transition-colors ${
            filter === option.value
              ? "text-[var(--bold-text)] border-[var(--bold-text)] is-active"
              : "text-[var(--subtle-text)] border-transparent hover:text-[var(--bold-text)]"
          }`}
          onClick={() => setFilter(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
