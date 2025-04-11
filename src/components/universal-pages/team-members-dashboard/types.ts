export interface TeamMember {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  status: "accepted" | "pending" | "rejected";
  lastActive: string;
  isAdmin: boolean;
  listings: { id: number; name: string; image: string }[];
}

export interface FilterOption {
  value: string;
  label: string;
}
