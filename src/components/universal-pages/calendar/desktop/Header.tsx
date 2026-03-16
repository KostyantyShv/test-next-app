export const CalendarHeader: React.FC<{
  currentMonth: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}> = ({ currentMonth, onPrevMonth, onNextMonth }) => (
  <div className="flex items-center gap-4">
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] bg-[#F8F9FB] text-[var(--subtle-text)] transition-colors hover:bg-white hover:text-[var(--bold-text)]"
      onClick={onPrevMonth}
      aria-label="Previous month"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
        <path d="M12.78 15.53a.75.75 0 0 1-1.06 0L6.72 10.53a.75.75 0 0 1 0-1.06l5-5a.75.75 0 1 1 1.06 1.06L8.31 10l4.47 4.47a.75.75 0 0 1 0 1.06Z"></path>
      </svg>
    </button>

    <h2 className="min-w-[250px] text-center text-[28px] font-medium tracking-[-0.02em] text-[var(--bold-text)]">
      {currentMonth}
    </h2>

    <button
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] bg-[#F8F9FB] text-[var(--subtle-text)] transition-colors hover:bg-white hover:text-[var(--bold-text)]"
      onClick={onNextMonth}
      aria-label="Next month"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
        <path d="M7.22 15.53a.75.75 0 0 0 1.06 0l5-5a.75.75 0 0 0 0-1.06l-5-5a.75.75 0 0 0-1.06 1.06L11.69 10l-4.47 4.47a.75.75 0 0 0 0 1.06Z"></path>
      </svg>
    </button>
  </div>
);
