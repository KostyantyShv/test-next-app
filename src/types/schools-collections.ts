import { SUBCATEGORIES_ENUM } from "@/store/enum";
import {
  FilterItem,
  FiltersType,
  FilterValue,
  ReligionType,
  SchoolScoutCategory,
  SchoolScoutGrade,
  SpecialtyType,
} from "./schools-explore";

export type SubtypeK12 = "Traditional" | "Charter" | "Magnet" | "Private";
export type SubtypeDistrict = "Traditional" | "Charter" | "Magnet" | "Private";
export type SubtypeColleges = "2 year" | "4 year";
export type SubtypeGraduates = "Public" | "Private";
export type SubtypesEstablishmentType =
  | SubtypeK12
  | SubtypeColleges
  | SubtypeGraduates | SubtypeDistrict;
export type TypesEstablishmentType = "K12" | "Colleges" | "Graduates" | "District";

export type CategoryType =
  | "STEM"
  | "Arts & Music"
  | "Language Immersion"
  | "Sports & Athletics"
  | "Special Needs";
export type StatusType =
  | "Researching"
  | "Scheduled Tour"
  | "Visited Campus"
  | "Started Application"
  | "Applied"
  | "Accepted"
  | "Enrolled";
export type NoteType = "With Notes" | "Without Notes";
export type RatingType = "1" | "2" | "3" | "4" | "5";
export type VendorType = "Vendor A" | "Vendor B" | "Vendor C";

export type StudyTypeFilter = {
  [K in TypesEstablishmentType]: SubtypesEstablishmentType[];
};

export interface CollectionsFiltersType {
  studyType: StudyTypeFilter;
  vendor: VendorType[];
  categories: CategoryType[];
  status: StatusType[];
  notes: NoteType[];
}

export type CollectionsFiltersWithPartialFiltersType = CollectionsFiltersType &
  Partial<FiltersType>;

export type SubcategoryType =
  | SUBCATEGORIES_ENUM.COLLEGE_APP
  | SUBCATEGORIES_ENUM.LIKED
  | SUBCATEGORIES_ENUM.RECENT_VIEWS
  | SUBCATEGORIES_ENUM.MY_REPORTS
  | SUBCATEGORIES_ENUM.TOP_SCHOOLS
  | SUBCATEGORIES_ENUM.SUMMARY_PROGRAMS;

export interface CollectionsStore {
  collectionsFilters: CollectionsFiltersWithPartialFiltersType;
  subcategory: SubcategoryType;

  setType: (
    type: TypesEstablishmentType,
    subType: SubtypesEstablishmentType
  ) => void;
  setRating: (rating: number) => void;
  setReligion: (religion: ReligionType) => void;
  setSpecialty: (specialty: SpecialtyType) => void;
  setVendor: (vendor: VendorType) => void;
  resetFilters: () => void;
  getActiveFilters: () => FilterItem[];
  removeFilter: (filterType: keyof FiltersType, value: FilterValue) => void;
  setCategories: (category: CategoryType) => void;
  setStatus: (status: StatusType) => void;
  setNotes: (note: NoteType) => void;
  setSchoolScoutGrade: (
    category: SchoolScoutCategory,
    grade: SchoolScoutGrade
  ) => void;
  setSubcategory: (subcategory: SubcategoryType) => void;
}
