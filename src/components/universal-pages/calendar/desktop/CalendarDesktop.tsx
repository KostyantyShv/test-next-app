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

const CalendarDesktop: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  const today = new Date(currentYear, currentMonth, currentDay);

  const [view, setView] = useState<ViewType>("calendar");
  const [currentDate, setCurrentDate] = useState(today);
  const [filter, setFilter] = useState<FilterType>("ALL");

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
    filter
  );

  const currentMonthDisplay = `${
    MONTHS[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;

  return (
    <div className="flex justify-center font-sans">
      <div className="w-full bg-white rounded-xl shadow-md p-6 relative overflow-hidden">
        <header className="flex items-center mb-6 relative z-10 bg-white">
          <h1 className="text-2xl font-semibold text-[#202124] flex items-center gap-2">
            What`s on this month?
          </h1>
        </header>

        <FilterNav filter={filter} setFilter={setFilter} />

        <div className="flex justify-between items-center mb-6 relative z-10 bg-white">
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
            <CalendarGrid calendarData={calendarData} />
          ) : (
            <ListView listData={listData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarDesktop;
