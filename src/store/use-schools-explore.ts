import { create } from "zustand";
import {
  FiltersType,
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
  SchoolScoutCategory,
  SchoolScoutGrade,
  SchoolScoutGradeEntry,
  CollegeTypeFilter,
  CollegeSubTypeFilter,
  EstablishmentType,
  SchoolsStore,
  MajorsType,
  GenAreaOfStudy,
  OnlineFriendliness,
  StudentBodySize,
  CollegeSpecialty,
  AdmissionsProcess,
  Selectivity,
  ReligionAffiliation,
  GoodFor,
  StartingSalaryAfterGraduation,
  EstablishmentTypes,
  Program,
} from "@/types/schools-explore";
import { toggleFilter } from "@/utils/toggleFilters";
import { isEmptyValue } from "@/utils/isEmptyValue";
import {
  arrayFilterTypes,
  initialFilters,
  initialEstablishment,
  singleFilterTypes,
} from "./mock";
import { ESTABLISHMENT } from "./enum";
import { AllFiltersType } from "@/types/filter";

const filterMap: Record<ESTABLISHMENT, EstablishmentTypes> = {
  [ESTABLISHMENT.K_12]: "filterK12",
  [ESTABLISHMENT.COLLEGES]: "filterColleges",
  [ESTABLISHMENT.GRADUATES]: "filterGraduates",
  [ESTABLISHMENT.DISTRICT]: "filterDistrict",
};

