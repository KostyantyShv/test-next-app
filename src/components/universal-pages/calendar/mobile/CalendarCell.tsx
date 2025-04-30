import { Event } from "../types/event";

interface CalendarCellProps {
  date: number;
  isPrevMonth?: boolean;
  isNextMonth?: boolean;
  events?: Event[];
  isToday?: boolean;
  onSelectDate?: (date: number) => void;
  isSelected?: boolean;
}

export const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  isPrevMonth,
  isNextMonth,
  events,
  isToday,
  onSelectDate,
  isSelected,
}) => {
  return (
    <div
      className={`flex flex-row w-[51px] h-[51px] items-center justify-center gap-2 px-2 ${
        isPrevMonth || isNextMonth
          ? "text-[#B0B7C0] cursor-default"
          : isSelected
          ? "!bg-[#0B6333] text-white rounded-full"
          : "text-[#202124] cursor-pointer hover:bg-[#F1F3F4]"
      } ${isToday ? "border border-[#0B6333] rounded-full" : ""} ${
        events &&
        events.length > 0 &&
        "bg-[rgba(0,_223,_139,_0.05)] rounded-full"
      }`}
      onClick={() => onSelectDate && onSelectDate(date)}
    >
      {events && events.length > 0 && (
        <div className="flex gap-[2px] mt-1 flex-col">
          {events.slice(0, 3).map((event, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                event.type === "zoom-meeting" || event.type === "zoom-webinar"
                  ? "bg-[#15B7C3]"
                  : event.type === "teams-meeting"
                  ? "bg-[#608CFD]"
                  : event.type === "one-on-one"
                  ? "bg-[#E47EF4]"
                  : event.type === "webex-meeting"
                  ? "bg-[#F89E6C]"
                  : "bg-[#EE4206]"
              }`}
            />
          ))}
        </div>
      )}
      <span className="text-sm font-medium">{date}</span>
    </div>
  );
};
