import { ListItemData } from "../types/list";
import { ListItem } from "./ListItem";

// List View Component
export const ListView: React.FC<{
  listData: ListItemData[];
  onDeleteEvent?: (eventId: string) => void;
}> = ({ listData, onDeleteEvent }) => (
  <div className="calendar-list bg-[var(--surface-color)] border-none">
    {listData.length === 0 ? (
      <div className="text-center text-[var(--subtle-text)] py-6">
        No events found for this filter.
      </div>
    ) : (
      listData.map((item, index) => (
        <ListItem
          key={index}
          date={item.date}
          weekday={item.weekday}
          isCurrent={item.isCurrent}
          events={item.events}
          onDeleteEvent={onDeleteEvent}
        />
      ))
    )}
  </div>
);
