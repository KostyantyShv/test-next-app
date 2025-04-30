import { Event } from "../types/event";
import { CalendarCell } from "./CalendarCell";

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  selectedDate: number;
  setSelectedDate: (date: number) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  events,
  selectedDate,
  setSelectedDate,
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const today = new Date();

  const calendarData: {
    date: number;
    isPrevMonth?: boolean;
    isNextMonth?: boolean;
    events?: Event[];
    isToday?: boolean;
  }[] = [];

  // Add previous month's days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarData.push({
      date: prevMonthDays - i,
      isPrevMonth: true,
      isToday: false, // Explicitly disable isToday for previous month
    });
  }

  // Add current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    const dayEvents = events.filter(
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
  const remainingCells = 42 - totalCells;
  for (let i = 1; i <= remainingCells; i++) {
    calendarData.push({
      date: i,
      isNextMonth: true,
      isToday: false, // Explicitly disable isToday for next month
    });
  }

  return (
    <div className="grid grid-cols-7 gap-1 bg-white p-4">
      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
        <div
          key={`weekday-${index}`}
          className="text-center text-sm font-medium text-[#5F6368]"
        >
          {day}
        </div>
      ))}
      {calendarData.map((cell, index) => (
        <CalendarCell
          key={`cell-${index}`}
          date={cell.date}
          isPrevMonth={cell.isPrevMonth}
          isNextMonth={cell.isNextMonth}
          events={cell.events}
          isToday={cell.isToday}
          onSelectDate={
            cell.isPrevMonth || cell.isNextMonth ? undefined : setSelectedDate
          }
          isSelected={
            cell.date === selectedDate && !cell.isPrevMonth && !cell.isNextMonth
          }
        />
      ))}
    </div>
  );
};
