export interface ChecklistItemProps {
  icon: string;
  title: string;
  button?: { type: "add" | "fix"; label: string };
  description?: string;
  issues?: { title: string; missing: string[] }[];
  status?: "completed";
}
