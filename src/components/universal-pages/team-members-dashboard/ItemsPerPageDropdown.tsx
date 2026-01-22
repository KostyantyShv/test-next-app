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
        className={`items-dropdown cursor-pointer rounded-md transition-colors flex items-center ${
          isOpen ? 'bg-gray-100' : 'hover:bg-gray-100'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '0.5rem',
          gap: '0.5rem',
          fontSize: '0.875rem',
          color: '#4B5563',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
        }}
      >
        Items Per Page: <span>{value}</span>
        <svg
          className={`icon-chevron-down-12 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          style={{ flexShrink: 0 }}
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
        className={`items-dropdown-menu absolute top-full left-0 bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] border border-gray-200 min-w-[120px] z-10 ${
          isOpen ? "block" : "hidden"
        }`}
        style={{
          marginTop: '0.5rem',
        }}
      >
        {[10, 25, 50, 100].map((itemValue) => (
          <div
            key={itemValue}
            className="items-dropdown-item cursor-pointer transition-colors"
            onClick={() => {
              onChange(itemValue);
              setIsOpen(false);
            }}
            style={{
              padding: '0.625rem 1rem',
              fontSize: '0.875rem',
              color: '#4B5563',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F3F4F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {itemValue}
          </div>
        ))}
      </div>
    </div>
  );
};
