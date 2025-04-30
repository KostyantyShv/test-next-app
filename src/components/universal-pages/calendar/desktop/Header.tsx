export const CalendarHeader: React.FC<{
  currentMonth: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}> = ({ currentMonth, onPrevMonth, onNextMonth }) => (
  <div className="flex items-center gap-6">
    <button
      className="w-8 h-8 p-1 rounded-full flex items-center justify-center bg-transparent border-none hover:bg-[#5F63681A]"
      onClick={onPrevMonth}
    >
      <svg viewBox="0 0 25 40" className="w-6 h-6 fill-[#5F6368]">
        <path d="M24.2349 4.20503C24.5099 4.47811 24.5107 4.92268 24.2367 5.19673L9.92837 19.505C9.65501 19.7784 9.65501 20.2216 9.92837 20.495L24.2367 34.8033C24.5107 35.0773 24.5099 35.5219 24.2349 35.795L20.495 39.5085C20.2214 39.7802 19.7795 39.7795 19.5068 39.5068L0.495041 20.495C0.221674 20.2216 0.221673 19.7784 0.49504 19.505L19.5068 0.49323C19.7795 0.220545 20.2214 0.219764 20.495 0.491483L24.2349 4.20503Z"></path>
      </svg>
    </button>
    <h2 className="text-xl font-semibold text-[#202124]">{currentMonth}</h2>
    <button
      className="w-8 h-8 p-1 rounded-full flex items-center justify-center bg-transparent border-none hover:bg-[#5F63681A]"
      onClick={onNextMonth}
    >
      <svg viewBox="0 0 25 40" className="w-6 h-6 fill-[#5F6368]">
        <path d="M0.494387 4.20556C0.221231 4.478720.22099 4.92152 0.493848 5.19497L14.7733 19.5056C15.0459 19.7788 15.0459 20.2212 14.7733 20.4944L0.493849 34.805C0.220991 35.0785 0.221231 35.5213 0.494388 35.7944L4.20498 39.505C4.47834 39.7784 4.92156 39.7784 5.19493 39.505L24.205 20.495C24.4783 20.2216 24.4783 19.7784 24.205 19.505L5.19493 0.494976C4.92156 0.221609 4.47834 0.221608 4.20498 0.494975L0.494387 4.20556Z"></path>
      </svg>
    </button>
  </div>
);
