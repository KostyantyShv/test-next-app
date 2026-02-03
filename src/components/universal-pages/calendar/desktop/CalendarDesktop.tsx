"use client";
import React, { useState } from "react";
import { ViewType } from "../types/view";
import { FilterType } from "../types/filter";
import { useCalendarData } from "./useCalendarData.hook";
import { MONTHS } from "../constants";
import { FilterNav } from "./FilterNav";
import { CalendarHeader } from "./Header";
import { CalendarGrid } from "./CalendarGrid";
import { ListView } from "./ListView";
import { ViewControls } from "./ViewToggle";
import CalendarEventModal from "../components/CalendarEventModal";
import { useCalendarEvents } from "@/hooks/useCalendarEvents.hook";

const CalendarDesktop: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  const today = new Date(currentYear, currentMonth, currentDay);

  const [view, setView] = useState<ViewType>("calendar");
  const [currentDate, setCurrentDate] = useState(today);
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>(undefined);
  const { events, refreshEvents } = useCalendarEvents();

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleJumpToToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth()));
  };

  const { calendarData, listData } = useCalendarData(
    currentDate,
    today,
    filter,
    events
  );

  const currentMonthDisplay = `${
    MONTHS[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;

  const handleDateClick = (date: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
    setSelectedDate(clickedDate);
    setSelectedEventId(undefined);
    setIsModalOpen(true);
  };

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setSelectedDate(undefined);
    setIsModalOpen(true);
  };

  return (
    <div className="calendar-page min-h-screen bg-[var(--background-color)] flex justify-center px-5 py-5 font-sans">
      <div className="calendar-shell w-full max-w-[1075px] bg-[var(--surface-color)] rounded-xl shadow-[0_2px_4px_var(--shadow-color)] p-6 relative overflow-hidden border border-[var(--border-color)]">
        <header className="calendar-header flex items-center mb-6 relative z-10 bg-[var(--surface-color)]">
          <h1 className="text-[24px] font-semibold text-[var(--bold-text)]">
            What&#39;s on this month?
          </h1>
        </header>

        <nav className="calendar-filter-nav flex gap-8 border-b border-[var(--border-color)] mb-6 pb-2 relative z-10 bg-[var(--surface-color)]">
          <FilterNav filter={filter} setFilter={setFilter} />
        </nav>

        <div className="calendar-toolbar flex justify-between items-center mb-6 relative z-10 bg-[var(--surface-color)]">
          <CalendarHeader
            currentMonth={currentMonthDisplay}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />

          <ViewControls
            view={view}
            setView={setView}
            onJumpToToday={handleJumpToToday}
          />
        </div>

        <div className="relative z-0">
          {view === "calendar" ? (
            <CalendarGrid
              calendarData={calendarData}
              onDateClick={handleDateClick}
              onEventClick={handleEventClick}
            />
          ) : (
            <ListView
              listData={listData}
              onDateClick={handleDateClick}
              onEventClick={handleEventClick}
            />
          )}
        </div>
      </div>

      <CalendarEventModal
        isOpen={isModalOpen}
        onClose={async () => {
          setIsModalOpen(false);
          setSelectedDate(undefined);
          setSelectedEventId(undefined);
          // Refresh events after modal closes to ensure new events appear
          await refreshEvents();
        }}
        selectedDate={selectedDate}
        eventId={selectedEventId}
      />
    </div>
  );
};

export default CalendarDesktop;
