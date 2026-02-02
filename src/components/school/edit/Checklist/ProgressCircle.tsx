interface ProgressCircleProps {
  progress: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-circle">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle className="bg" cx="12" cy="12" r={radius} />
        <circle
          className="progress"
          cx="12"
          cy="12"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="tooltip">{Math.round(progress)}% Complete</div>
    </div>
  );
};

export default ProgressCircle;
