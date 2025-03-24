"use client";
import { SortComponent } from "@/components/ui/Sort/SortComponent";
import { FilterButtonComponent } from "../../../ui/Filter/FiterButtonComponent";
import { filtersMock, sortMock } from "./mock";
import FilterSidebar from "../filter-sidebar/FilterSidebar";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import FilterPill from "@/components/ui/Filter/FilterPill";

const FiltersWrapper: React.FC = () => {
  const {
    isOpened: isSidebarOpen,
    setIsOpened: setIsSidebarOpen,
    ref: sidebarRef,
  } = useDisclosure();
  const filters = useSchoolsExplore((state) => state.filters);
  const resetFilters = useSchoolsExplore((state) => state.resetFilters);

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen((prev) => (prev = !prev));

  const getAllFiltersFlat = () => {
    return Object.values(filters).flat();
  };

  return (
    <>
      <div className="w-full mb-5 bg-white p-4 md:px-8 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-[rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap flex-1">
            {filtersMock.map((category) => (
              <FilterButtonComponent key={category.id} category={category} />
            ))}

            <button
              className="more-filters-button flex items-center gap-2 px-4 py-2 bg-[#F2F2F2] border-none rounded-md text-textDefault font-medium text-sm hover:bg-[#e2e8f0] transition-all"
              id="moreFiltersBtn"
              onClick={handleOpenSidebar}
            >
              {getAllFiltersFlat().length ? (
                <span
                  className={`${
                    getAllFiltersFlat().length ? "flex" : "hidden"
                  } bg-[#00DF8B] text-white w-5 h-5 rounded-full text-xs font-medium items-center justify-center`}
                >
                  {getAllFiltersFlat().length}
                </span>
              ) : (
                <span className="filter-add-icon">
                  <svg
                    viewBox="0 0 448 512"
                    width="14"
                    height="14"
                    fill="currentColor"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  </svg>
                </span>
              )}
              Filters
            </button>
            {getAllFiltersFlat().length ? (
              <button
                className="items-center flex gap-1.5 w-fit bg-transparent border-none text-textDefault text-xs cursor-pointer px-2 py-1 rounded hover:bg-[rgba(0,0,0,0.05)] transition-all"
                id="resetAllBtn"
                onClick={resetFilters}
              >
                <svg
                  fill="none"
                  viewBox="0 0 14 14"
                  strokeWidth="1.2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    d="M1 1L13 13M11.9588 2.62429H3.59188C3.47354 2.62419 3.35768 2.65941 3.25817 2.72574C3.15867 2.79208 3.07973 2.88671 3.03082 2.99831C2.98191 3.10991 2.9651 3.23374 2.98239 3.35498C2.99969 3.47622 3.05037 3.58973 3.12836 3.6819L6.39213 7.54388C6.49029 7.66021 6.54432 7.8095 6.54417 7.96399V11.0712C6.54417 11.1207 6.5553 11.1695 6.57667 11.2137C6.59804 11.258 6.62906 11.2965 6.66729 11.3262L8.51401 12.7605C8.55974 12.7961 8.61411 12.8177 8.67104 12.823C8.72797 12.8283 8.7852 12.8171 8.83633 12.7906C8.88745 12.7642 8.93045 12.7235 8.9605 12.6731C8.99055 12.6228 9.00647 12.5647 9.00647 12.5055V7.96399C9.00632 7.8095 9.06035 7.66021 9.15852 7.54388L12.4223 3.68127C12.7707 3.26944 12.4875 2.62429 11.9588 2.62429Z"
                  />
                </svg>
                Reset All
              </button>
            ) : null}
          </div>

          <div className="flex items-center gap-4 pl-6 border-l border-[rgba(0,0,0,0.1)]">
            <SortComponent sortData={sortMock} />
          </div>
        </div>

        <div className="active-filters-bar mt-2.5 flex flex-wrap gap-2 items-center">
          <span
            className={`${
              getAllFiltersFlat().length !== 0 ? "block" : "hidden"
            } text-sm font-medium text-textDefault flex flex-row items-center gap-2`}
          >
            Active Filters:{" "}
            {getAllFiltersFlat().map((item, index) => (
              <FilterPill key={index}>{item}</FilterPill>
            ))}
          </span>
        </div>
      </div>
      <FilterSidebar
        onClose={handleCloseSidebar}
        isSidePanelOpen={isSidebarOpen}
        sidebarRef={sidebarRef}
      />
    </>
  );
};

export default FiltersWrapper;
