import { FiltersType } from "@/types/schools-explore";

export const initialFilters: FiltersType = {
  grade: [],
  religion: [],
  specialty: [],
  type: [],
  highestGrade: "any",
  boardingStatus: [],
  tuition: 0,
  ration: 0,
  rating: 0,
  academics: [],
  organization: "any",
  schoolScoutGrades: [],
};

export const arrayFilterTypes = [
  { key: "grade" as const, type: "grade" as const },
  { key: "religion" as const, type: "religion" as const },
  { key: "specialty" as const, type: "specialty" as const },
  { key: "type" as const, type: "type" as const },
  { key: "boardingStatus" as const, type: "boardingStatus" as const },
  { key: "academics" as const, type: "academics" as const },
];

export const singleFilterTypes = [
  { key: "highestGrade" as const, initial: initialFilters.highestGrade },
  { key: "tuition" as const, initial: initialFilters.tuition },
  { key: "ration" as const, initial: initialFilters.ration },
  { key: "organization" as const, initial: initialFilters.organization },
  { key: "rating" as const, initial: initialFilters.rating },
];
