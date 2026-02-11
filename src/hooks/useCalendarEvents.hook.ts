import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase_utils/client";
import {
  Event,
  EventParticipant,
} from "@/components/universal-pages/calendar/types/event";

type CalendarEventType =
  | "zoom-meeting"
  | "zoom-webinar"
  | "teams-meeting"
  | "one-on-one"
  | "webex-meeting"
  | "group-session";

const DEFAULT_AVATAR_1 =
  "https://i.ibb.co/S3QRdcX/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg";
const DEFAULT_AVATAR_2 =
  "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png";
const LOCAL_CALENDAR_EVENTS_KEY = "calendar_events_local";

const EVENT_TYPE_TO_COLOR: Record<CalendarEventType, string> = {
  "zoom-meeting": "#15B7C3",
  "zoom-webinar": "#22C376",
  "teams-meeting": "#608CFD",
  "one-on-one": "#E47EF4",
  "webex-meeting": "#F89E6C",
  "group-session": "#EE4206",
};

const COLOR_TO_EVENT_TYPE: Record<string, CalendarEventType> = {
  "#15B7C3": "zoom-meeting",
  "#22C376": "zoom-webinar",
  "#608CFD": "teams-meeting",
  "#E47EF4": "one-on-one",
  "#F89E6C": "webex-meeting",
  "#EE4206": "group-session",
};

interface ListingEventMetadata {
  kind: "listing-event";
  sourceEventId: string;
  listingId: string;
  eventType: CalendarEventType;
  participants: EventParticipant[];
  externalUrl?: string;
  eventImageUrl?: string;
  attendeeCount?: number;
  attendeeCountLabel?: string;
}

interface CalendarEvent {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string | null;
  all_day: boolean | null;
  color: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface UseCalendarEventsReturn {
  events: Event[];
  loading: boolean;
  error: string | null;
  createEvent: (eventData: CreateEventData) => Promise<void>;
  createListingEvent: (eventData: CreateListingEventData) => Promise<string | null>;
  updateEvent: (eventId: string, eventData: UpdateEventData) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  refreshEvents: () => Promise<void>;
}

interface CreateEventData {
  title: string;
  description?: string;
  start_time: Date;
  end_time?: Date;
  all_day?: boolean;
  color?: string;
}

type UpdateEventData = CreateEventData;

interface CreateListingEventData {
  sourceEventId: string;
  listingId: string;
  title: string;
  start_time: Date;
  eventType: CalendarEventType;
  participants: EventParticipant[];
  externalUrl?: string;
  eventImageUrl?: string;
  attendeeCount?: number;
  attendeeCountLabel?: string;
}

const isCalendarEventType = (value: string): value is CalendarEventType => {
  return (
    value === "zoom-meeting" ||
    value === "zoom-webinar" ||
    value === "teams-meeting" ||
    value === "one-on-one" ||
    value === "webex-meeting" ||
    value === "group-session"
  );
};

const getEventTypeFromColor = (color: string | null): CalendarEventType => {
  if (!color) return "zoom-meeting";
  return COLOR_TO_EVENT_TYPE[color] || "zoom-meeting";
};

const getColorFromEventType = (eventType: CalendarEventType): string => {
  return EVENT_TYPE_TO_COLOR[eventType] || EVENT_TYPE_TO_COLOR["zoom-meeting"];
};

const parseListingMetadata = (
  description: string | null
): ListingEventMetadata | null => {
  if (!description) return null;

  try {
    const parsed = JSON.parse(description) as Partial<ListingEventMetadata>;
    if (
      parsed.kind !== "listing-event" ||
      typeof parsed.sourceEventId !== "string" ||
      typeof parsed.listingId !== "string" ||
      typeof parsed.eventType !== "string" ||
      !isCalendarEventType(parsed.eventType)
    ) {
      return null;
    }

    const participants: EventParticipant[] = Array.isArray(parsed.participants)
      ? parsed.participants
          .filter(
            (participant): participant is EventParticipant =>
              Boolean(participant) &&
              typeof participant.id === "string" &&
              typeof participant.firstName === "string" &&
              typeof participant.lastName === "string" &&
              typeof participant.avatarUrl === "string"
          )
          .slice(0, 10)
      : [];

    return {
      kind: "listing-event",
      sourceEventId: parsed.sourceEventId,
      listingId: parsed.listingId,
      eventType: parsed.eventType,
      participants,
      externalUrl:
        typeof parsed.externalUrl === "string" ? parsed.externalUrl : undefined,
      eventImageUrl:
        typeof parsed.eventImageUrl === "string"
          ? parsed.eventImageUrl
          : undefined,
      attendeeCount:
        typeof parsed.attendeeCount === "number" ? parsed.attendeeCount : undefined,
      attendeeCountLabel:
        typeof parsed.attendeeCountLabel === "string"
          ? parsed.attendeeCountLabel
          : undefined,
    };
  } catch {
    return null;
  }
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }

