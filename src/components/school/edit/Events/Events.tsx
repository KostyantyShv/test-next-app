"use client";
import { useState, useEffect, useRef } from "react";
import EventList from "./EventList";
import EventModal from "./EventModal";

interface Event {
  id: number;
  title: string;
  type: "zoom" | "teams" | "session";
  description: string;
  image: string;
  status: "live" | "scheduled" | "passed";
  pinned: boolean;
  order: number;
  startDate: string;
  endDate: string;
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: "Introduction to Web Development",
    type: "zoom",
    description:
      "Join us for an interactive session on the fundamentals of web development. Perfect for beginners!",
    image: "https://i.ibb.co/640kJN2/c1.jpg",
    status: "live",
    pinned: true,
    order: 0,
    startDate: "2024-02-09T14:00",
    endDate: "2024-02-09T15:30",
  },
  {
    id: 2,
    title: "Team Project Planning",
    type: "teams",
    description:
      "Monthly team sync to discuss project progress and upcoming milestones.",
    image: "https://i.ibb.co/NKffPZQ/c4.jpg",
    status: "scheduled",
    pinned: false,
    order: 1,
    startDate: "2024-02-15T10:00",
    endDate: "2024-02-15T11:00",
  },
];

const MAX_EVENTS = 5;

export default function Events() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);

  const updateEventStatus = () => {
    let needsUpdate = false;
    const updatedEvents = events.map((event) => {
      const newStatus = getEventStatus(event.startDate, event.endDate);
      if (newStatus !== event.status) {
        needsUpdate = true;
        return { ...event, status: newStatus };
      }
      return event;
    });
    if (needsUpdate) {
      setEvents(updatedEvents);
    }
  };

  useEffect(() => {
    const interval = setInterval(updateEventStatus, 60000);
    return () => clearInterval(interval);
  }, [events]);

  const getEventStatus = (
    startDate: string,
    endDate: string
  ): "live" | "scheduled" | "passed" => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now < start) return "scheduled";
    if (now > end) return "passed";
    return "live";
  };

  const openModal = (editId?: number) => {
    setCurrentEditId(editId || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEditId(null);
  };

  return (
    <div className="text-[#4A4A4A] font-inter">
      <div className="w-full mx-auto flex gap-[25px] max-md:flex-col max-md:px-4">
        {/* Desktop Header */}
        <div className="max-w-[350px] max-md:hidden pr-6">
          <h1 className="text-[#1B1B1B] text-[28px] font-semibold mb-3 tracking-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
            Events
          </h1>
          <p className="text-[#5F5F5F] text-base leading-6 w-[350px]">
            Schedule and manage your upcoming events. Keep your community
            informed about virtual sessions, meetings, and live sessions.
          </p>
        </div>
        
        {/* Mobile Header */}
        <div className="hidden max-md:block pt-[18px] pb-4">
          <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', color: 'var(--bold-text)' }}>
            Events
          </h1>
          <p className="text-sm leading-6" style={{ color: 'var(--subtle-text)' }}>
            Schedule and manage your upcoming events. Keep your community
            informed about virtual sessions, meetings, and live sessions.
          </p>
        </div>
        
        <div className="w-auto max-md:w-full bg-white max-md:bg-white rounded-xl p-6 max-md:p-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] max-md:shadow-none relative">
          {/* Desktop Count Badge */}
          <div className="absolute top-6 right-6 max-md:hidden text-sm font-semibold text-[#4A4A4A] bg-[#F8F9FA] rounded-full px-3 py-1">
            {events.length}/{MAX_EVENTS}
          </div>
          
          {/* Mobile Count */}
          <div className="hidden max-md:block text-right text-sm font-semibold mb-4" style={{ color: 'var(--text-default)' }}>
            {events.length}/{MAX_EVENTS}
          </div>
          <EventList
            events={events}
            setEvents={setEvents}
            openModal={openModal}
          />
          <button
            onClick={() => openModal()}
            className="bg-[#02C5AF] max-md:w-full text-white px-6 py-3 max-md:py-3 max-md:px-0 rounded-lg text-sm max-md:text-base font-semibold hover:opacity-90 max-md:active:opacity-90 transition-opacity max-md:shadow-[0_2px_4px_rgba(2,197,175,0.2)]"
          >
            Add Event
          </button>
        </div>
      </div>
      <EventModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        events={events}
        setEvents={setEvents}
        currentEditId={currentEditId}
        maxEvents={MAX_EVENTS}
      />
    </div>
  );
}
