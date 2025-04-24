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
    <div className="p-4 mt-4 border-t border-gray-300 bg-gray-200 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <label
          htmlFor="itemsPerPageSelect"
          className="text-[13px] text-gray-600"
        >
          Show:
        </label>
        <select
          id="itemsPerPageSelect"
          className="p-1 pr-2 rounded-md border border-gray-300 text-[13px] bg-white cursor-pointer"
          value={itemsPerPageValue}
          onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:bg-gray-100"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
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
            className={`w-8 h-8 flex items-center justify-center border rounded-md text-sm transition-all ${
              page === currentPage
                ? "bg-black text-white border-black"
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
        <button
          className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:bg-gray-100"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
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
