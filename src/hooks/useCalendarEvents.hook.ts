import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase_utils/client";
import { Event } from "@/components/universal-pages/calendar/types/event";

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

interface UpdateEventData extends CreateEventData {}

// Convert database event to UI Event format
const convertToUIEvent = (dbEvent: CalendarEvent): Event => {
  const startDate = new Date(dbEvent.start_time);
  const endDate = dbEvent.end_time ? new Date(dbEvent.end_time) : null;

  // Format time as "9:00 AM"
  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  // Determine event type based on color or default
  const getEventType = (color: string | null): string => {
    if (!color) return "zoom-meeting";
    // Map colors to event types
    const colorMap: Record<string, string> = {
      "#15B7C3": "zoom-meeting",
      "#608CFD": "teams-meeting",
      "#E47EF4": "one-on-one",
      "#F89E6C": "webex-meeting",
      "#EE4206": "group-session",
    };
    return colorMap[color] || "zoom-meeting";
  };

  // Calculate attendees (mock for now, can be enhanced later)
  const attendees = Math.floor(Math.random() * 20) + 2;

  return {
    id: dbEvent.id,
    type: getEventType(dbEvent.color),
    title: dbEvent.title,
    time: formatTime(startDate),
    attendees,
    avatar1: "https://i.ibb.co/S3QRdcX/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
    avatar2: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
    date: startDate.getDate(),
    month: startDate.getMonth(),
    year: startDate.getFullYear(),
  };
};

export const useCalendarEvents = (): UseCalendarEventsReturn => {
  const supabase = createClient();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setEvents([]);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("calendar_events")
        .select("*")
        .eq("user_id", user.id)
        .order("start_time", { ascending: true });

      if (fetchError) throw fetchError;

      const uiEvents = (data || []).map(convertToUIEvent);
      setEvents(uiEvents);
    } catch (err: any) {
      console.error("Error loading calendar events:", err);
      setError(err.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: CreateEventData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
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

      // Reload events
      await loadEvents();
    } catch (err: any) {
      console.error("Error creating event:", err);
      throw err;
    }
  };

  const updateEvent = async (eventId: string, eventData: UpdateEventData) => {
    try {
      const { error: updateError } = await supabase
        .from("calendar_events")
        .update({
          title: eventData.title,
          description: eventData.description || null,
          start_time: eventData.start_time.toISOString(),
          end_time: eventData.end_time?.toISOString() || null,
          all_day: eventData.all_day || false,
          color: eventData.color || null,
        })
        .eq("id", eventId);

      if (updateError) throw updateError;

      // Reload events
      await loadEvents();
    } catch (err: any) {
      console.error("Error updating event:", err);
      throw err;
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from("calendar_events")
        .delete()
        .eq("id", eventId);

      if (deleteError) throw deleteError;

      // Reload events
      await loadEvents();
    } catch (err: any) {
      console.error("Error deleting event:", err);
      throw err;
    }
  };

  useEffect(() => {
    loadEvents();

    // Subscribe to real-time updates
    const channel = supabase
      .channel("calendar_events_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "calendar_events",
        },
        () => {
          loadEvents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    refreshEvents: loadEvents,
  };
};

