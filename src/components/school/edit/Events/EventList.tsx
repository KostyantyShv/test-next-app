import { useRef } from "react";
import EventItem from "./EventItem";

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

interface EventListProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  openModal: (id: number) => void;
}

export default function EventList({
  events,
  setEvents,
  openModal,
}: EventListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    const item = e.currentTarget;
    item.classList.add("opacity-50");
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("opacity-50");
    const items = Array.from(listRef.current!.children) as HTMLElement[];
    const updatedEvents = items.map((item, index) => {
      const id = parseInt(item.dataset.id!);
      const event = events.find((e) => e.id === id)!;
      return { ...event, order: index };
    });
    setEvents(updatedEvents);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData("text/plain"));
    const draggedItem = listRef.current!.querySelector(
      `[data-id="${id}"]`
    ) as HTMLElement;
    const afterElement = getDragAfterElement(e.clientY);
    if (afterElement) {
      listRef.current!.insertBefore(draggedItem, afterElement);
    } else {
      listRef.current!.appendChild(draggedItem);
    }
  };

  const getDragAfterElement = (y: number) => {
    const draggableElements = Array.from(
      listRef.current!.querySelectorAll(".event-item:not(.opacity-50)")
    ) as HTMLElement[];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY, element: null as HTMLElement | null }
    ).element;
  };

  const togglePin = (id: number) => {
    setEvents((prev) =>
      prev.map((event) => ({
        ...event,
        pinned: event.id === id ? !event.pinned : false,
      }))
    );
  };

  const sortedEvents = [...events].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return a.order - b.order;
  });

  if (sortedEvents.length === 0) {
    return (
      <div className="mt-6 py-8 text-center text-[#5F5F5F] text-sm">
        No events yet. Click "Add Event" to create your first event.
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      className="mt-6 flex flex-col gap-4 py-2"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {sortedEvents.map((event) => (
        <EventItem
          key={event.id}
          event={event}
          togglePin={togglePin}
          editEvent={() => openModal(event.id)}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
}
