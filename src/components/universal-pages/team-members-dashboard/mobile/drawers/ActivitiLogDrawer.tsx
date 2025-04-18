import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { activityLogs } from "../../data/activityLogs";

interface ActivityLogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityLogDrawer({ isOpen, onClose }: ActivityLogDrawerProps) {
  return (
    <MobileDrawer isOpen={isOpen} onClose={onClose}>
      <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
        <h2 className="text-lg font-semibold text-bold-text">Activity Log</h2>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close Activity Log"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {activityLogs.map((log) => (
          <div key={log.id} className="mb-4 border-b border-gray-200 pb-4">
            <div className="text-sm font-medium text-bold-text">
              {log.action}
            </div>
            <div className="text-xs text-gray-500">{log.date}</div>
            <div className="text-xs text-gray-500">By: {log.userName}</div>
          </div>
        ))}
      </div>
    </MobileDrawer>
  );
}
