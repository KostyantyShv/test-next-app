import React, { RefObject, useMemo } from "react";
import { Overlay } from "@/components/ui/Overlay/Overlay";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarFooter } from "./SidebarFooter";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import {
  FiltersType,
  SchoolScoutGrade,
  SchoolScoutGradeEntry,
} from "@/types/schools-explore";
import K12Filters from "./filters/k12-filters";
import CollegesFilters from "./filters/colleges-filters";
import { ESTABLISHMENT } from "@/store/enum";

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
  const { filterK12, filterColleges, establishment, filterGraduates } =
    useSchoolsExplore((state) => state);

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

  return (
    <>
      <Overlay isSidePanelOpen={isSidePanelOpen} />
      <aside
        ref={sidebarRef}
        id="sidePanel"
        className={`fixed top-0 right-0 w-[400px] h-full bg-white shadow-[-4px_0_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out z-[1001] flex flex-col overflow-y-auto ${
          isSidePanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <SidebarHeader onClose={onClose} />
        <div className="p-6 flex-1 overflow-y-auto">{renderFilters()}</div>
        <SidebarFooter />
      </aside>
    </>
  );
};

export default FilterSidebar;
