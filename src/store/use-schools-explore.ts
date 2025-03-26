import { create } from "zustand";
import {
  FiltersType,
  SchoolsStore,
  GradeFilter,
  TypeFilter,
  ReligionType,
  SpecialtyType,
  GradeLevel,
  FilterValue,
  BoardingStatus,
  FilterItem,
  Academics,
  Organization,
} from "@/types/schools-explore";
import { toggleFilter } from "@/utils/toggleFilters";
import { isEmptyValue } from "@/utils/isEmptyValue";
import { arrayFilterTypes, initialFilters, singleFilterTypes } from "./mock";

export const useSchoolsExplore = create<SchoolsStore>((set, get) => ({
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

  setHighestGrade: (grade: GradeLevel) => {
    set((state) => ({
      filters: {
        ...state.filters,
        highestGrade: grade,
      },
    }));
  },

  setOrganization: (organization: Organization) => {
    set((state) => ({
      filters: {
        ...state.filters,
        organization: organization,
      },
    }));
  },

  setBoardingStatus: (status: BoardingStatus) => {
    set((state) => ({
      filters: {
        ...state.filters,
        boardingStatus: toggleFilter(state.filters.boardingStatus, status),
      },
    }));
  },

  setTuition: (value: number) => {
    set((state) => ({
      filters: {
        ...state.filters,
        tuition: value,
      },
    }));
  },

  setRation: (ration: number) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ration: ration,
      },
    }));
  },

  removeFilter: (filterType: keyof FiltersType, value: FilterValue) => {
    set((state) => {
      const currentValue = state.filters[filterType];
      if (Array.isArray(currentValue)) {
        return {
          filters: {
            ...state.filters,
            [filterType]: currentValue.filter((item) => item !== value),
          },
        };
      }
      return {
        filters: {
          ...state.filters,
          [filterType]: initialFilters[filterType],
        },
      };
    });
  },

  setAcademics: (academics: Academics) => {
    set((state) => ({
      filters: {
        ...state.filters,
        academics: toggleFilter(state.filters.academics, academics),
      },
    }));
  },

  resetFilters: () => {
    set(() => ({
      filters: { ...initialFilters },
    }));
  },

  getActiveFilters: (): FilterItem[] => {
    const filters = get().filters;
    const activeFilters: FilterItem[] = [];

    arrayFilterTypes.forEach(({ key, type }) => {
      if (filters[key].length > 0) {
        activeFilters.push(...filters[key].map((value) => ({ type, value })));
      }
    });

    singleFilterTypes.forEach(({ key, initial }) => {
      const value = filters[key];
      if (value !== initial && !isEmptyValue(value)) {
        activeFilters.push({ type: key, value });
      }
    });

    return activeFilters;
  },
}));
