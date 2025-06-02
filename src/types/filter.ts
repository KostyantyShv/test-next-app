import { CollectionsFiltersType } from "./schools-collections";
import { FiltersType } from "./schools-explore";
import { SortData, SortOption } from "./sort";

export type FilterOptionType = SortOption;
export type FilterData = SortData;
export type AcademicsMockType = Omit<SortData, "icon">;
export type BoardingMockType = AcademicsMockType;
export type AllFiltersType = FiltersType & CollectionsFiltersType;
