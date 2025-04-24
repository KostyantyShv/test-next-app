import { Drawer } from "./Drawer";

interface OptionsDrawerProps {
  isOpen: boolean;
  sortFilter: string;
  onClose: () => void;
  onSortChange: (sort: string) => void;
}

export const OptionsDrawer: React.FC<OptionsDrawerProps> = ({
  isOpen,
  sortFilter,
  onClose,
  onSortChange,
}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Options">
      <div className="p-2 border-b border-gray-300">
        <div className="px-4 pb-2 text-base font-medium text-gray-700">
          Sort By
        </div>
        <div
          className={`px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 ${
            sortFilter === "name"
              ? "font-semibold text-cyan-600"
              : "text-gray-600"
          }`}
          onClick={() => onSortChange("name")}
        >
          Name A-Z
        </div>
        <div
          className={`px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 ${
            sortFilter === "lastActive"
              ? "font-semibold text-cyan-600"
              : "text-gray-600"
          }`}
          onClick={() => onSortChange("lastActive")}
        >
          Last Active
        </div>
        <div
          className={`px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 ${
            sortFilter === "email"
              ? "font-semibold text-cyan-600"
              : "text-gray-600"
          }`}
          onClick={() => onSortChange("email")}
        >
          Email A-Z
        </div>
      </div>
      <div className="p-2">
        <div className="px-4 pb-2 text-base font-medium text-gray-700">
          Layout
        </div>
        <div className="px-4 py-4 text-sm text-gray-600">
          Dummy Layout Options
        </div>
      </div>
    </Drawer>
  );
};
