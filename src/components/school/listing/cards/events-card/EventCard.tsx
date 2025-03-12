import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Event } from "./types";

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [isAttending, setIsAttending] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setShowConfirmDialog(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    if (!isAttending) {
      setIsAttending(true);
    } else {
      setShowConfirmDialog(!showConfirmDialog); // Toggle dialog on click
    }
  };

  const handleConfirmYes = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAttending(false);
    setShowConfirmDialog(false);
  };

  const handleConfirmNo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmDialog(false);
  };

  const titleAndAddButton = (version: "mobile" | "desktop") => {
    return (
      <div
        className={`${
          version === "mobile" ? "flex md:hidden" : "hidden md:flex"
        } items-start justify-between gap-3 w-full`}
      >
        <h3 className="text-[15px] md:text-base font-semibold text-[#142E53] md:text-[#464646] m-0 flex-1">
          {event.title}
        </h3>
        <div
          ref={buttonRef}
          className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 transition-all duration-200 ease-in-out relative ${
            isAttending
              ? "bg-[rgba(22,163,74,0.1)] md:bg-[#00DF8B] text-[#16a34a] md:text-white"
              : "bg-[rgba(59,110,145,0.08)] hover:bg-[rgba(59,110,145,0.12)]"
          }`}
          onClick={handleJoinClick}
        >
          {isAttending ? (
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 6L9 17L4 12"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-[#3B6E91]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          )}

          {showConfirmDialog && (
            <div
              className={`absolute bg-black/80 md:bg-white md:shadow-[0_4px_12px_rgba(0,0,0,0.15)] md:border md:border-black/10 text-white md:text-[#4A4A4A] px-2 md:px-3 py-1 md:py-2 rounded text-xs whitespace-nowrap z-50 -top-7 md:-top-12 left-1/2 md:left-auto md:right-[calc(100%+8px)] transform -translate-x-1/2 md:translate-x-0 md:top-1/2 md:-translate-y-1/2 transition-opacity duration-200 ease-in-out opacity-100`}
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
                <span className="md:text-sm">Remove from event?</span>
                <div className="flex gap-2">
                  <button
                    className="px-2 py-1 rounded text-xs font-medium bg-[#ef4444] md:bg-[#fee2e1] text-white md:text-[#991b1b] hover:bg-[#dc2626] md:hover:bg-[#fddddd] transition-all duration-200"
                    onClick={handleConfirmYes}
                  >
                    Yes
                  </button>
                  <button
                    className="px-2 py-1 rounded text-xs font-medium bg-[rgba(59,110,145,0.1)] md:bg-[#EBFCF4] text-[#3B6E91] md:text-[#0B6333] hover:bg-[rgba(59,110,145,0.15)] md:hover:bg-[#D7F7E9] transition-all duration-200"
                    onClick={handleConfirmNo}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 p-4 rounded-lg md:rounded-xl border border-black/[0.08] bg-white transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:border-black/[0.12]">
      <div className="w-full flex gap-3 flex-row md:w-10 h-12 md:h-10 rounded-md overflow-hidden shrink-0">
        <Image
          src={event.image}
          alt={event.title}
          width={48}
          height={48}
          className="w-12 h-12 object-cover rounded-md"
        />
        {titleAndAddButton("mobile")}
      </div>

      <div className="flex-1 flex flex-col gap-3">
        {titleAndAddButton("desktop")}
        <div className="flex items-center gap-3 flex-wrap mb-2 md:mb-3">
          <div
            className="flex items-center gap-1.5 font-medium text-sm"
            style={{ color: event.type.color }}
          >
            <div className="w-5 h-5">{event.type.icon}</div>
            {event.type.name}
          </div>
          <div className="flex items-center gap-1.5 text-[#3B6E91] text-sm">
            <svg
              className="w-4 h-4 text-[#828282]"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M6.66671 1.75C7.08092 1.75 7.41671 2.08579 7.41671 2.5V3.41667H12.5834V2.5C12.5834 2.08579 12.9192 1.75 13.3334 1.75C13.7476 1.75 14.0834 2.08579 14.0834 2.5V3.41667H15C15.641 3.41667 16.2557 3.67128 16.7089 4.12449C17.1621 4.5777 17.4167 5.19239 17.4167 5.83333V15.8333C17.4167 16.4743 17.1621 17.089 16.7089 17.5422C16.2557 17.9954 15.641 18.25 15 18.25H5.00004C4.3591 18.25 3.74441 17.9954 3.2912 17.5422C2.83799 17.089 2.58337 16.4743 2.58337 15.8333V5.83333C2.58337 5.19239 2.83799 4.5777 3.2912 4.12449C3.74441 3.67128 4.3591 3.41667 5.00004 3.41667H5.91671V2.5C5.91671 2.08579 6.25249 1.75 6.66671 1.75ZM5.91671 4.91667H5.00004C4.75693 4.91667 4.52377 5.01324 4.35186 5.18515C4.17995 5.35706 4.08337 5.59022 4.08337 5.83333V8.41667H15.9167V5.83333C15.9167 5.59022 15.8201 5.35706 15.6482 5.18515C15.4763 5.01324 15.2432 4.91667 15 4.91667H14.0834V5.83333C14.0834 6.24755 13.7476 6.58333 13.3334 6.58333C12.9192 6.58333 12.5834 6.24755 12.5834 5.83333V4.91667H7.41671V5.83333C7.41671 6.24755 7.08092 6.58333 6.66671 6.58333C6.25249 6.58333 5.91671 6.24755 5.91671 5.83333V4.91667ZM15.9167 9.91667H4.08337V15.8333C4.08337 16.0764 4.17995 16.3096 4.35186 16.4815C4.52377 16.6534 4.75693 16.75 5.00004 16.75H15C15.2432 16.75 15.4763 16.6534 15.6482 16.4815C15.8201 16.3096 15.9167 16.0764 15.9167 15.8333V9.91667Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
            {event.date}
            <svg
              className="w-4 h-4 text-[#828282]"
              fill="none"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M11.0251 3.98957C12.6023 3.33626 14.2928 3 16 3C17.7072 3 19.3977 3.33626 20.9749 3.98957C22.5521 4.64288 23.9852 5.60045 25.1924 6.80761C26.3995 8.01477 27.3571 9.44788 28.0104 11.0251C28.6637 12.6023 29 14.2928 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3995 23.9852 25.1924 25.1924C23.9852 26.3995 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3995 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 14.2928 3.33625 12.6023 3.98957 11.0251C4.64288 9.44788 5.60045 8.01477 6.80761 6.80761C8.01477 5.60045 9.44788 4.64288 11.0251 3.98957ZM16 5C14.5555 5 13.1251 5.28452 11.7905 5.83733C10.4559 6.39013 9.24327 7.20038 8.22183 8.22183C7.20038 9.24327 6.39013 10.4559 5.83733 11.7905C5.28452 13.1251 5 14.5555 5 16C5 17.4445 5.28452 18.8749 5.83733 20.2095C6.39013 21.5441 7.20038 22.7567 8.22183 23.7782C9.24327 24.7996 10.4559 25.6099 11.7905 26.1627C13.1251 26.7155 14.5555 27 16 27C17.4445 27 18.8749 26.7155 20.2095 26.1627C21.5441 25.6099 22.7567 24.7996 23.7782 23.7782C24.7996 22.7567 25.6099 21.5441 26.1627 20.2095C26.7155 18.8749 27 17.4445 27 16C27 14.5555 26.7155 13.1251 26.1627 11.7905C25.6099 10.4559 24.7996 9.24327 23.7782 8.22183C22.7567 7.20038 21.5441 6.39013 20.2095 5.83733C18.8749 5.28452 17.4445 5 16 5ZM16 8.33333C16.5523 8.33333 17 8.78105 17 9.33333V15.4648L20.5547 17.8346C21.0142 18.141 21.1384 18.7618 20.8321 19.2214C20.5257 19.6809 19.9048 19.8051 19.4453 19.4987L15.4453 16.8321C15.1671 16.6466 15 16.3344 15 16V9.33333C15 8.78105 15.4477 8.33333 16 8.33333Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
            {event.time}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {event.attendees.map((attendee, index) => (
              <div key={index} className={`${index !== 0 ? "-ml-2" : ""}`}>
                <Image
                  src={attendee.image}
                  alt={attendee.alt}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-[0_2px_4px_rgba(20,46,83,0.1)]"
                />
              </div>
            ))}
          </div>
          <span className="bg-[rgba(59,110,145,0.08)] text-[#3B6E91] text-xs py-1 px-2.5 rounded-xl font-medium">
            +{event.attendeeCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
