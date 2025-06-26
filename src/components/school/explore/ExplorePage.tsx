"use client";
import FiltersSection from "./sections/FiltersSection";
import MainContentSection from "./sections/MainContentSection";

const ExplorePage = () => {
  return (
    <div className="min-h-screen bg-[#E1E7EE] flex flex-col items-center py-5 px-5">
      <div className="w-full max-w-[1055px]">
        <FiltersSection />
        <MainContentSection />
      </div>
    </div>
  );
};

export default ExplorePage;
