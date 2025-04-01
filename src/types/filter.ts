import { SortData, SortOption } from "./sort";

export type FilterOptionType = SortOption;
export type FilterData = SortData;
export type AcademicsMockType = Omit<SortData, "icon">;
export type BoardingMockType = AcademicsMockType;
