import { Event } from "./event";

export type ListItemData = {
  date: number;
  weekday: string;
  isCurrent?: boolean;
  events: Event[];
};
