import { Announcement } from "./types/announcement";

interface AnnouncementItemProps {
  announcement: Announcement;
  onTogglePin: (id: number) => void;
  onEdit: (id: number) => void;
}

const formatScheduledDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
    .replace(/\s+/g, " ");
};

const truncateText = (text: string) => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  if (sentences.length <= 1) return text;
  return sentences[0] + "..";
};

export default function AnnouncementItem({
  announcement,
  onTogglePin,
  onEdit,
}: AnnouncementItemProps) {
  const statusClass =
    announcement.status === "live"
      ? "status-live"
      : announcement.status === "scheduled"
        ? "status-scheduled"
        : "status-paused";

  const statusText =
    announcement.status === "live"
      ? "Live"
      : announcement.status === "scheduled"
        ? "Scheduled"
        : "Paused";

  return (
    <div className={`announcement-item ${announcement.pinned ? "pinned" : ""}`}>
      <div className="author-avatar">
        <img src={announcement.author.avatar} alt={announcement.author.name} />
      </div>

      <div className="announcement-content">
        <div className="announcement-header">
          <div className="author-info">
            <span className="author-name">{announcement.author.name}</span>
            <div className="author-meta">
              <span className="author-role">{announcement.author.role}</span>
              {announcement.status === "scheduled" ? (
                <>
                  <span className="date-delimiter">•</span>
                  <span className="scheduled-date">
                    {formatScheduledDate(announcement.startDate)}
                  </span>
                </>
              ) : null}
            </div>
          </div>

          <div className="announcement-actions">
            <span className={`status-indicator ${statusClass}`}>
              <span className="status-dot" />
              {statusText}
            </span>
            <button
              type="button"
              className="action-button"
              onClick={() => onTogglePin(announcement.id)}
              aria-label="Pin"
            >
              <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
                <path
                  d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M7.5 12.5L3.75 16.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12.084 3.33398L16.6673 7.91732"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              className="action-button"
              onClick={() => onEdit(announcement.id)}
              aria-label="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="announcement-title">
          {announcement.title}
          <span className="announcement-emoji">{announcement.emoji}</span>
        </div>

        <div className="announcement-text">
          {truncateText(announcement.content)}
        </div>
      </div>
    </div>
  );
}
