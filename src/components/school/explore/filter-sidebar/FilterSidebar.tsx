import React, { RefObject } from "react";
import { Overlay } from "@/components/ui/Overlay/Overlay";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarFooter } from "./SidebarFooter";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import {
  Academics,
  AdmissionsProcess,
  BoardingStatus,
  CollegeSpecialty,
  CollegeSubTypeFilter,
  CollegeTypeFilter,
  FiltersType,
  FilterValue,
  GenAreaOfStudy,
  GoodFor,
  GradeFilter,
  GradeLevel,
  MajorsType,
  OnlineFriendliness,
  Organization,
  ReligionAffiliation,
  ReligionType,
  SchoolScoutCategory,
  SchoolScoutGrade,
  SchoolScoutGradeEntry,
  Selectivity,
  SpecialtyType,
  StartingSalaryAfterGraduation,
  StudentBodySize,
  TypeFilter,
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
  const {
    filterK12,
    filterColleges,
    setGrade,
    setReligion,
    setSpecialty,
    setType,
    setHighestGrade,
    setBoardingStatus,
    setTuition,
    setRation,
    setAcademics,
    setOrganization,
    setSchoolScoutGrade,
    setCollegeType,
    setGenAreaOfStudy,
    setRating,
    setMajors,
    setCost,
    setOnlineFriendliness,
    setStudentBodySize,
    setCollegeSpecialty,
    setAdmissionsProcess,
    setReligionAffiliation,
    setSelectivity,
    setAct,
    setSat,
    setGoodFor,
    setStartingSalaryAfterGraduation,
    establishment,
  } = useSchoolsExplore((state) => state);

  const filters =
    establishment === ESTABLISHMENT.K_12 ? filterK12 : filterColleges;

  const handleStartingSalaryAfterGraduationChange = (value: string) => {
    setStartingSalaryAfterGraduation(value as StartingSalaryAfterGraduation);
  };

  const handleGoodForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setGoodFor(value as GoodFor);
  };

  const handleSelectivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setSelectivity(value as Selectivity);
  };

  const handleReligionAffiliation = (value: string) => {
    setReligionAffiliation(value as ReligionAffiliation);
  };

  const handleBoardingStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.dataset.value as string;
    setBoardingStatus(value as BoardingStatus);
  };

  const handleHighestGradeChange = (value: string) => {
    setHighestGrade(value as GradeLevel);
  };
  const handleGenAreaOfStudyChange = (value: string) => {
    setGenAreaOfStudy(value as GenAreaOfStudy);
  };

  const handleStudentBodySizeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.dataset.value as string;
    setStudentBodySize(value as StudentBodySize);
  };

  const handleOrganizationChange = (value: string) => {
    setOrganization(value as Organization);
  };

  const handleAdmissionsProcessChange = (value: string) => {
    setAdmissionsProcess(value as AdmissionsProcess);
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setGrade(value as GradeFilter);
  };

  const handleCollegeSpecialtyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.dataset.value as string;
    setCollegeSpecialty(value as CollegeSpecialty);
  };

  const handleReligionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setReligion(value as ReligionType);
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setSpecialty(value as SpecialtyType);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setType(value as TypeFilter);
  };

  const handleAcademicsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setAcademics(value as Academics);
  };

  const handleMajorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setMajors(value as MajorsType);
  };

  const handleSchoolScoutGradeChange = (
    category: SchoolScoutCategory,
    grade: SchoolScoutGrade
  ) => {
    setSchoolScoutGrade(category, grade);
  };

  const handleCollegeTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as FilterValue;
    const [type, subType] = (value as string).split(": ");
    if (subType) {
      setCollegeType(
        type as CollegeTypeFilter,
        subType as CollegeSubTypeFilter
      );
    }
  };

  const handleOnlineFriendlinessChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.dataset.value as string;
    setOnlineFriendliness(value as OnlineFriendliness);
  };

  const isOptionChecked = (
    optionValue: string,
    key: keyof FiltersType
  ): boolean => {
    const filterValue = filters[key];
    if (Array.isArray(filterValue)) {
      if (key === "schoolScoutGrades") {
        return filterValue.includes(optionValue as SchoolScoutGradeEntry);
      }
      return filterValue.includes(optionValue as never);
    }
    return false;
  };

  const isGradeSelected = (category: string, grade: SchoolScoutGrade) => {
    const entry = `${category}: ${grade}` as SchoolScoutGradeEntry;
    return filters.schoolScoutGrades.includes(entry);
  };

  const renderFilters = () => {
    switch (establishment) {
      case ESTABLISHMENT.K_12: {
        return (
          <K12Filters
            handleAcademicsChange={handleAcademicsChange}
            handleBoardingStatusChange={handleBoardingStatusChange}
            handleGradeChange={handleGradeChange}
            handleHighestGradeChange={handleHighestGradeChange}
            handleOrganizationChange={handleOrganizationChange}
            handleReligionChange={handleReligionChange}
            handleSchoolScoutGradeChange={handleSchoolScoutGradeChange}
            handleSetRating={setRating}
            handleSetRation={setRation}
            handleSetTuition={setTuition}
            handleSpecialtyChange={handleSpecialtyChange}
            handleTypeChange={handleTypeChange}
            isOptionChecked={isOptionChecked}
            isGradeSelected={isGradeSelected}
          />
        );
      }
      case ESTABLISHMENT.COLLEGES: {
        return (
          <CollegesFilters
            handleCollegeTypeChange={handleCollegeTypeChange}
            handleGenAreaOfStudyChange={handleGenAreaOfStudyChange}
            handleMajorsChange={handleMajorsChange}
            handleOnlineFriendlinessChange={handleOnlineFriendlinessChange}
            handleStudentBodySizeChange={handleStudentBodySizeChange}
            handleCollegeSpecialtyChange={handleCollegeSpecialtyChange}
            handleAdmissionsProcessChange={handleAdmissionsProcessChange}
            handleSelectivityChange={handleSelectivityChange}
            handleReligionAffiliation={handleReligionAffiliation}
            handleStartingSalaryAfterGraduationChange={
              handleStartingSalaryAfterGraduationChange
            }
            handleGoodForChange={handleGoodForChange}
            handleSetRating={setRating}
            handleSetCost={setCost}
            handleSetSat={setSat}
            handleSetAct={setAct}
            isOptionChecked={isOptionChecked}
          />
        );
      }
      case ESTABLISHMENT.GRADUATES: {
        return <p>Coming soon...</p>;
      }
    }
  };

  return (
    <>
      <Overlay isSidePanelOpen={isSidePanelOpen} />
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 w-[400px] h-full bg-white shadow-[-4px_0_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out z-[1001] flex flex-col overflow-y-auto ${
          isSidePanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="sidePanel"
      >
        <SidebarHeader onClose={onClose} />
        <div className="p-6 flex-1 overflow-y-auto">{renderFilters()}</div>
        <SidebarFooter />
      </div>
    </>
  );
};

export default FilterSidebar;
