import { Author } from "./author";

export interface Announcement {
  id: number;
  title: string;
  emoji: string;
  author: Author;
  content: string;
  status: "live" | "scheduled" | "paused";
  pinned: boolean;
  startDate: string;
  endDate: string;
}
