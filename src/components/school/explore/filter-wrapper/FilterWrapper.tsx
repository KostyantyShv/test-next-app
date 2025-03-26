"use client";
import { SortComponent } from "@/components/ui/Sort/SortComponent";
import { FilterButtonComponent } from "../../../ui/Filter/FiterButtonComponent";
import { FILTER_MOCK, sortMock } from "../mock";
import FilterSidebar from "../filter-sidebar/FilterSidebar";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import FiltersButton from "./FiltersButton"; // Import FiltersButton
import {
  GradeFilter,
  ReligionType,
  SpecialtyType,
  TypeFilter,
} from "@/types/schools-explore";
import ResetButton from "./ResetButton";
import ActiveFilters from "./ActiveFilters";

const FiltersWrapper: React.FC = () => {
  const {
    isOpened: isSidebarOpen,
    setIsOpened: setIsSidebarOpen,
    ref: sidebarRef,
  } = useDisclosure();
  const filters = useSchoolsExplore((state) => state.filters);
  const { setGrade, setReligion, setSpecialty, setType, getActiveFilters } =
    useSchoolsExplore((state) => state);

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setGrade(value as GradeFilter);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setType(value as TypeFilter);
  };

  const handleReligionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setReligion(value as ReligionType);
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setSpecialty(value as SpecialtyType);
  };

  return (
    <>
      <div className="w-full mb-5 bg-white p-4 md:px-8 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-[rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap flex-1">
            <FilterButtonComponent
              category={FILTER_MOCK.GRADE}
              onChange={handleGradeChange}
              filters={filters}
              filterKey="grade"
            />
            <FilterButtonComponent
              category={FILTER_MOCK.TYPE}
              onChange={handleTypeChange}
              filters={filters}
              filterKey="type"
            />
            <FilterButtonComponent
              category={FILTER_MOCK.RELIGION}
              onChange={handleReligionChange}
              filters={filters}
              filterKey="religion"
            />
            <FilterButtonComponent
              category={FILTER_MOCK.SPECIALTY}
              onChange={handleSpecialtyChange}
              filters={filters}
              filterKey="specialty"
            />
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
