"use client";
import SearchFiltersSection from "./sections/SearchFiltersSection";
import SearchMainContentSection from "./sections/SearchMainContentSection";

const SearchPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center py-4 md:py-5 px-3 md:px-5"
      style={{ backgroundColor: "var(--background-color, var(--background))" }}
    >
      <div className="w-full max-w-[1055px]">
        <div className="hidden md:block">
          <SearchFiltersSection />
        </div>
        <SearchMainContentSection />
      </div>
    </div>
  );
};

export default SearchPage; 