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
          className={`text-sm font-medium cursor-pointer pb-2 border-b-2 transition-colors ${
            filter === option.value
              ? "text-[#202124] border-[#202124]"
              : "text-[#5F6368] border-transparent hover:text-[#202124]"
          }`}
          onClick={() => setFilter(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
