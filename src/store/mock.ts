import { EstablishmentType, FiltersType } from "@/types/schools-explore";
import { InitialValueCollegesType } from "./colleges-types";
import { InitialValueGraduatesType } from "./graduates-types";

export const initialEstablishment: EstablishmentType = "K-12";

export const initialK12Filters: FiltersType = {
  cost: 2000,
  tuition: 0,
  ration: 0,
  rating: 0,
  act: 12,
  sat: 0,
  genAreaOfStudy: "any",
  highestGrade: "any",
  organization: "any",
  admissionsProcess: "Any",
  religionAffiliation: "Any",
  startingSalaryAfterGraduation: "Any",
  grade: [],
  religion: [],
  specialty: [],
  selectivity: [],
  goodFor: [],
  type: [],
  boardingStatus: [],
  majors: [],
  onlineFriendliness: [],
  studentBodySize: [],
  collegeSpecialty: [],
  academics: [],
  schoolScoutGrades: [],
  collegeType: {
    "4-year": [],
    "2-year": [],
  },
};

export const initialCollegesFilters: InitialValueCollegesType = {
  grade: [],
  genAreaOfStudy: "any",
  religion: [],
  specialty: [],
  type: [],
  highestGrade: "any",
  admissionsProcess: "Any",
  religionAffiliation: "Any",
  startingSalaryAfterGraduation: "Any",
  boardingStatus: [],
  onlineFriendliness: [],
  collegeSpecialty: [],
  goodFor: [],
  selectivity: [],
  studentBodySize: [],
  cost: 2000,
  tuition: 0,
  ration: 0,
  rating: 0,
  act: 12,
  sat: 0,
  academics: [],
  organization: "any",
  majors: [],
  schoolScoutGrades: [],
  collegeType: {
    "4-year": [],
    "2-year": [],
  },
};

export const initialGraduatesFilters: InitialValueGraduatesType = {
  grade: [],
  religion: [],
  genAreaOfStudy: "any",
  specialty: [],
  type: [],
  highestGrade: "any",
  admissionsProcess: "Any",
  religionAffiliation: "Any",
  startingSalaryAfterGraduation: "Any",
  boardingStatus: [],
  onlineFriendliness: [],
  collegeSpecialty: [],
  goodFor: [],
  selectivity: [],
  studentBodySize: [],
  cost: 2000,
  tuition: 0,
  ration: 0,
  rating: 0,
  act: 12,
  sat: 0,
  academics: [],
  majors: [],
  organization: "any",
  program: [],
  schoolScoutGrades: [],
  collegeType: {
    "4-year": [],
    "2-year": [],
  },
};

export const arrayFilterTypes = [
  { key: "grade" as const, type: "grade" as const },
  { key: "religion" as const, type: "religion" as const },
  { key: "specialty" as const, type: "specialty" as const },
  { key: "type" as const, type: "type" as const },
  { key: "boardingStatus" as const, type: "boardingStatus" as const },
  { key: "academics" as const, type: "academics" as const },
  { key: "majors" as const, type: "majors" as const },
  { key: "onlineFriendliness" as const, type: "onlineFriendliness" as const },
  { key: "studentBodySize" as const, type: "studentBodySize" as const },
  { key: "collegeSpecialty" as const, type: "collegeSpecialty" as const },
  { key: "selectivity" as const, type: "selectivity" as const },
  { key: "goodFor" as const, type: "goodFor" as const },
];

export const singleFilterTypes = [
  { key: "highestGrade" as const, initial: initialK12Filters.highestGrade },
  { key: "tuition" as const, initial: initialK12Filters.tuition },
  { key: "cost" as const, initial: initialCollegesFilters.cost },
  { key: "sat" as const, initial: initialCollegesFilters.sat },
  { key: "act" as const, initial: initialCollegesFilters.act },
  { key: "ration" as const, initial: initialK12Filters.ration },
  { key: "organization" as const, initial: initialK12Filters.organization },
  { key: "rating" as const, initial: initialK12Filters.rating },
  {
    key: "genAreaOfStudy" as const,
    initial: initialCollegesFilters.genAreaOfStudy,
  },
  {
    key: "admissionsProcess" as const,
    initial: initialCollegesFilters.admissionsProcess,
  },
  {
    key: "religionAffiliation" as const,
    initial: initialCollegesFilters.religionAffiliation,
  },
  {
    key: "startingSalaryAfterGraduation" as const,
    initial: initialCollegesFilters.startingSalaryAfterGraduation,
  },
];
