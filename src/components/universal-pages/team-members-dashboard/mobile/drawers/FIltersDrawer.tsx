import { statusOptions, sortOptions } from "../../data/filter-options";
import { Drawer } from "./Drawer";

interface FiltersDrawerProps {
  isOpen: boolean;
  statusFilter: string;
  sortFilter: string;
  onClose: () => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

export const FiltersDrawer: React.FC<FiltersDrawerProps> = ({
  isOpen,
  statusFilter,
  sortFilter,
  onClose,
  onApplyFilters,
  onResetFilters,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Filters"
      footer={
        <>
          <button
            className="px-5 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-100"
            onClick={onResetFilters}
            style={{
              fontSize: '15px',
              fontWeight: 500,
              color: '#4B5563',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            Reset
          </button>
          <button
            className="px-5 py-3 rounded-lg text-white bg-[#1B1B1B] hover:bg-black flex-1"
            onClick={onApplyFilters}
            style={{
              fontSize: '15px',
              fontWeight: 500,
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            Apply Filters
          </button>
        </>
      }
    >
      <form id="filtersForm">
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h3 
            className="pb-3"
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#464646',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            Status
          </h3>
          <div className="flex flex-col gap-3">
            {statusOptions.map((option) => (
              <div className="flex items-center" key={option.value}>
                <input
                  type="radio"
                  id={`filterStatus${option.value}`}
                  name="filterStatus"
                  value={option.value}
                  className="appearance-none h-5 w-5 border-2 border-gray-300 rounded-full checked:bg-[#0B6333] checked:border-[#0B6333] focus:outline-none"
                  defaultChecked={option.value === statusFilter}
                />
                <label
                  htmlFor={`filterStatus${option.value}`}
                  className="pl-3 cursor-pointer"
                  style={{
                    fontSize: '15px',
                    color: '#4A4A4A',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
                  }}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 
            className="pb-3"
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#464646',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            Sort By
          </h3>
          <div className="flex flex-col gap-3">
            {sortOptions.map((option) => (
              <div className="flex items-center" key={option.value}>
                <input
                  type="radio"
                  id={`filterSort${option.value}`}
                  name="filterSort"
                  value={option.value}
                  className="appearance-none h-5 w-5 border-2 border-gray-300 rounded-full checked:bg-[#0B6333] checked:border-[#0B6333] focus:outline-none"
                  defaultChecked={option.value === sortFilter}
                />
                <label
                  htmlFor={`filterSort${option.value}`}
                  className="pl-3 cursor-pointer"
                  style={{
                    fontSize: '15px',
                    color: '#4A4A4A',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
                  }}
                >
                  {option.label.replace("Sort by: ", "")}
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </Drawer>
  );
};
