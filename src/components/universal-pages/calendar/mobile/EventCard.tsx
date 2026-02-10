import Image from "next/image";
import { Event } from "../types/event";
import { getIconSvg } from "./getIconSvg";

interface EventCardProps {
  event: Event;
  onEventClick?: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onEventClick }) => {
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
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: getEventBg(event.type) }}
      >
        {getIconSvg(event.type)}
      </div>
      <div className="flex-1">
        <div
          className="text-base font-medium"
          style={{ color: getEventColor(event.type) }}
        >
          {event.title}
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--subtle-text)] mt-1">
          <span>{event.time}</span>
          <div className="flex items-center gap-1">
            <div className="flex -space-x-2">
              {(event.participants?.slice(0, 2) || []).length > 0 ? (
                event.participants!.slice(0, 2).map((p, i) => (
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
    </div>
  );
};
