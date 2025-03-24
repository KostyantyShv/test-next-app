export type GradeFilter = "pre-k" | "elementary" | "middle" | "high school";
export type TypeFilter = "public" | "private" | "charter" | "magnet";
export type ReligionType = "catholic" | "christian" | "jewish" | "islamic";
export type SpecialtyType =
  | "online"
  | "special education"
  | "montessori"
  | "therapeutic";

export interface FiltersType {
  grade: GradeFilter[];
  type: TypeFilter[];
  religion: ReligionType[];
  specialty: SpecialtyType[];
}

export interface SchoolsStore {
  filters: FiltersType;

  setGrade: (grade: GradeFilter) => void;
  setType: (type: TypeFilter) => void;
  setReligion: (religion: ReligionType) => void;
  setSpecialty: (specialty: SpecialtyType) => void;
  resetFilters: () => void;
}
