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
              <div className="flex items-center relative" key={option.value} style={{ padding: '8px 0' }}>
                <input
                  type="radio"
                  id={`filterStatus${option.value}`}
                  name="filterStatus"
                  value={option.value}
                  className="appearance-none absolute opacity-0"
                  defaultChecked={option.value === statusFilter}
                />
                <label
                  htmlFor={`filterStatus${option.value}`}
                  className="cursor-pointer relative"
                  style={{
                    fontSize: '15px',
                    color: '#4A4A4A',
                    paddingLeft: '36px',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    minHeight: '24px',
                  }}
                >
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 border-2 rounded-full transition-colors"
                    style={{
                      backgroundColor: option.value === statusFilter ? 'transparent' : 'white',
                      borderColor: option.value === statusFilter ? '#0B6333' : '#D1D5DB',
                    }}
                  >
                    {option.value === statusFilter && (
                      <span
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: '#0B6333' }}
                      />
                    )}
                  </span>
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
              <div className="flex items-center relative" key={option.value} style={{ padding: '8px 0' }}>
                <input
                  type="radio"
                  id={`filterSort${option.value}`}
                  name="filterSort"
                  value={option.value}
                  className="appearance-none absolute opacity-0"
                  defaultChecked={option.value === sortFilter}
                />
                <label
                  htmlFor={`filterSort${option.value}`}
                  className="cursor-pointer relative"
                  style={{
                    fontSize: '15px',
                    color: '#4A4A4A',
                    paddingLeft: '36px',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    minHeight: '24px',
                  }}
                >
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 border-2 rounded-full transition-colors"
                    style={{
                      backgroundColor: option.value === sortFilter ? 'transparent' : 'white',
                      borderColor: option.value === sortFilter ? '#0B6333' : '#D1D5DB',
                    }}
                  >
                    {option.value === sortFilter && (
                      <span
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: '#0B6333' }}
                      />
                    )}
                  </span>
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
