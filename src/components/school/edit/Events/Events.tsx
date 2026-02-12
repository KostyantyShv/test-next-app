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

const EVENT_IMAGES = [
  "https://i.ibb.co/60MjrnYw/product1.webp",
  "https://i.ibb.co/XkdtT1Yj/product2.png",
  "https://i.ibb.co/5NTkykV/product3.jpg",
];

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

  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState<Event["type"] | null>(null);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [image, setImage] = useState(EVENT_IMAGES[0]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const typeButtonRef = useRef<HTMLButtonElement>(null);
  const typeDropdownRef = useRef<HTMLDivElement>(null);
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
    if (!isMobile || !isModalOpen) return;

    const onClickOutside = (e: MouseEvent) => {
      if (
        typeButtonRef.current &&
        typeDropdownRef.current &&
        !typeButtonRef.current.contains(e.target as Node) &&
        !typeDropdownRef.current.contains(e.target as Node)
      ) {
        setIsTypeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isMobile, isModalOpen]);

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

  const initializeDateTimeInputs = () => {
    const now = new Date();
    const minutes = Math.ceil(now.getMinutes() / 15) * 15;
    now.setMinutes(minutes, 0, 0);
    const end = new Date(now);
    end.setHours(end.getHours() + 1);

    const format = (date: Date) => {
      const y = date.getFullYear();
      const m = `${date.getMonth() + 1}`.padStart(2, "0");
      const d = `${date.getDate()}`.padStart(2, "0");
      const h = `${date.getHours()}`.padStart(2, "0");
      const min = `${date.getMinutes()}`.padStart(2, "0");
      return `${y}-${m}-${d}T${h}:${min}`;
    };

    setStartDateTime(format(now));
    setEndDateTime(format(end));
  };

  const resetMobileForm = () => {
    setTitle("");
    setDescription("");
    setEventType(null);
    setImage(EVENT_IMAGES[0]);
    setIsTypeDropdownOpen(false);
    initializeDateTimeInputs();
  };

  const openModal = (editId?: number) => {
    if (!isMobile) {
      setCurrentEditId(editId || null);
      setIsModalOpen(true);
      return;
    }

    const resolvedId = editId || null;
    setCurrentEditId(resolvedId);

    if (resolvedId) {
      const event = events.find((entry) => entry.id === resolvedId);
      if (!event) return;

      setTitle(event.title);
      setDescription(event.description);
      setEventType(event.type);
      setStartDateTime(event.startDate);
      setEndDateTime(event.endDate);
      setImage(event.image);
      setIsTypeDropdownOpen(false);
      setIsModalOpen(true);
      return;
    }

    resetMobileForm();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEditId(null);
    if (isMobile) resetMobileForm();
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

  const handleSaveMobileEvent = () => {
    if (!title.trim() || !description.trim() || !eventType || !startDateTime || !endDateTime) {
      showFeedbackToast("Please fill in all required fields");
      return;
    }

    if (new Date(endDateTime) <= new Date(startDateTime)) {
      showFeedbackToast("End date must be after start date");
      return;
    }

    if (!currentEditId && events.length >= MAX_EVENTS) {
      showFeedbackToast("Maximum number of events reached. Please delete an existing event first.");
      return;
    }

    const payload: Event = {
      id: currentEditId || Date.now(),
      title: title.trim(),
      type: eventType,
      description: description.trim(),
      image,
      startDate: startDateTime,
      endDate: endDateTime,
      status: getEventStatus(startDateTime, endDateTime),
      pinned: currentEditId
        ? events.find((entry) => entry.id === currentEditId)?.pinned || false
        : false,
      order: currentEditId
        ? events.find((entry) => entry.id === currentEditId)?.order || 0
        : events.length,
    };

    setEvents((prev) =>
      currentEditId
        ? prev.map((entry) => (entry.id === currentEditId ? payload : entry))
        : [...prev, payload]
    );

    showFeedbackToast(currentEditId ? "Event updated successfully" : "Event added successfully");
    closeModal();
  };

  const handleDeleteMobileEvent = () => {
    if (!currentEditId) return;
    setEvents((prev) => prev.filter((entry) => entry.id !== currentEditId));
    showFeedbackToast("Event deleted successfully");
    closeModal();
  };

  const onImagePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") setImage(result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const typeDisplay = getTypeDisplay(eventType);

  return (
    <div className="text-[#4A4A4A] font-inter">
      <div className="w-full mx-auto flex gap-[25px] max-md:flex-col max-md:px-4">
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
        isOpen={!isMobile && isModalOpen}
        closeModal={closeModal}
        events={events}
        setEvents={setEvents}
        currentEditId={currentEditId}
        maxEvents={MAX_EVENTS}
      />

      <div className={`fixed inset-0 z-[1000] bg-black/50 transition-all duration-300 md:hidden ${isModalOpen ? "visible opacity-100" : "invisible opacity-0"}`} onClick={closeModal} />

      <div className={`fixed bottom-0 left-0 right-0 z-[1001] mx-auto flex max-h-[90%] w-full max-w-[358px] translate-y-full flex-col overflow-hidden rounded-t-[20px] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.15)] transition-transform duration-300 md:hidden ${isModalOpen ? "translate-y-0" : ""}`}>
        <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-[#E5E7EB] bg-white px-5 py-4">
          <h2 className="text-lg font-bold text-[#1B1B1B]">{currentEditId ? "Edit Event" : "Create Event"}</h2>
          <button type="button" onClick={closeModal} className="flex h-8 w-8 items-center justify-center rounded-full border-none bg-transparent text-[#6B7280]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto px-5 py-4">
          <div className="mb-[18px]">
            <label className="mb-2 block text-sm font-semibold text-[#1B1B1B]">Event Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter event title" className="w-full rounded-lg border border-[#E5E5E5] px-3 py-3 text-sm text-[#4A4A4A]" />
          </div>

          <div className="mb-[18px]">
            <label className="mb-2 block text-sm font-semibold text-[#1B1B1B]">Event Type</label>
            <div className="relative">
              <button ref={typeButtonRef} type="button" onClick={() => setIsTypeDropdownOpen((v) => !v)} className={`flex w-full items-center gap-2 rounded-lg border border-[#E5E5E5] bg-[#F8F9FA] px-3 py-[10px] text-left text-sm ${isTypeDropdownOpen ? "" : ""}`} style={{ color: typeDisplay.color }}>
                <span className="flex items-center gap-2">
                  {typeDisplay.icon}
                  {typeDisplay.text}
                </span>
                <svg className={`ml-auto h-4 w-4 transition-transform ${isTypeDropdownOpen ? "rotate-180" : ""}`} viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div ref={typeDropdownRef} className={`absolute left-0 right-0 top-[calc(100%+4px)] z-[100] rounded-lg border border-[#E5E5E5] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all ${isTypeDropdownOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}>
                <button type="button" onClick={() => { setEventType("zoom"); setIsTypeDropdownOpen(false); }} className="flex w-full items-center gap-2 rounded-t-lg px-3 py-2 text-left text-[#15B7C3] hover:bg-[#F8F9FA]">
                  {getTypeDisplay("zoom").icon}
                  Zoom
                </button>
                <button type="button" onClick={() => { setEventType("teams"); setIsTypeDropdownOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[#608CFD] hover:bg-[#F8F9FA]">
                  {getTypeDisplay("teams").icon}
                  Teams
                </button>
                <button type="button" onClick={() => { setEventType("session"); setIsTypeDropdownOpen(false); }} className="flex w-full items-center gap-2 rounded-b-lg px-3 py-2 text-left text-[#E47EF4] hover:bg-[#F8F9FA]">
                  {getTypeDisplay("session").icon}
                  1:1 Session
                </button>
              </div>
            </div>
          </div>

          <div className="mb-[18px]">
            <label className="mb-2 block text-sm font-semibold text-[#1B1B1B]">Event Image</label>
            <div className="overflow-hidden rounded-lg border border-[#E5E5E5]">
              <div className="flex flex-col gap-3 p-3">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-[#F8F9FA]">
                  <img src={image} alt="Event image" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-[13px] text-[#4A4A4A]">Recommended dimensions of <strong>800x600</strong></div>
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-transparent px-3 py-1.5 text-[13px] text-[#4A4A4A]">
                    <svg fill="none" viewBox="0 0 48 48" width="16" height="16">
                      <rect fill="#F0F9FF" rx="24" height="48" width="48"></rect>
                      <path fill="#283593" d="M17.3307 13C16.8887 13 16.4648 13.1756 16.1522 13.4882C15.8397 13.8007 15.6641 14.2246 15.6641 14.6667V33.3333C15.6641 33.7754 15.8397 34.1993 16.1522 34.5118C16.4648 34.8244 16.8887 35 17.3307 35H30.6641C31.1061 35 31.53 34.8244 31.8426 34.5118C32.1551 34.1993 32.3307 33.7754 32.3307 33.3333V19.6667H27.9974C27.3786 19.6667 26.7851 19.4208 26.3475 18.9832C25.9099 18.5457 25.6641 17.9522 25.6641 17.3333V13H17.3307Z"></path>
                    </svg>
                    Choose Image
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onImagePicked} />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-[18px]">
            <label className="mb-2 block text-sm font-semibold text-[#1B1B1B]">Event Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Write event description here..." className="w-full min-h-[100px] resize-none rounded-lg border border-[#E5E5E5] px-3 py-3 text-sm text-[#4A4A4A]" />
          </div>

          <div className="mb-[18px]">
            <label className="mb-2 block text-sm font-semibold text-[#1B1B1B]">Schedule</label>
            <div className="flex flex-col gap-3">
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#1B1B1B]">Start Date & Time</label>
                <input type="datetime-local" value={startDateTime} onChange={(e) => setStartDateTime(e.target.value)} step={900} className="w-full rounded-lg border border-[#E5E5E5] bg-[#F8F9FA] px-3 py-[10px] text-sm text-[#4A4A4A]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#1B1B1B]">End Date & Time</label>
                <input type="datetime-local" value={endDateTime} onChange={(e) => setEndDateTime(e.target.value)} step={900} className="w-full rounded-lg border border-[#E5E5E5] bg-[#F8F9FA] px-3 py-[10px] text-sm text-[#4A4A4A]" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#E5E7EB] bg-white px-5 py-4">
          {currentEditId ? (
            <button type="button" onClick={handleDeleteMobileEvent} className="flex items-center gap-2 border-none bg-transparent text-sm text-[#f93a37]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path fill="#f93a37" d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
              Delete
            </button>
          ) : (
            <div />
          )}

          <div className="flex gap-2">
            <button type="button" onClick={closeModal} className="inline-flex items-center justify-center rounded-lg border border-[#E5E5E5] bg-[#F8F9FA] px-4 py-[10px] text-sm font-semibold text-[#4A4A4A]">Cancel</button>
            <button type="button" onClick={handleSaveMobileEvent} className="inline-flex items-center justify-center rounded-lg bg-[#02C5AF] px-4 py-[10px] text-sm font-semibold text-white">Save</button>
          </div>
        </div>
      </div>

      <div className={`pointer-events-none fixed bottom-20 left-1/2 z-[2000] w-[280px] max-w-[calc(100%-40px)] -translate-x-1/2 rounded-lg bg-[#EBFCF4] px-4 py-3 text-center text-sm text-[#0B6333] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 ${showToast ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0"}`}>
        {toastMessage}
      </div>
    </div>
  );
}
