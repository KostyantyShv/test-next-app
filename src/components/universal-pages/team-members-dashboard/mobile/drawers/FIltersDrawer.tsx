import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { useTeam } from "../hooks/useTeam";
import { useToast } from "../hooks/useToast";

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FiltersDrawer({ isOpen, onClose }: FiltersDrawerProps) {
  const {
    statusFilter,
    setStatusFilter,
    sortFilter,
    setSortFilter,
    statusOptions,
    sortOptions,
  } = useTeam();
  const { showToast } = useToast();

  const handleApplyFilters = () => {
    showToast("Filters applied", "success");
    onClose();
  };

  return (
    <MobileDrawer isOpen={isOpen} onClose={onClose}>
      <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
        <h2 className="text-lg font-semibold text-bold-text">Filters</h2>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close Filters"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-medium text-bold-text">Status</h3>
          <div className="space-y-2">
            {statusOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={statusFilter === option.value}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-active-green focus:ring-active-green"
                />
                <span className="text-sm text-text-default">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium text-bold-text">Sort By</h3>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={sortFilter === option.value}
                  onChange={(e) => setSortFilter(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-active-green focus:ring-active-green"
                />
                <span className="text-sm text-text-default">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 border-t border-gray-200 bg-white px-5 py-4">
        <button
          className="w-full rounded-lg bg-apply-button-bg px-4 py-2.5 text-sm font-semibold text-active-green transition-colors hover:bg-apply-button-hover"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
      </div>
    </MobileDrawer>
  );
}
