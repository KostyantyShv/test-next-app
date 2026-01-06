interface ProgressCircleProps {
  progress: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="w-5 h-5 max-md:w-5 max-md:h-5 relative max-md:relative mr-3 max-md:mr-0 group max-md:group">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="rotate-[-90deg] max-md:rotate-[-90deg]"
      >
        <circle
          className="bg max-md:bg"
          cx="10"
          cy="10"
          r="8"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ stroke: '#e5e7eb' }}
        />
        <circle
          className="progress max-md:progress"
          cx="10"
          cy="10"
          r="8"
          fill="none"
          strokeWidth="2"
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
        className="tooltip absolute text-white text-xs py-1 px-2 rounded top-[-30px] left-1/2 -translate-x-1/2 opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 z-20 whitespace-nowrap max-md:hidden"
        style={{ background: 'var(--dark-text)' }}
      >
        {Math.round(progress)}% Complete
      </div>
    </div>
  );
};

export default ProgressCircle;
