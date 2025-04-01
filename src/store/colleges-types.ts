import {
  FiltersType,
  GenAreaOfStudy,
  MajorsType,
} from "@/types/schools-explore";

export interface InitialValueCollegesType extends FiltersType {
  majors: MajorsType[];
  genAreaOfStudy: GenAreaOfStudy;
}
