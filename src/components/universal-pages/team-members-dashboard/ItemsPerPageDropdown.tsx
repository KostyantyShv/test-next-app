import { useState } from "react";
import { useOutsideClick } from "./hooks/useOutsideClick";

interface ItemsPerPageDropdownProps {
  value: number;
  onChange: (value: number) => void;
}

export const ItemsPerPageDropdown: React.FC<ItemsPerPageDropdownProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useOutsideClick(() => setIsOpen(false));

  return (
    <div className="items-per-page relative" ref={dropdownRef}>
      <div
        className="items-dropdown cursor-pointer p-2 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        Items Per Page: <span>{value}</span>
        <svg
          className={`icon-chevron-down-12 w-3 h-3 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <path
            d="M2.25 4.5L6 8.25L9.75 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className={`items-dropdown-menu absolute top-full left-0 mt-2 bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] border border-gray-200 min-w-[120px] z-10 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {[10, 25, 50, 100].map((itemValue) => (
          <div
            key={itemValue}
            className="items-dropdown-item px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => {
              onChange(itemValue);
              setIsOpen(false);
            }}
          >
            {itemValue}
          </div>
        ))}
      </div>
    </div>
  );
};
