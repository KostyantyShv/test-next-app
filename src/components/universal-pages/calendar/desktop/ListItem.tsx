import Image from "next/image";
import { Event } from "../types/event";

interface ListItemProps {
  date: number;
  weekday: string;
  isCurrent?: boolean;
  events: Event[];
  onDateClick?: (date: number) => void;
  onEventClick?: (eventId: string) => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  date,
  weekday,
  isCurrent,
  events,
  onDateClick,
  onEventClick,
}) => {
  const handleDateClick = () => {
    if (onDateClick) {
      onDateClick(date);
    }
  };

  const handleEventClick = (eventId: string | undefined) => {
    if (eventId && onEventClick) {
      onEventClick(eventId);
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "zoom-meeting":
        return "#15B7C3";
      case "zoom-webinar":
        return "#22C376";
      case "teams-meeting":
        return "#608CFD";
      case "one-on-one":
        return "#E47EF4";
      case "webex-meeting":
        return "#F89E6C";
      case "group-session":
        return "#EE4206";
      default:
        return "#15B7C3";
    }
  };

  const getEventTitleColor = (type: string) => {
    switch (type) {
      case "zoom-meeting":
        return "#15B7C3";
      case "zoom-webinar":
        return "#22C376";
      case "teams-meeting":
        return "#608CFD";
      case "one-on-one":
        return "#E47EF4";
      case "webex-meeting":
        return "#F89E6C";
      case "group-session":
        return "#EE4206";
      default:
        return "#15B7C3";
    }
  };

  return (
    <div className="flex py-6 border-b border-[#E0E0E0] items-start" style={{ padding: "24px 0" }}>
      <div
        className={`list-date text-center relative ${isCurrent ? "current" : ""} ${events[0]?.type || ""}`}
        style={{ width: "80px", paddingRight: "16px" }}
      >
        <div
          className={`list-weekday ${
            isCurrent ? "text-[#1A73E8]" : "text-[#5F6368]"
          }`}
          style={{ fontSize: "16px", fontWeight: 500, marginBottom: "4px" }}
        >
          {weekday.substring(0, 3).toUpperCase()}
        </div>
        <div
          onClick={handleDateClick}
          className={`list-day cursor-pointer ${
            isCurrent ? "text-[#1A73E8]" : "text-[#202124]"
          }`}
          style={{ fontSize: "28px", fontWeight: 600 }}
        >
          {date}
        </div>
      </div>
      <div className="list-content flex-1 pl-0 flex flex-col" style={{ gap: "8px" }}>
        {events.map((event, index) => (
          <div
            key={index}
            className="flex items-start w-full"
            style={{ gap: "16px" }}
          >
            <div
              onClick={() => handleEventClick(event.id)}
              className={`event flex flex-col cursor-pointer ${event.type}`}
              style={{ padding: 0, margin: 0, gap: "8px", borderLeft: `3px solid ${getEventTypeColor(event.type)}`, borderRadius: "6px" }}
            >
              <div className="event-header">
                <div
                  className="event-title font-medium"
                  style={{
                    fontSize: "16px",
                    marginTop: "4px",
                    paddingLeft: "6px",
                    color: getEventTitleColor(event.type),
                  }}
                >
                  {event.title}
                </div>
              </div>
              <div className="event-time flex items-center gap-1 text-[#5F6368]" style={{ fontSize: "14px" }}>
                <div className="event-icon flex items-center justify-center" style={{ width: "16px", height: "16px" }}>
                  {event.type === "zoom-meeting" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 38 38"
                      style={{ width: "20px", height: "20px" }}
                    >
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1.2"
                        stroke="#15B7C3"
                        d="M22.8865 17.1133L27.3332 14.42V23.5867L22.8865 20.8867M10.6665 14.42H20.8532C21.3925 14.42 21.9096 14.6342 22.291 15.0155C22.6723 15.3969 22.8865 15.9141 22.8865 16.4533V23.5867H12.6998C12.4323 23.5867 12.1673 23.5339 11.9202 23.4313C11.6731 23.3287 11.4486 23.1783 11.2597 22.9888C11.0708 22.7992 10.9212 22.5743 10.8194 22.3268C10.7176 22.0794 10.6656 21.8142 10.6665 21.5467V14.42Z"
                      ></path>
                    </svg>
                  )}
                  {event.type === "zoom-webinar" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 38 38"
                      style={{ width: "20px", height: "20px" }}
                    >
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1.2"
                        stroke="#22C376"
                        d="M22.887 17.1133L27.3337 14.42V23.5866L22.887 20.8866M10.667 14.42H20.8537C21.3929 14.42 21.9101 14.6342 22.2915 15.0155C22.6728 15.3969 22.887 15.914 22.887 16.4533V23.5866H12.7003C12.4328 23.5867 12.1678 23.5338 11.9207 23.4312C11.6735 23.3286 11.4491 23.1783 11.2602 22.9887C11.0713 22.7992 10.9217 22.5743 10.8199 22.3268C10.7181 22.0794 10.6661 21.8142 10.667 21.5466V14.42Z"
                      ></path>
                    </svg>
                  )}
                  {event.type === "teams-meeting" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 55 55"
                      style={{ width: "20px", height: "20px" }}
                    >
                      <path
                        fill="#608CFD"
                        d="M28.0017 15.7696C28.9609 15.1655 30.0969 14.9053 31.2235 15.0316C32.35 15.158 33.4001 15.6634 34.2017 16.465C34.2065 16.4697 34.2112 16.4745 34.216 16.4793C34.7116 16.347 35.2288 16.3033 35.7436 16.3522C36.5245 16.4265 37.2706 16.7113 37.9023 17.1764C38.534 17.6414 39.0277 18.2692 39.3306 18.9927C39.6335 19.7163 39.7343 20.5085 39.6223 21.2849C39.5339 21.8974 39.3157 22.4818 38.9845 23H41.3333C41.8856 23 42.3333 23.4477 42.3333 24V30.6667C42.3333 32.3464 41.6661 33.9573 40.4783 35.145C39.3063 36.317 37.7222 36.9823 36.0665 36.9997C35.7186 37.6388 35.2783 38.2306 34.7545 38.7545C33.3167 40.1923 31.3667 41 29.3333 41C25.9158 41 23.0295 38.7476 22.0364 35.6667H16C15.4477 35.6667 15 35.219 15 34.6667V21.3333C15 20.7811 15.4477 20.3333 16 20.3333H25.6773C25.6329 19.6676 25.7218 18.9951 25.9442 18.3563C26.317 17.2858 27.0425 16.3737 28.0017 15.7696Z"
                      ></path>
                    </svg>
                  )}
                  {event.type === "one-on-one" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 38 38"
                      style={{ width: "20px", height: "20px" }}
                    >
                      <path
                        strokeWidth="0.25"
                        stroke="#E47EF4"
                        fill="#E47EF4"
                        d="M12.3205 25.7152H21.1938C21.8457 26.6366 22.9139 27.2235 24.1101 27.2235C26.0733 27.2235 27.674 25.6231 27.6746 23.6601C27.693 22.4994 27.1241 21.4509 26.2582 20.8003V12.2557V12.1307H26.1332H23.5913V11.943C23.5913 11.6717 23.3698 11.4502 23.0985 11.4502C22.8271 11.4502 22.6056 11.6717 22.6056 11.943V12.1307H19.1219V11.943C19.1219 11.6717 18.9005 11.4502 18.6291 11.4502C18.3578 11.4502 18.1363 11.6717 18.1363 11.943V12.1307H14.6342V11.943C14.6342 11.6717 14.4127 11.4502 14.1414 11.4502C13.87 11.4502 13.6486 11.6717 13.6486 11.943V12.1307H11.125H11V12.2557V24.3948C11 25.1259 11.5893 25.7152 12.3205 25.7152Z"
                      ></path>
                    </svg>
                  )}
                  {event.type === "webex-meeting" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 38 38"
                      style={{ width: "20px", height: "20px" }}
                    >
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1.2"
                        stroke="#F89E6C"
                        d="M19.8332 15.6667V14.2867C19.8332 13.9896 19.7152 13.7047 19.5051 13.4947C19.2951 13.2847 19.0102 13.1667 18.7132 13.1667H14.4132M10.6665 15.6667H22.8865V24H10.6665V15.6667ZM22.8865 17.9467L27.3332 15.2533V24.42L22.8865 21.72V17.9467Z"
                      ></path>
                    </svg>
                  )}
                  {event.type === "group-session" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 38 38"
                      style={{ width: "20px", height: "20px" }}
                    >
                      <path
                        strokeWidth="0.25"
                        stroke="#EE4206"
                        fill="#EE4206"
                        d="M12.6587 24.759H20.6538C20.9472 25.9325 21.4984 26.662 22.1309 27.098C22.7782 27.5443 23.4983 27.6748 24.086 27.6748C25.9909 27.6748 27.5441 26.1219 27.5447 24.2171C27.5626 23.0916 27.0112 22.0747 26.1718 21.4433V11.7094V11.5844H26.0468H23.5869V11.4063C23.5869 11.1412 23.3705 10.9248 23.1054 10.9248C22.8403 10.9248 22.6239 11.1412 22.6239 11.4063V11.5844H19.255V11.4063C19.255 11.1412 19.0386 10.9248 18.7735 10.9248C18.5083 10.9248 18.2919 11.1412 18.2919 11.4063V11.5844H14.9052V11.4063C14.9052 11.1412 14.6888 10.9248 14.4237 10.9248C14.1585 10.9248 13.9422 11.1412 13.9422 11.4063V11.5844H11.5H11.375V11.7094V23.4753C11.375 24.1861 11.9479 24.759 12.6587 24.759Z"
                      ></path>
                    </svg>
                  )}
                </div>
                {event.time}
                <div className="avatar-group flex mr-1">
                  <Image
                    width={24}
                    height={24}
                    src={event.avatar1}
                    className="avatar w-6 h-6 rounded-full border-2 border-white -ml-2 first:ml-0"
                    alt="Attendee 1"
                  />
                  <Image
                    width={24}
                    height={24}
                    src={event.avatar2}
                    className="avatar w-6 h-6 rounded-full border-2 border-white -ml-2"
                    alt="Attendee 2"
                  />
                </div>
                <span className="attendee-count text-xs text-[#5F6368] px-1.5 py-0.5 bg-[#F1F3F4] rounded-xl">
                  {event.attendees > 2 ? `${event.attendees}+` : event.attendees}
                </span>
              </div>
            </div>
            <Image
              height={80}
              width={120}
              src={
                event.type === "zoom-meeting" || event.type === "zoom-webinar"
                  ? "https://i.ibb.co/jJ4GHXP/img1.jpg"
                  : "https://i.ibb.co/LJwrLdW/coaching-image.webp"
              }
              className="event-image rounded-lg object-cover ml-auto"
              style={{ width: "120px", height: "80px", borderRadius: "8px" }}
              alt="Event Image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
