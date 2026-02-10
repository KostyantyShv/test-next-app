"use client";
import { useState, useEffect, useRef } from "react";
import { RENDER_WEEKDAYS } from "../constants";
import { CalendarCellData } from "../types/calendar";
import { CalendarCell } from "./CalendarCell";

export const CalendarGrid: React.FC<{
  calendarData: CalendarCellData[];
  onDeleteEvent?: (eventId: string) => void;
}> = ({ calendarData, onDeleteEvent }) => {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleEventExpand = (eventId: string | null, cellIndex: number) => {
    setExpandedEventId(eventId);

    if (eventId && gridRef.current) {
      setTimeout(() => {
        synchronizeRowHeights(cellIndex);
      }, 0);
    } else {
      resetRowHeights();
    }
  };

  const handleMoreEventsToggle = (cellIndex: number) => {
    if (gridRef.current) {
      setTimeout(() => {
        synchronizeRowHeights(cellIndex);
      }, 0);
    }
  };

  const synchronizeRowHeights = (cellIndex: number) => {
    if (!gridRef.current) return;

    const rowIndex = Math.floor(cellIndex / 7);
    const rowStart = rowIndex * 7;
    const rowEnd = rowStart + 7;

    const allCells = Array.from(gridRef.current.children).slice(7) as HTMLElement[];
    const rowCells = allCells.slice(rowStart, rowEnd);

    rowCells.forEach(cell => {
      cell.style.height = 'auto';
    });

    requestAnimationFrame(() => {
      let maxHeight = 0;
      rowCells.forEach(cell => {
        const cellHeight = cell.scrollHeight;
        maxHeight = Math.max(maxHeight, cellHeight);
      });

      rowCells.forEach(cell => {
        cell.style.height = `${maxHeight}px`;
      });
    });
  };

  const resetRowHeights = () => {
    if (!gridRef.current) return;

    const allCells = Array.from(gridRef.current.children).slice(7) as HTMLElement[];
    allCells.forEach(cell => {
      cell.style.height = 'auto';
    });
  };

  useEffect(() => {
    resetRowHeights();
    setExpandedEventId(null);
  }, [calendarData]);

  return (
    <div
      ref={gridRef}
      className="calendar-grid grid grid-cols-7 gap-[1px] bg-[var(--border-color)] border border-[var(--border-color)]"
    >
      {RENDER_WEEKDAYS.map((day) => (
        <div
          key={day}
          className="calendar-weekday bg-[var(--surface-color)] p-3 text-center font-medium text-[var(--subtle-text)]"
        >
          {day}
        </div>
      ))}
      {calendarData.map((cell, index) => (
        <CalendarCell
          key={index}
          date={cell.date}
          isPrevMonth={cell.isPrevMonth}
          isNextMonth={cell.isNextMonth}
          events={cell.events}
          isToday={cell.isToday}
          expandedEventId={expandedEventId}
          onEventExpand={handleEventExpand}
          cellIndex={index}
          onMoreEventsToggle={handleMoreEventsToggle}
          onDeleteEvent={onDeleteEvent}
        />
      ))}
    </div>
  );
};
