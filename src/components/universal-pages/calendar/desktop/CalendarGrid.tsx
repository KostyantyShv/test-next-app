"use client";
import { useState, useEffect, useRef } from "react";
import { RENDER_WEEKDAYS } from "../constants";
import { CalendarCellData } from "../types/calendar";
import { CalendarCell } from "./CalendarCell";

export const CalendarGrid: React.FC<{
  calendarData: CalendarCellData[];
  onDateClick?: (date: number) => void;
  onEventClick?: (eventId: string) => void;
}> = ({ calendarData, onDateClick, onEventClick }) => {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleEventExpand = (eventId: string | null, cellIndex: number) => {
    setExpandedEventId(eventId);
    
    // Synchronize row heights after expansion
    if (eventId && gridRef.current) {
      setTimeout(() => {
        synchronizeRowHeights(cellIndex);
      }, 0);
    } else {
      // Reset heights when collapsing
      resetRowHeights();
    }
  };

  const handleMoreEventsToggle = (cellIndex: number) => {
    // Synchronize row heights when "More events" is toggled
    if (gridRef.current) {
      setTimeout(() => {
        synchronizeRowHeights(cellIndex);
      }, 0);
    }
  };

  const synchronizeRowHeights = (cellIndex: number) => {
    if (!gridRef.current) return;
    
    // Calculate which row the cell is in (7 cells per row, plus 7 weekday headers)
    const rowIndex = Math.floor(cellIndex / 7);
    const rowStart = rowIndex * 7;
    const rowEnd = rowStart + 7;
    
    // Get all cell elements (skip weekday headers)
    const allCells = Array.from(gridRef.current.children).slice(7) as HTMLElement[];
    const rowCells = allCells.slice(rowStart, rowEnd);
    
    // Reset heights first
    rowCells.forEach(cell => {
      cell.style.height = 'auto';
    });
    
    // Calculate and apply maximum height
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

  // Reset heights when calendar data changes
  useEffect(() => {
    resetRowHeights();
    setExpandedEventId(null);
  }, [calendarData]);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-7 gap-[1px] bg-[#E0E0E0] border border-[#E0E0E0]"
    >
      {RENDER_WEEKDAYS.map((day) => (
        <div
          key={day}
          className="bg-white p-3 text-center font-medium text-[#5F6368]"
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
          onDateClick={onDateClick}
          onEventClick={onEventClick}
          expandedEventId={expandedEventId}
          onEventExpand={handleEventExpand}
          cellIndex={index}
          onMoreEventsToggle={handleMoreEventsToggle}
        />
      ))}
    </div>
  );
};