const getActiveFilters = (filterData: AllFiltersType): FilterItem[] => {
  const activeFilters: FilterItem[] = [];

  Object.entries(filterData.collegeTypeColleges).forEach(([type, subTypes]) => {
    if (subTypes.length > 0) {
      activeFilters.push({ type: "collegeTypeColleges", value: type });
      activeFilters.push(
        ...subTypes.map((subType) => ({
          type: "collegeTypeColleges",
          value: subType,
        }))
      );
    }
  });

  arrayFilterTypes.forEach(({ key, type }) => {
    if (filterData[key]?.length > 0) {
      activeFilters.push(...filterData[key].map((value) => ({ type, value })));
    }
  });

  singleFilterTypes.forEach(({ key, initial }) => {
    const value = filterData[key];
    if (value !== initial && !isEmptyValue(value)) {
      activeFilters.push({ type: key, value });
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

  return activeFilters;
};

export const useSchoolsExplore = create<SchoolsStore>((set, get) => ({
  filterK12: initialFilters,
  filterColleges: initialFilters,
  filterGraduates: initialFilters,
  filterDistrict: initialFilters,
  establishment: initialEstablishment,

  setGrade: (grade: GradeFilter) => {
    set((state) => ({
      filterK12: {
        ...state.filterK12,
        grade: toggleFilter(state.filterK12.grade, grade),
      },
    }));
  },

  setType: (type: TypeFilter) => {
    set((state) => ({
      filterK12: {
        ...state.filterK12,
        type: toggleFilter(state.filterK12.type, type),
      },
    }));
  },

  setReligion: (religion: ReligionType) => {
    const { establishment } = get();

    set((state) => {
      const filterKey = filterMap[establishment];
      const currentFilter = state[filterKey];

      return {
        [filterKey]: {
          ...currentFilter,
          religion: toggleFilter(currentFilter.religion, religion),
        },
      } as Partial<SchoolsStore>;
    });
  },

  setSpecialty: (specialty: SpecialtyType) => {
    const { establishment } = get();

    set((state) => {
      const filterKey = filterMap[establishment];
      const currentFilter = state[filterKey];

      return {
        [filterKey]: {
          ...currentFilter,
          specialty: toggleFilter(currentFilter.specialty, specialty),
        },
      } as Partial<SchoolsStore>;
    });
  },

  setGenAreaOfStudy: (area: GenAreaOfStudy) => {
    set((state) => ({
      filterColleges: {
        ...state.filterColleges,
        genAreaOfStudy: area,
      },
    }));
  },

  setOnlineFriendliness: (friendliness: OnlineFriendliness) => {
    set((state) => ({
      filterColleges: {
        ...state.filterColleges,
        onlineFriendliness: toggleFilter(
          state.filterColleges.onlineFriendliness,
          friendliness
        ),
      },
    }));
  },

  setHighestGrade: (grade: GradeLevel) => {
    set((state) => ({
      filterK12: {
        ...state.filterK12,
        highestGrade: grade,
      },
    }));
  },

  setOrganization: (organization: Organization) => {
    set((state) => ({
      filterK12: {
        ...state.filterK12,
        organization: organization,
      },
    }));
  },

  setBoardingStatus: (status: BoardingStatus) => {
    set((state) => ({
      filterK12: {
        ...state.filterK12,
        boardingStatus: toggleFilter(state.filterK12.boardingStatus, status),
      },
    }));
  },

  setProgram: (program: Program) => {
    set((state) => ({
      filterGraduates: {
        ...state.filterGraduates,
        program: toggleFilter(state.filterGraduates.program, program),
      },
    }));
  },

  setTuition: (value: number) => {
    set((state) => ({
      filterK12: {
        ...state.filterK12,
        tuition: value,
      },
    }));
  },

  setCost: (value: number) => {
    set((state) => ({
      filterColleges: {
        ...state.filterColleges,
        cost: value,
      },
    }));
  },

  setRation: (ration: number) => {
    set((state) => ({
      filterK12: {
        ...state.filterK12,
        ration: ration,
      },
    }));
  },

  setSchoolScoutGrade: (
    category: SchoolScoutCategory,
    grade: SchoolScoutGrade
  ) => {
    set((state) => {
      const entry = `${category}: ${grade}` as SchoolScoutGradeEntry;
      const currentGrades = state.filterK12.schoolScoutGrades;

      if (currentGrades.includes(entry)) {
        return {
          filterK12: {
            ...state.filterK12,
            schoolScoutGrades: currentGrades.filter((g) => g !== entry),
          },
        };
      } else {
        return {
          filterK12: {
            ...state.filterK12,
            schoolScoutGrades: [...currentGrades, entry],
          },
        };
      }
    });
  },

  setCollegeType: (type: CollegeTypeFilter, subType: CollegeSubTypeFilter) => {
    const { establishment } = get();

    set((state) => {
      const filterKey = filterMap[establishment];
      const currentFilter = state[filterKey];

      return {
        [filterKey]: {
          ...currentFilter,
          collegeTypeColleges: {
            ...currentFilter.collegeTypeColleges,
            [type]: toggleFilter(
              currentFilter.collegeTypeColleges[type],
              subType
            ),
          },
        },
      };
    });
  },

  setReligionAffiliation: (religion: ReligionAffiliation) => {
    set((state) => ({
      filterColleges: {
        ...state.filterColleges,
        religionAffiliation: religion,
      },
    }));
  },

  setMajors: (majors: MajorsType) => {
    set((state) => ({
      filterColleges: {
        ...state.filterColleges,
        majors: toggleFilter(state.filterColleges.majors, majors),
      },
    }));
  },

  setAdmissionsProcess: (admission: AdmissionsProcess) => {
    set((state) => ({
      filterColleges: {
        ...state.filterColleges,
        admissionsProcess: admission,
      },
    }));
  },

  setSelectivity: (selectivity: Selectivity) => {
    set((state) => ({
      filterColleges: {
        ...state.filterColleges,
        selectivity: toggleFilter(
          state.filterColleges.selectivity,
          selectivity
        ),
      },
    }));
  },

  getActiveFiltersCollege: () =>
    getActiveFilters(get().filterColleges as AllFiltersType),

  getActiveFiltersGraduates: () =>
    getActiveFilters(get().filterGraduates as AllFiltersType),

  getActiveFiltersK12: () =>
    getActiveFilters(get().filterK12 as AllFiltersType),

  getActiveFiltersDistrict: () =>
    getActiveFilters(get().filterDistrict as AllFiltersType),

  setAct: (value: number) => {
    set((state) => ({
      filterColleges: {
        ...state.filterColleges,
        act: value,
      },
    }));
  },

  setSat: (value: number) => {
    set((state) => ({
      filterColleges: {
        ...state.filterColleges,
        sat: value,
      },
    }));
  },

  setCollegeSpecialty: (specialty: CollegeSpecialty) => {
    set((state) => ({
      filterColleges: {
        ...state.filterColleges,
        collegeSpecialty: toggleFilter(
          state.filterColleges.collegeSpecialty,
          specialty
        ),
      },
    }));
  },

  setStudentBodySize: (size: StudentBodySize) => {
    set((state) => ({
      filterColleges: {
        ...state.filterColleges,
        studentBodySize: toggleFilter(
          state.filterColleges.studentBodySize,
          size
        ),
      },
    }));
  },

  setGoodFor: (value: GoodFor) => {
    set((state) => ({
      filterColleges: {
        ...state.filterColleges,
        goodFor: toggleFilter(state.filterColleges.goodFor, value),
      },
    }));
  },

  setStartingSalaryAfterGraduation: (salary: StartingSalaryAfterGraduation) => {
    set((state) => ({
      filterColleges: {
        ...state.filterColleges,
        startingSalaryAfterGraduation: salary,
      },
    }));
  },

  removeFilter: (filterType: keyof FiltersType, value: FilterValue) => {
    const { establishment } = get();

    const getFilterStateKey = () => {
      switch (establishment) {
        case ESTABLISHMENT.K_12:
          return "filterK12";
        case ESTABLISHMENT.COLLEGES:
          return "filterColleges";
        case ESTABLISHMENT.GRADUATES:
          return "filterGraduates";
        case ESTABLISHMENT.DISTRICT:
          return "filterDistrict";
        default:
          return null;
      }
    };

    const filterStateKey = getFilterStateKey();
    if (!filterStateKey) return;

    set((state) => {
      const currentFilters = state[filterStateKey];

      if (filterType === "collegeTypeColleges") {
        const [type, subType] = (value as string).split(": ");
        return {
          [filterStateKey]: {
            ...currentFilters,
            collegeTypeColleges: {
              ...currentFilters.collegeTypeColleges,
              [type]: subType
                ? currentFilters.collegeTypeColleges[
                    type as CollegeTypeFilter
                  ].filter((st) => st !== subType)
                : [],
            },
          },
        };
      }

      if (filterType === "schoolScoutGrades") {
        return {
          [filterStateKey]: {
            ...currentFilters,
            schoolScoutGrades: currentFilters.schoolScoutGrades.filter(
              (g) => g !== value
            ),
          },
        };
      }

      const currentValue = currentFilters[filterType];
      if (Array.isArray(currentValue)) {
        return {
          [filterStateKey]: {
            ...currentFilters,
            [filterType]: currentValue.filter((item) => item !== value),
          },
        };
      }

      const allInitialFilters = {
        [ESTABLISHMENT.K_12]: initialFilters,
        [ESTABLISHMENT.COLLEGES]: initialFilters,
        [ESTABLISHMENT.GRADUATES]: initialFilters,
        [ESTABLISHMENT.DISTRICT]: initialFilters,
      }[establishment];

      return {
        [filterStateKey]: {
          ...currentFilters,
          [filterType]: allInitialFilters[filterType],
        },
      };
    });
  },

  setAcademics: (academics: Academics) => {
    set((state) => ({
      filterK12: {
        ...state.filterK12,
        academics: toggleFilter(state.filterK12.academics, academics),
      },
    }));
  },

  setRating: (rating: number) => {
    const { establishment } = get();
    if (establishment === ESTABLISHMENT.K_12) {
      set((state) => ({
        filterK12: {
          ...state.filterK12,
          rating: rating,
        },
      }));
    } else if (establishment === ESTABLISHMENT.COLLEGES) {
      set((state) => ({
        filterColleges: {
          ...state.filterColleges,
          rating: rating,
        },
      }));
    }
  },

  resetFilters: () => {
    const { establishment } = get();

    if (establishment === ESTABLISHMENT.K_12) {
      set(() => ({
        filterK12: { ...initialFilters },
      }));
    } else if (establishment === ESTABLISHMENT.COLLEGES) {
      set(() => ({
        filterColleges: { ...initialFilters },
      }));
    } else if (establishment === ESTABLISHMENT.GRADUATES) {
      set(() => ({
        filterGraduates: { ...initialFilters },
      }));
    } else if (establishment === ESTABLISHMENT.DISTRICT) {
      set(() => ({
        filterDistrict: { ...initialFilters },
      }));
    }
  },

  setEstablishment: (establishment: EstablishmentType) => {
    set({ establishment: establishment });
  },
}));
