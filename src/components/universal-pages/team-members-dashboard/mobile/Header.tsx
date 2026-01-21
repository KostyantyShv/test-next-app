import React from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  currentTeamType: string;
  filterCount: number;
  onTeamTypeClick: () => void;
  onSearchToggle: () => void;
  onAddMemberClick: () => void;
  onFiltersClick: () => void;
  onOptionsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTeamType,
  filterCount,
  onTeamTypeClick,
  onSearchToggle,
  onAddMemberClick,
  onFiltersClick,
  onOptionsClick,
}) => {
  const router = useRouter();

  return (
    <header 
      className="header"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px',
        background: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 1001,
        flexShrink: 0,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        height: '60px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
      }}
    >
      <div 
        className="header-left"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        {/* Back Button */}
        <button
          className="header-btn back-btn"
          onClick={() => router.back()}
          aria-label="Go Back"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6B7280',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F3F4F6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ width: '20px', height: '20px' }}
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Title with Chevron */}
        <div 
          className="page-title-group"
          onClick={onTeamTypeClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            padding: '6px 10px',
            borderRadius: '20px',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F3F4F6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <span 
            className="page-title"
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#464646',
              letterSpacing: '-0.01em',
              lineHeight: 1
            }}
          >
            {currentTeamType.charAt(0).toUpperCase() + currentTeamType.slice(1)}
          </span>
          <div 
            className="title-chevron"
            style={{
              color: '#4A4A4A',
              width: '18px',
              height: '18px',
              marginTop: '1px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ width: '100%', height: '100%' }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
      <div 
        className="header-right"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {/* Search Button */}
        <button
          className="header-btn"
          onClick={onSearchToggle}
          aria-label="Toggle Search"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6B7280',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F3F4F6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ width: '20px', height: '20px' }}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        {/* Add Button - Dark circle with white icon */}
        <button
          className="header-btn add-btn"
          onClick={onAddMemberClick}
          aria-label="Add Team Member"
          style={{
            width: '30px',
            height: '30px',
            background: '#1B1B1B',
            color: '#ffffff',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
            padding: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2d2d2d';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1B1B1B';
          }}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '16px', height: '16px' }}
          >
            <path 
              d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z" 
              fill="currentColor"
            />
          </svg>
        </button>

        {/* Vertical Divider */}
        <div 
          className="vertical-divider"
          style={{
            width: '1px',
            height: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            margin: '0 2px'
          }}
        />

        {/* Filter Button */}
        <button
          className="header-btn"
          onClick={onFiltersClick}
          aria-label="Open Filters"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6B7280',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            transition: 'background-color 0.2s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F3F4F6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg 
            viewBox="0 0 512 512"
            style={{ width: '18px', height: '18px' }}
          >
            <path
              d="M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2-32.5-40.5-56-76.3-56s-66.1 23.5-76.3 56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z"
              fill="currentColor"
            />
          </svg>
          {filterCount > 0 && (
            <span 
              className="filter-count-badge visible"
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                backgroundColor: '#00DF8B',
                color: 'white',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                fontSize: '11px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid white'
              }}
            >
              {filterCount}
            </span>
          )}
        </button>

        {/* Options Button */}
        <button
          className="header-btn"
          onClick={onOptionsClick}
          aria-label="More Options"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6B7280',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F3F4F6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg 
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: '20px', height: '20px' }}
          >
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};
