export type SubOptionsType = SortOption;

export type SortOption = {
  value: string;
  label: string;
  subOptions?: SubOptionsType[];
  parentValue?: string;
};

export type SortData = {
  id: string;
  label: string;
  icon: React.ReactNode;
  options: SortOption[];
  minWidth: string;
};
