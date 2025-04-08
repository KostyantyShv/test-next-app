import React, { useState, useRef, useCallback, useEffect } from "react";

/**
 * Debounce function to limit how often a function is called
 */
function debounce<T extends (...args: Parameters<T>) => void>(
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
  debounceTime?: number;
}

export const SliderFilter: React.FC<SliderFilterProps> = ({
  min,
  max,
  initialValue,
  value = initialValue,
  onSetValue = () => {},
  unit = "",
  label = "",
  onChange,
  formatValue,
  debounceTime = 100,
}) => {
  // State management
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const trackRef = useRef<HTMLDivElement>(null);

  // Default format value function if not provided
  const defaultFormatValue = useCallback(
    (val: number) => `${unit}${val.toLocaleString("en-US")}`,
    [unit]
  );

  // Use provided formatValue function or default
  const formatValueFn = formatValue || defaultFormatValue;

  // Calculate percentage for styling
  const getPercentage = useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max]
  );

  const percentage = getPercentage(localValue);

  // Debounced version of onSetValue with configurable delay
  const debouncedSetValue = useCallback(
    debounce((newValue: number) => {
      onSetValue(newValue);
    }, debounceTime),
    [onSetValue, debounceTime]
  );

  // Update slider value based on pointer position
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

  // Event handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (isDragging) {
        updateSlider(e.clientX);
      }
    },
    [isDragging, updateSlider]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
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

  // Keep local value in sync with prop value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Keyboard accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let newValue = localValue;
      const step = (max - min) / 100;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          newValue = Math.min(max, localValue + step);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          newValue = Math.max(min, localValue - step);
          break;
        case "Home":
          newValue = min;
          break;
        case "End":
          newValue = max;
          break;
        default:
          return;
      }

      e.preventDefault();
      setLocalValue(newValue);
      onChange?.(newValue);
      onSetValue(newValue);
    },
    [localValue, min, max, onChange, onSetValue]
  );

  return (
    <div className="p-2 relative">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {label}
        </label>
      )}
      <div
        ref={trackRef}
        className="h-1 bg-[#e2e8f0] rounded relative my-2 mb-6 cursor-pointer"
        onClick={handleTrackClick}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={localValue}
        aria-label={label || "Slider"}
      >
        {/* Filled track */}
        <div
          className="absolute top-0 left-0 h-full bg-[#0093B0] rounded"
          style={{ width: `${percentage}%` }}
        />

        {/* Slider thumb */}
        <div
          className={`absolute top-1/2 w-5 h-5 bg-[#0093B0] rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 hover:shadow-md flex items-center justify-center ${
            isDragging ? "scale-110 shadow-lg" : ""
          }`}
          style={{ left: `${percentage}%` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            className="w-3 h-3 text-white"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.83 12L9 8.83L7.59 7.42L3 12L7.59 16.59L9 15.17L5.83 12ZM18.17 12L15 15.17L16.41 16.58L21 12L16.41 7.41L15 8.83L18.17 12Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Value tooltip */}
        <div
          className={`absolute top-[-30px] bg-[#0093B0] text-white p-1 rounded text-xs whitespace-nowrap transition-opacity ${
            isDragging || isHovering ? "opacity-100" : "opacity-0"
          } pointer-events-none`}
          style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
          aria-hidden="true"
        >
          {formatValueFn(localValue)}
          <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#0093B0]" />
        </div>
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between text-sm text-gray-500">
        <div>{formatValueFn(min)}</div>
        <div>{formatValueFn(max)}</div>
      </div>
    </div>
  );
};

export default SliderFilter;
