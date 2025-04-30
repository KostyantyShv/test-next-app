import { ListItemData } from "../types/list";
import { ListItem } from "./ListItem";

// List View Component
export const ListView: React.FC<{
  listData: ListItemData[];
}> = ({ listData }) => (
  <div className="bg-white border-none">
    {listData.length === 0 ? (
      <div className="text-center text-[#5F6368] py-6">
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
        />
      ))
    )}
  </div>
);
