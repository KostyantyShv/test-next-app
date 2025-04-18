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
    <div className="page-controls flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="page-button p-2 border border-gray-200 bg-white rounded-md flex items-center justify-center min-w-[32px] text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
      >
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path d="M15 18l-6-6 6-6"></path>
        </svg>
      </button>
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`page-button p-2 border rounded-md min-w-[32px] transition-all ${
            page === currentPage
              ? "bg-[#0B6333] text-white border-[#0B6333]"
              : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="page-button p-2 border border-gray-200 bg-white rounded-md flex items-center justify-center min-w-[32px] text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
      >
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </button>
    </div>
  );
};
