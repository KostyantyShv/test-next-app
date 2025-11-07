"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal/Modal";
import { useCalendarEvents } from "@/hooks/useCalendarEvents.hook";
import { createClient } from "@/lib/supabase_utils/client";

interface CalendarEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  eventId?: string; // If provided, we're editing an existing event
}

const CalendarEventModal: React.FC<CalendarEventModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  eventId,
}) => {
  const supabase = createClient();
  const { events, createEvent, updateEvent, deleteEvent } = useCalendarEvents();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [color, setColor] = useState("#15B7C3");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Color options matching event types
  const colorOptions = [
    { value: "#15B7C3", label: "Zoom Meeting", name: "zoom-meeting" },
    { value: "#608CFD", label: "Teams Meeting", name: "teams-meeting" },
    { value: "#E47EF4", label: "One-on-One", name: "one-on-one" },
    { value: "#F89E6C", label: "Webex Meeting", name: "webex-meeting" },
    { value: "#EE4206", label: "Group Session", name: "group-session" },
  ];

  // Initialize form with selected date or existing event data
  useEffect(() => {
    if (isOpen) {
      if (eventId) {
        // Editing existing event - load from database
        const loadEventData = async () => {
          try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: dbEvent, error } = await supabase
              .from("calendar_events")
              .select("*")
              .eq("id", eventId)
              .eq("user_id", user.id)
              .single();

            if (error) throw error;
            if (!dbEvent) return;

            const startDate = new Date(dbEvent.start_time);
            const endDate = dbEvent.end_time ? new Date(dbEvent.end_time) : null;

            setTitle(dbEvent.title || "");
            setDescription(dbEvent.description || "");
            setStartDate(startDate.toISOString().split("T")[0]);
            setStartTime(startDate.toTimeString().slice(0, 5));
            if (endDate) {
              setEndDate(endDate.toISOString().split("T")[0]);
              setEndTime(endDate.toTimeString().slice(0, 5));
            } else {
              setEndDate("");
              setEndTime("");
            }
            setAllDay(dbEvent.all_day || false);
            setColor(dbEvent.color || "#15B7C3");
          } catch (err: any) {
            console.error("Error loading event:", err);
            setError(err.message || "Failed to load event");
          }
        };

        loadEventData();
      } else if (selectedDate) {
        // Creating new event
        const dateStr = selectedDate.toISOString().split("T")[0];
        setTitle("");
        setDescription("");
        setStartDate(dateStr);
        setStartTime("09:00");
        setEndDate(dateStr);
        setEndTime("10:00");
        setAllDay(false);
        setColor("#15B7C3");
      }
      setError(null);
    }
  }, [isOpen, eventId, selectedDate, events]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!title.trim()) {
        throw new Error("Title is required");
      }

      const startDateTime = new Date(`${startDate}T${startTime}`);
      const endDateTime = endDate && endTime ? new Date(`${endDate}T${endTime}`) : undefined;

      if (endDateTime && endDateTime <= startDateTime) {
        throw new Error("End time must be after start time");
      }

      if (eventId) {
        // Update existing event
        await updateEvent(eventId, {
          title: title.trim(),
          description: description.trim() || undefined,
          start_time: startDateTime,
          end_time: endDateTime,
          all_day: allDay,
          color: color,
        });
      } else {
        // Create new event
        await createEvent({
          title: title.trim(),
          description: description.trim() || undefined,
          start_time: startDateTime,
          end_time: endDateTime,
          all_day: allDay,
          color: color,
        });
      }

      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!eventId) return;
    if (!confirm("Are you sure you want to delete this event?")) return;

    setLoading(true);
    setError(null);

    try {
      await deleteEvent(eventId);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {eventId ? "Edit Event" : "Create Event"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={allDay}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={allDay}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">All Day</span>
            </label>
          </div>

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
              Event Type / Color
            </label>
            <select
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {colorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            {eventId && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md disabled:opacity-50"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : eventId ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CalendarEventModal;

