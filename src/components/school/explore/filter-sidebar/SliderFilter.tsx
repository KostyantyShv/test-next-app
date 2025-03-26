import React, { useState, useRef, useCallback, useEffect } from "react";

function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

interface SliderFilterProps {
  min: number;
  max: number;
  initialValue: number;
  value?: number;
  onSetValue?: (value: number) => void;
  unit?: string;
  label?: string;
  onChange?: (value: number) => void;
  formatValue?: (value: number) => string;
}

export const SliderFilter: React.FC<SliderFilterProps> = ({
  min,
  max,
  initialValue,
  value = initialValue, // Default to initialValue if no value is provided
  onSetValue = () => {},
  unit = "",
  label = "",
  onChange,
  formatValue = (value) => `${unit}${value.toLocaleString("en-US")}`,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const trackRef = useRef<HTMLDivElement>(null);

  const getPercentage = useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max]
  );

  const percentage = getPercentage(localValue);

  // Debounced version of onSetValue
  const debouncedSetValue = useCallback(
    debounce((newValue: number) => {
      onSetValue(newValue);
      console.log("Final value set after delay:", newValue);
    }, 100), // 300ms delay
    [onSetValue]
  );

  const updateSlider = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;

      const trackRect = trackRef.current.getBoundingClientRect();
      let percent = ((clientX - trackRect.left) / trackRect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));

      const newValue = Math.round(min + (percent / 100) * (max - min));
      setLocalValue(newValue);
      onChange?.(newValue);
      debouncedSetValue(newValue);
    },
    [min, max, onChange, debouncedSetValue]
  );

  // Mouse event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        updateSlider(e.clientX);
      }
    },
    [isDragging, updateSlider]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      updateSlider(e.clientX);
    },
    [updateSlider]
  );

  // Hover handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  // Touch event handlers for mobile support
  const handleTouchStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging) {
        updateSlider(e.touches[0].clientX);
      }
    },
    [isDragging, updateSlider]
  );

  // Sync local value with prop value when it changes externally
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Add/remove global event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className="p-2 relative">
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {label}
      </label>
      <div
        ref={trackRef}
        className="h-1 bg-[#e2e8f0] rounded relative my-2 mb-6 cursor-pointer"
        onClick={handleTrackClick}
      >
        <div
          className="absolute top-0 left-0 h-full bg-[#0093B0] rounded"
          style={{ width: `${percentage}%` }}
        />
        <div
          className={`absolute top-1/2 w-5 h-5 bg-[#0093B0] rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 hover:shadow-[0_0_0_4px_rgba(0,147,176,0.2)] flex items-center justify-center ${
            isDragging ? "scale-110" : ""
          }`}
          style={{ left: `${percentage}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          tabIndex={0}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            className="w-3 h-3 text-white"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.83 12L9 8.83L7.59 7.42L3 12L7.59 16.59L9 15.17L5.83 12ZM18.17 12L15 15.17L16.41 16.58L21 12L16.41 7.41L15 8.83L18.17 12Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          className={`absolute top-[-30px] bg-[#0093B0] text-white p-1 rounded text-xs whitespace-nowrap transition-opacity ${
            isDragging || isHovering ? "opacity-100" : "opacity-0"
          } pointer-events-none`}
          style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
        >
          {formatValue(localValue)}
          <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary-blue" />
        </div>
      </div>
      <div className="flex justify-between text-sm text-subtle-text">
        <div>{formatValue(min)}</div>
        <div>{formatValue(max)}</div>
      </div>
    </div>
  );
};

export default SliderFilter;
