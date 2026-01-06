interface ProgressCircleProps {
  progress: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="w-6 h-6 relative mr-3 group">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="rotate-[-90deg]"
      >
        <circle
          className="bg"
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ stroke: 'var(--gray-200)' }}
        />
        <circle
          className="progress"
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ 
            transition: "stroke-dashoffset 0.3s ease",
            stroke: 'var(--header-green)',
          }}
        />
      </svg>
      <div 
        className="tooltip absolute text-white text-xs py-1 px-2 rounded top-[-30px] left-1/2 -translate-x-1/2 opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 z-20 whitespace-nowrap"
        style={{ background: 'var(--dark-text)' }}
      >
        {Math.round(progress)}% Complete
      </div>
    </div>
  );
};

export default ProgressCircle;
