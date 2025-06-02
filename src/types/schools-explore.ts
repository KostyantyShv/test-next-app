import { InitialValueCollegesType } from "@/store/colleges-types";
import { InitialValueGraduatesType } from "@/store/graduates-types";
import { StudyTypeFilter } from "./schools-collections";

export type EstablishmentTypes =
  | "filterK12"
  | "filterColleges"
  | "filterGraduates";

export type GradeFilter = "pre-k" | "elementary" | "middle" | "high school";
export type TypeFilter = "public" | "private" | "charter" | "magnet";
export type ReligionType = "catholic" | "christian" | "jewish" | "islamic";
export type ReligionAffiliation = "Catholic" | "Christian" | "Jewish" | "Any";
export type BoardingStatus = "Offers boarding";
export type Academics = "AP Program" | "IB Program" | "Gifted/Talented Program";
export type Organization = "NCEA" | "any" | "NAIS" | "TABS" | "ACSI";
export type SchoolScoutGrade = "A" | "B" | "C" | "D";
export type EstablishmentType = "K-12" | "Colleges" | "Graduates";
export type CollegeTypeFilter = "4-year" | "2-year";
export type MajorsType = "Online" | "Campus";
export type Program = "Online" | "Masters" | "Doctorate";
export type StudentBodySize = "Small" | "Medium" | "Large";
export type StartingSalaryAfterGraduation =
  | "Any"
  | "$30,000+"
  | "$40,000+"
  | "$50,000+"
  | "$60,000+"
  | "$70,000+"
  | "$80,000+"
  | "$90,000+"
  | "$100,000+";
export type GoodFor =
  | "Veterans"
  | "International students"
  | "Adult learners"
  | "Low-income students"
  | "Middle-class students";
export type Selectivity =
  | "Extremely selective"
  | "Very selective"
  | "Selective"
  | "Average"
  | "Not selective";
export type AdmissionsProcess =
  | "Any"
  | "No Application Fee"
  | "Accepts Common App"
  | "Test-Optional"
  | "Offers Early Decision"
  | "Offers Early Action"
  | "Rolling Admission";
export type OnlineFriendliness =
  | "Fully online"
  | "Large online program"
  | "Some online degrees";
export type GenAreaOfStudy =
  | "any"
  | "Agricultural Sciences"
  | "Anthropology and Sociology"
  | "Architecture"
  | "Art"
  | "Arts Management"
  | "Biology"
  | "Building and Construction"
  | "Business and Management"
  | "Chemistry"
  | "Communications";
export type SchoolScoutGradeEntry =
  `${SchoolScoutCategory}: ${SchoolScoutGrade}`;
export type FilterItem = {
  type: keyof FiltersType;
  value: FilterValue;
};
export type CollegeSubTypeFilter =
  | "Private"
  | "Public"
  | "Community"
  | "Trade/Career"
  | "Other";
export type SchoolScoutCategory =
  | "Academics"
  | "Teachers"
  | "Diversity"
  | "Sports";
export type GradeLevel =
  | "any"
  | "prek"
  | "k"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";
export type SpecialtyType =
  | "online"
  | "special education"
  | "montessori"
  | "therapeutic";
export type CollegeSpecialty =
  | "Liberal arts"
  | "All-women"
  | "All-men"
  | "HBCU"
  | "Hispanic-serving institutions";

export type FilterValue =
  | string
  | number
  | GradeFilter
  | TypeFilter
  | ReligionType
  | SpecialtyType
  | GradeLevel
  | BoardingStatus
  | Academics
  | Organization
  | CollegeTypeFilter
  | CollegeSubTypeFilter
  | OnlineFriendliness
  | StudentBodySize
  | CollegeSpecialty
  | AdmissionsProcess
  | Selectivity
  | ReligionAffiliation
  | StartingSalaryAfterGraduation
  | GoodFor
  | GenAreaOfStudy;

export interface FiltersType {
  sat: number;
  act: number;
  cost: number;
  ration: number;
  rating: number;
  tuition: number;
  highestGrade: GradeLevel;
  genAreaOfStudy: GenAreaOfStudy;
  organization: Organization;
  admissionsProcess: AdmissionsProcess;
  religionAffiliation: ReligionAffiliation;
  startingSalaryAfterGraduation: StartingSalaryAfterGraduation;
  grade: GradeFilter[];
  type: TypeFilter[];
  religion: ReligionType[];
  specialty: SpecialtyType[];
  boardingStatus: BoardingStatus[];
  majors: MajorsType[];
  academics: Academics[];
  selectivity: Selectivity[];
  goodFor: GoodFor[];
  program: Program[];
  collegeSpecialty: CollegeSpecialty[];
  onlineFriendliness: OnlineFriendliness[];
  schoolScoutGrades: SchoolScoutGradeEntry[];
  studentBodySize: StudentBodySize[];
  collegeTypeColleges: {
    "4-year": CollegeSubTypeFilter[];
    "2-year": CollegeSubTypeFilter[];
  };
  [key: string]:
    | StudyTypeFilter
    | FilterValue[]
    | AdmissionsProcess
    | GradeLevel
    | GenAreaOfStudy
    | number
    | Organization
    | ReligionAffiliation
    | StartingSalaryAfterGraduation
    | SchoolScoutGradeEntry[]
    | { [key: string]: CollegeSubTypeFilter[] };
}

export interface SchoolsStore {
  establishment: EstablishmentType;

  setEstablishment: (establishment: EstablishmentType) => void;
}

export interface SchoolsStore {
  filterK12: FiltersType;
  establishment: EstablishmentType;
  filterColleges: InitialValueCollegesType;
  filterGraduates: InitialValueGraduatesType;

  setGrade: (grade: GradeFilter) => void;
  setType: (type: TypeFilter) => void;
  setReligion: (religion: ReligionType) => void;
  setSpecialty: (specialty: SpecialtyType) => void;
  setHighestGrade: (grade: GradeLevel) => void;
  setBoardingStatus: (status: BoardingStatus) => void;
  setTuition: (value: number) => void;
  setRation: (value: number) => void;
  setCost: (value: number) => void;
  setAcademics: (academics: Academics) => void;
  setSat: (value: number) => void;
  setAct: (value: number) => void;
  setOrganization: (organization: Organization) => void;
  setAdmissionsProcess: (admission: AdmissionsProcess) => void;
  setStudentBodySize: (size: StudentBodySize) => void;
  setGoodFor: (value: GoodFor) => void;
  setCollegeSpecialty: (specialty: CollegeSpecialty) => void;
  setSelectivity: (selectivity: Selectivity) => void;
  setReligionAffiliation: (religion: ReligionAffiliation) => void;
  getActiveFiltersK12: () => FilterItem[];
  getActiveFiltersCollege: () => FilterItem[];
  getActiveFiltersGraduates: () => FilterItem[];
  setGenAreaOfStudy: (area: GenAreaOfStudy) => void;
  setStartingSalaryAfterGraduation: (
    salary: StartingSalaryAfterGraduation
  ) => void;
  setOnlineFriendliness: (friendliness: OnlineFriendliness) => void;
  removeFilter: (filterType: keyof FiltersType, value: FilterValue) => void;
  setSchoolScoutGrade: (
    category: SchoolScoutCategory,
    grade: SchoolScoutGrade
  ) => void;
  setCollegeType: (
    type: CollegeTypeFilter,
    subType: CollegeSubTypeFilter
  ) => void;
  setRating: (rating: number) => void;
  setMajors: (major: MajorsType) => void;
  setProgram: (program: Program) => void;
  resetFilters: () => void;
}
