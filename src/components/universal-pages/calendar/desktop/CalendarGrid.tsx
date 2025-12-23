import { RENDER_WEEKDAYS } from "../constants";
import { CalendarCellData } from "../types/calendar";
import { CalendarCell } from "./CalendarCell";

export const CalendarGrid: React.FC<{
  calendarData: CalendarCellData[];
  onDateClick?: (date: number) => void;
  onEventClick?: (eventId: string) => void;
}> = ({ calendarData, onDateClick, onEventClick }) => (
  <div className="grid grid-cols-7 gap-[2px] bg-[#E0E0E0] border border-[#E0E0E0]">
    {RENDER_WEEKDAYS.map((day) => (
      <div
        key={day}
        className="bg-white p-3 text-center font-medium text-[#5F6368]"
      >
        {day}
      </div>
    ))}
    {calendarData.map((cell, index) => (
      <CalendarCell
        key={index}
        date={cell.date}
        isPrevMonth={cell.isPrevMonth}
        isNextMonth={cell.isNextMonth}
        events={cell.events}
        isToday={cell.isToday}
        onDateClick={onDateClick}
        onEventClick={onEventClick}
      />
    ))}
  </div>
);
