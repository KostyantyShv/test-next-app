export type GradeFilter = "pre-k" | "elementary" | "middle" | "high school";
export type TypeFilter = "public" | "private" | "charter" | "magnet";
export type ReligionType = "catholic" | "christian" | "jewish" | "islamic";
export type BoardingStatus = "Offers boarding";
export type Academics = "AP Program" | "IB Program" | "Gifted/Talented Program";
export type Organization = "NCEA" | "any" | "NAIS" | "TABS" | "ACSI";
export type SchoolScoutGrade = "A" | "B" | "C" | "D";
export type SchoolScoutCategory =
  | "Academics"
  | "Teachers"
  | "Diversity"
  | "Sports";
export type SchoolScoutGradeEntry =
  `${SchoolScoutCategory}: ${SchoolScoutGrade}`;

export type FilterItem = {
  type: keyof FiltersType; // This is string | number | symbol due to index signature
  value: FilterValue;
};
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
  | Organization;

export interface FiltersType {
  grade: GradeFilter[];
  type: TypeFilter[];
  religion: ReligionType[];
  specialty: SpecialtyType[];
  highestGrade: GradeLevel;
  boardingStatus: BoardingStatus[];
  tuition: number;
  ration: number;
  rating: number;
  academics: Academics[];
  organization: Organization;
  schoolScoutGrades: SchoolScoutGradeEntry[];
  [key: string]:
    | FilterValue[]
    | GradeLevel
    | number
    | Organization
    | SchoolScoutGradeEntry[];
}

export interface SchoolsStore {
  filters: FiltersType;

  setGrade: (grade: GradeFilter) => void;
  setType: (type: TypeFilter) => void;
  setReligion: (religion: ReligionType) => void;
  setSpecialty: (specialty: SpecialtyType) => void;
  setHighestGrade: (grade: GradeLevel) => void;
  setBoardingStatus: (status: BoardingStatus) => void;
  setTuition: (value: number) => void;
  setRation: (value: number) => void;
  setAcademics: (academics: Academics) => void;
  setOrganization: (organization: Organization) => void;
  getActiveFilters: () => FilterItem[];
  removeFilter: (filterType: keyof FiltersType, value: FilterValue) => void;
  setSchoolScoutGrade: (
    category: SchoolScoutCategory,
    grade: SchoolScoutGrade
  ) => void;
  setRating: (rating: number) => void;
  resetFilters: () => void;
}
