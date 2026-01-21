interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPageValue: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
  getPageNumbers: () => number[];
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPageValue,
  onPageChange,
  onItemsPerPageChange,
  getPageNumbers,
}) => {
  return (
    <div 
      className="p-4 mt-2 border-t border-gray-200 flex justify-between items-center"
      style={{
        backgroundColor: '#E1E7EE',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
      }}
    >
      <div className="flex items-center gap-2">
        <label
          htmlFor="itemsPerPageSelect"
          style={{
            fontSize: '13px',
            color: '#4B5563',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
          }}
        >
          Show:
        </label>
        <select
          id="itemsPerPageSelect"
          className="p-1 pr-2 rounded-md border border-gray-300 bg-white cursor-pointer"
          value={itemsPerPageValue}
          onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
          style={{
            fontSize: '13px',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          style={{
            color: '#4B5563',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
          }}
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`w-8 h-8 flex items-center justify-center border rounded-md transition-all ${
              page === currentPage
                ? "bg-[#1B1B1B] text-white border-[#1B1B1B]"
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            style={{
              fontSize: '14px',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            {page}
          </button>
        ))}
        <button
          className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          style={{
            color: '#4B5563',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
          }}
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};
