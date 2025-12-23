import { WEEKDAYS } from "../constants";
import { CalendarCellData } from "../types/calendar";
import { Event } from "../types/event";
import { FilterType } from "../types/filter";
import { ListItemData } from "../types/list";
import { useCalendarEvents } from "@/hooks/useCalendarEvents.hook";

export const useCalendarData = (
  currentDate: Date,
  today: Date,
  filter: FilterType
) => {
  const { events, loading } = useCalendarEvents();
  // Helper functions
  const filterEvents = (eventsList: Event[]) => {
    return eventsList.filter((event) => {
      const eventDate = new Date(event.year, event.month, event.date);
      const todayMidnight = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );

      if (filter === "UPCOMING") {
        return eventDate >= todayMidnight;
      } else if (filter === "PAST") {
        return eventDate < todayMidnight;
      }
      return true; // ALL
    });
  };

  const generateCalendarData = (): CalendarCellData[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const calendarData: CalendarCellData[] = [];

    // Filter events based on the current filter
    const filteredEvents = filterEvents(events);

    // Add previous month's days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarData.push({ date: prevMonthDays - i, isPrevMonth: true });
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvents = filteredEvents.filter(
        (event) =>
          event.date === i && event.month === month && event.year === year
      );
      calendarData.push({
        date: i,
        events: dayEvents.length > 0 ? dayEvents : undefined,
        isToday:
          i === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear(),
      });
    }

    // Add next month's days
    const totalCells = calendarData.length;
    const remainingCells = 35 - totalCells; // Ensure 5 rows (7 columns * 5 rows)
    for (let i = 1; i <= remainingCells; i++) {
      calendarData.push({ date: i, isNextMonth: true });
    }

    return calendarData;
  };

  const generateListData = (): ListItemData[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const listData: ListItemData[] = [];

    const filteredEvents = filterEvents(events);

    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvents = filteredEvents.filter(
        (event) =>
          event.date === i && event.month === month && event.year === year
      );
      if (dayEvents.length > 0) {
        const date = new Date(year, month, i);
        listData.push({
          date: i,
          weekday: WEEKDAYS[date.getDay()],
          isCurrent:
            i === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear(),
          events: dayEvents,
        });
      }
    }

    return listData;
  };

  const calendarData = generateCalendarData();
  const listData = generateListData();

  return { calendarData, listData };
};
