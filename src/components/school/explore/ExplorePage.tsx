"use client";
import FiltersSection from "./sections/FiltersSection";
import MainContentSection from "./sections/MainContentSection";

const ExplorePage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center py-4 md:py-5 px-3 md:px-5"
      style={{ backgroundColor: 'var(--background-color)' }}
    >
      <div className="w-full max-w-[1055px]">
        <div className="hidden md:block">
          <FiltersSection />
        </div>
        <MainContentSection />
      </div>
    </div>
  );
};

export default ExplorePage;
