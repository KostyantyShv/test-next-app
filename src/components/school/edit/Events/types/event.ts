export interface Event {
  id: number;
  title: string;
  type: "zoom" | "teams" | "session";
  description: string;
  image: string;
  status: "live" | "scheduled" | "passed";
  pinned: boolean;
  order: number;
  startDate: string;
  endDate: string;
}
