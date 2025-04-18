import React, { useState, useRef } from "react";
import { activityLogs } from "../../data/activityLogs";

interface ActivityLogModalProps {
  memberId: number;
  onClose: () => void;
}

const ActivityLogModal: React.FC<ActivityLogModalProps> = ({
  memberId,
  onClose,
}) => {
  // State for search, hide read toggle, and activity logs
  const [searchTerm, setSearchTerm] = useState("");
  const [hideRead, setHideRead] = useState(false);
  const [logs, setLogs] = useState(
    activityLogs
      .filter((log) => log.userId === memberId)
      .map((log) => ({ ...log, isRead: log.isRead || false }))
  );

  // Use a ref to store DOM references for each activity item
  const logRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Handle hide read toggle
  const handleHideRead = () => {
    setHideRead(!hideRead);
  };

  // Mark a log as read
  const markAsRead = (logId: number) => {
    setLogs((prevLogs) =>
      prevLogs.map((log) => (log.id === logId ? { ...log, isRead: true } : log))
    );
  };

  // Mark all logs as read
  const markAllAsRead = () => {
    setLogs((prevLogs) => prevLogs.map((log) => ({ ...log, isRead: true })));
  };

  // Dismiss a log with animation
  const dismissLog = (logId: number) => {
    const ref = logRefs.current.get(logId);
    if (ref) {
      ref.style.animation = "slideOut 0.3s ease-in forwards";
      setTimeout(() => {
        setLogs((prevLogs) => prevLogs.filter((log) => log.id !== logId));
        logRefs.current.delete(logId); // Clean up the ref
      }, 300);
    }
  };

  // Filter logs based on search term and hide read toggle
  const filteredLogs = logs.filter((log) => {
    // Apply search filter
    const matchesSearch =
      log.userName.toLowerCase().includes(searchTerm) ||
      (log.content && log.content.toLowerCase().includes(searchTerm)) ||
      (log.action === "modified" &&
        (log.field?.toLowerCase().includes(searchTerm) ||
          log.listingName?.toLowerCase().includes(searchTerm))) ||
      (log.action === "published" &&
        log.listingName?.toLowerCase().includes(searchTerm));

    // Apply hide read filter
    const matchesRead = hideRead ? !log.isRead : true;

    return matchesSearch && matchesRead;
  });

  return (
    <div className="activity-log-modal-content flex flex-col max-h-[90vh]">
      {/* Modal Header */}
      <div className="modal-header p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="modal-title text-xl font-semibold text-[#464646]">
          Activity Log
        </h2>
        <div className="header-controls flex items-center gap-4">
          <label className="hide-read flex items-center gap-3 text-sm font-medium text-gray-600">
            Hide Read
            <label className="toggle-switch relative w-9 h-5">
              <input
                type="checkbox"
                checked={hideRead}
                onChange={handleHideRead}
                className="opacity-0 w-0 h-0"
              />
              <span className="toggle-slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 transition-all duration-400 rounded-full before:absolute before:content-[''] before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-white before:transition-all before:duration-400 before:rounded-full"></span>
            </label>
          </label>
          <div
            className="header-icon cursor-pointer p-2 rounded-md transition-colors flex items-center justify-center text-[#4A4A4A] hover:bg-gray-100"
            onClick={markAllAsRead}
          >
            <svg
              className="tabler-icon tabler-icon-list-check"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path d="M3.5 5.5l1.5 1.5l2.5 -2.5"></path>
              <path d="M3.5 11.5l1.5 1.5l2.5 -2.5"></path>
              <path d="M3.5 17.5l1.5 1.5l2.5 -2.5"></path>
              <path d="M11 6l9 0"></path>
              <path d="M11 12l9 0"></path>
              <path d="M11 18l9 0"></path>
            </svg>
          </div>
          <div className="header-icon cursor-pointer p-2 rounded-md transition-colors flex items-center justify-center text-[#4A4A4A] hover:bg-gray-100">
            <svg
              className="tabler-icon tabler-icon-settings"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
            </svg>
          </div>
          <div
            className="header-icon close-icon cursor-pointer p-2 rounded-md transition-colors flex items-center justify-center text-gray-500 hover:text-[#464646]"
            onClick={onClose}
          >
            <svg fill="none" viewBox="0 0 15 15" className="w-5 h-5">
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                fill="currentColor"
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-container p-6 relative border-b border-gray-200">
        <svg
          className="search-icon absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400"
          viewBox="1 1 60 60"
          width="16"
          height="16"
        >
          <path d="M27.765 42.244c-8.614 0-15.622-7.008-15.622-15.622S19.151 11 27.765 11s15.622 7.008 15.622 15.622-7.007 15.622-15.622 15.622zm0-28.398c-7.045 0-12.775 5.73-12.775 12.775s5.73 12.775 12.775 12.775 12.775-5.73 12.775-12.775-5.73-12.775-12.775-12.775z"></path>
          <path d="M34.869 39.146l4.014-3.738 9.286 9.114a3.164 3.164 0 01-.07 4.562l-.071.066a3.163 3.163 0 01-4.561-.257l-8.598-9.747zM27.77 34.173c-2.882 0-5.412-.876-7.656-2.526a1.002 1.002 0 01-.35-.81c.008-.461.445-.969 1.02-.959.284.005.493.153.713.308 1.837 1.302 3.832 1.971 6.275 1.971 1.875 0 4.492-.476 6.314-2.118a.98.98 0 01.638-.261.92.92 0 01.686.241c.222.209.33.527.336.735a1.02 1.02 0 01-.318.775c-1.333 1.237-4.262 2.644-7.658 2.644z"></path>
        </svg>
        <input
          type="text"
          className="search-input w-full p-3 pl-10 rounded-md border border-gray-200 text-sm bg-gray-100 focus:outline-none focus:border-[#016853] focus:bg-white"
          placeholder="Search activities..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Activity List */}
      <div className="activity-list p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className="activity-item flex gap-4 py-4 border-b border-gray-200 relative"
            ref={(ref) => {
              logRefs.current.set(log.id, ref); // No return value, returns void
            }}
          >
            <div className="avatar w-10 h-10 rounded-full flex-shrink-0">
              <img
                src={log.userAvatar}
                alt={log.userName}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="activity-content flex-1 pr-32">
              <div
                className="notification-text text-sm text-gray-600 mb-1.5"
                dangerouslySetInnerHTML={{
                  __html:
                    log.content ||
                    (log.action === "modified"
                      ? `<strong>${log.userName}</strong> modified the ${log.field} of <a href="${log.listingLink}" class="notification-link text-[#346DC2] font-semibold hover:underline">${log.listingName}</a>`
                      : log.action === "published"
                      ? `<strong>${log.userName}</strong> published <a href="${log.listingLink}" class="notification-link text-[#346DC2] font-semibold hover:underline">${log.listingName}</a> listing`
                      : `${log.userName} ${log.action}`),
                }}
              ></div>
              <div className="notification-meta flex justify-between text-xs text-gray-500">
                <span>{log.date}</span>
                <span>{log.timeAgo}</span>
              </div>
            </div>
            <div className="notification-indicators flex items-center gap-2 absolute right-0 top-3">
              {!log.isRead && (
                <div className="unread-indicator w-2 h-2 rounded-full bg-[#1D77BD]"></div>
              )}
              <div
                className="mark-read cursor-pointer p-1 rounded-full transition-colors text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                onClick={() => markAsRead(log.id)}
              >
                <svg
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  width="16"
                  height="16"
                >
                  <path d="M149.61,85.71l-89.6,88a8,8,0,0,1-11.22,0L10.39,136a8,8,0,1,1,11.22-11.41L54.4,156.79l84-82.5a8,8,0,1,1,11.22,11.42Zm96.1-11.32a8,8,0,0,0-11.32-.1l-84,82.5-18.83-18.5a8,8,0,0,0-11.21,11.42l24.43,24a8,8,0,0,0,11.22,0l89.6-88A8,8,0,0,0,245.71,74.39Z"></path>
                </svg>
              </div>
              <div
                className="dismiss-notification cursor-pointer p-1 rounded-full transition-colors text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                onClick={() => dismissLog(log.id)}
              >
                <svg fill="none" viewBox="0 0 12 12" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M7.46875 6L10.8438 2.65625C11.0312 2.46875 11.0312 2.125 10.8438 1.9375L10.0625 1.15625C9.875 0.96875 9.53125 0.96875 9.34375 1.15625L6 4.53125L2.625 1.15625C2.4375 0.96875 2.09375 0.96875 1.90625 1.15625L1.125 1.9375C0.9375 2.125 0.9375 2.46875 1.125 2.65625L4.5 6L1.125 9.375C0.9375 9.5625 0.9375 9.90625 1.125 10.0938L1.90625 10.875C2.09375 11.0625 2.4375 11.0625 2.625 10.875L6 7.5L9.34375 10.875C9.53125 11.0625 9.875 11.0625 10.0625 10.875L10.8438 10.0938C11.0312 9.90625 11.0312 9.5625 10.8438 9.375L7.46875 6Z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLogModal;
