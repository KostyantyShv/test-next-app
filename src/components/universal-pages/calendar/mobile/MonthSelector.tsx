interface MonthSelectorProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  currentDate,
  setCurrentDate,
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <button
        className="p-2 rounded-full hover:bg-[#F1F3F4]"
        onClick={handlePrevMonth}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#5F6368]">
          <path
            fill="currentColor"
            d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
          />
        </svg>
      </button>
      <span className="text-lg font-semibold text-[#202124]">
        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
      </span>
      <button
        className="p-2 rounded-full hover:bg-[#F1F3F4]"
        onClick={handleNextMonth}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#5F6368]">
          <path
            fill="currentColor"
            d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"
          />
        </svg>
      </button>
    </div>
  );
};
