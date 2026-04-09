import Image from "next/image";
import { Event } from "../types/event";
import { getIconSvg } from "./getIconSvg";
import { resolveListingUrl } from "../utils/resolveListingUrl";

interface ListItemProps {
  date: number;
  weekday: string;
  month: string;
  isCurrent?: boolean;
  events: Event[];
  onDeleteEvent?: (eventId: string) => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  date,
  weekday,
  month,
  isCurrent,
  events,
  onDeleteEvent,
}) => {
  const eventColorMap: Record<string, string> = {
    "zoom-meeting": "var(--event-zoom)",
    "zoom-webinar": "var(--event-zoom-webinar)",
    "teams-meeting": "var(--event-teams)",
    "one-on-one": "var(--event-1on1)",
    "webex-meeting": "var(--event-webex)",
    "group-session": "var(--event-group)",
  };

  const getEventColor = (type: string) =>
    eventColorMap[type] || "var(--event-zoom)";

  const getEventBg = (type: string) =>
    `color-mix(in srgb, ${getEventColor(type)} 18%, var(--surface-color))`;

  const handleViewListing = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    const listingUrl = resolveListingUrl(event.listingId);
    if (!listingUrl) return;
    window.open(listingUrl, "_blank");
  };

  const handleDeleteClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    if (event.id && onDeleteEvent) onDeleteEvent(event.id);
  };

  const handleTimePillClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    if (event.externalUrl) window.open(event.externalUrl, "_blank");
  };

  return (
    <div className="flex flex-col py-2 w-full items-start px-4">
      <div className={`text-center relative w-full ${events[0].type}`}>
        <div
          className={`w-full font-semibold mb-3 pb-3 border-b border-[var(--border-color)] flex gap-2 items-center ${
            isCurrent ? "text-[var(--active-green)]" : "text-[var(--subtle-text)]"
          }`}
        >
          <svg fill="none" viewBox="0 0 20 20" width={20} height={20}>
            <path
              fill="currentColor"
              d="M6.66671 1.75C7.08092 1.75 7.41671 2.08579 7.41671 2.5V3.41667H12.5834V2.5C12.5834 2.08579 12.9192 1.75 13.3334 1.75C13.7476 1.75 14.0834 2.08579 14.0834 2.5V3.41667H15C15.641 3.41667 16.2557 3.67128 16.7089 4.12449C17.1621 4.5777 17.4167 5.19239 17.4167 5.83333V15.8333C17.4167 16.4743 17.1621 17.089 16.7089 17.5422C16.2557 17.9954 15.641 18.25 15 18.25H5.00004C4.3591 18.25 3.74441 17.9954 3.2912 17.5422C2.83799 17.089 2.58337 16.4743 2.58337 15.8333V5.83333C2.58337 5.19239 2.83799 4.5777 3.2912 4.12449C3.74441 3.67128 4.3591 3.41667 5.00004 3.41667H5.91671V2.5C5.91671 2.08579 6.25249 1.75 6.66671 1.75ZM5.91671 4.91667H5.00004C4.75693 4.91667 4.52377 5.01324 4.35186 5.18515C4.17995 5.35706 4.08337 5.59022 4.08337 5.83333V8.41667H15.9167V5.83333C15.9167 5.59022 15.8201 5.35706 15.6482 5.18515C15.4763 5.01324 15.2432 4.91667 15 4.91667H14.0834V5.83333C14.0834 6.24755 13.7476 6.58333 13.3334 6.58333C12.9192 6.58333 12.5834 6.24755 12.5834 5.83333V4.91667H7.41671V5.83333C7.41671 6.24755 7.08092 6.58333 6.66671 6.58333C6.25249 6.58333 5.91671 6.24755 5.91671 5.83333V4.91667ZM15.9167 9.91667H4.08337V15.8333C4.08337 16.0764 4.17995 16.3096 4.35186 16.4815C4.52377 16.6534 4.75693 16.75 5.00004 16.75H15C15.2432 16.75 15.4763 16.6534 15.6482 16.4815C15.8201 16.3096 15.9167 16.0764 15.9167 15.8333V9.91667ZM8.41671 12.5C8.41671 12.0858 8.75249 11.75 9.16671 11.75H10C10.4143 11.75 10.75 12.0858 10.75 12.5V15C10.75 15.4142 10.4143 15.75 10 15.75C9.58583 15.75 9.25004 15.4142 9.25004 15V13.25H9.16671C8.75249 13.25 8.41671 12.9142 8.41671 12.5Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
          <span className="px-2">
            {weekday}, {month} {date}
          </span>
        </div>
      </div>
      <div className="flex-1 flex flex-col w-full gap-3">
        {events.map((event, index) => (
          <div
            key={event.id || index}
            className={`flex items-center gap-3 border-l-2 p-3 rounded-e-xl shadow-[0_2px_8px_rgba(0,_0,_0,_0.05)] bg-[var(--surface-color)] w-full ${event.type}`}
            style={{ borderLeftColor: getEventColor(event.type) }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: getEventBg(event.type) }}
            >
              {getIconSvg(event.type)}
            </div>
            <div className="flex flex-col gap-1 w-full min-w-0">
              {/* Title row with action buttons */}
              <div className="flex items-center gap-1">
                <div
                  className="font-medium truncate flex-1"
                  style={{ color: getEventColor(event.type) }}
                >
                  {event.title}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {event.listingId && (
                    <button
                      className="w-[22px] h-[22px] flex items-center justify-center rounded-[3px] hover:bg-[var(--hover-bg)] active:bg-[var(--hover-bg)]"
                      aria-label="View listing"
                      onClick={(e) => handleViewListing(event, e)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={16} height={16} style={{ color: "#9AA0A6" }}>
                        <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                    </button>
                  )}
                  <button
                    className="w-[22px] h-[22px] flex items-center justify-center rounded-[3px] hover:bg-[var(--hover-bg)] active:bg-[var(--hover-bg)]"
                    aria-label="Delete event"
                    onClick={(e) => handleDeleteClick(event, e)}
                  >
                    <svg fill="none" viewBox="0 0 20 20" width={16} height={16} style={{ color: "#9AA0A6" }}>
                      <path fill="currentColor" d="M8.33337 3.25C8.31127 3.25 8.29008 3.25878 8.27445 3.27441C8.25882 3.29004 8.25004 3.31123 8.25004 3.33333V5.08333H11.75V3.33333C11.75 3.31123 11.7413 3.29004 11.7256 3.27441C11.71 3.25878 11.6888 3.25 11.6667 3.25H8.33337ZM13.25 5.08333V3.33333C13.25 2.91341 13.0832 2.51068 12.7863 2.21375C12.4894 1.91681 12.0866 1.75 11.6667 1.75H8.33337C7.91345 1.75 7.51072 1.91681 7.21379 2.21375C6.91686 2.51068 6.75004 2.91341 6.75004 3.33333V5.08333H4.17548C4.1702 5.08328 4.16491 5.08328 4.15961 5.08333H3.33337C2.91916 5.08333 2.58337 5.41912 2.58337 5.83333C2.58337 6.24755 2.91916 6.58333 3.33337 6.58333H3.47661L4.25028 15.8674C4.25913 16.496 4.51269 17.097 4.95787 17.5422C5.41108 17.9954 6.02577 18.25 6.66671 18.25H13.3334C13.9743 18.25 14.589 17.9954 15.0422 17.5422C15.4874 17.097 15.7409 16.496 15.7498 15.8674L16.5235 6.58333H16.6667C17.0809 6.58333 17.4167 6.24755 17.4167 5.83333C17.4167 5.41912 17.0809 5.08333 16.6667 5.08333H15.8405C15.8352 5.08328 15.8299 5.08328 15.8246 5.08333H13.25ZM4.98181 6.58333L5.74745 15.771C5.74918 15.7918 5.75004 15.8125 5.75004 15.8333C5.75004 16.0764 5.84662 16.3096 6.01853 16.4815C6.19043 16.6534 6.42359 16.75 6.66671 16.75H13.3334C13.5765 16.75 13.8096 16.6534 13.9816 16.4815C14.1535 16.3096 14.25 16.0764 14.25 15.8333C14.25 15.8125 14.2509 15.7918 14.2526 15.771L15.0183 6.58333H4.98181ZM8.33337 8.41667C8.74759 8.41667 9.08337 8.75245 9.08337 9.16667V14.1667C9.08337 14.5809 8.74759 14.9167 8.33337 14.9167C7.91916 14.9167 7.58337 14.5809 7.58337 14.1667V9.16667C7.58337 8.75245 7.91916 8.41667 8.33337 8.41667ZM11.6667 8.41667C12.0809 8.41667 12.4167 8.75245 12.4167 9.16667V14.1667C12.4167 14.5809 12.0809 14.9167 11.6667 14.9167C11.2525 14.9167 10.9167 14.5809 10.9167 14.1667V9.16667C10.9167 8.75245 11.2525 8.41667 11.6667 8.41667Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Time row with arrow + avatars */}
              <div className="flex items-center gap-1.5 text-xs text-[var(--subtle-text)] flex-wrap">
                <div
                  className="inline-flex items-center gap-1 cursor-pointer"
                  onClick={(e) => handleTimePillClick(event, e)}
                >
                  <span>{event.time}</span>
                  {event.externalUrl && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" width={12} height={12} style={{ color: "#9AA0A6" }}>
                      <path fill="currentColor" d="m15.474 11.793-5.366 5.367a1 1 0 0 1-1.414-1.414l5.366-5.367h-3.586a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-3.586Z" />
                      <path fill="currentColor" d="M22.938 12.914c0 5.523-4.478 10-10 10-5.523 0-10-4.477-10-10s4.477-10 10-10c5.522 0 10 4.477 10 10Zm-2 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex items-center">
                  {(event.participants?.slice(0, 2) || []).length > 0 ? (
                    event.participants!.slice(0, 2).map((p) => (
                      <Image key={p.id} height={24} width={24} src={p.avatarUrl} className="w-5 h-5 rounded-full border-2 border-[var(--surface-color)] object-cover -ml-1.5 first:ml-0" alt={`${p.firstName} ${p.lastName}`} />
                    ))
                  ) : (
                    <>
                      <Image height={24} width={24} src={event.avatar1} className="w-5 h-5 rounded-full border-2 border-[var(--surface-color)]" alt="Attendee 1" />
                      <Image height={24} width={24} src={event.avatar2} className="w-5 h-5 rounded-full border-2 border-[var(--surface-color)] -ml-1.5" alt="Attendee 2" />
                    </>
                  )}
                </div>
                <span className="text-xs text-[var(--subtle-text)] px-1.5 py-0.5 bg-[var(--surface-secondary)] rounded-xl">
                  {event.attendeeCount || (event.attendees > 2 ? `${event.attendees}+` : `${event.attendees}`)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
