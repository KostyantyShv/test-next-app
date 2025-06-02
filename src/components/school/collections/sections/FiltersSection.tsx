import React, { useEffect } from "react";
import FiltersWrapper from "../../explore/filter-wrapper/FilterWrapper";
import { useSchoolsCollection } from "@/store/use-schools-collections";
import { FILTER_CONFIG, sortMock } from "../mock";
import { FilterButtonComponent } from "@/components/ui/Filter/FiterButtonComponent";
import {
  FiltersType,
  FilterValue,
  ReligionType,
  SchoolScoutGrade,
  SchoolScoutGradeEntry,
  SpecialtyType,
} from "@/types/schools-explore";
import {
  SubtypesEstablishmentType,
  TypesEstablishmentType,
  VendorType,
} from "@/types/schools-collections";
import ResetButton from "../../explore/filter-wrapper/ResetButton";
import ActiveFilters from "../../explore/filter-wrapper/ActiveFilters";
import FiltersButton from "../../explore/filter-wrapper/FiltersButton";
import { useDisclosure } from "@/hooks/useDisclosure";
import { AllFiltersType } from "@/types/filter";
import FilterSidebar from "../../explore/filter-sidebar/FilterSidebar";
import { SortComponent } from "@/components/ui/Sort/SortComponent";
import SidebarFilters from "../sidebar-filters/SidebarFilters";

const FiltersSection = () => {
  const { isOpened, setIsOpened, ref: sidebarRef } = useDisclosure();

  const {
    collectionsFilters,
    setRating,
    setReligion,
    setSpecialty,
    setType,
    setVendor,
    resetFilters,
    getActiveFilters,
    removeFilter,
  } = useSchoolsCollection((state) => state);

  const toggleSidebar = () => setIsOpened((prev) => !prev);

  useEffect(() => {
    console.log(getActiveFilters());
  }, [getActiveFilters]);

  const isGradeSelected = (
    category: string,
    grade: SchoolScoutGrade
  ): boolean | undefined => {
    return (
      collectionsFilters.schoolScoutGrades &&
      collectionsFilters.schoolScoutGrades.includes(
        `${category}: ${grade}` as SchoolScoutGradeEntry
      )
    );
  };

  const isOptionChecked = (
    optionValue: string,
    key: keyof FiltersType
  ): boolean => {
    const filterValue = collectionsFilters[key];
    return (
      Array.isArray(filterValue) && filterValue.includes(optionValue as never)
    );
  };

  const getOnChangeHandler = (filterKey: keyof AllFiltersType) => {
    const setters: Record<keyof FiltersType, (value: FilterValue) => void> = {
      religion: (value) => setReligion(value as ReligionType),
      specialty: (value) => setSpecialty(value as SpecialtyType),
      rating: (value) => setRating(value as number),
      vendor: (value) => setVendor(value as VendorType),
      studyType: (value) => {
        const [type, subType] = (value as string).split(": ");
        console.log("type", type);

        if (subType) {
          setType(
            type as TypesEstablishmentType,
            subType as SubtypesEstablishmentType
          );
        }
      },
    };
    console.log(filterKey);

    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setters[filterKey]?.(e.target.dataset.value as FilterValue);
  };

  const renderFilters = () => (
    <SidebarFilters
      isOptionChecked={isOptionChecked}
      isGradeSelected={isGradeSelected}
    />
  );

  const renderFilterButtons = () => (
    <div className="flex items-center gap-3 flex-wrap flex-1">
      {FILTER_CONFIG.map(
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
            filters={collectionsFilters}
            filterKey={filterKey}
            tooltip={tooltip}
            hasTextInput={hasTextInput}
            inputPlaceholder={inputPlaceholder}
            withSubOptions={withSubOptions}
          />
        )
      )}
      <FiltersButton
        filtersFlat={getActiveFilters}
        onClick={() => setIsOpened((prev) => !prev)}
      />
      <ResetButton filters={getActiveFilters} onClick={resetFilters} />
    </div>
  );

  const renderActiveFilters = () => (
    <ActiveFilters filters={getActiveFilters} removeFilter={removeFilter} />
  );

  const renderSortButton = () => <SortComponent sortData={sortMock} />;

  const renderFilterSidebar = () => (
    <FilterSidebar
      isSidePanelOpen={isOpened}
      onClose={toggleSidebar}
      renderFilters={renderFilters}
      sidebarRef={sidebarRef}
    />
  );
  return (
    <FiltersWrapper
      renderFilterButtonsComponent={renderFilterButtons}
      renderActiveFiltersComponent={renderActiveFilters}
      renderFiltersSidebarComponent={renderFilterSidebar}
      renderSortButtonComponent={renderSortButton}
    />
  );
};

export default FiltersSection;
