"use client";
import React, { useEffect, useMemo, useState } from "react";
import { CalendarGrid } from "./CalendarGrig";
import { EventList } from "./EventList";
import { MobileHeader } from "./Header";
import { ListItem } from "./ListItem";
import { MonthSelector } from "./MonthSelector";
import { ViewToggle } from "./ViewToggle";
import { FilterNav } from "../desktop/FilterNav";
import { Event } from "../types/event";
import { FilterType } from "../types/filter";
import { MONTHS, WEEKDAYS } from "../constants";
import { useCalendarEvents } from "@/hooks/useCalendarEvents.hook";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";

const CalendarMobile: React.FC = () => {
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [hasInitializedMonth, setHasInitializedMonth] = useState(false);
  const [filter, setFilter] = useState<FilterType>("ALL");
  const { events, deleteEvent, refreshEvents } = useCalendarEvents();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);

  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const filterEvents = (eventsList: Event[]) => {
    return eventsList.filter((event) => {
      const eventDate = new Date(event.year, event.month, event.date);
      if (filter === "UPCOMING") return eventDate >= today;
      if (filter === "PAST") return eventDate < today;
      return true;
    });
  };

  const filteredEvents = filterEvents(events);

  useEffect(() => {
    if (hasInitializedMonth || events.length === 0) return;

    const now = new Date();
    const hasCurrentMonthEvents = events.some(
      (event) =>
        event.month === now.getMonth() && event.year === now.getFullYear()
    );

    if (hasCurrentMonthEvents) {
      setHasInitializedMonth(true);
      return;
    }

    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sortedEvents = [...events].sort((a, b) => {
      const aDate = new Date(a.year, a.month, a.date).getTime();
      const bDate = new Date(b.year, b.month, b.date).getTime();
      return aDate - bDate;
    });

    const nearestUpcomingEvent = sortedEvents.find((event) => {
      const eventDate = new Date(event.year, event.month, event.date);
      return eventDate >= todayStart;
    });

    const targetEvent = nearestUpcomingEvent || sortedEvents[0];
    if (targetEvent) {
      setCurrentDate(new Date(targetEvent.year, targetEvent.month, 1));
      setSelectedDate(targetEvent.date);
    }

    setHasInitializedMonth(true);
  }, [events, hasInitializedMonth]);

  const generateListData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const listData: {
      date: number;
      weekday: string;
      month: string;
      isCurrent?: boolean;
      events: Event[];
    }[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvents = filteredEvents.filter(
        (event) =>
          event.date === i && event.month === month && event.year === year
      );
      if (dayEvents.length > 0) {
        const date = new Date(year, month, i);
        listData.push({
          date: i,
          weekday: WEEKDAYS[date.getDay()],
          month: MONTHS[date.getMonth()],
          isCurrent:
            i === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear(),
          events: dayEvents,
        });
      }
    }

    return listData;
  };

  const listData = generateListData();

  const handleDeleteEvent = (eventId: string) => {
    setDeleteEventId(eventId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteEventId) {
      await deleteEvent(deleteEventId);
      await refreshEvents();
    }
    setIsDeleteModalOpen(false);
    setDeleteEventId(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeleteEventId(null);
  };

  return (
    <div className="pb-28 bg-[var(--background-color)]">
      <MobileHeader />
      <div className="">
        <div className="px-4 pb-2 overflow-x-auto">
          <FilterNav filter={filter} setFilter={setFilter} />
        </div>
        <MonthSelector
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        {view === "calendar" ? (
          <>
            <CalendarGrid
              currentDate={currentDate}
              events={filteredEvents}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <EventList
              events={filteredEvents}
              selectedDate={selectedDate}
              currentDate={currentDate}
              onDeleteEvent={handleDeleteEvent}
            />
          </>
        ) : (
          <div className="px-4">
            {listData.length === 0 ? (
              <div className="text-[var(--subtle-text)] text-center py-4">
                No events scheduled.
              </div>
            ) : (
              <div className="space-y-2">
                {listData.map((item, index) => (
                  <ListItem
                    key={index}
                    date={item.date}
                    weekday={item.weekday}
                    month={item.month}
                    isCurrent={item.isCurrent}
                    events={item.events}
                    onDeleteEvent={handleDeleteEvent}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating view toggle */}
      <div className="fixed bottom-[88px] left-1/2 -translate-x-1/2 z-50">
        <ViewToggle view={view} setView={setView} />
      </div>

      <MobileDrawer
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        title="Remove Event"
        variant="sheet"
        showPullIndicator={false}
      >
        <div className="px-5 pt-5 pb-4">
          <div className="text-base font-semibold text-[var(--bold-text)] mb-2">
            Remove Event
          </div>
          <div className="text-sm text-[var(--subtle-text)] leading-relaxed">
            Are you sure you want to remove this event?
          </div>
        </div>
        <div className="h-px bg-[var(--border-color)]" />
        <button
          onClick={handleConfirmDelete}
          className="w-full px-5 py-4 text-left text-base font-medium text-[#EA4335] active:bg-[var(--hover-bg)]"
        >
          Remove
        </button>
        <div className="h-px bg-[var(--border-color)]" />
        <button
          onClick={handleCancelDelete}
          className="w-full px-5 py-4 text-left text-base text-[var(--bold-text)] active:bg-[var(--hover-bg)]"
        >
          Cancel
        </button>
      </MobileDrawer>
    </div>
  );
};

export default CalendarMobile;
