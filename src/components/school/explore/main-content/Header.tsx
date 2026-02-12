import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import MapContainer from "./MapContainer";
import { School } from "../types";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import { establishmentTypes } from "./mock";
import K12Filters from "../filter-sidebar/filters/k12-filters";
import CollegesFilters from "../filter-sidebar/filters/colleges-filters";
import { ESTABLISHMENT } from "@/store/enum";
import { Portal } from "@/components/ui/Portal";
import { useOpenMobileSidebar } from "@/context/OpenMobileSidebarContext";
import { MobileActionsDrawer } from "./MobileActionsDrawer";
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
  dropdownValue: string;
  layouts: {
    type: string;
    icon: ReactNode;
  }[];
  onContainerExpandChange?: (isExpanded: boolean) => void;
  isContainerExpanded?: boolean;
  /** Optional: used by collections page for custom dropdown icon */
  dropdownIcon?: ReactNode;
  /** Optional: used by collections page for custom dropdown content */
  renderDropdownItems?: () => React.ReactNode;
  /** Optional: used by collections page for layout toggle width */
  layoutToggleWidth?: number;
  /** Optional: used by collections page for custom actions button */
  renderActionsButton?: () => React.ReactNode;
  /** Optional: used by collections page for custom items count */
  renderItemsCount?: () => React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  isSearchActive,
  setIsSearchActive,
  isMapActive,
  setIsMapActive,
  schools,
  layout,
  setLayout,
  dropdownValue,
  layouts,
  onContainerExpandChange,
  isContainerExpanded = false,
  dropdownIcon: _dropdownIcon,
  renderDropdownItems: _renderDropdownItems,
  layoutToggleWidth: _layoutToggleWidth,
  renderActionsButton: _renderActionsButton,
  renderItemsCount: _renderItemsCount,
}) => {
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
  const [isDesktopEstablishmentOpen, setIsDesktopEstablishmentOpen] =
    useState(false);
  const [isSearchTypeOpen, setIsSearchTypeOpen] = useState(false);
  const [searchType, setSearchType] = useState("Trending");
  const [isLayoutToggleExpanded, setIsLayoutToggleExpanded] = useState(false);
  const [isLayoutTooltipReady, setIsLayoutTooltipReady] = useState(false);
  const [hoveredLayout, setHoveredLayout] = useState<string | null>(null);
  const layoutToggleHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const layoutToggleTooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const openMobileSidebar = useOpenMobileSidebar();
  /** Ignore overlay clicks for a short time after opening a drawer (prevents same-tap close on touch) */
  const drawerOpenedAtRef = useRef<number>(0);
  const OVERLAY_CLOSE_GRACE_MS = 350;
  const desktopEstablishmentRef = useRef<HTMLDivElement>(null);
  const searchTypeRef = useRef<HTMLDivElement>(null);
  const layoutToggleExpandedWidth = useMemo(
    () => _layoutToggleWidth ?? layouts.length * 32 + 6,
    [_layoutToggleWidth, layouts.length]
  );

  useEffect(() => {
    return () => {
      if (layoutToggleHoverTimeoutRef.current) {
        clearTimeout(layoutToggleHoverTimeoutRef.current);
      }
      if (layoutToggleTooltipTimeoutRef.current) {
        clearTimeout(layoutToggleTooltipTimeoutRef.current);
      }
    };
  }, []);

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

  const desktopLayouts = useMemo(() => {
    if (layouts.some((item) => item.type === layout)) {
      return layouts;
    }
    const current = layouts.find((item) => item.type === layout);
    return current ? [current, ...layouts] : layouts;
  }, [layouts, layout]);

  const isOverlayVisible =
    isEstablishmentDrawerOpen ||
    isFilterDrawerOpen ||
    isMapDrawerOpen ||
    isOptionsDrawerOpen;

  const closeAllMobileLayers = () => {
    if (Date.now() - drawerOpenedAtRef.current < OVERLAY_CLOSE_GRACE_MS) return;
    setIsEstablishmentDrawerOpen(false);
    setIsFilterDrawerOpen(false);
    setIsOptionsDrawerOpen(false);
    setIsMapDrawerOpen(false);
    setIsMapActive(false);
  };

  const openOptionsDrawer = () => {
    drawerOpenedAtRef.current = Date.now();
    setIsOptionsDrawerOpen(true);
  };
  const openEstablishmentDrawer = () => {
    drawerOpenedAtRef.current = Date.now();
    setIsEstablishmentDrawerOpen(true);
  };
  const openFilterDrawer = () => {
    drawerOpenedAtRef.current = Date.now();
    setIsFilterDrawerOpen(true);
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
    setIsDesktopEstablishmentOpen(false);
  };

  const hasCustomDropdown = Boolean(_renderDropdownItems);
  const resolvedDropdownIcon =
    _dropdownIcon ?? getEstablishmentIcon(dropdownValue);

  const renderDefaultDropdownItems = () =>
    establishmentTypes.map((type) => {
      const isSelected = type === dropdownValue;
      return (
        <div
          key={type}
          role="option"
          aria-selected={isSelected}
          onClick={() => handleEstablishmentSelect(type)}
          className={`flex items-center px-4 py-2.5 cursor-pointer transition-colors hover:bg-[#f5f5f7] ${isSelected ? "bg-[rgba(1,104,83,0.1)] text-[var(--header-green)]" : ""
            }`}
        >
          <div className="w-6 h-6 flex items-center justify-center mr-3 text-[var(--subtle-text)]">
            {getEstablishmentIcon(type)}
          </div>
          <div className="flex-1 flex items-center justify-between">
            <span className="text-sm font-medium">{type}</span>
            <span className="text-xs text-[var(--subtle-text)]">
              {type === "K-12" && "2,583 schools"}
              {type === "Colleges" && "1,870 colleges"}
              {type === "Graduates" && "642 programs"}
              {type === "District" && "1,234 districts"}
            </span>
          </div>
        </div>
      );
    });

  const handleCustomDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const selectedItem = target.closest("[data-dropdown-select]");
    if (!selectedItem) return;
    setIsEstablishmentDrawerOpen(false);
    setIsDesktopEstablishmentOpen(false);
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
      // Mobile: open map drawer (use ref so overlay doesn't close it on same tap)
      drawerOpenedAtRef.current = Date.now();
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

  const handleExpandToggle = () => {
    if (!onContainerExpandChange) return;
    onContainerExpandChange(!isContainerExpanded);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        desktopEstablishmentRef.current &&
        !desktopEstablishmentRef.current.contains(target)
      ) {
        setIsDesktopEstablishmentOpen(false);
      }
      if (
        searchTypeRef.current &&
        !searchTypeRef.current.contains(target)
      ) {
        setIsSearchTypeOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <div className="explore-desktop-header hidden md:flex items-center justify-between py-4 px-6 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl relative z-[120] overflow-visible">
        <div ref={desktopEstablishmentRef} className="relative">
          <button
            type="button"
            onClick={() => setIsDesktopEstablishmentOpen((prev) => !prev)}
            className="explore-desktop-dropdown-trigger flex items-center gap-3 cursor-pointer py-2 px-4 rounded-[20px] hover:bg-[#f5f5f7] transition-colors"
            aria-haspopup="listbox"
            aria-expanded={isDesktopEstablishmentOpen}
          >
            <div className="explore-desktop-dropdown-icon w-11 h-11 flex items-center justify-center text-[#424242] bg-[#F5F5F7] rounded-lg">
              {resolvedDropdownIcon}
            </div>
            <h1 className="text-lg font-semibold text-[var(--bold-text)]">
              {dropdownValue}
            </h1>
            <div className="w-4 h-4 ml-2 text-[var(--text-default)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                ></path>
              </svg>
            </div>
          </button>

          <div
            className={`explore-desktop-dropdown-menu absolute top-full left-0 mt-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] w-60 z-50 ${isDesktopEstablishmentOpen ? "block" : "hidden"
              }`}
          >
            {hasCustomDropdown ? (
              <div onClick={handleCustomDropdownClick}>
                {_renderDropdownItems?.()}
              </div>
            ) : (
              renderDefaultDropdownItems()
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExpandToggle}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isContainerExpanded ? "bg-[rgba(0,0,0,0.05)]" : ""
              }`}
            aria-label={isContainerExpanded ? "Collapse layout" : "Expand layout"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M15 4v16"></path>
              {/* Arrow points LEFT when cards are small (to expand), RIGHT when cards are wide (to collapse) */}
              <path d={isContainerExpanded ? "M10 10l2 2l-2 2" : "M10 10l-2 2l2 2"}></path>
            </svg>
          </button>

          <form
            onSubmit={handleSearchSubmit}
            className={`relative ${isSearchActive ? "flex" : "hidden"} items-center gap-3`}
          >
            <button
              type="button"
              onClick={handleCloseSearch}
              className="text-[var(--subtle-text)] hover:text-[var(--text-default)] transition-colors flex-shrink-0 p-2"
              aria-label="Close search"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center bg-white border border-[rgba(0,0,0,0.1)] rounded h-10 w-[350px]">
              <div className="text-sm font-semibold text-[var(--text-default)] px-3 whitespace-nowrap">
                Where
              </div>
              <div className="flex items-center relative flex-1 h-full px-3">
                <input
                  type="text"
                  placeholder="Enter a city, state or country"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-none outline-none text-sm w-full h-full bg-transparent text-[var(--text-default)] placeholder:text-[var(--subtle-text)]"
                />
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={`w-5 h-5 bg-none border-none items-center justify-center cursor-pointer text-[var(--subtle-text)] opacity-70 hover:opacity-100 flex-shrink-0 ${searchQuery.length >= 2 ? "flex" : "hidden"
                    }`}
                  aria-label="Clear search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M6.34314 4.22183C5.75736 3.63604 4.80761 3.63604 4.22182 4.22183C3.63604 4.80761 3.63604 5.75736 4.22182 6.34315L9.87868 12L4.22182 17.6569C3.63604 18.2426 3.63604 19.1924 4.22182 19.7782C4.80761 20.364 5.75736 20.364 6.34314 19.7782L12 14.1213L17.6569 19.7782C18.2426 20.364 19.1924 20.364 19.7782 19.7782C20.364 19.1924 20.364 18.2426 19.7782 17.6569L14.1213 12L19.7782 6.34315C20.364 5.75736 20.364 4.80761 19.7782 4.22183C19.1924 3.63604 18.2426 3.63604 17.6569 4.22183L12 9.87868L6.34314 4.22183Z" fill="currentColor" />
                  </svg>
                </button>
                <div
                  className={`w-px h-5 bg-[rgba(0,0,0,0.1)] mx-2 ${searchQuery.length >= 2 ? "block" : "hidden"
                    }`}
                />
                <button
                  type="button"
                  className="w-6 h-6 bg-none border-none flex items-center justify-center cursor-pointer text-[var(--primary-blue)] opacity-80 hover:opacity-100 flex-shrink-0"
                  aria-label="Use my location"
                >
                  <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7 c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z"></path><path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3 c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8 C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1 c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1 C18.6,5.5,19.8,8.4,19.2,11.2z"></path>
                  </svg>
                </button>
                <button
                  type="submit"
                  className="w-7 h-7 rounded-full bg-[var(--primary-blue)] border-none flex items-center justify-center cursor-pointer ml-2 flex-shrink-0"
                  aria-label="Search"
                >
                  <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                    <path d="M21.7,20.3l-3.3-2.9c1.5-1.7,2.3-3.8,2.3-6.1c0-5.1-4.2-9.3-9.3-9.3S2,6.2,2,11.3s4.2,9.3,9.3,9.3c2.1,0,4-0.7,5.7-1.9l3.4,3c0.2,0.2,0.4,0.2,0.6,0.2c0.3,0,0.5-0.1,0.7-0.3C22.1,21.3,22.1,20.7,21.7,20.3z M11.3,18.7c-4.1,0-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4S15.4,18.7,11.3,18.7z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </form>

          {!isSearchActive && (
            <button
              type="button"
              onClick={() => setIsSearchActive(true)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-default)] hover:bg-[rgba(0,0,0,0.05)] transition-colors"
              aria-label="Search"
            >
              <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                <path d="M21.7,20.3l-3.3-2.9c1.5-1.7,2.3-3.8,2.3-6.1c0-5.1-4.2-9.3-9.3-9.3S2,6.2,2,11.3s4.2,9.3,9.3,9.3c2.1,0,4-0.7,5.7-1.9l3.4,3c0.2,0.2,0.4,0.2,0.6,0.2c0.3,0,0.5-0.1,0.7-0.3C22.1,21.3,22.1,20.7,21.7,20.3z M11.3,18.7c-4.1,0-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4S15.4,18.7,11.3,18.7z"></path>
              </svg>
            </button>
          )}

          <button
            type="button"
            onClick={handleMapToggle}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-[rgba(0,0,0,0.1)] text-[var(--text-default)] hover:bg-[rgba(0,0,0,0.05)] transition-colors"
            aria-label="Map"
          >
            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
              <path d="M17.3 8.64003L21.54 10.86L21.55 10.85C21.83 11 22.01 11.28 22.01 11.6V21.13C22.01 21.43 21.86 21.7 21.61 21.86C21.47 21.94 21.32 21.99 21.16 21.99C21.02 21.99 20.9 21.96 20.78 21.9L14.79 18.89L9.64001 21.84C9.62001 21.85 9.54001 21.88 9.51001 21.88C9.46001 21.91 9.37001 21.95 9.28001 21.95H9.21001C9.06001 21.95 8.93001 21.92 8.81001 21.86L2.48001 18.69C2.20001 18.54 2.01001 18.25 2.01001 17.92V8.39003C2.01001 8.10003 2.17001 7.82003 2.42001 7.66003C2.67001 7.51003 3.00001 7.50003 3.26001 7.64003L6.83001 9.50003C6.78001 9.33003 6.74001 9.18003 6.71001 9.03003C6.28001 6.83003 6.82001 4.80003 8.21001 3.45003C10.24 1.48003 13.64 1.51003 15.64 3.51003C16.62 4.48003 17.22 5.83003 17.34 7.30003C17.38 7.72003 17.36 8.17003 17.3 8.64003ZM20.29 19.77V12.14L16.85 10.33C16.62 10.88 16.34 11.4 16 11.87L15.6 12.43V17.41L20.29 19.77ZM3.71001 17.41L8.33001 19.73V12.43L8.10001 12.11L3.71001 9.82003V17.41ZM10.04 19.66L13.89 17.44V14.77L12.84 16.21C12.44 16.78 11.48 16.78 11.07 16.21L10.04 14.78V19.66ZM11.96 14.54L14.62 10.87H14.63C15.37 9.83003 15.74 8.59003 15.64 7.45003C15.55 6.38003 15.1 5.38003 14.44 4.73003C13.78 4.08003 12.86 3.70003 11.9 3.70003C10.94 3.70003 10.04 4.06003 9.39001 4.70003C8.65001 5.41003 8.26001 6.44003 8.26001 7.60003C8.26001 7.96003 8.30001 8.34003 8.38001 8.72003C8.53001 9.53003 8.88001 10.31 9.47001 11.11L11.96 14.54Z"></path>
            </svg>
          </button>

          <div className="w-px h-6 bg-[rgba(0,0,0,0.1)] mx-2" />

          {/* Layout Toggle - 6 variants matching HTML design */}
          <div
            className={`layout-toggle flex flex-row-reverse items-center bg-[#f5f5f7] relative z-[8000] ${isLayoutToggleExpanded ? "expanded" : ""
              } ${isLayoutTooltipReady ? "tooltip-ready" : ""}`}
            style={{
              borderRadius: '6px',
              padding: '2px',
              overflow: 'visible',
            }}
            onMouseEnter={() => {
              if (layoutToggleHoverTimeoutRef.current) clearTimeout(layoutToggleHoverTimeoutRef.current);
              setIsLayoutToggleExpanded(true);
              if (layoutToggleTooltipTimeoutRef.current) clearTimeout(layoutToggleTooltipTimeoutRef.current);
              layoutToggleTooltipTimeoutRef.current = setTimeout(() => {
                setIsLayoutTooltipReady(true);
              }, 300);
            }}
            onMouseLeave={() => {
              setIsLayoutTooltipReady(false);
              setHoveredLayout(null);
              if (layoutToggleTooltipTimeoutRef.current) clearTimeout(layoutToggleTooltipTimeoutRef.current);
              layoutToggleHoverTimeoutRef.current = setTimeout(() => {
                setIsLayoutToggleExpanded(false);
              }, 300);
            }}
          >
            {desktopLayouts.map((item, index) => {
              const isActive = layout === item.type;
              const shouldShowButton = isActive || isLayoutToggleExpanded;
              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => handleLayoutChange(item.type)}
                  onMouseEnter={() => setHoveredLayout(item.type)}
                  onMouseLeave={() => setHoveredLayout(null)}
                  style={{
                    order: isActive ? 0 : index + 1,
                    width: '32px',
                    height: '28px',
                    borderRadius: '4px',
                    flexShrink: 0,
                  }}
                  className={`layout-toggle-button relative items-center justify-center cursor-pointer border-none overflow-visible ${shouldShowButton ? "flex" : "hidden"
                    } ${isActive
                      ? "active bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                      : "bg-transparent hover:bg-[rgba(0,0,0,0.05)]"
                    }`}
                  data-layout={item.type}
                  aria-label={`Layout ${item.type}`}
                >
                  <span
                    className={`w-4 h-4 flex items-center justify-center ${isActive ? "text-[#0093B0]" : "text-[#4A4A4A]"
                      }`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`layout-tooltip absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[var(--tooltip-bg)] text-[var(--tooltip-text)] px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap pointer-events-none z-[3000] shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-opacity duration-150 ${isLayoutTooltipReady && hoveredLayout === item.type
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                      }`}
                  >
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[var(--tooltip-bg)]"></span>
                  </span>
                </button>
              );
            })}
          </div>

          <div ref={searchTypeRef} className="relative">
            <button
              type="button"
              onClick={() => setIsSearchTypeOpen((prev) => !prev)}
              className="explore-desktop-trending-button flex items-center gap-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-md px-3 py-1.5 text-sm font-medium text-[var(--text-default)] hover:bg-[#f8fafc] transition-all min-h-[32px]"
              aria-haspopup="listbox"
              aria-expanded={isSearchTypeOpen}
            >
              <svg viewBox="0 0 24 24" fill="#0093B0" className="w-4 h-4">
                <path
                  fill="#0093B0"
                  fillRule="evenodd"
                  d="M6.168 15.31c-.596 2.567-.34 4.607.87 5.298 1.2.687 3.068-.11 4.962-1.897 1.894 1.787 3.761 2.584 4.962 1.897 1.21-.691 1.466-2.73.87-5.297C20.356 14.555 22 13.32 22 11.927s-1.644-2.628-4.168-3.384c.596-2.567.34-4.607-.87-5.298-1.2-.687-3.068.11-4.962 1.897-1.894-1.787-3.762-2.584-4.963-1.897-1.21.691-1.465 2.731-.87 5.298C3.645 9.299 2 10.533 2 11.927s1.644 2.628 4.168 3.384Zm10.024-.951c-.091-.28-.192-.566-.303-.856a24.282 24.282 0 0 1-.582 1.017c.304-.048.6-.102.885-.161Zm.356 1.278c-.69.147-1.427.262-2.198.34-.463.649-.942 1.247-1.426 1.785.283.266.563.505.837.716.694.535 1.295.846 1.762.977.46.13.683.06.782.003.099-.056.272-.212.395-.675.124-.47.16-1.145.052-2.015a11.368 11.368 0 0 0-.204-1.13Zm-2.933-.927a22.583 22.583 0 0 0 1.593-2.783 22.613 22.613 0 0 0-1.593-2.784 22.58 22.58 0 0 0-3.23 0 22.617 22.617 0 0 0-1.593 2.784 22.6 22.6 0 0 0 1.593 2.783 22.572 22.572 0 0 0 3.23 0Zm-2.225 1.374a24.126 24.126 0 0 0 1.22 0c-.203.254-.406.495-.61.724-.204-.229-.407-.47-.61-.724ZM8.693 14.52a24.036 24.036 0 0 1-.582-1.016c-.111.29-.212.576-.303.856.286.06.581.113.885.16Zm-1.241 1.118c.69.147 1.427.262 2.198.34.463.649.942 1.247 1.426 1.785-.283.266-.563.505-.837.716-.694.535-1.295.846-1.762.977-.46.13-.684.06-.782.003-.099-.056-.272-.212-.395-.675-.124-.47-.16-1.145-.052-2.015.045-.357.113-.735.204-1.13Zm-.93-1.603c-.39-.117-.752-.246-1.084-.385-.809-.337-1.377-.704-1.723-1.045-.34-.335-.39-.564-.39-.677 0-.114.05-.342.39-.678.346-.34.914-.708 1.723-1.045.332-.138.695-.267 1.083-.385.218.682.489 1.389.81 2.108a20.322 20.322 0 0 0-.81 2.107Zm1.286-4.54c.091.28.192.566.303.856a24.206 24.206 0 0 1 .582-1.016c-.304.047-.6.101-.885.16ZM11.39 7.77a24.339 24.339 0 0 1 1.22 0 17.895 17.895 0 0 0-.61-.724c-.204.229-.408.47-.61.724Zm3.917 1.565a24.656 24.656 0 0 1 .582 1.016c.11-.29.212-.576.303-.855-.286-.06-.581-.114-.885-.161Zm1.241-1.118a20.297 20.297 0 0 0-2.198-.34 20.242 20.242 0 0 0-1.426-1.785c.283-.266.563-.505.837-.716.694-.535 1.295-.846 1.762-.977.46-.13.683-.06.782-.003.099.056.272.212.395.675.124.47.16 1.145.052 2.015-.045.357-.113.735-.204 1.131Zm.93 1.603a20.33 20.33 0 0 1-.81 2.108c.322.718.593 1.425.81 2.107.39-.117.752-.246 1.084-.385.809-.337 1.377-.704 1.723-1.045.34-.335.39-.564.39-.677 0-.114-.05-.342-.39-.678-.346-.34-.914-.708-1.723-1.045a11.367 11.367 0 0 0-1.084-.385ZM9.65 7.877c-.771.077-1.508.192-2.198.34a11.36 11.36 0 0 1-.204-1.132c-.109-.87-.072-1.546.052-2.015.123-.463.296-.619.395-.675.098-.057.321-.127.782.003.467.13 1.068.442 1.762.977.274.21.554.45.837.716A20.227 20.227 0 0 0 9.65 7.877Z"
                  clipRule="evenodd"
                />
              </svg>
              {searchType}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
            </button>

            <div
              className={`absolute right-0 mt-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] min-w-[180px] z-50 ${isSearchTypeOpen ? "block" : "hidden"
                }`}
            >
              {[
                "Trending",
                "Latest",
                "Highest Rated",
                "Most Favorited",
                "Most Reactions",
              ].map((type) => {
                const isSelected = searchType === type;
                return (
                  <div
                    key={type}
                    onClick={() => {
                      setSearchType(type);
                      setIsSearchTypeOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-[#f5f5f7] ${isSelected ? "bg-[rgba(0,147,176,0.1)] text-[var(--primary-blue)]" : ""
                      }`}
                  >
                    <span className="flex-1">{type}</span>
                    {isSelected && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-[var(--primary-blue)]" fill="none">
                        <path
                          fill="currentColor"
                          d="M9.55 18.4L3.55 12.4C3.16 12.01 3.16 11.39 3.55 11C3.94 10.61 4.56 10.61 4.95 11L10 16.05L19.05 7.00002C19.44 6.61002 20.06 6.61002 20.45 7.00002C20.84 7.39002 20.84 8.01002 20.45 8.40002L10.45 18.4C10.25 18.6 10 18.7 9.75 18.7C9.5 18.7 9.75 18.59 9.55 18.4Z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header — matches HTML layout/design (Explore & Collections mobile) */}
      <div className="md:hidden sticky top-0 z-[1000] w-[calc(100%+24px)] -mx-3">
        <div
          className="flex items-center justify-between py-3 px-4 bg-white border-b border-[rgba(0,0,0,0.08)] shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Menu (sidebar) — only when replacing app header */}
            {openMobileSidebar && (
              <button
                type="button"
                onClick={openMobileSidebar}
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[var(--bold-text)] hover:bg-[var(--hover-bg)] transition-colors"
                aria-label="Open menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z" fill="currentColor" />
                </svg>
              </button>
            )}
            {/* Establishment / Category selector (header-left) */}
            <div
              className="flex items-center gap-3 cursor-pointer py-1.5 px-2.5 rounded-[20px] hover:bg-[#f5f5f7] transition-colors min-w-0"
              onClick={openEstablishmentDrawer}
            >
              <div className="w-6 h-6 flex items-center justify-center bg-[#F3F4F6] rounded-lg shrink-0 p-1 text-[var(--bold-text)]">
                {resolvedDropdownIcon}
              </div>
              <h1 className="text-base font-semibold text-[var(--bold-text)] truncate">
                {dropdownValue}
              </h1>
              <div className="w-4 h-4 shrink-0 text-[var(--subtle-text)] ml-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right: search, map, divider, filter, more (header-right) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-default)] hover:bg-[rgba(0,0,0,0.05)] transition-colors"
              onClick={() => setIsSearchActive(!isSearchActive)}
              aria-label="Search"
            >
              <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M21.7,20.3l-3.3-2.9c1.5-1.7,2.3-3.8,2.3-6.1c0-5.1-4.2-9.3-9.3-9.3S2,6.2,2,11.3s4.2,9.3,9.3,9.3c2.1,0,4-0.7,5.7-1.9l3.4,3c0.2,0.2,0.4,0.2,0.6,0.2c0.3,0,0.5-0.1,0.7-0.3C22.1,21.3,22.1,20.7,21.7,20.3z M11.3,18.7c-4.1,0-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4S15.4,18.7,11.3,18.7z" />
              </svg>
            </button>
            <button
              type="button"
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${isMapActive
                ? "bg-[var(--apply-button-bg)] border-[var(--header-green)] text-[var(--header-green)]"
                : "bg-[#f5f5f7] border-[rgba(0,0,0,0.1)] text-[var(--text-default)] hover:bg-[rgba(0,0,0,0.05)]"
                }`}
              onClick={handleMapToggle}
              aria-label="Map"
            >
              <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M17.3 8.64003L21.54 10.86L21.55 10.85C21.83 11 22.01 11.28 22.01 11.6V21.13C22.01 21.43 21.86 21.7 21.61 21.86C21.47 21.94 21.32 21.99 21.16 21.99C21.02 21.99 20.9 21.96 20.78 21.9L14.79 18.89L9.64001 21.84C9.62001 21.85 9.54001 21.88 9.51001 21.88C9.46001 21.91 9.37001 21.95 9.28001 21.95H9.21001C9.06001 21.95 8.93001 21.92 8.81001 21.86L2.48001 18.69C2.20001 18.54 2.01001 18.25 2.01001 17.92V8.39003C2.01001 8.10003 2.17001 7.82003 2.42001 7.66003C2.67001 7.51003 3.00001 7.50003 3.26001 7.64003L6.83001 9.50003C6.78001 9.33003 6.74001 9.18003 6.71001 9.03003C6.28001 6.83003 6.82001 4.80003 8.21001 3.45003C10.24 1.48003 13.64 1.51003 15.64 3.51003C16.62 4.48003 17.22 5.83003 17.34 7.30003C17.38 7.72003 17.36 8.17003 17.3 8.64003ZM20.29 19.77V12.14L16.85 10.33C16.62 10.88 16.34 11.4 16 11.87L15.6 12.43V17.41L20.29 19.77ZM3.71001 17.41L8.33001 19.73V12.43L8.10001 12.11L3.71001 9.82003V17.41ZM10.04 19.66L13.89 17.44V14.77L12.84 16.21C12.44 16.78 11.48 16.78 11.07 16.21L10.04 14.78V19.66ZM11.96 14.54L14.62 10.87H14.63C15.37 9.83003 15.74 8.59003 15.64 7.45003C15.55 6.38003 15.1 5.38003 14.44 4.73003C13.78 4.08003 12.86 3.70003 11.9 3.70003C10.94 3.70003 10.04 4.06003 9.39001 4.70003C8.65001 5.41003 8.26001 6.44003 8.26001 7.60003C8.26001 7.96003 8.30001 8.34003 8.38001 8.72003C8.53001 9.53003 8.88001 10.31 9.47001 11.11L11.96 14.54Z" />
              </svg>
            </button>
            <div className="w-px h-6 bg-[rgba(0,0,0,0.1)] mx-0.5" aria-hidden />
            <div className="relative">
              <button
                type="button"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-default)] hover:bg-[rgba(0,0,0,0.05)] transition-colors"
                onClick={openFilterDrawer}
                aria-label="Filters"
              >
                <svg viewBox="0 0 512 512" className="w-5 h-5">
                  <path d="M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2-32.5-40.5-56-76.3-56s-66.1 23.5-76.3 56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z" fill="currentColor" />
                </svg>
                {filterCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#00DF8B] text-white text-[11px] font-medium rounded-full flex items-center justify-center border-[1.5px] border-[var(--surface-color)]"
                  >
                    {filterCount}
                  </span>
                )}
              </button>
            </div>
            <button
              type="button"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-default)] hover:bg-[rgba(0,0,0,0.05)] transition-colors"
              onClick={openOptionsDrawer}
              aria-label="More options"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor" />
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
                  <div className="text-[14px] font-semibold text-[var(--bold-text)] whitespace-nowrap mr-2 min-w-[50px]">
                    Where
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter a city, state or country"
                    className="border-none outline-none text-[14px] w-full h-full bg-transparent text-[var(--text-default)] placeholder:text-[var(--subtle-text)]"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className={`w-5 h-5 bg-none border-none items-center justify-center cursor-pointer text-[var(--subtle-text)] opacity-70 flex-shrink-0 ${searchQuery.trim() !== "" ? "flex" : "hidden"
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
                    className="w-6 h-6 bg-none border-none flex items-center justify-center cursor-pointer text-[var(--verification-blue)] opacity-80 flex-shrink-0 mr-1"
                    aria-label="Use my location"
                  >
                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                      <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7 c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z"></path><path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3 c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8 C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1 c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1 C18.6,5.5,19.8,8.4,19.2,11.2z"></path>
                    </svg>
                  </button>
                  <button
                    type="submit"
                    className="w-6 h-6 rounded-full bg-[var(--verification-blue)] border-none flex items-center justify-center cursor-pointer flex-shrink-0"
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
              <div className="fixed inset-x-0 bottom-0 h-[85vh] max-w-[420px] mx-auto bg-[var(--surface-color)] rounded-t-[20px] z-[1001] shadow-[0_-8px_18px_var(--shadow-color)] overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-[var(--bold-text)]">
                    {hasCustomDropdown ? "Select Category" : "Select School Type"}
                  </h2>
                  <button
                    onClick={() => setIsEstablishmentDrawerOpen(false)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--subtle-text)] hover:bg-[var(--hover-bg)]"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </button>
                </div>
                <div className="p-4 space-y-2 flex-1 overflow-y-auto">
                  {hasCustomDropdown ? (
                    <div onClick={handleCustomDropdownClick}>
                      {_renderDropdownItems?.()}
                    </div>
                  ) : (
                    establishmentTypes.map((type) => (
                      <div
                        key={type}
                        onClick={() => handleEstablishmentSelect(type)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${dropdownValue === type
                          ? "bg-[rgba(125,211,252,0.12)] border border-[rgba(125,211,252,0.3)]"
                          : "hover:bg-[var(--hover-bg)] border border-transparent"
                          }`}
                      >
                        <div
                          className={`w-9 h-9 flex items-center justify-center rounded-lg ${dropdownValue === type ? "bg-[rgba(125,211,252,0.18)]" : "bg-[var(--surface-secondary)]"
                            }`}
                        >
                          {getEstablishmentIcon(type)}
                        </div>
                        <div className="flex-1">
                          <div
                            className={`font-medium ${dropdownValue === type ? "text-[var(--header-green)]" : "text-[var(--bold-text)]"
                              }`}
                          >
                            {type}
                          </div>
                          <div className="text-sm text-[var(--subtle-text)]">
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
                            className="w-5 h-5 text-[var(--verification-blue)]"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Mobile Filter Drawer */}
            {isFilterDrawerOpen && (
              <div className="fixed inset-x-0 bottom-0 h-[85vh] bg-[var(--surface-color)] rounded-t-[20px] z-[1001] shadow-[0_-8px_18px_var(--shadow-color)] flex flex-col">
                <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center flex-shrink-0">
                  <h2 className="text-lg font-semibold text-[var(--bold-text)]">Filters</h2>
                  <button
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--subtle-text)] hover:bg-[var(--hover-bg)]"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">{renderFilters()}</div>
                </div>
                <div className="p-4 border-t border-[var(--border-color)] flex gap-3 flex-shrink-0">
                  <button
                    onClick={handleClearFilters}
                    className="flex-1 px-4 py-3 border border-[var(--border-color)] rounded-lg text-[var(--text-default)] font-medium hover:bg-[var(--hover-bg)]"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleShowResults}
                    className="flex-1 px-4 py-3 bg-[var(--verification-blue)] text-white rounded-lg font-medium hover:opacity-90"
                  >
                    Show Results
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Options drawer (Sort, Search Type, Layout — matches HTML) */}
            <MobileActionsDrawer
              isOpen={isOptionsDrawerOpen}
              onClose={() => setIsOptionsDrawerOpen(false)}
              layout={layout}
              setLayout={handleLayoutChange}
              layouts={layouts}
            />

            {/* Mobile Map Drawer */}
            {isMapDrawerOpen && (
              <div className="fixed inset-x-0 bottom-0 h-[85vh] max-w-[420px] mx-auto bg-[var(--surface-color)] rounded-t-[20px] z-[1001] flex flex-col shadow-[0_-8px_18px_var(--shadow-color)]">
                <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center flex-shrink-0">
                  <h2 className="text-lg font-semibold text-[var(--bold-text)]">Map</h2>
                  <button
                    onClick={() => {
                      setIsMapDrawerOpen(false);
                      setIsMapActive(false);
                    }}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--subtle-text)] hover:bg-[var(--hover-bg)]"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 min-h-0 bg-[var(--surface-secondary)] flex flex-col">
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
