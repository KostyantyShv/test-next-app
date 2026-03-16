import { ViewType } from "../types/view";

export const ViewControls: React.FC<{
  view: ViewType;
  setView: (view: ViewType) => void;
  onJumpToToday: () => void;
}> = ({ view, setView, onJumpToToday }) => (
  <div className="calendar-view-controls flex gap-2 items-center">
    <button
      className="calendar-today-button h-11 rounded-md border border-[var(--border-color)] bg-white px-4 text-sm font-medium text-[var(--subtle-text)] transition-colors hover:bg-[#F8F9FB] hover:text-[var(--bold-text)]"
      onClick={onJumpToToday}
    >
      Today
    </button>
    <button
      className={`calendar-view-button flex h-11 w-11 items-center justify-center rounded-md border transition-colors ${
        view === "list"
          ? "border-[#D8DCE6] bg-[#F8F9FB] text-[var(--bold-text)]"
          : "border-[var(--border-color)] bg-white text-[var(--subtle-text)] hover:bg-[#F8F9FB] hover:text-[var(--bold-text)]"
      }`}
      onClick={() => setView("list")}
      aria-label="List view"
    >
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-5 h-5"
      >
        <path fill="none" d="M0 0h24v24H0V0z"></path>
        <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"></path>
      </svg>
    </button>
    <button
      className={`calendar-view-button flex h-11 w-11 items-center justify-center rounded-md border transition-colors ${
        view === "calendar"
          ? "border-[#D8DCE6] bg-[#F8F9FB] text-[var(--bold-text)]"
          : "border-[var(--border-color)] bg-white text-[var(--subtle-text)] hover:bg-[#F8F9FB] hover:text-[var(--bold-text)]"
      }`}
      onClick={() => setView("calendar")}
      aria-label="Calendar view"
    >
      <svg
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
        className="w-5 h-5"
      >
        <rect
          ry="2"
          rx="2"
          height="18"
          width="18"
          y="4"
          x="3"
          stroke="currentColor"
        ></rect>
        <line y2="6" x2="16" y1="2" x1="16" stroke="currentColor"></line>
        <line y2="6" x2="8" y1="2" x1="8" stroke="currentColor"></line>
        <line y2="10" x2="21" y1="10" x1="3" stroke="currentColor"></line>
      </svg>
    </button>
  </div>
);
