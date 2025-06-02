"use client";
import FiltersSection from "./sections/FiltersSection";
import MainContentSection from "./sections/MainContentSection";

const ExplorePage = () => {
  return (
    <div className="w-[1080px] mx-auto">
      <FiltersSection />
      <MainContentSection />
    </div>
  );
};

export default ExplorePage;
