import { useState, useEffect, useRef } from "react";
import { formatDateTime } from "./utils/helpers";
import { Event } from "./types/event";

interface EventModalProps {
  isOpen: boolean;
  closeModal: () => void;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  currentEditId: number | null;
  maxEvents: number;
}

const EVENT_IMAGES = [
  "https://i.ibb.co/640kJN2/c1.jpg",
  "https://i.ibb.co/NKffPZQ/c4.jpg",
  "https://i.ibb.co/rkkdzYx/c6.jpg",
];

export default function EventModalContent({
  isOpen,
  closeModal,
  events,
  setEvents,
  currentEditId,
  maxEvents,
}: EventModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [image, setImage] = useState(EVENT_IMAGES[0]);
  const [eventType, setEventType] = useState<
    "zoom" | "teams" | "session" | null
  >(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getEventStatus = (
    startDate: string,
    endDate: string
  ): "live" | "scheduled" | "passed" => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now < start) return "scheduled";
    if (now > end) return "passed";
    return "live";
  };

  useEffect(() => {
    if (isOpen) {
      if (currentEditId) {
        const event = events.find((e) => e.id === currentEditId);
        if (event) {
          setTitle(event.title);
          setDescription(event.description);
          setStartDateTime(event.startDate);
          setEndDateTime(event.endDate);
          setImage(event.image);
          setEventType(event.type);
        }
      } else {
        const now = new Date();
        const minutes = Math.ceil(now.getMinutes() / 15) * 15;
        now.setMinutes(minutes, 0, 0);
        const endDate = new Date(now);
        endDate.setHours(endDate.getHours() + 1);
        setTitle("");
        setDescription("");
        setStartDateTime(formatDateTime(now));
        setEndDateTime(formatDateTime(endDate));
        setImage(EVENT_IMAGES[0]);
        setEventType(null);
      }
    }
  }, [isOpen, currentEditId, events]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventType) {
      alert("Please select an event type");
      return;
    }
    if (new Date(endDateTime) <= new Date(startDateTime)) {
      alert("End date must be after start date");
      return;
    }
    if (!currentEditId && events.length >= maxEvents) {
      alert(
        "Maximum number of events reached. Please delete an existing event first."
      );
      return;
    }

    const newEvent = {
      id: currentEditId || Date.now(),
      title,
      type: eventType,
      description,
      image,
      startDate: startDateTime,
      endDate: endDateTime,
      status: getEventStatus(startDateTime, endDateTime),
      pinned: currentEditId
        ? events.find((e) => e.id === currentEditId)?.pinned || false
        : false,
      order: currentEditId
        ? events.find((e) => e.id === currentEditId)?.order || 0
        : events.length,
    };

    setEvents((prev) =>
      currentEditId
        ? prev.map((e) => (e.id === currentEditId ? newEvent : e))
        : [...prev, newEvent]
    );
    closeModal();
  };

  const handleDelete = () => {
    if (currentEditId) {
      setEvents((prev) => prev.filter((e) => e.id !== currentEditId));
      closeModal();
    }
  };

  const handleImageChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset input value to allow selecting the same file again
    if (e.target) {
      e.target.value = "";
    }
  };

  const handleTypeSelect = (type: "zoom" | "teams" | "session") => {
    setEventType(type);
    setIsDropdownOpen(false);
  };

  const getTypeDisplay = (type: "zoom" | "teams" | "session" | null) => {
    switch (type) {
      case "zoom":
        return {
          text: "Zoom",
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
        };
      case "teams":
        return {
          text: "Teams",
          color: "#608CFD",
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 55 55">
              <path
                fill="currentColor"
                d="M28.0017 15.7696C28.9609 15.1655 30.0969 14.9053 31.2235 15.0316C32.35 15.158 33.4001 15.6634 34.2017 16.465C34.2065 16.4697 34.2112 16.4745 34.216 16.4793C34.7116 16.347 35.2288 16.3033 35.7436 16.3522C36.5245 16.4265 37.2706 16.7113 37.9023 17.1764C38.534 17.6414 39.0277 18.2692 39.3306 18.9927C39.6335 19.7163 39.7343 20.5085 39.6223 21.2849C39.5339 21.8974 39.3157 22.4818 38.9845 23H41.3333C41.8856 23 42.3333 23.4477 42.3333 24V30.6667C42.3333 32.3464 41.6661 33.9573 40.4783 35.145C39.3063 36.317 37.7222 36.9823 36.0665 36.9997C35.7186 37.6388 35.2783 38.2306 34.7545 38.7545C33.3167 40.1923 31.3667 41 29.3333 41C25.9158 41 23.0295 38.7476 22.0364 35.6667H16C15.4477 35.6667 15 35.219 15 34.6667V21.3333C15 20.7811 15.4477 20.3333 16 20.3333H25.6773C25.6329 19.6676 25.7218 18.9951 25.9442 18.3563C26.317 17.2858 27.0425 16.3737 28.0017 15.7696Z"
              />
            </svg>
          ),
        };
      case "session":
        return {
          text: "1:1 Session",
          color: "#E47EF4",
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 38 38">
              <path
                strokeWidth="0.25"
                stroke="currentColor"
                fill="currentColor"
                d="M12.3205 25.7152H21.1938C21.8457 26.6366 22.9139 27.2235 24.1101 27.2235C26.0733 27.2235 27.674 25.6231 27.6746 23.6601C27.693 22.4994 27.1241 21.4509 26.2582 20.8003V12.2557V12.1307H26.1332H23.5913V11.943C23.5913 11.6717 23.3698 11.4502 23.0985 11.4502C22.8271 11.4502 22.6056 11.943V12.1307H19.1219V11.943C19.1219 11.6717 18.9005 11.4502 18.6291 11.4502C18.3578 11.4502 18.1363 11.6717 18.1363 11.943V12.1307H14.6342V11.943C14.6342 11.6717 14.4127 11.4502 14.1414 11.4502C13.87 11.4502 13.6486 11.6717 13.6486 11.943V12.1307H11.125H11V12.2557V24.3948C11 25.1259 11.5893 25.7152 12.3205 25.7152Z"
              />
            </svg>
          ),
        };
      default:
        return { text: "Select event type", color: "#4A4A4A", icon: null };
    }
  };

  if (!isOpen) return null;

  const typeDisplay = getTypeDisplay(eventType);

  return (
    <>
      <div className="p-6 border-b border-theme flex justify-between items-center">
        <h2 className="text-dark text-2xl font-bold">
          {currentEditId ? "Edit Event" : "Create Event"}
        </h2>
        <button
          onClick={closeModal}
          className="p-2 hover:bg-background rounded-full transition-colors"
        >
          <svg className="w-3 h-3" fill="var(--subtle-text)" viewBox="0 0 12 12">
            <path d="M7.46875 6L10.8438 2.65625C11.0312 2.46875 11.0312 2.125 10.8438 1.9375L10.0625 1.15625C9.875 0.96875 9.53125 0.96875 9.34375 1.15625L6 4.53125L2.625 1.15625C2.4375 0.96875 2.09375 0.96875 1.90625 1.15625L1.125 1.9375C0.9375 2.125 0.9375 2.46875 1.125 2.65625L4.5 6L1.125 9.375C0.9375 9.5625 0.9375 9.90625 1.125 10.0938L1.90625 10.875C2.09375 11.0625 2.4375 11.0625 2.625 10.875L6 7.5L9.34375 10.875C9.53125 11.0625 9.875 11.0625 10.0625 10.875L10.8438 10.0938C11.0312 9.90625 11.0312 9.5625 10.8438 9.375L7.46875 6Z" />
          </svg>
        </button>
      </div>
      <form id="eventForm" onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <label className="block font-semibold text-default mb-2 text-sm">
            Event Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event title"
            required
            className="w-full p-3 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--brand-teal)';
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--border-color)';
            }}
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold text-default mb-2 text-sm">
            Event Type
          </label>
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full p-3 bg-surface-secondary border border-theme rounded-lg text-sm text-default text-left flex items-center gap-2 transition-all"
              style={{ 
                color: typeDisplay.color,
                fontFamily: 'var(--font-inter), Inter, sans-serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface-color)';
                e.currentTarget.style.borderColor = 'var(--brand-teal)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              <span className="flex items-center gap-2">
                {typeDisplay.icon}
                {typeDisplay.text}
              </span>
              <svg
                className={`ml-auto w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              ref={dropdownRef}
              className={`absolute top-[calc(100%+4px)] left-0 right-0 bg-surface border border-theme rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-[100] transition-all ${
                isDropdownOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
              }`}
            >
              <div
                onClick={() => handleTypeSelect("zoom")}
                className="p-2 flex items-center gap-2 cursor-pointer hover:bg-surface-secondary rounded-t-lg"
                style={{ color: "#15B7C3" }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 38 38">
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.2"
                    stroke="currentColor"
                    d="M22.8865 17.1133L27.3332 14.42V23.5867L22.8865 20.8867M10.6665 14.42H20.8532C21.3925 14.42 21.9096 14.6342 22.291 15.0155C22.6723 15.3969 22.8865 15.9141 22.8865 16.4533V23.5867H12.6998C12.4323 23.5867 12.1673 23.5339 11.9202 23.4313C11.6731 23.3287 11.4486 23.1783 11.2597 22.9888C11.0708 22.7992 10.9212 22.5743 10.8194 22.3268C10.7176 22.0794 10.6656 21.8142 10.6665 21.5467V14.42Z"
                  />
                </svg>
                Zoom
              </div>
              <div
                onClick={() => handleTypeSelect("teams")}
                className="p-2 flex items-center gap-2 cursor-pointer hover:bg-surface-secondary"
                style={{ color: "#608CFD" }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 55 55">
                  <path
                    fill="currentColor"
                    d="M28.0017 15.7696C28.9609 15.1655 30.0969 14.9053 31.2235 15.0316C32.35 15.158 33.4001 15.6634 34.2017 16.465C34.2065 16.4697 34.2112 16.4745 34.216 16.4793C347116 16.347 35.2288 16.3033 35.7436 16.3522C36.5245 16.4265 37.2706 16.7113 37.9023 17.1764C38.534 17.6414 39.0277 18.2692 39.3306 18.9927C39.6335 19.7163 39.7343 20.5085 39.6223 21.2849C39.5339 21.8974 39.3157 22.4818 38.9845 23H41.3333C41.8856 23 42.3333 23.4477 42.3333 24V30.6667C42.3333 32.3464 41.6661 33.9573 40.4783 35.145C39.3063 36.317 37.7222 36.9823 36.0665 36.9997C35.7186 37.6388 35.2783 38.2306 34.7545 38.7545C33.3167 40.1923 31.3667 41 29.3333 41C25.9158 41 23.0295 38.7476 22.0364 35.6667H16C15.4477 35.6667 15 35.219 15 34.6667V21.3333C15 20.7811 15.4477 20.3333 16 20.3333H25.6773C25.6329 19.6676 25.7218 18.9951 25.9442 18.3563C26.317 17.2858 27.0425 16.3737 28.0017 15.7696Z"
                  />
                </svg>
                Teams
              </div>
              <div
                onClick={() => handleTypeSelect("session")}
                className="p-2 flex items-center gap-2 cursor-pointer hover:bg-surface-secondary rounded-b-lg"
                style={{ color: "#E47EF4" }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 38 38">
                  <path
                    strokeWidth="0.25"
                    stroke="currentColor"
                    fill="currentColor"
                    d="M12.3205 25.7152H21.1938C21.8457 26.6366 22.9139 27.2235 24.1101 27.2235C26.0733 27.2235 27.674 25.6231 27.6746 23.6601C27.693 22.4994 27.1241 21.4509 26.2582 20.8003V12.2557V12.1307H26.1332H23.5913V11.943C23.5913 11.6717 23.3698 11.4502 23.0985 11.4502C22.8271 11.4502 22.6056 11.943V12.1307H19.1219V11.943C19.1219 11.6717 18.9005 11.4502 18.6291 11.4502C18.3578 11.4502 18.1363 11.6717 18.1363 11.943V12.1307H14.6342V11.943C14.6342 11.6717 14.4127 11.4502 14.1414 11.4502C13.87 11.4502 13.6486 11.6717 13.6486 11.943V12.1307H11.125H11V12.2557V24.3948C11 25.1259 11.5893 25.7152 12.3205 25.7152Z"
                  />
                </svg>
                1:1 Session
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block font-semibold text-default mb-2 text-sm">
            Event Image
          </label>
          <div className="border border-theme rounded-lg overflow-hidden">
            <div className="p-4 flex md:items-center max-md:flex-col gap-6">
              <div className="w-[180px] max-md:w-full h-[120px] max-md:h-[200px] rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt="Event image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm text-default mb-2">
                  Recommended dimensions of <strong>800×600</strong>
                </div>
                <button
                  type="button"
                  onClick={handleImageChange}
                  className="flex items-center gap-2 px-4 py-1.5 border border-theme rounded-full text-sm text-default bg-transparent hover:bg-background transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 48 48">
                    <rect fill="#F0F9FF" rx="24" height="48" width="48" />
                    <path
                      fill="#283593"
                      d="M17.3307 13C16.8887 13 16.4648 13.1756 16.1522 13.4882C15.8397 13.8007 15.6641 14.2246 15.6641 14.6667V33.3333C15.6641 33.7754 15.8397 34.1993 16.1522 34.5118C16.4648 34.8244 16.8887 35 17.3307 35H30.6641C31.1061 35 31.53 34.8244 31.8426 34.5118C32.1551 34.1993 32.3307 33.7754 32.3307 33.3333V19.6667H27.9974C27.3786 19.6667 26.7851 19.4208 26.3475 18.9832C25.9099 18.5457 25.6641 17.9522 25.6641 17.3333V13H17.3307Z"
                    />
                  </svg>
                  Choose Image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block font-semibold text-default mb-2 text-sm">
            Event Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Write event description here..."
            required
            className="w-full p-3 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            onFocus={(e) => {
              (e.target as HTMLTextAreaElement).style.borderColor = 'var(--brand-teal)';
            }}
            onBlur={(e) => {
              (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border-color)';
            }}
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold text-default mb-2 text-sm">
            Schedule
          </label>
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex-1">
              <label className="block text-dark text-[13px] font-medium mb-1.5">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                required
                step="900"
                className="w-full p-3 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none cursor-pointer"
                style={{ 
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  color: 'var(--text-default)',
                  backgroundColor: 'var(--surface-color)',
                  borderColor: 'var(--border-color)',
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = 'var(--brand-teal)';
                  target.style.backgroundColor = 'var(--surface-secondary)';
                  target.style.boxShadow = '0 0 0 3px rgba(2, 197, 175, 0.1)';
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = 'var(--border-color)';
                  target.style.backgroundColor = 'var(--surface-color)';
                  target.style.boxShadow = 'none';
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (document.activeElement !== target) {
                    target.style.borderColor = 'var(--brand-teal)';
                    target.style.backgroundColor = 'var(--surface-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (document.activeElement !== target) {
                    target.style.borderColor = 'var(--border-color)';
                    target.style.backgroundColor = 'var(--surface-color)';
                  }
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-dark text-[13px] font-medium mb-1.5">
                End Date & Time
              </label>
              <input
                type="datetime-local"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                required
                step="900"
                className="w-full p-3 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none cursor-pointer"
                style={{ 
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  color: 'var(--text-default)',
                  backgroundColor: 'var(--surface-color)',
                  borderColor: 'var(--border-color)',
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = 'var(--brand-teal)';
                  target.style.backgroundColor = 'var(--surface-secondary)';
                  target.style.boxShadow = '0 0 0 3px rgba(2, 197, 175, 0.1)';
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = 'var(--border-color)';
                  target.style.backgroundColor = 'var(--surface-color)';
                  target.style.boxShadow = 'none';
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (document.activeElement !== target) {
                    target.style.borderColor = 'var(--brand-teal)';
                    target.style.backgroundColor = 'var(--surface-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (document.activeElement !== target) {
                    target.style.borderColor = 'var(--border-color)';
                    target.style.backgroundColor = 'var(--surface-color)';
                  }
                }}
              />
            </div>
          </div>
        </div>
      </form>
      <div className="p-6 border-t border-theme flex justify-between items-center">
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer text-sm"
          style={{ color: '#f93a37' }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <path
              fill="#f93a37"
              d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
          Delete
        </button>
        <div className="flex gap-3">
          <button
            onClick={closeModal}
            className="px-6 py-3 bg-surface-secondary border border-theme rounded-lg text-sm font-semibold text-default hover:opacity-90 transition-opacity"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              // Trigger form validation and submit
              const form = document.getElementById('eventForm') as HTMLFormElement;
              if (form) {
                // Check if form is valid
                if (!form.checkValidity()) {
                  form.reportValidity();
                  return;
                }
                // Use requestSubmit to trigger form submit with validation
                form.requestSubmit();
              }
            }}
            className="px-6 py-3 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--brand-teal)' }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
