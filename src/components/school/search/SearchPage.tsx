"use client";
import SearchFiltersSection from "./sections/SearchFiltersSection";
import SearchMainContentSection from "./sections/SearchMainContentSection";

const SearchPage = () => {
  return (
    <div className="min-h-screen bg-[#E1E7EE] flex flex-col items-center py-5 px-5">
      <div className="w-full max-w-[1055px]">
        <SearchFiltersSection />
        <SearchMainContentSection />
      </div>
    </div>
  );
};

export default SearchPage; 