export type GradeFilter = "pre-k" | "elementary" | "middle" | "high school";
export type TypeFilter = "public" | "private" | "charter" | "magnet";
export type ReligionType = "catholic" | "christian" | "jewish" | "islamic";
export type BoardingStatus = "Offers boarding";
export type Academics = "AP Program" | "IB Program" | "Gifted/Talented Program";
export type Organization = "NCEA" | "any" | "NAIS" | "TABS" | "ACSI";
export type FilterItem = {
  type: keyof FiltersType;
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
  highestGrade: GradeLevel; // Changed to single value (not array)
  boardingStatus: BoardingStatus[];
  tuition: number;
  ration: number;
  academics: Academics[];
  organization: Organization;
  [key: string]: FilterValue[] | GradeLevel | number | Organization; // Updated index signature
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
  resetFilters: () => void;
}
