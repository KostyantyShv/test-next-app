import { WEEKDAYS } from "../constants";
import { Event } from "../types/event";
import { EventCard } from "./EventCard";

interface EventListProps {
  events: Event[];
  selectedDate: number;
  currentDate: Date;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  selectedDate,
  currentDate,
}) => {
  const filteredEvents = events.filter(
    (event) =>
      event.date === selectedDate &&
      event.month === currentDate.getMonth() &&
      event.year === currentDate.getFullYear()
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const selectedDateObj = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    selectedDate
  );
  const weekday = WEEKDAYS[selectedDateObj.getDay()];
  const monthName = months[currentDate.getMonth()]; // Use static month name

  return (
    <div className="border-t border-[#E0E0E0] pt-4 px-4">
      <div className="text-lg font-semibold text-[#202124] mb-4 flex flex-row items-center gap-2">
        <svg fill="none" viewBox="0 0 20 20" width={20} height={20}>
          <path
            fill="currentColor"
            d="M6.66671 1.75C7.08092 1.75 7.41671 2.08579 7.41671 2.5V3.41667H12.5834V2.5C12.5834 2.08579 12.9192 1.75 13.3334 1.75C13.7476 1.75 14.0834 2.08579 14.0834 2.5V3.41667H15C15.641 3.41667 16.2557 3.67128 16.7089 4.12449C17.1621 4.5777 17.4167 5.19239 17.4167 5.83333V15.8333C17.4167 16.4743 17.1621 17.089 16.7089 17.5422C16.2557 17.9954 15.641 18.25 15 18.25H5.00004C4.3591 18.25 3.74441 17.9954 3.2912 17.5422C2.83799 17.089 2.58337 16.4743 2.58337 15.8333V5.83333C2.58337 5.19239 2.83799 4.5777 3.2912 4.12449C3.74441 3.67128 4.3591 3.41667 5.00004 3.41667H5.91671V2.5C5.91671 2.08579 6.25249 1.75 6.66671 1.75ZM5.91671 4.91667H5.00004C4.75693 4.91667 4.52377 5.01324 4.35186 5.18515C4.17995 5.35706 4.08337 5.59022 4.08337 5.83333V8.41667H15.9167V5.83333C15.9167 5.59022 15.8201 5.35706 15.6482 5.18515C15.4763 5.01324 15.2432 4.91667 15 4.91667H14.0834V5.83333C14.0834 6.24755 13.7476 6.58333 13.3334 6.58333C12.9192 6.58333 12.5834 6.24755 12.5834 5.83333V4.91667H7.41671V5.83333C7.41671 6.24755 7.08092 6.58333 6.66671 6.58333C6.25249 6.58333 5.91671 6.24755 5.91671 5.83333V4.91667ZM15.9167 9.91667H4.08337V15.8333C4.08337 16.0764 4.17995 16.3096 4.35186 16.4815C4.52377 16.6534 4.75693 16.75 5.00004 16.75H15C15.2432 16.75 15.4763 16.6534 15.6482 16.4815C15.8201 16.3096 15.9167 16.0764 15.9167 15.8333V9.91667ZM8.41671 12.5C8.41671 12.0858 8.75249 11.75 9.16671 11.75H10C10.4143 11.75 10.75 12.0858 10.75 12.5V15C10.75 15.4142 10.4143 15.75 10 15.75C9.58583 15.75 9.25004 15.4142 9.25004 15V13.25H9.16671C8.75249 13.25 8.41671 12.9142 8.41671 12.5Z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
        {weekday}, {monthName} {selectedDate}
      </div>
      {filteredEvents.length === 0 ? (
        <div className="text-[#5F6368] text-center py-4">
          No events for this date.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};
