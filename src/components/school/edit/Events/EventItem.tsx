import { formatEventDate } from "./utils/helpers";

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

interface EventItemProps {
  event: Event;
  togglePin: (id: number) => void;
  editEvent: () => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}

const getEventTypeDisplay = (type: Event["type"]) => {
  switch (type) {
    case "zoom":
      return {
        color: "#15B7C3",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 38 38">
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.2"
              stroke="currentColor"
              d="M22.8865 17.1133L27.3332 14.42V23.5867L22.8865 20.8867M10.6665 14.42H20.8532C21.3925 14.42 21.9096 14.6342 22.291 15.0155C22.6723 15.3969 22.8865 15.9141 22.8865 16.4533V23.5867H12.6998C12.4323 23.5867 12.1673 23.5339 11.9202 23.4313C11.6731 23.3287 11.4486 23.1783 11.2597 22.9888C11.0708 22.7992 10.9212 22.5743 10.8194 22.3268C10.7176 22.0794 10.6656 21.8142 10.6665 21.5467V14.42Z"
            />
          </svg>
        ),
        text: "Zoom",
      };
    case "teams":
      return {
        color: "#608CFD",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 55 55">
            <path
              fill="currentColor"
              d="M28.0017 15.7696C28.9609 15.1655 30.0969 14.9053 31.2235 15.0316C32.35 15.158 33.4001 15.6634 34.2017 16.465C34.2065 16.4697 34.2112 16.4745 34.216 16.4793C34.7116 16.347 35.2288 16.3033 35.7436 16.3522C36.5245 16.4265 37.2706 16.7113 37.9023 17.1764C38.534 17.6414 39.0277 18.2692 39.3306 18.9927C39.6335 19.7163 39.7343 20.5085 39.6223 21.2849C39.5339 21.8974 39.3157 22.4818 38.9845 23H41.3333C41.8856 23 42.3333 23.4477 42.3333 24V30.6667C42.3333 32.3464 41.6661 33.9573 40.4783 35.145C39.3063 36.317 37.7222 36.9823 36.0665 36.9997C35.7186 37.6388 35.2783 38.2306 34.7545 38.7545C33.3167 40.1923 31.3667 41 29.3333 41C25.9158 41 23.0295 38.7476 22.0364 35.6667H16C15.4477 35.6667 15 35.219 15 34.6667V21.3333C15 20.7811 15.4477 20.3333 16 20.3333H25.6773C25.6329 19.6676 25.7218 18.9951 25.9442 18.3563C26.317 17.2858 27.0425 16.3737 28.0017 15.7696Z"
            />
          </svg>
        ),
        text: "Teams",
      };
    case "session":
      return {
        color: "#E47EF4",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 38 38">
            <path
              strokeWidth="0.25"
              stroke="currentColor"
              fill="currentColor"
              d="M12.3205 25.7152H21.1938C21.8457 26.6366 22.9139 27.2235 24.1101 27.2235C26.0733 27.2235 27.674 25.6231 27.6746 23.6601C27.693 22.4994 27.1241 21.4509 26.2582 20.8003V12.2557V12.1307H26.1332H23.5913V11.943C23.5913 11.6717 23.3698 11.4502 23.0985 11.4502C22.8271 11.4502 22.6056 11.6717 22.6056 11.943V12.1307H19.1219V11.943C19.1219 11.6717 18.9005 11.4502 18.6291 11.4502C18.3578 11.4502 18.1363 11.6717 18.1363 11.943V12.1307H14.6342V11.943C14.6342 11.6717 14.4127 11.4502 14.1414 11.4502C13.87 11.4502 13.6486 11.6717 13.6486 11.943V12.1307H11.125H11V12.2557V24.3948C11 25.1259 11.5893 25.7152 12.3205 25.7152Z"
            />
          </svg>
        ),
        text: "1:1 Session",
      };
  }
};

export default function EventItem({
  event,
  togglePin,
  editEvent,
  onDragStart,
  onDragEnd,
}: EventItemProps) {
  const typeDisplay = getEventTypeDisplay(event.type);
  const statusClass =
    event.status === "live"
      ? "bg-[#00D084]/10 text-[#00D084]"
      : event.status === "scheduled"
      ? "bg-[#db7303]/10 text-[#db7303]"
      : "bg-[#991b1b]/10 text-[#991b1b]";
  const statusText =
    event.status.charAt(0).toUpperCase() + event.status.slice(1);

  return (
    <div
      className="event-item border border-[#E5E5E5] rounded-xl overflow-hidden group"
      data-id={event.id}
      draggable
      onDragStart={(e) => onDragStart(e, event.id)}
      onDragEnd={onDragEnd}
    >
      {event.pinned && (
        <div className="bg-[#F8F9FD] p-2 flex items-center gap-1.5 font-medium text-[#1B1B1B] text-[13px] border-b border-[#E0E0E0]">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 20 20">
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.5"
              stroke="#333333"
              d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5"
            />
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.5"
              stroke="#333333"
              d="M7.5 12.5L3.75 16.25"
            />
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.5"
              stroke="#333333"
              d="M12.084 3.33398L16.6673 7.91732"
            />
          </svg>
          Pinned
        </div>
      )}
      <div className="p-4 flex gap-6 relative max-md:flex-col-reverse">
        <div className="event-drag w-6 h-6 text-[#A0AEC0] cursor-grab flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity active:cursor-grabbing">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2m-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex gap-3 mb-3 items-start">
            <div
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-black/5"
              style={{ color: typeDisplay.color }}
            >
              {typeDisplay.icon}
              {typeDisplay.text}
            </div>
          </div>
          <h3 className="text-[#1B1B1B] text-lg font-semibold mb-2 leading-tight">
            {event.title}
          </h3>
          <div className="text-[#5F5F5F] text-sm mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 4.5V8L10.5 9.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              dangerouslySetInnerHTML={{
                __html: formatEventDate(event.startDate),
              }}
            />
          </div>
          <p className="text-[#4A4A4A] text-sm leading-6">
            {event.description}
          </p>
        </div>
        <div className="w-[180px] h-[120px] max-md:w-full max-md:h-[200px] rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="relative">
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${statusClass}`}
          >
            {statusText}
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => togglePin(event.id)}
              className="w-9 h-9 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center hover:bg-[#F8F9FA] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
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
              onClick={editEvent}
              className="w-9 h-9 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center hover:bg-[#F8F9FA] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
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
      </div>
    </div>
  );
}