  return fallback;
};

const createLocalId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const readLocalEvents = (): CalendarEvent[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(LOCAL_CALENDAR_EVENTS_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (item): item is CalendarEvent =>
          Boolean(item) &&
          typeof item.id === "string" &&
          typeof item.user_id === "string" &&
          typeof item.title === "string" &&
          typeof item.start_time === "string"
      )
      .map((item) => ({
        id: item.id,
        user_id: item.user_id,
        title: item.title,
        description: item.description ?? null,
        start_time: item.start_time,
        end_time: item.end_time ?? null,
        all_day: item.all_day ?? false,
        color: item.color ?? null,
        created_at: item.created_at ?? null,
        updated_at: item.updated_at ?? null,
      }));
  } catch {
    return [];
  }
};

const writeLocalEvents = (events: CalendarEvent[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_CALENDAR_EVENTS_KEY, JSON.stringify(events));
};

// Convert database event to UI Event format
const convertToUIEvent = (dbEvent: CalendarEvent): Event => {
  const parsedStartDate = new Date(dbEvent.start_time);
  const startDate = Number.isNaN(parsedStartDate.getTime())
    ? new Date()
    : parsedStartDate;
  const listingMetadata = parseListingMetadata(dbEvent.description);

  // Format time as "9:00 AM"
  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  const eventType = listingMetadata?.eventType || getEventTypeFromColor(dbEvent.color);
  const participants = listingMetadata?.participants;
  const attendees =
    listingMetadata?.attendeeCount ??
    participants?.length ??
    2;

  return {
    id: dbEvent.id,
    type: eventType,
    title: dbEvent.title,
    time: formatTime(startDate),
    attendees,
    attendeeCount: listingMetadata?.attendeeCountLabel,
    avatar1: participants?.[0]?.avatarUrl || DEFAULT_AVATAR_1,
    avatar2: participants?.[1]?.avatarUrl || DEFAULT_AVATAR_2,
    date: startDate.getDate(),
    month: startDate.getMonth(),
    year: startDate.getFullYear(),
    externalUrl: listingMetadata?.externalUrl,
    listingId: listingMetadata?.listingId,
    eventImageUrl: listingMetadata?.eventImageUrl,
    participants,
    sourceEventId: listingMetadata?.sourceEventId,
  };
};

