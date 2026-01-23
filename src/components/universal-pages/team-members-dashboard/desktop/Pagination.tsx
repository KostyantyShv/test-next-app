interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  getPageNumbers: () => number[];
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  getPageNumbers,
}) => {
  return (
    <div 
      className="page-controls flex items-center"
      style={{
        gap: '0.5rem',
      }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="page-button border border-gray-200 bg-white rounded-md flex items-center justify-center transition-all disabled:opacity-50 cursor-pointer"
        style={{
          padding: '0.5rem',
          minWidth: '32px',
          color: '#4B5563',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
        }}
        onMouseEnter={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.backgroundColor = '#F3F4F6';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
        }}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"></path>
        </svg>
      </button>
      {getPageNumbers().map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`page-button border rounded-md transition-all cursor-pointer ${
              isActive
                ? "bg-[#0B6333] text-white border-[#0B6333]"
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
            }`}
            style={{
              padding: '0.25rem 0.55rem',
              minWidth: '34px',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="page-button border border-gray-200 bg-white rounded-md flex items-center justify-center transition-all disabled:opacity-50 cursor-pointer"
        style={{
          padding: '0.5rem',
          minWidth: '32px',
          color: '#4B5563',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
        }}
        onMouseEnter={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.backgroundColor = '#F3F4F6';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
        }}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </button>
    </div>
  );
};
