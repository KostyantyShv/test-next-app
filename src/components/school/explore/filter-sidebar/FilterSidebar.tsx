import React, { RefObject } from "react";
import { FilterSection } from "./FilterSection"; // Import the updated FilterSection
import { Overlay } from "@/components/ui/Overlay/Overlay";
import { SidebarHeader } from "./SidebarHeader";
import { CheckboxFilter } from "./CheckBoxFilter";
import { DropdownFilter } from "./DropdownFilter";
import { SliderFilter } from "./SliderFilter";
import { SidebarFooter } from "./SidebarFooter";
import { RatingFilter } from "./RatingFilter";
import Filter from "@/components/ui/Filter/Filter";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import {
  ACADEMICS_MOCK,
  BOARDING_MOCK,
  FILTER_MOCK,
  highestGrade,
  ORGANIZATION_MOCK,
} from "../mock";
import {
  Academics,
  BoardingStatus,
  FiltersType,
  GradeFilter,
  GradeLevel,
  Organization,
  ReligionType,
  SpecialtyType,
  TypeFilter,
} from "@/types/schools-explore";
import { AcademicsMockType } from "@/types/filter";

interface FilterSidebarProps {
  isSidePanelOpen: boolean;
  onClose: () => void;
  sidebarRef: RefObject<HTMLDivElement | null>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isSidePanelOpen,
  onClose,
  sidebarRef,
}) => {
  const filters = useSchoolsExplore((state) => state.filters);
  const {
    setGrade,
    setReligion,
    setSpecialty,
    setType,
    setHighestGrade,
    setBoardingStatus,
    setTuition,
    setRation,
    setAcademics,
    setOrganization,
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

  const handleTuitionChange = (value: number) => {
    console.log("Tuition changed to:", value);
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setGrade(value as GradeFilter);
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

  const isOptionChecked = (
    optionValue: string,
    key: keyof FiltersType
  ): boolean => {
    const filterValue = filters[key];
    if (Array.isArray(filterValue)) {
      return filterValue.includes(optionValue as GradeFilter);
    }
    return false;
  };

  return (
    <>
      <Overlay isSidePanelOpen={isSidePanelOpen} />
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 w-[400px] h-full bg-white shadow-[-4px_0_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out z-[1001] flex flex-col overflow-y-auto ${
          isSidePanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="sidePanel"
      >
        <SidebarHeader onClose={onClose} />
        <div className="p-6 flex-1 overflow-y-auto">
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
                className="p-2 bg-none border-none cursor-pointer text-sm text-text-default transition-all hover:bg-[#f5f5f7] border-r border-[rgba(0,0,0,0.1)]"
                data-value="coed"
              >
                Coed
              </button>
              <button
                className="p-2 bg-none border-none cursor-pointer text-sm text-text-default transition-all hover:bg-[#f5f5f7] border-r border-[rgba(0,0,0,0.1)]"
                data-value="girls"
              >
                All-girls
              </button>
              <button
                className="p-2 bg-none border-none cursor-pointer text-sm text-text-default transition-all hover:bg-[#f5f5f7]"
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
              onChange={handleTuitionChange}
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
              onChange={handleTuitionChange}
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
          <FilterSection
            title="SchoolScout Grades"
            sectionId="schoolscout-grades"
          >
            <div className="grid gap-4">
              {["Academics", "Teachers", "Diversity", "Sports"].map(
                (category) => (
                  <div key={category} className="mb-4">
                    <div className="text-sm font-medium mb-2 text-bold-text">
                      {category}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {["a", "b", "c", "d"].map((grade) => (
                        <button
                          key={grade}
                          className="w-9 h-9 flex items-center justify-center border border-[rgba(0,0,0,0.1)] rounded-full bg-white cursor-pointer text-sm font-medium transition-all hover:bg-[#f5f5f7]"
                          data-category={category.toLowerCase()}
                          data-grade={grade}
                        >
                          {grade.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )}
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
            <RatingFilter />
          </FilterSection>
        </div>
        <SidebarFooter />
      </div>
    </>
  );
};

export default FilterSidebar;
