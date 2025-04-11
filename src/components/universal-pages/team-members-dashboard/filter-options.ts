import { FilterOption } from "./types";

// Filter options
export const statusOptions: FilterOption[] = [
  { value: "all", label: "All Status" },
  { value: "accepted", label: "Accepted" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
];

export const sortOptions: FilterOption[] = [
  { value: "name", label: "Sort by: Name A-Z" },
  { value: "email", label: "Sort by: Email A-Z" },
  { value: "lastActive", label: "Sort by: Last Active" },
];

export const bulkActionOptions: FilterOption[] = [
  { value: "", label: "Bulk Actions" },
  { value: "delete", label: "Delete Selected" },
  { value: "export", label: "Export Selected" },
];
