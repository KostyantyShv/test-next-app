"use client";
import { SortComponent } from "@/components/ui/Sort/SortComponent";
import { FilterButtonComponent } from "@/components/ui/Filter/FiterButtonComponent";
import { FILTER_CONFIG, sortMock } from "../../explore/mock";
import FilterSidebar from "../../explore/filter-sidebar/FilterSidebar";
import { useDisclosure } from "@/hooks/useDisclosure";
import FiltersButton from "../../explore/filter-wrapper/FiltersButton";
import ResetButton from "../../explore/filter-wrapper/ResetButton";
import ActiveFilters from "../../explore/filter-wrapper/ActiveFilters";
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

interface SearchFiltersWrapperProps {
  renderFilterButtonsComponent?: () => React.ReactNode;
  renderSortButtonComponent?: () => React.ReactNode;
  renderActiveFiltersComponent?: () => React.ReactNode;
  renderFiltersSidebarComponent?: () => React.ReactNode;
}

const SearchFiltersWrapper: React.FC<SearchFiltersWrapperProps> = ({
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
      {/* Filters wrapper with search.html layout */}
      <div className="w-full mb-5 bg-white p-4 md:px-8 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap flex-1">
            {/* Grade Filter */}
            <div className="relative">
              <button className="filter-button flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg width="16" height="16" viewBox="0 0 32 32">
                  <path fill="currentColor" d="M10.8571 26.2857C10.8571 27.2325 10.0896 28 9.14286 28H5.71429C4.76751 28 4 27.2325 4 26.2857V22C4 21.0532 4.76751 20.2857 5.71429 20.2857H9.14286C10.0896 20.2857 10.8571 21.0532 10.8571 22V26.2857ZM19.4286 26.2857V14.2857C19.4286 13.3389 18.6611 12.5714 17.7143 12.5714H14.2857C13.3389 12.5714 12.5714 13.3389 12.5714 14.2857V26.2857C12.5714 27.2325 13.3389 28 14.2857 28H17.7143C18.6611 28 19.4286 27.2325 19.4286 26.2857ZM21.1429 26.2857C21.1429 27.2325 21.9104 28 22.8571 28H26.2857C27.2325 28 28 27.2325 28 26.2857V5.71429C28 4.76751 27.2325 4 26.2857 4H22.8571C21.9104 4 21.1429 4.76751 21.1429 5.71429V26.2857ZM17.7143 14.2857H14.2857V26.2857H17.7143V14.2857ZM26.2857 5.71429H22.8571V26.2857H26.2857V5.71429Z" clipRule="evenodd" fillRule="evenodd"/>
                </svg>
                Grade
              </button>
            </div>

            {/* Type Filter */}
            <div className="relative">
              <button className="filter-button flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                  <path fill="currentColor" d="M8.33333 3.25C8.31123 3.25 8.29004 3.25878 8.27441 3.27441C8.25878 3.29004 8.25 3.31123 8.25 3.33333V8.02267L11.3637 11.1363C11.5043 11.277 11.5833 11.4678 11.5833 11.6667V16.75H16.75V3.33333C16.75 3.31123 16.7412 3.29003 16.7256 3.27441C16.71 3.25878 16.6888 3.25 16.6667 3.25H8.33333ZM10.0833 16.75V11.9773L6.66667 8.56066L3.25 11.9773V16.75H5.91667V14.1667C5.91667 13.7525 6.25245 13.4167 6.66667 13.4167C7.08088 13.4167 7.41667 13.7525 7.41667 14.1667V16.75H10.0833ZM6.75 6.75462C6.53133 6.73031 6.30401 6.80199 6.13634 6.96967L1.96967 11.1363C1.82902 11.277 1.75 11.4678 1.75 11.6667V17.5C1.75 17.9142 2.08579 18.25 2.5 18.25H17.5C17.9142 18.25 18.25 17.9142 18.25 17.5V3.33333C18.25 2.91341 18.0832 2.51068 17.7863 2.21375C17.4893 1.91681 17.0866 1.75 16.6667 1.75H8.33333C7.91341 1.75 7.51068 1.91681 7.21375 2.21375C6.91682 2.51068 6.75 2.91341 6.75 3.33333V6.75462ZM10.8333 5.08333C11.2475 5.08333 11.5833 5.41912 11.5833 5.83333V5.84167C11.5833 6.25588 11.2475 6.59167 10.8333 6.59167C10.4191 6.59167 10.0833 6.25588 10.0833 5.84167V5.83333C10.0833 5.41912 10.4191 5.08333 10.8333 5.08333ZM14.1667 5.08333C14.5809 5.08333 14.9167 5.41912 14.9167 5.83333V5.84167C14.9167 6.25588 14.5809 6.59167 14.1667 6.59167C13.7525 6.59167 13.4167 6.25588 13.4167 5.84167V5.83333C13.4167 5.41912 13.7525 5.08333 14.1667 5.08333ZM14.1667 8.41667C14.5809 8.41667 14.9167 8.75245 14.9167 9.16667V9.175C14.9167 9.58921 14.5809 9.925 14.1667 9.925C13.7525 9.925 13.4167 9.58921 13.4167 9.175V9.16667C13.4167 8.75245 13.7525 8.41667 14.1667 8.41667ZM14.1667 11.75C14.5809 11.75 14.9167 12.0858 14.9167 12.5V12.5083C14.9167 12.9225 14.5809 13.2583 14.1667 13.2583C13.7525 13.2583 13.4167 12.9225 13.4167 12.5083V12.5C13.4167 12.0858 13.7525 11.75 14.1667 11.75Z" clipRule="evenodd" fillRule="evenodd"/>
                </svg>
                Type
              </button>
            </div>

            {/* Religion Filter */}
            <div className="relative">
              <button className="filter-button flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                </svg>
                Religion
              </button>
            </div>

            {/* Specialty Filter */}
            <div className="relative">
              <button className="filter-button flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M11.665 1.33a.75.75 0 0 1 .67 0l10 5a.75.75 0 0 1 0 1.34l-10 5a.75.75 0 0 1-.67 0l-10-5a.75.75 0 0 1 0-1.34l10-5ZM3.677 7 12 11.162 20.323 7 12 2.839 3.677 7ZM1.33 11.665a.75.75 0 0 1 1.006-.336L12 16.162l9.665-4.833a.75.75 0 0 1 .67 1.342l-10 5a.75.75 0 0 1-.67 0l-10-5a.75.75 0 0 1-.336-1.006Zm0 5a.75.75 0 0 1 1.006-.336L12 21.162l9.665-4.833a.75.75 0 0 1 .67 1.342l-10 5a.75.75 0 0 1-.67 0l-10-5a.75.75 0 0 1-.336-1.006Z" clipRule="evenodd"/>
                </svg>
                Specialty
              </button>
            </div>

            {/* More Filters Button */}
            <button className="more-filters-button flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <span className="filter-add-icon">
                <svg viewBox="0 0 448 512" width="14" height="14">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" fill="currentColor"/>
                </svg>
              </span>
              <span className="filter-count-badge bg-gray-200 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">0</span>
              Filters
            </button>

            {/* Reset All Button */}
            <button className="reset-all-button flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <svg fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeWidth="1.2" stroke="currentColor" d="M1 1L13 13M11.9588 2.62429H3.59188C3.47354 2.62419 3.35768 2.65941 3.25817 2.72574C3.15867 2.79208 3.07973 2.88671 3.03082 2.99831C2.98191 3.10991 2.9651 3.23374 2.98239 3.35498C2.99969 3.47622 3.05037 3.58973 3.12836 3.6819L6.39213 7.54388C6.49029 7.66021 6.54432 7.8095 6.54417 7.96399V11.0712C6.54417 11.1207 6.5553 11.1695 6.57667 11.2137C6.59804 11.258 6.62906 11.2965 6.66729 11.3262L8.51401 12.7605C8.55974 12.7961 8.61411 12.8177 8.67104 12.823C8.72797 12.8283 8.7852 12.8171 8.83633 12.7906C8.88745 12.7642 8.93045 12.7235 8.9605 12.6731C8.99055 12.6228 9.00647 12.5647 9.00647 12.5055V7.96399C9.00632 7.8095 9.06035 7.66021 9.15852 7.54388L12.4223 3.68127C12.7707 3.26944 12.4875 2.62429 11.9588 2.62429Z"/>
              </svg>
              Reset All
            </button>
          </div>

          <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
            {/* Sort Button */}
            <div className="relative">
              <button className="sort-button flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/>
                </svg>
                Best Match
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Bar */}
        <div className="active-filters-bar mt-2.5 flex flex-wrap gap-2 items-center">
          {/* <span className="active-filter-label text-sm font-medium text-gray-700">Active Filters:</span> */}
          {/* Active filters will be added dynamically */}
        </div>
      </div>
      {renderFiltersSidebarComponent()}
    </>
  );
};

export default SearchFiltersWrapper; 