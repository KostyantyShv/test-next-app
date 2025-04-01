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
} from "@/types/schools-explore";
import { toggleFilter } from "@/utils/toggleFilters";
import { isEmptyValue } from "@/utils/isEmptyValue";
import {
  arrayFilterTypes,
  initialCollegesFilters,
  initialEstablishment,
  initialGraduatesFilters,
  initialK12Filters,
  singleFilterTypes,
} from "./mock";
import { ESTABLISHMENT } from "./enum";

export const useSchoolsExplore = create<SchoolsStore>((set, get) => ({
  filterK12: initialK12Filters,
  filterColleges: initialCollegesFilters,
  establishment: initialEstablishment,
  filterGraduates: initialGraduatesFilters,

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

    if (establishment === ESTABLISHMENT.K_12) {
      set((state) => ({
        filterK12: {
          ...state.filterK12,
          religion: toggleFilter(state.filterK12.religion, religion),
        },
      }));
    } else if (establishment === ESTABLISHMENT.COLLEGES) {
      set((state) => ({
        filterColleges: {
          ...state.filterColleges,
          religion: toggleFilter(state.filterColleges.religion, religion),
        },
      }));
    } else if (establishment === ESTABLISHMENT.GRADUATES) {
      set((state) => ({
        filterGraduates: {
          ...state.filterGraduates,
          religion: toggleFilter(state.filterGraduates.religion, religion),
        },
      }));
    }
  },

  setSpecialty: (specialty: SpecialtyType) => {
    const { establishment } = get();
    if (establishment === ESTABLISHMENT.K_12) {
      set((state) => ({
        filterK12: {
          ...state.filterK12,
          specialty: toggleFilter(state.filterK12.specialty, specialty),
        },
      }));
    } else if (establishment === ESTABLISHMENT.COLLEGES) {
      set((state) => ({
        filterColleges: {
          ...state.filterColleges,
          specialty: toggleFilter(state.filterColleges.specialty, specialty),
        },
      }));
    } else if (establishment === ESTABLISHMENT.GRADUATES) {
      set((state) => ({
        filterGraduates: {
          ...state.filterGraduates,
          specialty: toggleFilter(state.filterGraduates.specialty, specialty),
        },
      }));
    }
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

  setProgram: () => {},

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
    if (establishment === ESTABLISHMENT.K_12) {
      set((state) => ({
        filterK12: {
          ...state.filterK12,
          collegeType: {
            ...state.filterK12.collegeType,
            [type]: toggleFilter(state.filterK12.collegeType[type], subType),
          },
        },
      }));
    } else if (establishment === ESTABLISHMENT.COLLEGES) {
      set((state) => ({
        filterColleges: {
          ...state.filterColleges,
          collegeType: {
            ...state.filterColleges.collegeType,
            [type]: toggleFilter(
              state.filterColleges.collegeType[type],
              subType
            ),
          },
        },
      }));
    } else if (establishment === ESTABLISHMENT.GRADUATES) {
      set((state) => ({
        filterGraduates: {
          ...state.filterGraduates,
          collegeType: {
            ...state.filterGraduates.collegeType,
            [type]: toggleFilter(
              state.filterGraduates.collegeType[type],
              subType
            ),
          },
        },
      }));
    }
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

  getActiveFiltersK12: (): FilterItem[] => {
    const { filterK12 } = get();
    const activeFilters: FilterItem[] = [];
    Object.entries(filterK12.collegeType).forEach(([type, subTypes]) => {
      if (subTypes.length > 0) {
        activeFilters.push({ type: "collegeType", value: type });
        activeFilters.push(
          ...subTypes.map((subType) => ({
            type: "collegeType",
            value: subType,
          }))
        );
      }
    });

    arrayFilterTypes.forEach(({ key, type }) => {
      if (filterK12[key].length > 0) {
        activeFilters.push(...filterK12[key].map((value) => ({ type, value })));
      }
    });

    singleFilterTypes.forEach(({ key, initial }) => {
      const value = filterK12[key];
      if (value !== initial && !isEmptyValue(value)) {
        activeFilters.push({ type: key, value });
      }
    });

    if (filterK12.schoolScoutGrades.length > 0) {
      activeFilters.push(
        ...filterK12.schoolScoutGrades.map((grade) => ({
          type: "schoolScoutGrades",
          value: grade,
        }))
      );
    }

    return activeFilters;
  },

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

  getActiveFiltersCollege: (): FilterItem[] => {
    const { filterColleges } = get();
    const activeFilters: FilterItem[] = [];
    Object.entries(filterColleges.collegeType).forEach(([type, subTypes]) => {
      if (subTypes.length > 0) {
        activeFilters.push({ type: "collegeType", value: type });
        activeFilters.push(
          ...subTypes.map((subType) => ({
            type: "collegeType",
            value: subType,
          }))
        );
      }
    });

    arrayFilterTypes.forEach(({ key, type }) => {
      if (filterColleges[key].length > 0) {
        activeFilters.push(
          ...filterColleges[key].map((value) => ({ type, value }))
        );
      }
    });

    singleFilterTypes.forEach(({ key, initial }) => {
      const value = filterColleges[key];
      if (value !== initial && !isEmptyValue(value)) {
        activeFilters.push({ type: key, value });
      }
    });

    if (filterColleges.schoolScoutGrades.length > 0) {
      activeFilters.push(
        ...filterColleges.schoolScoutGrades.map((grade) => ({
          type: "schoolScoutGrades",
          value: grade,
        }))
      );
    }

    return activeFilters;
  },

  getActiveFiltersGraduates: (): FilterItem[] => {
    const { filterGraduates } = get();
    const activeFilters: FilterItem[] = [];
    Object.entries(filterGraduates.collegeType).forEach(([type, subTypes]) => {
      if (subTypes.length > 0) {
        activeFilters.push({ type: "collegeType", value: type });
        activeFilters.push(
          ...subTypes.map((subType) => ({
            type: "collegeType",
            value: subType,
          }))
        );
      }
    });

    arrayFilterTypes.forEach(({ key, type }) => {
      if (filterGraduates[key].length > 0) {
        activeFilters.push(
          ...filterGraduates[key].map((value) => ({ type, value }))
        );
      }
    });

    singleFilterTypes.forEach(({ key, initial }) => {
      const value = filterGraduates[key];
      if (value !== initial && !isEmptyValue(value)) {
        activeFilters.push({ type: key, value });
      }
    });

    if (filterGraduates.schoolScoutGrades.length > 0) {
      activeFilters.push(
        ...filterGraduates.schoolScoutGrades.map((grade) => ({
          type: "schoolScoutGrades",
          value: grade,
        }))
      );
    }

    return activeFilters;
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
        default:
          return null;
      }
    };

    const filterStateKey = getFilterStateKey();
    if (!filterStateKey) return;

    set((state) => {
      const currentFilters = state[filterStateKey];

      if (filterType === "collegeType") {
        const [type, subType] = (value as string).split(": ");
        return {
          [filterStateKey]: {
            ...currentFilters,
            collegeType: {
              ...currentFilters.collegeType,
              [type]: subType
                ? currentFilters.collegeType[type as CollegeTypeFilter].filter(
                    (st) => st !== subType
                  )
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

      const initialFilters = {
        [ESTABLISHMENT.K_12]: initialK12Filters,
        [ESTABLISHMENT.COLLEGES]: initialCollegesFilters,
        [ESTABLISHMENT.GRADUATES]: initialGraduatesFilters,
      }[establishment];

      return {
        [filterStateKey]: {
          ...currentFilters,
          [filterType]: initialFilters[filterType],
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
        filterK12: { ...initialK12Filters },
      }));
    } else if (establishment === ESTABLISHMENT.COLLEGES) {
      set(() => ({
        filterColleges: { ...initialCollegesFilters },
      }));
    } else if (establishment === ESTABLISHMENT.GRADUATES) {
      set(() => ({
        filterGraduates: { ...initialGraduatesFilters },
      }));
    }
  },

  setEstablishment: (establishment: EstablishmentType) => {
    set({ establishment: establishment });
  },
}));
