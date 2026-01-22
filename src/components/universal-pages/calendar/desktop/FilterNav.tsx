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
            <span style={{ fontSize: '16px' }}>📢</span>
          )}
          {option.icon === "alert" && (
            <span style={{ fontSize: '16px' }}>❗</span>
          )}
          <span>{option.label}</span>
        </button>
      ))}
    </nav>
  );
};
