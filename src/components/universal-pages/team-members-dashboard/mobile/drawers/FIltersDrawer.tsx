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
            className="px-5 py-3 rounded-lg text-sm font-medium text-gray-600 border border-gray-300 bg-white hover:bg-gray-100"
            onClick={onResetFilters}
          >
            Reset
          </button>
          <button
            className="px-5 py-3 rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-900 flex-1"
            onClick={onApplyFilters}
          >
            Apply Filters
          </button>
        </>
      }
    >
      <form id="filtersForm">
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h3 className="text-base font-semibold text-gray-700 pb-3">Status</h3>
          <div className="flex flex-col gap-3">
            {statusOptions.map((option) => (
              <div className="flex items-center" key={option.value}>
                <input
                  type="radio"
                  id={`filterStatus${option.value}`}
                  name="filterStatus"
                  value={option.value}
                  className="appearance-none h-5 w-5 border-2 border-gray-300 rounded-full checked:bg-green-800 checked:border-green-800 focus:outline-none"
                  defaultChecked={option.value === statusFilter}
                />
                <label
                  htmlFor={`filterStatus${option.value}`}
                  className="pl-3 text-sm text-gray-600 cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-700 pb-3">
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
                  className="appearance-none h-5 w-5 border-2 border-gray-300 rounded-full checked:bg-green-800 checked:border-green-800 focus:outline-none"
                  defaultChecked={option.value === sortFilter}
                />
                <label
                  htmlFor={`filterSort${option.value}`}
                  className="pl-3 text-sm text-gray-600 cursor-pointer"
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
