import Image from "next/image";
import { Event } from "../types/event";
import { getIconSvg } from "./getIconSvg";
import { resolveListingUrl } from "../utils/resolveListingUrl";

interface EventCardProps {
  event: Event;
  onEventClick?: (eventId: string) => void;
  onDeleteEvent?: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onEventClick, onDeleteEvent }) => {
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

  const handleClick = () => {
    if (onEventClick && event.id) onEventClick(event.id);
  };

  const handleViewListing = (e: React.MouseEvent) => {
    e.stopPropagation();
    const listingUrl = resolveListingUrl(event.listingId);
    if (!listingUrl) return;
    window.open(listingUrl, "_blank");
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (event.id && onDeleteEvent) onDeleteEvent(event.id);
  };

  const handleTimePillClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (event.externalUrl) window.open(event.externalUrl, "_blank");
  };

  return (
    <div
      role={onEventClick ? "button" : undefined}
      tabIndex={onEventClick ? 0 : undefined}
      onClick={onEventClick ? handleClick : undefined}
      onKeyDown={onEventClick ? (e) => e.key === "Enter" && handleClick() : undefined}
      className={`flex items-center gap-3 border-l-2 p-3 rounded-e-xl shadow-[0_2px_8px_rgba(0,_0,_0,_0.05)] bg-[var(--surface-color)] w-full ${event.type} ${onEventClick ? "cursor-pointer" : ""}`}
      style={{ borderLeftColor: getEventColor(event.type) }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: getEventBg(event.type) }}
      >
        {getIconSvg(event.type)}
      </div>
      <div className="flex-1 min-w-0">
        {/* Title row with action buttons */}
        <div className="flex items-center gap-1 mb-1">
          <div
            className="text-base font-medium truncate flex-1"
            style={{ color: getEventColor(event.type) }}
          >
            {event.title}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {event.listingId && (
              <button
                className="w-[22px] h-[22px] flex items-center justify-center rounded-[3px] hover:bg-[var(--hover-bg)] active:bg-[var(--hover-bg)]"
                aria-label="View listing"
                onClick={handleViewListing}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={16} height={16} style={{ color: "#9AA0A6" }}>
                  <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </button>
            )}
            <button
              className="w-[22px] h-[22px] flex items-center justify-center rounded-[3px] hover:bg-[var(--hover-bg)] active:bg-[var(--hover-bg)]"
              aria-label="Delete event"
              onClick={handleDeleteClick}
            >
              <svg fill="none" viewBox="0 0 20 20" width={16} height={16} style={{ color: "#9AA0A6" }}>
                <path fill="currentColor" d="M8.33337 3.25C8.31127 3.25 8.29008 3.25878 8.27445 3.27441C8.25882 3.29004 8.25004 3.31123 8.25004 3.33333V5.08333H11.75V3.33333C11.75 3.31123 11.7413 3.29004 11.7256 3.27441C11.71 3.25878 11.6888 3.25 11.6667 3.25H8.33337ZM13.25 5.08333V3.33333C13.25 2.91341 13.0832 2.51068 12.7863 2.21375C12.4894 1.91681 12.0866 1.75 11.6667 1.75H8.33337C7.91345 1.75 7.51072 1.91681 7.21379 2.21375C6.91686 2.51068 6.75004 2.91341 6.75004 3.33333V5.08333H4.17548C4.1702 5.08328 4.16491 5.08328 4.15961 5.08333H3.33337C2.91916 5.08333 2.58337 5.41912 2.58337 5.83333C2.58337 6.24755 2.91916 6.58333 3.33337 6.58333H3.47661L4.25028 15.8674C4.25913 16.496 4.51269 17.097 4.95787 17.5422C5.41108 17.9954 6.02577 18.25 6.66671 18.25H13.3334C13.9743 18.25 14.589 17.9954 15.0422 17.5422C15.4874 17.097 15.7409 16.496 15.7498 15.8674L16.5235 6.58333H16.6667C17.0809 6.58333 17.4167 6.24755 17.4167 5.83333C17.4167 5.41912 17.0809 5.08333 16.6667 5.08333H15.8405C15.8352 5.08328 15.8299 5.08328 15.8246 5.08333H13.25ZM4.98181 6.58333L5.74745 15.771C5.74918 15.7918 5.75004 15.8125 5.75004 15.8333C5.75004 16.0764 5.84662 16.3096 6.01853 16.4815C6.19043 16.6534 6.42359 16.75 6.66671 16.75H13.3334C13.5765 16.75 13.8096 16.6534 13.9816 16.4815C14.1535 16.3096 14.25 16.0764 14.25 15.8333C14.25 15.8125 14.2509 15.7918 14.2526 15.771L15.0183 6.58333H4.98181ZM8.33337 8.41667C8.74759 8.41667 9.08337 8.75245 9.08337 9.16667V14.1667C9.08337 14.5809 8.74759 14.9167 8.33337 14.9167C7.91916 14.9167 7.58337 14.5809 7.58337 14.1667V9.16667C7.58337 8.75245 7.91916 8.41667 8.33337 8.41667ZM11.6667 8.41667C12.0809 8.41667 12.4167 8.75245 12.4167 9.16667V14.1667C12.4167 14.5809 12.0809 14.9167 11.6667 14.9167C11.2525 14.9167 10.9167 14.5809 10.9167 14.1667V9.16667C10.9167 8.75245 11.2525 8.41667 11.6667 8.41667Z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        {/* Time row with avatars and external link arrow */}
        <div className="flex items-center gap-2 text-sm text-[var(--subtle-text)]">
          <div
            className="inline-flex items-center gap-1 cursor-pointer"
            onClick={handleTimePillClick}
          >
            <span>{event.time}</span>
            {event.externalUrl && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" width={14} height={14} style={{ color: "#9AA0A6" }}>
                <path fill="currentColor" d="m15.474 11.793-5.366 5.367a1 1 0 0 1-1.414-1.414l5.366-5.367h-3.586a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-3.586Z" />
                <path fill="currentColor" d="M22.938 12.914c0 5.523-4.478 10-10 10-5.523 0-10-4.477-10-10s4.477-10 10-10c5.522 0 10 4.477 10 10Zm-2 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="flex -space-x-2">
            {(event.participants?.slice(0, 2) || []).length > 0 ? (
              event.participants!.slice(0, 2).map((p) => (
                <Image key={p.id} height={24} width={24} src={p.avatarUrl} className="w-6 h-6 rounded-full border-2 border-[var(--surface-color)] object-cover" alt={`${p.firstName} ${p.lastName}`} />
              ))
            ) : (
              <>
                <Image height={24} width={24} src={event.avatar1} className="w-6 h-6 rounded-full border-2 border-[var(--surface-color)]" alt="Attendee 1" />
                <Image height={24} width={24} src={event.avatar2} className="w-6 h-6 rounded-full border-2 border-[var(--surface-color)]" alt="Attendee 2" />
              </>
            )}
          </div>
          <span className="text-xs bg-[var(--surface-secondary)] text-[var(--subtle-text)] px-2 py-0.5 rounded-full">
            {event.attendeeCount || (event.attendees > 2 ? `${event.attendees}+` : `${event.attendees}`)}
          </span>
        </div>
      </div>
    </div>
  );
};
