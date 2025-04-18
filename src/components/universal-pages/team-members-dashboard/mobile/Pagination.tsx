import { useTeam } from "./hooks/useTeam";

export function Pagination() {
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    getPageNumbers,
  } = useTeam();

  return (
    <div className="mt-4 flex items-center justify-between border-t border-gray-divider bg-background px-4 py-4">
      <div className="flex items-center gap-2">
        <label htmlFor="itemsPerPageSelect" className="text-xs text-gray-600">
          Show:
        </label>
        <select
          id="itemsPerPageSelect"
          className="cursor-pointer rounded-md border border-gray-300 bg-white px-2 py-1 text-xs"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          <svg
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
            className={`flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-sm transition-colors ${
              page === currentPage
                ? "border-dark-text bg-dark-text text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPage(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          aria-label="Next Page"
        >
          <svg
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
}
