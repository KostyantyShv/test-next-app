"use client";
import { SortComponent } from "@/components/ui/Sort/SortComponent";
import { FilterButtonComponent } from "../../../ui/Filter/FiterButtonComponent";
import { FILTER_CONFIG, sortMock } from "../mock";
import FilterSidebar from "../filter-sidebar/FilterSidebar";
import { useDisclosure } from "@/hooks/useDisclosure";
import FiltersButton from "./FiltersButton";
import {
  CollegeSubTypeFilter,
  CollegeTypeFilter,
  FiltersType,
  FilterValue,
  GradeFilter,
  MajorsType,
  ReligionType,
  SpecialtyType,
  TypeFilter,
} from "@/types/schools-explore";
import ResetButton from "./ResetButton";
import ActiveFilters from "./ActiveFilters";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import { useEffect } from "react";

const FiltersWrapper: React.FC = () => {
  const {
    isOpened: isSidebarOpen,
    setIsOpened: setIsSidebarOpen,
    ref: sidebarRef,
  } = useDisclosure();

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
  } = useSchoolsExplore((state) => state);

  // Select the appropriate filters and getter based on establishment
  const currentFilters =
    establishment === "K-12"
      ? filterK12
      : establishment === "Colleges"
      ? filterColleges
      : filterGraduates;

  const getActiveFilters =
    establishment === "K-12"
      ? getActiveFiltersK12
      : establishment === "Colleges"
      ? getActiveFiltersCollege
      : getActiveFiltersGraduates;

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen((prev) => !prev);

  const getOnChangeHandler = (filterKey: keyof FiltersType) => {
    const setters: Record<keyof FiltersType, (value: FilterValue) => void> = {
      grade: (value) => setGrade(value as GradeFilter),
      type: (value) => setType(value as TypeFilter),
      religion: (value) => setReligion(value as ReligionType),
      specialty: (value) => setSpecialty(value as SpecialtyType),
      collegeType: (value) => {
        const [type, subType] = (value as string).split(": ");
        if (subType) {
          setCollegeType(
            type as CollegeTypeFilter,
            subType as CollegeSubTypeFilter
          );
        }
      },
      majors: (value) => setMajors(value as MajorsType),
      highestGrade: () => {},
      organization: () => {},
      boardingStatus: () => {},
      tuition: () => {},
      ration: () => {},
      schoolScoutGrades: () => {},
      academics: () => {},
      rating: () => {},
    };

    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.dataset.value as FilterValue;
      if (setters[filterKey]) {
        setters[filterKey](value);
      }
    };
  };

  useEffect(() => {
    console.log("Current establishment:", establishment);
    console.log("Current filters:", currentFilters);
    console.log("Active filters:", getActiveFilters());
  }, [establishment, currentFilters, getActiveFilters]);

  const filterConfig = FILTER_CONFIG[establishment] || [];

  return (
    <>
      <div className="w-full mb-5 bg-white p-4 md:px-8 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-[rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap flex-1">
            {filterConfig.map(({ category, filterKey, tooltip }) => (
              <FilterButtonComponent
                key={filterKey}
                category={category}
                onChange={getOnChangeHandler(filterKey)}
                filters={currentFilters}
                filterKey={filterKey}
                tooltip={tooltip}
              />
            ))}
            <FiltersButton
              filtersFlat={getActiveFilters}
              onClick={handleOpenSidebar}
            />
            <ResetButton filters={getActiveFilters} />
          </div>

          <div className="flex items-center gap-4 pl-6 border-l border-[rgba(0,0,0,0.1)]">
            <SortComponent sortData={sortMock} />
          </div>
        </div>

        <div className="active-filters-bar mt-2.5 flex flex-wrap gap-2 items-center">
          <ActiveFilters />
        </div>
      </div>
      <FilterSidebar
        onClose={handleCloseSidebar}
        isSidePanelOpen={isSidebarOpen}
        sidebarRef={sidebarRef}
      />
    </>
  );
};

export default FiltersWrapper;
