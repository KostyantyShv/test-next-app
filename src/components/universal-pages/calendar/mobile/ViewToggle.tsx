interface ViewToggleProps {
  view: "calendar" | "list";
  setView: (view: "calendar" | "list") => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
  return (
    <div className="flex bg-[#F1F3F4] rounded-full p-1">
      <button
        className={`px-4 py-2 rounded-full flex items-center gap-2 ${
          view === "calendar" ? "bg-white text-[#202124]" : "text-[#5F6368]"
        }`}
        onClick={() => setView("calendar")}
      >
        <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5">
          <rect
            x="3"
            y="4"
            width="18"
            height="18"
            rx="2"
            ry="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="16"
            y1="2"
            x2="16"
            y2="6"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="8"
            y1="2"
            x2="8"
            y2="6"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="3"
            y1="10"
            x2="21"
            y2="10"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        Calendar
      </button>
      <button
        className={`px-4 py-2 rounded-full flex items-center gap-2 ${
          view === "list" ? "bg-white text-[#202124]" : "text-[#5F6368]"
        }`}
        onClick={() => setView("list")}
      >
        <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5">
          <path
            fill="currentColor"
            d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"
          />
        </svg>
        List
      </button>
    </div>
  );
};
