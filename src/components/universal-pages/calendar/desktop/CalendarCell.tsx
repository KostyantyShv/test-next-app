import { useState, useRef, useEffect } from "react";
import { Event } from "../types/event";
import Image from "next/image";

interface CalendarCellProps {
  date: number;
  isPrevMonth?: boolean;
  isNextMonth?: boolean;
  events?: Event[];
  isToday?: boolean;
  onDateClick?: (date: number) => void;
  onEventClick?: (eventId: string) => void;
  expandedEventId?: string | null;
  onEventExpand?: (eventId: string | null, cellIndex: number) => void;
  cellIndex?: number;
  onMoreEventsToggle?: (cellIndex: number) => void;
}

export const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  isPrevMonth,
  isNextMonth,
  events,
  isToday,
  onDateClick,
  onEventClick,
  expandedEventId,
  onEventExpand,
  cellIndex,
  onMoreEventsToggle,
}) => {
  const [showMore, setShowMore] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);

  const toggleMoreEvents = () => {
    setShowMore(!showMore);
    if (onMoreEventsToggle && cellIndex !== undefined) {
      setTimeout(() => {
        onMoreEventsToggle(cellIndex);
      }, 0);
    }
  };

  const handleDateClick = () => {
    if (!isPrevMonth && !isNextMonth && onDateClick) {
      onDateClick(date);
    }
  };

  const handleEventClick = (eventId: string | undefined, eventTitle: string, e: React.MouseEvent) => {
    // Check if it's a double click - open modal for editing
    if (e.detail === 2 && eventId && onEventClick) {
      onEventClick(eventId);
      return;
    }
    
    // Single click - expand/collapse event
    if (onEventExpand && cellIndex !== undefined) {
      let eventIdentifier: string;
      
      if (eventId) {
        // For DB events, use the event ID
        eventIdentifier = eventId;
      } else {
        // For mock events (without id), use cellIndex-title combination
        eventIdentifier = `${cellIndex}-${eventTitle}`;
      }
      
      const newExpandedId = expandedEventId === eventIdentifier ? null : eventIdentifier;
      onEventExpand(newExpandedId, cellIndex);
    }
  };

  // Expose cell ref for row height synchronization
  useEffect(() => {
    if (cellRef.current && cellIndex !== undefined) {
      // Store ref in a way that parent can access it
      (cellRef.current as any).__cellIndex = cellIndex;
    }
  }, [cellIndex]);

  const hasMoreEvents = events && events.length > 3;
  const needsPaddingForButton = hasMoreEvents;
  
  return (
    <div
      ref={cellRef}
      className={`calendar-cell flex flex-col min-h-[120px] p-2 gap-0.5 relative bg-white ${
        isToday ? "border-2 border-[#A0ABBC]" : ""
      }`}
      style={needsPaddingForButton ? { paddingBottom: "32px" } : undefined}
    >
      <div
        onClick={handleDateClick}
        className={`date-number text-sm font-medium mb-1 cursor-pointer ${
          isPrevMonth || isNextMonth ? "text-[#5F6368]" : "text-[#202124]"
        } ${!isPrevMonth && !isNextMonth ? "hover:bg-gray-100 rounded" : ""}`}
      >
        {date}
      </div>
      {events?.slice(0, showMore ? events.length : 3).map((event, index) => {
        // Determine event identifier: use id for DB events, or cellIndex-title for mock events
        const eventIdentifier = event.id 
          ? event.id 
          : (cellIndex !== undefined ? `${cellIndex}-${event.title}` : null);
        const isExpanded = expandedEventId === eventIdentifier;
        
        return (
        <div
          key={index}
          className={`event group w-full rounded-[4px] cursor-pointer transition-colors mb-0.5 relative ${
            isExpanded
              ? "expanded p-2 bg-[#F8F9FA]"
              : "px-2 py-[2px] bg-[#FAFAFA] hover:bg-[#F0F0F0]"
          } ${
            event.type === "zoom-meeting" || event.type === "zoom-webinar"
              ? "border-l-[3px] border-l-[#15B7C3]"
              : event.type === "teams-meeting"
              ? "border-l-[3px] border-l-[#608CFD]"
              : event.type === "one-on-one"
              ? "border-l-[3px] border-l-[#E47EF4]"
              : event.type === "webex-meeting"
              ? "border-l-[3px] border-l-[#F89E6C]"
              : event.type === "group-session"
              ? "border-l-[3px] border-l-[#EE4206]"
              : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handleEventClick(event.id, event.title, e);
          }}
        >
          <div className="event-header flex items-center gap-1">
            <div className="event-title-row flex items-center flex-1 min-w-0 relative h-5">
              <div
                className={`event-title text-[12px] font-medium truncate w-full pr-1 ${
                  event.type === "zoom-meeting" || event.type === "zoom-webinar"
                    ? "text-[#15B7C3]"
                    : event.type === "teams-meeting"
                    ? "text-[#608CFD]"
                    : event.type === "one-on-one"
                    ? "text-[#E47EF4]"
                    : event.type === "webex-meeting"
                    ? "text-[#F89E6C]"
                    : event.type === "group-session"
                    ? "text-[#EE4206]"
                    : ""
                }`}
              >
                {event.title}
              </div>
              <div
                className={`event-actions absolute right-0 top-0 bottom-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity flex items-center gap-1 pl-2 ${
                  isExpanded ? "bg-[#F8F9FA]" : "bg-[#F0F0F0]"
                }`}
              >
                <button
                  className="event-action-btn w-4 h-4 flex items-center justify-center rounded-[3px] hover:bg-black/10"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View listing"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
                  </svg>
                </button>
                <button
                  className="event-action-btn w-4 h-4 flex items-center justify-center rounded-[3px] hover:bg-black/10"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Remove event"
                >
                  <svg fill="none" viewBox="0 0 20 20">
                    <path fill="currentColor" d="M8.33337 3.25C8.31127 3.25 8.29008 3.25878 8.27445 3.27441C8.25882 3.29004 8.25004 3.31123 8.25004 3.33333V5.08333H11.75V3.33333C11.75 3.31123 11.7413 3.29004 11.7256 3.27441C11.71 3.25878 11.6888 3.25 11.6667 3.25H8.33337ZM13.25 5.08333V3.33333C13.25 2.91341 13.0832 2.51068 12.7863 2.21375C12.4894 1.91681 12.0866 1.75 11.6667 1.75H8.33337C7.91345 1.75 7.51072 1.91681 7.21379 2.21375C6.91686 2.51068 6.75004 2.91341 6.75004 3.33333V5.08333H4.17548C4.1702 5.08328 4.16491 5.08328 4.15961 5.08333H3.33337C2.91916 5.08333 2.58337 5.41912 2.58337 5.83333C2.58337 6.24755 2.91916 6.58333 3.33337 6.58333H3.47661L4.25028 15.8674C4.25913 16.496 4.51269 17.097 4.95787 17.5422C5.41108 17.9954 6.02577 18.25 6.66671 18.25H13.3334C13.9743 18.25 14.589 17.9954 15.0422 17.5422C15.4874 17.097 15.7409 16.496 15.7498 15.8674L16.5235 6.58333H16.6667C17.0809 6.58333 17.4167 6.24755 17.4167 5.83333C17.4167 5.41912 17.0809 5.08333 16.6667 5.08333H15.8405C15.8352 5.08328 15.8299 5.08328 15.8246 5.08333H13.25ZM4.98181 6.58333L5.74745 15.771C5.74918 15.7918 5.75004 15.8125 5.75004 15.8333C5.75004 16.0764 5.84662 16.3096 6.01853 16.4815C6.19043 16.6534 6.42359 16.75 6.66671 16.75H13.3334C13.5765 16.75 13.8096 16.6534 13.9816 16.4815C14.1535 16.3096 14.25 16.0764 14.25 15.8333C14.25 15.8125 14.2509 15.7918 14.2526 15.771L15.0183 6.58333H4.98181ZM8.33337 8.41667C8.74759 8.41667 9.08337 8.75245 9.08337 9.16667V14.1667C9.08337 14.5809 8.74759 14.9167 8.33337 14.9167C7.91916 14.9167 7.58337 14.5809 7.58337 14.1667V9.16667C7.58337 8.75245 7.91916 8.41667 8.33337 8.41667ZM11.6667 8.41667C12.0809 8.41667 12.4167 8.75245 12.4167 9.16667V14.1667C12.4167 14.5809 12.0809 14.9167 11.6667 14.9167C11.2525 14.9167 10.9167 14.5809 10.9167 14.1667V9.16667C10.9167 8.75245 11.2525 8.41667 11.6667 8.41667Z" clipRule="evenodd" fillRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="event-time group/time inline-flex items-center gap-1 text-[12px] text-[#5F6368] px-1.5 py-[3px] rounded-full -ml-1 hover:bg-black/5 cursor-pointer">
            <div className="event-icon w-3.5 h-3.5 flex items-center justify-center">
              {event.type === "zoom-meeting" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 38 38"
                >
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.2"
                    stroke="#15B7C3"
                    d="M22.8865 17.1133L27.3332 14.42V23.5867L22.8865 20.8867M10.6665 14.42H20.8532C21.3925 14.42 21.9096 14.6342 22.291 15.0155C22.6723 15.3969 22.8865 15.9141 22.8865 16.4533V23.5867H12.6998C12.4323 23.5867 12.1673 23.5339 11.9202 23.4313C11.6731 23.3287 11.4486 23.1783 11.2597 22.9888C11.0708 22.7992 10.9212 22.5743 10.8194 22.3268C10.7176 22.0794 10.6656 21.8142 10.6665 21.5467V14.42Z"
                  ></path>
                </svg>
              )}
              {event.type === "zoom-webinar" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 38 38"
                >
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.2"
                    stroke="#22C376"
                    d="M22.887 17.1133L27.3337 14.42V23.5866L22.887 20.8866M10.667 14.42H20.8537C21.3929 14.42 21.9101 14.6342 22.2915 15.0155C22.6728 15.3969 22.887 15.914 22.887 16.4533V23.5866H12.7003C12.4328 23.5867 12.1678 23.5338 11.9207 23.4312C11.6735 23.3286 11.4491 23.1783 11.2602 22.9887C11.0713 22.7992 10.9217 22.5743 10.8199 22.3268C10.7181 22.0794 10.6661 21.8142 10.667 21.5466V14.42Z"
                  ></path>
                </svg>
              )}
              {event.type === "teams-meeting" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 55 55"
                >
                  <path
                    fill="#608CFD"
                    d="M28.0017 15.7696C28.9609 15.1655 30.0969 14.9053 31.2235 15.0316C32.35 15.158 33.4001 15.6634 34.2017 16.465C34.2065 16.4697 34.2112 16.4745 34.216 16.4793C34.7116 16.347 35.2288 16.3033 35.7436 16.3522C36.5245 16.4265 37.2706 16.7113 37.9023 17.1764C38.534 17.6414 39.0277 18.2692 39.3306 18.9927C39.6335 19.7163 39.7343 20.5085 39.6223 21.2849C39.5339 21.8974 39.3157 22.4818 38.9845 23H41.3333C41.8856 23 42.3333 23.4477 42.3333 24V30.6667C42.3333 32.3464 41.6661 33.9573 40.4783 35.145C39.3063 36.317 37.7222 36.9823 36.0665 36.9997C35.7186 37.6388 35.2783 38.2306 34.7545 38.7545C33.3167 40.1923 31.3667 41 29.3333 41C25.9158 41 23.0295 38.7476 22.0364 35.6667H16C15.4477 35.6667 15 35.219 15 34.6667V21.3333C15 20.7811 15.4477 20.3333 16 20.3333H25.6773C25.6329 19.6676 25.7218 18.9951 25.9442 18.3563C26.317 17.2858 27.0425 16.3737 28.0017 15.7696Z"
                  ></path>
                </svg>
              )}
              {event.type === "one-on-one" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 38 38"
                >
                  <path
                    strokeWidth="0.25"
                    stroke="#E47EF4"
                    fill="#E47EF4"
                    d="M12.3205 25.7152H21.1938C21.8457 26.6366 22.9139 27.2235 24.1101 27.2235C26.0733 27.2235 27.674 25.6231 27.6746 23.6601C27.693 22.4994 27.1241 21.4509 26.2582 20.8003V12.2557V12.1307H26.1332H23.5913V11.943C23.5913 11.6717 23.3698 11.4502 23.0985 11.4502C22.8271 11.4502 22.6056 11.6717 22.6056 11.943V12.1307H19.1219V11.943C19.1219 11.6717 18.9005 11.4502 18.6291 11.4502C18.3578 11.4502 18.1363 11.6717 18.1363 11.943V12.1307H14.6342V11.943C14.6342 11.6717 14.4127 11.4502 14.1414 11.4502C13.87 11.4502 13.6486 11.6717 13.6486 11.943V12.1307H11.125H11V12.2557V24.3948C11 25.1259 11.5893 25.7152 12.3205 25.7152Z"
                  ></path>
                </svg>
              )}
              {event.type === "webex-meeting" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 38 38"
                >
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.2"
                    stroke="#F89E6C"
                    d="M19.8332 15.6667V14.2867C19.8332 13.9896 19.7152 13.7047 19.5051 13.4947C19.2951 13.2847 19.0102 13.1667 18.7132 13.1667H14.4132M10.6665 15.6667H22.8865V24H10.6665V15.6667ZM22.8865 17.9467L27.3332 15.2533V24.42L22.8865 21.72V17.9467Z"
                  ></path>
                </svg>
              )}
              {event.type === "group-session" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 38 38"
                >
                  <path
                    strokeWidth="0.25"
                    stroke="#EE4206"
                    fill="#EE4206"
                    d="M12.6587 24.759H20.6538C20.9472 25.9325 21.4984 26.662 22.1309 27.098C22.7782 27.5443 23.4983 27.6748 24.086 27.6748C25.9909 27.6748 27.5441 26.1219 27.5447 24.2171C27.5626 23.0916 27.0112 22.0747 26.1718 21.4433V11.7094V11.5844H26.0468H23.5869V11.4063C23.5869 11.1412 23.3705 10.9248 23.1054 10.9248C22.8403 10.9248 22.6239 11.1412 22.6239 11.4063V11.5844H19.255V11.4063C19.255 11.1412 19.0386 10.9248 18.7735 10.9248C18.5083 10.9248 18.2919 11.1412 18.2919 11.4063V11.5844H14.9052V11.4063C14.9052 11.1412 14.6888 10.9248 14.4237 10.9248C14.1585 10.9248 13.9422 11.1412 13.9422 11.4063V11.5844H11.5H11.375V11.7094V23.4753C11.375 24.1861 11.9479 24.759 12.6587 24.759Z"
                  ></path>
                </svg>
              )}
            </div>
            <span>{event.time}</span>
            <div className="pill-external-icon w-3 h-3 opacity-0 group-hover/time:opacity-100 transition-opacity flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26">
                <path fill="currentColor" d="m15.474 11.793-5.366 5.367a1 1 0 0 1-1.414-1.414l5.366-5.367h-3.586a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-3.586Z"></path>
                <path fill="currentColor" d="M22.938 12.914c0 5.523-4.478 10-10 10-5.523 0-10-4.477-10-10s4.477-10 10-10c5.522 0 10 4.477 10 10Zm-2 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
            </div>
          </div>
          <div className={`event-attendees items-center gap-1 mt-2 ${isExpanded ? "flex" : "hidden"}`}>
            <div className="avatar-group flex" style={{ marginRight: "4px" }}>
                <Image
                  height={24}
                  width={24}
                  src={event.avatar1}
                  className="avatar w-6 h-6 rounded-full border-2 border-white -ml-2 first:ml-0"
                  alt="Attendee 1"
                />
                <Image
                  height={24}
                  width={24}
                  src={event.avatar2}
                  className="avatar w-6 h-6 rounded-full border-2 border-white -ml-2"
                  alt="Attendee 2"
                />
              </div>
              <span className="attendee-count text-xs text-[#5F6368] bg-[#F1F3F4] rounded-xl" style={{ padding: "2px 6px" }}>
                {event.attendees > 2 ? `${event.attendees}+` : event.attendees}
              </span>
            </div>
        </div>
        );
      })}
      {events && events.length > 3 && !showMore && (
        <button
          className="more-events absolute bottom-2 left-2 px-2 py-0.5 bg-[#F8F9FA] border border-[#E0E0E0] rounded text-xs text-[#5F6368] cursor-pointer hover:bg-[#F1F3F4] z-10"
          onClick={(e) => {
            e.stopPropagation();
            toggleMoreEvents();
          }}
          style={{ marginTop: '4px' }}
        >
          {events.length - 3} More
        </button>
      )}
      {events && events.length > 3 && showMore && (
        <button
          className="more-events absolute bottom-2 left-2 px-2 py-0.5 bg-[#F8F9FA] border border-[#E0E0E0] rounded text-xs text-[#5F6368] cursor-pointer hover:bg-[#F1F3F4] z-10"
          onClick={(e) => {
            e.stopPropagation();
            toggleMoreEvents();
          }}
          style={{ marginTop: '4px' }}
        >
          Show Less
        </button>
      )}
    </div>
  );
};
