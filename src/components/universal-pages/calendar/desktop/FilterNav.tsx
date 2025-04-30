import { FilterType } from "../types/filter";

export const FilterNav: React.FC<{
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}> = ({ filter, setFilter }) => (
  <nav className="flex gap-8 border-b border-[#E0E0E0] mb-6 pb-2 relative z-10 bg-white">
    {(["ALL", "UPCOMING", "PAST"] as FilterType[]).map((option) => (
      <a
        key={option}
        className={`text-base font-medium py-2 cursor-pointer ${
          filter === option
            ? "text-[#202124] font-semibold border-b-2 border-[#202124]"
            : "text-[#5F6368]"
        }`}
        onClick={() => setFilter(option)}
      >
        {option}
      </a>
    ))}
  </nav>
);