export const useCalendarEvents = (): UseCalendarEventsReturn => {
  const supabase = useMemo(() => createClient(), []);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      
      let uiEvents: Event[] = [];
      
      if (user) {
        const { data, error: fetchError } = await supabase
          .from("calendar_events")
          .select("*")
          .eq("user_id", user.id)
          .order("start_time", { ascending: true });

        if (fetchError) throw fetchError;
        uiEvents = (data || []).map(convertToUIEvent);
      } else {
        uiEvents = readLocalEvents()
          .sort((a, b) => a.start_time.localeCompare(b.start_time))
          .map(convertToUIEvent);
      }

      // Only show per-user calendar events loaded from the database.
      // Events are created via other flows (e.g. Upcoming Events on listings),
      // not directly from the Calendar UI.
      setEvents(uiEvents);
    } catch (err: unknown) {
      console.error("Error loading calendar events:", err);
      setError(getErrorMessage(err, "Failed to load events"));
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const createEvent = async (eventData: CreateEventData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        const nowIso = new Date().toISOString();
        const localEvent: CalendarEvent = {
          id: createLocalId(),
          user_id: "local-user",
          title: eventData.title,
          description: eventData.description || null,
          start_time: eventData.start_time.toISOString(),
          end_time: eventData.end_time?.toISOString() || null,
          all_day: eventData.all_day || false,
          color: eventData.color || null,
          created_at: nowIso,
          updated_at: nowIso,
        };

        const localEvents = readLocalEvents();
        writeLocalEvents([...localEvents, localEvent]);
        await loadEvents();
        return;
      }

      const { error: insertError } = await supabase
        .from("calendar_events")
        .insert({
          user_id: user.id,
          title: eventData.title,
          description: eventData.description || null,
          start_time: eventData.start_time.toISOString(),
          end_time: eventData.end_time?.toISOString() || null,
          all_day: eventData.all_day || false,
          color: eventData.color || null,
        });

      if (insertError) throw insertError;

      // Reload events immediately to show the new event
      // This ensures the event appears right away
      await loadEvents();
    } catch (err: unknown) {
      console.error("Error creating event:", err);
      throw err;
    }
  };

  const createListingEvent = async (
    eventData: CreateListingEventData
  ): Promise<string | null> => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const existingEvent = events.find(
        (event) =>
          event.listingId === eventData.listingId &&
          event.sourceEventId === eventData.sourceEventId
      );

      if (existingEvent?.id) {
        return existingEvent.id;
      }

      const attendeeCount =
        eventData.attendeeCount ?? eventData.participants.length;
      const attendeeCountLabel =
        eventData.attendeeCountLabel ?? String(attendeeCount);

      const metadata: ListingEventMetadata = {
        kind: "listing-event",
        sourceEventId: eventData.sourceEventId,
        listingId: eventData.listingId,
        eventType: eventData.eventType,
        participants: eventData.participants,
        externalUrl: eventData.externalUrl,
        eventImageUrl: eventData.eventImageUrl,
        attendeeCount,
        attendeeCountLabel,
      };

      if (!user) {
        const nowIso = new Date().toISOString();
        const localEvent: CalendarEvent = {
          id: createLocalId(),
          user_id: "local-user",
          title: eventData.title,
          description: JSON.stringify(metadata),
          start_time: eventData.start_time.toISOString(),
          end_time: null,
          all_day: false,
          color: getColorFromEventType(eventData.eventType),
          created_at: nowIso,
          updated_at: nowIso,
        };

        const localEvents = readLocalEvents();
        writeLocalEvents([...localEvents, localEvent]);
        await loadEvents();
        return localEvent.id;
      }

      const { data: insertedData, error: insertError } = await supabase
        .from("calendar_events")
        .insert({
          user_id: user.id,
          title: eventData.title,
          description: JSON.stringify(metadata),
          start_time: eventData.start_time.toISOString(),
          end_time: null,
          all_day: false,
          color: getColorFromEventType(eventData.eventType),
        })
        .select()
        .single();

      if (insertError) throw insertError;

      await loadEvents();

      return insertedData?.id ?? null;
    } catch (err: unknown) {
      console.error("Error creating listing calendar event:", err);
      throw err;
    }
  };

  const updateEvent = async (eventId: string, eventData: UpdateEventData) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        const localEvents = readLocalEvents();
        const nextEvents = localEvents.map((event) => {
          if (event.id !== eventId) return event;

          return {
            ...event,
            title: eventData.title,
            description: eventData.description || null,
            start_time: eventData.start_time.toISOString(),
            end_time: eventData.end_time?.toISOString() || null,
            all_day: eventData.all_day || false,
            color: eventData.color || null,
            updated_at: new Date().toISOString(),
          };
        });

        writeLocalEvents(nextEvents);
        await loadEvents();
        return;
      }

      const { data: updatedData, error: updateError } = await supabase
        .from("calendar_events")
        .update({
          title: eventData.title,
          description: eventData.description || null,
          start_time: eventData.start_time.toISOString(),
          end_time: eventData.end_time?.toISOString() || null,
          all_day: eventData.all_day || false,
          color: eventData.color || null,
        })
        .eq("id", eventId)
        .select()
        .single();

      if (updateError) throw updateError;

      // Optimistically update the event in the list immediately
      if (updatedData) {
        const updatedEvent = convertToUIEvent(updatedData);
        setEvents((prevEvents) =>
          prevEvents.map((event) => (event.id === eventId ? updatedEvent : event))
        );
      }

      // Reload events after a short delay to ensure sync with database
      setTimeout(() => {
        loadEvents();
      }, 100);
    } catch (err: unknown) {
      console.error("Error updating event:", err);
      throw err;
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        const localEvents = readLocalEvents();
        writeLocalEvents(localEvents.filter((event) => event.id !== eventId));
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        return;
      }

      const { error: deleteError } = await supabase
        .from("calendar_events")
        .delete()
        .eq("id", eventId);

      if (deleteError) throw deleteError;

      // Optimistically remove the event from the list immediately
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));

      // Reload events after a short delay to ensure sync with database
      setTimeout(() => {
        loadEvents();
      }, 100);
    } catch (err: unknown) {
      console.error("Error deleting event:", err);
      throw err;
    }
  };

  useEffect(() => {
    loadEvents();

    // Subscribe to real-time updates
    let channel: ReturnType<typeof supabase.channel> | null = null;
    
    const setupRealtime = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      channel = supabase
        .channel("calendar_events_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "calendar_events",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            loadEvents();
          }
        )
        .subscribe();
    };

    setupRealtime();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [loadEvents, supabase]);

  return {
    events,
    loading,
    error,
    createEvent,
    createListingEvent,
    updateEvent,
    deleteEvent,
    refreshEvents: loadEvents,
  };
};
