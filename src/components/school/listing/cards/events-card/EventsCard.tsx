// pages/index.tsx
import { useState, useRef, useEffect, JSX } from "react";
import Image from "next/image";

// Define TypeScript interfaces
interface Event {
  id: string;
  title: string;
  image: string;
  type: {
    name: string;
    color: string;
    icon: JSX.Element;
  };
  date: string;
  time: string;
  attendees: {
    image: string;
    alt: string;
  }[];
  attendeeCount: number;
}

const EventsCards = ({ id }: { id: string }) => {
  // Event data
  const events: Event[] = [
    {
      id: "1",
      title: "Advanced React Workshop",
      image: "https://i.ibb.co/640kJN2/c1.jpg",
      type: {
        name: "Zoom",
        color: "#15B7C3",
        icon: (
          <svg className="svg-icon" fill="none" viewBox="0 0 38 38">
            <path
              stroke="currentColor"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.2"
              d="M22.8865 17.1133L27.3332 14.42V23.5867L22.8865 20.8867M10.6665 14.42H20.8532C21.3925 14.42 21.9096 14.6342 22.291 15.0155C22.6723 15.3969 22.8865 15.9141 22.8865 16.4533V23.5867H12.6998C12.4323 23.5867 12.1673 23.5339 11.9202 23.4313C11.6731 23.3287 11.4486 23.1783 11.2597 22.9888C11.0708 22.7992 10.9212 22.5743 10.8194 22.3268C10.7176 22.0794 10.6656 21.8142 10.6665 21.5467V14.42Z"
            />
          </svg>
        ),
      },
      date: "Nov 15",
      time: "9:00 AM",
      attendees: [
        {
          image: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
          alt: "Attendee 1",
        },
        {
          image:
            "https://i.ibb.co/S3QRdcX/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
          alt: "Attendee 2",
        },
        { image: "https://i.ibb.co/YP71Tb6/profile9.jpg", alt: "Attendee 3" },
      ],
      attendeeCount: 10,
    },
    {
      id: "2",
      title: "Team Strategy Planning",
      image: "https://i.ibb.co/NKffPZQ/c4.jpg",
      type: {
        name: "Teams",
        color: "#608CFD",
        icon: (
          <svg className="svg-icon" fill="none" viewBox="0 0 55 55">
            <path
              fill="currentColor"
              d="M28.0017 15.7696C28.9609 15.1655 30.0969 14.9053 31.2235 15.0316C32.35 15.158 33.4001 15.6634 34.2017 16.465C34.2065 16.4697 34.2112 16.4745 34.216 16.4793C34.7116 16.347 35.2288 16.3033 35.7436 16.3522C36.5245 16.4265 37.2706 16.7113 37.9023 17.1764C38.534 17.6414 39.0277 18.2692 39.3306 18.9927C39.6335 19.7163 39.7343 20.5085 39.6223 21.2849C39.5339 21.8974 39.3157 22.4818 38.9845 23H41.3333C41.8856 23 42.3333 23.4477 42.3333 24V30.6667C42.3333 32.3464 41.6661 33.9573 40.4783 35.145C39.3063 36.317 37.7222 36.9823 36.0665 36.9997C35.7186 37.6388 35.2783 38.2306 34.7545 38.7545C33.3167 40.1923 31.3667 41 29.3333 41C25.9158 41 23.0295 38.7476 22.0364 35.6667H16C15.4477 35.6667 15 35.219 15 34.6667V21.3333C15 20.7811 15.4477 20.3333 16 20.3333H25.6773C25.6329 19.6676 25.7218 18.9951 25.9442 18.3563C26.317 17.2858 27.0425 16.3737 28.0017 15.7696ZM27.6847 20.3333H29.3333C29.8856 20.3333 30.3333 20.7811 30.3333 21.3333V22.982C30.4259 22.9923 30.5187 22.9983 30.6117 23H30.7207C31.036 22.9943 31.3506 22.9388 31.6527 22.8337C31.9095 22.7442 32.1511 22.621 32.3718 22.4685C32.4493 22.3844 32.538 22.3167 32.6335 22.2654C32.854 22.0738 33.0469 21.8498 33.2047 21.5992C33.5672 21.0237 33.7233 20.342 33.6475 19.6661C33.5935 19.1845 33.424 18.7262 33.157 18.3285C33.1097 18.2761 33.0673 18.218 33.031 18.1546C32.9559 18.0583 32.8746 17.9663 32.7875 17.8792C32.3066 17.3982 31.6765 17.095 31.0005 17.0192C30.3246 16.9434 29.643 17.0995 29.0675 17.462C28.492 17.8244 28.0567 18.3717 27.833 19.014C27.6847 19.4399 27.6353 19.8908 27.6847 20.3333ZM35.38 18.3332C35.5062 18.6901 35.5923 19.0623 35.635 19.4432C35.7614 20.5697 35.5012 21.7058 34.8971 22.665C34.8425 22.7516 34.7855 22.8363 34.726 22.919C34.7797 22.9335 34.8339 22.946 34.8886 22.9567C35.3033 23.0372 35.732 23.0036 36.1291 22.8596C36.5261 22.7155 36.8766 22.4664 37.1432 22.1388C37.4098 21.8112 37.5825 21.4173 37.6428 20.9993C37.7031 20.5813 37.6488 20.1547 37.4857 19.7651C37.3226 19.3754 37.0568 19.0374 36.7166 18.787C36.3765 18.5366 35.9748 18.3832 35.5543 18.3432C35.4962 18.3377 35.4381 18.3344 35.38 18.3332ZM35 25H30.7365C30.6896 25.0007 30.6427 25.0007 30.5958 25H30.3333V34.6667C30.3333 35.219 29.8856 35.6667 29.3333 35.6667H24.1776C25.0725 37.6292 27.0479 39 29.3333 39C30.8362 39 32.2776 38.403 33.3403 37.3403C34.403 36.2776 35 34.8362 35 33.3333V25ZM22.8263 33.6667H28.3333V22.3333H17V33.6667H22.7865C22.7998 33.6664 22.813 33.6664 22.8263 33.6667ZM37 25V33.3333C37 33.8703 36.9437 34.4015 36.8343 34.9189C37.673 34.7544 38.451 34.344 39.0641 33.7308C39.8768 32.9181 40.3333 31.8159 40.3333 30.6667V25H37ZM19 25.3333C19 24.7811 19.4477 24.3333 20 24.3333H25.3333C25.8856 24.3333 26.3333 24.7811 26.3333 25.3333C26.3333 25.8856 25.8856 26.3333 25.3333 26.3333H23.6667V30.6667C23.6667 31.219 23.219 31.6667 22.6667 31.6667C22.1144 31.6667 21.6667 31.219 21.6667 30.6667V26.3333H20C19.4477 26.3333 19 25.8856 19 25.3333Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        ),
      },
      date: "Nov 15",
      time: "11:00 AM",
      attendees: [
        {
          image: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
          alt: "Attendee 1",
        },
        {
          image:
            "https://i.ibb.co/S3QRdcX/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
          alt: "Attendee 2",
        },
        { image: "https://i.ibb.co/YP71Tb6/profile9.jpg", alt: "Attendee 3" },
      ],
      attendeeCount: 8,
    },
    {
      id: "3",
      title: "1:1 Coaching Session",
      image: "https://i.ibb.co/rkkdzYx/c6.jpg",
      type: {
        name: "1:1 Session",
        color: "#E47EF4",
        icon: (
          <svg
            className="svg-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 38 38"
          >
            <path
              strokeWidth="0.25"
              stroke="currentColor"
              fill="currentColor"
              d="M12.3205 25.7152H21.1938C21.8457 26.6366 22.9139 27.2235 24.1101 27.2235C26.0733 27.2235 27.674 25.6231 27.6746 23.6601C27.693 22.4994 27.1241 21.4509 26.2582 20.8003V12.2557V12.1307H26.1332H23.5913V11.943C23.5913 11.6717 23.3698 11.4502 23.0985 11.4502C22.8271 11.4502 22.6056 11.6717 22.6056 11.943V12.1307H19.1219V11.943C19.1219 11.6717 18.9005 11.4502 18.6291 11.4502C18.3578 11.4502 18.1363 11.6717 18.1363 11.943V12.1307H14.6342V11.943C14.6342 11.6717 14.4127 11.4502 14.1414 11.4502C13.87 11.4502 13.6486 11.6717 13.6486 11.943V12.1307H11.125H11V12.2557V24.3948C11 25.1259 11.5893 25.7152 12.3205 25.7152ZM11.8016 12.9324H13.6667V13.1201C13.6667 13.3915 13.8881 13.6129 14.1595 13.6129C14.4308 13.6129 14.6523 13.3915 14.6523 13.1201V12.9324H18.1544V13.1201C18.1544 13.3915 18.3759 13.6129 18.6472 13.6129C18.9186 13.6129 19.14 13.3915 19.14 13.1201V12.9324H22.6421V13.1201C22.6421 13.3915 22.8636 13.6129 23.1349 13.6129C23.4063 13.6129 23.6278 13.3915 23.6278 13.1201V12.9324H25.4928V14.0987H11.8016V12.9324ZM12.3203 24.9135C12.0398 24.9135 11.8014 24.6752 11.8014 24.3947L11.8016 14.9004H25.438V20.3609C25.0283 20.1965 24.5773 20.0946 24.11 20.0946C22.1466 20.0946 20.5456 21.6956 20.5456 23.6591C20.5456 24.1068 20.6321 24.5251 20.7792 24.9135H12.3203Z"
            />
            <path
              fill="currentColor"
              d="M25.3976 24.1553L25.0483 23.9346L24.3861 23.5116V21.7827C24.3861 21.6355 24.2573 21.5068 24.1103 21.5068C23.9631 21.5068 23.8345 21.6356 23.8345 21.7827V23.8059L25.1036 24.6152C25.1587 24.652 25.1956 24.652 25.2507 24.652C25.3427 24.652 25.4347 24.6152 25.4899 24.5232C25.5633 24.4128 25.5264 24.2473 25.3976 24.1553L25.3976 24.1553Z"
            />
            <path
              fill="currentColor"
              d="M20.2375 16.75H19.1125V17.875H20.2375V16.75ZM22.15 16.75H21.025V17.875H22.15V16.75ZM22.9375 16.75H24.0625V17.875H22.9375V16.75ZM18.325 19H17.2V20.125H18.325V19ZM19.1125 19H20.2375V20.125H19.1125V19ZM22.15 19H21.025V20.125H22.15V19ZM17.2 21.25H18.325V22.375H17.2V21.25ZM16.4125 21.25H15.2875V22.375H16.4125V21.25ZM13.375 21.25H14.5V22.375H13.375V21.25ZM16.4125 19H15.2875V20.125H16.4125V19ZM13.375 19H14.5V20.125H13.375V19ZM24.0625 19H22.9375V20.125H24.0625V19ZM17.2 16.75H18.325V17.875H17.2V16.75ZM16.4125 16.75H15.2875V17.875H16.4125V16.75Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        ),
      },
      date: "Nov 15",
      time: "2:00 PM",
      attendees: [
        {
          image: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
          alt: "Attendee 1",
        },
        {
          image:
            "https://i.ibb.co/S3QRdcX/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
          alt: "Attendee 2",
        },
      ],
      attendeeCount: 2,
    },
  ];

  return (
    <div id={id} className="flex justify-center my-cardMargin text-[#4A4A4A]">
      <div className="w-[875px] bg-cardBackground p-cardPadding rounded-cardBorderRadius shadow-cardShadow">
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-semibold text-[#333] tracking-tight">
            UPCOMING EVENTS
          </div>
          <div className="w-9 h-9 flex items-center justify-center bg-[rgba(19,196,204,0.08)] rounded-lg">
            <svg fill="none" viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="#13c4cc"
                d="M5 6.75C4.66848 6.75 4.35054 6.8817 4.11612 7.11612C3.8817 7.35054 3.75 7.66848 3.75 8V16C3.75 16.3315 3.8817 16.6495 4.11612 16.8839C4.35054 17.1183 4.66848 17.25 5 17.25H13C13.3315 17.25 13.6495 17.1183 13.8839 16.8839C14.1183 16.6495 14.25 16.3315 14.25 16V8C14.25 7.66848 14.1183 7.35054 13.8839 7.11612C13.6495 6.8817 13.3315 6.75 13 6.75H5ZM15.75 8.78622V8C15.75 7.27065 15.4603 6.57118 14.9445 6.05546C14.4288 5.53973 13.7293 5.25 13 5.25H5C4.27065 5.25 3.57118 5.53973 3.05546 6.05546C2.53973 6.57118 2.25 7.27065 2.25 8V16C2.25 16.7293 2.53973 17.4288 3.05546 17.9445C3.57118 18.4603 4.27065 18.75 5 18.75H13C13.7293 18.75 14.4288 18.4603 14.9445 17.9445C15.4603 17.4288 15.75 16.7293 15.75 16V15.213L19.2176 16.9465C19.4844 17.0798 19.7809 17.1427 20.0787 17.1293C20.3766 17.1159 20.6661 17.0266 20.9198 16.8699C21.1735 16.7131 21.3829 16.4942 21.5282 16.2338C21.6735 15.9734 21.7498 15.6802 21.75 15.382V8.61763C21.7498 8.31945 21.6735 8.02585 21.5282 7.76546C21.3829 7.50506 21.1735 7.28612 20.9198 7.12939C20.6661 6.97266 20.3766 6.88335 20.0787 6.86994C19.7809 6.85652 19.4845 6.91944 19.2177 7.05273L15.75 8.78622ZM15.75 10.4632V13.5361L19.8883 15.6047C19.8882 15.6047 19.8883 15.6047 19.8883 15.6047C19.9263 15.6237 19.9687 15.6328 20.0112 15.6308C20.0538 15.6289 20.0952 15.6162 20.1314 15.5938C20.1676 15.5714 20.1976 15.5401 20.2183 15.5029C20.2391 15.4657 20.25 15.4238 20.25 15.3812V8.61803C20.25 8.57543 20.2391 8.53354 20.2183 8.49635C20.1976 8.45915 20.1676 8.42787 20.1314 8.40548C20.0952 8.38309 20.0538 8.37033 20.0112 8.36842C19.9687 8.3665 19.9264 8.37547 19.8884 8.39448C19.8883 8.3945 19.8884 8.39446 19.8884 8.39448L15.75 10.4632Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

// EventCard Component
const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [isAttending, setIsAttending] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Close dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setShowConfirmDialog(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleJoinClick = () => {
    if (!isAttending) {
      setIsAttending(true);
    } else {
      setShowConfirmDialog(true);
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

  return (
    <div className="flex gap-4 p-4 rounded-lg border border-black/[0.08] transition-all duration-200 ease-in-out bg-white hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:border-black/[0.12]">
      <div className="w-10 h-10 rounded-md overflow-hidden shrink-0">
        <img
          src={event.image}
          alt={event.title}
          width={40}
          height={40}
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[15px] font-semibold text-[#142E53] m-0 flex-1">
            {event.title}
          </h3>
          <div
            ref={buttonRef}
            className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-all duration-200 ease-in-out relative ${
              isAttending
                ? "bg-[rgba(22,163,74,0.1)] text-[#16a34a]"
                : "bg-[rgba(59,110,145,0.08)]"
            } hover:bg-[rgba(59,110,145,0.12)]`}
            onClick={handleJoinClick}
            onMouseEnter={() => isAttending && setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            {isAttending ? (
              <svg
                className="w-[18px] h-[18px] text-[#16a34a] transition-all duration-200 ease-in-out"
                fill="none"
                viewBox="0 0 24 24"
              >
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
                className="w-4 h-4 text-[#3B6E91] transition-all duration-200 ease-in-out"
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

            {/* Tooltip */}
            <div
              className={`absolute bg-black/80 text-white px-2 py-1 rounded text-xs pointer-events-none whitespace-nowrap z-50 -top-7 left-1/2 transform -translate-x-1/2 transition-opacity duration-200 ease-in-out ${
                tooltipVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              Attending
            </div>

            {/* Confirm Dialog */}
            <div
              className={`absolute bg-white rounded-md p-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)] text-sm whitespace-nowrap z-50 border border-black/10 right-[calc(100%+8px)] top-1/2 transform -translate-y-1/2 flex items-center gap-3 transition-opacity duration-200 ease-in-out ${
                showConfirmDialog
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <span>Remove from event?</span>
              <div className="flex gap-2 ml-2">
                <button
                  className="px-2 py-1 rounded text-xs font-medium bg-[#ef4444] text-white hover:bg-[#dc2626] transition-all duration-200 ease-in-out"
                  onClick={handleConfirmYes}
                >
                  Yes
                </button>
                <button
                  className="px-2 py-1 rounded text-xs font-medium bg-[rgba(59,110,145,0.1)] text-[#3B6E91] hover:bg-[rgba(59,110,145,0.15)] transition-all duration-200 ease-in-out"
                  onClick={handleConfirmNo}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3 flex-wrap">
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

export default EventsCards;
