export type SortOption = {
  value: string;
  label: string;
};

export type SortData = {
  id: string;
  label: string;
  icon: React.ReactNode;
  options: SortOption[];
  minWidth: string;
};
