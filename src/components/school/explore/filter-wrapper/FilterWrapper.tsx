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

interface FiltersWrapperProps {
  renderFilterButtonsComponent?: () => React.ReactNode;
  renderSortButtonComponent?: () => React.ReactNode;
  renderActiveFiltersComponent?: () => React.ReactNode;
  renderFiltersSidebarComponent?: () => React.ReactNode;
}

const FiltersWrapper: React.FC<FiltersWrapperProps> = ({
  renderActiveFiltersComponent = () => <></>,
  renderFilterButtonsComponent = () => <></>,
  renderFiltersSidebarComponent = () => <></>,
  renderSortButtonComponent = () => <></>,
}) => {
  const { isOpened, setIsOpened, ref: sidebarRef } = useDisclosure();
  const {
    filterK12,
    filterColleges,
    filterGraduates,
    filterDistrict,
    establishment,
    setGrade,
    setMajors,
    setReligion,
    setSpecialty,
    setType,
    getActiveFiltersK12,
    getActiveFiltersCollege,
    getActiveFiltersGraduates,
    getActiveFiltersDistrict,
    setCollegeType,
    setProgram,
  } = useSchoolsExplore((state) => state);

  const currentFilters = useMemo(() => {
    switch (establishment) {
      case "K-12":
        return filterK12;
      case "Colleges":
        return filterColleges;
      case "District":
        return filterDistrict;
      default:
        return filterGraduates;
    }
  }, [establishment, filterK12, filterColleges, filterGraduates, filterDistrict]);

  const getActiveFilters = useMemo(() => {
    switch (establishment) {
      case "K-12":
        return getActiveFiltersK12;
      case "Colleges":
        return getActiveFiltersCollege;
      case "District":
        return getActiveFiltersDistrict;
      default:
        return getActiveFiltersGraduates;
    }
  }, [
    establishment,
    getActiveFiltersK12,
    getActiveFiltersCollege,
    getActiveFiltersGraduates,
    getActiveFiltersDistrict,
  ]);

  const toggleSidebar = () => setIsOpened((prev) => !prev);

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

  return (
    <>
      {/* Desktop filter wrapper */}
      <div 
        className="hidden md:block w-full mb-5 bg-white rounded-xl border border-[rgba(0,0,0,0.1)]"
        style={{
          maxWidth: '1055px',
          padding: '16px 32px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div 
          className="flex items-center justify-between"
          style={{ gap: '16px' }}
        >
          <div 
            className="flex items-center flex-wrap flex-1"
            style={{ gap: '12px' }}
          >
            {renderFilterButtonsComponent()}
          </div>
          <div 
            className="flex items-center"
            style={{ 
              gap: '16px',
              paddingLeft: '24px',
              borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            {renderSortButtonComponent()}
          </div>
        </div>
        <div 
          className="active-filters-bar flex flex-wrap items-center"
          style={{ marginTop: '10px', gap: '8px' }}
        >
          {renderActiveFiltersComponent()}
        </div>
      </div>
      {/* Mobile filter wrapper */}
      <div className="md:hidden w-full mb-4 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {renderFilterButtonsComponent()}
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
            {renderSortButtonComponent()}
          </div>
        </div>
        <div className="active-filters-bar mt-2 flex flex-wrap gap-2 items-center">
          {renderActiveFiltersComponent()}
        </div>
      </div>
      {renderFiltersSidebarComponent()}
    </>
  );
};

export default FiltersWrapper;
