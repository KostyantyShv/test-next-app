import { create } from "zustand";
import {
  FiltersType,
  SchoolsStore,
  GradeFilter,
  TypeFilter,
  ReligionType,
  SpecialtyType,
} from "@/types/schools-explore";

const initialFilters: FiltersType = {
  grade: [],
  religion: [],
  specialty: [],
  type: [],
};

const toggleFilter = <T>(currentItems: T[], newItem: T): T[] =>
  currentItems.includes(newItem)
    ? currentItems.filter((item) => item !== newItem)
    : [...currentItems, newItem];

export const useSchoolsExplore = create<SchoolsStore>((set) => ({
  filters: initialFilters,

  setGrade: (grade: GradeFilter) => {
    set((state) => ({
      filters: {
        ...state.filters,
        grade: toggleFilter(state.filters.grade, grade),
      },
    }));
  },

  setType: (type: TypeFilter) => {
    set((state) => ({
      filters: {
        ...state.filters,
        type: toggleFilter(state.filters.type, type),
      },
    }));
  },

  setReligion: (religion: ReligionType) => {
    set((state) => ({
      filters: {
        ...state.filters,
        religion: toggleFilter(state.filters.religion, religion),
      },
    }));
  },

  setSpecialty: (specialty: SpecialtyType) => {
    set((state) => ({
      filters: {
        ...state.filters,
        specialty: toggleFilter(state.filters.specialty, specialty),
      },
    }));
  },

  resetFilters: () => {
    set((state) => ({
      filters: {
        ...state.filters,
        grade: [],
        religion: [],
        specialty: [],
        type: [],
      },
    }));
  },
}));
