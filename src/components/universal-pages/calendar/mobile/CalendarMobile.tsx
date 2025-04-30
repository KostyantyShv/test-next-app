"use client";
import React, { useState } from "react";
import { CalendarGrid } from "./CalendarGrig";
import { EventList } from "./EventList";
import { MobileHeader } from "./Header";
import { ListItem } from "./ListItem";
import { MonthSelector } from "./MonthSelector";
import { ViewToggle } from "./ViewToggle";
import { Event } from "../types/event";
import { MONTHS, WEEKDAYS } from "../constants";
import { events } from "../mock/event";

const CalendarMobile: React.FC = () => {
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

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
      const dayEvents = events.filter(
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

  return (
    <div className="mb-24 bg-[#F8F9FA]">
      <MobileHeader />
      <div className="">
        <div className="px-4 py-3">
          <ViewToggle view={view} setView={setView} />
        </div>
        <MonthSelector
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        {view === "calendar" ? (
          <>
            <CalendarGrid
              currentDate={currentDate}
              events={events}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <EventList
              events={events}
              selectedDate={selectedDate}
              currentDate={currentDate}
            />
          </>
        ) : (
          <div className="px-4">
            {listData.length === 0 ? (
              <div className="text-[#5F6368] text-center py-4">
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
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarMobile;
