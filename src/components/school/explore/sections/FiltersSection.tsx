import { FilterButtonComponent } from "@/components/ui/Filter/FiterButtonComponent";
import { SortComponent } from "@/components/ui/Sort/SortComponent";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import {
  FiltersType,
  FilterValue,
  GradeFilter,
  TypeFilter,
  ReligionType,
  SpecialtyType,
  CollegeTypeFilter,
  CollegeSubTypeFilter,
  MajorsType,
  Program,
  SchoolScoutGrade,
  SchoolScoutGradeEntry,
} from "@/types/schools-explore";
import React, { useMemo } from "react";
import FilterSidebar from "../filter-sidebar/FilterSidebar";
import ActiveFilters from "../filter-wrapper/ActiveFilters";
import FiltersButton from "../filter-wrapper/FiltersButton";
import FiltersWrapper from "../filter-wrapper/FilterWrapper";
import ResetButton from "../filter-wrapper/ResetButton";
import { FILTER_CONFIG, sortMock } from "../mock";
import K12Filters from "../filter-sidebar/filters/k12-filters";
import { ESTABLISHMENT } from "@/store/enum";
import CollegesFilters from "../filter-sidebar/filters/colleges-filters";

const FiltersSection = () => {
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
    resetFilters,
    removeFilter,
  } = useSchoolsExplore((state) => state);
  const { isOpened, setIsOpened, ref: sidebarRef } = useDisclosure();

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

  const getOnChangeHandler = (filterKey: keyof FiltersType) => {
    const setters: Record<keyof FiltersType, (value: FilterValue) => void> = {
      grade: (value) => setGrade(value as GradeFilter),
      type: (value) => setType(value as TypeFilter),
      religion: (value) => setReligion(value as ReligionType),
      specialty: (value) => setSpecialty(value as SpecialtyType),
      collegeTypeColleges: (value) => {
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

  const toggleSidebar = () => setIsOpened((prev) => !prev);

  const isOptionChecked = (
    optionValue: string,
    key: keyof FiltersType
  ): boolean => {
    const filterValue = currentFilters[key];
    return (
      Array.isArray(filterValue) && filterValue.includes(optionValue as never)
    );
  };

  const isGradeSelected = (
    category: string,
    grade: SchoolScoutGrade
  ): boolean => {
    return currentFilters.schoolScoutGrades.includes(
      `${category}: ${grade}` as SchoolScoutGradeEntry
    );
  };

  const renderFilters = () => {
    switch (establishment) {
      case ESTABLISHMENT.K_12:
        return (
          <K12Filters
            isOptionChecked={isOptionChecked}
            isGradeSelected={isGradeSelected}
          />
        );
      case ESTABLISHMENT.COLLEGES:
        return <CollegesFilters isOptionChecked={isOptionChecked} />;
      case ESTABLISHMENT.GRADUATES:
        return <p>Coming soon...</p>;
      default:
        return null;
    }
  };

  const renderFilterButtons = () => (
    <div className="flex items-center gap-3 flex-wrap flex-1">
      {FILTER_CONFIG[establishment]?.map(
        ({
          category,
          filterKey,
          withSubOptions,
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
            withSubOptions={withSubOptions}
          />
        )
      )}
      <FiltersButton filtersFlat={getActiveFilters} onClick={toggleSidebar} />
      <ResetButton filters={getActiveFilters} onClick={resetFilters} />
    </div>
  );

  const renderActiveFilters = () => (
    <ActiveFilters filters={getActiveFilters} removeFilter={removeFilter} />
  );

  const renderSortButton = () => <SortComponent sortData={sortMock} />;

  const renderFilterSidebar = () => (
    <FilterSidebar
      onClose={toggleSidebar}
      isSidePanelOpen={isOpened}
      sidebarRef={sidebarRef}
      renderFilters={renderFilters}
    />
  );
  return (
    <FiltersWrapper
      renderFilterButtonsComponent={renderFilterButtons}
      renderSortButtonComponent={renderSortButton}
      renderActiveFiltersComponent={renderActiveFilters}
      renderFiltersSidebarComponent={renderFilterSidebar}
    />
  );
};

export default FiltersSection;
