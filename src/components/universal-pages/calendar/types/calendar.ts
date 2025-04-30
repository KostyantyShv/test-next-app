import { Event } from "./event";

export type CalendarCellData = {
  date: number;
  isPrevMonth?: boolean;
  isNextMonth?: boolean;
  events?: Event[];
  isToday?: boolean;
};
