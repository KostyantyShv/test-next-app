import { FilterData } from "@/types/filter";
import { SubcategoryType } from "@/types/schools-collections";
import { ReactNode } from "react";
import { CATEGORIES_ENUM } from "./enums";
import { SUBCATEGORIES_ENUM } from "@/store/enum";

export type CollectionsFilterMockType = Record<
  | "TYPE"
  | "RATING"
  | "RELIGION"
  | "SPECIALTY"
  | "VENDOR"
  | "CATEGORIES"
  | "STATUS"
  | "NOTES"
  | "SCHOOL_SCOUT_GRADE"
  | "RATING",
  FilterData
>;

export type DropdownCategoryType =
  | CATEGORIES_ENUM.PINNED
  | CATEGORIES_ENUM.SYSTEM
  | CATEGORIES_ENUM.COLLECTIONS;

export interface DropdownValueType {
  id: string;
  icon: ReactNode;
  title: SUBCATEGORIES_ENUM;
  viewsCount: string;
}

export type DropdownType = Record<DropdownCategoryType, DropdownValueType[]>;

export type DropdownCategoryIconType = Record<
  DropdownCategoryType,
  ReactNode
>;
export type DropdownSubcategoryIconType = Record<SubcategoryType, ReactNode>;
