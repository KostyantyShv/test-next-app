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
  const statusStyles = {
    live: "bg-[rgba(0,208,132,0.1)] text-[#00D084]",
    scheduled: "bg-[rgba(255,153,0,0.1)] text-[#db7303]",
    paused: "bg-[rgba(255,77,77,0.1)] text-[#991b1b]",
  };

  const statusText = {
    live: "Live",
    scheduled: "Scheduled",
    paused: "Paused",
  };

  const statusIcon = announcement.status === "live" ? (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="10" height="10">
      <circle cx="8" cy="8" r="6" fill="currentColor"/>
    </svg>
  ) : null;

  return (
    <div
      className={`p-4 max-md:p-4 rounded-lg max-md:rounded-lg mb-0 max-md:mb-0 relative ${
        announcement.pinned
          ? "bg-[#EBFCF4] border border-[#D7F7E9]"
          : "bg-white max-md:bg-white"
      }`}
      style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
    >
      {/* Status Badge - Mobile Position */}
      <div className={`absolute top-4 right-4 max-md:top-4 max-md:right-4 py-1 px-2.5 rounded-2xl text-xs font-semibold flex items-center gap-1 ${statusStyles[announcement.status]}`}>
        {statusIcon} {statusText[announcement.status]}
      </div>
      
      <div className="flex gap-3 max-md:gap-3">
        <div className="w-10 h-10 max-md:w-10 max-md:h-10 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={announcement.author.avatar}
            alt={announcement.author.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col mb-3 max-md:mb-3 pr-16 max-md:pr-16">
            <span className="font-semibold text-base max-md:text-base mb-0 max-md:mb-0" style={{ color: 'var(--bold-text)' }}>
              {announcement.author.name}
            </span>
            <div className="flex items-center flex-wrap gap-1.5 max-md:gap-1.5 text-sm max-md:text-[13px]" style={{ color: 'var(--subtle-text)' }}>
              <span>{announcement.author.role}</span>
              {announcement.status === "scheduled" && (
                <>
                  <span style={{ color: '#A0AEC0' }}>•</span>
                  <span>{formatScheduledDate(announcement.startDate)}</span>
                </>
              )}
            </div>
          </div>
          
          {/* Desktop Status Badge */}
          <div className="max-md:hidden flex gap-3 items-center mb-2">
            <span
              className={`py-1.5 px-3 rounded-2xl text-xs font-semibold ${
                statusStyles[announcement.status]
              } flex items-center gap-1.5`}
            >
              {statusText[announcement.status]}
            </span>
            <button
              className="w-8 h-8 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center hover:bg-[#F8F9FA] transition-colors"
              onClick={() => onTogglePin(announcement.id)}
            >
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                <path
                  d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 12.5L3.75 16.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.084 3.33398L16.6673 7.91732"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="w-8 h-8 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center hover:bg-[#F8F9FA] transition-colors"
              onClick={() => onEdit(announcement.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path
                  fill="currentColor"
                  d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-[17px] max-md:text-[17px] font-semibold mb-1.5 max-md:mb-1.5" style={{ color: 'var(--dark-text)' }}>
            {announcement.title}
            <span className="text-lg max-md:text-lg">{announcement.emoji}</span>
          </div>
          <div className="text-sm max-md:text-sm leading-6 max-md:leading-6" style={{ color: 'var(--text-default)' }}>
            {truncateText(announcement.content)}
          </div>
        </div>
      </div>
      
      {/* Mobile Action Buttons */}
      <div className="max-md:flex hidden justify-end w-full gap-2.5 max-md:gap-2.5 mt-3 max-md:mt-3">
        <button
          className="w-8 h-8 max-md:w-8 max-md:h-8 flex rounded-full border border-[#E5E5E5] bg-white items-center justify-center active:bg-[#f8f9fa] transition-colors"
          onClick={() => onTogglePin(announcement.id)}
        >
          <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
            <path
              d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 12.5L3.75 16.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.084 3.33398L16.6673 7.91732"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="w-8 h-8 max-md:w-8 max-md:h-8 flex rounded-full border border-[#E5E5E5] bg-white items-center justify-center active:bg-[#f8f9fa] transition-colors"
          onClick={() => onEdit(announcement.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path
              fill="currentColor"
              d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
