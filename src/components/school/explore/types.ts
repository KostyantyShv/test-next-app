import { FilterData } from "@/types/filter";

// types.ts
export interface School {
  name: string;
  schoolType: string;
  location: string;
  ratio: string;
  rating: string;
  image: string;
  avatar: string;
  ranking: string;
  grade: string;
  students: string;
  price: string;
  grades: string;
  specialty?: "hot" | "instant-book" | "sponsored";
  specialtyLabel?: string;
  description: string;
  reviews: number;
  verified?: boolean; // Optional, indicates if school is verified
  acceptanceRate?: string; // Optional, e.g., "20%"
  duration?: string; // Optional, e.g., "4 Year"
  sat?: string; // Optional, e.g., "1440-1550"
}

export type FilterMockType = Record<
  | "GRADE"
  | "TYPE"
  | "RELIGION"
  | "SPECIALTY"
  | "COLLEGE_TYPE_COLLEGES"
  | "COLLEGE_TYPE_GRADUATE"
  | "MAJORS"
  | "PROGRAM"
  | "ONLINE_FRIENDLINESS"
  | "STUDENT_BODY_SIZE"
  | "COLLEGE_SPECIALTY"
  | "SELECTIVITY"
  | "GOOD_FOR",
  FilterData
>;
