import React from "react";

interface SearchBarProps {
  isVisible: boolean;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  isVisible,
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div
      className={`search-container-sticky ${isVisible ? "visible" : ""}`}
      style={{
        position: 'sticky',
        top: '61px',
        backgroundColor: '#E1E7EE',
        zIndex: 9,
        padding: '12px 16px 12px',
        display: isVisible ? 'block' : 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
      }}
    >
      <div className="search-bar" style={{ position: 'relative' }}>
        <input
          type="search"
          className="search-input"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 16px 10px 40px',
            backgroundColor: 'white',
            border: '1px solid #D1D5DB',
            borderRadius: '8px',
            fontSize: '15px',
            color: '#4A4A4A',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
          }}
          onFocus={(e) => {
            e.target.style.outline = 'none';
            e.target.style.borderColor = '#0B6333';
            e.target.style.boxShadow = '0 0 0 2px rgba(11, 99, 51, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#D1D5DB';
            e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
          }}
        />
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9CA3AF',
            width: '18px',
            height: '18px',
            pointerEvents: 'none'
          }}
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </div>
  );
};
