export const CalendarHeader: React.FC<{
  currentMonth: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}> = ({ currentMonth, onPrevMonth, onNextMonth }) => (
  <div 
  className="flex items-center"
  style={{
    gap: '12px',
  }}
>
    <span 
      className="month-year-label"
      style={{
        fontSize: '15px',
        fontWeight: 500,
        color: '#4A4A4A',
        letterSpacing: '0.2px',
        userSelect: 'none',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
      }}
    >
      {currentMonth}
    </span>
    <div 
      className="flex items-center"
      style={{
        gap: '6px',
        marginLeft: '4px',
      }}
    >
      <button
        className="nav-button prev rounded-full flex items-center justify-center cursor-pointer transition-all"
        onClick={onPrevMonth}
        aria-label="Previous month"
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '1.5px solid #DFDDDB',
          backgroundColor: '#ffffff',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f5f5f5';
          e.currentTarget.style.borderColor = '#c9c7c5';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.borderColor = '#DFDDDB';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.backgroundColor = '#ebebeb';
          e.currentTarget.style.transform = 'scale(0.96)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.backgroundColor = '#f5f5f5';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <svg 
          viewBox="0 0 10 10" 
          style={{
            width: '10px',
            height: '10px',
            stroke: '#1B1B1B',
            strokeWidth: 2,
            fill: 'none',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            transform: 'translateX(-0.5px)',
          }}
        >
          <polyline points="7,1 3,5 7,9"></polyline>
        </svg>
      </button>

      <button
        className="nav-button next rounded-full flex items-center justify-center cursor-pointer transition-all"
        onClick={onNextMonth}
        aria-label="Next month"
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '1.5px solid #DFDDDB',
          backgroundColor: '#ffffff',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f5f5f5';
          e.currentTarget.style.borderColor = '#c9c7c5';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.borderColor = '#DFDDDB';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.backgroundColor = '#ebebeb';
          e.currentTarget.style.transform = 'scale(0.96)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.backgroundColor = '#f5f5f5';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <svg 
          viewBox="0 0 10 10" 
          style={{
            width: '10px',
            height: '10px',
            stroke: '#1B1B1B',
            strokeWidth: 2,
            fill: 'none',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            transform: 'translateX(0.5px)',
          }}
        >
          <polyline points="3,1 7,5 3,9"></polyline>
        </svg>
      </button>
    </div>
  </div>
);
