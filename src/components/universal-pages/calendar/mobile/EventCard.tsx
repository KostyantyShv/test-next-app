import Image from "next/image";
import { Event } from "../types/event";
import { getIconSvg } from "./getIconSvg";

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div
      className={`flex items-center gap-3 border-l-2 p-3 rounded-e-xl shadow-[0_2px_8px_rgba(0,_0,_0,_0.05)] bg-white w-full ${
        event.type
      } ${
        event.type === "zoom-meeting" || event.type === "zoom-webinar"
          ? "border-[#15B7C3]"
          : event.type === "teams-meeting"
          ? "border-[#608CFD]"
          : event.type === "one-on-one"
          ? "border-[#E47EF4]"
          : event.type === "webex-meeting"
          ? "border-[#F89E6C]"
          : event.type === "group-session"
          ? "border-[#EE4206]"
          : ""
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          event.type === "zoom-meeting" || event.type === "zoom-webinar"
            ? "bg-[#E6F7FA]"
            : event.type === "teams-meeting"
            ? "bg-[#E8EDFF]"
            : event.type === "one-on-one"
            ? "bg-[#FBE6FF]"
            : event.type === "webex-meeting"
            ? "bg-[#FFF2E8]"
            : "bg-[#FFEDE6]"
        }`}
      >
        {getIconSvg(event.type)}
      </div>
      <div className="flex-1">
        <div
          className={`text-base font-medium ${
            event.type === "zoom-meeting" || event.type === "zoom-webinar"
              ? "text-[#15B7C3]"
              : event.type === "teams-meeting"
              ? "text-[#608CFD]"
              : event.type === "one-on-one"
              ? "text-[#E47EF4]"
              : event.type === "webex-meeting"
              ? "text-[#F89E6C]"
              : "text-[#EE4206]"
          }`}
        >
          {event.title}
        </div>
        <div className="flex items-center gap-2 text-sm text-[#5F6368] mt-1">
          <span>{event.time}</span>
          <div className="flex items-center gap-1">
            <div className="flex -space-x-2">
              <Image
                height={24}
                width={24}
                src={event.avatar1}
                className="w-6 h-6 rounded-full border-2 border-white"
                alt="Attendee 1"
              />
              <Image
                height={24}
                width={24}
                src={event.avatar2}
                className="w-6 h-6 rounded-full border-2 border-white"
                alt="Attendee 2"
              />
            </div>
            <span className="text-xs bg-[#F1F3F4] px-2 py-0.5 rounded-full">
              {event.attendees > 2 ? `${event.attendees}+` : event.attendees}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
