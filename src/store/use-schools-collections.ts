import {
  CategoryType,
  CollectionsFiltersWithPartialFiltersType,
  CollectionsStore,
  NoteType,
  StatusType,
  SubcategoryType,
  SubtypesEstablishmentType,
  TypesEstablishmentType,
  VendorType,
} from "@/types/schools-collections";
import {
  FilterItem,
  FiltersType,
  FilterValue,
  ReligionType,
  SchoolScoutCategory,
  SchoolScoutGrade,
  SchoolScoutGradeEntry,
  SpecialtyType,
} from "@/types/schools-explore";
import { isEmptyValue } from "@/utils/isEmptyValue";
import { toggleFilter } from "@/utils/toggleFilters";
import { create } from "zustand";
import { arrayFilterTypes, singleFilterTypes } from "./mock";
import { AllFiltersType } from "@/types/filter";
import { SUBCATEGORIES_ENUM } from "./enum";

const getActiveFilters = (filterData: AllFiltersType): FilterItem[] => {
  const activeFilters: FilterItem[] = [];

  Object.entries(filterData.studyType).forEach(([type, subTypes]) => {
    if (subTypes.length > 0) {
      activeFilters.push({ type: "studyType", value: type });
      activeFilters.push(
        ...subTypes.map((subType) => ({
          type: "studyType",
          value: subType,
        }))
      );
    }
  });

  if (filterData.schoolScoutGrades.length > 0) {
    activeFilters.push(
      ...filterData.schoolScoutGrades.map((grade) => ({
        type: "schoolScoutGrades",
        value: grade,
      }))
    );
  }

  arrayFilterTypes.forEach(({ key, type }) => {
    if (filterData?.[key]?.length > 0) {
      activeFilters.push(...filterData[key].map((value) => ({ type, value })));
    }
  });

  singleFilterTypes.forEach(({ key, initial }) => {
    const value = filterData?.[key];
    if (value !== initial && !isEmptyValue(value)) {
      activeFilters.push({ type: key, value });
    }
  });

  return activeFilters;
};

const initialCollectionsFilters: CollectionsFiltersWithPartialFiltersType = {
  studyType: {
    K12: [],
    Colleges: [],
    Graduates: [],
    District: [],
  },
  rating: 0,
  specialty: [],
  religion: [],
  vendor: [],
  categories: [],
  status: [],
  notes: [],
  schoolScoutGrades: [],
};

const initialSubcategory: SubcategoryType = SUBCATEGORIES_ENUM.LIKED;

export const useSchoolsCollection = create<CollectionsStore>((set, get) => ({
  collectionsFilters: initialCollectionsFilters,
  subcategory: initialSubcategory,

  setType: (
    type: TypesEstablishmentType,
    subType: SubtypesEstablishmentType
  ) => {
    set((state) => {
      return {
        collectionsFilters: {
          ...state.collectionsFilters,
          studyType: {
            ...state.collectionsFilters.studyType,
            [type]: toggleFilter(
              state.collectionsFilters.studyType[type],
              subType
            ),
          },
        },
      };
    });
  },

  setRating: (rating: number) => {
    set((state) => ({
      collectionsFilters: {
        ...state.collectionsFilters,
        rating: rating,
      },
    }));
  },

  setReligion: (religion: ReligionType) => {
    set((state) => {
      if (state.collectionsFilters.religion) {
        return {
          collectionsFilters: {
            ...state.collectionsFilters,
            religion: toggleFilter(state.collectionsFilters.religion, religion),
          },
        };
      }
      return {
        collectionsFilters: {
          ...state.collectionsFilters,
          religion: [religion],
        },
      };
    });
  },

  setSpecialty: (specialty: SpecialtyType) => {
    set((state) => {
      if (state.collectionsFilters.specialty) {
        return {
          collectionsFilters: {
            ...state.collectionsFilters,
            specialty: toggleFilter(
              state.collectionsFilters.specialty,
              specialty
            ),
          },
        };
      }
      return {
        collectionsFilters: {
          ...state.collectionsFilters,
          specialty: [specialty],
        },
      };
    });
  },

  setCategories: (category: CategoryType) => {
    set((state) => ({
      collectionsFilters: {
        ...state.collectionsFilters,
        categories: toggleFilter(state.collectionsFilters.categories, category),
      },
    }));
  },

  setStatus: (status: StatusType) => {
    set((state) => ({
      collectionsFilters: {
        ...state.collectionsFilters,
        status: toggleFilter(state.collectionsFilters.status, status),
      },
    }));
  },

  setNotes: (note: NoteType) => {
    set((state) => ({
      collectionsFilters: {
        ...state.collectionsFilters,
        notes: toggleFilter(state.collectionsFilters.notes, note),
      },
    }));
  },

  setVendor: (vendor: VendorType) => {
    set((state) => {
      if (state.collectionsFilters.vendor) {
        return {
          collectionsFilters: {
            ...state.collectionsFilters,
            vendor: toggleFilter(state.collectionsFilters.vendor, vendor),
          },
        };
      }
      return {
        collectionsFilters: {
          ...state.collectionsFilters,
          vendor: [vendor],
        },
      };
    });
  },

  setSchoolScoutGrade: (
    category: SchoolScoutCategory,
    grade: SchoolScoutGrade
  ) => {
    set((state) => {
      const entry = `${category}: ${grade}` as SchoolScoutGradeEntry;
      const currentGrades = state.collectionsFilters.schoolScoutGrades;

      if (currentGrades?.includes(entry)) {
        return {
          collectionsFilters: {
            ...state.collectionsFilters,
            schoolScoutGrades: currentGrades.filter((g) => g !== entry),
          },
        };
      }
      return {
        collectionsFilters: {
          ...state.collectionsFilters,
          schoolScoutGrades: currentGrades && [...currentGrades, entry],
        },
      };
    });
  },

  removeFilter: (filterType: keyof FiltersType, value: FilterValue) => {
    set((state) => {
      const currentFilters = state.collectionsFilters;

      if (filterType === "studyType") {
        const [type, subType] = (value as string).split(": ");
        return {
          collectionsFilters: {
            ...currentFilters,
            studyType: {
              ...currentFilters.studyType,
              [type]: subType
                ? currentFilters.studyType[
                    type as TypesEstablishmentType
                  ].filter((st) => st !== subType)
                : [],
            },
          },
        };
      }

      const currentValue = currentFilters[filterType];

      if (Array.isArray(currentValue)) {
        return {
          collectionsFilters: {
            ...currentFilters,
            [filterType]: currentValue.filter((item) => item !== value),
          },
        };
      }

      if (filterType === "schoolScoutGrades") {
        return {
          collectionsFilters: {
            ...currentFilters,
            schoolScoutGrades:
              currentFilters.schoolScoutGrades &&
              currentFilters.schoolScoutGrades.filter((g) => g !== value),
          },
        };
      }

      if (typeof currentValue === "number") {
        if (currentValue === value) {
          const initialValue = initialCollectionsFilters[filterType];
          return {
            collectionsFilters: {
              ...currentFilters,
              [filterType]: initialValue,
            },
          };
        }
        return state;
      }

      const initialValue = initialCollectionsFilters[filterType];
      return {
        collectionsFilters: {
          ...currentFilters,
          [filterType]: initialValue,
        },
      };
    });
  },

  setSubcategory: (subcategory: SubcategoryType) => {
    set({ subcategory: subcategory });
  },

  getActiveFilters: () =>
    getActiveFilters(get().collectionsFilters as AllFiltersType),

  resetFilters: () => {
    set({ collectionsFilters: initialCollectionsFilters });
  },
}));
