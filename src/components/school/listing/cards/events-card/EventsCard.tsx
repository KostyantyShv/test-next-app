"use client";

import { useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import CardWrapper from "../../card-wrapper/CardWrapper";
import { events as listingEvents } from "./mock";
import EventCard from "./EventCard";
import { Event } from "./types";
import { useCalendarEvents } from "@/hooks/useCalendarEvents.hook";
import {
  Event as CalendarEvent,
  EventParticipant,
} from "@/components/universal-pages/calendar/types/event";

type CalendarEventType =
  | "zoom-meeting"
  | "zoom-webinar"
  | "teams-meeting"
  | "one-on-one"
  | "webex-meeting"
  | "group-session";

const DEFAULT_EVENT_URLS: Record<CalendarEventType, string> = {
  "zoom-meeting": "https://zoom.us",
  "zoom-webinar": "https://zoom.us/webinar",
  "teams-meeting": "https://teams.microsoft.com",
  "one-on-one": "https://calendly.com",
  "webex-meeting": "https://webex.com",
  "group-session": "https://meet.google.com",
};

const mapListingTypeToCalendarType = (event: Event): CalendarEventType => {
  const normalizedName = event.type.name.toLowerCase();

  if (normalizedName.includes("webinar")) return "zoom-webinar";
  if (normalizedName.includes("teams")) return "teams-meeting";
  if (normalizedName.includes("webex")) return "webex-meeting";
  if (normalizedName.includes("1:1") || normalizedName.includes("one")) {
    return "one-on-one";
  }

  if (event.type.color === "#608CFD") return "teams-meeting";
  if (event.type.color === "#E47EF4") return "one-on-one";
  if (event.type.color === "#F89E6C") return "webex-meeting";
  if (event.type.color === "#EE4206") return "group-session";
  if (event.type.color === "#22C376") return "zoom-webinar";

  return "zoom-meeting";
};

const parseListingDateTime = (dateLabel: string, timeLabel: string): Date => {
  const hasYear = /\b\d{4}\b/.test(dateLabel);
  const normalizedDate = hasYear
    ? dateLabel
    : `${dateLabel}, ${new Date().getFullYear()}`;
  const parsed = new Date(`${normalizedDate} ${timeLabel}`);

  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
};

const toParticipants = (event: Event): EventParticipant[] => {
  return event.attendees.map((attendee, index) => {
    const fallbackName = `Participant ${index + 1}`;
    const fullName = attendee.alt?.trim() || fallbackName;
    const [firstName, ...rest] = fullName.split(" ");

    return {
      id: `${event.id}-participant-${index + 1}`,
      firstName: firstName || "Participant",
      lastName: rest.join(" ") || `${index + 1}`,
      avatarUrl: attendee.image,
    };
  });
};

const buildCalendarPayload = (event: Event, listingId: string) => {
  const eventType = mapListingTypeToCalendarType(event);

  return {
    sourceEventId: event.id,
    listingId,
    title: event.title,
    start_time: parseListingDateTime(event.date, event.time),
    eventType,
    participants: toParticipants(event),
    externalUrl: event.externalUrl || DEFAULT_EVENT_URLS[eventType],
    eventImageUrl: event.image,
    attendeeCount: event.attendeeCount,
    attendeeCountLabel: String(event.attendeeCount),
  };
};

const toListingId = (pathname: string, queryString: string): string => {
  if (!queryString) return pathname;
  return `${pathname}?${queryString}`;
};

const getMatchedCalendarEventId = (
  calendarEvents: CalendarEvent[],
  listingEvent: Event,
  listingId: string
): string | null => {
  const bySource = calendarEvents.find(
    (calendarEvent) =>
      calendarEvent.listingId === listingId &&
      calendarEvent.sourceEventId === listingEvent.id
  );

  if (bySource?.id) {
    return bySource.id;
  }

  const listingDate = parseListingDateTime(listingEvent.date, listingEvent.time);

  const byDateAndTitle = calendarEvents.find(
    (calendarEvent) =>
      calendarEvent.listingId === listingId &&
      calendarEvent.title === listingEvent.title &&
      calendarEvent.year === listingDate.getFullYear() &&
      calendarEvent.month === listingDate.getMonth() &&
      calendarEvent.date === listingDate.getDate() &&
      calendarEvent.time === listingEvent.time
  );

  return byDateAndTitle?.id || null;
};

const EventsCards = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const listingId = useMemo(
    () => toListingId(pathname, queryString),
    [pathname, queryString]
  );

  const { events, createListingEvent, deleteEvent } = useCalendarEvents();
  const [pendingSourceEventId, setPendingSourceEventId] = useState<string | null>(
    null
  );

  const calendarEventIdBySource = useMemo(() => {
    const ids = new Map<string, string>();
    listingEvents.forEach((event) => {
      const calendarEventId = getMatchedCalendarEventId(events, event, listingId);
      if (calendarEventId) {
        ids.set(event.id, calendarEventId);
      }
    });
    return ids;
  }, [events, listingId]);

  const handleAddToCalendar = async (event: Event) => {
    try {
      setPendingSourceEventId(event.id);
      const payload = buildCalendarPayload(event, listingId);
      await createListingEvent(payload);
    } catch (error) {
      console.error("Failed to add listing event to calendar:", error);
    } finally {
      setPendingSourceEventId(null);
    }
  };

  const handleRemoveFromCalendar = async (
    event: Event,
    calendarEventId: string
  ) => {
    try {
      setPendingSourceEventId(event.id);
      await deleteEvent(calendarEventId);
    } catch (error) {
      console.error("Failed to remove listing event from calendar:", error);
    } finally {
      setPendingSourceEventId(null);
    }
  };

  return (
    <CardWrapper id={id}>
      <div className="flex justify-between items-center mb-8 md:px-0">
        <div className="text-lg md:text-xl font-semibold text-[#333] tracking-tight">
          UPCOMING EVENTS
        </div>
        <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-[rgba(19,196,204,0.08)] rounded-lg">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-5 h-5 md:w-6 md:h-6"
          >
            <path
              fill="#13c4cc"
              d="M5 6.75C4.66848 6.75 4.35054 6.8817 4.11612 7.11612C3.8817 7.35054 3.75 7.66848 3.75 8V16C3.75 16.3315 3.8817 16.6495 4.11612 16.8839C4.35054 17.1183 4.66848 17.25 5 17.25H13C13.3315 17.25 13.6495 17.1183 13.8839 16.8839C14.1183 16.6495 14.25 16.3315 14.25 16V8C14.25 7.66848 14.1183 7.35054 13.8839 7.11612C13.6495 6.8817 13.3315 6.75 13 6.75H5ZM15.75 8.78622V8C15.75 7.27065 15.4603 6.57118 14.9445 6.05546C14.4288 5.53973 13.7293 5.25 13 5.25H5C4.27065 5.25 3.57118 5.53973 3.05546 6.05546C2.53973 6.57118 2.25 7.27065 2.25 8V16C2.25 16.7293 2.53973 17.4288 3.05546 17.9445C3.57118 18.4603 4.27065 18.75 5 18.75H13C13.7293 18.75 14.4288 18.4603 14.9445 17.9445C15.4603 17.4288 15.75 16.7293 15.75 16V15.213L19.2176 16.9465C19.4844 17.0798 19.7809 17.1427 20.0787 17.1293C20.3766 17.1159 20.6661 17.0266 20.9198 16.8699C21.1735 16.7131 21.3829 16.4942 21.5282 16.2338C21.6735 15.9734 21.7498 15.6802 21.75 15.382V8.61763C21.7498 8.31945 21.6735 8.02585 21.5282 7.76546C21.3829 7.50506 21.1735 7.28612 20.9198 7.12939C20.6661 6.97266 20.3766 6.88335 20.0787 6.86994C19.7809 6.85652 19.4845 6.91944 19.2177 7.05273L15.75 8.78622ZM15.75 10.4632V13.5361L19.8883 15.6047C19.8882 15.6047 19.8883 15.6047 19.8883 15.6047C19.9263 15.6237 19.9687 15.6328 20.0112 15.6308C20.0538 15.6289 20.0952 15.6162 20.1314 15.5938C20.1676 15.5714 20.1976 15.5401 20.2183 15.5029C20.2391 15.4657 20.25 15.4238 20.25 15.3812V8.61803C20.25 8.57543 20.2391 8.53354 20.2183 8.49635C20.1976 8.45915 20.1676 8.42787 20.1314 8.40548C20.0952 8.38309 20.0538 8.37033 20.0112 8.36842C19.9687 8.3665 19.9264 8.37547 19.8884 8.39448C19.8883 8.3945 19.8884 8.39446 19.8884 8.39448L15.75 10.4632Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 md:px-0">
        {listingEvents.map((event) => {
          const calendarEventId = calendarEventIdBySource.get(event.id) || null;
          const isInCalendar = Boolean(calendarEventId);

          return (
            <EventCard
              key={event.id}
              event={event}
              isInCalendar={isInCalendar}
              isMutating={pendingSourceEventId === event.id}
              onAddToCalendar={() => handleAddToCalendar(event)}
              onRemoveFromCalendar={() => {
                if (!calendarEventId) return Promise.resolve();
                return handleRemoveFromCalendar(event, calendarEventId);
              }}
            />
          );
        })}
      </div>
    </CardWrapper>
  );
};

export default EventsCards;
