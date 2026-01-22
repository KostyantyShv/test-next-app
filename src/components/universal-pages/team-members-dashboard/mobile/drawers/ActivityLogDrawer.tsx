import React from "react";
import { Drawer } from "./Drawer";

// Define the ActivityLog type based on properties used in the component
interface ActivityLog {
  id: string | number;
  userId?: number; // Optional, used for filtering by currentMemberId
  userAvatar: string;
  userName: string;
  content?: string;
  action?: string;
  field?: string;
  listingLink?: string;
  listingName?: string;
  date: string;
  timeAgo: string;
  isRead: boolean;
}

interface ActivityLogDrawerProps {
  isOpen: boolean;
  currentMemberId: number | null;
  activitySearchTerm: string;
  hideRead: boolean;
  onClose: () => void;
  onSearchChange: (term: string) => void;
  onHideReadToggle: () => void;
  activityLogsToDisplay: ActivityLog[];
}

export const ActivityLogDrawer: React.FC<ActivityLogDrawerProps> = ({
  isOpen,
  currentMemberId,
  activitySearchTerm,
  hideRead,
  onClose,
  onSearchChange,
  onHideReadToggle,
  activityLogsToDisplay,
}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Activity Log">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <label 
          className="flex items-center gap-2 cursor-pointer"
          style={{
            fontSize: '14px',
            color: '#4B5563',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
          }}
        >
          Hide Read
          <input
            type="checkbox"
            id="hideReadToggle"
            className="appearance-none h-5 w-9 rounded-full bg-gray-300 checked:bg-green-800 relative checked:after:content-[''] checked:after:absolute checked:after:h-4 checked:after:w-4 checked:after:bg-white checked:after:rounded-full checked:after:left-4 checked:after:top-0.5 after:content-[''] after:absolute after:h-4 after:w-4 after:bg-white after:rounded-full after:left-0.5 after:top-0.5 transition-all"
            checked={hideRead}
            onChange={onHideReadToggle}
          />
        </label>
        <div className="flex items-center gap-1">
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 active:bg-gray-100 border-none bg-none"
            aria-label="Mark all as read"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
              <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
              <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
              <path d="M11 6l9 0" />
              <path d="M11 12l9 0" />
              <path d="M11 18l9 0" />
            </svg>
          </button>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 active:bg-gray-100 border-none bg-none"
            aria-label="Settings"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            </svg>
          </button>
        </div>
      </div>
      <div className="relative mb-4">
        <input
          type="search"
          className="w-full p-3 pl-10 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0B6333] focus:bg-white focus:shadow-[0_0_0_2px_rgba(11,99,51,0.1)]"
          placeholder="Search activities..."
          value={activitySearchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            fontSize: '14px',
            color: '#4A4A4A',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
          }}
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <div className="activity-list">
        {activityLogsToDisplay.length === 0 ? (
          <div className="p-5 text-center text-gray-500">
            No activities found.
          </div>
        ) : (
          activityLogsToDisplay.map((log) => (
            <div
              key={log.id}
              className="flex gap-3 py-3 border-b border-gray-200 last:border-b-0 relative"
              data-id={log.id}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={log.userAvatar}
                  alt={log.userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 pr-[70px] min-w-0">
                <div
                  className="mb-1 leading-snug"
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.5,
                    color: '#4A4A4A',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
                  }}
                  dangerouslySetInnerHTML={{
                    __html:
                      log.content ??
                      (log.action === "modified"
                        ? `<strong style="font-weight: 600; color: #464646;">${log.userName}</strong> modified the ${
                            log.field
                          } of <a href="${
                            log.listingLink || "#"
                          }" style="color: #346DC2; text-decoration: none; font-weight: 500;">${
                            log.listingName
                          }</a>`
                        : log.action === "published"
                        ? `<strong style="font-weight: 600; color: #464646;">${
                            log.userName
                          }</strong> published <a href="${
                            log.listingLink || "#"
                          }" style="color: #346DC2; text-decoration: none; font-weight: 500;">${
                            log.listingName
                          }</a> listing`
                        : `Activity by <strong style="font-weight: 600; color: #464646;">${log.userName}</strong>`),
                  }}
                />
                <div 
                  className="flex justify-between flex-wrap"
                  style={{
                    fontSize: '12px',
                    color: '#6B7280',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
                  }}
                >
                  <span>{log.date}</span>
                  <span>{log.timeAgo}</span>
                </div>
              </div>
              <div className="absolute top-3 right-0 flex items-center gap-1" style={{ right: '0' }}>
                {!log.isRead && (
                  <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                )}
                <button
                  className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 active:bg-gray-100 active:text-gray-600 border-none bg-none"
                  aria-label="Mark as read"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
                <button
                  className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 active:bg-gray-100 active:text-gray-600 border-none bg-none"
                  aria-label="Dismiss notification"
                >
                  <svg
                    className="w-4 h-4"
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
            </div>
          ))
        )}
      </div>
    </Drawer>
  );
};
