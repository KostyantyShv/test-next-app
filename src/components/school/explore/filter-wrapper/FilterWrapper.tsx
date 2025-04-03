"use client";
import { SortComponent } from "@/components/ui/Sort/SortComponent";
import { FilterButtonComponent } from "../../../ui/Filter/FiterButtonComponent";
import { FILTER_CONFIG, sortMock } from "../mock";
import FilterSidebar from "../filter-sidebar/FilterSidebar";
import { useDisclosure } from "@/hooks/useDisclosure";
import FiltersButton from "./FiltersButton";
import ResetButton from "./ResetButton";
import ActiveFilters from "./ActiveFilters";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import { useMemo } from "react";
import {
  CollegeSubTypeFilter,
  CollegeTypeFilter,
  FiltersType,
  FilterValue,
  GradeFilter,
  MajorsType,
  Program,
  ReligionType,
  SpecialtyType,
  TypeFilter,
} from "@/types/schools-explore";

const FiltersWrapper: React.FC = () => {
  const { isOpened, setIsOpened, ref: sidebarRef } = useDisclosure();
  const {
    filterK12,
    filterColleges,
    filterGraduates,
    establishment,
    setGrade,
    setMajors,
    setReligion,
    setSpecialty,
    setType,
    getActiveFiltersK12,
    getActiveFiltersCollege,
    getActiveFiltersGraduates,
    setCollegeType,
    setProgram,
  } = useSchoolsExplore((state) => state);

  const currentFilters = useMemo(() => {
    switch (establishment) {
      case "K-12":
        return filterK12;
      case "Colleges":
        return filterColleges;
      default:
        return filterGraduates;
    }
  }, [establishment, filterK12, filterColleges, filterGraduates]);

  const getActiveFilters = useMemo(() => {
    switch (establishment) {
      case "K-12":
        return getActiveFiltersK12;
      case "Colleges":
        return getActiveFiltersCollege;
      default:
        return getActiveFiltersGraduates;
    }
  }, [
    establishment,
    getActiveFiltersK12,
    getActiveFiltersCollege,
    getActiveFiltersGraduates,
  ]);

  const toggleSidebar = () => setIsOpened((prev) => !prev);

  const getOnChangeHandler = (filterKey: keyof FiltersType) => {
    const setters: Record<keyof FiltersType, (value: FilterValue) => void> = {
      grade: (value) => setGrade(value as GradeFilter),
      type: (value) => setType(value as TypeFilter),
      religion: (value) => setReligion(value as ReligionType),
      specialty: (value) => setSpecialty(value as SpecialtyType),
      collegeType: (value) => {
        const [type, subType] = (value as string).split(": ");
        if (subType)
          setCollegeType(
            type as CollegeTypeFilter,
            subType as CollegeSubTypeFilter
          );
      },
      majors: (value) => setMajors(value as MajorsType),
      program: (value) => setProgram(value as Program),
    };

    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setters[filterKey]?.(e.target.dataset.value as FilterValue);
  };

  return (
    <>
      <div className="w-full mb-5 bg-white p-4 md:px-8 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap flex-1">
            {FILTER_CONFIG[establishment]?.map(
              ({
                category,
                filterKey,
                tooltip,
                hasTextInput,
                inputPlaceholder,
              }) => (
                <FilterButtonComponent
                  key={filterKey}
                  category={category}
                  onChange={getOnChangeHandler(filterKey)}
                  filters={currentFilters}
                  filterKey={filterKey}
                  tooltip={tooltip}
                  hasTextInput={hasTextInput}
                  inputPlaceholder={inputPlaceholder}
                />
              )
            )}
            <FiltersButton
              filtersFlat={getActiveFilters}
              onClick={toggleSidebar}
            />
            <ResetButton filters={getActiveFilters} />
          </div>
          <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
            <SortComponent sortData={sortMock} />
          </div>
        </div>
        <div className="active-filters-bar mt-2.5 flex flex-wrap gap-2 items-center">
          <ActiveFilters />
        </div>
      </div>
      <FilterSidebar
        onClose={toggleSidebar}
        isSidePanelOpen={isOpened}
        sidebarRef={sidebarRef}
      />
    </>
  );
};

export default FiltersWrapper;
