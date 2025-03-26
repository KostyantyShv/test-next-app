import { SortData, SortOption } from "./sort";

export type FilterOption = SortOption;
export type FilterData = SortData;
export type AcademicsMockType = Omit<SortData, "icon">;
export type BoardingMockType = AcademicsMockType;
