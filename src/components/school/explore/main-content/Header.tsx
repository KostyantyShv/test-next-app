import React, { ReactNode, useState, useMemo } from "react";
import CategoryDropdown from "./CategoryDropdown";
import SearchBox from "./SearchBox";
import MapButton from "./MapButton";
import LayoutToggle from "./LayoutToggle";
import MapContainer from "./MapContainer";
import { School } from "../types";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import { establishmentTypes } from "./mock";
import K12Filters from "../filter-sidebar/filters/k12-filters";
import CollegesFilters from "../filter-sidebar/filters/colleges-filters";
import { ESTABLISHMENT } from "@/store/enum";
import { Portal } from "@/components/ui/Portal";
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
  EstablishmentType,
} from "@/types/schools-explore";

interface HeaderProps {
  isSearchActive: boolean;
  setIsSearchActive: (value: boolean) => void;
  isMapActive: boolean;
  setIsMapActive: (value: boolean) => void;
  schools: School[];
  layout: string;
  setLayout: (value: string) => void;
  renderDropdownItems: () => React.ReactNode;
  dropdownValue: string;
  dropdownIcon?: ReactNode;
  layouts: {
    type: string;
    icon: ReactNode;
  }[];
  layoutToggleWidth: number;
  renderActionsButton?: () => React.ReactNode;
  renderItemsCount?: () => React.ReactNode;
  renderSearchTypeButton?: () => React.ReactNode;
  renderExpandCollapseButton?: () => React.ReactNode;
  onContainerExpandChange?: (isExpanded: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  isSearchActive,
  setIsSearchActive,
  isMapActive,
  setIsMapActive,
  schools,
  layout,
  setLayout,
  renderDropdownItems,
  dropdownValue,
  dropdownIcon,
  layouts,
  layoutToggleWidth,
  renderItemsCount = () => <></>,
  renderActionsButton = () => <></>,
  renderSearchTypeButton = () => <></>,
  renderExpandCollapseButton = () => <></>,
  onContainerExpandChange,
}) => {
  const [isContainerExpanded, setIsContainerExpanded] = useState(false);
  const {
    setEstablishment,
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
    setCollegeType,
    setProgram,
    resetFilters,
    removeFilter,
  } = useSchoolsExplore((state) => state);
  const [isEstablishmentDrawerOpen, setIsEstablishmentDrawerOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isOptionsDrawerOpen, setIsOptionsDrawerOpen] = useState(false);
  const [isMapDrawerOpen, setIsMapDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filterCount = useMemo(() => {
    const values = currentFilters;
    let count = 0;

    (["grade", "type", "religion", "specialty", "schoolScoutGrades"] as const).forEach(
      (key) => {
        const val = values[key as keyof FiltersType];
        if (Array.isArray(val)) {
          count += val.length;
        }
      }
    );

    if (values.program) count += 1;
    if (values.majors) count += 1;
    if (
      Array.isArray(values.collegeTypeColleges) &&
      values.collegeTypeColleges.length
    ) {
      count += values.collegeTypeColleges.length;
    }

    return count;
  }, [currentFilters]);

  const isOverlayVisible =
    isEstablishmentDrawerOpen ||
    isFilterDrawerOpen ||
    isOptionsDrawerOpen ||
    isMapDrawerOpen;

  const closeAllMobileLayers = () => {
    setIsEstablishmentDrawerOpen(false);
    setIsFilterDrawerOpen(false);
    setIsOptionsDrawerOpen(false);
    setIsMapDrawerOpen(false);
    setIsMapActive(false);
  };

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
      case ESTABLISHMENT.DISTRICT:
        return (
          <K12Filters
            isOptionChecked={isOptionChecked}
            isGradeSelected={isGradeSelected}
          />
        );
      case ESTABLISHMENT.GRADUATES:
        return <p>Coming soon...</p>;
      default:
        return null;
    }
  };

  const getEstablishmentIcon = (type: string) => {
    switch (type) {
      case "K-12":
        return (
          <svg width="24" height="24" fill="none" viewBox="0 0 20 20" className="w-5 h-5">
            <path fill="currentColor" d="M8.33333 3.25C8.31123 3.25 8.29004 3.25878 8.27441 3.27441C8.25878 3.29004 8.25 3.31123 8.25 3.33333V8.02267L11.3637 11.1363C11.5043 11.277 11.5833 11.4678 11.5833 11.6667V16.75H16.75V3.33333C16.75 3.31123 16.7412 3.29003 16.7256 3.27441C16.71 3.25878 16.6888 3.25 16.6667 3.25H8.33333ZM10.0833 16.75V11.9773L6.66667 8.56066L3.25 11.9773V16.75H5.91667V14.1667C5.91667 13.7525 6.25245 13.4167 6.66667 13.4167C7.08088 13.4167 7.41667 13.7525 7.41667 14.1667V16.75H10.0833ZM6.75 6.75462C6.53133 6.73031 6.30401 6.80199 6.13634 6.96967L1.96967 11.1363C1.82902 11.277 1.75 11.4678 1.75 11.6667V17.5C1.75 17.9142 2.08579 18.25 2.5 18.25H17.5C17.9142 18.25 18.25 17.9142 18.25 17.5V3.33333C18.25 2.91341 18.0832 2.51068 17.7863 2.21375C17.4893 1.91681 17.0866 1.75 16.6667 1.75H8.33333C7.91341 1.75 7.51068 1.91681 7.21375 2.21375C6.91682 2.51068 6.75 2.91341 6.75 3.33333V6.75462ZM10.8333 5.08333C11.2475 5.08333 11.5833 5.41912 11.5833 5.83333V5.84167C11.5833 6.25588 11.2475 6.59167 10.8333 6.59167C10.4191 6.59167 10.0833 6.25588 10.0833 5.84167V5.83333C10.0833 5.41912 10.4191 5.08333 10.8333 5.08333ZM14.1667 5.08333C14.5809 5.08333 14.9167 5.41912 14.9167 5.83333V5.84167C14.9167 6.25588 14.5809 6.59167 14.1667 6.59167C13.7525 6.59167 13.4167 6.25588 13.4167 5.84167V5.83333C13.4167 5.41912 13.7525 5.08333 14.1667 5.08333ZM14.1667 8.41667C14.5809 8.41667 14.9167 8.75245 14.9167 9.16667V9.175C14.9167 9.58921 14.5809 9.925 14.1667 9.925C13.7525 9.925 13.4167 9.58921 13.4167 9.175V9.16667C13.4167 8.75245 13.7525 8.41667 14.1667 8.41667ZM14.1667 11.75C14.5809 11.75 14.9167 12.0858 14.9167 12.5V12.5083C14.9167 12.9225 14.5809 13.2583 14.1667 13.2583C13.7525 13.2583 13.4167 12.9225 13.4167 12.5083V12.5C13.4167 12.0858 13.7525 11.75 14.1667 11.75Z" clipRule="evenodd" fillRule="evenodd"></path>
          </svg>
        );
      case "Colleges":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M12 2l10 5v10l-10 5-10-5V7l10-5z" />
            <path d="M12 13l8-4" />
            <path d="M12 13v9" />
            <path d="M12 13L4 9" />
          </svg>
        );
      case "Graduates":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        );
      case "District":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M4 4h6v6h-6z"></path>
            <path d="M14 4h6v6h-6z"></path>
            <path d="M4 14h6v6h-6z"></path>
            <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
          </svg>
        );
    }
  };

  const handleEstablishmentSelect = (establishment: string) => {
    setEstablishment(establishment as EstablishmentType);
    setIsEstablishmentDrawerOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    setIsSearchActive(false);
    setSearchQuery("");
  };

  const handleCloseSearch = () => {
    setIsSearchActive(false);
    setSearchQuery("");
  };

  const handleMapToggle = () => {
    if (window.innerWidth < 768) {
      // Mobile: open map drawer
      setIsMapDrawerOpen(true);
      setIsMapActive(true);
    } else {
      // Desktop: toggle map state
      setIsMapActive(!isMapActive);
    }
  };

  const handleLayoutChange = (newLayout: string) => {
    setLayout(newLayout);
    setIsOptionsDrawerOpen(false);
  };

  const handleClearFilters = () => {
    resetFilters();
  };

  const handleShowResults = () => {
    setIsFilterDrawerOpen(false);
  };

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between p-6 border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="group flex items-center gap-3 relative cursor-pointer p-2 rounded-2xl hover:bg-[#f5f5f7] transition-colors">
          <div className="w-6 h-6 flex items-center justify-center text-[#464646]">
            {getEstablishmentIcon(dropdownValue)}
          </div>
          <h1 className="text-lg font-semibold text-[#464646]">{dropdownValue}</h1>
          <div className="w-4 h-4 ml-2 text-[#4A4A4A]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"></path>
            </svg>
          </div>

          {/* School Type Tooltip */}
          <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 w-64 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            {establishmentTypes.map((type) => (
              <div
                key={type}
                onClick={() => handleEstablishmentSelect(type)}
                className="flex items-center p-3 hover:bg-[rgba(0,0,0,0.04)] transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 flex items-center justify-center mr-3 text-[#5F5F5F]">
                  {getEstablishmentIcon(type)}
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-[#4A4A4A] text-sm font-medium">{type}</span>
                  <span className="text-[#5F5F5F] text-xs">
                    {type === "K-12" && "2,583 schools"}
                    {type === "Colleges" && "1,870 colleges"}
                    {type === "Graduates" && "642 programs"}
                    {type === "District" && "1,234 districts"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Expand/Collapse Button */}
          <button
            onClick={() => {
              setIsContainerExpanded(!isContainerExpanded);
              onContainerExpandChange?.(!isContainerExpanded);
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#4A4A4A] hover:bg-[rgba(0,0,0,0.05)] transition-colors"
          >
            {isContainerExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M15 4v16"></path>
                <path d="M9 10l2 2l-2 2"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M15 4v16"></path>
                <path d="M10 10l-2 2l2 2"></path>
              </svg>
            )}
          </button>

          {/* Search Box */}
          <div className={`relative ${isSearchActive ? 'flex' : 'hidden'} items-center gap-3`}>
            <button
              onClick={handleCloseSearch}
              className="text-[#5F5F5F] hover:text-[#4A4A4A] transition-colors flex-shrink-0"
            >
              {/* ==================== */}
              <svg width="22" height="14" fill="none" viewBox="0 0 19 19">
                <path d="M6.34314 4.22183C5.75736 3.63604 4.80761 3.63604 4.22182 4.22183C3.63604 4.80761 3.63604 5.75736 4.22182 6.34315L9.87868 12L4.22182 17.6569C3.63604 18.2426 3.63604 19.1924 4.22182 19.7782C4.80761 20.364 5.75736 20.364 6.34314 19.7782L12 14.1213L17.6569 19.7782C18.2426 20.364 19.1924 20.364 19.7782 19.7782C20.364 19.1924 20.364 18.2426 19.7782 17.6569L14.1213 12L19.7782 6.34315C20.364 5.75736 20.364 4.80761 19.7782 4.22183C19.1924 3.63604 18.2426 3.63604 17.6569 4.22183L12 9.87868L6.34314 4.22183Z" fill="currentColor" />
              </svg>
            </button>

            <div className="flex items-center bg-white border border-[rgba(0,0,0,0.1)] rounded h-10 w-[350px] flex-shrink-0">
              <div className="text-sm font-semibold text-[#484848] px-3 whitespace-nowrap flex-shrink-0">Where</div>
              <div className="flex items-center relative flex-1 h-full px-3 min-w-0">
                <input
                  type="text"
                  placeholder="Enter a city, state or country"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-none outline-none text-sm w-full h-full bg-transparent"
                  autoFocus
                />
                <button
                  onClick={() => setSearchQuery("")}
                  className={`w-5 h-5 flex items-center justify-center text-[#5F5F5F] opacity-70 hover:opacity-100 transition-opacity flex-shrink-0 translate-y-0.5 ${searchQuery.length >= 2 ? 'flex' : 'hidden'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">

                    {/* ==================== */}

                    <path fill="currentColor" d="M9.33398 18.791C14.3045 18.791 18.334 14.7616 18.334 9.79102C18.334 4.82045 14.3045 0.791016 9.33398 0.791016C4.36342 0.791016 0.333984 4.82045 0.333984 9.79102C0.333984 14.7616 4.36342 18.791 9.33398 18.791ZM6.86431 6.26069C6.57142 5.96779 6.09655 5.96779 5.80365 6.26069C5.51076 6.55358 5.51076 7.02845 5.80365 7.32135L8.27332 9.79102L5.80365 12.2607C5.51076 12.5536 5.51076 13.0285 5.80365 13.3213C6.09655 13.6142 6.57142 13.6142 6.86431 13.3213L9.33398 10.8517L11.8037 13.3213C12.0965 13.6142 12.5714 13.6142 12.8643 13.3213C13.1572 13.0285 13.1572 12.5536 12.8643 12.2607L10.3946 9.79102L12.8643 7.32135C13.1572 7.02845 13.1572 6.55358 12.8643 6.26069C12.5714 5.96779 12.0965 5.96779 11.8037 6.26069L9.33398 8.73036L6.86431 6.26069Z" clipRule="evenodd" fillRule="evenodd"></path>

                  </svg>
                </button>
                <button className="w-6 h-6 flex items-center justify-center text-[#0093B0] opacity-80 hover:opacity-100 transition-opacity flex-shrink-0">
                  <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7 c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z"></path><path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3 c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8 C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1 c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1 C18.6,5.5,19.8,8.4,19.2,11.2z"></path>
                  </svg>
                </button>
                <button className="w-7 h-7 rounded-full bg-[#0093B0] flex items-center justify-center ml-2 flex-shrink-0">
                  <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                    <path d="M21.7,20.3l-3.3-2.9c1.5-1.7,2.3-3.8,2.3-6.1c0-5.1-4.2-9.3-9.3-9.3S2,6.2,2,11.3s4.2,9.3,9.3,9.3c2.1,0,4-0.7,5.7-1.9l3.4,3c0.2,0.2,0.4,0.2,0.6,0.2c0.3,0,0.5-0.1,0.7-0.3C22.1,21.3,22.1,20.7,21.7,20.3z M11.3,18.7c-4.1,0-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4S15.4,18.7,11.3,18.7z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Search Button */}
          {!isSearchActive && (
            <button
              onClick={() => setIsSearchActive(true)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#4A4A4A] hover:bg-[rgba(0,0,0,0.05)] transition-colors"
            >
              <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                <path d="M21.7,20.3l-3.3-2.9c1.5-1.7,2.3-3.8,2.3-6.1c0-5.1-4.2-9.3-9.3-9.3S2,6.2,2,11.3s4.2,9.3,9.3,9.3c2.1,0,4-0.7,5.7-1.9l3.4,3c0.2,0.2,0.4,0.2,0.6,0.2c0.3,0,0.5-0.1,0.7-0.3C22.1,21.3,22.1,20.7,21.7,20.3z M11.3,18.7c-4.1,0-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4S15.4,18.7,11.3,18.7z"></path>
              </svg>
            </button>
          )}

          {/* Map Button */}
          <button
            onClick={handleMapToggle}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors border ${isMapActive
              ? 'bg-[#EBFCF4] border-[#016853] text-[#016853]'
              : 'text-[#4A4A4A] hover:bg-[rgba(0,0,0,0.05)] border-[rgba(0,0,0,0.1)]'
              }`}
          >
            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
              <path d="M17.3 8.64003L21.54 10.86L21.55 10.85C21.83 11 22.01 11.28 22.01 11.6V21.13C22.01 21.43 21.86 21.7 21.61 21.86C21.47 21.94 21.32 21.99 21.16 21.99C21.02 21.99 20.9 21.96 20.78 21.9L14.79 18.89L9.64001 21.84C9.62001 21.85 9.54001 21.88 9.51001 21.88C9.46001 21.91 9.37001 21.95 9.28001 21.95H9.21001C9.06001 21.95 8.93001 21.92 8.81001 21.86L2.48001 18.69C2.20001 18.54 2.01001 18.25 2.01001 17.92V8.39003C2.01001 8.10003 2.17001 7.82003 2.42001 7.66003C2.67001 7.51003 3.00001 7.50003 3.26001 7.64003L6.83001 9.50003C6.78001 9.33003 6.74001 9.18003 6.71001 9.03003C6.28001 6.83003 6.82001 4.80003 8.21001 3.45003C10.24 1.48003 13.64 1.51003 15.64 3.51003C16.62 4.48003 17.22 5.83003 17.34 7.30003C17.38 7.72003 17.36 8.17003 17.3 8.64003ZM20.29 19.77V12.14L16.85 10.33C16.62 10.88 16.34 11.4 16 11.87L15.6 12.43V17.41L20.29 19.77ZM3.71001 17.41L8.33001 19.73V12.43L8.10001 12.11L3.71001 9.82003V17.41ZM10.04 19.66L13.89 17.44V14.77L12.84 16.21C12.44 16.78 11.48 16.78 11.07 16.21L10.04 14.78V19.66ZM11.96 14.54L14.62 10.87H14.63C15.37 9.83003 15.74 8.59003 15.64 7.45003C15.55 6.38003 15.1 5.38003 14.44 4.73003C13.78 4.08003 12.86 3.70003 11.9 3.70003C10.94 3.70003 10.04 4.06003 9.39001 4.70003C8.65001 5.41003 8.26001 6.44003 8.26001 7.60003C8.26001 7.96003 8.30001 8.34003 8.38001 8.72003C8.53001 9.53003 8.88001 10.31 9.47001 11.11L11.96 14.54Z"></path>
            </svg>
          </button>

          <div className="w-px h-6 bg-[rgba(0,0,0,0.1)] mx-2"></div>

          {/* Layout Toggle: show ONLY active; reveal others on hover */}
          <LayoutToggle
            layout={layout}
            setLayout={handleLayoutChange}
            layouts={layouts}
            width={layoutToggleWidth}
          />

          {/* Search Type Button */}
          {renderSearchTypeButton()}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden relative">
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm border-b border-[rgba(0,0,0,0.08)]">
          {/* Establishment Selector */}
          <div
            className="flex items-center gap-3 relative cursor-pointer px-3 py-2 rounded-full hover:bg-[#f5f5f7] transition-colors"
            onClick={() => setIsEstablishmentDrawerOpen(true)}
          >
            <div className="w-7 h-7 flex items-center justify-center bg-[#F3F4F6] rounded-lg p-1">
              {getEstablishmentIcon(dropdownValue)}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[15px] font-semibold text-[#464646]">{dropdownValue}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 text-[#5F5F5F]">
                <path fill="currentColor" d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"></path>
              </svg>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#4A4A4A] hover:bg-[rgba(0,0,0,0.05)] transition-colors"
              onClick={() => setIsSearchActive(!isSearchActive)}
            >
              <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M21.7,20.3l-3.3-2.9c1.5-1.7,2.3-3.8,2.3-6.1c0-5.1-4.2-9.3-9.3-9.3S2,6.2,2,11.3s4.2,9.3,9.3,9.3c2.1,0,4-0.7,5.7-1.9l3.4,3c0.2,0.2,0.4,0.2,0.6,0.2c0.3,0,0.5-0.1,0.7-0.3C22.1,21.3,22.1,20.7,21.7,20.3z M11.3,18.7c-4.1,0-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4S15.4,18.7,11.3,18.7z"></path>
              </svg>
            </button>

            <button
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${isMapActive
                ? "bg-[#EBFCF4] border-[#016853] text-[#016853]"
                : "bg-[#f5f5f7] border-[rgba(0,0,0,0.1)] text-[#4A4A4A] hover:bg-[rgba(0,0,0,0.05)]"
                }`}
              onClick={handleMapToggle}
            >
              <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M17.3 8.64003L21.54 10.86L21.55 10.85C21.83 11 22.01 11.28 22.01 11.6V21.13C22.01 21.43 21.86 21.7 21.61 21.86C21.47 21.94 21.32 21.99 21.16 21.99C21.02 21.99 20.9 21.96 20.78 21.9L14.79 18.89L9.64001 21.84C9.62001 21.85 9.54001 21.88 9.51001 21.88C9.46001 21.91 9.37001 21.95 9.28001 21.95H9.21001C9.06001 21.95 8.93001 21.92 8.81001 21.86L2.48001 18.69C2.20001 18.54 2.01001 18.25 2.01001 17.92V8.39003C2.01001 8.10003 2.17001 7.82003 2.42001 7.66003C2.67001 7.51003 3.00001 7.50003 3.26001 7.64003L6.83001 9.50003C6.78001 9.33003 6.74001 9.18003 6.71001 9.03003C6.28001 6.83003 6.82001 4.80003 8.21001 3.45003C10.24 1.48003 13.64 1.51003 15.64 3.51003C16.62 4.48003 17.22 5.83003 17.34 7.30003C17.38 7.72003 17.36 8.17003 17.3 8.64003ZM20.29 19.77V12.14L16.85 10.33C16.62 10.88 16.34 11.4 16 11.87L15.6 12.43V17.41L20.29 19.77ZM3.71001 17.41L8.33001 19.73V12.43L8.10001 12.11L3.71001 9.82003V17.41ZM10.04 19.66L13.89 17.44V14.77L12.84 16.21C12.44 16.78 11.48 16.78 11.07 16.21L10.04 14.78V19.66ZM11.96 14.54L14.62 10.87H14.63C15.37 9.83003 15.74 8.59003 15.64 7.45003C15.55 6.38003 15.1 5.38003 14.44 4.73003C13.78 4.08003 12.86 3.70003 11.9 3.70003C10.94 3.70003 10.04 4.06003 9.39001 4.70003C8.65001 5.41003 8.26001 6.44003 8.26001 7.60003C8.26001 7.96003 8.30001 8.34003 8.38001 8.72003C8.53001 9.53003 8.88001 10.31 9.47001 11.11L11.96 14.54Z"></path>
              </svg>
            </button>

            <div className="w-px h-6 bg-[rgba(0,0,0,0.1)] mx-1" />

            <div className="relative">
              <button
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#4A4A4A] hover:bg-[rgba(0,0,0,0.05)] transition-colors"
                onClick={() => setIsFilterDrawerOpen(true)}
              >
                <svg viewBox="0 0 512 512" className="w-5 h-5">
                  <path d="M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2-32.5-40.5-56-76.3-56s-66.1 23.5-76.3 56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z" fill="currentColor"></path>
                </svg>
                {filterCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00DF8B] text-white text-[11px] rounded-full flex items-center justify-center border-2 border-white">
                    {filterCount}
                  </span>
                )}
              </button>
            </div>

            <button
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#4A4A4A] hover:bg-[rgba(0,0,0,0.05)] transition-colors"
              onClick={() => setIsOptionsDrawerOpen(true)}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Box */}
        {isSearchActive && (
          <div className="absolute top-14 left-0 right-0 z-[950] bg-white px-4 py-[10px] border-b border-[rgba(0,0,0,0.05)] shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
            <form onSubmit={handleSearchSubmit}>
              <div className="flex items-center w-full relative">
                <div className="flex items-center bg-[#f5f5f7] border border-[rgba(0,0,0,0.1)] rounded-lg h-9 w-full px-3">
                  <div className="text-[14px] font-semibold text-[#4A4A4A] whitespace-nowrap mr-2 min-w-[50px]">
                    Where
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter a city, state or country"
                    className="border-none outline-none text-[14px] w-full h-full bg-transparent"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className={`w-5 h-5 bg-none border-none items-center justify-center cursor-pointer text-[#5F5F5F] opacity-70 flex-shrink-0 ${
                      searchQuery.trim() !== "" ? "flex" : "hidden"
                    }`}
                    aria-label="Clear search"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M6.34314 4.22183C5.75736 3.63604 4.80761 3.63604 4.22182 4.22183C3.63604 4.80761 3.63604 5.75736 4.22182 6.34315L9.87868 12L4.22182 17.6569C3.63604 18.2426 3.63604 19.1924 4.22182 19.7782C4.80761 20.364 5.75736 20.364 6.34314 19.7782L12 14.1213L17.6569 19.7782C18.2426 20.364 19.1924 20.364 19.7782 19.7782C20.364 19.1924 20.364 18.2426 19.7782 17.6569L14.1213 12L19.7782 6.34315C20.364 5.75736 20.364 4.80761 19.7782 4.22183C19.1924 3.63604 18.2426 3.63604 17.6569 4.22183L12 9.87868L6.34314 4.22183Z" fill="currentColor" />
                    </svg>
                  </button>
                  <div className="w-px h-5 bg-[rgba(0,0,0,0.1)] mx-1" />
                  <button
                    type="button"
                    className="w-6 h-6 bg-none border-none flex items-center justify-center cursor-pointer text-[#0093B0] opacity-80 flex-shrink-0 mr-1"
                    aria-label="Use my location"
                  >
                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                      <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7 c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z"></path><path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3 c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8 C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1 c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1 C18.6,5.5,19.8,8.4,19.2,11.2z"></path>
                    </svg>
                  </button>
                  <button
                    type="submit"
                    className="w-6 h-6 rounded-full bg-[#0093B0] border-none flex items-center justify-center cursor-pointer flex-shrink-0"
                    aria-label="Search"
                  >
                    <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                      <path d="M21.7,20.3l-3.3-2.9c1.5-1.7,2.3-3.8,2.3-6.1c0-5.1-4.2-9.3-9.3-9.3S2,6.2,2,11.3s4.2,9.3,9.3,9.3c2.1,0,4-0.7,5.7-1.9l3.4,3c0.2,0.2,0.4,0.2,0.6,0.2c0.3,0,0.5-0.1,0.7-0.3C22.1,21.3,22.1,20.7,21.7,20.3z M11.3,18.7c-4.1,0-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4S15.4,18.7,11.3,18.7z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Mobile overlays/drawers must render via portals */}
        <Portal containerId="mobile-modal-root">
          <div className="md:hidden">
            {isOverlayVisible && (
              <div
                className="fixed inset-0 bg-black/50 z-[900]"
                onClick={closeAllMobileLayers}
              />
            )}

        {/* Mobile Establishment Drawer */}
        {isEstablishmentDrawerOpen && (
          <div className="fixed inset-x-0 bottom-0 h-[85vh] max-w-[420px] mx-auto bg-white rounded-t-[20px] z-[1001] shadow-[0_-8px_18px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[rgba(0,0,0,0.08)] flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#1B1B1B]">Select School Type</h2>
              <button
                onClick={() => setIsEstablishmentDrawerOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#5F5F5F] hover:bg-[rgba(0,0,0,0.05)]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-2 flex-1 overflow-y-auto">
              {establishmentTypes.map((type) => (
                <div
                  key={type}
                  onClick={() => handleEstablishmentSelect(type)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${dropdownValue === type
                    ? "bg-[rgba(0,147,176,0.1)] border border-[rgba(0,147,176,0.3)]"
                    : "hover:bg-[#f5f5f7] border border-transparent"
                    }`}
                >
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-lg ${dropdownValue === type ? "bg-[#E1F6FB]" : "bg-[#F3F4F6]"
                      }`}
                  >
                    {getEstablishmentIcon(type)}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`font-medium ${dropdownValue === type ? "text-[#016853]" : "text-[#1B1B1B]"
                        }`}
                    >
                      {type}
                    </div>
                    <div className="text-sm text-[#5F5F5F]">
                      {type === "K-12" && "2,583 schools"}
                      {type === "Colleges" && "1,870 colleges"}
                      {type === "Graduates" && "642 programs"}
                      {type === "District" && "1,234 districts"}
                    </div>
                  </div>
                  {dropdownValue === type && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 text-[#0093B0]"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Filter Drawer */}
        {isFilterDrawerOpen && (
          <div className="fixed inset-x-0 bottom-0 h-[85vh] max-w-[420px] mx-auto bg-white rounded-t-[20px] z-[1001] shadow-[0_-8px_18px_rgba(0,0,0,0.12)] flex flex-col">
            <div className="p-4 border-b border-[rgba(0,0,0,0.08)] flex justify-between items-center flex-shrink-0">
              <h2 className="text-lg font-semibold text-[#1B1B1B]">Filters</h2>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#5F5F5F] hover:bg-[rgba(0,0,0,0.05)]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">{renderFilters()}</div>
            </div>
            <div className="p-4 border-t border-[rgba(0,0,0,0.08)] flex gap-3 flex-shrink-0">
              <button
                onClick={handleClearFilters}
                className="flex-1 px-4 py-3 border border-[rgba(0,0,0,0.15)] rounded-lg text-[#4A4A4A] font-medium hover:bg-[#f5f5f7]"
              >
                Clear
              </button>
              <button
                onClick={handleShowResults}
                className="flex-1 px-4 py-3 bg-[#0093B0] text-white rounded-lg font-medium hover:bg-[#0080a0]"
              >
                Show Results
              </button>
            </div>
          </div>
        )}

        {/* Mobile Options Drawer */}
        {isOptionsDrawerOpen && (
          <div className="fixed inset-x-0 bottom-0 h-[80vh] max-w-[420px] mx-auto bg-white rounded-t-[20px] z-[1001] shadow-[0_-8px_18px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[rgba(0,0,0,0.08)] flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#1B1B1B]">Options</h2>
              <button
                onClick={() => setIsOptionsDrawerOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#5F5F5F] hover:bg-[rgba(0,0,0,0.05)]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-6 flex-1 overflow-y-auto">
              {/* Sort By Section */}
              <div className="space-y-3">
                <h3 className="font-medium text-[#1B1B1B]">Sort By</h3>
                <div className="space-y-2">
                  {[
                    { value: "best-match", label: "Best Match" },
                    { value: "newest", label: "Newest" },
                    { value: "highest-rated", label: "Highest Rated" },
                    { value: "most-wished", label: "Most Wished" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-[#f5f5f7] cursor-pointer"
                    >
                      <span className="text-sm text-[#4A4A4A]">{option.label}</span>
                      {option.value === "best-match" && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 text-[#0093B0]"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Search Type Section */}
              <div className="space-y-3">
                <h3 className="font-medium text-[#1B1B1B]">Search Type</h3>
                <div className="space-y-2">
                  {[
                    { value: "trending", label: "Trending" },
                    { value: "latest", label: "Latest" },
                    { value: "highest-rated", label: "Highest Rated" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-[#f5f5f7] cursor-pointer"
                    >
                      <span className="text-sm text-[#4A4A4A]">{option.label}</span>
                      {option.value === "trending" && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 text-[#0093B0]"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Layout Section */}
              <div className="space-y-3">
                <h3 className="font-medium text-[#1B1B1B]">Layout</h3>
                <div className="grid grid-cols-2 gap-3">
                  {layouts.map((layoutOption) => (
                    <div
                      key={layoutOption.type}
                      onClick={() => handleLayoutChange(layoutOption.type)}
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${layout === layoutOption.type
                        ? "border-[#0093B0] bg-[rgba(0,147,176,0.08)]"
                        : "border-[rgba(0,0,0,0.1)] hover:bg-[#f5f5f7]"
                        }`}
                    >
                      <div
                        className={`w-6 h-6 mb-2 ${layout === layoutOption.type ? "text-[#0093B0]" : "text-[#4A4A4A]"
                          }`}
                      >
                        {layoutOption.icon}
                      </div>
                      <span
                        className={`text-xs ${layout === layoutOption.type
                          ? "text-[#0093B0] font-semibold"
                          : "text-[#4A4A4A]"
                          }`}
                      >
                        {layoutOption.type.charAt(0).toUpperCase() + layoutOption.type.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Map Drawer */}
        {isMapDrawerOpen && (
          <div className="fixed inset-x-0 bottom-0 h-[85vh] max-w-[420px] mx-auto bg-white rounded-t-[20px] z-[1001] flex flex-col shadow-[0_-8px_18px_rgba(0,0,0,0.12)]">
            <div className="p-4 border-b border-[rgba(0,0,0,0.08)] flex justify-between items-center flex-shrink-0">
              <h2 className="text-lg font-semibold text-[#1B1B1B]">Map</h2>
              <button
                onClick={() => {
                  setIsMapDrawerOpen(false);
                  setIsMapActive(false);
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#5F5F5F] hover:bg-[rgba(0,0,0,0.05)]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
            <div className="flex-1 min-h-0 bg-[#f5f5f7] flex flex-col">
              <MapContainer
                isMapActive={isMapActive}
                schools={schools}
                layout={layout}
                mode="mobileDrawer"
              />
            </div>
          </div>
        )}

          </div>
        </Portal>
      </div>
    </>
  );
};

export default Header;
