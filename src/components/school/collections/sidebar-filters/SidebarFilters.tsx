import React from "react";
import { FILTER_MOCK } from "../mock";
import Filter from "@/components/ui/Filter/Filter";
import {
  FiltersType,
  SchoolScoutCategory,
  SchoolScoutGrade,
} from "@/types/schools-explore";
import { FilterSection } from "../../explore/filter-sidebar/FilterSection";
import { useSchoolsCollection } from "@/store/use-schools-collections";
import {
  CategoryType,
  NoteType,
  StatusType,
} from "@/types/schools-collections";
import { RatingFilter } from "../../explore/filter-sidebar/RatingFilter";

interface SidebarFiltersProps {
  isOptionChecked: (optionValue: string, key: keyof FiltersType) => boolean;
  isGradeSelected: (
    category: string,
    grade: SchoolScoutGrade
  ) => boolean | undefined;
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  isOptionChecked,
  isGradeSelected,
}) => {
  const {
    collectionsFilters,
    setCategories,
    setStatus,
    setNotes,
    setSchoolScoutGrade,
    setRating,
  } = useSchoolsCollection((state) => state);

  const handleSchoolScoutGradeChange = (
    category: SchoolScoutCategory,
    grade: SchoolScoutGrade
  ) => {
    setSchoolScoutGrade(category, grade);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setCategories(value as CategoryType);
  };
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setStatus(value as StatusType);
  };
  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setNotes(value as NoteType);
  };

  return (
    <>
      <FilterSection title="Categories" sectionId="categories">
        {FILTER_MOCK.CATEGORIES.options.map((option) => (
          <Filter.Option
            key={`${FILTER_MOCK.CATEGORIES}-${option.value}`}
            filter={FILTER_MOCK.CATEGORIES.id}
            option={option}
            onChange={handleCategoryChange}
            isChecked={isOptionChecked(option.value, "categories")}
          />
        ))}
      </FilterSection>
      <FilterSection title="Status" sectionId="status">
        {FILTER_MOCK.STATUS.options.map((option) => (
          <Filter.Option
            key={`${FILTER_MOCK.STATUS}-${option.value}`}
            filter={FILTER_MOCK.STATUS.id}
            option={option}
            onChange={handleStatusChange}
            isChecked={isOptionChecked(option.value, "status")}
          />
        ))}
      </FilterSection>
      <FilterSection title="Notes" sectionId="notes">
        {FILTER_MOCK.NOTES.options.map((option) => (
          <Filter.Option
            key={`${FILTER_MOCK.NOTES}-${option.value}`}
            filter={FILTER_MOCK.NOTES.id}
            option={option}
            onChange={handleNotesChange}
            isChecked={isOptionChecked(option.value, "notes")}
          />
        ))}
      </FilterSection>
      <FilterSection title="SchoolScout Grades" sectionId="schoolscout-grades">
        <div className="grid gap-4">
          {["Academics", "Teachers", "Diversity", "Sports"].map((category) => (
            <div key={category} className="mb-4">
              <div className="text-sm font-medium mb-2 text-bold-text">
                {category}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {["A", "B", "C", "D"].map((grade) => {
                  const categoryLower = category as SchoolScoutCategory;
                  const isSelected = isGradeSelected(
                    categoryLower,
                    grade as SchoolScoutGrade
                  );
                  return (
                    <button
                      key={grade}
                      className={`w-9 h-9 flex items-center justify-center border border-[rgba(0,0,0,0.1)] rounded-full cursor-pointer text-sm font-medium transition-all ${
                        isSelected
                          ? "bg-[#00DF8B] text-[white] text-bold-text"
                          : "bg-white hover:bg-[#f5f5f7] text-text-default"
                      }`}
                      data-category={categoryLower}
                      data-grade={grade}
                      onClick={() =>
                        handleSchoolScoutGradeChange(
                          categoryLower,
                          grade as SchoolScoutGrade
                        )
                      }
                    >
                      {grade}{" "}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Rating" sectionId="rating">
        <RatingFilter
          rating={collectionsFilters.rating}
          setRating={setRating}
        />
      </FilterSection>
    </>
  );
};

export default SidebarFilters;
