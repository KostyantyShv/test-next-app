import { Event } from "../types/event";

interface CalendarCellProps {
  date: number;
  isPrevMonth?: boolean;
  isNextMonth?: boolean;
  events?: Event[];
  isToday?: boolean;
  onSelectDate?: (date: number) => void;
  isSelected?: boolean;
  onDateClick?: (date: number) => void;
  onEventClick?: (eventId: string) => void;
}

export const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  isPrevMonth,
  isNextMonth,
  events,
  isToday,
  onSelectDate,
  isSelected,
  onDateClick,
  onEventClick,
}) => {
  const handleClick = () => {
    if (onSelectDate && !isPrevMonth && !isNextMonth) {
      onSelectDate(date);
    }
    if (onDateClick && !isPrevMonth && !isNextMonth) {
      onDateClick(date);
    }
  };
  return (
    <div
      className={`flex flex-row w-[51px] h-[51px] items-center justify-center gap-2 px-2 ${
        isNextMonth
          ? "text-[var(--border-color)] bg-[var(--border-color)] cursor-default"
          : isPrevMonth
          ? "text-[var(--subtle-text)] opacity-60 cursor-default"
          : isSelected
          ? "!bg-[var(--active-green)] text-[var(--surface-color)] rounded-full"
          : "text-[var(--text-default)] cursor-pointer hover:bg-[var(--hover-bg)]"
      } ${isToday ? "border border-[var(--active-green)] rounded-full" : ""} ${
        events &&
        events.length > 0 &&
        !isNextMonth &&
        "bg-[var(--apply-button-bg)] rounded-full"
      }`}
      onClick={handleClick}
    >
      {events && events.length > 0 && (
        <div className="flex gap-[2px] mt-1 flex-col">
          {events.slice(0, 3).map((event, index) => (
            <div
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                if (event.id && onEventClick) {
                  onEventClick(event.id);
                }
              }}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                event.type === "zoom-meeting" || event.type === "zoom-webinar"
                  ? "bg-[var(--event-zoom)]"
                  : event.type === "teams-meeting"
                  ? "bg-[var(--event-teams)]"
                  : event.type === "one-on-one"
                  ? "bg-[var(--event-1on1)]"
                  : event.type === "webex-meeting"
                  ? "bg-[var(--event-webex)]"
                  : "bg-[var(--event-group)]"
              }`}
            />
          ))}
        </div>
      )}
      <span className="text-sm font-medium">{date}</span>
    </div>
  );
};
