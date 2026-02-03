import React from "react";
import { FilterSection } from "../FilterSection";
import {
  ACADEMICS_MOCK,
  BOARDING_MOCK,
  FILTER_MOCK,
  highestGrade,
  ORGANIZATION_MOCK,
} from "../../mock";
import Filter from "@/components/ui/Filter/Filter";
import {
  Academics,
  BoardingStatus,
  FiltersType,
  GradeFilter,
  GradeLevel,
  Organization,
  ReligionType,
  SchoolScoutCategory,
  SchoolScoutGrade,
  SpecialtyType,
  TypeFilter,
} from "@/types/schools-explore";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import { DropdownFilter } from "../DropdownFilter";
import SliderFilter from "../SliderFilter";
import { RatingFilter } from "../RatingFilter";

interface K12FiltersProps {
  isOptionChecked: (optionValue: string, key: keyof FiltersType) => boolean;
  isGradeSelected: (category: string, grade: SchoolScoutGrade) => boolean;
}

const K12Filters: React.FC<K12FiltersProps> = ({
  isGradeSelected,
  isOptionChecked,
}) => {
  const {
    filterK12: filters,
    setBoardingStatus,
    setHighestGrade,
    setOrganization,
    setGrade,
    setSchoolScoutGrade,
    setReligion,
    setSpecialty,
    setType,
    setAcademics,
    setTuition,
    setRation,
    setRating,
  } = useSchoolsExplore((state) => state);

  const handleBoardingStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.dataset.value as string;
    setBoardingStatus(value as BoardingStatus);
  };

  const handleHighestGradeChange = (value: string) => {
    setHighestGrade(value as GradeLevel);
  };
  const handleOrganizationChange = (value: string) => {
    setOrganization(value as Organization);
  };
  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setGrade(value as GradeFilter);
  };

  const handleSchoolScoutGradeChange = (
    category: SchoolScoutCategory,
    grade: SchoolScoutGrade
  ) => {
    setSchoolScoutGrade(category, grade);
  };

  const handleReligionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setReligion(value as ReligionType);
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setSpecialty(value as SpecialtyType);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setType(value as TypeFilter);
  };

  const handleAcademicsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setAcademics(value as Academics);
  };
  return (
    <>
      <FilterSection title="Grade" sectionId="grade">
        {FILTER_MOCK.GRADE.options.map((option) => (
          <Filter.Option
            key={`${FILTER_MOCK.GRADE}-${option.value}`}
            filter={FILTER_MOCK.GRADE.id}
            option={option}
            onChange={handleGradeChange}
            isChecked={isOptionChecked(option.value, "grade")}
          />
        ))}
      </FilterSection>
      {/* Highest Grade Offered Filter */}
      <FilterSection
        title="Highest grade offered"
        sectionId="highest-grade"
        hasTooltip
        tooltipText="Exclude schools that offer grades higher than the selected grade."
      >
        <DropdownFilter
          options={highestGrade}
          defaultValue={filters.highestGrade}
          onChange={handleHighestGradeChange}
        />
      </FilterSection>
      {/* Boarding Status Filter */}
      <FilterSection title="Boarding status" sectionId="boarding">
        {BOARDING_MOCK.options.map((option) => (
          <Filter.Option
            key={`${BOARDING_MOCK}-${option.value}`}
            filter={BOARDING_MOCK.id}
            option={option}
            onChange={handleBoardingStatusChange}
            isChecked={isOptionChecked(option.value, "boarding")}
          />
        ))}
      </FilterSection>
      {/* Coed Status Filter */}
      <FilterSection title="Coed status" sectionId="coed">
        <div className="flex border border-[rgba(0,0,0,0.1)] rounded-3xl overflow-hidden w-fit">
          <button
            className="p-2 bg-none border-none cursor-pointer text-sm text-[var(--text-default)] transition-all hover:bg-[var(--hover-bg)] border-r border-[var(--border-color)]"
            data-value="coed"
          >
            Coed
          </button>
          <button
            className="p-2 bg-none border-none cursor-pointer text-sm text-[var(--text-default)] transition-all hover:bg-[var(--hover-bg)] border-r border-[var(--border-color)]"
            data-value="girls"
          >
            All-girls
          </button>
          <button
            className="p-2 bg-none border-none cursor-pointer text-sm text-[var(--text-default)] transition-all hover:bg-[var(--hover-bg)]"
            data-value="boys"
          >
            All-boys
          </button>
        </div>
      </FilterSection>
      {/* Type Filter */}
      <FilterSection title="Type" sectionId="type">
        {FILTER_MOCK.TYPE.options.map((option) => (
          <Filter.Option
            key={`${FILTER_MOCK.TYPE}-${option.value}`}
            filter={FILTER_MOCK.TYPE.id}
            option={option}
            onChange={handleTypeChange}
            isChecked={isOptionChecked(option.value, "type")}
          />
        ))}
      </FilterSection>
      {/* Religion Filter */}
      <FilterSection title="Religion" sectionId="religion">
        {FILTER_MOCK.RELIGION.options.map((option) => (
          <Filter.Option
            key={`${FILTER_MOCK.RELIGION}-${option.value}`}
            filter={FILTER_MOCK.RELIGION.id}
            option={option}
            onChange={handleReligionChange}
            isChecked={isOptionChecked(option.value, "religion")}
          />
        ))}
      </FilterSection>
      {/* Specialty Filter */}
      <FilterSection title="Specialty" sectionId="specialty">
        {FILTER_MOCK.SPECIALTY.options.map((option) => (
          <Filter.Option
            key={`${FILTER_MOCK.SPECIALTY}-${option.value}`}
            filter={FILTER_MOCK.SPECIALTY.id}
            option={option}
            onChange={handleSpecialtyChange}
            isChecked={isOptionChecked(option.value, "specialty")}
          />
        ))}
      </FilterSection>
      {/* Tuition Filter */}
      <FilterSection title="Tuition" sectionId="tuition">
        <SliderFilter
          min={0}
          max={50000}
          initialValue={25000}
          value={filters.tuition}
          onSetValue={setTuition}
          unit="$"
          formatValue={(value) => `$${value.toLocaleString("en-US")}`}
        />
      </FilterSection>
      {/* Student-Teacher Ratio Filter */}
      <FilterSection
        title="Student-teacher ratio"
        sectionId="student-teacher-ratio"
        hasTooltip
        tooltipText="Ratio of students to full-time equivalent teachers. Please note: Student-teacher ratio is not a representation of average class size."
      >
        <SliderFilter
          min={2}
          max={50}
          initialValue={2}
          value={filters.ration}
          onSetValue={setRation}
          formatValue={(value) => `${value.toLocaleString("en-US")}:1`}
        />
      </FilterSection>
      {/* Academics Filter */}
      <FilterSection title="Academics" sectionId="academics">
        {ACADEMICS_MOCK.options.map((option) => (
          <Filter.Option
            key={`${ACADEMICS_MOCK}-${option.value}`}
            filter={ACADEMICS_MOCK.id}
            option={option}
            onChange={handleAcademicsChange}
            isChecked={isOptionChecked(option.value, "academics")}
          />
        ))}
      </FilterSection>
      {/* SchoolScout Grades Filter */}
      <FilterSection title="SchoolScout Grades" sectionId="schoolscout-grades">
        <div className="grid gap-4">
          {["Academics", "Teachers", "Diversity", "Sports"].map((category) => (
            <div key={category} className="mb-4">
              <div className="text-sm font-medium mb-2 text-[var(--bold-text)]">
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
                          ? "bg-[#00DF8B] text-white text-[var(--bold-text)]"
                          : "bg-[var(--surface-secondary)] hover:bg-[var(--hover-bg)] text-[var(--text-default)]"
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
      {/* Organization Filter */}
      <FilterSection title="Organization" sectionId="organization">
        <DropdownFilter
          options={ORGANIZATION_MOCK}
          defaultValue={filters.organization}
          onChange={handleOrganizationChange}
        />
      </FilterSection>
      {/* Rating Filter */}
      <FilterSection title="Rating" sectionId="rating">
        <RatingFilter rating={filters.rating} setRating={setRating} />
      </FilterSection>
    </>
  );
};

export default K12Filters;
