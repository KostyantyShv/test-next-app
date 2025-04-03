import { EstablishmentType, FiltersType } from "@/types/schools-explore";

export const initialEstablishment: EstablishmentType = "K-12";

export const initialFilters: FiltersType = {
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
  program: [],
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
  { key: "program" as const, type: "program" as const },
];

export const singleFilterTypes = [
  { key: "highestGrade" as const, initial: initialFilters.highestGrade },
  { key: "tuition" as const, initial: initialFilters.tuition },
  { key: "cost" as const, initial: initialFilters.cost },
  { key: "sat" as const, initial: initialFilters.sat },
  { key: "act" as const, initial: initialFilters.act },
  { key: "ration" as const, initial: initialFilters.ration },
  { key: "organization" as const, initial: initialFilters.organization },
  { key: "rating" as const, initial: initialFilters.rating },
  {
    key: "genAreaOfStudy" as const,
    initial: initialFilters.genAreaOfStudy,
  },
  {
    key: "admissionsProcess" as const,
    initial: initialFilters.admissionsProcess,
  },
  {
    key: "religionAffiliation" as const,
    initial: initialFilters.religionAffiliation,
  },
  {
    key: "startingSalaryAfterGraduation" as const,
    initial: initialFilters.startingSalaryAfterGraduation,
  },
];
