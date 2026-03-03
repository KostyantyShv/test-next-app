"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import EventList from "./EventList";
import EventModal from "./EventModal";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Event } from "./types/event";

const initialEvents: Event[] = [
  {
    id: 1,
    title: "Introduction to Web Development",
    type: "zoom",
    description:
      "Join us for an interactive session on the fundamentals of web development. Perfect for beginners!",
    image: "https://i.ibb.co/60MjrnYw/product1.webp",
    status: "live",
    pinned: true,
    order: 0,
    startDate: "2025-04-09T14:00",
    endDate: "2025-04-09T15:30",
  },
  {
    id: 2,
    title: "Team Project Planning",
    type: "teams",
    description:
      "Monthly team sync to discuss project progress and upcoming milestones.",
    image: "https://i.ibb.co/XkdtT1Yj/product2.png",
    status: "scheduled",
    pinned: false,
    order: 1,
    startDate: "2025-04-15T10:00",
    endDate: "2025-04-15T11:00",
  },
];

const MAX_EVENTS = 5;

function getEventStatus(startDate: string, endDate: string): Event["status"] {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (now < start) return "scheduled";
  if (now > end) return "passed";
  return "live";
}

function formatEventDate(dateStr: string) {
  const date = new Date(dateStr);
  const datePart = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${datePart} • ${timePart}`;
}

function getTypeDisplay(type: Event["type"] | null) {
  const zoomIcon = (
    <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 38 38">
      <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.2" stroke="currentColor" d="M22.8865 17.1133L27.3332 14.42V23.5867L22.8865 20.8867M10.6665 14.42H20.8532C21.3925 14.42 21.9096 14.6342 22.291 15.0155C22.6723 15.3969 22.8865 15.9141 22.8865 16.4533V23.5867H12.6998C12.4323 23.5867 12.1673 23.5339 11.9202 23.4313C11.6731 23.3287 11.4486 23.1783 11.2597 22.9888C11.0708 22.7992 10.9212 22.5743 10.8194 22.3268C10.7176 22.0794 10.6656 21.8142 10.6665 21.5467V14.42Z"></path>
    </svg>
  );

  const teamsIcon = (
    <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 55 55">
      <path fill="currentColor" d="M28.0017 15.7696C28.9609 15.1655 30.0969 14.9053 31.2235 15.0316C32.35 15.158 33.4001 15.6634 34.2017 16.465C34.2065 16.4697 34.2112 16.4745 34.216 16.4793C34.7116 16.347 35.2288 16.3033 35.7436 16.3522C36.5245 16.4265 37.2706 16.7113 37.9023 17.1764C38.534 17.6414 39.0277 18.2692 39.3306 18.9927C39.6335 19.7163 39.7343 20.5085 39.6223 21.2849C39.5339 21.8974 39.3157 22.4818 38.9845 23H41.3333C41.8856 23 42.3333 23.4477 42.3333 24V30.6667C42.3333 32.3464 41.6661 33.9573 40.4783 35.145C39.3063 36.317 37.7222 36.9823 36.0665 36.9997C35.7186 37.6388 35.2783 38.2306 34.7545 38.7545C33.3167 40.1923 31.3667 41 29.3333 41C25.9158 41 23.0295 38.7476 22.0364 35.6667H16C15.4477 35.6667 15 35.219 15 34.6667V21.3333C15 20.7811 15.4477 20.3333 16 20.3333H25.6773C25.6329 19.6676 25.7218 18.9951 25.9442 18.3563C26.317 17.2858 27.0425 16.3737 28.0017 15.7696Z"></path>
    </svg>
  );

  const sessionIcon = (
    <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 38 38">
      <path strokeWidth="0.25" stroke="currentColor" fill="currentColor" d="M12.3205 25.7152H21.1938C21.8457 26.6366 22.9139 27.2235 24.1101 27.2235C26.0733 27.2235 27.674 25.6231 27.6746 23.6601C27.693 22.4994 27.1241 21.4509 26.2582 20.8003V12.2557V12.1307H26.1332H23.5913V11.943C23.5913 11.6717 23.3698 11.4502 23.0985 11.4502C22.8271 11.4502 22.6056 11.6717 22.6056 11.943V12.1307H19.1219V11.943C19.1219 11.6717 18.9005 11.4502 18.6291 11.4502C18.3578 11.4502 18.1363 11.6717 18.1363 11.943V12.1307H14.6342V11.943C14.6342 11.6717 14.4127 11.4502 14.1414 11.4502C13.87 11.4502 13.6486 11.6717 13.6486 11.943V12.1307H11.125H11V12.2557V24.3948C11 25.1259 11.5893 25.7152 12.3205 25.7152Z"></path>
    </svg>
  );

  if (type === "zoom") return { color: "#15B7C3", text: "Zoom", icon: zoomIcon };
  if (type === "teams") return { color: "#608CFD", text: "Teams", icon: teamsIcon };
  if (type === "session") return { color: "#E47EF4", text: "1:1 Session", icon: sessionIcon };
  return { color: "#4A4A4A", text: "Select event type", icon: null };
}

export default function Events() {
  const isMobile = useIsMobile();

  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sortedEvents = useMemo(
    () =>
      [...events].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return a.order - b.order;
      }),
    [events]
  );

  useEffect(() => {
    const refreshStatuses = () => {
      setEvents((prev) => {
        let changed = false;
        const next = prev.map((event) => {
          const status = getEventStatus(event.startDate, event.endDate);
          if (status !== event.status) {
            changed = true;
            return { ...event, status };
          }
          return event;
        });
        return changed ? next : prev;
      });
    };

    refreshStatuses();
    const interval = setInterval(refreshStatuses, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const showFeedbackToast = (message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(message);
    setShowToast(true);
    toastTimerRef.current = setTimeout(() => setShowToast(false), 3000);
  };

  const openModal = (editId?: number) => {
    setCurrentEditId(editId ?? null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEditId(null);
  };

  const togglePin = (id: number) => {
    setEvents((prev) =>
      prev.map((event) => ({
        ...event,
        pinned: event.id === id ? !event.pinned : false,
      }))
    );

    if (isMobile) {
      const selected = events.find((event) => event.id === id);
      const willBePinned = !selected?.pinned;
      showFeedbackToast(willBePinned ? "Event pinned to top" : "Event unpinned");
    }
  };

  return (
    <div className="text-[#4A4A4A] font-inter">
      <div className="w-full mx-auto flex gap-[25px] max-md:flex-col max-md:px-3">
        <div className="max-w-[350px] max-md:hidden pr-6">
          <h1 className="text-[#1B1B1B] text-[28px] font-semibold mb-3 tracking-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
            Events
          </h1>
          <p className="text-[#5F5F5F] text-base leading-6 w-[350px]">
            Schedule and manage your upcoming events. Keep your community informed about virtual sessions, meetings, and live sessions.
          </p>
        </div>

        <div className="hidden max-md:block pt-[18px] pb-4">
          <h1 className="text-2xl font-bold mb-2 tracking-[-0.02em] text-[#1B1B1B]">Events</h1>
          <p className="text-sm leading-[1.5] text-[#5F5F5F]">
            Schedule and manage your upcoming events. Keep your community informed about virtual sessions, meetings, and live sessions.
          </p>
        </div>

        <div className="w-auto max-md:w-full bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1)] relative max-md:hidden">
          <div className="absolute top-6 right-6 text-sm font-semibold text-[#4A4A4A] bg-[#F8F9FA] rounded-full px-3 py-1">
            {events.length}/{MAX_EVENTS}
          </div>

          <EventList events={events} setEvents={setEvents} openModal={openModal as (id: number) => void} />
          <button onClick={() => openModal()} className="bg-[#02C5AF] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            Add Event
          </button>
        </div>

        <div className="hidden max-md:block w-full">
          <div className="rounded-[12px] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] relative">
            <div className="absolute right-4 top-4 rounded-2xl bg-[#F8F9FA] px-[10px] py-[3px] text-xs font-semibold text-[#4A4A4A]">
              {events.length}/{MAX_EVENTS}
            </div>

            <div className="mt-6 pt-[5px] pb-[10px] flex flex-col gap-4">
              {sortedEvents.map((event) => {
                const type = getTypeDisplay(event.type);
                const statusClass =
                  event.status === "live"
                    ? "bg-[#00D084]/10 text-[#00D084]"
                    : event.status === "scheduled"
                    ? "bg-[#db7303]/10 text-[#db7303]"
                    : "bg-[#991b1b]/10 text-[#991b1b]";
                const statusText =
                  event.status.charAt(0).toUpperCase() + event.status.slice(1);

                return (
                  <div key={event.id} className="overflow-hidden rounded-[12px] border border-[#E5E5E5]">
                    {event.pinned && (
                      <div className="flex items-center gap-1.5 border-b border-[#E0E0E0] bg-[#F8F9FD] px-4 py-[6px] text-[13px] font-medium text-[#1B1B1B]">
                        <svg fill="none" viewBox="0 0 20 20" className="h-[14px] w-[14px]">
                          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#333333" d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5"></path>
                          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#333333" d="M7.5 12.5L3.75 16.25"></path>
                          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#333333" d="M12.084 3.33398L16.6673 7.91732"></path>
                        </svg>
                        Pinned
                      </div>
                    )}

                    <div className="p-3 flex flex-col gap-3">
                      <div className="w-full aspect-[16/9] overflow-hidden rounded-lg">
                        <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                      </div>

                      <div className="inline-flex w-fit items-center gap-1.5 rounded-md bg-black/5 px-[10px] py-1 text-[13px] font-medium" style={{ color: type.color }}>
                        {type.icon}
                        {type.text}
                      </div>

                      <h3 className="text-base font-semibold leading-[1.4] text-[#1B1B1B]">{event.title}</h3>

                      <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8 4.5V8L10.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {formatEventDate(event.startDate)}
                      </div>

                      <p className="text-[13px] leading-[1.5] text-[#4A4A4A] line-clamp-3">{event.description}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#E5E5E5] px-3 py-2">
                      <span className={`rounded-2xl px-[10px] py-1 text-xs font-semibold ${statusClass}`}>{statusText}</span>

                      <div className="flex gap-2">
                        <button type="button" onClick={() => togglePin(event.id)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] bg-white">
                          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-[#5F5F5F]">
                            <path d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M7.5 12.5L3.75 16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M12.084 3.33398L16.6673 7.91732" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </button>
                        <button type="button" onClick={() => openModal(event.id)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] bg-white">
                          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#5F5F5F]">
                            <path fill="currentColor" d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z" clipRule="evenodd" fillRule="evenodd"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button type="button" onClick={() => openModal()} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#02C5AF] px-4 py-[10px] text-sm font-semibold text-white">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Add Event
            </button>
          </div>
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

      <div className={`pointer-events-none fixed bottom-20 left-1/2 z-[2000] w-[280px] max-w-[calc(100%-40px)] -translate-x-1/2 rounded-lg bg-[#EBFCF4] px-4 py-3 text-center text-sm text-[#0B6333] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 ${showToast ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0"}`}>
        {toastMessage}
      </div>
    </div>
  );
}
