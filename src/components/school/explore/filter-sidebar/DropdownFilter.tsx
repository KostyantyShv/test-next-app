import { useState } from "react";

interface DropdownFilterProps {
  options: { label: string; value: string }[];
  defaultValue: string;
  onChange?: (value: string) => void; // Added callback prop
}

export const DropdownFilter: React.FC<DropdownFilterProps> = ({
  options,
  defaultValue,
  onChange,
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue); // Added selected value state
  const handleOpenDropdown = () => setIsOpened(!isOpened);

  const handleOptionSelect = (value: string) => {
    setSelectedValue(value);
    onChange?.(value); // Call the onChange callback if it exists
    setIsOpened(false); // Close dropdown after selection
  };

  return (
    <div className="relative w-full">
      <button
        onClick={handleOpenDropdown}
        className="w-full p-2 bg-white border border-[rgba(0,0,0,0.15)] rounded text-left text-sm cursor-pointer flex justify-between items-center"
      >
        <span>
          {options.find((opt) => opt.value === selectedValue)?.label || "Any"}
        </span>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`absolute top-full left-0 w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-b shadow-[0_4px_12px_rgba(0,0,0,0.1)] max-h-[300px] overflow-y-auto z-[1001] ${
          isOpened ? "block" : "hidden"
        }`}
      >
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => handleOptionSelect(option.value)} // Added click handler
            className={`p-2 cursor-pointer text-sm ${
              option.value === selectedValue
                ? "bg-[#EBFCF4] text-[#016853]"
                : "hover:bg-[#f5f5f7]"
            } relative`}
            data-value={option.value}
          >
            {option.label}
            {option.value === selectedValue && (
              <span className="absolute right-3 text-header-green">✓</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
