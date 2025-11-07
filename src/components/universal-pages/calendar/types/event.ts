export interface Event {
  id?: string; // Database event ID (optional for backward compatibility with mock data)
  type: string;
  title: string;
  time: string;
  attendees: number;
  avatar1: string;
  avatar2: string;
  date: number;
  month: number;
  year: number;
}
